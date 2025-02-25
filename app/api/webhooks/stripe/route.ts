import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

import { updateUserSubscription } from "@/lib/db"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  switch (event.type) {
    case "checkout.session.completed":
      if (session.mode === "subscription") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
        await updateUserSubscription({
          userId: session.metadata?.userId,
          subscriptionId: subscription.id,
          planId: subscription.items.data[0].price.id,
          status: subscription.status,
        })
      }
      break

    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      const subscription = event.data.object as Stripe.Subscription
      await updateUserSubscription({
        subscriptionId: subscription.id,
        status: subscription.status,
      })
      break
  }

  return new NextResponse(null, { status: 200 })
}


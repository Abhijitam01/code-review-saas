import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import Stripe from "stripe"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { absoluteUrl } from "@/lib/utils"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

const plans = {
  premium: {
    name: "Premium",
    price: process.env.STRIPE_PREMIUM_PRICE_ID,
  },
  team: {
    name: "Team",
    price: process.env.STRIPE_TEAM_PRICE_ID,
  },
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const { plan, couponCode } = await req.json()

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const billingUrl = absoluteUrl("/settings/billing")
    const priceId = plans[plan]?.price

    if (!priceId) {
      return new NextResponse("Invalid plan", { status: 400 })
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: session.user.email!,
      metadata: {
        userId: session.user.id,
      },
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      discounts: couponCode
        ? [
            {
              coupon: couponCode,
            },
          ]
        : undefined,
      success_url: `${billingUrl}?success=true`,
      cancel_url: `${billingUrl}?canceled=true`,
    })

    return new NextResponse(JSON.stringify({ url: checkoutSession.url }))
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}


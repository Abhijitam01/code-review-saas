import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { createHmac } from "crypto"

import { processGitHubWebhook } from "@/lib/github"

const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET

export async function POST(req: Request) {
  const payload = await req.text()
  const signature = headers().get("x-hub-signature-256")

  // Verify webhook signature
  const hmac = createHmac("sha256", webhookSecret!)
  const calculatedSignature = `sha256=${hmac.update(payload).digest("hex")}`

  if (signature !== calculatedSignature) {
    return new NextResponse("Invalid signature", { status: 401 })
  }

  const event = headers().get("x-github-event")
  const data = JSON.parse(payload)

  try {
    await processGitHubWebhook(event, data)
    return new NextResponse(null, { status: 200 })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return new NextResponse("Error processing webhook", { status: 500 })
  }
}


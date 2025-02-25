import { Resend } from "resend"
import { WebClient } from "@slack/web-api"
import { Client, GatewayIntentBits } from "discord.js"

const resend = new Resend(process.env.RESEND_API_KEY)
const slack = new WebClient(process.env.SLACK_BOT_TOKEN)
const discord = new Client({ intents: [GatewayIntentBits.Guilds] })

export async function sendEmailNotification(to: string, subject: string, content: string) {
  try {
    await resend.emails.send({
      from: "CodeReviewAI <notifications@codereview.ai>",
      to,
      subject,
      html: content,
    })
  } catch (error) {
    console.error("Error sending email:", error)
  }
}

export async function sendSlackNotification(channel: string, message: string) {
  try {
    await slack.chat.postMessage({
      channel,
      text: message,
      unfurl_links: true,
    })
  } catch (error) {
    console.error("Error sending Slack notification:", error)
  }
}

export async function sendDiscordNotification(channelId: string, message: string) {
  try {
    const channel = await discord.channels.fetch(channelId)
    if (channel?.isTextBased()) {
      await channel.send(message)
    }
  } catch (error) {
    console.error("Error sending Discord notification:", error)
  }
}

export async function notifyAll(notification: {
  email?: { to: string; subject: string; content: string }
  slack?: { channel: string; message: string }
  discord?: { channelId: string; message: string }
}) {
  const promises = []

  if (notification.email) {
    promises.push(sendEmailNotification(notification.email.to, notification.email.subject, notification.email.content))
  }

  if (notification.slack) {
    promises.push(sendSlackNotification(notification.slack.channel, notification.slack.message))
  }

  if (notification.discord) {
    promises.push(sendDiscordNotification(notification.discord.channelId, notification.discord.message))
  }

  await Promise.all(promises)
}


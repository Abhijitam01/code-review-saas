import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { createCanvas } from "canvas"

interface CommitData {
  message: string
  repo: string
  files: {
    name: string
    content: string
    language: string
  }[]
}

export async function generateTweet(commitData: CommitData): Promise<string> {
  const { text } = await generateText({
    model: openai("gpt-4-turbo"),
    system: `You are a developer sharing your coding progress on Twitter. 
    Create an engaging, professional tweet about code changes.
    Include relevant hashtags and keep it under 280 characters.
    Focus on the technical achievement, improvements, or learning.`,
    prompt: `Generate a tweet about this code commit:
    Repository: ${commitData.repo}
    Commit message: ${commitData.message}
    Files changed: ${commitData.files.map((f) => f.name).join(", ")}
    
    Sample of code changes:
    ${commitData.files[0]?.content.slice(0, 200)}...`,
  })

  return text
}

export async function generateCodeImage(code: string, language: string, filename: string): Promise<string> {
  // This is a simplified version - in a real app, you'd use a more sophisticated
  // code rendering library or service like Carbon

  const canvas = createCanvas(1200, 630)
  const ctx = canvas.getContext("2d")

  // Set background
  ctx.fillStyle = "#1e1e1e"
  ctx.fillRect(0, 0, 1200, 630)

  // Draw header
  ctx.fillStyle = "#2d2d2d"
  ctx.fillRect(0, 0, 1200, 40)

  // Draw filename
  ctx.font = "16px monospace"
  ctx.fillStyle = "#ffffff"
  ctx.fillText(filename, 20, 25)

  // Draw language
  ctx.fillStyle = "#888888"
  ctx.fillText(language, 1100, 25)

  // Draw code
  ctx.font = "14px monospace"
  ctx.fillStyle = "#d4d4d4"

  const lines = code.split("\n").slice(0, 20)
  lines.forEach((line, i) => {
    ctx.fillText(line.slice(0, 80), 20, 70 + i * 20)
  })

  // Convert to data URL
  return canvas.toDataURL("image/png")
}

export async function shareToTwitter(text: string, imageUrl?: string): Promise<boolean> {
  try {
    // In a real app, this would use the Twitter API
    // This is a placeholder for the actual implementation
    console.log("Sharing to Twitter:", text, imageUrl)
    return true
  } catch (error) {
    console.error("Error sharing to Twitter:", error)
    return false
  }
}


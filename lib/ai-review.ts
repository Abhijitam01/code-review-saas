import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function reviewCode(code: string) {
  const { text: review } = await generateText({
    model: openai("gpt-4-turbo"),
    system: `You are an expert code reviewer. Analyze the code for:
      1. Performance optimizations
      2. Best practices
      3. Potential bugs
      4. Code style improvements
      Provide specific, actionable suggestions.`,
    prompt: `Review this code:\n${code}`,
  })

  return review
}

export async function comparePerformance(originalCode: string, optimizedCode: string) {
  const { text: comparison } = await generateText({
    model: openai("gpt-4-turbo"),
    system: "You are an expert in code performance analysis.",
    prompt: `Compare the performance of these two code versions:
      Original:
      ${originalCode}
      
      Optimized:
      ${optimizedCode}
      
      Analyze and estimate the performance improvement in percentage.`,
  })

  return comparison
}


import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { code, type } = await req.json()

    const analysisTypes = {
      security: {
        system:
          "You are a security expert. Analyze the code for security vulnerabilities, potential exploits, and best practices for security.",
        prompt: `Analyze this code for security issues:\n${code}`,
      },
      performance: {
        system:
          "You are a performance optimization expert. Analyze the code for performance bottlenecks and optimization opportunities.",
        prompt: `Analyze this code for performance improvements:\n${code}`,
      },
      quality: {
        system:
          "You are a code quality expert. Analyze the code for maintainability, readability, and adherence to best practices.",
        prompt: `Analyze this code for quality improvements:\n${code}`,
      },
      documentation: {
        system: "You are a technical documentation expert. Generate comprehensive documentation for this code.",
        prompt: `Generate documentation for this code:\n${code}`,
      },
    }

    const analysis = await generateText({
      model: openai("gpt-4-turbo"),
      system: analysisTypes[type]?.system || "You are an expert code reviewer.",
      prompt: analysisTypes[type]?.prompt || `Review this code:\n${code}`,
    })

    return NextResponse.json({ analysis })
  } catch (error) {
    console.error("Error in AI analysis:", error)
    return new NextResponse("Error processing request", { status: 500 })
  }
}


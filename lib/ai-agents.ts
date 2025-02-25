import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export const aiAgents = {
  securityExpert: async (code: string) => {
    return generateText({
      model: openai("gpt-4-turbo"),
      system: `You are an expert in application security. Analyze code for:
        - Security vulnerabilities
        - Potential exploits
        - Authentication issues
        - Data validation
        - Secure coding practices
        Provide detailed explanations and remediation steps.`,
      prompt: `Analyze this code for security issues:\n${code}`,
    })
  },

  performanceExpert: async (code: string) => {
    return generateText({
      model: openai("gpt-4-turbo"),
      system: `You are an expert in code performance optimization. Analyze code for:
        - Performance bottlenecks
        - Memory leaks
        - CPU usage optimization
        - Database query optimization
        - Caching opportunities
        Provide specific optimization suggestions with examples.`,
      prompt: `Analyze this code for performance improvements:\n${code}`,
    })
  },

  architectureExpert: async (code: string) => {
    return generateText({
      model: openai("gpt-4-turbo"),
      system: `You are an expert in software architecture. Analyze code for:
        - Design patterns
        - Code organization
        - Modularity
        - Scalability
        - Maintainability
        Suggest architectural improvements and refactoring opportunities.`,
      prompt: `Review this code's architecture:\n${code}`,
    })
  },

  testingExpert: async (code: string) => {
    return generateText({
      model: openai("gpt-4-turbo"),
      system: `You are an expert in software testing. Analyze code and generate:
        - Unit test cases
        - Integration test scenarios
        - Edge cases to test
        - Test coverage suggestions
        Provide example test code and testing strategies.`,
      prompt: `Generate test cases for this code:\n${code}`,
    })
  },

  documentationExpert: async (code: string) => {
    return generateText({
      model: openai("gpt-4-turbo"),
      system: `You are an expert in technical documentation. Generate:
        - Function/method documentation
        - API documentation
        - Usage examples
        - Implementation details
        Follow JSDoc/TSDoc standards where applicable.`,
      prompt: `Generate documentation for this code:\n${code}`,
    })
  },
}

export async function runAllAnalyses(code: string) {
  const analyses = await Promise.all([
    aiAgents.securityExpert(code),
    aiAgents.performanceExpert(code),
    aiAgents.architectureExpert(code),
    aiAgents.testingExpert(code),
    aiAgents.documentationExpert(code),
  ])

  return {
    security: analyses[0],
    performance: analyses[1],
    architecture: analyses[2],
    testing: analyses[3],
    documentation: analyses[4],
  }
}


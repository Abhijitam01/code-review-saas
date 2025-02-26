"use client"

import { useState } from "react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface SocialShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pullRequest: {
    title: string
    improvements: number
    performance: number
    codeSnippet: string
  }
}

export function SocialShareDialog({ open, onOpenChange, pullRequest }: SocialShareDialogProps) {
  const [tweetContent, setTweetContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSharing, setIsSharing] = useState(false)

  const generateTweet = async () => {
    setIsGenerating(true)
    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `Generate a short, engaging tweet about a code improvement. 
        PR Title: ${pullRequest.title}
        Improvements: ${pullRequest.improvements} suggestions implemented
        Performance Impact: +${pullRequest.performance}%
        Code Snippet: ${pullRequest.codeSnippet}
        
        The tweet should be professional but conversational, include relevant hashtags, and be under 280 characters.`,
      })
      
      setTweetContent(text)
    } catch (error) {
      console.error("Error generating tweet:", error)
      setTweetContent("Just improved my code with CodeReviewAI! Implemented optimizations that resulted in a performance boost. #CodeReview #DeveloperProductivity")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleShare = async () => {
    setIsSharing(true)
    try {
      // In a real app, you would make an API call to share the content
      await new Promise(resolve => setTimeout(resolve, 1000))
      onOpenChange(false)
    } catch (error) {\


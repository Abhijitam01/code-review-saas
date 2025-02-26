"use client"

import { useState } from "react"
import { Loader2, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateTweet } from "@/lib/social"

interface SocialShareModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  commitData: {
    message: string
    repo: string
    files: {
      name: string
      content: string
      language: string
    }[]
  }
}

export function SocialShareModal({ open, onOpenChange, commitData }: SocialShareModalProps) {
  const [tweet, setTweet] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
  const [selectedFile, setSelectedFile] = useState(0)

  const handleGenerateTweet = async () => {
    setIsGenerating(true)
    try {
      const generatedTweet = await generateTweet(commitData)
      setTweet(generatedTweet)
    } catch (error) {
      console.error("Error generating tweet:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePostTweet = async () => {
    setIsPosting(true)
    try {
      // Simulate posting to Twitter
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onOpenChange(false)
    } catch (error) {
      console.error("Error posting tweet:", error)
    } finally {
      setIsPosting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Share Your Code</DialogTitle>
          <DialogDescription>Share your coding progress with your followers</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Textarea
              placeholder="What would you like to share about your code?"
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
              className="min-h-[100px]"
            />
            <Button variant="outline" onClick={handleGenerateTweet} disabled={isGenerating} className="w-full">
              {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isGenerating ? "Generating..." : "Generate AI Tweet"}
            </Button>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-medium">Preview Code Snippet</h4>
            <Tabs defaultValue="0" onValueChange={(v) => setSelectedFile(Number.parseInt(v))}>
              <TabsList className="w-full">
                {commitData.files.map((file, index) => (
                  <TabsTrigger key={index} value={index.toString()} className="flex-1">
                    {file.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {commitData.files.map((file, index) => (
                <TabsContent key={index} value={index.toString()}>
                  <div className="rounded-md overflow-hidden border">
                    <div className="bg-zinc-900 text-zinc-200 p-2 text-xs font-mono">
                      <div className="flex items-center justify-between">
                        <span>{file.name}</span>
                        <span className="text-zinc-400">{file.language}</span>
                      </div>
                    </div>
                    <div className="bg-zinc-950 p-4 text-xs font-mono text-zinc-200 overflow-x-auto">
                      <pre>{file.content}</pre>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handlePostTweet} disabled={!tweet || isPosting}>
            {isPosting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Twitter className="mr-2 h-4 w-4" />
            {isPosting ? "Posting..." : "Post to Twitter"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


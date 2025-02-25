"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { reviewCode } from "@/lib/ai-review"

export default function CodeCheckPage() {
  const [code, setCode] = useState("")
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleCheck = async () => {
    setLoading(true)
    try {
      const review = await reviewCode(code)
      setResult(review)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold">Code Optimization Checker</h1>
      <p className="text-muted-foreground">Paste your code below to get instant optimization suggestions</p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Code</CardTitle>
            <CardDescription>Paste the code you want to analyze</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[400px] font-mono"
              placeholder="// Paste your code here"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button className="mt-4 w-full" onClick={handleCheck} disabled={!code || loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Analyzing..." : "Check Code"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>AI-powered suggestions for your code</CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div dangerouslySetInnerHTML={{ __html: result }} />
              </div>
            ) : (
              <div className="flex h-[400px] items-center justify-center text-muted-foreground">
                {loading ? <Loader2 className="h-8 w-8 animate-spin" /> : "Analysis results will appear here"}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


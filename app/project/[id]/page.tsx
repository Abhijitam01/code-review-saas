"use client"

import { useEffect, useState } from "react"
import { Check, GitPullRequest, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PullRequest {
  id: string
  title: string
  number: number
  status: "reviewing" | "completed" | "failed"
  improvements: number
  performance: number
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPullRequests([
        {
          id: "1",
          title: "Add new feature",
          number: 123,
          status: "completed",
          improvements: 5,
          performance: 15,
        },
        {
          id: "2",
          title: "Fix bug in authentication",
          number: 124,
          status: "reviewing",
          improvements: 2,
          performance: 8,
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Project Review Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage code reviews for your pull requests</p>
        </div>
        <Button>
          <GitPullRequest className="mr-2 h-4 w-4" />
          Sync Pull Requests
        </Button>
      </div>

      <Tabs defaultValue="all" className="mt-8">
        <TabsList>
          <TabsTrigger value="all">All PRs</TabsTrigger>
          <TabsTrigger value="reviewing">Reviewing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="failed">Failed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4 space-y-4">
          {pullRequests.map((pr) => (
            <Card key={pr.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      #{pr.number} {pr.title}
                    </CardTitle>
                    <CardDescription>
                      {pr.status === "reviewing" && "AI is reviewing changes..."}
                      {pr.status === "completed" && "Review completed"}
                      {pr.status === "failed" && "Review failed"}
                    </CardDescription>
                  </div>
                  {pr.status === "completed" && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20 text-green-500">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                  {pr.status === "failed" && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/20 text-red-500">
                      <X className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pr.status === "reviewing" ? (
                    <Progress value={45} className="h-2 w-full" />
                  ) : (
                    <>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Code Improvements</div>
                          <div className="text-2xl font-bold">{pr.improvements} suggestions</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Performance Impact</div>
                          <div className="text-2xl font-bold text-green-500">+{pr.performance}%</div>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex justify-end gap-4">
                        <Button variant="outline">View Changes</Button>
                        <Button>Apply Suggestions</Button>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}


"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Bot, GitPullRequest, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUserPullRequests } from "@/lib/github"

interface PullRequest {
  id: number
  title: string
  repo: string
  number: number
  url: string
  state: string
  created_at: string
}

export default function MyPRsPage() {
  const { data: session } = useSession()
  const [prs, setPrs] = useState<PullRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPRs() {
      if (session?.user) {
        const userPRs = await getUserPullRequests(session.user.id)
        setPrs(userPRs)
        setLoading(false)
      }
    }
    fetchPRs()
  }, [session])

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Pull Requests</h1>
          <p className="text-muted-foreground">Manage and get AI assistance for your pull requests</p>
        </div>
        <div className="flex gap-4">
          <Input placeholder="Search PRs..." className="w-[200px]" />
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All PRs</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="active" className="mt-8">
        <TabsList>
          <TabsTrigger value="active">Active PRs</TabsTrigger>
          <TabsTrigger value="contributed">Contributed</TabsTrigger>
          <TabsTrigger value="watching">Watching</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-4 space-y-4">
          {prs.map((pr) => (
            <Card key={pr.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <GitPullRequest className="h-5 w-5" />
                      {pr.title}
                    </CardTitle>
                    <CardDescription>
                      {pr.repo} #{pr.number}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Comments
                    </Button>
                    <Button size="sm">
                      <Bot className="mr-2 h-4 w-4" />
                      Get AI Review
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Status</div>
                      <div className="mt-1">
                        <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs font-medium text-green-500">
                          {pr.state}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Created</div>
                      <div className="mt-1 text-muted-foreground">{new Date(pr.created_at).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div className="font-medium">Repository</div>
                      <div className="mt-1 text-muted-foreground">{pr.repo}</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-end gap-4">
                    <Button variant="outline" asChild>
                      <a href={pr.url} target="_blank" rel="noopener noreferrer">
                        View on GitHub
                      </a>
                    </Button>
                    <Button>Review Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}


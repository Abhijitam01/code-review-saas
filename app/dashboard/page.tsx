// Dashboard page component that displays user's projects
// Allows users to manage their projects and access code reviews

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { GitPullRequest, Plus, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { SiteHeader } from "@/components/site-header"
import { AddProjectDialog } from "@/components/add-project-dialog"

// Project type definition
interface Project {
  id: string
  name: string
  description: string
  repoUrl: string
  prs: number
  lastReview: string
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch user's projects
    // In a real app, this would be a fetch request to your API
    setTimeout(() => {
      setProjects([
        {
          id: "1",
          name: "E-commerce Platform",
          description: "Online shopping platform with React and Node.js",
          repoUrl: "user/ecommerce-platform",
          prs: 3,
          lastReview: "2h ago",
        },
        {
          id: "2",
          name: "Task Management App",
          description: "Productivity app for managing tasks and projects",
          repoUrl: "user/task-manager",
          prs: 1,
          lastReview: "1d ago",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  // Show loading state while session is being fetched
  if (status === "loading") {
    return <div>Loading...</div>
  }

  // If user is not authenticated, show access denied message
  if (!session) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <div className="container flex flex-1 items-center justify-center">
          <Card>
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>Please sign in to access the dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Manage your projects and code reviews</p>
          </div>
          <div className="flex items-center gap-4">
            <Input className="w-[200px]" placeholder="Search projects..." />
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="active">Active PRs</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" asChild>
              <Link href="/settings">
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
            <Button onClick={() => setIsAddProjectOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Project
            </Button>
          </div>
        </div>

        {/* Project cards grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-full" />
                  </CardContent>
                </Card>
              ))
            : projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GitPullRequest className="h-4 w-4 text-muted-foreground" />
                        <span>{project.prs} Pull Requests</span>
                      </div>
                      <Button variant="outline" asChild>
                        <Link href={`/project/${project.id}`}>View</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>

      {/* Dialog for adding new projects */}
      <AddProjectDialog
        open={isAddProjectOpen}
        onOpenChange={setIsAddProjectOpen}
        onAddProject={(project) => {
          setProjects([...projects, { ...project, id: Date.now().toString(), prs: 0, lastReview: "Just now" }])
        }}
      />
    </div>
  )
}


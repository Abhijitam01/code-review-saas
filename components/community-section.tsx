"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getContributedRepositories } from "@/lib/github"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Repository {
  id: number
  full_name: string
  description: string
  stargazers_count: number
  language: string
  html_url: string
}

export function CommunitySection() {
  const [repos, setRepos] = useState<Repository[]>([])

  useEffect(() => {
    async function fetchRepos() {
      const data = await getContributedRepositories("user")
      setRepos(data.slice(0, 3))
    }
    fetchRepos()
  }, [])

  return (
    <section className="container py-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Open Source Community</h2>
          <p className="text-muted-foreground">Popular repositories you might want to contribute to</p>
        </div>
        <Button asChild>
          <Link href="/explore">Explore More</Link>
        </Button>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {repos.map((repo) => (
          <Card key={repo.id}>
            <CardHeader>
              <CardTitle>{repo.full_name}</CardTitle>
              <CardDescription>{repo.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className="text-sm text-muted-foreground">{repo.language}</div>
              </div>
              <Button className="mt-4 w-full" variant="outline" asChild>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  View Repository
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}


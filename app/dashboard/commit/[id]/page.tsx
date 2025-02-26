"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check, Copy, Share2, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SocialShareModal } from "@/components/social-share-modal"

interface CommitData {
  id: string
  message: string
  author: string
  date: string
  repo: string
  branch: string
  files: {
    name: string
    status: string
    additions: number
    deletions: number
    content: string
    language: string
  }[]
}

export default function CommitPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [commitData, setCommitData] = useState<CommitData | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch commit data
    setTimeout(() => {
      setCommitData({
        id: params.id,
        message: "Add new caching mechanism for API requests",
        author: "Jane Doe",
        date: "2023-05-15T14:32:00Z",
        repo: "my-awesome-project",
        branch: "feature/caching",
        files: [
          {
            name: "src/utils/cache.ts",
            status: "added",
            additions: 45,
            deletions: 0,
            language: "TypeScript",
            content: `export class RequestCache {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private ttl: number;

  constructor(ttlInSeconds = 300) {
    this.ttl = ttlInSeconds * 1000;
  }

  set(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get(key: string): any | null {
    const cached = this.cache.get(key);
    
    if (!cached) {
      return null;
    }
    
    const isExpired = Date.now() - cached.timestamp > this.ttl;
    
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }

  clear(): void {
    this.cache.clear();
  }

  remove(key: string): boolean {
    return this.cache.delete(key);
  }
}`,
          },
          {
            name: "src/api/client.ts",
            status: "modified",
            additions: 12,
            deletions: 5,
            language: "TypeScript",
            content: `import { RequestCache } from '../utils/cache';

const cache = new RequestCache();

export async function fetchData(url: string, options = {}) {
  const cacheKey = \`\${url}-\${JSON.stringify(options)}\`;
  
  // Check cache first
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return cachedData;
  }
  
  // Fetch fresh data
  const response = await fetch(url, options);
  const data = await response.json();
  
  // Store in cache
  cache.set(cacheKey, data);
  
  return data;
}`,
          },
        ],
      })
      setLoading(false)
    }, 1000)
  }, [params.id])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="h-8 w-64 bg-muted rounded animate-pulse" />
          <div className="h-10 w-32 bg-muted rounded animate-pulse" />
        </div>
        <div className="h-64 bg-muted rounded animate-pulse" />
      </div>
    )
  }

  if (!commitData) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold">Commit not found</h1>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{commitData.message}</h1>
            <p className="text-muted-foreground">
              Committed by {commitData.author} on {new Date(commitData.date).toLocaleString()}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShareModalOpen(true)}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button>
              <Twitter className="mr-2 h-4 w-4" />
              Tweet
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Commit Details</CardTitle>
            <CardDescription>
              Repository: {commitData.repo} • Branch: {commitData.branch}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="files">
              <TabsList>
                <TabsTrigger value="files">Files Changed</TabsTrigger>
                <TabsTrigger value="diff">Diff</TabsTrigger>
                <TabsTrigger value="ai-review">AI Review</TabsTrigger>
              </TabsList>
              <TabsContent value="files" className="mt-4">
                <div className="space-y-4">
                  {commitData.files.map((file, index) => (
                    <Card key={index}>
                      <CardHeader className="py-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{file.name}</CardTitle>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-green-500">+{file.additions}</span>
                            <span className="text-sm text-red-500">-{file.deletions}</span>
                            <Button variant="ghost" size="icon" onClick={() => copyToClipboard(file.content)}>
                              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
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
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="diff" className="mt-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="rounded-md overflow-hidden border">
                      <div className="bg-zinc-950 p-4 text-xs font-mono text-zinc-200 overflow-x-auto">
                        <pre className="whitespace-pre-wrap">
                          {`diff --git a/src/api/client.ts b/src/api/client.ts
index 1234567..abcdefg 100644
--- a/src/api/client.ts
+++ b/src/api/client.ts
@@ -1,5 +1,7 @@
+import { RequestCache } from '../utils/cache';
+
+const cache = new RequestCache();
 
 export async function fetchData(url: string, options = {}) {
-  const response = await fetch(url, options);
-  const data = await response.json();
-  return data;
+  const cacheKey = \`\${url}-\${JSON.stringify(options)}\`;
+  
+  // Check cache first
+  const cachedData = cache.get(cacheKey);
+  if (cachedData) {
+    return cachedData;
+  }
+  
+  // Fetch fresh data
+  const response = await fetch(url, options);
+  const data = await response.json();
+  
+  // Store in cache
+  cache.set(cacheKey, data);
+  
+  return data;
 }`}
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="ai-review" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <h3>AI Review Summary</h3>
                      <p>
                        <strong>Great work!</strong> The implementation of a caching mechanism for API requests is a
                        solid improvement that will help reduce unnecessary network requests and improve performance.
                      </p>

                      <h4>Strengths:</h4>
                      <ul>
                        <li>Good separation of concerns with a dedicated cache utility class</li>
                        <li>TTL implementation prevents stale data issues</li>
                        <li>Clean API with get/set/remove/clear methods</li>
                      </ul>

                      <h4>Suggestions:</h4>
                      <ul>
                        <li>Consider adding a size limit to prevent memory issues with large caches</li>
                        <li>Add an option to bypass cache for certain requests</li>
                        <li>Consider implementing LRU (Least Recently Used) eviction policy</li>
                      </ul>

                      <h4>Performance Impact:</h4>
                      <p>
                        This change could reduce API calls by up to 70% for frequently accessed endpoints, resulting in
                        faster user experience and reduced server load.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <SocialShareModal
        open={shareModalOpen}
        onOpenChange={setShareModalOpen}
        commitData={{
          message: commitData.message,
          repo: commitData.repo,
          files: commitData.files.map((file) => ({
            name: file.name,
            content: file.content,
            language: file.language,
          })),
        }}
      />
    </div>
  )
}


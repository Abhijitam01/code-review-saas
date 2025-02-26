// Project detail page that displays pull requests and their reviews
// Shows code improvements, performance impact, and allows sharing results

"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Check, GitPullRequest, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteHeader } from "@/components/site-header";

// Pull request type definition
interface PullRequest {
  id: string;
  title: string;
  number: number;
  status: "reviewing" | "completed" | "failed";
  improvements: number;
  performance: number;
  codeSnippet: string;
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSocialShareOpen, setIsSocialShareOpen] = useState(false);
  const [selectedPR, setSelectedPR] = useState<PullRequest | null>(null);

  useEffect(() => {
    // Simulate API call to fetch pull requests for this project
    // In a real app, this would be a fetch request to your API
    setTimeout(() => {
      setPullRequests([
        {
          id: "1",
          title: "Add new feature",
          number: 123,
          status: "completed",
          improvements: 5,
          performance: 15,
          codeSnippet: `function optimizedComponent() {
  const memoizedValue = useMemo(() => {
    return expensiveCalculation(a, b);
  }, [a, b]);
  
  return <div>{memoizedValue}</div>;
}`,
        },
        {
          id: "2",
          title: "Fix bug in authentication",
          number: 124,
          status: "reviewing",
          improvements: 2,
          performance: 8,
          codeSnippet: `function authenticate(user, token) {
  // Validation added
  if (!user || !token) {
    throw new Error('Missing credentials');
  }
  
  return verifyToken(user, token);
}`,
        },
        {
          id: "3",
          title: "Refactor database queries",
          number: 125,
          status: "completed",
          improvements: 8,
          performance: 32,
          codeSnippet: `async function getUsers() {
  // Added indexing and limit
  const users = await db.users
    .find({ active: true })
    .limit(100)
    .sort({ lastLogin: -1 });
    
  return users;
}`,
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle sharing a pull request
  const handleShareClick = (pr: PullRequest) => {
    setSelectedPR(pr);
    setIsSocialShareOpen(true);
  };

  // Require authentication to view this page
  if (!session) {
    return <div>Please sign in to view this page</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <div className="container py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Project Review Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor and manage code reviews for your pull requests
            </p>
          </div>
          <Button>
            <GitPullRequest className="mr-2 h-4 w-4" />
            Sync Pull Requests
          </Button>
        </div>

        {/* Tabs for filtering pull requests */}
        <Tabs defaultValue="all" className="mt-8">
          <TabsList>
            <TabsTrigger value="all">All PRs</TabsTrigger>
            <TabsTrigger value="reviewing">Reviewing</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4 space-y-4">
            {loading ? (
              <div>Loading...</div>
            ) : (
              pullRequests.map((pr) => (
                <Card key={pr.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>
                          #{pr.number} {pr.title}
                        </CardTitle>
                        <CardDescription>
                          {pr.status === "reviewing" &&
                            "AI is reviewing changes..."}
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
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

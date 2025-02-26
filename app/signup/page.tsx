// Signup page component that handles user registration
// Provides options for GitHub/Google OAuth or email/password signup

"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { Github, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "@/components/site-header"

export default function SignUpPage() {
  // State for form inputs and loading state
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  // Get plan from URL query parameters
  const searchParams = useSearchParams()
  const plan = searchParams?.get("plan") || "free"

  // Handle GitHub OAuth signup
  const signUpWithGithub = async () => {
    setIsLoading(true)
    try {
      await signIn("github", { callbackUrl: "/dashboard" })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Google OAuth signup
  const signUpWithGoogle = async () => {
    setIsLoading(true)
    try {
      await signIn("google", { callbackUrl: "/dashboard" })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle form submission for email/password signup
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, you would register the user here
      // For now, we'll just redirect to the login page
      window.location.href = "/login"
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <div className="container flex flex-1 items-center justify-center py-12">
        <Card className="w-full max-w-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              {plan === "premium"
                ? "Sign up for the Premium plan"
                : plan === "team"
                  ? "Sign up for the Team plan"
                  : "Sign up for a free account"}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* OAuth signup options */}
            <Button variant="outline" onClick={signUpWithGithub} disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Github className="mr-2 h-4 w-4" />}
              Sign up with GitHub
            </Button>
            <Button variant="outline" onClick={signUpWithGoogle} disabled={isLoading}>
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign up with Google
            </Button>
            <Separator className="my-4" />

            {/* Email/password signup form */}
            <form onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="grid gap-2 mt-4">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="grid gap-2 mt-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button className="w-full mt-6" type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary underline-offset-4 hover:underline">
                Sign In
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}


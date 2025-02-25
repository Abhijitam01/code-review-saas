"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { GithubIcon, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface AuthFormProps {
  mode: "login" | "signup";
}

export function AuthForm({ mode }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleSocialLogin = async (provider: "github" | "google") => {
    setIsLoading(true);
    try {
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "login") {
        await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          callbackUrl: "/dashboard",
        });
      } else {
        // Handle signup - you'll need to implement this API route
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Auto-login after successful signup
          await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            callbackUrl: "/dashboard",
          });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Card className="w-full max-w-lg">
      <form onSubmit={handleSubmit}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">
            {mode === "login" ? "Welcome back" : "Create an account"}
          </CardTitle>
          <CardDescription>
            Choose your preferred {mode === "login" ? "sign in" : "sign up"}{" "}
            method
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin("github")}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <GithubIcon className="mr-2 h-4 w-4" />
            )}
            Continue with GitHub
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSocialLogin("google")}
            disabled={isLoading}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              {/* ... existing Google SVG paths ... */}
            </svg>
            Continue with Google
          </Button>
          <Separator className="my-4" />
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          {mode === "signup" && (
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : mode === "login" ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </Button>
          <div className="text-sm text-muted-foreground">
            {mode === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}

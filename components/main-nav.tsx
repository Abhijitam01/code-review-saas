// Main navigation component that displays the site's primary navigation links
// Shows the logo and main site sections

"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Code2 } from "lucide-react"

import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {/* Logo and site name */}
      <Link href="/" className="flex items-center space-x-2 font-bold">
        <Code2 className="h-6 w-6" />
        <span>CodeReviewAI</span>
      </Link>

      {/* Main navigation links */}
      <Link
        href="/features"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/features" ? "text-foreground" : "text-muted-foreground",
        )}
      >
        Features
      </Link>
      <Link
        href="/how-it-works"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/how-it-works" ? "text-foreground" : "text-muted-foreground",
        )}
      >
        How It Works
      </Link>
      <Link
        href="/pricing"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/pricing" ? "text-foreground" : "text-muted-foreground",
        )}
      >
        Pricing
      </Link>
      <Link
        href="/about"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/about" ? "text-foreground" : "text-muted-foreground",
        )}
      >
        About Us
      </Link>
    </nav>
  )
}


import type React from "react"
// Root layout component that wraps the entire application
// Sets up the theme provider, session provider, and global styles

import { Mona_Sans as FontSans } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import "@/styles/globals.css"
import { SessionProvider } from "@/components/session-provider"

// Load the Mona Sans font
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

// Metadata for the application
export const metadata = {
  title: "CodeReviewAI - AI-Powered Code Reviews",
  description: "Automatically analyze, optimize, and validate your code changes with advanced AI.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SessionProvider>
            {children}
            <Toaster />
          </SessionProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}



import './globals.css'
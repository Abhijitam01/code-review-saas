import { PrismaAdapter } from "@auth/prisma-adapter"
import type { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  // Use Prisma adapter to store auth data in the database
  adapter: PrismaAdapter(prisma),

  // Configure authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      // Request additional scopes for GitHub API access
      authorization: {
        params: {
          scope: "read:user user:email repo pull_request",
        },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],

  // Customize session data
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        // Add user ID and plan to the session
        session.user.id = user.id
        session.user.plan = user.plan || "free"
      }
      return session
    },
  },

  // Custom pages for authentication flows
  pages: {
    signIn: "/login",
    signUp: "/signup",
    error: "/auth/error",
  },

  // Use JWT strategy for sessions
  session: {
    strategy: "jwt",
  },
}

// Create the NextAuth handler
const handler = NextAuth(authOptions)

// Export the handler for GET and POST requests
export { handler as GET, handler as POST }


// This file creates and exports a singleton Prisma client instance
// It ensures we don't create multiple connections to the database during hot reloads in development

import { PrismaClient } from "@prisma/client"

// Create a global variable to store the Prisma client
const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Create a new PrismaClient instance or use the existing one
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

// In development, save the client to the global object to prevent multiple instances
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma


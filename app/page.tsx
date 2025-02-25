"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Code2,
  GitPullRequest,
  Zap,
  Bell,
  User,
  CreditCard,
  Settings,
  FolderPlus,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <motion.div
            className="flex items-center gap-2 font-semibold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Code2 className="h-6 w-6" />
            CodeReviewAI
          </motion.div>
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/login">Login</Link>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </motion.div>
        </div>
      </header>

      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-14 md:pb-12 md:pt-20 lg:py-32">
          <motion.div
            className="container flex max-w-[64rem] flex-col items-center gap-4 text-center"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            <motion.h1
              className="font-heading text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl"
              variants={fadeIn}
            >
              AI-Powered Code Reviews
              <br />
              In Your Pull Requests
            </motion.h1>
            <motion.p
              className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
              variants={fadeIn}
            >
              Automatically analyze, optimize, and validate your code changes
              with advanced AI. Get instant feedback and improvements for your
              pull requests.
            </motion.p>
            <motion.div className="flex gap-4" variants={fadeIn}>
              <Button asChild size="lg">
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                View Demo
              </Button>
            </motion.div>
          </motion.div>
        </section>

        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
              Features
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Supercharge your development workflow with AI-powered code reviews
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <Card>
              <CardHeader>
                <GitPullRequest className="h-14 w-14 rounded-2xl bg-primary/10 p-3 text-primary" />
                <CardTitle className="mt-4">Automated Reviews</CardTitle>
                <CardDescription>
                  Get instant code reviews on every pull request
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Zap className="h-14 w-14 rounded-2xl bg-primary/10 p-3 text-primary" />
                <CardTitle className="mt-4">Code Optimization</CardTitle>
                <CardDescription>
                  AI suggests performance improvements and optimizations
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CheckCircle className="h-14 w-14 rounded-2xl bg-primary/10 p-3 text-primary" />
                <CardTitle className="mt-4">Validation</CardTitle>
                <CardDescription>
                  Automatically test and validate code changes
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <section className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
              Simple Pricing
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Choose the perfect plan for your needs
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription>
                  Perfect for small projects and individual developers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$0</div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>2 Projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Basic code review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>GitHub integration</span>
                  </div>
                </div>
                <Button className="mt-8 w-full" asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Premium</CardTitle>
                <CardDescription>For teams and larger projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$29</div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>5 Projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Advanced code optimization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Performance validation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Priority support</span>
                  </div>
                </div>
                <Button className="mt-8 w-full" asChild>
                  <Link href="/signup?plan=premium">Upgrade Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
              Settings
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Manage your account and preferences.
            </p>
          </div>
          <div className="mx-auto mt-12">
            <motion.div
              className="container mx-auto py-10 space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div {...fadeIn}>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                  Manage your account and preferences.
                </p>
              </motion.div>

              <Tabs defaultValue="account" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
                  <TabsTrigger
                    value="account"
                    className="flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    Account
                  </TabsTrigger>
                  <TabsTrigger
                    value="projects"
                    className="flex items-center gap-2"
                  >
                    <FolderPlus className="h-4 w-4" />
                    Projects
                  </TabsTrigger>
                  <TabsTrigger
                    value="billing"
                    className="flex items-center gap-2"
                  >
                    <CreditCard className="h-4 w-4" />
                    Billing
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="flex items-center gap-2"
                  >
                    <Bell className="h-4 w-4" />
                    Notifications
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="account">
                  <motion.div {...fadeIn}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src="https://github.com/shadcn.png" />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">Profile Picture</h3>
                              <p className="text-sm text-muted-foreground">
                                Update your profile photo
                              </p>
                            </div>
                            <Button variant="outline" className="ml-auto">
                              Change
                            </Button>
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-medium">
                                  Email Notifications
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  Receive email updates
                                </p>
                              </div>
                              <Switch />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="projects">
                  <motion.div {...fadeIn}>
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Your Projects</CardTitle>
                          <Button>
                            <FolderPlus className="mr-2 h-4 w-4" />
                            Add Project
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4">
                          <motion.div
                            className="rounded-lg border p-4 hover:border-primary transition-colors"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">Project Name</h4>
                                <p className="text-sm text-muted-foreground">
                                  Last updated: 2 days ago
                                </p>
                              </div>
                              <Badge variant="secondary">Active</Badge>
                              <Button variant="outline" size="sm">
                                Manage
                              </Button>
                            </div>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="billing">
                  <motion.div {...fadeIn}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Billing and Plans</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <motion.div
                            className="rounded-lg border p-4"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <h3 className="font-medium">Current Plan</h3>
                            <Badge className="mt-2">Free Tier</Badge>
                            <p className="text-sm text-muted-foreground mt-2">
                              Basic features included
                            </p>
                            <Button className="mt-4" variant="outline">
                              Upgrade Plan
                            </Button>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="notifications">
                  <motion.div {...fadeIn}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Notification Preferences</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">
                                Pull Request Reviews
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Get notified when a review is requested
                              </p>
                            </div>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Team Updates</h4>
                              <p className="text-sm text-muted-foreground">
                                Receive team activity notifications
                              </p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </section>
      </main>

      <motion.footer
        className="border-t py-6 md:py-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Code2 className="h-6 w-6" />
            <p className="text-center text-sm leading-loose md:text-left">
              Built by CodeReviewAI. The source code is available on{" "}
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

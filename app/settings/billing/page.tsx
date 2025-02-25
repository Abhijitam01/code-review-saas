"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { Check, Loader2, X } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getUserSubscription } from "@/lib/db"

interface PlanFeature {
  name: string
  free: boolean
  premium: boolean
  team: boolean
}

const features: PlanFeature[] = [
  {
    name: "Projects",
    free: "2 Projects",
    premium: "5 Projects",
    team: "Unlimited",
  },
  {
    name: "Team Members",
    free: "1 Member",
    premium: "3 Members",
    team: "Unlimited",
  },
  {
    name: "AI Code Reviews",
    free: "50/month",
    premium: "500/month",
    team: "Unlimited",
  },
  {
    name: "Custom Rules",
    free: false,
    premium: true,
    team: true,
  },
  {
    name: "API Access",
    free: false,
    premium: true,
    team: true,
  },
  {
    name: "Priority Support",
    free: false,
    premium: true,
    team: true,
  },
]

export default function BillingPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [subscription, setSubscription] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState("premium")
  const [couponCode, setCouponCode] = useState("")

  useEffect(() => {
    async function getSubscription() {
      if (session?.user) {
        const sub = await getUserSubscription(session.user.id)
        setSubscription(sub)
      }
    }
    getSubscription()
  }, [session])

  useEffect(() => {
    if (searchParams?.get("success")) {
      router.replace("/settings/billing")
    }
    if (searchParams?.get("canceled")) {
      router.replace("/settings/billing")
    }
  }, [searchParams, router])

  const onSubmit = async () => {
    setLoading(true)

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: selectedPlan,
          couponCode,
        }),
      })

      const { url } = await response.json()
      router.push(url)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container max-w-6xl py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold">Billing & Plans</h1>
          <p className="text-muted-foreground">Manage your subscription and billing information</p>
        </div>

        {searchParams?.get("success") && (
          <Alert>
            <Check className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>Your subscription has been updated successfully.</AlertDescription>
          </Alert>
        )}

        {searchParams?.get("canceled") && (
          <Alert variant="destructive">
            <X className="h-4 w-4" />
            <AlertTitle>Canceled</AlertTitle>
            <AlertDescription>The subscription update was canceled.</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Free</CardTitle>
              <CardDescription>Perfect for individual developers</CardDescription>
              <p className="text-3xl font-bold">$0</p>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2 text-sm">
                {features.map((feature) => (
                  <li key={feature.name} className="flex items-center gap-2">
                    {feature.free ? (
                      <Check className="h-4 w-4 text-primary" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{typeof feature.free === "string" ? feature.free : feature.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" disabled={subscription?.plan === "free"}>
                Current Plan
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col border-primary">
            <CardHeader>
              <CardTitle>Premium</CardTitle>
              <CardDescription>For professional developers</CardDescription>
              <p className="text-3xl font-bold">$29</p>
              <p className="text-sm text-muted-foreground">per month</p>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2 text-sm">
                {features.map((feature) => (
                  <li key={feature.name} className="flex items-center gap-2">
                    {feature.premium ? (
                      <Check className="h-4 w-4 text-primary" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{typeof feature.premium === "string" ? feature.premium : feature.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => {
                  setSelectedPlan("premium")
                  onSubmit()
                }}
                disabled={loading || subscription?.plan === "premium"}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {subscription?.plan === "premium" ? "Current Plan" : "Upgrade to Premium"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Team</CardTitle>
              <CardDescription>For teams and organizations</CardDescription>
              <p className="text-3xl font-bold">$99</p>
              <p className="text-sm text-muted-foreground">per month</p>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2 text-sm">
                {features.map((feature) => (
                  <li key={feature.name} className="flex items-center gap-2">
                    {feature.team ? (
                      <Check className="h-4 w-4 text-primary" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{typeof feature.team === "string" ? feature.team : feature.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => {
                  setSelectedPlan("team")
                  onSubmit()
                }}
                disabled={loading || subscription?.plan === "team"}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {subscription?.plan === "team" ? "Current Plan" : "Upgrade to Team"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Have a coupon code?</CardTitle>
            <CardDescription>Enter your coupon code to get a discount</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="coupon">Coupon Code</Label>
              <div className="flex gap-2">
                <Input
                  id="coupon"
                  placeholder="Enter code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button variant="outline">Apply</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


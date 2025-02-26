import Image from "next/image"
import { Star } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Senior Developer at TechCorp",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "CodeReviewAI has completely transformed our code review process. The AI suggestions are spot-on, and the social sharing feature has helped me build my personal brand while coding.",
      stars: 5,
    },
    {
      name: "Michael Chen",
      role: "Open Source Contributor",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "As an open source maintainer, I love how CodeReviewAI helps me manage PRs more efficiently. The automated reviews save me hours every week, and the quality of contributions has improved.",
      stars: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Frontend Developer",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "The performance optimization suggestions have made my React components so much faster. Plus, being able to share my improvements on Twitter with just one click is amazing!",
      stars: 4,
    },
  ]

  return (
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {testimonials.map((testimonial, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">{testimonial.name}</h4>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
            <div className="flex mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < testimonial.stars ? "text-yellow-400 fill-yellow-400" : "text-muted"}`}
                />
              ))}
            </div>
            <p className="text-muted-foreground">{testimonial.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


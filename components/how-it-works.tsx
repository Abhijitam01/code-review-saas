import { ArrowRight, Code, GitPullRequest, Share2, Zap } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: <GitPullRequest className="h-10 w-10 text-primary" />,
      title: "Connect Your Repository",
      description: "Link your GitHub repositories to CodeReviewAI with just a few clicks.",
    },
    {
      icon: <Code className="h-10 w-10 text-primary" />,
      title: "Commit Your Code",
      description: "Work on your code as usual and push your changes to GitHub.",
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Get AI Reviews",
      description: "Our AI automatically analyzes your code and provides optimization suggestions.",
    },
    {
      icon: <Share2 className="h-10 w-10 text-primary" />,
      title: "Share Your Journey",
      description: "Generate AI-powered tweets with code previews to share your progress with the world.",
    },
  ]

  return (
    <div className="mt-16">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-10 left-[calc(100%-10px)] transform -translate-x-1/2">
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}


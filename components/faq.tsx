import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  const faqs = [
    {
      question: "How does the AI code review work?",
      answer:
        "Our AI analyzes your code using advanced machine learning models trained on millions of code repositories. It identifies potential bugs, performance issues, security vulnerabilities, and suggests optimizations based on best practices and patterns it has learned.",
    },
    {
      question: "Do I need to know AI to use CodeReviewAI?",
      answer:
        "Not at all! CodeReviewAI is designed to be user-friendly for all developers. The AI works behind the scenes, and you interact with simple, clear suggestions and explanations.",
    },
    {
      question: "How secure is my code with CodeReviewAI?",
      answer:
        "We take security very seriously. Your code is encrypted in transit and at rest, and we never store your code longer than needed for analysis. We also offer private deployments for enterprise customers with strict security requirements.",
    },
    {
      question: "Can I use CodeReviewAI with private repositories?",
      answer:
        "Yes! CodeReviewAI works with both public and private repositories. When you connect your GitHub account, you can choose which repositories to give access to.",
    },
    {
      question: "How does the social sharing feature work?",
      answer:
        "After each commit, CodeReviewAI can automatically generate an engaging tweet about your code changes, along with a beautiful code snippet preview. You can edit the tweet before posting, and share it to Twitter with just one click.",
    },
    {
      question: "Can I customize the AI review rules?",
      answer:
        "Yes, premium and team plans allow you to customize the review rules. You can set specific focus areas, ignore certain types of suggestions, and even train the AI on your team's coding standards.",
    },
  ]

  return (
    <div className="mx-auto max-w-3xl mt-12">
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}


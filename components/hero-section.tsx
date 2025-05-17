"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function HeroSection() {
  const router = useRouter()

  const navigateToDashboard = () => {
    router.push("/dashboard")
  }

  return (
    <section className="py-20 md:py-28 lg:py-36">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 relative">
            Experience the Future of AI Conversations
            <span className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full blur-3xl bg-yellow-200/30 rounded-full"></span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            HuggingMind AI delivers fast, private, and intelligent chatbot experiences.
          </p>
          <div className="pt-6">
            <Button
              size="lg"
              onClick={navigateToDashboard}
              className="bg-black text-white hover:bg-gray-800 relative overflow-hidden group"
            >
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              <span className="absolute -inset-3 -z-10 bg-yellow-400/20 scale-0 rounded-full group-hover:scale-100 transition-transform duration-300"></span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

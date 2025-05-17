"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SendIcon, Loader2, MessageSquare, Sparkles } from "lucide-react"

export function ChatUI() {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsLoading(true)
    setResponse("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setResponse(
        `This is a simulated response to: "${prompt}"\n\nIn a production environment, this would connect to your AI model backend to generate a real response.`,
      )
    } catch (error) {
      console.error("Error:", error)
      setResponse("Sorry, there was an error processing your request.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="chat-section" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-yellow-100 rounded-full mb-4">
            <Sparkles className="h-5 w-5 text-yellow-500" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Chat with HuggingMind AI</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the power of HuggingMind AI with our interactive assistant. Ask a question and see how our AI
            responds.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto border-none shadow-xl bg-white overflow-hidden">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-yellow-500" />
              </div>
              <CardTitle>AI Assistant</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {response ? (
              <div className="mb-6 p-5 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="h-4 w-4 text-yellow-400" />
                  </div>
                  <div>
                    <div className="font-medium mb-1">HuggingMind AI</div>
                    <p className="text-gray-700 whitespace-pre-wrap">{response}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center mb-4">
                  <MessageSquare className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Start a conversation</h3>
                <p className="text-gray-500 max-w-md">
                  Ask a question or start a conversation with HuggingMind AI to see how it responds.
                </p>
              </div>
            )}
          </CardContent>

          <CardFooter className="p-4 border-t border-gray-100 bg-gray-50/50">
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Input
                placeholder="Ask me anything..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 focus-visible:ring-yellow-400/50 bg-white border-gray-200"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="bg-black hover:bg-gray-800 hover:shadow-[0_0_10px_rgba(250,204,21,0.3)] transition-shadow"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendIcon className="h-4 w-4" />}
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}

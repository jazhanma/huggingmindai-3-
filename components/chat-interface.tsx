"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SendIcon, Loader2 } from "lucide-react"

export function ChatInterface() {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsLoading(true)
    setResponse("")

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      if (!res.ok) {
        throw new Error("Failed to fetch response")
      }

      const data = await res.json()
      setResponse(data.response)
    } catch (error) {
      console.error("Error:", error)
      setResponse("Sorry, there was an error processing your request.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="chat-section" className="container py-12 md:py-16">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Chat with HuggingMind AI</CardTitle>
        </CardHeader>
        <CardContent>
          {response && (
            <div className="mb-6 p-4 bg-muted/50 rounded-lg">
              <p className="whitespace-pre-wrap">{response}</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <Input
              placeholder="Ask me anything..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !prompt.trim()}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendIcon className="h-4 w-4" />}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </section>
  )
}

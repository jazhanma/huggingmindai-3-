"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { SendIcon, Loader2, User, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `This is a simulated response to: "${input}"\n\nIn a production environment, this would connect to your AI model backend to generate a real response.`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 2000)
  }

  return (
    <Card className="flex flex-col h-[calc(100vh-12rem)] bg-white shadow-sm border-none overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center mb-4">
              <MessageSquare className="h-8 w-8 text-yellow-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">Start a conversation</h3>
            <p className="text-gray-500 max-w-md">
              Ask a question or start a conversation with HuggingMind AI to see how it responds.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn("flex gap-3 max-w-[80%]", message.role === "user" ? "ml-auto" : "mr-auto")}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                </div>
              )}
              <div
                className={cn(
                  "rounded-lg p-3",
                  message.role === "user" ? "bg-black text-white" : "bg-gray-100 text-gray-800",
                )}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <div className={cn("text-xs mt-1", message.role === "user" ? "text-gray-300" : "text-gray-500")}>
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
              )}
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex gap-3 max-w-[80%]">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-1">
              <Sparkles className="h-4 w-4 text-yellow-400" />
            </div>
            <div className="rounded-lg p-4 bg-gray-100 text-gray-800">
              <div className="flex space-x-2">
                <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 focus-visible:ring-yellow-400/50"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-black text-white hover:bg-gray-800 hover:shadow-[0_0_10px_rgba(250,204,21,0.3)] transition-shadow"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendIcon className="h-4 w-4" />}
          </Button>
        </form>
      </div>
    </Card>
  )
}

// Import MessageSquare for the empty state
import { MessageSquare } from "lucide-react"

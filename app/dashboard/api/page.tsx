"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, RefreshCw, Play, Key, Clock, AlertCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function ApiPage() {
  const [apiKey, setApiKey] = useState("hm_sk_1a2b3c4d5e6f7g8h9i0j")
  const [testPrompt, setTestPrompt] = useState("What is the capital of France?")
  const [testResponse, setTestResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    // In a real app, you would show a toast notification here
  }

  const handleRegenerateApiKey = () => {
    // In a real app, this would call an API to regenerate the key
    setApiKey(`hm_sk_${Math.random().toString(36).substring(2, 15)}`)
  }

  const handleTestApi = () => {
    setIsLoading(true)
    setTestResponse("")

    // Simulate API call
    setTimeout(() => {
      setTestResponse(
        `Paris is the capital of France. It is known as the "City of Light" and is famous for landmarks such as the Eiffel Tower, the Louvre Museum, and Notre-Dame Cathedral.`,
      )
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">API Access</h1>
        <p className="text-muted-foreground">Access HuggingMind AI programmatically through our REST API.</p>
      </div>

      <Tabs defaultValue="keys" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
          <TabsTrigger value="test">Test API</TabsTrigger>
        </TabsList>

        <TabsContent value="keys" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys for accessing HuggingMind AI.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="api-key">Your API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="api-key"
                    value={apiKey}
                    readOnly
                    type="password"
                    className="font-mono focus-visible:ring-yellow-400/50"
                  />
                  <Button variant="outline" size="icon" onClick={handleCopyApiKey} title="Copy API Key">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleRegenerateApiKey} title="Regenerate API Key">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Keep your API key secret. Do not share it in client-side code.
                </p>
              </div>

              <div className="rounded-md bg-yellow-50 p-4 border border-yellow-200">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Important</h3>
                    <div className="mt-1 text-sm text-yellow-700">
                      <p>
                        Regenerating your API key will invalidate your previous key immediately. Make sure to update any
                        applications using the old key.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">API Usage</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">1,248</div>
                      <p className="text-xs text-muted-foreground">Total API calls</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">42</div>
                      <p className="text-xs text-muted-foreground">Calls today</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">5,000</div>
                      <p className="text-xs text-muted-foreground">Monthly limit</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Recent API Calls</h3>
                <div className="border rounded-md">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="px-4 py-2 text-left font-medium">Timestamp</th>
                          <th className="px-4 py-2 text-left font-medium">Endpoint</th>
                          <th className="px-4 py-2 text-left font-medium">Status</th>
                          <th className="px-4 py-2 text-left font-medium">Tokens</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="px-4 py-2 font-mono text-xs">2023-05-15 14:32:45</td>
                          <td className="px-4 py-2">/v1/chat</td>
                          <td className="px-4 py-2">
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              200 OK
                            </Badge>
                          </td>
                          <td className="px-4 py-2">245</td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-4 py-2 font-mono text-xs">2023-05-15 13:21:18</td>
                          <td className="px-4 py-2">/v1/completions</td>
                          <td className="px-4 py-2">
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              200 OK
                            </Badge>
                          </td>
                          <td className="px-4 py-2">876</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 font-mono text-xs">2023-05-15 11:05:33</td>
                          <td className="px-4 py-2">/v1/chat</td>
                          <td className="px-4 py-2">
                            <Badge variant="outline" className="bg-red-50 text-red-700">
                              401 Unauthorized
                            </Badge>
                          </td>
                          <td className="px-4 py-2">0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="gap-2 bg-black text-white hover:bg-gray-800">
                <Key className="h-4 w-4" />
                Create New API Key
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="docs" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>Learn how to use the HuggingMind AI API.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Authentication</h3>
                <p className="text-sm">
                  All API requests require authentication using your API key. Include your API key in the request
                  headers:
                </p>
                <div className="rounded-md bg-gray-950 p-4">
                  <pre className="text-sm text-gray-100 overflow-auto">
                    <code>{`Authorization: Bearer ${apiKey}`}</code>
                  </pre>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Chat Endpoint</h3>
                <p className="text-sm">The chat endpoint allows you to have a conversation with the AI assistant.</p>
                <div className="rounded-md bg-gray-950 p-4">
                  <pre className="text-sm text-gray-100 overflow-auto">
                    <code>{`POST https://api.huggingmind.ai/v1/chat

{
  "model": "llama2-7b",
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful assistant."
    },
    {
      "role": "user",
      "content": "What is the capital of France?"
    }
  ],
  "temperature": 0.7
}`}</code>
                  </pre>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Completions Endpoint</h3>
                <p className="text-sm">The completions endpoint allows you to generate text completions.</p>
                <div className="rounded-md bg-gray-950 p-4">
                  <pre className="text-sm text-gray-100 overflow-auto">
                    <code>{`POST https://api.huggingmind.ai/v1/completions

{
  "model": "llama2-7b",
  "prompt": "Write a poem about artificial intelligence",
  "max_tokens": 256,
  "temperature": 0.7
}`}</code>
                  </pre>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Code Examples</h3>
                <Tabs defaultValue="javascript">
                  <TabsList>
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                  </TabsList>
                  <TabsContent value="javascript" className="mt-2">
                    <div className="rounded-md bg-gray-950 p-4">
                      <pre className="text-sm text-gray-100 overflow-auto">
                        <code>{`// Using fetch
const response = await fetch('https://api.huggingmind.ai/v1/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ${apiKey}'
  },
  body: JSON.stringify({
    model: 'llama2-7b',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant.'
      },
      {
        role: 'user',
        content: 'What is the capital of France?'
      }
    ],
    temperature: 0.7
  })
});

const data = await response.json();
console.log(data.choices[0].message.content);`}</code>
                      </pre>
                    </div>
                  </TabsContent>
                  <TabsContent value="python" className="mt-2">
                    <div className="rounded-md bg-gray-950 p-4">
                      <pre className="text-sm text-gray-100 overflow-auto">
                        <code>{`import requests

response = requests.post(
    'https://api.huggingmind.ai/v1/chat',
    headers={
        'Content-Type': 'application/json',
        'Authorization': f'Bearer ${apiKey}'
    },
    json={
        'model': 'llama2-7b',
        'messages': [
            {
                'role': 'system',
                'content': 'You are a helpful assistant.'
            },
            {
                'role': 'user',
                'content': 'What is the capital of France?'
            }
        ],
        'temperature': 0.7
    }
)

data = response.json()
print(data['choices'][0]['message']['content'])`}</code>
                      </pre>
                    </div>
                  </TabsContent>
                  <TabsContent value="curl" className="mt-2">
                    <div className="rounded-md bg-gray-950 p-4">
                      <pre className="text-sm text-gray-100 overflow-auto">
                        <code>{`curl -X POST https://api.huggingmind.ai/v1/chat \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -d '{
    "model": "llama2-7b",
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": "What is the capital of France?"
      }
    ],
    "temperature": 0.7
  }'`}</code>
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="test" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Test API</CardTitle>
              <CardDescription>Try out the API directly from this interface.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="endpoint">Endpoint</Label>
                <Select defaultValue="chat">
                  <SelectTrigger id="endpoint">
                    <SelectValue placeholder="Select endpoint" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chat">/v1/chat</SelectItem>
                    <SelectItem value="completions">/v1/completions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Select defaultValue="llama2-7b">
                  <SelectTrigger id="model">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="llama2-7b">LLaMA 2 7B Chat</SelectItem>
                    <SelectItem value="llama2-13b">LLaMA 2 13B Chat</SelectItem>
                    <SelectItem value="mistral-7b">Mistral 7B</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt">Prompt</Label>
                <Textarea
                  id="prompt"
                  value={testPrompt}
                  onChange={(e) => setTestPrompt(e.target.value)}
                  rows={3}
                  className="resize-none focus-visible:ring-yellow-400/50"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Response</Label>
                  {isLoading && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 animate-spin" />
                      <span>Processing...</span>
                    </div>
                  )}
                </div>
                <div className="rounded-md border p-4 min-h-[150px] bg-gray-50">
                  {testResponse ? (
                    <p className="whitespace-pre-wrap">{testResponse}</p>
                  ) : (
                    <p className="text-muted-foreground text-sm italic">
                      {isLoading ? "Generating response..." : "Response will appear here"}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                <Clock className="inline-block h-4 w-4 mr-1" />
                Response time: {testResponse ? "1.2s" : "N/A"}
              </div>
              <Button
                className="gap-2 bg-black text-white hover:bg-gray-800"
                onClick={handleTestApi}
                disabled={isLoading || !testPrompt.trim()}
              >
                {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                Test API
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

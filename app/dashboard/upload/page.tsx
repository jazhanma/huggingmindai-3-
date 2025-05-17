"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileText, Database, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file upload
      console.log("File uploaded:", e.dataTransfer.files[0].name)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Upload Center</h1>
        <p className="text-muted-foreground">Upload documents and data to enhance your AI's knowledge.</p>
      </div>

      <Tabs defaultValue="files" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Files</CardTitle>
              <CardDescription>Upload PDF, TXT, CSV, or DOCX files to enhance your AI's knowledge.</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center ${
                  dragActive ? "border-yellow-400 bg-yellow-50" : "border-gray-200"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                    <Upload className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium">Drag and drop files here</p>
                    <p className="text-sm text-muted-foreground mt-1">or click to browse your files</p>
                  </div>
                  <Input type="file" className="hidden" id="file-upload" multiple accept=".pdf,.txt,.csv,.docx" />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById("file-upload")?.click()}
                    className="mt-2"
                  >
                    Browse Files
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3">Uploaded Files</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">example-document.pdf</p>
                        <p className="text-xs text-muted-foreground">2.4 MB • Uploaded 2 days ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="text" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Paste Text</CardTitle>
              <CardDescription>Paste text directly to enhance your AI's knowledge.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="text-title">Title</Label>
                  <Input
                    id="text-title"
                    placeholder="Enter a title for this text"
                    className="focus-visible:ring-yellow-400/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="text-content">Content</Label>
                  <textarea
                    id="text-content"
                    rows={10}
                    placeholder="Paste or type your text here..."
                    className="w-full min-h-[200px] p-3 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-black text-white hover:bg-gray-800 hover:shadow-[0_0_10px_rgba(250,204,21,0.3)] transition-shadow">
                Save Text
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Database Connection</CardTitle>
              <CardDescription>Connect to a database to enhance your AI's knowledge.</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Coming Soon</AlertTitle>
                <AlertDescription>
                  Database connection functionality is coming soon. Stay tuned for updates!
                </AlertDescription>
              </Alert>

              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Database className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Database Connection</h3>
                <p className="text-gray-500 max-w-md mb-6">
                  Connect your database to allow HuggingMind AI to access and learn from your data.
                </p>
                <Button disabled>Connect Database</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

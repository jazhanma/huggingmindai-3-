"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { SignInModal } from "@/components/sign-in-modal"

interface SignUpModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SignUpModal({ open, onOpenChange }: SignUpModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [signInOpen, setSignInOpen] = useState(false)

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sign up logic here
    console.log("Sign up with:", name, email, password)
    onOpenChange(false)
  }

  const openSignIn = () => {
    onOpenChange(false)
    setSignInOpen(true)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Create an Account</DialogTitle>
            <DialogDescription>Join HuggingMind AI to experience the future of AI conversations.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSignUp} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="focus-visible:ring-yellow-400/50"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus-visible:ring-yellow-400/50"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus-visible:ring-yellow-400/50"
                required
              />
              <p className="text-xs text-gray-500">Password must be at least 8 characters long.</p>
            </div>
            <DialogFooter className="flex-col gap-2 sm:gap-0">
              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800 hover:shadow-[0_0_15px_rgba(250,204,21,0.3)] transition-shadow"
              >
                Sign Up
              </Button>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Button
                  variant="link"
                  onClick={openSignIn}
                  className="p-0 h-auto text-yellow-500 hover:text-yellow-600"
                >
                  Sign In
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {signInOpen && <SignInModal open={signInOpen} onOpenChange={setSignInOpen} />}
    </>
  )
}

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
import { SignUpModal } from "@/components/sign-up-modal"

interface SignInModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SignInModal({ open, onOpenChange }: SignInModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [signUpOpen, setSignUpOpen] = useState(false)

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sign in logic here
    console.log("Sign in with:", email, password)
    onOpenChange(false)
  }

  const openSignUp = () => {
    onOpenChange(false)
    setSignUpOpen(true)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Sign In</DialogTitle>
            <DialogDescription>Enter your credentials to access your account.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSignIn} className="space-y-4 py-4">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button variant="link" size="sm" className="text-xs text-yellow-500 hover:text-yellow-600 p-0 h-auto">
                  Forgot password?
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus-visible:ring-yellow-400/50"
                required
              />
            </div>
            <DialogFooter className="flex-col gap-2 sm:gap-0">
              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800 hover:shadow-[0_0_15px_rgba(250,204,21,0.3)] transition-shadow"
              >
                Sign In
              </Button>
              <div className="mt-4 text-center text-sm">
                Don't have an account?{" "}
                <Button
                  variant="link"
                  onClick={openSignUp}
                  className="p-0 h-auto text-yellow-500 hover:text-yellow-600"
                >
                  Sign Up
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <SignUpModal open={signUpOpen} onOpenChange={setSignUpOpen} />
    </>
  )
}

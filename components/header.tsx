"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SignInModal } from "@/components/sign-in-modal"
import { SignUpModal } from "@/components/sign-up-modal"
import { Menu, X } from "lucide-react"
import { Logo } from "./logo"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [signInOpen, setSignInOpen] = useState(false)
  const [signUpOpen, setSignUpOpen] = useState(false)

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  const navItems = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "FAQ", href: "#faq" },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-yellow-500 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSignInOpen(true)}
                className="text-gray-700 hover:text-yellow-500 hover:bg-yellow-50"
              >
                Sign In
              </Button>
              <Button
                size="sm"
                onClick={() => setSignUpOpen(true)}
                className="bg-black text-white hover:bg-gray-800 hover:shadow-[0_0_15px_rgba(250,204,21,0.3)] transition-shadow"
              >
                Sign Up
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pt-4 pb-2 space-y-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-gray-700 hover:text-yellow-500 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
              <div className="flex space-x-4 pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-gray-700 hover:text-yellow-500 hover:bg-yellow-50"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setSignInOpen(true)
                  }}
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  className="w-full bg-black text-white hover:bg-gray-800 hover:shadow-[0_0_15px_rgba(250,204,21,0.3)] transition-shadow"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setSignUpOpen(true)
                  }}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      <SignInModal open={signInOpen} onOpenChange={setSignInOpen} />
      <SignUpModal open={signUpOpen} onOpenChange={setSignUpOpen} />
    </>
  )
}

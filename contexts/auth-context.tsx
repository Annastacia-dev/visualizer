"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

// Define user type
type User = {
  id: string
  name: string
  email: string
  avatar?: string
}

// Define auth context type
type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Sample users for demo
const DEMO_USERS = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    password: "password123",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("visualizer_user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("visualizer_user")
      }
    }
    setIsLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Find user with matching credentials
    const foundUser = DEMO_USERS.find((u) => u.email === email && u.password === password)

    if (!foundUser) {
      setIsLoading(false)
      throw new Error("Invalid email or password")
    }

    // Create user object (excluding password)
    const { password: _, ...userWithoutPassword } = foundUser

    // Store user in state and localStorage
    setUser(userWithoutPassword)
    localStorage.setItem("visualizer_user", JSON.stringify(userWithoutPassword))

    setIsLoading(false)
    router.push("/")
  }

  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    if (DEMO_USERS.some((u) => u.email === email)) {
      setIsLoading(false)
      throw new Error("Email already in use")
    }

    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      avatar: `/placeholder.svg?height=40&width=40`,
    }

    // In a real app, you would save this to a database
    // For demo purposes, we'll just set the user state

    setUser(newUser)
    localStorage.setItem("visualizer_user", JSON.stringify(newUser))

    setIsLoading(false)
    router.push("/")
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("visualizer_user")
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Update the ProtectedRoute component to allow access to the landing page
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading && !user && pathname !== "/login" && pathname !== "/signup" && pathname !== "/landing") {
      router.push("/login")
    }
  }, [user, isLoading, router, pathname])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!user && pathname !== "/login" && pathname !== "/signup" && pathname !== "/landing") {
    return null
  }

  return <>{children}</>
}

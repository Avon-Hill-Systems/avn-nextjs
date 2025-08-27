import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3000", // Your backend auth endpoint
})

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
} = authClient

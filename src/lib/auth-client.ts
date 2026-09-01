import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server. Undefined in browser defaults to /api/auth via Next.js rewrite */
    baseURL: typeof window !== "undefined" ? undefined : (process.env.NEXT_PUBLIC_API_URL || process.env.BETTER_AUTH_URL || "http://localhost:5000"),
})

export const { signIn, signUp, useSession } = authClient
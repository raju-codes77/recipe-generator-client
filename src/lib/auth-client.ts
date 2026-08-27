import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server */
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:5000",
})

export const { signIn, signUp, useSession } = authClient
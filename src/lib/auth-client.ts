import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // Keep the auth cookie on the same backend origin used by Community API calls.
    // This avoids a session cookie being set on the frontend origin by the auth rewrite
    // while authenticated Community requests are sent directly to the API origin.
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",

    fetchOptions: {
        credentials: "include",
    },
});

export const {
    signIn,
    signUp,
    signOut,
    useSession,
} = authClient;

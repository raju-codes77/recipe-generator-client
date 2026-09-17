import { createAuthClient } from "better-auth/react";
import { getApiBaseUrl } from "./api-url";

export const authClient = createAuthClient({
    baseURL: getApiBaseUrl(),

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

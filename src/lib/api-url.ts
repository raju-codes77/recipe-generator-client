/**
 * Returns the API base URL for use in client-side fetch calls.
 *
 * Always returns "" so all requests go to the Next.js proxy at /api/...
 * The global proxy (src/app/api/[...proxy]/route.ts) will forward them
 * to NEXT_PUBLIC_API_URL (the real Express backend).
 *
 * Server-side Next.js Route Handlers read process.env.NEXT_PUBLIC_API_URL directly.
 */
export function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    // Client-side: use relative path to hit the Next.js proxy
    return "";
  }
  // Server-side: use absolute path to hit the backend directly (fixes URL parsing TypeError)
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
}

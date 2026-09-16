/**
 * Returns the base URL for API requests.
 *
 * In the browser, returns "" (empty string) so that fetch calls hit the
 * Next.js rewrite proxy at the same origin — this ensures session cookies
 * are always sent (same-site).
 *
 * On the server (SSR / Route Handlers), returns the full backend URL so
 * that server-to-server calls reach the Express backend directly.
 */
export function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    // Browser: use relative URLs → Next.js rewrites proxy them to the backend
    return "";
  }
  // Server-side: call the backend directly
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
}

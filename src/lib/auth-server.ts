import { cookies, headers } from "next/headers";

export interface UserSession {
  session: {
    id: string;
    userId: string;
    token: string;
    expiresAt: string;
    createdAt: string;
    updatedAt: string;
    ipAddress?: string | null;
    userAgent?: string | null;
  };
  user: {
    id: string;
    email: string;
    name?: string;
    role?: string;
    image?: string | null;
    [key: string]: any;
  };
}

/**
 * Server-side session verification for Next.js Server Components and layouts.
 *
 * Calls the Better Auth backend directly with the full cookie header.
 * This is the source of truth for route protection in server layouts.
 *
 * IMPORTANT: NEXT_PUBLIC_API_URL must be set in Vercel's frontend project
 * environment variables to: https://food-canvas-server.vercel.app
 */
export async function getServerSession(): Promise<UserSession | null> {
  // NEXT_PUBLIC_API_URL must point to the Express/Better Auth backend
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl || apiUrl.includes("localhost")) {
    // In production, log a warning but do not crash.
    // This allows local development to continue working.
    if (process.env.NODE_ENV === "production") {
      console.error(
        "[auth-server] WARNING: NEXT_PUBLIC_API_URL is not configured correctly. " +
        "Set NEXT_PUBLIC_API_URL=https://food-canvas-server.vercel.app in Vercel frontend env vars."
      );
    }
  }

  const backendUrl = apiUrl || "http://localhost:5000";

  try {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    if (!allCookies || allCookies.length === 0) {
      return null;
    }

    const cookieHeader = allCookies.map((c) => `${c.name}=${c.value}`).join("; ");

    // Build a clean origin — must be scheme+host ONLY (no path).
    // Never forward the raw 'referer' header because it contains the full page
    // path (e.g. http://localhost:3000/dashboard/user) which Express CORS rejects.
    const incomingHeaders = await headers();
    const rawOrigin =
      incomingHeaders.get("origin") ||
      process.env.NEXT_PUBLIC_APP_URL ||
      (backendUrl.includes("localhost") ? "http://localhost:3000" : "https://food-canvas.vercel.app");

    // Parse to guarantee we only send scheme://host (strip any path)
    let safeOrigin = rawOrigin;
    try {
      const parsed = new URL(rawOrigin);
      safeOrigin = parsed.origin; // always just scheme+host, no path
    } catch {
      // if parsing fails, use a safe default
      safeOrigin = "http://localhost:3000";
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5 s timeout

    const res = await fetch(`${backendUrl}/api/auth/get-session`, {
      method: "GET",
      headers: {
        cookie: cookieHeader,
        origin: safeOrigin,
      },
      cache: "no-store",
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    if (!data || !data.user) {
      return null;
    }

    return data as UserSession;
  } catch (error) {
    // Do not throw — let the layout handle null session gracefully
    if (process.env.NODE_ENV !== "production") {
      console.error("[auth-server] getServerSession error:", error);
    }
    return null;
  }
}

export function isUserAdmin(session: UserSession | null): boolean {
  if (!session?.user) return false;
  return String(session.user.role || "").trim().toLowerCase() === "admin";
}

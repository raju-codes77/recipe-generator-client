import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSessionCookie } from "better-auth/cookies"

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Quick cookie presence check (no network call)
    const sessionCookie = getSessionCookie(request)

    if (!sessionCookie) {
        // No session cookie at all — redirect to login immediately
        const loginUrl = new URL('/registrationProcess/login', request.url)
        loginUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(loginUrl)
    }

    // Role-based protection — requires verifying session with the backend
    if (pathname.startsWith('/dashboard')) {
        // IMPORTANT: Use the direct backend URL to avoid going through Next.js rewrites.
        // In production, NEXT_PUBLIC_API_URL must be set to https://food-canvas-server.vercel.app
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
        let sessionData: { session?: any; user?: { id: string; email: string; role?: string } } | null = null

        try {
            const cookieHeader = request.headers.get("cookie") || ""

            // Safe debug log (never logs cookie values)
            console.log("[Proxy] Session check | NODE_ENV:", process.env.NODE_ENV, "| hasCookieHeader:", !!cookieHeader, "| pathname:", pathname)

            const authRes = await fetch(`${backendUrl}/api/auth/get-session`, {
                method: "GET",
                headers: {
                    cookie: cookieHeader,
                    // Pass origin so Better Auth's trusted origin check can pass
                    origin: request.nextUrl.origin,
                    host: new URL(backendUrl).host,
                },
                cache: "no-store",
            })

            console.log("[Proxy] /api/auth/get-session ->", authRes.status, "| hasSession:", authRes.ok)

            if (authRes.ok) {
                sessionData = await authRes.json()
                console.log("[Proxy] sessionData.user exists:", !!sessionData?.user, "| role:", sessionData?.user?.role ?? "NONE")
            }
        } catch (err) {
            console.error("[Proxy] Auth session check error:", err)
        }

        // FAIL CLOSED: if session cannot be verified, redirect to login
        if (!sessionData?.user) {
            const loginUrl = new URL('/registrationProcess/login', request.url)
            loginUrl.searchParams.set('callbackUrl', pathname)
            return NextResponse.redirect(loginUrl)
        }

        const role = String(sessionData.user.role || "user").trim().toLowerCase()
        const isAdmin = role === "admin"

        // Canonical /dashboard -> role-specific dashboard
        if (pathname === '/dashboard' || pathname === '/dashboard/') {
            return NextResponse.redirect(new URL(isAdmin ? '/dashboard/admin' : '/dashboard/user', request.url))
        }

        // Canonicalize /dashboard/users -> /dashboard/user
        if (!isAdmin && (pathname === '/dashboard/users' || pathname === '/dashboard/users/')) {
            return NextResponse.redirect(new URL('/dashboard/user', request.url))
        }

        // Admin route protection — non-admins redirected to user dashboard
        if (pathname.startsWith('/dashboard/admin')) {
            if (!isAdmin) {
                return NextResponse.redirect(new URL('/dashboard/user', request.url))
            }
        }

        // User route protection — admins redirected to admin dashboard
        if (pathname.startsWith('/dashboard/user') || pathname.startsWith('/dashboard/users')) {
            if (isAdmin) {
                return NextResponse.redirect(new URL('/dashboard/admin', request.url))
            }
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/dashboard",
        "/dashboard/:path*",
        "/recipes/:path+",
        "/ai-tools/:path+",
    ],
}
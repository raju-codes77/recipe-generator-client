import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSessionCookie } from "better-auth/cookies"

export async function proxy(request: NextRequest) {
    const sessionCookie = getSessionCookie(request)
    const { pathname } = request.nextUrl

    // 1. If no session cookie exists and route is protected, redirect to login
    if (!sessionCookie) {
        return NextResponse.redirect(new URL('/registrationProcess/login', request.url))
    }

    // 2. Role-based protection for all /dashboard routes
    if (pathname.startsWith('/dashboard')) {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
        let sessionData: { session?: any; user?: { id: string; email: string; role?: string } } | null = null

        try {
            const cookieHeader = request.headers.get("cookie") || ""
            const authRes = await fetch(`${backendUrl}/api/auth/get-session`, {
                headers: {
                    cookie: cookieHeader,
                },
                cache: "no-store",
            })

            if (authRes.ok) {
                sessionData = await authRes.json()
            }
        } catch (err) {
            console.error("Middleware auth session check error:", err)
        }

        // If session cookie is invalid or expired
        if (!sessionData?.user) {
            return NextResponse.redirect(new URL('/registrationProcess/login', request.url))
        }

        const role = String(sessionData.user.role || "user").trim().toLowerCase()
        const isAdmin = role === "admin"

        // Canonical root /dashboard route -> redirect to role-specific dashboard
        if (pathname === '/dashboard' || pathname === '/dashboard/') {
            return NextResponse.redirect(new URL(isAdmin ? '/dashboard/admin' : '/dashboard/user', request.url))
        }

        // Canonicalize plural /dashboard/users to singular /dashboard/user
        if (!isAdmin && (pathname === '/dashboard/users' || pathname === '/dashboard/users/')) {
            return NextResponse.redirect(new URL('/dashboard/user', request.url))
        }

        // Admin route access restriction
        if (pathname.startsWith('/dashboard/admin')) {
            if (!isAdmin) {
                // Deny non-admin and redirect to user dashboard
                return NextResponse.redirect(new URL('/dashboard/user', request.url))
            }
        }

        // User route access restriction
        if (pathname.startsWith('/dashboard/user') || pathname.startsWith('/dashboard/users')) {
            if (isAdmin) {
                // Deny admin from user dashboard and redirect to admin dashboard
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
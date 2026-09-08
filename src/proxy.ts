import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSessionCookie } from "better-auth/cookies"

export function proxy(request: NextRequest) {
    const sessionCookie = getSessionCookie(request)

    if (!sessionCookie) {
        return NextResponse.redirect(new URL('/registrationProcess/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/recipes/:path+",
        "/ai-tools/:path+",
    ],
}
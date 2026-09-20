import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const sessionCookie = getSessionCookie(request);

    const isAuthRoute = pathname.startsWith("/registrationProcess");

    // Login / Register pages
    if (isAuthRoute) {
        if (sessionCookie) {
            return NextResponse.redirect(
                new URL("/dashboard/user", request.url)
            );
        }

        return NextResponse.next();
    }

    // Protected routes
    if (!sessionCookie) {
        const loginUrl = new URL(
            "/registrationProcess/login",
            request.url
        );

        loginUrl.searchParams.set(
            "callbackUrl",
            pathname
        );

        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/recipes/:path+",
        "/ai-tools/:path+",
        "/registrationProcess/:path*",
    ],
};
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const sessionCookie = getSessionCookie(request);

    // Auth pages: redirect to dashboard if already logged in
    const isAuthRoute = pathname.startsWith("/registrationProcess");
    if (isAuthRoute) {
        if (sessionCookie) {
            return NextResponse.redirect(new URL("/dashboard/users", request.url));
        }
        return NextResponse.next();
    }

    // Protected routes: require login
    if (!sessionCookie) {
        const loginUrl = new URL("/registrationProcess/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/meal-planner/:path*",
        "/pro/:path*",
        "/ai-tools/:path*",
        "/registrationProcess/:path*",
    ],
};
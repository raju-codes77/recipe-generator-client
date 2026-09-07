import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
        const response = await fetch(`${apiUrl}/api/auth/get-session`, {
            method: "GET",
            headers: {
                cookie: request.headers.get("cookie") ?? "",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            return NextResponse.redirect(
                new URL("/registrationProcess/login", request.url)
            );
        }

        const data = await response.json();

        if (!data?.session) {
            return NextResponse.redirect(
                new URL("/registrationProcess/login", request.url)
            );
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Proxy auth check failed:", error);

        return NextResponse.redirect(
            new URL("/registrationProcess/login", request.url)
        );
    }
}

export const config = {
    matcher: [
        // Dashboard
        "/dashboard/:path*",


        "/recipes/:path+",


        "/ai-tools/:path+",
    ],
};
import { NextResponse } from "next/server";

// Increase the maximum execution duration to prevent timeouts on long-running AI streams and DB queries
export const maxDuration = 60;

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// These API prefixes already have dedicated Next.js Route Handlers OR are
// handled directly by the client (auth). Do NOT intercept them here.
const DEDICATED_ROUTE_PREFIXES: string[] = [];

async function proxyRequest(request: Request, props: { params: Promise<{ proxy: string[] }> }) {
  const params = await props.params;
  const pathSegments = params.proxy;
  const path = pathSegments.join("/");

  // Skip proxying for dedicated routes — return 404 so Next.js router can handle them
  const firstSegment = pathSegments[0] || "";
  if (DEDICATED_ROUTE_PREFIXES.includes(firstSegment)) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  const searchParams = new URL(request.url).search;
  const targetUrl = `${BACKEND_URL}/api/${path}${searchParams}`;

  try {
    const headers = new Headers();

    // Only forward safe, non-restricted headers to prevent Vercel 503 crashes.
    const safeHeaders = [
      "cookie",
      "authorization",
      "content-type",
      "accept",
      "user-agent",
      "x-timezone",
      "x-client-version",
    ];

    request.headers.forEach((value, key) => {
      if (safeHeaders.includes(key.toLowerCase())) {
        headers.set(key, value);
      }
    });

    // CRITICAL for Better Auth CSRF protection (fixes 403 Forbidden on POST like sign-out):
    // Better Auth requires an 'origin' header for POST requests.
    // However, we cannot blindly forward 'referer' because it contains a path which Express CORS rejects.
    // So we manually construct a clean origin (scheme://host) based on the incoming request.
    try {
      const incomingOrigin = request.headers.get("origin") || request.headers.get("referer") || request.url;
      const cleanOrigin = new URL(incomingOrigin).origin; // Guaranteed to be just scheme://host
      headers.set("origin", cleanOrigin);
    } catch {
      // Fallback
      headers.set("origin", "http://localhost:3000");
    }


    const fetchOptions: RequestInit & { duplex?: string } = {
      method: request.method,
      headers,
      cache: "no-store",
    };

    if (request.method !== "GET" && request.method !== "HEAD") {
      try {
        const bodyBuffer = await request.arrayBuffer();
        if (bodyBuffer.byteLength > 0) {
          fetchOptions.body = bodyBuffer;
        }
      } catch (e) {
        // Body already consumed or empty
      }
    }

    const res = await fetch(targetUrl, fetchOptions);

    const responseHeaders = new Headers(res.headers);
    // Let Next.js handle content-encoding — avoid double-decompression issues
    responseHeaders.delete("content-encoding");
    responseHeaders.delete("content-length");

    // CRITICAL: Better Auth may set the cookie Domain to the backend URL (e.g. food-canvas-server.vercel.app).
    // If we proxy this directly to the browser, the browser will reject it because the Domain doesn't match
    // the frontend URL (food-canvas.vercel.app). We MUST strip the Domain attribute so the browser assigns
    // the cookie to the frontend domain.
    if (res.headers.has("set-cookie")) {
      const setCookies = res.headers.getSetCookie();
      responseHeaders.delete("set-cookie");
      for (let cookie of setCookies) {
        cookie = cookie.replace(/Domain=[^;]+;?\s*/gi, "");
        responseHeaders.append("set-cookie", cookie);
      }
    }

    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error(`[Global Proxy Error] ${request.method} ${targetUrl}:`, error);
    return NextResponse.json({ message: "Backend server unreachable or timed out" }, { status: 502 });
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
export const OPTIONS = proxyRequest;

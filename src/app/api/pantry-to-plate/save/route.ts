import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cookie = request.headers.get("cookie");
    const res = await fetch(`${BACKEND_URL}/api/pantry-to-plate/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(cookie ? { cookie } : {}),
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Proxy save error:", error);
    return NextResponse.json(
      { success: false, message: "Backend server unreachable" },
      { status: 502 }
    );
  }
}

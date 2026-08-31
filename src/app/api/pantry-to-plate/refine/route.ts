import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: Request) {
  const body: { id: string; refinement: string } = await request.json();

  try {
    const res = await fetch(`${BACKEND_URL}/api/pantry-to-plate/refine`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ message: data.message || "Failed to refine recipe" }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy refine error:", error);
    return NextResponse.json({ message: "Backend server unreachable" }, { status: 502 });
  }
}
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No image uploaded. Attach a file under the 'image' field." },
        { status: 400 }
      );
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type. Use JPG, PNG, or WebP." },
        { status: 415 }
      );
    }

    const maxBytes = 10 * 1024 * 1024;
    if (file.size > maxBytes) {
      return NextResponse.json(
        { error: "File too large. Max size is 10MB." },
        { status: 413 }
      );
    }

    // Forward the file to the Node.js backend
    const backendFormData = new FormData();
    backendFormData.append("image", file);

    const response = await fetch("http://localhost:5000/api/meals/analyze", {
      method: "POST",
      body: backendFormData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Backend analysis failed");
    }

    const result = await response.json();
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Nutrition analyze error:", error);
    return NextResponse.json(
      { error: error.message || "Analysis failed. Try again." },
      { status: 500 }
    );
  }
}
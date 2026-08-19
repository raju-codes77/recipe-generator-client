import { NutritionResult } from "@/types/nutrition";
import { NextRequest, NextResponse } from "next/server";
// import type { NutritionResult } from "@/types/nutrition";

// DEMO ROUTE — replace with the real pipeline once the Node.js/Express +
// Prisma/PostgreSQL backend is wired up. This just simulates latency and
// returns a fixed payload so the frontend can be built against a stable shape.

function buildMockResult(): NutritionResult {
  return {
    id: crypto.randomUUID(),
    foodName: "Grilled chicken salad bowl",
    tag: "Healthy choice",
    imageUrl: "/demo/salad-bowl.jpg",
    detectedItems: [
      { name: "Chicken", icon: "meat" },
      { name: "Avocado", icon: "avocado" },
      { name: "Tomato", icon: "apple" },
      { name: "Quinoa", icon: "seed" },
      { name: "Lettuce", icon: "leaf" },
      { name: "Red onion", icon: "default" },
    ],
    confidenceScore: 92,
    calories: 520,
    macros: [
      { label: "Protein", grams: 41, percent: 32, color: "success" },
      { label: "Carbs", grams: 49, percent: 38, color: "warning" },
      { label: "Fat", grams: 17, percent: 30, color: "pro" },
    ],
    micros: [
      { label: "Fiber", value: "8g", color: "success" },
      { label: "Sugar", value: "6g", color: "warning" },
      { label: "Sodium", value: "620mg", color: "accent" },
    ],
    healthScore: 8.5,
    healthScoreLabel: "Very good",
    scoreBreakdown: [
      { label: "Nutrient balance", value: 8.6 },
      { label: "Low in sugar", value: 7.9 },
      { label: "Protein quality", value: 9.0 },
    ],
    insights: [
      {
        title: "High in protein",
        description: "Great source of lean protein for muscle growth and repair.",
        icon: "meat",
      },
      {
        title: "Rich in fiber",
        description: "Good amount of fiber supports digestion and gut health.",
        icon: "cactus",
      },
      {
        title: "Balanced meal",
        description: "Good balance of protein, carbs and healthy fats.",
        icon: "scale",
      },
    ],
    recommendations: [
      {
        title: "Add more greens",
        description: "Try adding spinach or kale for more vitamins.",
        icon: "leaf",
      },
      {
        title: "Healthy fats",
        description: "Add a few nuts or seeds for extra omega-3 fats.",
        icon: "avocado",
      },
      {
        title: "Hydration",
        description: "Drink more water to support digestion.",
        icon: "droplet",
      },
    ],
    analyzedAt: new Date().toISOString(),
  };
}

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

    // Simulate model inference latency.
    await new Promise((resolve) => setTimeout(resolve, 1400));

    const result = buildMockResult();
    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Analysis failed. Try again." },
      { status: 500 }
    );
  }
}
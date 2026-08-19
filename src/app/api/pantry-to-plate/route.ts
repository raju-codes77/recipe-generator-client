import { Recipe ,GenerateRecipePayload} from "@/components/aitools/Pantry-to-Plate AI/types";
import { NextResponse } from "next/server";
// import { GenerateRecipePayload, Recipe } from "../../../components/types";

// DEMO ONLY. Later replace the body of this function with:
//   1. A Gemini API call using `ingredients` + preferences to generate the recipe JSON
//   2. A Prisma write to save the recipe (and read from a `SavedRecipe` / `Ingredient` table)
// The request/response shape below is what the frontend already expects,
// so the components and the hook won't need to change.
export async function POST(request: Request) {
  const body: GenerateRecipePayload = await request.json();
  const { ingredients = [], cuisine, mealType, cookingTime, diet, servings } = body;

  // simulate network + AI latency
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const recipe: Recipe = {
    title: "Garlic Chicken Fried Rice Bowl",
    description:
      "A quick weeknight bowl built from your pantry staples — savory, protein-forward, and ready in under 30 minutes.",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1000&auto=format&fit=crop",
    time: "28m",
    level: "Easy",
    kcal: "520",
    protein: "36g",
    whyChosen: `Built around ${ingredients.slice(0, 4).join(", ") || "your pantry items"}, kept within your "${cookingTime}" limit, and tuned for a ${diet.toLowerCase()} ${mealType.toLowerCase()} in ${cuisine} style for ${servings} serving(s).`,
    ingredients: [
      "2 cups cooked rice, chilled",
      "1 chicken breast, diced",
      "2 eggs, beaten",
      "3 cloves garlic, minced",
      "Soy sauce, sesame oil, spring onion",
    ],
    instructions: [
      "Scramble eggs in a hot wok, remove and set aside.",
      "Sear chicken until golden, add garlic until fragrant.",
      "Add rice, breaking up clumps, stir-fry 3–4 minutes.",
      "Fold in egg, sauce, and spring onion off heat.",
    ],
  };

  return NextResponse.json(recipe);
}
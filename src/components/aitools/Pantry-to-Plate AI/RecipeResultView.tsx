"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { ArrowLeft, Sparkles, Bookmark, Share2, RotateCcw, Replace, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { Recipe } from "./types";
import RefineChips from "./RefineChips";
import HealthScoreCard from "./HealthScoreCard";

const DEFAULT_FOOD_IMAGE =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80";

function sanitizeImageUrl(url?: string): string {
  if (!url || typeof url !== "string" || !url.trim() || url.includes("source.unsplash.com")) {
    return DEFAULT_FOOD_IMAGE;
  }
  return url;
}

interface RecipeResultViewProps {
  recipe: Recipe;
  onBack: () => void;
  onRefine: (refinement: string) => void;
  refiningOption: string | null;
}

// ─── Inline Ingredient Substitution ──────────────────────────────────────────

interface SubResult {
  name: string;
  amount: string;
  reason: string;
}

function IngredientSubPanel({ ingredient, recipeTitle }: { ingredient: string; recipeTitle: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subs, setSubs] = useState<SubResult[] | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const fetchSubs = async () => {
    if (subs) { setOpen((o) => !o); return; }
    setOpen(true);
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/ingredient-substitution`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredient, recipeContext: recipeTitle }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setSubs(data.substitutes || []);
    } catch {
      toast.error(`Could not find substitutes for ${ingredient}`);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <li className="space-y-1">
      <div className="flex items-center gap-2 group">
        <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
        <span className="flex-1 text-sm text-zinc-600 dark:text-zinc-300">{ingredient}</span>
        <button
          onClick={fetchSubs}
          title={`Find substitutes for ${ingredient}`}
          className="opacity-0 group-hover:opacity-100 transition flex items-center gap-1 text-[10px] text-rose-500 hover:text-rose-700 font-semibold px-1.5 py-0.5 rounded-md border border-rose-200 dark:border-rose-800/50 hover:bg-rose-50 dark:hover:bg-rose-950/30"
        >
          <Replace className="w-3 h-3" /> Sub
        </button>
      </div>

      {open && (
        <div className="ml-5 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40 rounded-xl p-3 space-y-2">
          {loading ? (
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Loader2 className="w-3 h-3 animate-spin" /> Finding substitutes...
            </div>
          ) : subs && subs.length > 0 ? (
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">Substitutes for {ingredient}</p>
              {subs.map((s, i) => (
                <div key={i} className="text-xs space-y-0.5">
                  <p className="font-semibold text-zinc-800 dark:text-zinc-100">{s.name} <span className="text-rose-600 dark:text-rose-400 font-normal">— {s.amount}</span></p>
                  <p className="text-zinc-500 dark:text-zinc-400 italic">{s.reason}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-zinc-400">No substitutes found.</p>
          )}
        </div>
      )}
    </li>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RecipeResultView({ recipe, onBack, onRefine, refiningOption }: RecipeResultViewProps) {
  const [imgSrc, setImgSrc] = useState<string>(() => sanitizeImageUrl(recipe?.image));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setImgSrc(sanitizeImageUrl(recipe?.image));
    setIsLoading(true);
  }, [recipe?.image]);

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-300">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline mb-2"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Generator
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left column — image + stats + health score */}
        <div className="space-y-5">
          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-md border border-zinc-200/60 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800">
            <Image
              src={imgSrc}
              alt={recipe?.title || "Recipe Image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
              priority
              unoptimized
              onLoadingComplete={() => setIsLoading(false)}
              onError={() => {
                setImgSrc(DEFAULT_FOOD_IMAGE);
                setIsLoading(false);
              }}
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 animate-pulse">
                <span className="text-xs text-zinc-400 font-medium">Loading AI generated photo...</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              <Sparkles className="w-3.5 h-3.5" /> AI Generated
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{recipe.title}</h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
              {recipe.description}
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
            <Stat label="Time" value={recipe.time} />
            <Stat label="Level" value={recipe.level} />
            <Stat label="Kcal" value={recipe.kcal} />
            <Stat label="Protein" value={recipe.protein} />
          </div>

          {/* ─── Health Score ─── */}
          <HealthScoreCard
            kcal={recipe.kcal}
            protein={recipe.protein}
            time={recipe.time}
            level={recipe.level}
            instructions={recipe.instructions}
            ingredients={recipe.ingredients}
          />

          <div className="bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-800/50 p-4 rounded-2xl space-y-1.5">
            <div className="flex items-center gap-1.5 text-purple-700 dark:text-purple-300 font-semibold text-xs sm:text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Why CookAI chose this recipe</span>
            </div>
            <p className="text-xs sm:text-sm text-purple-900/80 dark:text-purple-200/80 leading-relaxed">
              {recipe.whyChosen}
            </p>
          </div>
        </div>

        {/* Right column — ingredients (with substitution) + instructions + actions */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Ingredients</h3>
              <span className="text-[10px] text-zinc-400 font-medium flex items-center gap-1">
                <Replace className="w-3 h-3" /> Hover an ingredient to substitute
              </span>
            </div>
            <ul className="space-y-2">
              {recipe.ingredients.map((item, idx) => (
                <IngredientSubPanel key={idx} ingredient={item} recipeTitle={recipe.title} />
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold">Instructions</h3>
            <ol className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
              {recipe.instructions.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200 flex-shrink-0">
                    {idx + 1}.
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <RefineChips onRefine={onRefine} refiningOption={refiningOption} />

          <div className="pt-2 space-y-3">
            <button
              onClick={async () => {
                if (!recipe?.id) {
                  toast.error("Recipe ID is missing");
                  return;
                }
                const toastId = toast.loading("Comparing recipe with your pantry...");
                try {
                  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
                  const res = await fetch(`${apiUrl}/api/shopping-list/from-recipe`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ recipeId: recipe.id }),
                    credentials: "include",
                  });

                  if (!res.ok) throw new Error("Failed to add missing ingredients");
                  const data = await res.json();
                  toast.success(
                    data.message || "Missing ingredients added to your shopping list!",
                    { id: toastId }
                  );
                } catch (err: any) {
                  toast.error(err.message || "Failed to add to shopping list", { id: toastId });
                }
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-sm hover:shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4" /> Add Missing Ingredients to Shopping List
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => toast.success("Recipe saved!")}
                className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Bookmark className="w-4 h-4" /> Save Recipe
              </button>
              <button
                onClick={() => toast.success("Publish link copied!")}
                className="w-full py-3 px-4 rounded-2xl bg-zinc-900 hover:bg-black dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 text-white font-semibold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Share2 className="w-4 h-4" /> Publish
              </button>
            </div>
            <div className="text-center">
              <button
                onClick={onBack}
                className="text-xs text-zinc-500 dark:text-zinc-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Start over
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800 p-2.5 rounded-xl">
      <p className="text-base sm:text-lg font-bold">{value}</p>
      <p className="text-[11px] text-zinc-400 font-medium">{label}</p>
    </div>
  );
}
"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { ArrowLeft, Sparkles, Bookmark, Share2, RotateCcw } from "lucide-react";
import { Recipe } from "./types";
import RefineChips from "./RefineChips";
// import RefineChips from "./RefineChips";
// import { Recipe } from "./types";

interface RecipeResultViewProps {
  recipe: Recipe;
  onBack: () => void;
}

export default function RecipeResultView({ recipe, onBack }: RecipeResultViewProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-300">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline mb-2"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Generator
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-5">
          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-md border border-zinc-200/60 dark:border-zinc-800">
            <Image src={recipe.image} alt={recipe.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" priority />
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

        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-lg font-bold">Ingredients</h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
              {recipe.ingredients.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
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

          <RefineChips />

          <div className="pt-2 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => toast.success("Recipe saved!")}
                className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition"
              >
                <Bookmark className="w-4 h-4" /> Save Recipe
              </button>
              <button
                onClick={() => toast.success("Publish link copied!")}
                className="w-full py-3 px-4 rounded-2xl bg-zinc-900 hover:bg-black dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 text-white font-semibold text-sm flex items-center justify-center gap-2 transition"
              >
                <Share2 className="w-4 h-4" /> Publish
              </button>
            </div>
            <div className="text-center">
              <button
                onClick={onBack}
                className="text-xs text-zinc-500 dark:text-zinc-400 hover:underline inline-flex items-center gap-1"
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
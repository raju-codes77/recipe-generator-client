"use client";

import { Sparkles, Clock } from "lucide-react";

interface HeroProps {
  recentIngredients: string[];
  onAddIngredient: (name: string) => void;
  onClearRecent: () => void;
}

export default function Hero({ recentIngredients, onAddIngredient, onClearRecent }: HeroProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
      <div className="space-y-3 text-left max-w-xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          Pantry-to-Plate <span className="text-orange-500">AI</span>
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
          Turn your available ingredients into delicious recipes. Reduce food waste and get smart
          recipe suggestions.
        </p>
        <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-3.5 py-1.5 rounded-full text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-medium">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Powered by advanced AI to create recipes youll love</span>
        </div>
      </div>

      <div className="w-full md:w-80 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-sm space-y-3 flex-shrink-0">
        <div className="flex justify-between items-center text-xs sm:text-sm">
          <span className="font-semibold flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-zinc-400" /> Recent Ingredients
          </span>
          <button onClick={onClearRecent} className="text-red-500 hover:underline font-medium text-xs">
            Clear all
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {recentIngredients.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onAddIngredient(item)}
              className="bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900 border border-emerald-200/60 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs px-2.5 py-1 rounded-lg transition"
            >
              {item}
            </button>
          ))}
          {recentIngredients.length === 0 && (
            <p className="text-xs text-zinc-400">No recent history.</p>
          )}
        </div>
      </div>
    </div>
  );
}
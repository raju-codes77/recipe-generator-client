"use client";

import { Plus, X, Leaf, Sparkles } from "lucide-react";
import { SUGGESTIONS } from "./constants";
// import { SUGGESTIONS } from "./constants";

interface PantryPanelProps {
  ingredients: string[];
  inputValue: string;
  setInputValue: (value: string) => void;
  onAdd: (name: string) => void;
  onRemove: (item: string) => void;
  onClear: () => void;
}

export default function PantryPanel({
  ingredients,
  inputValue,
  setInputValue,
  onAdd,
  onRemove,
  onClear,
}: PantryPanelProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex items-center gap-3">
        <span className="w-7 h-7 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-sm">
          1
        </span>
        <h2 className="text-lg font-bold">Whats in your pantry?</h2>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onAdd(inputValue)}
          placeholder="Add an ingredient..."
          className="flex-1 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          onClick={() => onAdd(inputValue)}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs font-semibold text-zinc-500">
          <span>Your Ingredients ({ingredients.length})</span>
          {ingredients.length > 0 && (
            <button onClick={onClear} className="text-red-500 hover:underline text-xs">
              Clear all
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
          {ingredients.map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium"
            >
              {item}
              <button
                onClick={() => onRemove(item)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>

        {ingredients.length > 0 && (
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 p-3 rounded-xl text-xs sm:text-sm flex items-center gap-2">
            <Leaf className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Great! These ingredients can make many delicious recipes.</span>
          </div>
        )}
      </div>

      <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>AI Smart Suggestions</span>
        </div>
        <p className="text-xs text-zinc-400">Quick add popular ingredients</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {SUGGESTIONS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onAdd(item)}
              className="border border-emerald-600 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 px-3 py-1 rounded-xl text-xs font-medium transition"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
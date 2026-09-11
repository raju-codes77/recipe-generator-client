"use client";

import React, { useState } from "react";
import { Replace, Search, Loader2, Info, Link2 } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function IngredientSubstitutionPage() {
  const [recipeContext, setRecipeContext] = useState("");
  const [missingIngredient, setMissingIngredient] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!missingIngredient.trim()) {
      toast.error("Please enter the ingredient to substitute!");
      return;
    }

    setIsSearching(true);
    setResults(null);

    try {
      const res = await fetch(`${apiUrl}/api/ingredient-substitution`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredient: missingIngredient.trim(),
          recipeContext: recipeContext.trim(),
        }),
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to find substitutes");
      }

      const data = await res.json();
      if (!data.substitutes || data.substitutes.length === 0) {
        toast.error("No substitutes found for this ingredient.");
        return;
      }
      setResults(data.substitutes);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-rose-50 dark:bg-rose-900/20 rounded-3xl p-8 mb-8 border border-rose-100 dark:border-rose-800/50 flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-rose-500/30">
          <Replace size={32} />
        </div>
        <div className="text-center md:text-left flex-grow">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Smart Ingredient Substitution</h1>
          <p className="text-slate-600 dark:text-slate-300">
            Don't have an ingredient? Find smart AI alternatives tailored to your recipe and context.
          </p>
        </div>
      </div>

      {/* Tip banner */}
      <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 rounded-2xl text-sm flex items-center gap-3 border border-emerald-100 dark:border-emerald-800/30">
        <Link2 size={16} className="shrink-0" />
        <p>
          <strong>Tip:</strong> Ingredient substitution is also available inline on every recipe result page —{" "}
          <Link href="/ai-tools/ingredient-rescue" className="underline font-semibold hover:text-emerald-600">
            try AI Ingredient Rescue
          </Link>
          {" "}and hover any ingredient to see substitutes.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-700 shadow-sm mb-8">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Ingredient to Substitute *
              </label>
              <input
                type="text"
                value={missingIngredient}
                onChange={(e) => setMissingIngredient(e.target.value)}
                placeholder="e.g. Heavy Cream, Eggs, Buttermilk..."
                className="w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Recipe Context (Optional)
              </label>
              <input
                type="text"
                value={recipeContext}
                onChange={(e) => setRecipeContext(e.target.value)}
                placeholder="e.g. Chicken Alfredo, Baking a cake..."
                className="w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSearching}
            className="w-full py-4 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            {isSearching ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
            {isSearching ? "Finding Substitutes..." : "Find Alternatives"}
          </button>
        </form>
      </div>

      {/* Results */}
      {results && !isSearching && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
            Best alternatives for <span className="text-rose-600 dark:text-rose-500">{missingIngredient}</span>
          </h2>
          {recipeContext && (
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex items-center gap-2">
              <Info size={16} /> Context: {recipeContext}
            </p>
          )}

          <div className="space-y-4">
            {results.map((sub: any, idx: number) => (
              <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col md:flex-row gap-6">
                <div className="md:w-16 shrink-0 flex md:flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 text-rose-600 font-black text-xl rounded-full flex items-center justify-center">
                    #{idx + 1}
                  </div>
                </div>

                <div className="flex-grow space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{sub.name}</h3>
                    <p className="text-sm font-semibold text-rose-600 dark:text-rose-400 mt-1">Use: {sub.amount}</p>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 bg-amber-50 dark:bg-amber-900/10 p-3 rounded-lg border border-amber-100 dark:border-amber-900/20 italic">
                    {sub.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

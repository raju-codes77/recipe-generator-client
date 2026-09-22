"use client";

import { useEffect, useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import RecipeCard from "@/components/recipes/RecipeCard";

export default function RecommendedRecipes() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [personalized, setPersonalized] = useState(false);
  const [reason, setReason] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        const res = await apiClient.get<any>("/recommendations?limit=4");
        
        if (res.success && res.data?.recommendations) {
          setRecipes(res.data.recommendations);
          setPersonalized(res.data.personalized);
          setReason(res.data.reason || "Explore popular recipes");
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to load recommendations:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-12 px-6 lg:px-8 bg-white dark:bg-[#080B12]">
        <div className="max-w-[1200px] mx-auto flex items-center justify-center min-h-[200px]">
          <Loader2 className="w-6 h-6 animate-spin text-[#24733E]" />
        </div>
      </section>
    );
  }

  if (error || recipes.length === 0) {
    return null; // Fail gracefully
  }

  return (
    <section className="w-full py-12 lg:py-16 px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-[#080B12] dark:to-black">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-[#24733E] dark:text-[#10B981] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{personalized ? "Recommended for You" : "Popular for You"}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">
            {personalized ? "Curated to Your Taste" : "Explore Popular Recipes"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg">
            {reason}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.map((recipe, idx) => (
            <RecipeCard key={recipe.id} recipe={recipe} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

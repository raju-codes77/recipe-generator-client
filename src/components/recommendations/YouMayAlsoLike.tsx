"use client";

import { useEffect, useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import RecipeCard from "@/components/recipes/RecipeCard";

export default function YouMayAlsoLike({ currentRecipeId }: { currentRecipeId: string }) {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        const res = await apiClient.get<any>(`/recommendations?limit=4&contextRecipeId=${currentRecipeId}`);
        
        if (res.success && res.data?.recommendations) {
          setRecipes(res.data.recommendations);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to load related recommendations:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (currentRecipeId) {
      fetchRecommendations();
    }
  }, [currentRecipeId]);

  if (loading) {
    return (
      <div className="w-full py-8 flex items-center justify-center min-h-[150px]">
        <Loader2 className="w-5 h-5 animate-spin text-[#24733E]" />
      </div>
    );
  }

  if (error || recipes.length === 0) {
    return null; // Fail gracefully
  }

  return (
    <div className="w-full mt-10 pt-10 border-t border-gray-200 dark:border-white/10">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-4 h-4 text-orange-500" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          You May Also Like
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recipes.map((recipe, idx) => (
          <RecipeCard key={recipe.id} recipe={recipe} index={idx} />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { apiClient } from "@/lib/api-client";
import RecipeCard from "@/components/recipes/RecipeCard";
import RecipeSkeleton from "@/components/recipes/RecipeSkeleton";
import { useSplitTextReveal } from "@/hooks/useSplitTextReveal";

function RecommendedRecipesHeader({ personalized, reason }: { personalized: boolean; reason: string }) {
  const headerRef = useRef<HTMLDivElement>(null);
  useSplitTextReveal(headerRef);

  return (
    <div ref={headerRef} className="mb-8 flex flex-col items-center text-center">
      <h2 data-split-reveal className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">
        {personalized ? "Curated to Your Taste" : "Explore Popular Recipes"}
      </h2>
      <p data-split-reveal className="text-sm text-gray-500 dark:text-gray-400 max-w-lg">
        {reason}
      </p>
    </div>
  );
}

export default function RecommendedRecipes() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [personalized, setPersonalized] = useState(false);
  const [reason, setReason] = useState("Explore popular recipes");
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

  if (!loading && (error || recipes.length === 0)) {
    return null; // Fail gracefully
  }

  return (
    <section aria-busy={loading} className="w-full py-12 lg:py-16 px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-[#080B12] dark:to-black">
      <div className="max-w-[1200px] mx-auto">
        <RecommendedRecipesHeader personalized={personalized} reason={reason} />

        {loading ? (
          <div role="status" aria-label="Loading popular recipes" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[0, 1, 2, 3].map((index) => <RecipeSkeleton key={index} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recipes.map((recipe, idx) => (
              <RecipeCard key={recipe.id} recipe={recipe} index={idx} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { apiClient } from "@/lib/api-client";
import RecipeCard from "@/components/recipes/RecipeCard";
import RecipeSkeleton from "@/components/recipes/RecipeSkeleton";
import { FiBookOpen } from "react-icons/fi";
import Link from "next/link";

export default function MyRecipesDashboardPage() {
  const { data: session } = authClient.useSession();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMyRecipes() {
      if (!session?.user?.id) {
        setIsLoading(false);
        return;
      }
      try {
        const data = await apiClient.get<any>(`/recipes?tab=my-recipes&userId=${session.user.id}`);
        if (data.success && Array.isArray(data.recipes)) {
          setRecipes(data.recipes);
        }
      } catch (err) {
        console.error("Failed to fetch recipes:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMyRecipes();
  }, [session?.user?.id]);

  if (isLoading) {
    return (
      <div className="p-6 sm:p-10">
        <h1 className="mb-6 text-3xl font-black text-slate-900 dark:text-white">My Recipes</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => <RecipeSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">My Recipes</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage and view all the recipes you have created.</p>
      </div>

      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recipes.map((recipe, index) => (
            <div key={recipe.id} className="w-full">
              <RecipeCard recipe={recipe} index={index} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-[32px] border border-dashed border-[#dfe8da] bg-[#fbfdf9] py-20 px-4 text-center dark:border-white/10 dark:bg-[#101611]">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#edf4e9] text-[#2F8F46] dark:bg-[#2F8F46]/20 dark:text-[#B7E35F]">
            <FiBookOpen size={28} />
          </div>
          <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">You haven't added any recipe</h3>
          <p className="mb-6 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            Create your first recipe to see it appear here. You can generate recipes with AI or write your own.
          </p>
          <Link
            href="/dashboard/users/ai-recepi-generator"
            className="inline-flex items-center gap-2 rounded-xl bg-[#2F8F46] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[#2F8F46]/20 transition-transform hover:-translate-y-0.5 hover:bg-[#235f31]"
          >
            Generate Recipe
          </Link>
        </div>
      )}
    </div>
  );
}

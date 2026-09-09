"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Users } from "lucide-react";

interface RecipeItem {
  id: string;
  title: string;
  image: string;
  time: number;
  rating: number;
  category: string;
}

interface DetailsSidebarProps {
  recipeId?: string;
  recipeCategory?: string;
  recipeImage?: string;
  recipeUser?: {
    name?: string;
    image?: string;
  };
}

// Full Sidebar Skeleton matching the entire layout
const FullSidebarSkeleton = () => {
  return (
    <div className="lg:col-span-4 flex flex-col gap-6 animate-pulse">

      {/* 1. ABOUT THE AUTHOR SKELETON */}
      <div className="bg-white dark:bg-[#131B2E] p-5 rounded-[24px] border border-gray-100 dark:border-white/10 shadow-sm">
        <div className="h-3 bg-gray-200 dark:bg-white/10 rounded-md w-1/3 mb-4" />
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-white/10 shrink-0" />
            <div>
              <div className="h-4 bg-gray-200 dark:bg-white/10 rounded-md w-28 mb-1.5" />
              <div className="h-3 bg-gray-200 dark:bg-white/10 rounded-md w-20" />
            </div>
          </div>
          <div className="h-8 w-16 rounded-full bg-gray-200 dark:bg-white/10" />
        </div>
        <div className="h-3 bg-gray-200 dark:bg-white/10 rounded-md w-full mb-2" />
        <div className="h-3 bg-gray-200 dark:bg-white/10 rounded-md w-3/4 mb-4" />
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100 dark:border-white/10">
          <div className="flex flex-col items-center gap-1">
            <div className="h-3.5 bg-gray-200 dark:bg-white/10 rounded w-6" />
            <div className="h-2.5 bg-gray-200 dark:bg-white/10 rounded w-10" />
          </div>
          <div className="flex flex-col items-center gap-1 border-x border-gray-100 dark:border-white/10">
            <div className="h-3.5 bg-gray-200 dark:bg-white/10 rounded w-6" />
            <div className="h-2.5 bg-gray-200 dark:bg-white/10 rounded w-10" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-3.5 bg-gray-200 dark:bg-white/10 rounded w-6" />
            <div className="h-2.5 bg-gray-200 dark:bg-white/10 rounded w-10" />
          </div>
        </div>
      </div>

      {/* 2. YOU MIGHT ALSO LIKE SKELETON */}
      <div className="bg-white dark:bg-[#131B2E] p-5 rounded-[24px] border border-gray-100 dark:border-white/10 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="h-3 bg-gray-200 dark:bg-white/10 rounded-md w-2/4" />
          <div className="h-3 bg-gray-200 dark:bg-white/10 rounded-md w-12" />
        </div>
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-3 p-2">
              <div className="h-12 w-12 rounded-xl bg-gray-200 dark:bg-white/10 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="h-3.5 bg-gray-200 dark:bg-white/10 rounded-md w-4/5 mb-2" />
                <div className="h-3 bg-gray-200 dark:bg-white/10 rounded-md w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. AI BANNER SKELETON */}
      <div className="bg-emerald-50 dark:bg-[#132A26] p-5 rounded-[24px] border border-emerald-100 dark:border-emerald-900/30">
        <div className="h-4 bg-gray-200 dark:bg-white/10 rounded-md w-3/4 mb-2" />
        <div className="h-3 bg-gray-200 dark:bg-white/10 rounded-md w-full mb-4" />
        <div className="h-10 w-full rounded-xl bg-gray-200 dark:bg-white/10" />
      </div>

    </div>
  );
};

const DetailsSidebar = ({ recipeId, recipeCategory, recipeImage, recipeUser }: DetailsSidebarProps) => {
  const [relatedRecipes, setRelatedRecipes] = useState<RecipeItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const isValidAuthorImage = (url?: string | null): boolean => {
    if (!url || typeof url !== "string") return false;
    const trimmed = url.trim();
    if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
      return false;
    }
    const lower = trimmed.toLowerCase();
    if (lower.includes("facebook.com") || lower.includes("fbcdn.net")) {
      return false;
    }
    return true;
  };

  const authorName = recipeUser?.name || "Anonymous Chef";
  const authorImage = recipeUser?.image;
  const defaultImage = recipeImage || "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=150&q=80";

  useEffect(() => {
    const fetchRelatedRecipes = async () => {
      try {
        setLoading(true);
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        const categoryQuery = recipeCategory ? `category=${encodeURIComponent(recipeCategory)}` : "";
        const excludeQuery = recipeId ? `excludeId=${recipeId}` : "";
        const queryParams = [categoryQuery, excludeQuery, "limit=4"].filter(Boolean).join("&");

        const res = await fetch(`${API_URL}/api/recipes?${queryParams}`);
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("API did not return JSON. Check if backend server is running.");
        }

        const data = await res.json();
        if (data.success) {
          setRelatedRecipes(data.recipes);
        }
      } catch (error) {
        console.error("Failed to fetch related recipes for sidebar:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedRecipes();
  }, [recipeId, recipeCategory]);

  if (loading) {
    return <FullSidebarSkeleton />;
  }

  return (
    <div className="lg:col-span-4 flex flex-col gap-6">

      {/* ABOUT THE AUTHOR CARD */}
      <div className="bg-white dark:bg-[#131B2E] p-5 rounded-[24px] border border-gray-100 dark:border-white/10 shadow-sm">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">About the Author</h3>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center shrink-0">
              {isValidAuthorImage(authorImage) ? (
                <Image
                  src={authorImage!}
                  alt={authorName}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              ) : (
                <Users className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              )}
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">{authorName}</h4>
              <p className="text-[11px] text-gray-400">Food Enthusiast</p>
            </div>
          </div>
          <button className="px-3.5 py-1.5 rounded-full border border-[#24733E] text-[#24733E] dark:border-[#10B981] dark:text-[#10B981] text-xs font-bold hover:bg-[#24733E] hover:text-white transition-colors cursor-pointer">
            Follow
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
          Love creating healthy and delicious recipes with a touch of creativity.
        </p>
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100 dark:border-white/10 text-center">
          <div>
            <span className="text-xs font-bold text-gray-800 dark:text-white block">24</span>
            <span className="text-[9px] text-gray-400">Recipes</span>
          </div>
          <div className="border-x border-gray-100 dark:border-white/10">
            <span className="text-xs font-bold text-gray-800 dark:text-white block">1.2k</span>
            <span className="text-[9px] text-gray-400">Followers</span>
          </div>
          <div>
            <span className="text-xs font-bold text-gray-800 dark:text-white block">180</span>
            <span className="text-[9px] text-gray-400">Following</span>
          </div>
        </div>
      </div>

      {/* YOU MIGHT ALSO LIKE CARD (DYNAMIC CATEGORY RECIPES) */}
      <div className="bg-white dark:bg-[#131B2E] p-5 rounded-[24px] border border-gray-100 dark:border-white/10 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {recipeCategory ? `More in ${recipeCategory}` : "You Might Also Like"}
          </h3>
          <Link href="/recipes" className="text-xs font-semibold text-[#24733E] dark:text-[#10B981] cursor-pointer hover:underline">
            View All
          </Link>
        </div>

        {relatedRecipes.length > 0 ? (
          <div className="flex flex-col gap-3">
            {relatedRecipes.map((item) => (
              <Link
                key={item.id}
                href={`/recipes/${item.id}`}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="relative h-12 w-12 rounded-xl overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={item.image || defaultImage}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-800 dark:text-white truncate">{item.title}</h4>
                  <div className="flex items-center gap-2 mt-0.5 text-[10px] text-gray-400">
                    <span className="flex items-center gap-0.5 text-amber-500 font-semibold">
                      <Star className="h-2.5 w-2.5 fill-current" /> {item.rating || 4.5}
                    </span>
                    <span>•</span>
                    <span>{item.time} min</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400 text-center py-4">No related recipes found in this category.</p>
        )}
      </div>

      {/* AI BANNER CARD */}
      <div className="bg-emerald-50 dark:bg-[#132A26] p-5 rounded-[24px] border border-emerald-100 dark:border-emerald-900/30">
        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Can&apos;t find what you want?</h4>
        <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          Generate recipes from your ingredients with AI.
        </p>
        <Link
          href="/ai-tools/pantry-to-plate"
          className="group relative flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#24733E] via-[#2d8a4a] to-[#10B981] dark:from-[#10B981] dark:via-[#059669] dark:to-[#34D399] text-white dark:text-black text-xs font-bold shadow-lg shadow-emerald-900/10 hover:shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer overflow-hidden border border-emerald-400/20"
        >
          {/* Subtle background shine effect on hover */}
          <div className="absolute inset-0 bg-white/20 dark:bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out pointer-events-none" />

          {/* Sparkle / AI Icon */}
          <span className="flex items-center justify-center p-1 rounded-lg bg-white/20 dark:bg-black/20 text-white dark:text-black group-hover:rotate-12 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L13.09 8.26L19 9.27L14.5 13.97L15.18 20L12 17.27L8.82 20L9.5 13.97L5 9.27L10.91 8.26L12 2Z" />
            </svg>
          </span>

          {/* Button Text */}
          <span className="tracking-wide">Try Pantry-to-Plate AI</span>
        </Link>
      </div>

    </div>
  );
};

export default DetailsSidebar;
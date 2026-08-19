"use client";

import {
  ArrowUpRight,
  Clock3,
  Flame,
  Star,
  Heart,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";

interface Recipe {
  id: string;
  title: string;
  image: string;
  rating: number;
  time: number;
  calories: number;
  cuisine?: string;
}

interface RecipeCardProps {
  recipe: Recipe;
  index?: number;
}

export default function RecipeCard({
  recipe,
  index = 0,
}: RecipeCardProps) {
  // ================= SESSION =================
  const { data: session } = authClient.useSession();

  // ================= FAVORITE STATE =================
  const [isLiked, setIsLiked] = useState(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);

  // ================= CHECK FAVORITE =================
  useEffect(() => {
    if (!session?.user?.id) {
      setIsLiked(false);
      return;
    }

    const checkFavorite = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/favorites/check?userId=${session.user.id}&recipeId=${recipe.id}`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to check favorite"
          );
        }

        setIsLiked(data.isFavorite);
      } catch (error) {
        console.error("Check favorite error:", error);
      }
    };

    checkFavorite();
  }, [session?.user?.id, recipe.id]);

  // ================= ADD / REMOVE FAVORITE =================
  const handleFavorite = async () => {
    if (!session?.user?.id) {
      alert("Please login to save recipes.");
      return;
    }

    if (isFavoriteLoading) return;

    setIsFavoriteLoading(true);

    try {
      if (isLiked) {
        const response = await fetch(
          "http://localhost:5000/api/favorites",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              userId: session.user.id,
              recipeId: recipe.id,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to remove favorite"
          );
        }

        setIsLiked(false);
      } else {
        const response = await fetch(
          "http://localhost:5000/api/favorites",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              userId: session.user.id,
              recipeId: recipe.id,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to add favorite"
          );
        }

        setIsLiked(true);
      }
    } catch (error) {
      console.error("Favorite error:", error);
    } finally {
      setIsFavoriteLoading(false);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-[24px] border border-[#E2EBE4] bg-white p-3 shadow-sm transition-all duration-300 hover:border-[#C5DED0] hover:shadow-md dark:border-white/10 dark:bg-[#131B2E]"
    >
      {/* ================= IMAGE CONTAINER ================= */}
      <div className="relative h-[200px] w-full shrink-0 overflow-hidden rounded-[18px] bg-[#EEF4EF] dark:bg-[#1A233A]">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative h-full w-full"
        >
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </motion.div>

        {/* ================= RATING BADGE ================= */}
        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full border border-white/80 bg-white/90 px-2.5 py-1 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-[#131B2E]/90">
          <Star className="h-3 w-3 fill-[#F6A51A] text-[#F6A51A]" />
          <span className="text-[11px] font-bold text-gray-900 dark:text-white">
            {recipe.rating.toFixed(1)}
          </span>
        </div>

        {/* ================= FAVORITE BUTTON ================= */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.85 }}
          onClick={handleFavorite}
          disabled={isFavoriteLoading}
          className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/80 bg-white/90 shadow-sm backdrop-blur-md transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-[#131B2E]/90 ${
            isLiked
              ? "text-red-500"
              : "text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500"
          }`}
          title={isLiked ? "Remove from favorites" : "Save Recipe"}
        >
          <Heart
            className={`h-4 w-4 ${
              isLiked ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </motion.button>
      </div>

      {/* ================= CONTENT AREA ================= */}
      <div className="flex flex-1 flex-col justify-between pt-3.5 px-1 pb-1">
        <div>
          {/* ================= TITLE ================= */}
          <h3 className="line-clamp-1 text-[16px] font-bold tracking-tight text-gray-900 transition-colors duration-200 group-hover:text-[#24733E] dark:text-white dark:group-hover:text-[#10B981]">
            {recipe.title}
          </h3>

          {/* ================= TIME & CALORIES (Mini Row) ================= */}
          <div className="mt-2 flex items-center justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5 text-[#24733E] dark:text-[#10B981]" />
              <span>{recipe.time} min</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Flame className="h-3.5 w-3.5 text-orange-500" />
              <span>{recipe.calories} kcal</span>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM TAG & COMPACT CTA ================= */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 dark:border-white/10">
          <span className="rounded-full bg-[#EAF4EB] px-2.5 py-0.5 text-[11px] font-semibold text-[#24733E] dark:bg-[#132A26] dark:text-[#10B981]">
            {recipe.cuisine || "Healthy"}
          </span>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            className="flex cursor-pointer items-center gap-1 rounded-xl bg-[#24733E]/10 px-3 py-1.5 text-xs font-bold text-[#24733E] transition-colors hover:bg-[#24733E] hover:text-white dark:bg-[#10B981]/10 dark:text-[#10B981] dark:hover:bg-[#10B981] dark:hover:text-white"
          >
            <span>View</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
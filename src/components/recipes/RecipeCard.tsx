"use client";

import {
  ArrowUpRight,
  Clock3,
  Flame,
  Star,
  Heart,
  Folder,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

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

  // ================= COLLECTION MODAL STATE =================
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [collections, setCollections] = useState<any[]>([]);
  const [loadingCollections, setLoadingCollections] = useState(false);

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
      toast.error("Please login to save recipes.");
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
        toast.success("Removed from favorites");
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
        toast.success("Added to favorites");
      }
    } catch (error) {
      console.error("Favorite error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsFavoriteLoading(false);
    }
  };

  // ================= OPEN COLLECTION MODAL =================
  const handleOpenCollectionModal = async () => {
    if (!session?.user?.id) {
      toast.error("Please login first to save recipes to collections.");
      return;
    }

    setIsCollectionModalOpen(true);
    setLoadingCollections(true);

    try {
      const res = await fetch(`http://localhost:5000/api/collections?userId=${session.user.id}`);
      const data = await res.json();
      if (data.success) {
        setCollections(data.collections);
      } else {
        setCollections([]);
      }
    } catch (err) {
      console.error("Failed to fetch collections:", err);
      toast.error("Failed to load collections");
    } finally {
      setLoadingCollections(false);
    }
  };

  // ================= SAVE TO SPECIFIC COLLECTION WITH TOAST =================
  const handleAddToCollection = async (collectionId: string) => {
    try {
      const res = await fetch("http://localhost:5000/api/collections/add-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collectionId, recipeId: recipe.id }),
      });
      const data = await res.json();
      
      if (data.success) {
        toast.success("Recipe added to collection successfully!");
        setIsCollectionModalOpen(false); // সাকসেস হলে মোডাল বন্ধ হয়ে যাবে
        
        // **সাইডবার সাথে সাথে আপডেট করার জন্য ইভেন্ট ডিসপ্যাচ করা হলো**
        window.dispatchEvent(new Event("collectionUpdated"));
      } else {
        toast.error(data.message || "Recipe already exists in this collection");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
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

          {/* ================= TOP RIGHT ACTION BUTTONS ================= */}
          <div className="absolute right-3 top-3 flex items-center gap-1.5">
            {/* COLLECTION FOLDER BUTTON */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.85 }}
              onClick={handleOpenCollectionModal}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/80 bg-white/95 shadow-sm backdrop-blur-md transition-colors cursor-pointer text-gray-700 hover:text-[#24733E] dark:border-white/10 dark:bg-[#131B2E]/90 dark:text-gray-300 dark:hover:text-[#10B981]"
              title="Add to Collection"
            >
              <Folder className="h-4 w-4" />
            </motion.button>

            {/* FAVORITE BUTTON */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.85 }}
              onClick={handleFavorite}
              disabled={isFavoriteLoading}
              className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/80 bg-white/95 shadow-sm backdrop-blur-md transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-[#131B2E]/90 ${
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
        </div>

        {/* ================= CONTENT AREA ================= */}
        <div className="flex flex-1 flex-col justify-between pt-3.5 px-1 pb-1">
          <div>
            {/* ================= TITLE ================= */}
            <h3 className="line-clamp-1 text-[16px] font-bold tracking-tight text-gray-900 transition-colors duration-200 group-hover:text-[#24733E] dark:text-white dark:group-hover:text-[#10B981]">
              {recipe.title}
            </h3>

            {/* ================= TIME & CALORIES ================= */}
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

      {/* ================= ADD TO COLLECTION MODAL ================= */}
      {isCollectionModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#131B2E] border border-gray-200 dark:border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Save to Collection</h3>
              <button 
                onClick={() => setIsCollectionModalOpen(false)} 
                className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {loadingCollections ? (
                <p className="text-xs text-gray-400 text-center py-4">Loading your collections...</p>
              ) : collections.length > 0 ? (
                collections.map((col) => (
                  <div
                    key={col.id}
                    onClick={() => handleAddToCollection(col.id)}
                    className="flex justify-between items-center p-3 border border-gray-100 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <Folder className="w-4 h-4 text-[#24733E] dark:text-[#10B981]" />
                      <span className="font-medium text-xs text-gray-800 dark:text-gray-200">{col.name}</span>
                    </div>
                    <span className="text-[10px] bg-[#EAF4EB] text-[#24733E] dark:bg-[#10B981]/20 dark:text-[#10B981] px-2.5 py-1 rounded-lg font-bold group-hover:bg-[#24733E] group-hover:text-white transition-colors">
                      Save
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400 text-center py-4">
                  No collections found. Create one from the sidebar first!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
"use client";

import {
  ArrowUpRight,
  Clock3,
  Flame,
  Leaf,
  Star,
  Bookmark,
  Heart,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

interface Recipe {
  id: number | string;
  title: string;
  image: string;
  rating: number;
  time: number;
  calories: number;
}

interface RecipeCardProps {
  recipe: Recipe;
  index?: number;
}

export default function RecipeCard({ recipe, index = 0 }: RecipeCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-[28px] border border-[#E2EBE4] bg-white p-3 shadow-[0_10px_35px_rgba(37,83,49,0.06)] transition-colors duration-300 hover:border-[#C5DED0] hover:shadow-[0_22px_50px_rgba(37,83,49,0.14)] dark:border-white/10 dark:bg-[#131B2E] dark:shadow-[0_10px_35px_rgba(0,0,0,0.5)] dark:hover:border-white/20"
    >
      
      {/* ================= IMAGE ================= */}
      <div className="relative h-[225px] w-full shrink-0 overflow-hidden rounded-[22px] bg-[#EEF4EF] dark:bg-[#1A233A]">
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
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

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 via-black/10 to-transparent dark:from-[#0B0F19]/80 dark:via-[#0B0F19]/30" />

        {/* 1. Top-Left: Category/Popular Badge */}
        <div className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/95 px-3 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.1)] backdrop-blur-md dark:border-white/10 dark:bg-[#131B2E]/90 dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
          <Leaf className="h-3.5 w-3.5 text-[#3F864B] dark:text-[#10B981]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#37713F] dark:text-[#10B981]">
            Popular
          </span>
        </div>

        {/* 2. Top-Right: Bookmark Icon Button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => setIsSaved(!isSaved)}
          className={`absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/80 bg-white/95 shadow-[0_4px_16px_rgba(0,0,0,0.1)] backdrop-blur-md transition-colors cursor-pointer dark:border-white/10 dark:bg-[#131B2E]/90 dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)] ${
            isSaved ? "text-[#24733E] dark:text-[#10B981]" : "text-gray-600 hover:text-[#24733E] dark:text-gray-300 dark:hover:text-[#10B981]"
          }`}
          title="Save Recipe"
        >
          <Bookmark className={`h-4 w-4 ${isSaved ? "fill-[#24733E] dark:fill-[#10B981]" : ""}`} />
        </motion.button>

        {/* 3. Bottom-Left: Rating */}
        <div className="absolute bottom-3.5 left-3.5 flex items-center gap-1.5 rounded-full border border-white/80 bg-white/95 px-3 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.12)] backdrop-blur-md dark:border-white/10 dark:bg-[#131B2E]/90 dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
          <Star className="h-3.5 w-3.5 fill-[#F6A51A] text-[#F6A51A] dark:fill-[#FBBF24] dark:text-[#FBBF24]" />
          <span className="text-[11px] font-bold text-[#17231A] dark:text-white">
            {recipe.rating.toFixed(1)}
          </span>
        </div>

        {/* 4. Bottom-Right: Love/Like Icon Button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute bottom-3.5 right-3.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/80 bg-white/95 shadow-[0_4px_16px_rgba(0,0,0,0.12)] backdrop-blur-md transition-colors cursor-pointer dark:border-white/10 dark:bg-[#131B2E]/90 dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)] ${
            isLiked ? "text-red-500" : "text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500"
          }`}
          title="Like Recipe"
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
        </motion.button>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex flex-1 flex-col px-3 pb-2.5 pt-4">
        
        {/* Title */}
        <div>
          <h3 className="line-clamp-2 min-h-[48px] text-[18px] font-extrabold leading-[1.35] tracking-[-0.025em] text-[#24733E] transition-colors duration-300 group-hover:text-orange-500 dark:text-white dark:group-hover:text-[#10B981]">
            {recipe.title}
          </h3>
          <p className="mt-1.5 line-clamp-1 text-[11px] font-medium text-[#829288] dark:text-gray-400">
            Homemade · Delicious · Easy to make
          </p>
        </div>

        {/* Recipe Details Grid */}
        <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-[18px] border border-[#E4EBE5] bg-[#F8FAF8] dark:border-white/10 dark:bg-[#0F172A]">
          
          {/* Time */}
          <div className="flex flex-col items-center justify-center border-r border-[#E4EBE5] px-1.5 py-3 dark:border-white/10">
            <Clock3 className="mb-1.5 h-[15px] w-[15px] text-[#3F864B] dark:text-[#10B981]" strokeWidth={2.2} />
            <span className="text-[11px] font-bold leading-none text-[#223325] dark:text-gray-200">{recipe.time} min</span>
            <span className="mt-1 text-[9px] font-semibold text-[#92A398] dark:text-gray-500">Cook time</span>
          </div>

          {/* Calories */}
          <div className="flex flex-col items-center justify-center border-r border-[#E4EBE5] bg-[#FFFBF7] px-1.5 py-3 dark:border-white/10 dark:bg-[#161E33]">
            <Flame className="mb-1.5 h-[15px] w-[15px] text-[#F97316]" strokeWidth={2.2} />
            <span className="text-[11px] font-bold leading-none text-[#332A24] dark:text-gray-200">{recipe.calories}</span>
            <span className="mt-1 text-[9px] font-semibold text-[#A0948C] dark:text-gray-500">Calories</span>
          </div>

          {/* Healthy */}
          <div className="flex flex-col items-center justify-center bg-[#F8FAF8] px-1.5 py-3 dark:bg-[#0F172A]">
            <Leaf className="mb-1.5 h-[15px] w-[15px] text-[#3F864B] dark:text-[#10B981]" strokeWidth={2.2} />
            <span className="text-[11px] font-bold leading-none text-[#2E5E35] dark:text-[#10B981]">Healthy</span>
            <span className="mt-1 text-[9px] font-semibold text-[#8E9E93] dark:text-gray-500">Choice</span>
          </div>

        </div>

        {/* Tags */}
        <div className="mt-3.5 flex items-center gap-1.5 overflow-hidden">
          <span className="shrink-0 rounded-full bg-[#EAF4EB] px-3 py-1 text-[10px] font-bold text-[#326B3D] dark:bg-[#132A26] dark:text-[#10B981]">Healthy</span>
          <span className="shrink-0 rounded-full bg-[#EAF4EB] px-3 py-1 text-[10px] font-bold text-[#326B3D] dark:bg-[#132A26] dark:text-[#10B981]">Easy</span>
          <span className="shrink-0 rounded-full bg-[#FFF2E6] px-3 py-1 text-[10px] font-bold text-[#F97316] dark:bg-[#331C14] dark:text-[#F97316]">Homemade</span>
        </div>

        {/* CTA */}
        <div className="mt-4">
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="button"
            className="group/button flex w-full cursor-pointer items-center justify-between rounded-[16px] border border-[#FFE4D6] bg-[#FFF7F2] px-3.5 py-3 text-[#F97316] transition-all duration-300 hover:border-[#24733E] hover:bg-[#24733E] hover:text-white hover:shadow-[0_10px_25px_rgba(36,115,62,0.22)] dark:border-[#F97316]/30 dark:bg-[#1A1824] dark:text-[#F97316] dark:hover:border-[#10B981] dark:hover:bg-[#10B981] dark:hover:text-white dark:hover:shadow-[0_10px_25px_rgba(16,185,129,0.3)]"
          >
            <span className="pl-1 text-[12px] font-extrabold tracking-[0.02em]">
              View Recipe
            </span>

            <motion.span 
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#F97316] shadow-[0_3px_10px_rgba(249,115,22,0.12)] transition-colors group-hover/button:bg-white group-hover/button:text-[#24733E] dark:bg-[#131B2E] dark:text-[#F97316] dark:group-hover/button:bg-white dark:group-hover/button:text-[#10B981]"
              whileHover={{ x: 3 }}
            >
              <ArrowUpRight className="h-[16px] w-[16px]" strokeWidth={2.5} />
            </motion.span>
          </motion.button>
        </div>

      </div>
    </motion.article>
  );
}
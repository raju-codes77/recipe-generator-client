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
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-[28px] border border-[#E2EBE4] bg-white p-3 shadow-[0_10px_35px_rgba(37,83,49,0.06)] transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#C5DED0] hover:shadow-[0_22px_50px_rgba(37,83,49,0.14)]">
      
      {/* ================= IMAGE ================= */}
      <div className="relative h-[225px] w-full shrink-0 overflow-hidden rounded-[22px] bg-[#EEF4EF]">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

        {/* 1. Top-Left: Category/Popular Badge */}
        <div className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/95 px-3 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.1)] backdrop-blur-md">
          <Leaf className="h-3.5 w-3.5 text-[#3F864B]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#37713F]">
            Popular
          </span>
        </div>

        {/* 2. Top-Right: Bookmark Icon Button */}
        <button
          onClick={() => setIsSaved(!isSaved)}
          className={`absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/80 bg-white/95 shadow-[0_4px_16px_rgba(0,0,0,0.1)] backdrop-blur-md transition-transform active:scale-95 cursor-pointer ${
            isSaved ? "text-[#24733E]" : "text-gray-600 hover:text-[#24733E]"
          }`}
          title="Save Recipe"
        >
          <Bookmark className={`h-4 w-4 ${isSaved ? "fill-[#24733E]" : ""}`} />
        </button>

        {/* 3. Bottom-Left: Rating */}
        <div className="absolute bottom-3.5 left-3.5 flex items-center gap-1.5 rounded-full border border-white/80 bg-white/95 px-3 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.12)] backdrop-blur-md">
          <Star className="h-3.5 w-3.5 fill-[#F6A51A] text-[#F6A51A]" />
          <span className="text-[11px] font-bold text-[#17231A]">
            {recipe.rating.toFixed(1)}
          </span>
        </div>

        {/* 4. Bottom-Right: Love/Like Icon Button (The empty corner) */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute bottom-3.5 right-3.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/80 bg-white/95 shadow-[0_4px_16px_rgba(0,0,0,0.12)] backdrop-blur-md transition-transform active:scale-95 cursor-pointer ${
            isLiked ? "text-red-500" : "text-gray-600 hover:text-red-500"
          }`}
          title="Like Recipe"
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
        </button>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex flex-1 flex-col px-3 pb-2.5 pt-4">
        
        {/* Title */}
        <div>
          <h3 className="line-clamp-2 min-h-[48px] text-[18px] font-extrabold leading-[1.35] tracking-[-0.025em] text-[#24733E] transition-colors duration-300 group-hover:text-orange-500">
            {recipe.title}
          </h3>
          <p className="mt-1.5 line-clamp-1 text-[11px] font-medium text-[#829288]">
            Homemade · Delicious · Easy to make
          </p>
        </div>

        {/* Recipe Details Grid */}
        <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-[18px] border border-[#E4EBE5] bg-[#F8FAF8]">
          
          {/* Time */}
          <div className="flex flex-col items-center justify-center border-r border-[#E4EBE5] px-1.5 py-3">
            <Clock3 className="mb-1.5 h-[15px] w-[15px] text-[#3F864B]" strokeWidth={2.2} />
            <span className="text-[11px] font-bold leading-none text-[#223325]">{recipe.time} min</span>
            <span className="mt-1 text-[9px] font-semibold text-[#92A398]">Cook time</span>
          </div>

          {/* Calories */}
          <div className="flex flex-col items-center justify-center border-r border-[#E4EBE5] bg-[#FFFBF7] px-1.5 py-3">
            <Flame className="mb-1.5 h-[15px] w-[15px] text-[#F97316]" strokeWidth={2.2} />
            <span className="text-[11px] font-bold leading-none text-[#332A24]">{recipe.calories}</span>
            <span className="mt-1 text-[9px] font-semibold text-[#A0948C]">Calories</span>
          </div>

          {/* Healthy */}
          <div className="flex flex-col items-center justify-center bg-[#F8FAF8] px-1.5 py-3">
            <Leaf className="mb-1.5 h-[15px] w-[15px] text-[#3F864B]" strokeWidth={2.2} />
            <span className="text-[11px] font-bold leading-none text-[#2E5E35]">Healthy</span>
            <span className="mt-1 text-[9px] font-semibold text-[#8E9E93]">Choice</span>
          </div>

        </div>

        {/* Tags */}
        <div className="mt-3.5 flex items-center gap-1.5 overflow-hidden">
          <span className="shrink-0 rounded-full bg-[#EAF4EB] px-3 py-1 text-[10px] font-bold text-[#326B3D]">Healthy</span>
          <span className="shrink-0 rounded-full bg-[#EAF4EB] px-3 py-1 text-[10px] font-bold text-[#326B3D]">Easy</span>
          <span className="shrink-0 rounded-full bg-[#FFF2E6] px-3 py-1 text-[10px] font-bold text-[#F97316]">Homemade</span>
        </div>

        {/* CTA (Orange -> Green on Hover) */}
        <div className="mt-4">
          <button
            type="button"
            className="group/button flex w-full cursor-pointer items-center justify-between rounded-[16px] border border-[#FFE4D6] bg-[#FFF7F2] px-3.5 py-3 text-[#F97316] transition-all duration-300 hover:border-[#24733E] hover:bg-[#24733E] hover:text-white hover:shadow-[0_10px_25px_rgba(36,115,62,0.22)]"
          >
            <span className="pl-1 text-[12px] font-extrabold tracking-[0.02em]">
              View Recipe
            </span>

            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#F97316] shadow-[0_3px_10px_rgba(249,115,22,0.12)] transition-all duration-300 group-hover/button:bg-white group-hover/button:text-[#24733E] group-hover/button:translate-x-1">
              <ArrowUpRight className="h-[16px] w-[16px]" strokeWidth={2.5} />
            </span>
          </button>
        </div>

      </div>
    </article>
  );
}
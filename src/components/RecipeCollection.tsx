"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import RecipeCard from "./recipes/RecipeCard";

interface Recipe {
  id: string;
  title: string;
  image: string;
  rating: number;
  time: number;
  calories: number;
  cuisine?: string;
}

export default function RecipeCollectionSection() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch latest 4 recipes from backend
  useEffect(() => {
    const abortController = new AbortController();
    const fetchLatestRecipes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/recipes`, { signal: abortController.signal });
        const data = await response.json();

        // Jodi data array hoy ba object er vetor array thake (e.g. data.recipes)
        const recipeList = Array.isArray(data) ? data : data.recipes || [];
        
        // Sesh 4ta latest recipe slice kore nilam
        setRecipes(recipeList.slice(0, 4));
      } catch (error: any) {
        if (error.name === "AbortError") return;
        console.error("Failed to fetch latest recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestRecipes();
  }, []);

  return (
    <section className="w-full py-16 lg:py-20 px-6 md:px-8 bg-white dark:bg-[#0b0f19] text-stone-900 dark:text-white transition-colors duration-300 relative">
      
      {/* Decorative Glow */}
      <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-emerald-50 dark:bg-emerald-900/10 rounded-full blur-[80px] pointer-events-none -z-10"></div>

      <div className="max-w-[1440px] mx-auto flex flex-col items-center z-10 relative">
        
        {/* Section Header */}
        <div className="text-center mb-12 max-w-2xl">
          <span className="text-[11px] font-black uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-full mb-4 inline-flex items-center gap-1.5 border border-emerald-100 dark:border-emerald-800/30 shadow-sm">
            <Sparkles size={12} />
            Trending Recipes
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight text-stone-900 dark:text-white">
            Trending in the{" "}
            <span
              style={{
                background: 'linear-gradient(90deg, #0F432B 0%, #4AB741 40%, #154D31 80%, #082E1A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Community
            </span>
          </h2>
          <p className="text-base text-stone-500 dark:text-slate-400 font-medium leading-relaxed">
            Discover what home cooks and AI are creating right now. Handpicked recipes for taste, health, and simplicity.
          </p>
        </div>

        {/* Dynamic Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full mb-12">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-80 w-full bg-stone-100 dark:bg-slate-800/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full mb-12">
            {recipes.map((recipe, idx) => (
              <RecipeCard key={recipe.id} recipe={recipe} index={idx} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-stone-400 mb-12">No recipes found.</p>
        )}

        {/* Browse All Recipes Button */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="mt-2"
        >
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 text-white font-bold py-3.5 px-7 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 text-[15px] group"
            style={{
              background: 'linear-gradient(90deg, #154D31 0%, #24733E 50%, #10B981 100%)',
              backgroundSize: '200% 100%',
              transition: 'background-position 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundPosition = 'right center'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundPosition = 'left center'}
          >
            <span>Browse All Recipes</span>
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
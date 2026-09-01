"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
    const fetchLatestRecipes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/recipes`);
        const data = await response.json();

        // Jodi data array hoy ba object er vetor array thake (e.g. data.recipes)
        const recipeList = Array.isArray(data) ? data : data.recipes || [];
        
        // Sesh 4ta latest recipe slice kore nilam
        setRecipes(recipeList.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch latest recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestRecipes();
  }, []);

  return (
    <section className="w-full py-24 px-4 md:px-8 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-3.5 py-1.5 rounded-full mb-4 inline-block border border-emerald-200 dark:border-emerald-800/50 shadow-sm">
            Featured Recipes
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Explore Popular <span className="text-emerald-600 dark:text-emerald-400">Recipes</span>
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400 font-medium">
            Discover and collect amazing recipes curated for smarter cooking.
          </p>
        </div>

        {/* Dynamic Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-16">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-80 w-full bg-gray-100 dark:bg-gray-800/50 rounded-[24px] animate-pulse" />
            ))}
          </div>
        ) : recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-16">
            {recipes.map((recipe, idx) => (
              <RecipeCard key={recipe.id} recipe={recipe} index={idx} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 mb-16">No recipes found.</p>
        )}

        {/* Browse All Recipes Button with Floating Animation */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.08, y: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-emerald-600/30 transition-all duration-300 text-sm md:text-base group"
          >
            <span>Browse All Recipes</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
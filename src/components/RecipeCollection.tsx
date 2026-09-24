"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import RecipeCard from "./recipes/RecipeCard";
import { apiClient } from "@/lib/api-client";

interface Recipe {
  id: string;
  title: string;
  image: string;
  rating: number;
  time: number;
  calories: number;
  cuisine?: string;
}

function ScrollRevealCard({ recipe, index, progress, gridWidth, animateOnScroll }: { recipe: Recipe; index: number; progress: MotionValue<number>; gridWidth: number; animateOnScroll: boolean }) {
  const travel = (1.5 - index) * (gridWidth + 24) / 4;
  const start = 0.06 + index * 0.075;
  const settle = start + 0.38;
  const reveal = (value: number) => {
    const raw = Math.min(1, Math.max(0, (value - start) / (settle - start)));
    return raw * raw * (3 - 2 * raw);
  };
  const x = useTransform(progress, (value) => travel * (1 - reveal(value)));
  const y = useTransform(progress, (value) => `${62 * (1 - reveal(value))}vh`);
  const scale = useTransform(progress, (value) => 0.9 + reveal(value) * 0.1);
  const rotate = useTransform(progress, (value) => (index - 1.5) * 5 * (1 - reveal(value)));
  const opacity = useTransform(progress, (value) => {
    const raw = Math.min(1, Math.max(0, (value - (start - 0.035)) / 0.16));
    return raw * raw * (3 - 2 * raw);
  });

  return (
    <motion.div style={animateOnScroll ? { x, y, scale, rotate, opacity, zIndex: 4 - index, willChange: "transform, opacity" } : undefined} className="relative min-w-0 lg:min-h-[360px]">
      <RecipeCard recipe={recipe} index={index} />
    </motion.div>
  );
}

export default function RecipeCollectionSection() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const [gridWidth, setGridWidth] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const animateOnScroll = isDesktop && !prefersReducedMotion && gridWidth > 0;

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const updateDesktop = () => setIsDesktop(desktopQuery.matches);
    updateDesktop();
    desktopQuery.addEventListener("change", updateDesktop);
    return () => desktopQuery.removeEventListener("change", updateDesktop);
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || recipes.length === 0) return;

    const measure = () => setGridWidth(grid.getBoundingClientRect().width);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(grid);
    return () => observer.disconnect();
  }, [recipes.length, loading]);

  // Fetch latest 4 recipes from backend
  useEffect(() => {
    const abortController = new AbortController();
    const fetchLatestRecipes = async () => {
      try {
        const data = await apiClient.get<any>("/recipes", { signal: abortController.signal });

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
    <section ref={sectionRef} className={`relative w-full bg-white text-stone-900 transition-colors duration-300 dark:bg-[#0b0f19] ${animateOnScroll ? "lg:h-[210vh]" : "lg:h-auto"}`}>
      <div className={`relative py-16 ${animateOnScroll ? "lg:sticky lg:top-0 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:overflow-hidden lg:py-12" : ""}`}>
      
      {/* Decorative Glow */}
      <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-emerald-50 dark:bg-emerald-900/10 rounded-full blur-[80px] pointer-events-none -z-10"></div>

      <div className="relative z-10 mx-auto flex w-[95%] max-w-[1200px] flex-col items-center">
        
        {/* Section Header */}
        <div className="mb-10 max-w-2xl text-center lg:mb-12">
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
          <div className="mb-12 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-80 w-full bg-stone-100 dark:bg-slate-800/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : recipes.length > 0 ? (
          <div ref={gridRef} className="mb-12 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {recipes.map((recipe, idx) => (
              <ScrollRevealCard key={recipe.id} recipe={recipe} index={idx} progress={scrollYProgress} gridWidth={gridWidth} animateOnScroll={animateOnScroll} />
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
      </div>
    </section>
  );
}

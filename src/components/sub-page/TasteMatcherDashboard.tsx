"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Heart,
  Sparkles,
  Check,
  X,
  Sliders,
  ChefHat,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Recipe {
  id: number;
  title: string;
  image: string;
  matchScore: number;
  description: string;
  basedOn: string;
}

const RECIPES_PER_PAGE = 4;

// 12 default recipes so pagination (3 pages) is visible right from page load,
// even before the user clicks "Match Recipes".
const DEFAULT_RECIPES: Recipe[] = [
  {
    id: 1,
    title: "Spicy Lime Avocado Chicken",
    image: "https://images.unsplash.com/photo-1598515214146-dab39da1243d?auto=format&fit=crop&w=600&q=80",
    matchScore: 96,
    description: "Low on Cilantro, Medium Spicy, High Umami",
    basedOn: "Likes: Garlic, Avocado, Lime | Dislikes: Cilantro",
  },
  {
    id: 2,
    title: "Garlic Pesto Pasta with Shrimp",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80",
    matchScore: 94,
    description: "Low Sweetness, High Umami, Low Spicy",
    basedOn: "Likes: Garlic, Basil, Shrimp | Dislikes: Cilantro",
  },
  {
    id: 3,
    title: "Mediterranean Chickpea Salad",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    matchScore: 92,
    description: "High Sourness, Medium Umami, Low Sweetness",
    basedOn: "Likes: Lemon, Olive oil | Dislikes: Blue Cheese",
  },
  {
    id: 4,
    title: "Creamy Truffle Mushroom Risotto",
    image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=600&q=80",
    matchScore: 90,
    description: "Rich Umami, Low Spiciness, Creamy Texture",
    basedOn: "Likes: Mushroom, Garlic, Butter | Dislikes: None",
  },
  {
    id: 5,
    title: "Grilled Basil Lemon Salmon",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    matchScore: 93,
    description: "High Umami, Medium Sourness, Low Sweetness",
    basedOn: "Likes: Basil, Lemon, Salmon | Dislikes: Cilantro",
  },
  {
    id: 6,
    title: "Thai Basil Avocado Stir-fry",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80",
    matchScore: 91,
    description: "High Spiciness, Medium Umami, Low Sweetness",
    basedOn: "Likes: Basil, Avocado, Garlic | Dislikes: Cilantro",
  },
  {
    id: 7,
    title: "Roasted Garlic Tomato Soup",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
    matchScore: 89,
    description: "Medium Sourness, High Umami, Low Spiciness",
    basedOn: "Likes: Garlic, Tomato | Dislikes: Blue Cheese",
  },
  {
    id: 8,
    title: "Avocado Chickpea Buddha Bowl",
    image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=600&q=80",
    matchScore: 88,
    description: "Balanced Profile, Low Spiciness, Medium Umami",
    basedOn: "Likes: Avocado, Chickpea | Dislikes: Cilantro",
  },
  {
    id: 9,
    title: "Basil Garlic Butter Shrimp",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    matchScore: 95,
    description: "High Umami, Medium Saltiness, Low Sweetness",
    basedOn: "Likes: Basil, Garlic, Shrimp | Dislikes: Blue Cheese",
  },
  {
    id: 10,
    title: "Mediterranean Lemon Orzo Salad",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    matchScore: 87,
    description: "High Sourness, Low Spiciness, Medium Umami",
    basedOn: "Likes: Lemon, Olive oil | Dislikes: Cilantro",
  },
  {
    id: 11,
    title: "Spicy Garlic Avocado Toast",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80",
    matchScore: 90,
    description: "Medium Spiciness, High Umami, Low Sweetness",
    basedOn: "Likes: Garlic, Avocado | Dislikes: Cilantro",
  },
  {
    id: 12,
    title: "Creamy Basil Mushroom Pasta",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80",
    matchScore: 92,
    description: "High Umami, Creamy Texture, Low Spiciness",
    basedOn: "Likes: Basil, Mushroom, Garlic | Dislikes: None",
  },
];

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export default function TasteMatcherDashboard() {
  const [sweetness, setSweetness] = useState<number>(7);
  const [sourness, setSourness] = useState<number>(3);
  const [saltiness, setSaltiness] = useState<number>(5);
  const [umami, setUmami] = useState<number>(8);
  const [spiciness, setSpiciness] = useState<number>(3);

  const [likes, setLikes] = useState<string[]>(["Garlic", "Avocado", "Basil"]);
  const [dislikes, setDislikes] = useState<string[]>(["Cilantro", "Blue Cheese"]);
  const [likeInput, setLikeInput] = useState<string>("");
  const [dislikeInput, setDislikeInput] = useState<string>("");

  const [cuisines, setCuisines] = useState({
    thai: true,
    mexican: false,
    mediterranean: true,
    italian: false,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>(DEFAULT_RECIPES);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.max(1, Math.ceil(recipes.length / RECIPES_PER_PAGE));

  const paginatedRecipes = useMemo(() => {
    const start = (currentPage - 1) * RECIPES_PER_PAGE;
    return recipes.slice(start, start + RECIPES_PER_PAGE);
  }, [recipes, currentPage]);

  const goToPage = (page: number) => {
    const clamped = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(clamped);
    document.getElementById("recipe-grid-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleAddLike = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && likeInput.trim()) {
      e.preventDefault();
      if (!likes.includes(likeInput.trim())) {
        setLikes([...likes, likeInput.trim()]);
      }
      setLikeInput("");
    }
  };

  const removeLike = (item: string) => setLikes(likes.filter((l) => l !== item));

  const handleAddDislike = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && dislikeInput.trim()) {
      e.preventDefault();
      if (!dislikes.includes(dislikeInput.trim())) {
        setDislikes([...dislikes, dislikeInput.trim()]);
      }
      setDislikeInput("");
    }
  };

  const removeDislike = (item: string) => setDislikes(dislikes.filter((d) => d !== item));

  // Groq AI Match Function — APPENDS new batch to existing collection
  const handleMatchRecipes = async () => {
    setLoading(true);
    setErrorMsg(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(`${API_BASE_URL}/api/match-recipes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sweetness, sourness, saltiness, umami, spiciness, likes, dislikes, cuisines }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      let data: any = null;
      try {
        data = await response.json();
      } catch {}

      if (response.ok && data?.success && Array.isArray(data?.recipes) && data.recipes.length > 0) {
        setRecipes((prev) => {
          // Re-number ids so a new batch never collides with existing cards'
          // ids (the AI restarts numbering from 1 every call).
          const startId = prev.length > 0 ? Math.max(...prev.map((r) => r.id)) + 1 : 1;
          const newBatch: Recipe[] = data.recipes.map((r: Recipe, idx: number) => ({
            ...r,
            id: startId + idx,
          }));

          const updated = [...prev, ...newBatch];

          // Jump to the page where the first newly-added card lands
          const firstNewIndex = prev.length;
          const targetPage = Math.floor(firstNewIndex / RECIPES_PER_PAGE) + 1;
          setCurrentPage(targetPage);

          return updated;
        });

        setTimeout(() => {
          document.getElementById("recipe-grid-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      } else {
        setErrorMsg(data?.error || `Request failed with status ${response.status}`);
      }
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === "AbortError") {
        setErrorMsg("Request timed out. Please try again.");
      } else {
        setErrorMsg("Could not reach the backend. Make sure the server is running on " + API_BASE_URL);
      }
      console.error("Network error:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 transition-colors duration-300">

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 border-b border-gray-100 dark:border-gray-800 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight">Define Your Palate</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Adjust your flavor profile to get personalized AI culinary recommendations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <h2 className="text-xl md:text-2xl font-bold">
            Personalized Recommendations <span className="text-emerald-600 dark:text-emerald-400 text-lg">({recipes.length} Found)</span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        <div className="lg:col-span-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-6">

          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm tracking-wide uppercase text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-600" /> Palate Sliders
            </h3>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/40">
              75% Profile Completed
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span>🍬 Sweetness</span><span className="text-gray-400">{sweetness}</span>
              </div>
              <input type="range" min="0" max="10" value={sweetness} onChange={(e) => setSweetness(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span>🍋 Sourness</span><span className="text-gray-400">{sourness}</span>
              </div>
              <input type="range" min="0" max="10" value={sourness} onChange={(e) => setSourness(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span>🧂 Saltiness</span><span className="text-gray-400">{saltiness}</span>
              </div>
              <input type="range" min="0" max="10" value={saltiness} onChange={(e) => setSaltiness(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span>🍄 Umami</span><span className="text-gray-400">{umami}</span>
              </div>
              <input type="range" min="0" max="10" value={umami} onChange={(e) => setUmami(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span>🌶️ Spiciness</span><span className="text-gray-400">{spiciness}</span>
              </div>
              <input type="range" min="0" max="10" value={spiciness} onChange={(e) => setSpiciness(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-800" />

          <div className="space-y-4">
            <h3 className="font-bold text-sm tracking-wide uppercase text-gray-800 dark:text-gray-200">
              Ingredient Likes & Dislikes
            </h3>
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1.5">Likes (Type & press enter)</label>
              <div className="flex flex-wrap items-center gap-1.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-2 min-h-[46px]">
                {likes.map((item, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800/50">
                    🧄 {item}
                    <button onClick={() => removeLike(item)} className="hover:text-emerald-900 ml-1">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </button>
                  </span>
                ))}
                <input type="text" value={likeInput} onChange={(e) => setLikeInput(e.target.value)} onKeyDown={handleAddLike}
                  placeholder={likes.length === 0 ? "Add like..." : ""}
                  className="bg-transparent text-xs focus:outline-none flex-1 min-w-[100px] px-1 text-gray-800 dark:text-gray-200" />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1.5">Dislikes (Type & press enter)</label>
              <div className="flex flex-wrap items-center gap-1.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-2 min-h-[46px]">
                {dislikes.map((item, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs px-2.5 py-1 rounded-lg border border-rose-200 dark:border-rose-800/50">
                    🌿 {item}
                    <button onClick={() => removeDislike(item)} className="hover:text-rose-900 ml-1">
                      <X className="w-3 h-3 text-rose-600" />
                    </button>
                  </span>
                ))}
                <input type="text" value={dislikeInput} onChange={(e) => setDislikeInput(e.target.value)} onKeyDown={handleAddDislike}
                  placeholder={dislikes.length === 0 ? "Add dislike..." : ""}
                  className="bg-transparent text-xs focus:outline-none flex-1 min-w-[100px] px-1 text-gray-800 dark:text-gray-200" />
              </div>
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-800" />

          <div className="space-y-3">
            <h3 className="font-bold text-sm tracking-wide uppercase text-gray-800 dark:text-gray-200">Preferred Cuisines</h3>
            <div className="grid grid-cols-2 gap-3 text-xs font-medium">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" checked={cuisines.thai} onChange={(e) => setCuisines({ ...cuisines, thai: e.target.checked })}
                  className="accent-emerald-600 rounded w-4 h-4" />
                <span>🌶️ Thai</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" checked={cuisines.mexican} onChange={(e) => setCuisines({ ...cuisines, mexican: e.target.checked })}
                  className="accent-emerald-600 rounded w-4 h-4" />
                <span>🌮 Mexican</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" checked={cuisines.mediterranean} onChange={(e) => setCuisines({ ...cuisines, mediterranean: e.target.checked })}
                  className="accent-emerald-600 rounded w-4 h-4" />
                <span>🫒 Mediterranean</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" checked={cuisines.italian} onChange={(e) => setCuisines({ ...cuisines, italian: e.target.checked })}
                  className="accent-emerald-600 rounded w-4 h-4" />
                <span>🍕 Italian</span>
              </label>
            </div>
          </div>

          {errorMsg && (
            <div className="text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 rounded-xl p-3">
              {errorMsg}
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleMatchRecipes}
            disabled={loading}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 px-4 rounded-2xl text-xs transition-colors shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Groq AI is cooking a new recipe...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Match Recipes</span>
              </>
            )}
          </motion.button>

        </div>

        {/* Right Column: Recipe Cards Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {recipes.map((recipe) => (
            <motion.div
              key={recipe.id}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col group"
            >
              <div className="relative h-52 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md flex items-center justify-center text-gray-700 dark:text-gray-200 hover:text-rose-500 transition-colors shadow">
                  <Heart className="w-4 h-4" />
                </button>
              </div>

          {recipes.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20 border border-dashed border-gray-200 dark:border-gray-800 rounded-3xl">
              <ChefHat className="w-10 h-10 text-gray-300 dark:text-gray-700 mb-3" />
              <p className="text-sm text-gray-400 dark:text-gray-500">
                No recipes yet. Adjust your palate and hit "Match Recipes".
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedRecipes.map((recipe) => (
                  <motion.div
                    key={recipe.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col group"
                  >
                    <div className="relative h-52 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={recipe.image}
                        alt={recipe.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md flex items-center justify-center text-gray-700 dark:text-gray-200 hover:text-rose-500 transition-colors shadow">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-5 flex flex-col flex-grow space-y-3">
                      <h3 className="font-bold text-base text-gray-900 dark:text-white leading-snug">{recipe.title}</h3>

                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-lg w-fit border border-emerald-100 dark:border-emerald-800/30">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{recipe.matchScore}% Taste Match</span>
                      </div>

                      <p className="text-xs text-gray-600 dark:text-gray-300 font-medium leading-relaxed">{recipe.description}</p>

                      <p className="text-[11px] text-gray-400 dark:text-gray-500 pt-1 border-t border-gray-100 dark:border-gray-800">{recipe.basedOn}</p>

                      <div className="flex items-center justify-between pt-2 mt-auto">
                        <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1 cursor-pointer hover:underline">
                          <ChefHat className="w-3.5 h-3.5" /> View Recipe Details
                        </span>
                        <div className="flex items-center gap-2 text-gray-400">
                          <button className="hover:text-amber-500 transition-colors">⭐</button>
                          <button className="hover:text-rose-500 transition-colors"><Heart className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Page {currentPage} of {totalPages} &middot; Showing {paginatedRecipes.length} of {recipes.length} recipes
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
                          page === currentPage
                            ? "bg-emerald-700 text-white"
                            : "border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      aria-label="Next page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

      </div>

    </div>
  );
}
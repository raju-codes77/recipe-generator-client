"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  Clock,
  Flame,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

interface Recipe {
  id: string;
  title: string;
  image: string;
  matchScore: number;
  cuisine?: string;
  time?: number;
  calories?: number;
  rating?: number;
  matchReasons: string[];
}

const RECIPES_PER_PAGE = 4;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function TasteMatcherDashboard() {
  const { data: session } = authClient.useSession();
  const requestRef = React.useRef(0);
  const abortControllerRef = React.useRef<AbortController | null>(null);

  const [sweetness, setSweetness] = useState<number>(5);
  const [sourness, setSourness] = useState<number>(5);
  const [saltiness, setSaltiness] = useState<number>(5);
  const [umami, setUmami] = useState<number>(5);
  const [spiciness, setSpiciness] = useState<number>(5);

  const [likes, setLikes] = useState<string[]>([]);
  const [dislikes, setDislikes] = useState<string[]>([]);
  const [likeInput, setLikeInput] = useState<string>("");
  const [dislikeInput, setDislikeInput] = useState<string>("");

  const [cuisines, setCuisines] = useState({
    thai: false,
    mexican: false,
    mediterranean: false,
    italian: false,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [fetchingProfile, setFetchingProfile] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      if (!session?.user) {
        setFetchingProfile(false);
        return;
      }
      try {
        const response = await fetch(`${API_BASE_URL}/api/taste-profile`, {
          credentials: "include",
        });
        const data = await response.json();
        if (data.success && data.profile) {
          const p = data.profile;
          setSweetness(p.sweetness);
          setSourness(p.sourness);
          setSaltiness(p.saltiness);
          setUmami(p.umami);
          setSpiciness(p.spiciness);
          setLikes(p.likedIngredients || []);
          setDislikes(p.dislikedIngredients || []);
          
          if (p.preferredCuisines) {
            setCuisines({
              thai: p.preferredCuisines.includes("Thai"),
              mexican: p.preferredCuisines.includes("Mexican"),
              mediterranean: p.preferredCuisines.includes("Mediterranean"),
              italian: p.preferredCuisines.includes("Italian"),
            });
          }
        }
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setFetchingProfile(false);
      }
    }
    fetchProfile();
  }, [session]);

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

  const handleMatchRecipes = async () => {
    if (!session?.user) {
      setErrorMsg("Please log in to save your profile and find matches.");
      return;
    }

    const reqId = ++requestRef.current;
    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();
    setLoading(true);
    setErrorMsg(null);
    setHasSearched(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const preferredCuisines = Object.entries(cuisines)
      .filter(([_, active]) => active)
      .map(([name]) => name.charAt(0).toUpperCase() + name.slice(1));

    try {
      const response = await fetch(`${API_BASE_URL}/api/match-recipes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ 
          sweetness, sourness, saltiness, umami, spiciness, 
          likedIngredients: likes, 
          dislikedIngredients: dislikes, 
          preferredCuisines 
        }),
        signal: abortControllerRef.current?.signal,
      });

      let data: any = null;
      try {
        data = await response.json();
      } catch {}

      if (reqId !== requestRef.current) return;
      if (response.ok && data?.success && Array.isArray(data?.recipes)) {
        setRecipes(data.recipes);
        setCurrentPage(1);

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
        setErrorMsg("Could not reach the matching service.");
      }
      console.error("Network error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (fetchingProfile) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 transition-colors duration-300">

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 border-b border-gray-100 dark:border-gray-800 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight">Taste Matcher</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Discover real recipes perfectly tailored to your palate and nutritional goals.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {session ? (
            <h2 className="text-xl md:text-2xl font-bold">
              Personalized Recommendations <span className="text-emerald-600 dark:text-emerald-400 text-lg">({recipes.length} Found)</span>
            </h2>
          ) : (
            <Link href="/login" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
              Log in to match recipes
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Palate Settings */}
        <div className="lg:col-span-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-6">

          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm tracking-wide uppercase text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-600" /> Taste Profile
            </h3>
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
            disabled={loading || !session}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 px-4 rounded-2xl text-xs transition-colors shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing recipes...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Match Recipes</span>
              </>
            )}
          </motion.button>

        </div>

        {/* Right Column: Recipe Cards Grid + Pagination */}
        <div id="recipe-grid-top" className="lg:col-span-8 flex flex-col gap-6">
          {!hasSearched && recipes.length === 0 ? (
             <div className="flex flex-col items-center justify-center text-center py-20 border border-dashed border-gray-200 dark:border-gray-800 rounded-3xl">
              <ChefHat className="w-10 h-10 text-gray-300 dark:text-gray-700 mb-3" />
              <h3 className="text-lg font-bold mb-1">Find Your Perfect Match</h3>
              <p className="text-sm text-gray-400 dark:text-gray-500 max-w-sm">
                Adjust your taste palate, favorite ingredients, and let the algorithm rank the best recipes for you.
              </p>
            </div>
          ) : recipes.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20 border border-dashed border-gray-200 dark:border-gray-800 rounded-3xl">
              <ChefHat className="w-10 h-10 text-gray-300 dark:text-gray-700 mb-3" />
              <h3 className="text-lg font-bold mb-1">No strong matches found</h3>
              <p className="text-sm text-gray-400 dark:text-gray-500 max-w-sm">
                Try relaxing your dislikes or selecting more cuisines.
              </p>
            </div>
          ) : (
            <>
              {/* Recipe cards — own 2-col grid */}
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
                        src={recipe.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
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

                      <ul className="text-xs text-gray-600 dark:text-gray-300 font-medium leading-relaxed list-disc list-inside space-y-1">
                        {recipe.matchReasons.slice(0, 3).map((reason, i) => (
                          <li key={i}>{reason}</li>
                        ))}
                        {recipe.matchReasons.length > 3 && (
                          <li className="text-gray-400 list-none text-[11px]">+ {recipe.matchReasons.length - 3} more reasons</li>
                        )}
                      </ul>

                      <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
                        {recipe.time && <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {recipe.time} min</span>}
                        {recipe.calories && <span className="flex items-center gap-1"><Flame className="w-3 h-3" /> {recipe.calories} kcal</span>}
                        {recipe.cuisine && <span>• {recipe.cuisine}</span>}
                      </div>

                      <div className="flex items-center justify-between pt-2 mt-auto">
                        <Link href={`/dashboard/recipes/${recipe.id}`} className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1 cursor-pointer hover:underline">
                          <ChefHat className="w-3.5 h-3.5" /> View Recipe Details
                        </Link>
                        <div className="flex items-center gap-2 text-gray-400">
                          {recipe.rating && <span className="text-xs font-medium text-amber-500">⭐ {recipe.rating}</span>}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination — full-width row below ALL recipe cards */}
              {totalPages > 1 && (
                <div className="w-full flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
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
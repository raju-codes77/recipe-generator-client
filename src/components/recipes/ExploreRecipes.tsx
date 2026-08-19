"use client";

import { useState, useMemo, useEffect } from "react";
import RecipeCard from "@/components/recipes/RecipeCard";
import FilterCard from "@/components/recipes/FilterCard";
import Pagination from "@/components/recipes/Pagination";
import {
  SlidersHorizontal,
  LayoutGrid,
  List,
  Clock,
  Flame,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import Sidebar from "./Sidebar";

interface Recipe {
  id: number | string;
  title: string;
  image: string;
  rating: number;
  time: number;
  calories: number;
  cuisine?: string;
  category?: string;
  diet?: string;
  difficulty?: string;
  ingredients?: any[];
  tabType?: "All Recipes" | "My Recipes" | "Favorite Recipes" | "My Collections";
}

export default function ExploreRecipes() {
  // ================= SESSION =================
  const { data: session } = authClient.useSession();

  // ================= RECIPES =================
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ================= TABS =================
  const [activeTab, setActiveTab] = useState("All Recipes");

  // ================= VIEW MODE =================
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // ================= FILTERS =================
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDiet, setSelectedDiet] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [maxTime, setMaxTime] = useState(60);
  const [maxCalories, setMaxCalories] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("Latest");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // ================= PAGINATION =================
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 12;

  // =========================================================
  // FETCH RECIPES
  // =========================================================

  useEffect(() => {
    async function fetchRecipes() {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();

        if (searchQuery.trim()) {
          params.append("search", searchQuery.trim());
        }
        if (selectedCategory !== "All") {
          params.append("category", selectedCategory);
        }
        if (selectedCuisine !== "All") {
          params.append("cuisine", selectedCuisine);
        }
        if (maxTime < 60) {
          params.append("maxTime", String(maxTime));
        }
        if (maxCalories < 1000) {
          params.append("maxCalories", String(maxCalories));
        }
        if (minRating > 0) {
          params.append("minRating", String(minRating));
        }
        if (sortBy !== "Latest") {
          params.append("sortBy", sortBy);
        }

        if (activeTab === "My Recipes") {
          params.append("tab", "my-recipes");
          if (session?.user?.id) {
            params.append("userId", session.user.id);
          }
        } else if (activeTab === "Favorite Recipes") {
          params.append("tab", "favorites");
          if (session?.user?.id) {
            params.append("userId", session.user.id);
          }
        } else if (activeTab === "My Collections") {
          params.append("tab", "collections");
          if (session?.user?.id) {
            params.append("userId", session.user.id);
          }
        }

        const response = await fetch(
          `http://localhost:5000/api/recipes?${params.toString()}`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch recipes");
        }

        if (data.success && Array.isArray(data.recipes)) {
          setRecipes(data.recipes);
        } else {
          setRecipes([]);
        }
      } catch (err: any) {
        console.error("Fetch recipes error:", err);
        setError(err.message || "An error occurred while fetching recipes");
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    }

    if (
      (activeTab === "My Recipes" ||
        activeTab === "Favorite Recipes" ||
        activeTab === "My Collections") &&
      !session?.user?.id
    ) {
      setRecipes([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      fetchRecipes();
    }, 300);

    return () => clearTimeout(timer);
  }, [
    activeTab,
    session?.user?.id,
    searchQuery,
    selectedCategory,
    selectedCuisine,
    maxTime,
    maxCalories,
    minRating,
    sortBy,
  ]);

  // =========================================================
  // PAGINATION
  // =========================================================

  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const currentRecipes = useMemo(() => {
    const startIndex = (currentPage - 1) * recipesPerPage;
    return recipes.slice(startIndex, startIndex + recipesPerPage);
  }, [recipes, currentPage]);

  // =========================================================
  // RESET FILTERS
  // =========================================================

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCuisine("All");
    setSelectedCategory("All");
    setSelectedDiet("All");
    setSelectedDifficulty("All");
    setMaxTime(60);
    setMaxCalories(1000);
    setMinRating(0);
    setSortBy("Latest");
    setCurrentPage(1);
  };

  const isFiltered = Boolean(
    searchQuery ||
      selectedCuisine !== "All" ||
      selectedCategory !== "All" ||
      maxTime < 60 ||
      maxCalories < 1000 ||
      minRating > 0 ||
      sortBy !== "Latest"
  );

  if (loading && recipes.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-gray-900 dark:bg-black dark:text-white">
        <p className="text-lg font-medium">Loading recipes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white text-gray-900 dark:bg-black dark:text-white">
        <p className="text-lg font-medium text-red-500">Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="cursor-pointer rounded-xl bg-[#24733E] px-4 py-2 text-sm font-bold text-white hover:bg-[#1e5d32]"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-200 dark:bg-black dark:text-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT MAIN CONTENT (Span 8) ================= */}
          <div className="lg:col-span-8 flex flex-col w-full min-w-0">

            {/* SEARCH & FILTER */}
            <div className="mb-6">
              <FilterCard
                searchQuery={searchQuery}
                setSearchQuery={(q) => {
                  setSearchQuery(q);
                  setCurrentPage(1);
                }}
                selectedCategory={selectedCategory}
                setSelectedCategory={(c) => {
                  setSelectedCategory(c);
                  setCurrentPage(1);
                }}
                selectedCuisine={selectedCuisine}
                setSelectedCuisine={(c) => {
                  setSelectedCuisine(c);
                  setCurrentPage(1);
                }}
                sortBy={sortBy}
                setSortBy={(s) => {
                  setSortBy(s);
                  setCurrentPage(1);
                }}
                showAdvancedFilters={showAdvancedFilters}
                setShowAdvancedFilters={setShowAdvancedFilters}
                maxTime={maxTime}
                setMaxTime={(t) => {
                  setMaxTime(t);
                  setCurrentPage(1);
                }}
                maxCalories={maxCalories}
                setMaxCalories={(c) => {
                  setMaxCalories(c);
                  setCurrentPage(1);
                }}
                minRating={minRating}
                setMinRating={(r) => {
                  setMinRating(r);
                  setCurrentPage(1);
                }}
                resetFilters={resetFilters}
                isFiltered={isFiltered}
              />
            </div>

            {/* TABS + VIEW SWITCHER */}
            <div className="mb-6 flex flex-col gap-4 border-b border-gray-200 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
              
              {/* TABS */}
              <div className="no-scrollbar flex items-center gap-6 overflow-x-auto">
                {[
                  "All Recipes",
                  "My Recipes",
                  "Favorite Recipes",
                  "My Collections",
                ].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setCurrentPage(1);
                    }}
                    className={`relative cursor-pointer whitespace-nowrap pb-3 text-sm font-semibold transition-colors ${
                      activeTab === tab
                        ? "text-[#24733E] dark:text-[#10B981]"
                        : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#24733E] dark:bg-[#10B981]" />
                    )}
                  </button>
                ))}
              </div>

              {/* COUNT + VIEW */}
              <div className="flex items-center justify-between gap-4 pb-3 sm:justify-end">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  {recipes.length} Recipes
                </span>

                <div className="flex items-center gap-1 rounded-xl border border-[#E2EBE4] bg-white p-1 dark:border-white/10 dark:bg-[#131B2E]">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`cursor-pointer rounded-lg p-1.5 transition-colors ${
                      viewMode === "grid"
                        ? "bg-[#EAF4EB] text-[#24733E] dark:bg-[#10B981]/20 dark:text-[#10B981]"
                        : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    }`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => setViewMode("list")}
                    className={`cursor-pointer rounded-lg p-1.5 transition-colors ${
                      viewMode === "list"
                        ? "bg-[#EAF4EB] text-[#24733E] dark:bg-[#10B981]/20 dark:text-[#10B981]"
                        : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* RECIPES DISPLAY AREA */}
            {currentRecipes.length > 0 ? (
              viewMode === "grid" ? (
                // 4 columns setup for lg screens (lg:grid-cols-4)
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {currentRecipes.map((recipe) => (
                    <div key={recipe.id} className="w-full min-w-0">
                      <RecipeCard recipe={recipe} />
                    </div>
                  ))}
                </div>
              ) : (
                // LIST VIEW
                <div className="flex flex-col gap-4">
                  {currentRecipes.map((recipe) => (
                    <div
                      key={recipe.id}
                      className="flex flex-col items-center gap-6 rounded-[24px] border border-[#E2EBE4] bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-white/10 dark:bg-[#131B2E] md:flex-row"
                    >
                      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-2xl bg-gray-100 dark:bg-black md:w-56">
                        <Image
                          src={recipe.image}
                          alt={recipe.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full border border-white/10 bg-white/90 px-2.5 py-1 text-xs font-bold text-gray-800 shadow-sm backdrop-blur-md dark:bg-[#131B2E]/90 dark:text-white">
                          ⭐ {recipe.rating}
                        </div>
                      </div>

                      <div className="flex w-full flex-1 flex-col justify-between">
                        <div>
                          <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
                            {recipe.title}
                          </h3>
                          <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
                            Homemade • Delicious • Easy to make
                          </p>

                          <div className="mb-4 flex w-fit flex-wrap items-center gap-6 rounded-xl border border-gray-100 bg-[#FAFAFA] px-4 py-3 text-xs dark:border-white/10 dark:bg-black">
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                              <Clock className="h-4 w-4 text-[#24733E] dark:text-[#10B981]" />
                              <span>{recipe.time} mins</span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                              <Flame className="h-4 w-4 text-orange-500" />
                              <span>{recipe.calories} kcal</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-100 pt-2 dark:border-white/10">
                          <span className="rounded-full bg-[#EAF4EB] px-3 py-1 text-xs font-semibold text-[#24733E] dark:bg-[#132A26] dark:text-[#10B981]">
                            {recipe.cuisine || "Recipe"}
                          </span>

                          <button className="flex cursor-pointer items-center gap-1.5 text-xs font-bold text-[#24733E] hover:underline dark:text-[#10B981]">
                            <span>View Recipe</span>
                            <ArrowUpRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              // NO RECIPES STATE
              <div className="rounded-[24px] border border-[#E2EBE4] bg-white py-16 text-center shadow-sm dark:border-white/10 dark:bg-[#131B2E]">
                <SlidersHorizontal className="mx-auto mb-3 h-12 w-12 text-gray-300 dark:text-gray-500" />
                <h3 className="mb-1 text-lg font-bold text-gray-800 dark:text-white">
                  {activeTab === "My Recipes"
                    ? "You haven't created any recipes yet"
                    : activeTab === "Favorite Recipes"
                    ? "No favorite recipes yet"
                    : activeTab === "My Collections"
                    ? "No recipes in your collections yet"
                    : "No recipes found"}
                </h3>
                <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                  {activeTab === "Favorite Recipes"
                    ? "Love a recipe to save it here."
                    : activeTab === "My Collections"
                    ? "Add recipes to your collections to see them here."
                    : "Try adjusting your search or selecting a different filter."}
                </p>
                {activeTab === "All Recipes" && (
                  <button
                    onClick={resetFilters}
                    className="cursor-pointer rounded-[12px] bg-[#24733E] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#1e5d32] dark:bg-[#10B981] dark:hover:bg-[#059669]"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            )}
          </div>

          {/* ================= RIGHT SIDEBAR (Span 4) ================= */}
          <div className="lg:col-span-4 w-full">
            <Sidebar />
          </div>

        </div>
      </div>
    </div>
  );
}
"use client";

import { useState, useMemo, useEffect } from "react";
import RecipeCard from "@/components/recipes/RecipeCard";
import FilterCard from "@/components/recipes/FilterCard"; 
import Pagination from "@/components/recipes/Pagination"; 
import { SlidersHorizontal, LayoutGrid, List, Clock, Flame, ArrowUpRight } from "lucide-react";
import Image from "next/image";

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
  tabType?: "All Recipes" | "My Recipes" | "Saved Recipes" | "My Collections";
}

export default function ExploreRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState("All Recipes");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 12; 

  // ব্যাকএন্ড থেকে কুয়েরি প্যারামিটার সহ ডাটা ফেচ করা
  useEffect(() => {
    async function fetchRecipes() {
      try {
        setLoading(true);
        
        // ডাইনামিক কুয়েরি প্যারামিটার তৈরি
        const params = new URLSearchParams();
        if (searchQuery.trim()) params.append("search", searchQuery.trim());
        if (selectedCategory !== "All") params.append("category", selectedCategory);
        if (selectedCuisine !== "All") params.append("cuisine", selectedCuisine);
        if (maxTime < 60) params.append("maxTime", String(maxTime));
        if (maxCalories < 1000) params.append("maxCalories", String(maxCalories));
        if (minRating > 0) params.append("minRating", String(minRating));
        if (sortBy !== "Latest") params.append("sortBy", sortBy);

        const response = await fetch(`http://localhost:5000/api/recipes?${params.toString()}`);
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        if (data.success && Array.isArray(data.recipes)) {
          setRecipes(data.recipes);
        } else {
          setRecipes([]);
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    // ডিবাউন্স (Debounce) ব্যবহার করে রিকোয়েস্ট অপ্টিমাইজ করা হয়েছে
    const timer = setTimeout(() => {
      fetchRecipes();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, selectedCuisine, maxTime, maxCalories, minRating, sortBy]);

  // ট্যাবের ওপর ভিত্তি করে ফিল্টার
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesTab = activeTab === "All Recipes" || recipe.tabType === activeTab;
      return matchesTab;
    });
  }, [recipes, activeTab]);

  // পেজিনেশনের জন্য রেসিপি স্লাইস করা
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  const currentRecipes = useMemo(() => {
    const startIndex = (currentPage - 1) * recipesPerPage;
    return filteredRecipes.slice(startIndex, startIndex + recipesPerPage);
  }, [filteredRecipes, currentPage]);

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
      <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white flex items-center justify-center">
        <p className="text-lg font-medium">Loading recipes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white flex flex-col items-center justify-center gap-4">
        <p className="text-lg font-medium text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 py-8">
        
        {/* Search & Filter Component */}
        <FilterCard
          searchQuery={searchQuery}
          setSearchQuery={(q) => { setSearchQuery(q); setCurrentPage(1); }}
          selectedCategory={selectedCategory}
          setSelectedCategory={(c) => { setSelectedCategory(c); setCurrentPage(1); }}
          selectedCuisine={selectedCuisine}
          setSelectedCuisine={(c) => { setSelectedCuisine(c); setCurrentPage(1); }}
          sortBy={sortBy}
          setSortBy={(s) => { setSortBy(s); setCurrentPage(1); }}
          showAdvancedFilters={showAdvancedFilters}
          setShowAdvancedFilters={setShowAdvancedFilters}
          maxTime={maxTime}
          setMaxTime={(t) => { setMaxTime(t); setCurrentPage(1); }}
          maxCalories={maxCalories}
          setMaxCalories={(c) => { setMaxCalories(c); setCurrentPage(1); }}
          minRating={minRating}
          setMinRating={(r) => { setMinRating(r); setCurrentPage(1); }}
          resetFilters={resetFilters}
          isFiltered={isFiltered}
        />

        {/* TAB NAVIGATION & VIEW SWITCHER */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 dark:border-white/10 gap-4">
          
          {/* Tabs */}
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
            {["All Recipes", "My Recipes", "Favorite Recipes", "My Collections"].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                className={`pb-3 text-sm font-semibold transition-colors relative whitespace-nowrap cursor-pointer ${
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

          {/* Recipe Count & View Mode Icons */}
          <div className="flex items-center justify-between sm:justify-end gap-4 pb-3">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
              {filteredRecipes.length} Recipes
            </span>
            <div className="flex items-center gap-1 bg-white dark:bg-[#131B2E] border border-[#E2EBE4] dark:border-white/10 p-1 rounded-xl">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === "grid" ? "bg-[#EAF4EB] dark:bg-[#10B981]/20 text-[#24733E] dark:text-[#10B981]" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === "list" ? "bg-[#EAF4EB] dark:bg-[#10B981]/20 text-[#24733E] dark:text-[#10B981]" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* RECIPES CONTAINER */}
        {currentRecipes.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentRecipes.map((recipe: Recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4 max-w-4xl mx-auto">
              {currentRecipes.map((recipe: Recipe) => (
                <div 
                  key={recipe.id}
                  className="bg-white dark:bg-[#131B2E] rounded-[24px] border border-[#E2EBE4] dark:border-white/10 p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-6"
                >
                  <div className="relative w-full md:w-56 h-40 rounded-2xl overflow-hidden shrink-0 bg-gray-100 dark:bg-black">
                    <Image src={recipe.image} alt={recipe.title} fill className="object-cover" />
                    <div className="absolute top-3 left-3 bg-white/90 dark:bg-[#131B2E]/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-gray-800 dark:text-white flex items-center gap-1 shadow-sm border border-white/10">
                      ⭐ {recipe.rating}
                    </div>
                  </div>

                  <div className="flex-1 w-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{recipe.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Homemade • Delicious • Easy to make</p>
                      
                      <div className="flex flex-wrap items-center gap-6 bg-[#FAFAFA] dark:bg-black px-4 py-3 rounded-xl border border-gray-100 dark:border-white/10 mb-4 text-xs w-fit">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <Clock className="w-4 h-4 text-[#24733E] dark:text-[#10B981]" />
                          <span>{recipe.time} mins</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <Flame className="w-4 h-4 text-orange-500" />
                          <span>{recipe.calories} kcal</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-white/10">
                      <span className="text-xs font-semibold px-3 py-1 bg-[#EAF4EB] dark:bg-[#132A26] text-[#24733E] dark:text-[#10B981] rounded-full">
                        {recipe.cuisine || "Recipe"}
                      </span>
                      <button className="flex items-center gap-1.5 text-xs font-bold text-[#24733E] dark:text-[#10B981] hover:underline cursor-pointer">
                        <span>View Recipe</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="rounded-[24px] border border-[#E2EBE4] dark:border-white/10 bg-white dark:bg-[#131B2E] py-16 text-center shadow-sm">
            <SlidersHorizontal className="mx-auto mb-3 h-12 w-12 text-gray-300 dark:text-gray-500" />
            <h3 className="mb-1 text-lg font-bold text-gray-800 dark:text-white">No recipes found</h3>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or selecting a different filter.</p>
            <button
              onClick={resetFilters}
              className="cursor-pointer rounded-[12px] bg-[#24733E] dark:bg-[#10B981] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#1e5d32] dark:hover:bg-[#059669]"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Pagination Component */}
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          setCurrentPage={setCurrentPage} 
        />

      </div>
    </div>
  );
}
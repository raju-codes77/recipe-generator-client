"use client";

import { Search, LayoutGrid, Globe, Filter, X } from "lucide-react";

interface FilterCardProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedCuisine: string;
  setSelectedCuisine: (cuisine: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  showAdvancedFilters: boolean;
  setShowAdvancedFilters: (show: boolean) => void;
  maxTime: number;
  setMaxTime: (time: number) => void;
  maxCalories: number;
  setMaxCalories: (calories: number) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  resetFilters: () => void;
  isFiltered: boolean;
  availableCategories: string[];
  availableCuisines: string[];
}

export default function FilterCard({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedCuisine,
  setSelectedCuisine,
  sortBy,
  setSortBy,
  showAdvancedFilters,
  setShowAdvancedFilters,
  maxTime,
  setMaxTime,
  maxCalories,
  setMaxCalories,
  minRating,
  setMinRating,
  resetFilters,
  isFiltered,
  availableCategories = [],
  availableCuisines = [],
}: FilterCardProps) {
  
  // Active check conditions
  const isCategoryActive = selectedCategory !== "All";
  const isCuisineActive = selectedCuisine !== "All";
  const isSortActive = sortBy !== "Latest";

  return (
    <div className="relative mb-6 overflow-hidden rounded-[24px] border border-gray-200 dark:border-white/10 bg-white dark:bg-[#131B2E] p-5 md:p-6 shadow-[0_8px_20px_rgba(37,83,49,0.03)] dark:shadow-none transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Left Text Content */}
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 bg-[#EAF4EB] dark:bg-[#132A26] text-[#24733E] dark:text-[#10B981] rounded-lg text-[11px] font-bold flex items-center gap-1.5">
              📖 Recipe Collection
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-[#17231A] dark:text-white mb-1.5">
            Recipe Collection
          </h1>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Discover and collect amazing recipes from our community. Save your favorites, organize in collections, and never lose a great recipe again.
          </p>
        </div>

        {/* Right Banner Image (Compact height) */}
        <div className="relative w-full md:w-[320px] h-[100px] md:h-[110px] rounded-xl overflow-hidden shrink-0 flex items-center justify-end">
          <img 
            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80" 
            alt="Recipe Collection Banner" 
            className="w-full h-full object-cover opacity-90 dark:opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-[#131B2E] via-transparent to-transparent md:w-24" />
        </div>

      </div>

      {/* SEARCH & SINGLE ROW FILTER BAR */}
      <div className="mt-5 pt-4 border-t border-gray-100 dark:border-white/10 flex flex-wrap items-center gap-2.5">
        
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search recipes, ingredients, cuisines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-[12px] border border-gray-200 dark:border-white/10 bg-[#F8FAF8] dark:bg-[#0B0F19] text-xs text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#24733E] dark:focus:border-[#10B981] transition-all"
          />
        </div>

        {/* Dynamic Categories Dropdown */}
        <div className="relative">
          <div className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${isCategoryActive ? "text-[#24733E] dark:text-[#10B981]" : "text-gray-500 dark:text-gray-400"}`}>
            <LayoutGrid className="w-3.5 h-3.5" />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`appearance-none pl-9 pr-7 py-2.5 rounded-[12px] border text-xs font-semibold focus:outline-none cursor-pointer transition-all ${
              isCategoryActive
                ? "border-[#24733E] dark:border-[#10B981] bg-[#EAF4EB] dark:bg-[#132A26] text-[#24733E] dark:text-[#10B981]"
                : "border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B0F19] text-gray-700 dark:text-gray-300 hover:border-gray-300"
            }`}
          >
            <option value="All" className="bg-white dark:bg-[#131B2E]">All Categories</option>
            {availableCategories.map((cat) => (
              <option key={cat} value={cat} className="bg-white dark:bg-[#131B2E]">
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Dynamic Cuisines Dropdown */}
        <div className="relative">
          <div className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${isCuisineActive ? "text-[#24733E] dark:text-[#10B981]" : "text-gray-500 dark:text-gray-400"}`}>
            <Globe className="w-3.5 h-3.5" />
          </div>
          <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className={`appearance-none pl-9 pr-7 py-2.5 rounded-[12px] border text-xs font-semibold focus:outline-none cursor-pointer transition-all ${
              isCuisineActive
                ? "border-[#24733E] dark:border-[#10B981] bg-[#EAF4EB] dark:bg-[#132A26] text-[#24733E] dark:text-[#10B981]"
                : "border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B0F19] text-gray-700 dark:text-gray-300 hover:border-gray-300"
            }`}
          >
            <option value="All" className="bg-white dark:bg-[#131B2E]">All Cuisines</option>
            {availableCuisines.map((cuisine) => (
              <option key={cuisine} value={cuisine} className="bg-white dark:bg-[#131B2E]">
                {cuisine}
              </option>
            ))}
          </select>
        </div>

        {/* Filters Toggle Button */}
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-[12px] border text-xs font-semibold transition-colors cursor-pointer ${
            showAdvancedFilters 
              ? "border-[#24733E] dark:border-[#10B981] bg-[#EAF4EB] dark:bg-[#132A26] text-[#24733E] dark:text-[#10B981]" 
              : "border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B0F19] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Filters</span>
        </button>

        {/* Sort / Latest Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`appearance-none pl-3.5 pr-7 py-2.5 rounded-[12px] border text-xs font-semibold focus:outline-none cursor-pointer transition-all ${
              isSortActive
                ? "border-[#24733E] dark:border-[#10B981] bg-[#EAF4EB] dark:bg-[#132A26] text-[#24733E] dark:text-[#10B981]"
                : "border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B0F19] text-gray-700 dark:text-gray-300 hover:border-gray-300"
            }`}
          >
            <option value="Latest" className="bg-white dark:bg-[#131B2E]">Latest</option>
            <option value="Top Rated" className="bg-white dark:bg-[#131B2E]">Top Rated</option>
            <option value="Quickest" className="bg-white dark:bg-[#131B2E]">Quickest</option>
          </select>
        </div>

        {/* Reset button */}
        {isFiltered && (
          <button
            onClick={resetFilters}
            className="flex items-center justify-center w-9 h-9 rounded-[12px] bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors cursor-pointer"
            title="Reset Filters"
          >
            <X className="w-4 h-4" />
          </button>
        )}

      </div>

      {/* ================= COLLAPSIBLE ADVANCED SLIDER FILTERS ================= */}
      {showAdvancedFilters && (
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Max Cooking Time */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
              <span>Max Cooking Time</span>
              <span className="text-[#24733E] dark:text-[#10B981] font-bold">{maxTime} mins</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={maxTime}
              onChange={(e) => setMaxTime(Number(e.target.value))}
              className="w-full accent-[#24733E] dark:accent-[#10B981] cursor-pointer"
            />
          </div>

          {/* Max Calories */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
              <span>Max Calories</span>
              <span className="text-orange-500 font-bold">{maxCalories} kcal</span>
            </div>
            <input
              type="range"
              min="300"
              max="1000"
              step="50"
              value={maxCalories}
              onChange={(e) => setMaxCalories(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
          </div>

          {/* Minimum Rating */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
              <span>Minimum Rating</span>
              <span className="text-[#24733E] dark:text-[#10B981] font-bold">{minRating}★ & above</span>
            </div>
            <input
              type="range"
              min="0"
              max="4.8"
              step="0.1"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full accent-[#24733E] dark:accent-[#10B981] cursor-pointer"
            />
          </div>

        </div>
      )}

    </div>
  );
}
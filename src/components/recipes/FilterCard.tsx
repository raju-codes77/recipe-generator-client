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
}: FilterCardProps) {
  
  // Active check conditions
  const isCategoryActive = selectedCategory !== "All";
  const isCuisineActive = selectedCuisine !== "All";
  const isSortActive = sortBy !== "Latest";

  return (
    <div className="relative mb-8 overflow-hidden rounded-[28px] border border-[#E2EBE4] bg-white p-6 md:p-10 shadow-[0_10px_30px_rgba(37,83,49,0.04)]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        
        {/* Left Text Content */}
        <div className="max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#17231A] mb-3">
            Recipe Collection
          </h1>
          <p className="text-sm md:text-base text-gray-500 leading-relaxed">
            Discover and collect amazing recipes from our community. Save your favorites, organize in collections, and never lose a great recipe again.
          </p>
        </div>

      </div>

      {/* ================= SEARCH & SINGLE ROW FILTER BAR ================= */}
      <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-3">
        
        {/* Search Input */}
        <div className="relative flex-1 min-w-[260px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search recipes, ingredients, cuisines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-[14px] border border-[#E2EBE4] bg-[#F8FAF8] text-xs md:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#24733E] focus:bg-white transition-all"
          />
        </div>

        {/* All Categories Dropdown */}
        <div className="relative">
          <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${isCategoryActive ? "text-[#24733E]" : "text-gray-500"}`}>
            <LayoutGrid className="w-4 h-4" />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`appearance-none pl-10 pr-8 py-3 rounded-[14px] border text-xs font-semibold focus:outline-none cursor-pointer transition-all ${
              isCategoryActive
                ? "border-[#24733E] bg-[#EAF4EB] text-[#24733E]"
                : "border-[#E2EBE4] bg-white text-gray-700 hover:border-gray-300"
            }`}
          >
            <option value="All">All Categories</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>

        {/* All Cuisines Dropdown */}
        <div className="relative">
          <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${isCuisineActive ? "text-[#24733E]" : "text-gray-500"}`}>
            <Globe className="w-4 h-4" />
          </div>
          <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className={`appearance-none pl-10 pr-8 py-3 rounded-[14px] border text-xs font-semibold focus:outline-none cursor-pointer transition-all ${
              isCuisineActive
                ? "border-[#24733E] bg-[#EAF4EB] text-[#24733E]"
                : "border-[#E2EBE4] bg-white text-gray-700 hover:border-gray-300"
            }`}
          >
            <option value="All">All Cuisines</option>
            <option value="Mexican">Mexican</option>
            <option value="Mediterranean">Mediterranean</option>
            <option value="Italian">Italian</option>
            <option value="American">American</option>
          </select>
        </div>

        {/* Filters Toggle Button */}
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-[14px] border text-xs font-semibold transition-colors cursor-pointer ${
            showAdvancedFilters 
              ? "border-[#24733E] bg-[#EAF4EB] text-[#24733E]" 
              : "border-[#E2EBE4] bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>

        {/* Sort / Latest Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`appearance-none pl-4 pr-8 py-3 rounded-[14px] border text-xs font-semibold focus:outline-none cursor-pointer transition-all ${
              isSortActive
                ? "border-[#24733E] bg-[#EAF4EB] text-[#24733E]"
                : "border-[#E2EBE4] bg-white text-gray-700 hover:border-gray-300"
            }`}
          >
            <option value="Latest">Latest</option>
            <option value="Top Rated">Top Rated</option>
            <option value="Quickest">Quickest</option>
          </select>
        </div>

        {/* Reset button */}
        {isFiltered && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 px-3 py-3 rounded-[14px] bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 transition-colors cursor-pointer"
            title="Reset Filters"
          >
            <X className="w-4 h-4" />
          </button>
        )}

      </div>

      {/* ================= COLLAPSIBLE ADVANCED SLIDER FILTERS ================= */}
      {showAdvancedFilters && (
        <div className="mt-5 pt-5 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Max Cooking Time */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
              <span>Max Cooking Time</span>
              <span className="text-[#24733E] font-bold">{maxTime} mins</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={maxTime}
              onChange={(e) => setMaxTime(Number(e.target.value))}
              className="w-full accent-[#24733E] cursor-pointer"
            />
          </div>

          {/* Max Calories */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
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
            <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
              <span>Minimum Rating</span>
              <span className="text-[#24733E] font-bold">{minRating}★ & above</span>
            </div>
            <input
              type="range"
              min="0"
              max="4.8"
              step="0.1"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full accent-[#24733E] cursor-pointer"
            />
          </div>

        </div>
      )}

    </div>
  );
}
"use client";

import { useState, useMemo } from "react";
import RecipeCard from "@/components/recipes/RecipeCard";
import { Search, SlidersHorizontal, X } from "lucide-react";

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
  ingredients?: string[];
}

const DUMMY_RECIPES: Recipe[] = [
  {
    id: 1,
    title: "Spicy Shrimp Tacos",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
    rating: 4.8,
    time: 23,
    calories: 640,
    cuisine: "Mexican",
    category: "Dinner",
    diet: "Gluten-Free",
    difficulty: "Medium",
    ingredients: ["shrimp", "tortilla", "lime", "chili", "cabbage"]
  },
  {
    id: 2,
    title: "Quinoa Power Bowl",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999",
    rating: 4.9,
    time: 25,
    calories: 580,
    cuisine: "Mediterranean",
    category: "Lunch",
    diet: "Vegan",
    difficulty: "Easy",
    ingredients: ["quinoa", "avocado", "chickpeas", "cucumber", "tahini"]
  },
  {
    id: 3,
    title: "Creamy Chicken Alfredo",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a",
    rating: 4.7,
    time: 30,
    calories: 710,
    cuisine: "Italian",
    category: "Dinner",
    diet: "Keto",
    difficulty: "Hard",
    ingredients: ["chicken", "fettuccine", "parmesan", "garlic", "cream"]
  },
  {
    id: 4,
    title: "Avocado Toast with Egg",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8",
    rating: 4.6,
    time: 15,
    calories: 350,
    cuisine: "American",
    category: "Breakfast",
    diet: "Vegetarian",
    difficulty: "Easy",
    ingredients: ["avocado", "bread", "egg", "salt", "pepper"]
  }
];

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDiet, setSelectedDiet] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [maxTime, setMaxTime] = useState(60);
  const [maxCalories, setMaxCalories] = useState(1000);
  const [minRating, setMinRating] = useState(0);

  const filteredRecipes = useMemo(() => {
    return DUMMY_RECIPES.filter((recipe) => {
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients?.some((ing) =>
          ing.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCuisine =
        selectedCuisine === "All" || recipe.cuisine === selectedCuisine;
      const matchesCategory =
        selectedCategory === "All" || recipe.category === selectedCategory;
      const matchesDiet =
        selectedDiet === "All" || recipe.diet === selectedDiet;
      const matchesDifficulty =
        selectedDifficulty === "All" || recipe.difficulty === selectedDifficulty;

      const matchesTime = recipe.time <= maxTime;
      const matchesCalories = recipe.calories <= maxCalories;
      const matchesRating = recipe.rating >= minRating;

      return (
        matchesSearch &&
        matchesCuisine &&
        matchesCategory &&
        matchesDiet &&
        matchesDifficulty &&
        matchesTime &&
        matchesCalories &&
        matchesRating
      );
    });
  }, [
    searchQuery,
    selectedCuisine,
    selectedCategory,
    selectedDiet,
    selectedDifficulty,
    maxTime,
    maxCalories,
    minRating,
  ]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCuisine("All");
    setSelectedCategory("All");
    setSelectedDiet("All");
    setSelectedDifficulty("All");
    setMaxTime(60);
    setMaxCalories(1000);
    setMinRating(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* ================= SEARCH & FILTER SECTION ================= */}
      <div className="bg-white rounded-[24px] border border-[#E2EBE4] p-5 shadow-[0_10px_30px_rgba(37,83,49,0.04)] mb-8 space-y-4">
        
        {/* Top Bar: Search Input */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by recipe name or ingredients (e.g., shrimp, quinoa)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4.5 py-3.5 rounded-[16px] border border-[#E2EBE4] bg-[#F8FAF8] text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#24733E] focus:bg-white transition-all duration-300"
            />
          </div>
          <button
            onClick={resetFilters}
            className="w-full md:w-auto shrink-0 px-5 py-3.5 rounded-[16px] border border-gray-200 bg-gray-50 text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <X className="w-4 h-4 text-gray-500" />
            Reset Filters
          </button>
        </div>

        {/* Dropdown Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          
          {/* Cuisine Filter */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Cuisine</label>
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="w-full px-3 py-2.5 rounded-[12px] border border-[#E2EBE4] bg-[#F8FAF8] text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#24733E]"
            >
              <option value="All">All Cuisines</option>
              <option value="Mexican">Mexican</option>
              <option value="Mediterranean">Mediterranean</option>
              <option value="Italian">Italian</option>
              <option value="American">American</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-[12px] border border-[#E2EBE4] bg-[#F8FAF8] text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#24733E]"
            >
              <option value="All">All Categories</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>

          {/* Diet Filter */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Diet</label>
            <select
              value={selectedDiet}
              onChange={(e) => setSelectedDiet(e.target.value)}
              className="w-full px-3 py-2.5 rounded-[12px] border border-[#E2EBE4] bg-[#F8FAF8] text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#24733E]"
            >
              <option value="All">All Diets</option>
              <option value="Vegan">Vegan</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Gluten-Free">Gluten-Free</option>
              <option value="Keto">Keto</option>
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2.5 rounded-[12px] border border-[#E2EBE4] bg-[#F8FAF8] text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#24733E]"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

        </div>

        {/* Sliders / Numeric Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-gray-100">
          
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

      </div>

      {/* ================= RECIPES GRID ================= */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe: Recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-[24px] border border-[#E2EBE4]">
          <SlidersHorizontal className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-800 mb-1">No recipes found</h3>
          <p className="text-sm text-gray-500 mb-4">Try adjusting your search query or filter options.</p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-[#24733E] text-white text-xs font-bold rounded-[12px] hover:bg-[#1e5d32] transition-colors cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
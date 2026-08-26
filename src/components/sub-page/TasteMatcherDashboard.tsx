"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Heart,
  Sparkles,
  Check,
  X,
  Sliders,
  ChefHat,
  Loader2
} from "lucide-react";

interface Recipe {
  id: number;
  title: string;
  image: string;
  matchScore: number;
  description: string;
  basedOn: string;
}

export default function TasteMatcherDashboard() {
  // Palate Slider States
  const [sweetness, setSweetness] = useState<number>(7);
  const [sourness, setSourness] = useState<number>(3);
  const [saltiness, setSaltiness] = useState<number>(5);
  const [umami, setUmami] = useState<number>(8);
  const [spiciness, setSpiciness] = useState<number>(3);

  // Ingredient Likes & Dislikes States
  const [likes, setLikes] = useState<string[]>(["Garlic", "Avocado", "Basil"]);
  const [dislikes, setDislikes] = useState<string[]>(["Cilantro", "Blue Cheese"]);
  const [likeInput, setLikeInput] = useState<string>("");
  const [dislikeInput, setDislikeInput] = useState<string>("");

  // Cuisines State
  const [cuisines, setCuisines] = useState({
    thai: true,
    mexican: false,
    mediterranean: true,
    italian: false,
  });

  // Loading and Recipes State
  const [loading, setLoading] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: 1,
      title: "Spicy Lime Avocado Chicken",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCQg95O9q7UTUcTfJLslF-mjZWES9ZZjo9Mf9GcG0A3g&s=10",
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
  ]);

  const handleAddLike = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && likeInput.trim()) {
      e.preventDefault();
      if (!likes.includes(likeInput.trim())) {
        setLikes([...likes, likeInput.trim()]);
      }
      setLikeInput("");
    }
  };

  const removeLike = (item: string) => {
    setLikes(likes.filter((l) => l !== item));
  };

  const handleAddDislike = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && dislikeInput.trim()) {
      e.preventDefault();
      if (!dislikes.includes(dislikeInput.trim())) {
        setDislikes([...dislikes, dislikeInput.trim()]);
      }
      setDislikeInput("");
    }
  };

  const removeDislike = (item: string) => {
    setDislikes(dislikes.filter((d) => d !== item));
  };

  // Claude AI Match Function
  const handleMatchRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/match-recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sweetness,
          sourness,
          saltiness,
          umami,
          spiciness,
          likes,
          dislikes,
          cuisines,
        }),
      });

      const data = await response.json();
      if (data.success && data.recipes) {
        setRecipes(data.recipes);
      } else {
        alert("Failed to fetch AI recommendations.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Something went wrong connecting to the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 transition-colors duration-300">

      {/* Top Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 border-b border-gray-100 dark:border-gray-800 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight">
            Define Your Palate
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Adjust your flavor profile to get personalized AI culinary recommendations.
          </p>
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold">
            Personalized Recommendations <span className="text-emerald-600 dark:text-emerald-400 text-lg">({recipes.length} Found)</span>
          </h2>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Define Your Palate Controls */}
        <div className="lg:col-span-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-6">

          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm tracking-wide uppercase text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-600" /> Palate Sliders
            </h3>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/40">
              75% Profile Completed
            </span>
          </div>

          {/* Sliders Container */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span>🍬 Sweetness</span>
                <span className="text-gray-400">{sweetness}</span>
              </div>
              <input
                type="range" min="0" max="10" value={sweetness}
                onChange={(e) => setSweetness(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span>🍋 Sourness</span>
                <span className="text-gray-400">{sourness}</span>
              </div>
              <input
                type="range" min="0" max="10" value={sourness}
                onChange={(e) => setSourness(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span>🧂 Saltiness</span>
                <span className="text-gray-400">{saltiness}</span>
              </div>
              <input
                type="range" min="0" max="10" value={saltiness}
                onChange={(e) => setSaltiness(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span>🍄 Umami</span>
                <span className="text-gray-400">{umami}</span>
              </div>
              <input
                type="range" min="0" max="10" value={umami}
                onChange={(e) => setUmami(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span>🌶️ Spiciness</span>
                <span className="text-gray-400">{spiciness}</span>
              </div>
              <input
                type="range" min="0" max="10" value={spiciness}
                onChange={(e) => setSpiciness(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg"
              />
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-800" />

          {/* Ingredient Likes & Dislikes */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm tracking-wide uppercase text-gray-800 dark:text-gray-200">
              Ingredient Likes & Dislikes
            </h3>

            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1.5">
                Likes (Type & press enter)
              </label>
              <div className="flex flex-wrap items-center gap-1.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-2 min-h-[46px]">
                {likes.map((item, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800/50">
                    🧄 {item}
                    <button onClick={() => removeLike(item)} className="hover:text-emerald-900 ml-1">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={likeInput}
                  onChange={(e) => setLikeInput(e.target.value)}
                  onKeyDown={handleAddLike}
                  placeholder={likes.length === 0 ? "Add like..." : ""}
                  className="bg-transparent text-xs focus:outline-none flex-1 min-w-[100px] px-1 text-gray-800 dark:text-gray-200"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1.5">
                Dislikes (Type & press enter)
              </label>
              <div className="flex flex-wrap items-center gap-1.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-2 min-h-[46px]">
                {dislikes.map((item, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs px-2.5 py-1 rounded-lg border border-rose-200 dark:border-rose-800/50">
                    🌿 {item}
                    <button onClick={() => removeDislike(item)} className="hover:text-rose-900 ml-1">
                      <X className="w-3 h-3 text-rose-600" />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={dislikeInput}
                  onChange={(e) => setDislikeInput(e.target.value)}
                  onKeyDown={handleAddDislike}
                  placeholder={dislikes.length === 0 ? "Add dislike..." : ""}
                  className="bg-transparent text-xs focus:outline-none flex-1 min-w-[100px] px-1 text-gray-800 dark:text-gray-200"
                />
              </div>
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-800" />

          {/* Preferred Cuisines */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm tracking-wide uppercase text-gray-800 dark:text-gray-200">
              Preferred Cuisines
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs font-medium">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cuisines.thai}
                  onChange={(e) => setCuisines({ ...cuisines, thai: e.target.checked })}
                  className="accent-emerald-600 rounded w-4 h-4"
                />
                <span>🌶️ Thai</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cuisines.mexican}
                  onChange={(e) => setCuisines({ ...cuisines, mexican: e.target.checked })}
                  className="accent-emerald-600 rounded w-4 h-4"
                />
                <span>🌮 Mexican</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cuisines.mediterranean}
                  onChange={(e) => setCuisines({ ...cuisines, mediterranean: e.target.checked })}
                  className="accent-emerald-600 rounded w-4 h-4"
                />
                <span>🫒 Mediterranean</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cuisines.italian}
                  onChange={(e) => setCuisines({ ...cuisines, italian: e.target.checked })}
                  className="accent-emerald-600 rounded w-4 h-4"
                />
                <span>🍕 Italian</span>
              </label>
            </div>
          </div>

          {/* Match Recipes Button with Loading state */}
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
                <span>Groq AI is cooking recipes...</span>
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

              <div className="p-5 flex flex-col flex-grow space-y-3">
                <h3 className="font-bold text-base text-gray-900 dark:text-white leading-snug">
                  {recipe.title}
                </h3>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-lg w-fit border border-emerald-100 dark:border-emerald-800/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{recipe.matchScore}% Taste Match</span>
                </div>

                <p className="text-xs text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                  {recipe.description}
                </p>

                <p className="text-[11px] text-gray-400 dark:text-gray-500 pt-1 border-t border-gray-100 dark:border-gray-800">
                  {recipe.basedOn}
                </p>

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

      </div>

    </div>
  );
}
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Bookmark, Heart, Clock, Flame, ArrowRight } from "lucide-react";

interface Recipe {
  id: number;
  title: string;
  image: string;
  rating: number;
  chef: string;
  time: string;
  category: string;
  calories: string;
}

export default function RecipeCollectionSection() {
  const recipes: Recipe[] = [
    {
      id: 1,
      title: "Mango Chicken Bowl",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
      rating: 4.8,
      chef: "Sarah Ahmed",
      time: "30 min",
      category: "Asian",
      calories: "510 kcal",
    },
    {
      id: 2,
      title: "Veggie Buddha Bowl",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
      rating: 4.7,
      chef: "Riya's Kitchen",
      time: "25 min",
      category: "Healthy",
      calories: "420 kcal",
    },
    {
      id: 3,
      title: "Spicy Lentil Soup",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80",
      rating: 4.6,
      chef: "Healthy Bites",
      time: "40 min",
      category: "Soup",
      calories: "310 kcal",
    },
    {
      id: 4,
      title: "Avocado Toast Deluxe",
      image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=600&q=80",
      rating: 4.9,
      chef: "Quinoa Salad",
      time: "15 min",
      category: "Breakfast",
      calories: "380 kcal",
    },
  ];

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

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-16">
          {recipes.map((recipe, idx) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-2xl hover:border-emerald-500/30 transition-all duration-300 flex flex-col group cursor-pointer"
            >
              {/* Image & Badges Container */}
              <div className="relative h-52 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Rating Badge */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{recipe.rating}</span>
                </div>

                {/* Bookmark Icon */}
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-emerald-600 hover:text-white transition-colors shadow-md">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              {/* Content Area */}
              <div className="p-5 flex flex-col flex-grow">
                {/* Title and Heart */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {recipe.title}
                  </h3>
                  <button className="text-gray-400 hover:text-red-500 transition-colors mt-0.5">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                {/* Chef & Time */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{recipe.chef}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>{recipe.time}</span>
                  </div>
                </div>

                {/* Tag & Calories */}
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/40">
                    {recipe.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-semibold text-gray-600 dark:text-gray-300">
                    <Flame className="w-3.5 h-3.5 text-orange-500" />
                    <span>{recipe.calories}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Browse All Recipes Button with Floating/Up-Down Animation */}
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
          <a
            href="/recipes"
            className="inline-flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-emerald-600/30 transition-all duration-300 text-sm md:text-base group"
          >
            <span>Browse All Recipes</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
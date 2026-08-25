"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Leaf, 
  DollarSign, 
  ArrowRight, 
  Clock, 
  ChefHat, 
  CheckCircle2, 
  Refrigerator 
} from "lucide-react";

export default function PantryToPlateSection() {
  return (
    <section className="w-full bg-[#FAF8F5] dark:bg-[#0b0f19] py-16 px-4 md:px-8 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Content Area (Width: 5/12) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:w-5/12 space-y-6"
        >
          
          {/* Top Pill Badge */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/70 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-200/60 dark:border-emerald-800/50 cursor-pointer"
          >
            <Leaf className="w-3.5 h-3.5" />
            <span>PANTRY TO PLATE AI</span>
          </motion.div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.15]">
            From What You Have, <br />
            To What <span className="text-emerald-700 dark:text-emerald-400 underline decoration-emerald-400/40 decoration-wavy underline-offset-8">You&apos;ll Love</span>
          </h1>

          {/* Description */}
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            Turn your everyday ingredients into amazing meals with our Pantry-to-Plate AI. Reduce food waste, save money, and discover new favorites — instantly.
          </p>

          {/* Feature List */}
          <div className="space-y-4 pt-2">
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-start gap-3.5 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5 shadow-sm">
                <Leaf className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Reduce Food Waste</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Use what you already have in stock</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-start gap-3.5 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0 mt-0.5 shadow-sm">
                <DollarSign className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Save Money</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Make more with less groceries</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-start gap-3.5 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5 shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">AI-Powered Ideas</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Smart recipes customized just for you</p>
              </div>
            </motion.div>
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-4 px-7 rounded-2xl text-sm transition-all shadow-lg shadow-emerald-800/20 flex items-center gap-2.5"
            >
              <span>Try Pantry-to-Plate AI</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Social Proof / Loved by */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex -space-x-2 overflow-hidden">
              <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white dark:ring-gray-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User" />
              <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white dark:ring-gray-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" />
              <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white dark:ring-gray-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="User" />
              <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white dark:ring-gray-900 object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="User" />
            </div>
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              Loved by <span className="text-emerald-700 dark:text-emerald-400">10K+</span> home cooks
            </span>
          </div>

        </motion.div>

        {/* Right Visual Interactive Mockup Area (Width: 7/12) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:w-7/12 relative flex flex-col md:flex-row items-center justify-center gap-6"
        >
          
          {/* Center Column: Fridge & Ingredients Box */}
          <div className="flex flex-col gap-4 w-full max-w-sm">
            
            {/* Fridge Window Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-900 border border-amber-200/60 dark:border-gray-800 rounded-3xl p-4 shadow-xl relative pt-6"
            >
              {/* Fixed Badge with inline-flex, whitespace-nowrap and correct padding */}
              <motion.div 
                animate={{ y: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 border border-emerald-100 dark:border-gray-700 px-4 py-1.5 rounded-full shadow-sm inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 whitespace-nowrap z-20"
              >
                <Refrigerator className="w-3.5 h-3.5 shrink-0" /> 
                <span>Your Pantry</span>
              </motion.div>

              {/* Picture with Smooth Zoom Animation */}
              <motion.div 
                whileHover="hover"
                className="relative h-44 w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 cursor-pointer"
              >
                <motion.div 
                  variants={{
                    hover: { scale: 1.08 }
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full h-full relative"
                >
                  <Image 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY5JZ7Cbp7XWghSEZip8dxrpJTyyM4lOUqCvbDuGRPdg&s=10" 
                    alt="Open Fridge with Fresh Vegetables"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>

              {/* Floating Magic Wand Button */}
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-900"
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
            </motion.div>

            {/* You Have Ingredients Box */}
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-900 border border-amber-200/60 dark:border-gray-800 rounded-3xl p-5 shadow-xl space-y-3"
            >
              <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                You have:
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {["🥚 Eggs", "🍅 Tomato", "🥬 Spinach", "🧅 Onion", "🧀 Cheese", "🍗 Chicken"].map((item, index) => (
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    key={index} 
                    className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50 p-2 rounded-2xl text-xs font-semibold text-gray-800 dark:text-gray-200 cursor-pointer"
                  >
                    <span>{item.split(" ")[0]}</span> {item.split(" ")[1]}
                  </motion.div>
                ))}
              </div>
              <div className="text-center pt-1">
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 cursor-pointer hover:underline">
                  + more
                </span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: AI Recipe Result Mobile/Card Preview */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-sm bg-white dark:bg-gray-900 border border-amber-200/60 dark:border-gray-800 rounded-3xl p-5 shadow-2xl relative pt-6"
          >
            
            {/* Fixed Badge with inline-flex, whitespace-nowrap and correct padding */}
            <motion.div 
              animate={{ y: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 border border-amber-200 dark:border-gray-700 px-4 py-1.5 rounded-full shadow-sm inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 whitespace-nowrap z-20"
            >
              <span>AI Recipe Result</span> 
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
            </motion.div>

            {/* Picture with Smooth Zoom Animation */}
            <motion.div 
              whileHover="hover"
              className="relative h-48 w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-inner cursor-pointer"
            >
              <motion.div 
                variants={{
                  hover: { scale: 1.08 }
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full h-full relative"
              >
                <Image 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi1qGNSVM4nNIFprertZHCEuenjks5T4q5CGjO3-ngBA&s=10" 
                  alt="Spicy Tomato Egg Skillet"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Recipe Info */}
            <div className="space-y-3 pt-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Spicy Tomato Egg Skillet
              </h3>

              <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 20 min</span>
                <span className="flex items-center gap-1"><ChefHat className="w-3.5 h-3.5" /> Easy</span>
                <span className="flex items-center gap-1">🍽️ 2 servings</span>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                A protein-packed, flavorful skillet made with ingredients you already have.
              </p>

              <div className="space-y-1.5 pt-1 border-t border-gray-100 dark:border-gray-800">
                <h5 className="text-xs font-bold text-gray-800 dark:text-gray-200 pt-1">
                  Why you&apos;ll love it
                </h5>
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Made with your pantry ingredients</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Quick & easy</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Delicious & nutritious</span>
                </div>
              </div>

              {/* View Full Recipe Button */}
              <div className="pt-2">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors shadow-md"
                >
                  View Full Recipe
                </motion.button>
              </div>

            </div>

          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
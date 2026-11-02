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
  Refrigerator,
  ChevronRight
} from "lucide-react";

export default function PantryToPlateSection() {
  return (
    <section className="w-full bg-[#FCFBF8] dark:bg-[#0b0f19] py-16 lg:py-20 px-6 md:px-8 transition-colors duration-300 overflow-hidden relative">
      
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-stone-100 dark:bg-amber-900/10 rounded-bl-[100px] -z-10 opacity-60" />

      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        
        {/* Left Content Area (Width: 5/12) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="lg:w-5/12 space-y-6 relative z-10"
        >
          
          {/* Top Pill Badge */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-amber-500/10 text-stone-700 dark:text-amber-400 text-[12px] font-bold border border-stone-200 dark:border-amber-800/30 cursor-pointer shadow-sm"
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span className="tracking-wide uppercase">Pantry to Plate AI</span>
          </motion.div>

          {/* Main Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-stone-900 dark:text-white leading-tight z-10">
            From What You Have, <br />
            To What <span className="text-emerald-700 dark:text-emerald-400">You'll Love.</span>
          </h2>

          {/* Description */}
          <p className="text-base text-stone-600 dark:text-slate-400 leading-relaxed font-medium max-w-lg">
            Turn your everyday ingredients into amazing meals with our Pantry-to-Plate AI. Reduce food waste, save money, and discover new favorites instantly.
          </p>

          {/* Feature List */}
          <div className="space-y-5 pt-2">
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-start gap-4 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-emerald-500/10 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0 shadow-sm border border-stone-200 dark:border-emerald-800/50 group-hover:scale-105 transition-transform duration-300">
                <Leaf className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-stone-900 dark:text-white mb-1 group-hover:text-emerald-700 transition-colors">Reduce Food Waste</h3>
                <p className="text-[13px] font-medium text-stone-500 dark:text-slate-400 leading-snug">Use what you already have in stock to make a delicious meal.</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-start gap-4 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-orange-500/10 flex items-center justify-center text-orange-500 dark:text-orange-400 shrink-0 shadow-sm border border-stone-200 dark:border-orange-800/50 group-hover:scale-105 transition-transform duration-300">
                <DollarSign className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-stone-900 dark:text-white mb-1 group-hover:text-orange-500 transition-colors">Save Money</h3>
                <p className="text-[13px] font-medium text-stone-500 dark:text-slate-400 leading-snug">Make more with less groceries and cut down on takeout.</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-start gap-4 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-teal-500/10 flex items-center justify-center text-emerald-600 dark:text-teal-400 shrink-0 shadow-sm border border-stone-200 dark:border-teal-800/50 group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-stone-900 dark:text-white mb-1 group-hover:text-emerald-600 transition-colors">AI-Powered Ideas</h3>
                <p className="text-[13px] font-medium text-stone-500 dark:text-slate-400 leading-snug">Smart recipes customized just for your taste and diet.</p>
              </div>
            </motion.div>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="bg-stone-900 hover:bg-stone-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-full text-[14px] transition-all shadow-sm flex items-center gap-2 group"
            >
              <span>Try Pantry-to-Plate AI</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>

        {/* Right Visual Interactive Mockup Area (Width: 7/12) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="lg:w-7/12 relative flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-8 w-full z-10"
        >
          
          {/* Subtle Back Glow for Cards */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[60px] -z-10" />

          {/* Center Column: Fridge & Ingredients Box */}
          <div className="flex flex-col gap-5 w-full max-w-sm">
            
            {/* Fridge Window Card */}
            <motion.div 
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-slate-900/95 border border-stone-200 dark:border-slate-800 rounded-3xl p-3 shadow-md relative pt-6 group cursor-pointer"
            >
              {/* Fixed Badge with inline-flex, whitespace-nowrap and correct padding */}
              <div 
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 px-3 py-1.5 rounded-full shadow-sm inline-flex items-center gap-1.5 text-[12px] font-bold text-emerald-700 dark:text-emerald-400 whitespace-nowrap z-20 transition-transform group-hover:-translate-y-0.5"
              >
                <Refrigerator className="w-3.5 h-3.5 shrink-0" /> 
                <span>Your Pantry</span>
              </div>

              {/* Picture with Smooth Zoom Animation */}
              <div className="relative h-40 w-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-slate-800">
                <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-700 ease-out">
                  <Image 
                    src="https://images.unsplash.com/photo-1590779033100-9f60a05a013d?q=80&w=600&auto=format&fit=crop" 
                    alt="Open Fridge with Fresh Vegetables"
                    fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent"></div>
                </div>
              </div>

              {/* Floating Magic Wand Button */}
              <motion.div 
                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-md border-[3px] border-[#FCFBF8] dark:border-slate-900"
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
            </motion.div>

            {/* You Have Ingredients Box */}
            <motion.div 
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-slate-900/95 border border-stone-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm space-y-3"
            >
              <h4 className="text-[11px] font-bold text-stone-500 dark:text-slate-400 uppercase tracking-widest pl-1">
                Ingredients Found
              </h4>
              <div className="flex flex-wrap gap-2">
                {["🥚 Eggs", "🍅 Tomato", "🥬 Spinach", "🧅 Onion", "🧀 Cheese", "🍗 Chicken"].map((item, index) => (
                  <motion.div 
                    whileHover={{ scale: 1.02, backgroundColor: "rgb(245 245 244)" }}
                    key={index} 
                    className="flex items-center gap-1.5 bg-stone-50 dark:bg-slate-800/60 border border-stone-100 dark:border-slate-700 p-1.5 px-2.5 rounded-xl text-[12px] font-bold text-stone-700 dark:text-slate-300 cursor-pointer transition-colors"
                  >
                    <span>{item.split(" ")[0]}</span> {item.split(" ")[1]}
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right Column: AI Recipe Result Mobile/Card Preview */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-sm bg-white dark:bg-slate-900/95 border border-stone-200 dark:border-slate-800 rounded-3xl p-4 shadow-md relative pt-6 group cursor-pointer"
          >
            
            {/* Fixed Badge with inline-flex, whitespace-nowrap and correct padding */}
            <div 
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange-50 dark:bg-slate-800 border border-orange-100 dark:border-slate-700 px-3 py-1.5 rounded-full shadow-sm inline-flex items-center gap-1.5 text-[12px] font-bold text-orange-600 dark:text-amber-400 whitespace-nowrap z-20 transition-transform group-hover:-translate-y-0.5"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0 text-orange-500" />
              <span>AI Recipe Result</span> 
            </div>

            {/* Picture with Smooth Zoom Animation */}
            <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-slate-800 shadow-inner">
              <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-700 ease-out">
                <Image 
                  src="https://images.unsplash.com/photo-1525385133512-2f3bdd039054?q=80&w=600&auto=format&fit=crop" 
                  alt="Spicy Tomato Egg Skillet"
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Recipe Info */}
            <div className="space-y-4 pt-4 px-2">
              <h3 className="text-[17px] font-black text-stone-900 dark:text-white leading-tight">
                Shakshuka Skillet
              </h3>

              <div className="flex flex-wrap items-center gap-2 text-[12px] font-bold text-stone-500 dark:text-slate-400">
                <span className="flex items-center gap-1 bg-stone-50 dark:bg-slate-800 px-2 py-1 rounded-md border border-stone-100 dark:border-slate-700"><Clock className="w-3 h-3" /> 20 min</span>
                <span className="flex items-center gap-1 bg-stone-50 dark:bg-slate-800 px-2 py-1 rounded-md border border-stone-100 dark:border-slate-700"><ChefHat className="w-3 h-3" /> Easy</span>
                <span className="flex items-center gap-1 bg-stone-50 dark:bg-slate-800 px-2 py-1 rounded-md border border-stone-100 dark:border-slate-700">🍽️ 2 servings</span>
              </div>

              <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-[13px] font-medium text-stone-600 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Made with your pantry items</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] font-medium text-stone-600 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>High in protein</span>
                </div>
              </div>

              {/* View Full Recipe Button */}
              <div className="pt-2">
                <div className="w-full bg-[#EEF5F0] hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 font-bold py-3 px-4 rounded-xl text-[13px] text-center transition-colors flex justify-center items-center gap-1.5">
                  <span>View Full Recipe</span>
                  <ArrowRight size={14} />
                </div>
              </div>

            </div>

          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
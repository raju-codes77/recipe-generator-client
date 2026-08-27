"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Heart, ShieldCheck, Users, Clock, Flame, ChevronRight } from "lucide-react";

export default function PersonalizationSection() {
  const chefTips = [
    {
      title: "10 Kitchen Hacks That Save Time",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=200",
    },
    {
      title: "Seasonal Ingredients Guide",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=200",
    },
    {
      title: "High Protein Meals Under 30 Min",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=200",
    },
  ];

  return (
    <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 overflow-hidden relative">
      
      {/* Background decoration elements to match the requested image aesthetic */}
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-emerald-300/30 dark:bg-emerald-600/20 rounded-full blur-2xl -z-10 pointer-events-none" />
      <div className="absolute bottom-20 left-1/4 w-32 h-32 bg-orange-300/20 dark:bg-orange-600/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Main Grid: 1 col on mobile, 3 cols on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* =========================================================================
            COLUMN 1: Phone Mockup
            ========================================================================= */}
        <motion.div 
          className="lg:col-span-4 flex justify-center relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Floating decorative elements around phone */}
          <motion.div 
            className="absolute -left-6 top-1/4 w-16 h-16 opacity-90 hidden sm:block z-20"
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            <Image src="/basil_leaf.jpg" alt="Fresh Basil Leaf" width={64} height={64} className="rounded-full object-cover shadow-xl border-2 border-white dark:border-gray-800" />
          </motion.div>
          <motion.div 
            className="absolute -right-4 bottom-1/4 w-16 h-16 opacity-90 hidden sm:block z-20"
            animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          >
            <Image src="/tomato_slice.jpg" alt="Tomato Slice" width={64} height={64} className="rounded-full object-cover shadow-xl border-2 border-white dark:border-gray-800" />
          </motion.div>

          {/* The Phone Device Mockup */}
          <div className="w-[290px] h-[600px] bg-white dark:bg-slate-950 border-[10px] border-slate-900 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col ring-4 ring-gray-100 dark:ring-gray-800">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-20" />
            
            {/* Phone Screen Content */}
            <div className="flex-1 w-full flex flex-col p-5 pt-10 overflow-hidden relative z-10">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-[10px] font-medium mb-0.5">Good Morning, Sarah 👋</p>
                  <h3 className="text-gray-900 dark:text-white font-bold text-lg leading-tight">What would you like<br/>to cook today?</h3>
                </div>
                <div className="w-8 h-8 rounded-full overflow-hidden bg-orange-100 flex-shrink-0">
                  <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="User" width={32} height={32} className="object-cover" />
                </div>
              </div>

              {/* Search Bar */}
              <div className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-full h-10 flex items-center px-4 mb-6 shadow-sm">
                <Search size={14} className="text-gray-400 mr-2" />
                <span className="text-gray-400 text-xs">Search ingredients or recipes...</span>
              </div>

              {/* Recommended Tabs */}
              <div className="w-full border-b border-gray-100 dark:border-slate-800 mb-4 pb-2">
                <span className="text-gray-900 dark:text-white font-semibold text-xs border-b-2 border-orange-500 pb-2 inline-block">Recommended for you</span>
              </div>

              {/* Recipe Card Mockup */}
              <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-3 shadow-md mb-4 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1">
                    <h4 className="text-gray-900 dark:text-white font-bold text-sm leading-tight mb-2">Lemon Garlic<br/>Grilled Chicken</h4>
                    <div className="flex items-center gap-3 text-[10px] font-semibold">
                      <span className="flex items-center gap-1 text-emerald-600"><Clock size={10}/> 20 min</span>
                      <span className="flex items-center gap-1 text-orange-500"><Flame size={10}/> 420 cal</span>
                    </div>
                  </div>
                  <div className="w-20 h-20 rounded-xl overflow-hidden relative shrink-0">
                    <Image src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&auto=format&fit=crop&q=80" alt="Recipe" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                  </div>
                </div>
                {/* Progress bar mock */}
                <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-2.5">
                  <div className="flex justify-between text-[10px] font-bold text-gray-900 dark:text-white mb-1.5">
                    <span>Fits your goal</span>
                    <span className="text-emerald-600">High Protein</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5 mb-0.5 overflow-hidden">
                    <div className="bg-emerald-500 h-1.5 rounded-full w-[85%]"></div>
                  </div>
                </div>
              </div>

              {/* Another partial card to show scroll */}
              <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-3 shadow-md opacity-40">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <h4 className="text-gray-900 dark:text-white font-bold text-sm leading-tight mb-2">Avocado Quinoa<br/>Super Salad</h4>
                  </div>
                </div>
              </div>

            </div>
            
            {/* Bottom Swipe Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gray-300 dark:bg-gray-700 rounded-full z-20" />
          </div>
        </motion.div>


        {/* =========================================================================
            COLUMN 2: Center Feature Text & Icons
            ========================================================================= */}
        <motion.div 
          className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {/* Badge */}
          <div className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-md mb-6 inline-block">
            Made For You
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-6">
            A personalized experience that gets better every day
          </h2>

          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm sm:text-base mb-10 leading-relaxed max-w-sm">
            Our AI learns your preferences, diet, and goals to bring you recipes you'll love, every single day.
          </p>

          {/* Feature Icons Row */}
          <div className="flex items-start justify-center lg:justify-start gap-6 sm:gap-10 w-full max-w-sm">
            
            {/* Icon 1 */}
            <div className="flex flex-col items-center text-center max-w-[80px]">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center mb-3 text-emerald-600 dark:text-emerald-400">
                <Users size={20} />
              </div>
              <span className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">Smarter<br/>recommendations</span>
            </div>

            {/* Icon 2 */}
            <div className="flex flex-col items-center text-center max-w-[80px]">
              <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-950/50 flex items-center justify-center mb-3 text-orange-500">
                <Heart size={20} />
              </div>
              <span className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">Healthier<br/>choices</span>
            </div>

            {/* Icon 3 */}
            <div className="flex flex-col items-center text-center max-w-[80px]">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center mb-3 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck size={20} />
              </div>
              <span className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">Better<br/>results</span>
            </div>

          </div>
        </motion.div>


        {/* =========================================================================
            COLUMN 3: Chef Tips & Inspiration Sidebar
            ========================================================================= */}
        <motion.div 
          className="lg:col-span-4 mt-12 lg:mt-0"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <div className="lg:border-l border-gray-100 dark:border-slate-800 lg:pl-10 h-full flex flex-col justify-center">
            
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Chef Tips & Inspiration</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-8 max-w-sm">
              Discover tips, guides and seasonal inspiration from our community and experts.
            </p>

            <div className="space-y-6">
              {chefTips.map((tip, index) => (
                <div key={index} className="group flex items-center gap-4 cursor-pointer pb-6 border-b border-gray-100 dark:border-slate-800/60 last:border-0 last:pb-0">
                  {/* Thumbnail */}
                  <div className="w-24 h-16 rounded-xl overflow-hidden relative shrink-0 shadow-sm">
                    <Image 
                      src={tip.image} 
                      alt={tip.title} 
                      fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {/* Content */}
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug mb-1.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {tip.title}
                    </h4>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      Read more <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

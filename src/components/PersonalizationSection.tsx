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
    <section className="w-full bg-[#FCFBF8] dark:bg-slate-900/30 overflow-hidden relative border-t border-stone-200/50 dark:border-slate-800/50">
      
      {/* Background decoration elements */}
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-emerald-500/5 dark:bg-emerald-600/10 rounded-full blur-[80px] -z-10 pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-orange-400/5 dark:bg-orange-600/10 rounded-full blur-[80px] -z-10 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
        {/* Main Grid: 1 col on mobile, 3 cols on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* =========================================================================
              COLUMN 1: Phone Mockup
              ========================================================================= */}
          <motion.div 
            className="lg:col-span-4 flex justify-center relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Floating decorative elements around phone */}
            <motion.div 
              className="absolute -left-6 top-1/4 w-16 h-16 opacity-90 hidden sm:block z-20"
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <div className="w-full h-full rounded-full overflow-hidden shadow-md border-2 border-white dark:border-slate-800">
                <Image src="/basil_leaf.jpg" alt="Fresh Basil Leaf" width={64} height={64} className="object-cover w-full h-full" />
              </div>
            </motion.div>
            <motion.div 
              className="absolute -right-4 bottom-1/4 w-16 h-16 opacity-90 hidden sm:block z-20"
              animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            >
              <div className="w-full h-full rounded-full overflow-hidden shadow-md border-2 border-white dark:border-slate-800">
                <Image src="/tomato_slice.jpg" alt="Tomato Slice" width={64} height={64} className="object-cover w-full h-full" />
              </div>
            </motion.div>

            {/* The Phone Device Mockup */}
            <div className="w-[280px] h-[580px] bg-white dark:bg-slate-950 border-[8px] border-stone-900 rounded-[3rem] shadow-xl dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col ring-1 ring-stone-900/5 dark:ring-white/10">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-stone-900 rounded-b-2xl z-20" />
              
              {/* Phone Screen Content */}
              <div className="flex-1 w-full flex flex-col p-4 pt-10 overflow-hidden relative z-10 bg-stone-50 dark:bg-slate-950">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-stone-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Good Morning 👋</p>
                    <h3 className="text-stone-900 dark:text-white font-black text-lg leading-tight tracking-tight">What to cook?</h3>
                  </div>
                  <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm flex-shrink-0">
                    <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="User" width={36} height={36} className="object-cover w-full h-full" />
                  </div>
                </div>

                {/* Search Bar */}
                <div className="w-full bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl h-10 flex items-center px-3 mb-6 shadow-sm">
                  <Search size={14} className="text-stone-400 mr-2" />
                  <span className="text-stone-400 text-[12px] font-medium">Search recipes...</span>
                </div>

                {/* Recommended Tabs */}
                <div className="w-full border-b border-stone-200 dark:border-slate-800 mb-4 pb-0 flex gap-4">
                  <span className="text-stone-900 dark:text-white font-bold text-[12px] border-b-2 border-emerald-600 pb-1.5 inline-block">Recommended</span>
                  <span className="text-stone-400 font-bold text-[12px] pb-1.5 inline-block">Trending</span>
                </div>

                {/* Recipe Card Mockup */}
                <div className="bg-white dark:bg-slate-900 border border-stone-100 dark:border-slate-800 rounded-2xl p-3 shadow-md shadow-stone-200/50 dark:shadow-none mb-4 flex flex-col relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-emerald-50 to-transparent dark:from-emerald-900/30 rounded-bl-full -z-10"></div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1">
                      <h4 className="text-stone-900 dark:text-white font-bold text-[14px] leading-tight mb-2">Lemon Garlic<br/>Grilled Chicken</h4>
                      <div className="flex flex-col gap-1 text-[10px] font-bold">
                        <span className="flex items-center gap-1.5 text-stone-500"><Clock size={10} className="text-emerald-600"/> 20 mins</span>
                        <span className="flex items-center gap-1.5 text-stone-500"><Flame size={10} className="text-orange-500"/> 420 kcal</span>
                      </div>
                    </div>
                    <div className="w-20 h-20 rounded-xl overflow-hidden relative shrink-0 shadow-sm border border-stone-100 dark:border-slate-700">
                      <Image src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&auto=format&fit=crop&q=80" alt="Recipe" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                    </div>
                  </div>
                  {/* Progress bar mock */}
                  <div className="bg-stone-50 dark:bg-slate-800/80 rounded-xl p-2.5">
                    <div className="flex justify-between text-[10px] font-bold text-stone-900 dark:text-white mb-1.5">
                      <span>Diet Match</span>
                      <span className="text-emerald-700 dark:text-emerald-400">95%</span>
                    </div>
                    <div className="w-full bg-stone-200 dark:bg-slate-700 rounded-full h-1 overflow-hidden">
                      <div className="bg-emerald-600 h-1 rounded-full w-[95%]"></div>
                    </div>
                  </div>
                </div>

                {/* Another partial card to show scroll */}
                <div className="bg-white dark:bg-slate-900 border border-stone-100 dark:border-slate-800 rounded-t-2xl p-3 shadow-md shadow-stone-200/50 dark:shadow-none flex flex-col relative overflow-hidden">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <h4 className="text-stone-900 dark:text-white font-bold text-[14px] leading-tight mb-1.5">Avocado Quinoa<br/>Super Salad</h4>
                    </div>
                  </div>
                </div>

              </div>
              
              {/* Bottom Swipe Indicator */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-stone-300 dark:bg-slate-700 rounded-full z-20" />
            </div>
          </motion.div>


          {/* =========================================================================
              COLUMN 2: Center Feature Text & Icons
              ========================================================================= */}
          <motion.div 
            className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            {/* Badge */}
            <div className="bg-white dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-black tracking-[0.15em] uppercase px-3 py-1 rounded-md mb-5 inline-block border border-stone-200 dark:border-emerald-800/50 shadow-sm">
              Made For You
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[38px] font-black text-stone-900 dark:text-white leading-[1.1] tracking-tight mb-5">
              A personalized experience that gets better.
            </h2>

            <p className="text-stone-500 dark:text-slate-400 font-medium text-base mb-10 leading-relaxed">
              Our AI learns your preferences, diet, and goals to bring you recipes you'll love, every single day.
            </p>

            {/* Feature Icons Row */}
            <div className="flex items-start justify-center lg:justify-start gap-5 sm:gap-8 w-full">
              
              {/* Icon 1 */}
              <div className="flex flex-col items-center text-center max-w-[85px] group">
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-emerald-950/50 flex items-center justify-center mb-3 text-emerald-700 dark:text-emerald-400 group-hover:scale-105 group-hover:bg-[#EEF5F0] dark:group-hover:bg-emerald-900/60 transition-all duration-300 shadow-sm border border-stone-100 dark:border-slate-800">
                  <Users size={20} />
                </div>
                <span className="text-[12px] font-bold text-stone-900 dark:text-white leading-tight">Smarter<br/>suggestions</span>
              </div>

              {/* Icon 2 */}
              <div className="flex flex-col items-center text-center max-w-[85px] group">
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-orange-950/50 flex items-center justify-center mb-3 text-orange-500 group-hover:scale-105 group-hover:bg-orange-50 dark:group-hover:bg-orange-900/60 transition-all duration-300 shadow-sm border border-stone-100 dark:border-slate-800">
                  <Heart size={20} />
                </div>
                <span className="text-[12px] font-bold text-stone-900 dark:text-white leading-tight">Healthier<br/>choices</span>
              </div>

              {/* Icon 3 */}
              <div className="flex flex-col items-center text-center max-w-[85px] group">
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-teal-950/50 flex items-center justify-center mb-3 text-teal-600 dark:text-teal-400 group-hover:scale-105 group-hover:bg-teal-50 dark:group-hover:bg-teal-900/60 transition-all duration-300 shadow-sm border border-stone-100 dark:border-slate-800">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-[12px] font-bold text-stone-900 dark:text-white leading-tight">Better<br/>results</span>
              </div>

            </div>
          </motion.div>


          {/* =========================================================================
              COLUMN 3: Chef Tips & Inspiration Sidebar
              ========================================================================= */}
          <motion.div 
            className="lg:col-span-4 mt-12 lg:mt-0 lg:pl-10 lg:border-l border-stone-200 dark:border-slate-800"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="h-full flex flex-col justify-center">
              
              <h3 className="text-xl font-black text-stone-900 dark:text-white mb-2">Chef Tips & Inspiration</h3>
              <p className="text-[14px] text-stone-500 dark:text-slate-400 font-medium mb-8 max-w-sm">
                Discover tips, guides and seasonal inspiration from our community and experts.
              </p>

              <div className="space-y-5">
                {chefTips.map((tip, index) => (
                  <div key={index} className="group flex items-center gap-4 cursor-pointer pb-5 border-b border-stone-200/60 dark:border-slate-800/60 last:border-0 last:pb-0">
                    {/* Thumbnail */}
                    <div className="w-20 h-16 rounded-xl overflow-hidden relative shrink-0 shadow-sm border border-stone-100 dark:border-slate-800">
                      <Image 
                        src={tip.image} 
                        alt={tip.title} 
                        fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="text-[14px] font-bold text-stone-900 dark:text-white leading-tight mb-1.5 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                        {tip.title}
                      </h4>
                      <span className="text-[12px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        Read more <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Activity, Clock, Settings, Heart } from "lucide-react";
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({ subsets: ["latin"], weight: ["600", "700"] });

export default function WellnessReminderLanding() {
  const features = [
    {
      icon: <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      title: "Hourly Gentle Nudges",
      description: "Customizable intervals ranging from 30 seconds to 2 hours.",
    },
    {
      icon: <Heart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      title: "AI-Powered Wellness",
      description: "Friendly, non-intrusive tips that avoid medical advice and focus on general habits.",
    },
    {
      icon: <Settings className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      title: "Full Control",
      description: "Choose your categories—from hydration to mindfulness—and toggle it anytime.",
    },
  ];

  return (
    <section className="w-full py-16 lg:py-24 px-6 md:px-12 bg-stone-50 dark:bg-[#040609] transition-colors duration-300 relative overflow-hidden border-t border-stone-200 dark:border-white/5">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        
        {/* Left Content */}
        <div className="flex flex-col">
          <div className="inline-flex items-center gap-2 bg-emerald-100/50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30 text-emerald-700 dark:text-emerald-400 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6 w-fit">
            <Activity className="w-3.5 h-3.5" />
            <span>Digital Wellbeing</span>
          </div>

          <h2 className={`text-3xl md:text-4xl lg:text-[46px] font-black tracking-tight mb-6 text-stone-900 dark:text-white leading-[1.15] ${fredoka.className}`}>
            Stay Mindful With <br className="hidden md:block" />
            <span 
              className="drop-shadow-sm"
              style={{
                background: 'linear-gradient(90deg, #154D31 0%, #10B981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              AI Wellness Reminders
            </span>
          </h2>
          
          <p className="text-base md:text-lg text-stone-600 dark:text-stone-400 mb-10 leading-relaxed max-w-lg">
            Immerse yourself in recipe discovery without losing track of your own well-being. FoodCanvas periodically delivers beautifully crafted, contextual wellness tips straight to your screen.
          </p>

          <div className="space-y-6">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 shadow-sm">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right UI Mockup */}
        <div className="relative w-full h-[450px] lg:h-[500px] flex items-center justify-center">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-emerald-500/5 dark:bg-emerald-500/10 blur-[100px] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-stone-200/50 dark:border-white/5 rounded-full border-dashed animate-[spin_60s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-stone-200/50 dark:border-white/5 rounded-full border-dashed animate-[spin_90s_linear_infinite_reverse]" />

          {/* Toast Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative z-20 w-[90%] max-w-[380px] bg-white dark:bg-[#151B23] rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border border-stone-100 dark:border-white/10 overflow-hidden ring-1 ring-black/5 dark:ring-white/5"
          >
            <div className="flex-1 w-full p-5">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-xl shadow-inner">
                    🤖
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2">
                    AI Wellness Tip
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-stone-500 dark:text-stone-400">
                    Take a short break and stretch your shoulders if you've been searching for recipes for a while. 🌱
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-stone-50 dark:bg-white/[0.02] border-t border-stone-100 dark:border-white/5 p-3 flex justify-end">
              <button className="px-4 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 rounded-lg transition-colors">
                Got it
              </button>
            </div>
            
            {/* Decorative timer bar */}
            <motion.div 
              initial={{ width: "100%" }}
              whileInView={{ width: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 10, ease: "linear", repeat: Infinity }}
              className="absolute bottom-0 left-0 h-0.5 bg-emerald-500"
            />
          </motion.div>
          
          {/* Floating UI Elements */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-10 bg-white dark:bg-[#1A222C] px-3 py-2 rounded-xl shadow-lg border border-stone-100 dark:border-white/5 flex items-center gap-2 z-10"
          >
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-xs font-medium text-stone-600 dark:text-stone-300">Hydration</span>
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-12 left-6 bg-white dark:bg-[#1A222C] px-3 py-2 rounded-xl shadow-lg border border-stone-100 dark:border-white/5 flex items-center gap-2 z-10"
          >
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <span className="text-xs font-medium text-stone-600 dark:text-stone-300">Mindfulness</span>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}

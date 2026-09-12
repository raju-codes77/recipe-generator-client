"use client";

import React from "react";
import { motion } from "framer-motion";
import { Camera, Sparkles, UtensilsCrossed } from "lucide-react";

interface StepItem {
  stepNumber: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function HowItWorksSection() {
  const steps: StepItem[] = [
    {
      stepNumber: "01",
      icon: <Camera className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />,
      title: "Add Ingredients",
      description: "Snap a photo of your fridge or type what you have. We organize your pantry instantly.",
    },
    {
      stepNumber: "02",
      icon: <Sparkles className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />,
      title: "Let AI Create",
      description: "Our AI generates perfect recipe matches tailored to your diet, goals, and taste profile.",
    },
    {
      stepNumber: "03",
      icon: <UtensilsCrossed className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />,
      title: "Cook & Enjoy",
      description: "Follow easy, step-by-step instructions. Eat healthier, save money, and reduce food waste.",
    },
  ];

  return (
    <section className="w-full py-16 lg:py-20 px-6 md:px-8 bg-white dark:bg-[#080B12] transition-colors duration-300 relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px] rounded-[100%] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto flex flex-col items-center relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14 max-w-2xl flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-stone-100 dark:bg-white/5 backdrop-blur-md border border-stone-200 dark:border-white/10 text-emerald-600 dark:text-emerald-400 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-5 shadow-sm">
            <span>Seamless Workflow</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-[48px] font-black tracking-tight mb-5 text-stone-900 dark:text-white leading-[1.1]">
            How <br className="md:hidden" />
            <span 
              className="drop-shadow-sm"
              style={{
                background: 'linear-gradient(90deg, #154D31 0%, #24733E 50%, #10B981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              FoodCanvas
            </span> Works
          </h2>
          
          <p className="text-base text-stone-500 dark:text-stone-400 font-medium leading-relaxed max-w-md">
            Transform your daily cooking experience with three simple, intelligent steps. No more guessing what's for dinner.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8 relative w-full">
          
          {/* Animated Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-[4rem] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-emerald-200 dark:via-emerald-900/50 to-transparent z-0 overflow-hidden">
            <motion.div 
              className="w-1/3 h-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"
              animate={{ x: ["-100%", "300%"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            />
          </div>

          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col p-6 lg:p-8 rounded-[28px] bg-[#F8FAF8] dark:bg-white/5 backdrop-blur-xl border border-stone-200/80 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_20px_50px_rgba(20,80,40,0.08)] transition-all duration-500 z-10 overflow-hidden text-left"
            >
              
              {/* Giant Faded Number Background */}
              <div className="absolute -top-4 -right-4 text-[90px] font-black text-emerald-900/5 dark:text-white/5 select-none pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:-translate-x-2 group-hover:translate-y-2">
                {item.stepNumber}
              </div>

              {/* Step Icon Container */}
              <div className="relative mb-6 z-10 inline-flex">
                <motion.div 
                  className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 border border-stone-100 dark:border-white/5 flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/20 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-transparent dark:from-emerald-900/40 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10"
                  >
                    {item.icon}
                  </motion.div>
                </motion.div>
                
                {/* Badge Number */}
                <span className="absolute -bottom-2.5 -right-2.5 w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-[12px] flex items-center justify-center shadow-md border-4 border-[#F8FAF8] dark:border-[#131B2E] transition-colors duration-300">
                  {parseInt(item.stepNumber)}
                </span>
              </div>

              {/* Step Content */}
              <h3 className="text-lg font-bold mb-2.5 text-stone-900 dark:text-white relative z-10 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-[14px] text-stone-500 dark:text-stone-400 leading-relaxed font-medium relative z-10">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
"use client";

import React from "react";
import { motion } from "framer-motion";
import { CalendarPlus, ChefHat, Heart } from "lucide-react";

interface StepItem {
  stepNumber: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  colorClass: string;
  badgeBg: string;
}

export default function HowItWorksSection() {
  const steps: StepItem[] = [
    {
      stepNumber: 1,
      icon: <CalendarPlus className="w-7 h-7 text-emerald-700 dark:text-emerald-400" />,
      title: "Add Ingredients",
      description: "Tell FoodCanvas what you have in your pantry or fridge.",
      colorClass: "from-emerald-600 to-emerald-500",
      badgeBg: "bg-emerald-700",
    },
    {
      stepNumber: 2,
      icon: <ChefHat className="w-7 h-7 text-orange-500" />,
      title: "Let AI Create",
      description: "Get a personalized recipe suggestion with nutrition insights instantly.",
      colorClass: "from-orange-500 to-amber-500",
      badgeBg: "bg-orange-500",
    },
    {
      stepNumber: 3,
      icon: <Heart className="w-7 h-7 text-emerald-700 dark:text-emerald-400" />,
      title: "Cook & Share",
      description: "Create your meal and share it with the FoodCanvas community.",
      colorClass: "from-emerald-600 to-emerald-500",
      badgeBg: "bg-emerald-700",
    },
  ];

  return (
    <section className="w-full py-16 lg:py-20 px-6 md:px-8 bg-[#EEF5F0]/50 dark:bg-slate-900/30 text-stone-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto flex flex-col items-center relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 max-w-2xl">
          <span className="text-[11px] font-black uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-400 mb-4 inline-block">
            Seamless Workflow
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 text-stone-900 dark:text-white">
            How <span className="text-emerald-700 dark:text-emerald-400">FoodCanvas</span> Works
          </h2>
          <p className="text-base text-stone-500 dark:text-slate-400 font-medium leading-relaxed">
            Transform your daily cooking experience with three simple, intelligent steps. No more guessing what's for dinner.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8 relative w-full max-w-5xl">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-[4.5rem] left-[15%] right-[15%] h-[1px] bg-stone-200 dark:bg-slate-800 z-0"></div>

          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ 
                y: -4, 
                transition: { duration: 0.2 } 
              }}
              className="flex flex-col items-center text-center relative group p-6 lg:p-8 rounded-[2rem] bg-[#FCFBF8] dark:bg-slate-900 border border-stone-200/60 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 z-10"
            >
              {/* Step Icon Container with Badge */}
              <div className="relative mb-6 mt-2">
                <motion.div 
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="w-20 h-20 rounded-2xl bg-white dark:bg-slate-800 border border-stone-100 dark:border-slate-700/50 flex items-center justify-center group-hover:bg-[#EEF5F0] dark:group-hover:bg-emerald-900/20 transition-colors duration-300 shadow-sm"
                >
                  {item.icon}
                </motion.div>
                
                {/* Step Number Badge */}
                <span
                  className={`absolute -top-2.5 -right-2.5 w-8 h-8 rounded-lg ${item.badgeBg} text-white font-black text-[12px] flex items-center justify-center shadow-sm border-2 border-[#FCFBF8] dark:border-slate-900`}
                >
                  0{item.stepNumber}
                </span>
              </div>

              {/* Step Content */}
              <h3 className="text-[18px] font-bold mb-2.5 text-stone-900 dark:text-white transition-colors">
                {item.title}
              </h3>
              <p className="text-[14px] text-stone-500 dark:text-slate-400 leading-relaxed font-medium">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
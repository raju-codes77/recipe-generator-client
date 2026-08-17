"use client";

import React from "react";
import { motion } from "framer-motion";
import { CalendarPlus, ChefHat, BarChart3, Heart } from "lucide-react";

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
      icon: <CalendarPlus className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />,
      title: "Add Ingredients",
      description: "Enter ingredients you have or upload a food photo.",
      colorClass: "from-emerald-500 to-teal-600",
      badgeBg: "bg-emerald-600",
    },
    {
      stepNumber: 2,
      icon: <ChefHat className="w-7 h-7 text-orange-500" />,
      title: "AI Generates Recipes",
      description: "Our AI creates personalized recipes just for you.",
      colorClass: "from-orange-400 to-amber-500",
      badgeBg: "bg-orange-500",
    },
    {
      stepNumber: 3,
      icon: <BarChart3 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />,
      title: "Get Nutrition Insights",
      description: "See detailed nutrition and health benefits.",
      colorClass: "from-emerald-500 to-teal-600",
      badgeBg: "bg-emerald-600",
    },
    {
      stepNumber: 4,
      icon: <Heart className="w-7 h-7 text-orange-500" />,
      title: "Cook, Save & Share",
      description: "Cook, save your favorites and share with community.",
      colorClass: "from-orange-400 to-amber-500",
      badgeBg: "bg-orange-500",
    },
  ];

  return (
    <section className="w-full py-24 px-4 md:px-8 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-3.5 py-1.5 rounded-full mb-4 inline-block border border-emerald-200 dark:border-emerald-800/50 shadow-sm">
            Seamless Workflow
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            How <span className="text-emerald-600 dark:text-emerald-400">FoodCanvas</span> Works
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400 font-medium">
            Transform your daily cooking experience with four simple, intelligent steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative w-full">
          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { duration: 0.2 } 
              }}
              className="flex flex-col items-center text-center relative group p-6 rounded-3xl bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-100 dark:border-gray-800/80 shadow-lg shadow-gray-100/50 dark:shadow-none hover:shadow-2xl hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all duration-300 cursor-pointer"
            >
              {/* Step Icon Container with Badge */}
              <div className="relative mb-6 mt-2">
                <motion.div 
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200/60 dark:border-gray-700 shadow-inner flex items-center justify-center"
                >
                  {item.icon}
                </motion.div>
                
                {/* Step Number Badge */}
                <span
                  className={`absolute -top-3 -right-3 w-8 h-8 rounded-xl ${item.badgeBg} text-white font-black text-xs flex items-center justify-center shadow-md shadow-black/10 border-2 border-white dark:border-gray-900`}
                >
                  0{item.stepNumber}
                </span>
              </div>

              {/* Step Content */}
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
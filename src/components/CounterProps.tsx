"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ChefHat, Users, BookOpen, Utensils } from "lucide-react";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

// Counter animation component that triggers when in view
const Counter = ({ end, suffix = "+", duration = 2 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Easing function for smoother finish
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        setCount(Math.floor(easeOutQuart * end));

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export default function HealthyWorldSection() {
  const stats = [
    {
      icon: <ChefHat className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />,
      value: 10,
      suffix: "K+",
      label: "Recipes Created",
      bgClass: "bg-emerald-50 dark:bg-emerald-500/10"
    },
    {
      icon: <Users className="w-5 h-5 text-orange-500" />,
      value: 50,
      suffix: "K+",
      label: "Happy Users",
      bgClass: "bg-orange-50 dark:bg-orange-500/10"
    },
    {
      icon: <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
      value: 250,
      suffix: "K+",
      label: "Meals Cooked",
      bgClass: "bg-teal-50 dark:bg-teal-500/10"
    },
    {
      icon: <Utensils className="w-5 h-5 text-amber-500" />,
      value: 1,
      suffix: "M+",
      label: "Ingredients Saved",
      bgClass: "bg-amber-50 dark:bg-amber-500/10"
    },
  ];

  return (
    <section className="w-full py-12 px-6 lg:px-8 flex justify-center items-center bg-[#FCFBF8] dark:bg-[#0b0f19] relative z-10">
      {/* Main Container with Dark/Light mode support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-[1200px] bg-white/90 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 md:p-10 lg:p-12 text-stone-900 dark:text-white shadow-sm border border-stone-200/60 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10"
      >
        {/* Subtle glow effect behind the container content */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[60px] -z-10 pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-orange-400/5 dark:bg-orange-500/10 rounded-full blur-[60px] -z-10 pointer-events-none" />

        {/* Left side with the specific image link */}
        <div className="flex flex-col items-center justify-center md:w-5/12 relative z-10">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, rotate: -3 }}
            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="relative w-48 h-48 md:w-64 md:h-64 drop-shadow-xl mb-4"
          >
            <Image
              src="https://static.vecteezy.com/system/resources/previews/044/771/696/non_2x/a-basket-brimming-with-vegetables-free-png.png"
              alt="Healthy salad bowl"
              fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain hover:scale-105 transition-transform duration-500"
              priority
            />
          </motion.div>
          <h3 className="text-stone-600 dark:text-slate-300 text-base md:text-lg font-bold text-center tracking-tight leading-snug">
            Making a healthier world,<br/>
            <span className="text-emerald-700 dark:text-emerald-400">one meal at a time.</span>
          </h3>
        </div>

        {/* Right side stats and content */}
        <div className="w-full md:w-7/12 flex flex-col items-center md:items-start relative z-10">
          
          <div className="grid grid-cols-2 gap-4 lg:gap-6 w-full">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-start justify-center p-5 rounded-2xl bg-[#FCFBF8] dark:bg-slate-900 border border-stone-100 dark:border-slate-800 shadow-sm transition-shadow"
              >
                <div className={`w-10 h-10 rounded-xl ${stat.bgClass} flex items-center justify-center mb-3`}>
                  {stat.icon}
                </div>
                <h4 className="text-2xl md:text-3xl font-black text-stone-900 dark:text-white mb-1 tracking-tight">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </h4>
                <p className="text-[13px] text-stone-500 dark:text-slate-400 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
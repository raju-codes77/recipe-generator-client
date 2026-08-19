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
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));

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
      icon: <ChefHat className="w-7 h-7 text-orange-500 mb-2" />,
      value: 10,
      suffix: "K+",
      label: "Recipes Created",
    },
    {
      icon: <Users className="w-7 h-7 text-orange-500 mb-2" />,
      value: 50,
      suffix: "K+",
      label: "Happy Users",
    },
    {
      icon: <BookOpen className="w-7 h-7 text-orange-500 mb-2" />,
      value: 250,
      suffix: "K+",
      label: "Meals Cooked",
    },
    {
      icon: <Utensils className="w-7 h-7 text-orange-500 mb-2" />,
      value: 1,
      suffix: "M+",
      label: "Ingredients Saved",
    },
  ];

  return (
    <section className="w-full py-12 px-4 flex justify-center items-center">
      {/* Main Container with Dark/Light mode support */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-6xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-8 md:p-12 text-gray-900 dark:text-white shadow-xl shadow-slate-200/50 dark:shadow-none border border-gray-100 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row items-center justify-between"
      >
        {/* Left side with the specific image link */}
        <div className="flex items-center justify-center mb-8 md:mb-0 md:w-1/3 relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-48 h-48 md:w-60 md:h-60 drop-shadow-2xl"
          >
            <Image
              src="https://static.vecteezy.com/system/resources/previews/044/771/696/non_2x/a-basket-brimming-with-vegetables-free-png.png"
              alt="Healthy salad bowl"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>

        {/* Right side stats and content */}
        <div className="w-full md:w-2/3 flex flex-col items-center relative z-10">
          <h3 className="text-gray-600 dark:text-slate-400 text-lg md:text-xl font-medium mb-8 text-center tracking-wide">
            Making a healthier world, one meal at a time
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex flex-col items-center justify-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700/50 flex items-center justify-center mb-3 shadow-sm">
                  {stat.icon}
                </div>
                <h4 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </h4>
                <p className="text-xs md:text-sm text-gray-500 dark:text-slate-400 font-medium">
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
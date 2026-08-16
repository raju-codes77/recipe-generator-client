"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
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
      icon: <ChefHat className="w-8 h-8 text-orange-500 mb-2" />,
      value: 10,
      suffix: "K+",
      label: "Recipes Created",
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500 mb-2" />,
      value: 50,
      suffix: "K+",
      label: "Happy Users",
    },
    {
      icon: <BookOpen className="w-8 h-8 text-orange-500 mb-2" />,
      value: 250,
      suffix: "K+",
      label: "Meals Cooked",
    },
    {
      icon: <Utensils className="w-8 h-8 text-orange-500 mb-2" />,
      value: 1,
      suffix: "M+",
      label: "Ingredients Saved",
    },
  ];

  return (
    <section className="w-full py-12 px-4 flex justify-center items-center">
      {/* Container with dark/light mode support */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-6xl bg-emerald-900 dark:bg-gray-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between border border-emerald-800 dark:border-gray-800"
      >
        {/* Left side visual element */}
        <div className="flex items-center gap-4 mb-8 md:mb-0 md:w-1/3">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-32 h-32 md:w-40 md:h-40 bg-emerald-800/50 dark:bg-gray-800 rounded-full flex items-center justify-center border-4 border-emerald-700/50 dark:border-gray-700"
          >
            <span className="text-5xl">🥗</span>
          </motion.div>
        </div>

        {/* Right side stats and content */}
        <div className="w-full md:w-2/3 flex flex-col items-center">
          <h3 className="text-emerald-100 dark:text-gray-300 text-lg md:text-xl font-medium mb-8 text-center tracking-wide">
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
                {stat.icon}
                <h4 className="text-2xl md:text-3xl font-bold text-white dark:text-emerald-400 mb-1">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </h4>
                <p className="text-xs md:text-sm text-emerald-200/70 dark:text-gray-400 font-light">
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
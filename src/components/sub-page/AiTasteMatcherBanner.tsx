"use client";

import React from 'react';
import { Smile, Asterisk } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface TasteMatcherHeaderProps {
  title?: string;
  description?: string;
}

export default function TasteMatcherHeader({ 
  title = "AI Taste Matcher", 
  description = "Find recipes that match your unique taste preferences. Our AI learns from your ratings and suggests recipes you'll love." 
}: TasteMatcherHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="w-full bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl overflow-hidden relative transition-colors duration-300"
    >
      
      {/* Left section: Badge, title, and description */}
      <div className="space-y-4 max-w-xl z-10">
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 text-xs font-medium border border-emerald-200 dark:border-emerald-800/50 cursor-pointer"
        >
          <Smile className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Taste Matcher</span>
        </motion.div>

        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-white shadow-lg shadow-emerald-500/10 shrink-0 border border-emerald-200 dark:border-emerald-800/50 cursor-pointer"
          >
            <Asterisk className="w-6 h-6 text-emerald-600 dark:text-emerald-500" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white">
            {title}
          </h1>
        </div>

        <p className="max-w-[450px] text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-1">
          {description}
        </p>

      </div>

      {/* Right section: Exact AI Chip & Fresh Vegetables Collage matching reference image */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 h-full z-0 pointer-events-none opacity-100">
        <Image 
          src="/images/community.jpeg" 
          alt="AI Taste Matcher Banner Background"
          fill
          className="object-cover object-right"
        />
        
        {/* Soft gradient overlay to blend left side text nicely without making the image blurry */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 dark:from-[#121212] dark:via-[#121212]/30 to-transparent"></div>
      </div>

    </motion.div>
  );
}
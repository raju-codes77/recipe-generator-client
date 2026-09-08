'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Leaf } from 'lucide-react';

export default function FlavorBanner() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            whileHover={{ y: -2 }}
            className="w-full bg-emerald-50/60 dark:bg-emerald-950/20 rounded-3xl border border-emerald-200 dark:border-emerald-900/60 p-6 sm:p-8 shadow-sm relative overflow-hidden group transition-all duration-300 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10"
        >
            {/* Ambient Lighting Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl pointer-events-none rounded-full transition-opacity duration-300 group-hover:opacity-100 opacity-60" />

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
                
                {/* Left Side: Animated Icon & Text */}
                <div className="flex items-start gap-4 flex-1">
                    <motion.div
                        whileHover={{ scale: 1.08, rotate: 5 }}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/60 dark:to-emerald-800/40 text-emerald-600 dark:text-emerald-400 shrink-0 shadow-lg shadow-emerald-500/10 border border-emerald-200/50 dark:border-emerald-700/50"
                    >
                        <Leaf className="w-6 h-6" />
                    </motion.div>
                    
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                            Flavor science meets culinary art
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            Our AI analyzes thousands of recipes and flavor compounds to find the perfect combinations for you.
                        </p>
                    </div>
                </div>

                {/* Right Side: Enhanced Venn Diagram, Arrow & Badge */}
                <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 shrink-0 w-full lg:w-auto">
                    
                    {/* Venn Diagram Container */}
                    <div className="relative w-44 h-24 flex items-center justify-center">
                        <motion.span
                            animate={{ scale: [1, 1.04, 1], filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute left-0 top-1 w-16 h-16 rounded-full bg-emerald-300/80 dark:bg-emerald-700/50 flex items-center justify-center text-[11px] font-semibold text-emerald-950 dark:text-emerald-200 shadow-md ring-2 ring-emerald-400/20"
                        >
                            Aroma
                        </motion.span>

                        <motion.span
                            animate={{ scale: [1, 1.04, 1], filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                            className="absolute right-0 top-1 w-16 h-16 rounded-full bg-amber-300/80 dark:bg-amber-700/50 flex items-center justify-center text-[11px] font-semibold text-amber-950 dark:text-amber-200 shadow-md ring-2 ring-amber-400/20"
                        >
                            Texture
                        </motion.span>

                        <motion.div
                            animate={{ y: [0, 3, 0], scale: [1, 1.06, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute left-1/2 -translate-x-1/2 top-9 w-16 h-16 rounded-full bg-gradient-to-br from-lime-300 to-emerald-400 dark:from-lime-600 dark:to-emerald-700 flex flex-col items-center justify-center text-[9px] font-bold text-center text-emerald-950 dark:text-white leading-tight z-20 shadow-xl ring-4 ring-emerald-500/30"
                        >
                            <span>Perfect</span>
                            <span>Pairing</span>
                        </motion.div>
                    </div>

                    {/* Extended & Animated Arrow Icon */}
                    <div className="flex items-center text-emerald-500 dark:text-emerald-400">
                        <motion.div
                            animate={{ x: [0, 6, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            className="flex items-center"
                        >
                            <div className="w-8 h-[2px] bg-gradient-to-r from-emerald-500/40 to-emerald-500" />
                            <ArrowRight className="w-5 h-5 -ml-1 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        </motion.div>
                    </div>

                    {/* Amazing Dishes Badge */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="flex items-center gap-2.5 text-sm font-semibold text-gray-800 dark:text-gray-200 bg-white/90 dark:bg-gray-900/90 px-5 py-3 rounded-2xl border border-emerald-500/40 shadow-xl shadow-emerald-500/10 backdrop-blur-md relative overflow-hidden"
                    >
                        <motion.div
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent skew-x-12 pointer-events-none"
                        />
                        <span className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/40">
                            <Heart className="w-4 h-4 fill-white animate-pulse" />
                        </span>
                        <span className="relative z-10">Amazing Dishes</span>
                    </motion.div>

                </div>

            </div>
        </motion.div>
    );
}
"use client";

import { ArrowRight, Sparkles, Activity, Leaf, Users, Utensils, Sunrise, Trophy, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";

export default function Banner() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <section className="relative w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 pt-8 pb-16 lg:pt-16 lg:pb-20 overflow-hidden min-h-[85vh] flex items-center">

      {/* Subtle Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#EEF5F0] via-transparent to-transparent dark:from-emerald-900/10 rounded-full blur-[80px] -z-10" />
      <div className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] rounded-full border-[1px] border-emerald-200/20 dark:border-emerald-800/20 -z-10 pointer-events-none hidden lg:block" />
      <div className="absolute top-1/4 right-10 w-[450px] h-[450px] rounded-full border border-dashed border-emerald-200/30 dark:border-emerald-800/30 -z-10 pointer-events-none hidden lg:block" />

      {/* Main Grid: Left Hero Content & Right Hero Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center w-full">

        {/* Left Column (Span 6) */}
        <motion.div
          className="lg:col-span-6 flex flex-col items-start text-left z-10"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >

          {/* New Pill Badge */}
          <motion.div variants={itemVariants} className="mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800/60 border border-stone-200 dark:border-slate-700 shadow-sm text-[13px] font-semibold text-stone-700 dark:text-slate-300">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
            <span>FoodCanvas AI Beta Available</span>
            <ArrowRight size={14} className="text-stone-400" />
          </motion.div>

          {/* Main Title */}
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-[64px] font-black text-stone-900 dark:text-white tracking-tight leading-[1.05] mb-5">
            Cook <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-emerald-500 dark:from-emerald-400 dark:to-teal-300">Smarter.</span> <br />
            Eat Healthier<span className="text-orange-500">.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={itemVariants} className="text-stone-600 dark:text-slate-400 text-base sm:text-lg max-w-md font-medium leading-relaxed mb-8">
            Your personal AI-powered culinary assistant. Turn pantry staples into gourmet meals, track nutrition instantly, and join a thriving cooking community.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
            <Link href="/registrationProcess/register" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white px-7 py-3.5 rounded-full font-bold text-[15px] transition-colors shadow-sm flex items-center justify-center gap-2 group"
              >
                <span>Start Cooking Free</span>
                <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
            
            <Link href="/recipes" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-700 dark:text-slate-300 hover:border-emerald-600 dark:hover:border-emerald-500 hover:text-emerald-700 px-7 py-3.5 rounded-full font-bold text-[15px] transition-colors flex items-center justify-center gap-2 group shadow-sm"
              >
                <span>Explore Recipes</span>
                <ArrowRight size={16} className="text-stone-400 group-hover:text-emerald-600 transition-colors" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Feature Icon Row */}
          <motion.div variants={itemVariants} className="flex items-center gap-5 sm:gap-8 border-t border-stone-200 dark:border-slate-800/60 pt-6 w-full sm:w-auto">
            <div className="flex flex-col gap-1">
              <div className="flex -space-x-3">
                <img className="w-8 h-8 rounded-full border-2 border-[#FCFBF8] dark:border-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User" />
                <img className="w-8 h-8 rounded-full border-2 border-[#FCFBF8] dark:border-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" />
                <img className="w-8 h-8 rounded-full border-2 border-[#FCFBF8] dark:border-slate-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="User" />
                <div className="w-8 h-8 rounded-full border-2 border-[#FCFBF8] dark:border-slate-900 bg-stone-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-stone-600 dark:text-slate-300">+2k</div>
              </div>
              <span className="text-[12px] font-medium text-stone-500 dark:text-slate-400 mt-1">
                Join <span className="font-bold text-stone-900 dark:text-white">10,000+</span> home cooks
              </span>
            </div>
            
            <div className="h-10 w-[1px] bg-stone-200 dark:bg-slate-800/60 hidden sm:block"></div>
            
            <div className="flex gap-3">
               <FeatureIcon icon={<Utensils size={18} />} tooltip="Pantry-to-Plate" />
               <FeatureIcon icon={<Activity size={18} />} tooltip="AI Nutrition" />
               <FeatureIcon icon={<Users size={18} />} tooltip="Community" />
            </div>
          </motion.div>

        </motion.div>

        {/* Right Column: Hero Bowl & Floating Badges (Span 6) */}
        <div className="lg:col-span-6 relative flex justify-center items-center mt-12 lg:mt-0">

          {/* Subtle Back Glow */}
          <div className="absolute w-[400px] h-[400px] bg-emerald-500/5 dark:bg-emerald-500/5 rounded-full blur-[60px] -z-10" />

          {/* Wrapper for Image and Badges */}
          <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">

            {/* Hero Bowl Image */}
            <motion.div
              className="absolute inset-0 rounded-[3rem] overflow-hidden border-4 border-white/80 dark:border-slate-800/50 shadow-md backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.img
                src="/hero2.png"
                alt="Healthy chicken avocado bowl"
                className="w-full h-full object-cover"
                animate={{ y: [-4, 4, -4] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            </motion.div>

            {/* Floating Badge 1: AI Recipe Generator (Top Left) */}
            <motion.div
              className="absolute top-6 sm:top-10 -left-2 sm:-left-8 z-20 bg-white/95 dark:bg-slate-900/95 shadow-md border border-stone-100 dark:border-slate-800 rounded-xl p-2.5 pr-4 flex items-center gap-3"
              initial={{ opacity: 0, x: -20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: [-2, 2, -2] }}
              transition={{
                opacity: { delay: 0.4, duration: 0.5 },
                x: { delay: 0.4, duration: 0.5, ease: "easeOut" },
                y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1.0 }
              }}
            >
              <div className="w-9 h-9 rounded-lg bg-[#FAF9F6] dark:bg-orange-500/10 flex items-center justify-center text-orange-500">
                <Sparkles size={16} />
              </div>
              <div className="text-left">
                <p className="text-[12px] font-bold text-stone-900 dark:text-white leading-tight">
                  AI Recipe<br />Generator
                </p>
              </div>
            </motion.div>

            {/* Floating Badge 2: Nutrition Analyzer (Bottom Left) */}
            <motion.div
              className="absolute bottom-12 sm:bottom-16 -left-2 sm:-left-6 z-20 bg-white/95 dark:bg-slate-900/95 shadow-md border border-stone-100 dark:border-slate-800 rounded-xl p-2.5 pr-4 flex items-center gap-3"
              initial={{ opacity: 0, x: -20, y: -10 }}
              animate={{ opacity: 1, x: 0, y: [2, -2, 2] }}
              transition={{
                opacity: { delay: 0.6, duration: 0.5 },
                x: { delay: 0.6, duration: 0.5, ease: "easeOut" },
                y: { repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1.2 }
              }}
            >
              <div className="w-9 h-9 rounded-lg bg-[#EEF5F0] dark:bg-emerald-500/10 flex items-center justify-center text-emerald-700">
                <Activity size={16} />
              </div>
              <div className="text-left">
                <p className="text-[12px] font-bold text-stone-900 dark:text-white leading-tight">
                  Nutrition<br />Analyzer
                </p>
              </div>
            </motion.div>

            {/* Health Consultant Interactive Floating Card (Middle Right / Bottom Right) */}
            <motion.div
              className="absolute -bottom-6 sm:-bottom-8 right-0 sm:right-2 z-30 w-[240px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -4, 0] }}
              transition={{
                opacity: { delay: 0.8, duration: 0.5 },
                y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1.4 }
              }}
            >
              <Link
                href="/dashboard/users/health-consultant"
                className="block bg-white/95 dark:bg-slate-900/95 shadow-md border border-stone-200 dark:border-emerald-500/30 hover:border-emerald-600 rounded-2xl p-3.5 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-300">
                      <FaUserAlt size={12} />
                    </div>
                    <div>
                      <span className="inline-block px-1.5 py-0.5 rounded text-orange-600 dark:text-orange-400 text-[9px] font-black uppercase tracking-wider mb-0.5">
                        PRO FEATURE
                      </span>
                      <h4 className="text-[13px] font-bold text-stone-900 dark:text-white leading-none">
                        Health Consultant
                      </h4>
                    </div>
                  </div>
                </div>
                <p className="text-[12px] text-stone-500 dark:text-slate-400 mb-2 leading-relaxed">
                  Custom meal plans & diet tracking tailored to your body.
                </p>
                <div className="flex items-center justify-between text-[12px] font-bold text-emerald-700 dark:text-emerald-400 group-hover:text-emerald-800 transition-colors">
                  <span>Consult Now</span>
                  <div className="w-5 h-5 rounded-full bg-[#EEF5F0] dark:bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>

          </div>
        </div>

      </div>

    </section>
  );
}

// Small helper component for the feature icon row under the buttons
function FeatureIcon({ icon, tooltip }: { icon: React.ReactNode; tooltip: string }) {
  return (
    <div className="group relative">
      <motion.div
        className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800/80 hover:bg-[#EEF5F0] dark:hover:bg-emerald-500/20 transition-colors border border-stone-200 dark:border-slate-700 flex items-center justify-center text-stone-600 dark:text-slate-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 cursor-pointer shadow-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {icon}
      </motion.div>
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-stone-800 text-white text-[11px] font-bold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
        {tooltip}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-800"></div>
      </div>
    </div>
  );
}
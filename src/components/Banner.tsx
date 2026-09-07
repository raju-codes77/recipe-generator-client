"use client";

import { ArrowRight, Sparkles, Activity, Leaf, Users, Utensils, Sunrise, Trophy,  } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link"; // 

import { FaUserAlt } from "react-icons/fa";

export default function Banner() {
  // Stagger variants for the left column
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, duration: 0.6 } }
  };

  return (
    <section className="relative w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 lg:pt-10 lg:pb-16 overflow-hidden">

      {/* Subtle Background Decorative Orbital Line */}
      <div className="absolute top-1/4 right-10 w-[550px] h-[550px] rounded-full border border-dashed border-emerald-200/60 dark:border-emerald-800/30 -z-10 pointer-events-none hidden lg:block" />

      {/* Main Grid: Left Hero Content & Right Hero Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">

        {/* Left Column (Span 6) */}
        <motion.div
          className="lg:col-span-6 flex flex-col items-start text-left z-10"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >

          {/* Main Title */}
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.08] mb-6">
            Cook <br className="hidden sm:block" />
            Smarter. <br />
            <span className="text-emerald-700 dark:text-emerald-400">
              Eat Healthier<span className="text-orange-500 inline-block ml-0.5">.</span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={itemVariants} className="text-slate-500 dark:text-slate-400 text-base sm:text-lg max-w-md font-normal leading-relaxed mb-8">
            AI-powered recipe generator, <br className="hidden sm:block" />
            food analyzer & cooking community <br className="hidden sm:block" />
            all in one place.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-10">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#ff6b00] hover:bg-[#e66000] text-white px-7 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all shadow-lg shadow-orange-500/25 flex items-center gap-2 group"
            >
              <span>Get Started</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-transparent border-2 border-emerald-600 dark:border-emerald-500 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 px-7 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all flex items-center gap-2 group"
            >
              <span>Explore Recipes</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>

          {/* Feature Icon Row */}
          <div className="flex flex-wrap items-start gap-6 sm:gap-8">
            <motion.div variants={itemVariants}><FeatureIcon icon={<Utensils size={18} />} label="Pantry-to-Plate" /></motion.div>
            <motion.div variants={itemVariants}><FeatureIcon icon={<Activity size={18} />} label="AI Nutrition" /></motion.div>
            <motion.div variants={itemVariants}><FeatureIcon icon={<Users size={18} />} label="Community Recipes" /></motion.div>
            <motion.div variants={itemVariants}><FeatureIcon icon={<Sunrise size={18} />} label="Personalized Feed" /></motion.div>
            <motion.div variants={itemVariants}><FeatureIcon icon={<Trophy size={18} />} label="Cooking Challenges" /></motion.div>
          </div>

        </motion.div>

        {/* Right Column: Hero Bowl & Floating Badges (Span 6) */}
        <div className="lg:col-span-6 relative flex justify-center items-center">

          {/* Subtle Back Glow */}
          <div className="absolute w-[450px] h-[450px] bg-emerald-300/20 dark:bg-emerald-600/15 rounded-full blur-3xl -z-10" />

          {/* Wrapper for Image and Badges */}
          <div className="relative w-full max-w-[540px] aspect-square flex items-center justify-center">

            {/* Hero Bowl Image */}
            <motion.div
              className="absolute inset-0 bg-slate-100 dark:bg-slate-800 rounded-3xl lg:rounded-[2.5rem] overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.img
                src="/hero2.png"
                alt="Healthy chicken avocado bowl"
                className="w-full h-full object-cover shadow-2xl shadow-emerald-900/10"
                animate={{ y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Floating Badge 1: AI Recipe Generator (Top Left) */}
            <motion.div
              className="absolute top-4 sm:top-8 -left-2 sm:-left-8 lg:-left-12 z-20 bg-white dark:bg-slate-800 shadow-xl border border-gray-100 dark:border-slate-700/60 rounded-2xl p-2.5 px-3.5 flex items-center gap-3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0, y: [-4, 4, -4], scale: [1, 1.02, 1] }}
              transition={{
                opacity: { delay: 0.6, duration: 0.5 },
                x: { delay: 0.6, duration: 0.5, ease: "easeOut" },
                y: { repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1.1 },
                scale: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1.1 }
              }}
            >
              <div className="w-9 h-9 rounded-full bg-orange-100 dark:bg-orange-950/60 flex items-center justify-center text-orange-500">
                <Sparkles size={18} />
              </div>
              <div className="text-left">
                <p className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-white leading-tight">
                  AI Recipe<br />Generator
                </p>
              </div>
            </motion.div>

            {/* Floating Badge 2: Nutrition Analyzer (Bottom Left) */}
            <motion.div
              className="absolute bottom-12 sm:bottom-16 -left-2 sm:-left-6 lg:-left-10 z-20 bg-white dark:bg-slate-800 shadow-xl border border-gray-100 dark:border-slate-700/60 rounded-2xl p-2.5 px-3.5 flex items-center gap-3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0, y: [4, -4, 4] }}
              transition={{
                opacity: { delay: 0.8, duration: 0.5 },
                x: { delay: 0.8, duration: 0.5, ease: "easeOut" },
                y: { repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 1.3 }
              }}
            >
              <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600">
                <Activity size={18} />
              </div>
              <div className="text-left">
                <p className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-white leading-tight">
                  Nutrition<br />Analyzer
                </p>
              </div>
            </motion.div>

            {/* ✨ NEW: Health Consultant Interactive Floating Card (Middle Right / Bottom Right) */}
            <motion.div
              className="absolute -bottom-6 sm:-bottom-8 right-2 sm:right-4 lg:-right-8 z-30 max-w-[240px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: [0, -6, 0] }}
              transition={{
                opacity: { delay: 0.9, duration: 0.5 },
                y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1.5 }
              }}
            >
              <Link
                href="/dashboard/users/health-consultant"
                className="block bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-2xl border-2 border-emerald-500/40 hover:border-emerald-500 rounded-2xl p-3.5 transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-200 to-[#2F8F46] flex items-center justify-center text-white shadow-md shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                    <FaUserAlt size={16} />
                  </div>
                  <div>
                    <span className="inline-block px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[12px] font-extrabold uppercase tracking-wider">
                      PRO FEATURE
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                      AI Health Consultant
                    </h4>
                  </div>
                </div>
                <p className="text-[12px] text-slate-500 dark:text-slate-400 mb-2 leading-relaxed">
                  Get custom meal plans & track diet instantly.
                </p>
                <div className="flex items-center justify-between text-[12px] font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                  <span>Consult Now</span>
                  <ArrowRight size={12} />
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
function FeatureIcon({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 max-w-[70px] cursor-pointer group"
      whileHover={{ scale: 1.08 }}
    >
      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/70 transition-colors border border-emerald-100 dark:border-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
        {icon}
      </div>
      <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400 text-center leading-tight">
        {label}
      </span>
    </motion.div>
  );
}
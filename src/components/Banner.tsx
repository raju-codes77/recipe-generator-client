"use client";

import { ArrowRight, Sparkles, Activity, Utensils, Users, Sunrise, Flame } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";

// ---------------------------------------------------------------------------
// Design direction (see notes at bottom of file for the full rationale):
// A cookbook / corkboard vernacular instead of a generic SaaS hero.
// Deep basil green stage, a torn "recipe card" headline treatment,
// a Polaroid-style pinned photo, and washi-tape + wax-seal style badges
// instead of identical rounded cards. Colors: basil, cream, saffron, paprika.
// ---------------------------------------------------------------------------

export default function Banner() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, duration: 0.6 } },
  };

  return (
    <section className="mt-23 w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <div
        className="relative overflow-hidden rounded-[2rem] lg:rounded-[2.75rem] bg-[#183523] px-6 sm:px-10 lg:px-14 py-14 lg:py-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(251,244,230,0.07) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      >
        {/* Warm glow, kept to one corner so it reads as light, not decoration */}
        <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-[#E7A33D]/20 blur-[110px] pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          {/* Left column */}
          <motion.div
            className="lg:col-span-6 flex flex-col items-start text-left"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {/* Washi-tape label instead of an all-caps eyebrow */}
            <motion.div
              variants={itemVariants}
              className="-rotate-2 bg-[#FBF4E6]/90 text-[#183523] text-xs sm:text-sm font-semibold px-4 py-1.5 mb-7 shadow-sm"
              style={{ clipPath: "polygon(3% 0, 100% 0, 97% 100%, 0 100%)" }}
            >
              Your AI kitchen companion
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-serif text-4xl sm:text-6xl lg:text-[4.4rem] font-semibold text-[#FBF4E6] tracking-tight leading-[1.05] mb-6"
            >
              Cook by what&rsquo;s
              <br />
              in the fridge,
              <br />
              not the plan.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-[#D9CFBC] text-base sm:text-lg max-w-md leading-relaxed mb-9"
            >
              Snap your pantry, get a recipe that actually fits it, and see
              the nutrition before you take a bite. A community of cooks
              swaps notes on all of it.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-12">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#D2491D] hover:bg-[#B93E15] text-[#FBF4E6] px-7 py-3.5 rounded-full font-semibold text-sm sm:text-base shadow-lg shadow-[#D2491D]/25 flex items-center gap-2 group transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7A33D]"
              >
                <span>Start cooking</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-transparent border-2 border-[#FBF4E6]/40 hover:border-[#FBF4E6] text-[#FBF4E6] px-7 py-3.5 rounded-full font-semibold text-sm sm:text-base flex items-center gap-2 group transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7A33D]"
              >
                <span>See the recipes</span>
              </motion.button>
            </motion.div>

            {/* Feature row styled like cut-lines on a magazine recipe card */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-start gap-x-7 gap-y-6 pt-7 border-t border-dashed border-[#FBF4E6]/25 w-full"
            >
              <FeatureStamp icon={<Utensils size={16} />} label="Pantry to plate" />
              <FeatureStamp icon={<Activity size={16} />} label="AI nutrition" />
              <FeatureStamp icon={<Users size={16} />} label="Community recipes" />
              <FeatureStamp icon={<Sunrise size={16} />} label="Daily meal plan" />
              <FeatureStamp icon={<Flame size={16} />} label="Cooking challenges" />
            </motion.div>
          </motion.div>

          {/* Right column: pinned photo + badges */}
          <div className="lg:col-span-6 relative flex justify-center items-center py-6">
            <div className="relative w-full max-w-[480px] aspect-[4/5] flex items-center justify-center">
              {/* Pushpin */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-30 w-3 h-3 rounded-full bg-[#E7A33D] shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />

              {/* Polaroid-style pinned photo */}
              <motion.div
                className="absolute inset-0 bg-[#FBF4E6] rounded-sm p-3 pb-10 shadow-2xl shadow-black/30 -rotate-2"
                initial={{ opacity: 0, y: 20, rotate: -6 }}
                animate={{ opacity: 1, y: [0, -6, 0], rotate: -2 }}
                transition={{
                  opacity: { duration: 0.6 },
                  rotate: { duration: 0.6 },
                  y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.6 },
                }}
              >
                <div className="w-full h-full overflow-hidden rounded-[2px]">
                  <img
                    src="/hero2.png"
                    alt="Healthy chicken avocado bowl"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Washi-tape badge: AI Recipe Generator */}
              <motion.div
                className="absolute top-6 -left-4 sm:-left-10 z-20 rotate-[-4deg] bg-[#E7A33D] text-[#201811] px-4 py-2.5 flex items-center gap-2 shadow-lg"
                style={{ clipPath: "polygon(4% 0, 100% 0, 96% 100%, 0 100%)" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Sparkles size={16} />
                <span className="text-xs font-semibold leading-tight">
                  AI Recipe
                  <br />
                  Generator
                </span>
              </motion.div>

              {/* Wax-seal style badge: Nutrition Analyzer */}
              <motion.div
                className="absolute bottom-16 -left-5 sm:-left-9 z-20 w-[92px] h-[92px] rounded-full bg-[#183523] border-[3px] border-[#FBF4E6]/80 flex flex-col items-center justify-center text-[#FBF4E6] shadow-xl rotate-[6deg]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.65, duration: 0.5 }}
              >
                <Activity size={16} />
                <span className="text-[10px] font-semibold text-center leading-tight mt-1 px-2">
                  Nutrition
                  <br />
                  Analyzer
                </span>
              </motion.div>

              {/* Pinned note: AI Health Consultant */}
              <motion.div
                className="absolute -bottom-8 right-0 sm:-right-6 z-30 max-w-[230px] rotate-[3deg]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Link
                  href="/dashboard/users/example"
                  className="block bg-[#FBF4E6] shadow-2xl rounded-sm p-4 transition-transform hover:-translate-y-0.5 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D2491D]"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#183523] flex items-center justify-center text-[#FBF4E6] shadow-sm group-hover:scale-105 transition-transform shrink-0">
                      <FaUserAlt size={13} />
                    </div>
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded-sm bg-[#D2491D]/10 text-[#D2491D] text-[10px] font-semibold">
                        Pro feature
                      </span>
                      <h4 className="text-xs font-semibold text-[#201811] leading-tight">
                        AI Health Consultant
                      </h4>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#5B5346] mb-2 leading-relaxed">
                    Custom meal plans, built around what you already eat.
                  </p>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#D2491D] group-hover:translate-x-0.5 transition-transform">
                    <span>Consult now</span>
                    <ArrowRight size={11} />
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureStamp({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2.5 cursor-pointer group">
      <div className="w-8 h-8 rounded-full border border-dashed border-[#FBF4E6]/40 group-hover:border-[#E7A33D] group-hover:text-[#E7A33D] flex items-center justify-center text-[#D9CFBC] transition-colors">
        {icon}
      </div>
      <span className="text-xs font-medium text-[#D9CFBC] group-hover:text-[#FBF4E6] transition-colors">
        {label}
      </span>
    </div>
  );
}
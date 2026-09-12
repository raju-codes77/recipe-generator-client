"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft, ChevronRight, ArrowRight, Refrigerator, Calendar, 
  Activity, Smile, ShoppingBasket, TrendingUp, Check, Leaf, DollarSign,
  Search, Bell, User, Star, Flame, Droplets, HeartPulse
} from "lucide-react";

// ─── Slide Data ────────────────────────────────────────────────────────────────
const SLIDES = [
  {
    id: 0,
    badge: "Cook Smarter. Eat Healthier.",
    headline: ["Good Food.", "Better You."],
    headlineHighlight: -1,
    sub: "FoodCanvas is your AI-powered culinary companion — turning ingredients, budgets, and goals into perfectly crafted meals.",
    ctaPrimary: { label: "Start Cooking Free", href: "/ai-tools" },
    ctaSecondary: { label: "Explore Features", href: "/recipes" },
    accentColor: "emerald",
    bgImage: "/hero1.png",
    bgPos: "center right",
  },
  {
    id: 1,
    badge: "Good Food. Better You.",
    headline: ["Your Personal", "AI Food Assistant", "for a Healthier Life"],
    headlineHighlight: 1,
    sub: "From what's in your pantry to what's on your plate — FoodCanvas helps you plan, cook, track and enjoy better meals, every day.",
    ctaPrimary: { label: "Start For Free", href: "/ai-tools" },
    ctaSecondary: { label: "Explore Features", href: "/recipes" },
    accentColor: "emerald",
    bgImage: "/hero2.png",
    bgPos: "center right",
  },
  {
    id: 2,
    badge: "The FoodCanvas Experience",
    headline: ["Your Complete", "Culinary AI Assistant."],
    headlineHighlight: 1,
    sub: "From ingredient rescue to nutrition tracking, access all our intelligent tools in one seamless interface.",
    ctaPrimary: { label: "Get Started Free", href: "/ai-tools" },
    ctaSecondary: { label: "Explore Features", href: "/dashboard/users" },
    accentColor: "emerald",
    bgImage: "/hero3.png",
    bgPos: "right center",
  },
  {
    id: 3,
    badge: "Good Food. Better You.",
    headline: ["Cook Smarter.", "Eat Healthier.", "With FoodCanvas."],
    headlineHighlight: -1,
    sub: "Your personal AI-powered food assistant. Plan, cook, track and enjoy better meals — every day.",
    ctaPrimary: { label: "Start Cooking →", href: "/ai-tools" },
    ctaSecondary: { label: "Explore Features", href: "/recipes" },
    accentColor: "emerald",
    bgImage: "/hero4.png",
    bgPos: "center",
  },
  {
    id: 4,
    badge: "AI Ingredient Rescue",
    headline: ["Turn Pantry & Leftovers", "Into Gourmet Meals."],
    headlineHighlight: -1,
    sub: "Stop food waste. FoodCanvas turns your available ingredients into satisfying, zero-waste recipes.",
    ctaPrimary: { label: "Rescue Ingredients", href: "/ai-tools/ingredient-rescue" },
    ctaSecondary: { label: "View Dashboard", href: "/dashboard/users" },
    accentColor: "teal",
    bgImage: "/hero5.png",
    bgPos: "center right",
  }
];

// ─── Floating Card wrapper ─────────────────────────────────────────────────────
function FloatingCard({
  children, delay, offsetX, offsetY, floatDir = "down", className = "", zIndex = "z-20"
}: {
  children: React.ReactNode;
  delay: number;
  offsetX: string;
  offsetY: string;
  floatDir?: "up" | "down" | "none";
  className?: string;
  zIndex?: string;
}) {
  return (
    <motion.div
      className={`absolute ${offsetX} ${offsetY} ${zIndex} bg-white/90 dark:bg-slate-800/95 backdrop-blur-md shadow-xl border border-white/40 dark:border-slate-600/70 rounded-2xl p-4 pointer-events-auto ${className}`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        y: floatDir === "none" ? 0 : (floatDir === "down" ? [-4, 4, -4] : [4, -4, 4]),
        scale: 1
      }}
      transition={{
        opacity: { delay, duration: 0.6 },
        scale: { delay, duration: 0.6 },
        y: floatDir === "none" ? { delay, duration: 0.6 } : { repeat: Infinity, duration: 6, ease: "easeInOut", delay: delay + 0.6 },
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── SVG Radar Chart for Slide 2 ───────────────────────────────────────────────
function RadarChart() {
  return (
    <div className="w-24 h-24 relative mx-auto my-3">
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        {/* Web structure */}
        {[20, 40, 60, 80].map(r => (
          <polygon key={r} points={`50,${50-r} ${50+r*0.95},${50-r*0.31} ${50+r*0.59},${50+r*0.81} ${50-r*0.59},${50+r*0.81} ${50-r*0.95},${50-r*0.31}`} fill="none" stroke="currentColor" className="text-stone-200 dark:text-slate-700" strokeWidth="0.5" />
        ))}
        {/* Axes */}
        <line x1="50" y1="50" x2="50" y2="10" stroke="currentColor" className="text-stone-200 dark:text-slate-700" strokeWidth="0.5" />
        <line x1="50" y1="50" x2="88" y2="38" stroke="currentColor" className="text-stone-200 dark:text-slate-700" strokeWidth="0.5" />
        <line x1="50" y1="50" x2="74" y2="82" stroke="currentColor" className="text-stone-200 dark:text-slate-700" strokeWidth="0.5" />
        <line x1="50" y1="50" x2="26" y2="82" stroke="currentColor" className="text-stone-200 dark:text-slate-700" strokeWidth="0.5" />
        <line x1="50" y1="50" x2="12" y2="38" stroke="currentColor" className="text-stone-200 dark:text-slate-700" strokeWidth="0.5" />
        {/* Data area */}
        <polygon points="50,15 80,45 65,75 30,70 20,35" fill="rgba(244, 63, 94, 0.2)" stroke="#f43f5e" strokeWidth="1.5" />
        {/* Data points */}
        <circle cx="50" cy="15" r="2" fill="#f43f5e" />
        <circle cx="80" cy="45" r="2" fill="#f43f5e" />
        <circle cx="65" cy="75" r="2" fill="#f43f5e" />
        <circle cx="30" cy="70" r="2" fill="#f43f5e" />
        <circle cx="20" cy="35" r="2" fill="#f43f5e" />
      </svg>
    </div>
  );
}

// ─── Feature Visuals (Floating Cards Only) ───────────────────────────────────

// ── Small feature card for Slide 0
function Slide0FeatureCard({ icon, iconBg, title, desc, delay, offsetX, offsetY, floatDir = "down", href = "/ai-tools" }: {
  icon: React.ReactNode; iconBg: string; title: string; desc: string;
  delay: number; offsetX: string; offsetY: string; floatDir?: "up" | "down" | "none"; href?: string;
}) {
  return (
    <FloatingCard delay={delay} offsetX={offsetX} offsetY={offsetY} floatDir={floatDir} className="w-[200px] xl:w-[215px]">
      <Link href={href} className="flex items-start gap-3 group">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${iconBg}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-bold text-stone-900 dark:text-white leading-tight mb-0.5 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">{title}</p>
          <p className="text-[10px] text-stone-500 dark:text-slate-300 leading-snug">{desc}</p>
        </div>
        <ChevronRight size={14} className="text-stone-300 dark:text-slate-600 shrink-0 mt-0.5 group-hover:text-emerald-600 transition-colors" />
      </Link>
    </FloatingCard>
  );
}

function Slide0Visual() { // hero1.png - "Good Food. Better You."
  return (
    <div className="relative w-full h-[240px] sm:h-[280px] md:h-[360px] lg:h-[450px] xl:h-full flex items-center justify-center pointer-events-none overflow-hidden xl:overflow-visible">
      <div className="relative w-[700px] h-[600px] xl:w-full xl:h-full scale-[0.4] sm:scale-[0.47] md:scale-[0.6] lg:scale-[0.75] xl:scale-100 origin-center xl:origin-right flex items-center justify-center flex-shrink-0">

      {/* ── Large Central Recipe Card ── */}
      <FloatingCard
        delay={0.3}
        offsetX="right-[22%] 2xl:right-[27%]"
        offsetY="top-[14%]"
        floatDir="down"
        className="w-[230px] p-0 overflow-hidden shadow-2xl"
        zIndex="z-20"
      >
        {/* Card food image */}
        <div className="relative h-[110px] bg-stone-100 dark:bg-slate-700 overflow-hidden">
          <img src="/hero1.png" alt="Meal" className="w-full h-full object-cover" style={{ objectPosition: 'center top' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-2 left-3">
            <span className="text-[9px] font-bold text-white/90 bg-emerald-600/90 px-2 py-0.5 rounded-full">Healthy</span>
          </div>
          <div className="absolute top-2 right-2 bg-white/90 dark:bg-slate-800/95 backdrop-blur-sm px-1.5 py-0.5 rounded-full flex items-center gap-1">
            <Star size={9} className="text-amber-400 fill-amber-400" />
            <span className="text-[9px] font-bold text-stone-800 dark:text-white">4.9</span>
          </div>
        </div>

        {/* Card content */}
        <div className="px-4 py-3">
          <h3 className="text-[13px] font-black text-stone-900 dark:text-white leading-snug mb-0.5">Grilled Chicken Buddha Bowl</h3>
          <p className="text-[10px] text-stone-500 mb-3">High-protein · 480 kcal · 25 min</p>

          {/* Nutrition row */}
          <div className="flex gap-1.5 mb-3">
            <div className="flex-1 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg p-1.5 text-center">
              <p className="text-[9px] text-stone-400">Protein</p>
              <p className="text-[11px] font-black text-emerald-700 dark:text-emerald-400">42g</p>
            </div>
            <div className="flex-1 bg-amber-50 dark:bg-amber-500/10 rounded-lg p-1.5 text-center">
              <p className="text-[9px] text-stone-400">Carbs</p>
              <p className="text-[11px] font-black text-amber-600">38g</p>
            </div>
            <div className="flex-1 bg-rose-50 dark:bg-rose-500/10 rounded-lg p-1.5 text-center">
              <p className="text-[9px] text-stone-400">Fat</p>
              <p className="text-[11px] font-black text-rose-500">14g</p>
            </div>
          </div>

          {/* Health score */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <HeartPulse size={12} className="text-emerald-600" />
              <span className="text-[10px] font-bold text-stone-700 dark:text-slate-200">Health Score</span>
            </div>
            <span className="text-[11px] font-black text-emerald-600">96/100</span>
          </div>
          <div className="h-1.5 w-full bg-stone-100 dark:bg-slate-700 rounded-full overflow-hidden mb-4">
            <div className="h-full w-[96%] bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" />
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold py-2 rounded-xl transition-colors pointer-events-auto shadow-sm">
              Cook Now
            </button>
            <button className="flex-1 border border-stone-200 dark:border-slate-600 hover:border-emerald-400 text-stone-700 dark:text-slate-200 text-[11px] font-bold py-2 rounded-xl transition-colors pointer-events-auto">
              Save Recipe
            </button>
          </div>
        </div>
      </FloatingCard>

      {/* ── 4 Small Feature Cards ── */}
      {/* Top-left feature */}
      <Slide0FeatureCard
        icon={<Leaf size={16} className="text-white" />}
        iconBg="bg-emerald-600"
        title="AI Ingredient Rescue"
        desc="Turn your pantry & leftovers into delicious meals."
        delay={0.5} offsetX="right-[41%] 2xl:right-[47%]" offsetY="top-[12%]"
        floatDir="up"
        href="/ai-tools/ingredient-rescue"
      />
      {/* Top-right feature */}
      <Slide0FeatureCard
        icon={<Calendar size={16} className="text-white" />}
        iconBg="bg-indigo-600"
        title="AI Meal Planner"
        desc="Plan your weekly meals with your budget."
        delay={0.65} offsetX="right-[6%] 2xl:right-[8%]" offsetY="top-[12%]"
        floatDir="down"
        href="/ai-tools/meal-planner"
      />
      {/* Bottom-left feature */}
      <Slide0FeatureCard
        icon={<Activity size={16} className="text-white" />}
        iconBg="bg-orange-500"
        title="Nutrition & Meal Tracker"
        desc="Track your nutrition, reach your goals."
        delay={0.8} offsetX="right-[41%] 2xl:right-[47%]" offsetY="bottom-[12%]"
        floatDir="up"
        href="/ai-tools/meal-tracker"
      />
      {/* Bottom-right feature */}
      <Slide0FeatureCard
        icon={<ShoppingBasket size={16} className="text-white" />}
        iconBg="bg-teal-600"
        title="Smart Shopping List"
        desc="Get everything you need, within your budget."
        delay={0.95} offsetX="right-[6%] 2xl:right-[8%]" offsetY="bottom-[12%]"
        floatDir="down"
        href="/ai-tools/shopping-list"
      />
      </div>
    </div>
  );
}

// ─── Slide 1 small card reusing the same design language as Slide0FeatureCard
function Slide1FeatureCard({ icon, iconBg, title, desc, delay, offsetX, offsetY, floatDir = "down", className = "", href = "/ai-tools" }: {
  icon: React.ReactNode; iconBg: string; title: string; desc: string;
  delay: number; offsetX: string; offsetY: string; floatDir?: "up" | "down" | "none"; className?: string; href?: string;
}) {
  return (
    <FloatingCard delay={delay} offsetX={offsetX} offsetY={offsetY} floatDir={floatDir} className={`w-[185px] xl:w-[200px] ${className}`}>
      <Link href={href} className="flex items-start gap-3 group">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${iconBg}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold text-stone-900 dark:text-white leading-tight mb-0.5 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">{title}</p>
          <p className="text-[10px] text-stone-500 dark:text-slate-300 leading-snug">{desc}</p>
        </div>
        <ChevronRight size={13} className="text-stone-300 dark:text-slate-600 shrink-0 mt-0.5 group-hover:text-emerald-600 transition-colors" />
      </Link>
    </FloatingCard>
  );
}

function Slide1Visual() { // hero2.png — "Your Personal AI Food Assistant"
  const weekMeals = [
    { day: "Mon", meal: "Herb Chicken Bowl", cost: "$4.50" },
    { day: "Tue", meal: "Veggie Pasta",       cost: "$3.20" },
    { day: "Wed", meal: "Lemon Salmon",       cost: "$6.80" },
  ];

  return (
    // We render on xl+ only; within the 6-col right grid space we create a self-contained
    // composition using a single relative container with known width, so all cards are
    // positioned relative to THAT container, not the whole viewport.
    <div className="relative w-full h-[240px] sm:h-[280px] md:h-[360px] lg:h-[450px] xl:h-full pointer-events-none flex items-center justify-center xl:justify-end pr-0 xl:pr-4 2xl:pr-8 overflow-hidden xl:overflow-visible">
      <div className="relative w-[560px] xl:w-[600px] 2xl:w-[640px] h-[600px] xl:h-full flex items-center justify-center scale-[0.4] sm:scale-[0.47] md:scale-[0.6] lg:scale-[0.75] xl:scale-100 origin-center xl:origin-right flex-shrink-0">

        {/* ────── Central Phone Card ────── */}
        <motion.div
          className="relative z-20 w-[220px] bg-white dark:bg-slate-700 rounded-[28px] shadow-2xl border-2 border-stone-200/50 dark:border-slate-600/60 overflow-hidden flex flex-col pointer-events-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{ opacity: { delay: 0.25, duration: 0.6 }, y: { delay: 0.8, duration: 5, repeat: Infinity, ease: "easeInOut" } }}
        >
          {/* App header */}
          <div className="px-4 pt-3 pb-2 bg-white dark:bg-slate-700 flex justify-between items-center border-b border-stone-100 dark:border-slate-800">
            <div className="flex flex-col">
              <span className="text-[8px] text-stone-400 font-medium">Good Morning 👋</span>
              <span className="text-[13px] font-black text-stone-800 dark:text-white leading-tight">FoodCanvas</span>
            </div>
            <div className="flex items-center gap-2">
              <Bell size={13} className="text-stone-400" />
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-[11px]">A</div>
            </div>
          </div>

          {/* Search */}
          <div className="px-3 py-2 bg-stone-50 dark:bg-slate-900">
            <div className="relative">
              <input readOnly placeholder="Search recipes, ingredients…"
                className="w-full bg-white dark:bg-slate-700 border border-stone-200 dark:border-slate-600 rounded-xl py-2 pl-7 pr-3 text-[10px] shadow-sm pointer-events-none placeholder-stone-400" />
              <Search size={10} className="absolute left-2.5 top-[9px] text-stone-400" />
            </div>
          </div>

          {/* Feature 2×2 tiles */}
          <div className="px-3 pt-1 pb-2 grid grid-cols-2 gap-1.5 bg-stone-50 dark:bg-slate-900">
            <div className="bg-emerald-600 rounded-xl p-2.5 text-white shadow-sm">
              <Refrigerator size={13} className="mb-1 opacity-90" />
              <p className="text-[9px] font-bold leading-snug">Ingredient Rescue</p>
            </div>
            <div className="bg-white dark:bg-slate-700 rounded-xl p-2.5 border border-stone-200 dark:border-slate-600 shadow-sm">
              <Calendar size={13} className="mb-1 text-indigo-500" />
              <p className="text-[9px] font-bold text-stone-700 dark:text-slate-200 leading-snug">Meal Planner</p>
            </div>
            <div className="bg-white dark:bg-slate-700 rounded-xl p-2.5 border border-stone-200 dark:border-slate-600 shadow-sm">
              <ShoppingBasket size={13} className="mb-1 text-teal-600" />
              <p className="text-[9px] font-bold text-stone-700 dark:text-slate-200 leading-snug">Smart List</p>
            </div>
            <div className="bg-white dark:bg-slate-700 rounded-xl p-2.5 border border-stone-200 dark:border-slate-600 shadow-sm">
              <Activity size={13} className="mb-1 text-orange-500" />
              <p className="text-[9px] font-bold text-stone-700 dark:text-slate-200 leading-snug">Nutrition</p>
            </div>
          </div>

          {/* Today's nutrition card */}
          <div className="px-3 pb-3 bg-stone-50 dark:bg-slate-900">
            <div className="bg-white dark:bg-slate-700 rounded-xl p-2.5 border border-stone-100 dark:border-slate-600 shadow-sm">
              <div className="flex justify-between items-center mb-1.5">
                <p className="text-[10px] font-bold text-stone-800 dark:text-white">Today's Nutrition</p>
                <span className="text-[8px] text-orange-500 font-bold bg-orange-50 dark:bg-orange-900/20 px-1.5 py-0.5 rounded-full">1,450 kcal</span>
              </div>
              <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-stone-100 dark:bg-slate-700 mb-1">
                <div className="w-[45%] bg-rose-400" /><div className="w-[35%] bg-amber-400" /><div className="w-[20%] bg-emerald-400" />
              </div>
              <div className="flex justify-between text-[8px] text-stone-400 mb-2">
                <span>Carbs 45%</span><span>Protein 35%</span><span>Fat 20%</span>
              </div>
              {/* Mini meal row */}
              <div className="flex items-center gap-2 pt-2 border-t border-stone-100 dark:border-slate-700">
                <div className="w-7 h-7 rounded-lg overflow-hidden bg-stone-200 dark:bg-slate-700 shrink-0">
                  <img src="/hero2.png" alt="Meal" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-bold text-stone-800 dark:text-white truncate">Grilled Chicken Bowl</p>
                  <p className="text-[8px] text-emerald-600 font-medium">480 kcal · Healthy</p>
                </div>
                <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <Check size={8} className="text-emerald-700" strokeWidth={3} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ────── Weekly Plan Card — top-left of phone ────── */}
        <motion.div
          className="absolute left-[10px] top-[8%] z-30 w-[175px] bg-white/92 dark:bg-slate-800/95 backdrop-blur-md shadow-xl border border-stone-200/60 dark:border-slate-600/70 rounded-2xl p-3 pointer-events-auto"
          initial={{ opacity: 0, x: -16, y: 12 }}
          animate={{ opacity: 1, x: 0, y: [0, -5, 0] }}
          transition={{ opacity: { delay: 0.5, duration: 0.6 }, x: { delay: 0.5, duration: 0.5 }, y: { delay: 1.0, duration: 5.5, repeat: Infinity, ease: "easeInOut" } }}
        >
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-stone-100 dark:border-slate-800">
            <div className="w-6 h-6 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-sm shrink-0">
              <Calendar size={12} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-stone-900 dark:text-white leading-none">Weekly Plan</p>
              <p className="text-[9px] text-stone-400">Budget: $38</p>
            </div>
          </div>
          <div className="space-y-1.5">
            {weekMeals.map((m, i) => (
              <div key={i} className="flex items-center gap-1 text-[9px]">
                <span className="text-stone-400 font-semibold w-6">{m.day}</span>
                <span className="text-stone-700 dark:text-slate-200 font-semibold flex-1 truncate">{m.meal}</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-1 py-0.5 rounded text-[8px] shrink-0">{m.cost}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ────── AI Ingredient Rescue — left, upper-mid ────── */}
        <motion.div
          className="absolute left-[0px] top-[38%] z-30 w-[180px] bg-white/92 dark:bg-slate-800/95 backdrop-blur-md shadow-xl border border-stone-200/60 dark:border-slate-600/70 rounded-2xl p-3 pointer-events-auto"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0, y: [0, 5, 0] }}
          transition={{ opacity: { delay: 0.65, duration: 0.6 }, x: { delay: 0.65, duration: 0.5 }, y: { delay: 1.1, duration: 6, repeat: Infinity, ease: "easeInOut" } }}
        >
          <Link href="/ai-tools/ingredient-rescue" className="flex items-start gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shrink-0">
              <Refrigerator size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-stone-900 dark:text-white leading-tight mb-0.5 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">AI Ingredient Rescue</p>
              <p className="text-[10px] text-stone-500 dark:text-slate-300 leading-snug">Turn pantry & leftovers into delicious meals.</p>
            </div>
            <ChevronRight size={12} className="text-stone-300 dark:text-slate-600 shrink-0 mt-0.5 group-hover:text-emerald-600 transition-colors" />
          </Link>
        </motion.div>

        {/* ────── Smart Shopping List — left, lower ────── */}
        <motion.div
          className="absolute left-[12px] bottom-[16%] z-30 w-[180px] bg-white/92 dark:bg-slate-800/95 backdrop-blur-md shadow-xl border border-stone-200/60 dark:border-slate-600/70 rounded-2xl p-3 pointer-events-auto"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0, y: [0, -5, 0] }}
          transition={{ opacity: { delay: 0.8, duration: 0.6 }, x: { delay: 0.8, duration: 0.5 }, y: { delay: 1.2, duration: 5.5, repeat: Infinity, ease: "easeInOut" } }}
        >
          <Link href="/ai-tools/shopping-list" className="flex items-start gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm shrink-0">
              <ShoppingBasket size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-stone-900 dark:text-white leading-tight mb-0.5 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">Smart Shopping List</p>
              <p className="text-[10px] text-stone-500 dark:text-slate-300 leading-snug">Get everything you need within your budget.</p>
            </div>
            <ChevronRight size={12} className="text-stone-300 dark:text-slate-600 shrink-0 mt-0.5 group-hover:text-emerald-600 transition-colors" />
          </Link>
        </motion.div>

        {/* ────── AI Meal Planner — right, upper ────── */}
        <motion.div
          className="absolute right-[0px] top-[20%] z-30 w-[175px] bg-white/92 dark:bg-slate-800/95 backdrop-blur-md shadow-xl border border-stone-200/60 dark:border-slate-600/70 rounded-2xl p-3 pointer-events-auto"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0, y: [0, -5, 0] }}
          transition={{ opacity: { delay: 0.7, duration: 0.6 }, x: { delay: 0.7, duration: 0.5 }, y: { delay: 1.15, duration: 6.5, repeat: Infinity, ease: "easeInOut" } }}
        >
          <Link href="/ai-tools/meal-planner" className="flex items-start gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shrink-0">
              <Calendar size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-stone-900 dark:text-white leading-tight mb-0.5 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">AI Meal Planner</p>
              <p className="text-[10px] text-stone-500 dark:text-slate-300 leading-snug">Plan your weekly meals with your budget.</p>
            </div>
            <ChevronRight size={12} className="text-stone-300 dark:text-slate-600 shrink-0 mt-0.5 group-hover:text-emerald-600 transition-colors" />
          </Link>
        </motion.div>

        {/* ────── Nutrition Analyzer — right, lower ────── */}
        <motion.div
          className="absolute right-[8px] bottom-[18%] z-30 w-[175px] bg-white/92 dark:bg-slate-800/95 backdrop-blur-md shadow-xl border border-stone-200/60 dark:border-slate-600/70 rounded-2xl p-3 pointer-events-auto"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0, y: [0, 5, 0] }}
          transition={{ opacity: { delay: 0.9, duration: 0.6 }, x: { delay: 0.9, duration: 0.5 }, y: { delay: 1.3, duration: 5, repeat: Infinity, ease: "easeInOut" } }}
        >
          <Link href="/ai-tools/nutrition-analyzer" className="flex items-start gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-sm shrink-0">
              <Activity size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-stone-900 dark:text-white leading-tight mb-0.5 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">Nutrition Analyzer</p>
              <p className="text-[10px] text-stone-500 dark:text-slate-300 leading-snug">Know what you eat, track your goals.</p>
            </div>
            <ChevronRight size={12} className="text-stone-300 dark:text-slate-600 shrink-0 mt-0.5 group-hover:text-emerald-600 transition-colors" />
          </Link>
        </motion.div>

        {/* ────── Handwritten: "Less Food Waste" ────── */}
        <motion.div
          className="absolute left-[12px] bottom-[40%] pointer-events-none z-10"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <p className="text-emerald-800 dark:text-emerald-400 text-[11px] font-black leading-tight" style={{ fontFamily: "cursive" }}>Less</p>
          <p className="text-emerald-800 dark:text-emerald-400 text-[11px] font-black leading-tight" style={{ fontFamily: "cursive" }}>Food Waste</p>
          <svg width="26" height="14" viewBox="0 0 26 14" fill="none" className="mt-0.5 text-emerald-600 opacity-60">
            <path d="M2 7 C7 2, 19 2, 24 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M20 4.5 L24 7 L20 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </motion.div>

        {/* ────── Handwritten: "Plan · Save · Enjoy" ────── */}
        <motion.div
          className="absolute right-[8px] bottom-[40%] pointer-events-none z-10"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          <p className="text-emerald-700 dark:text-emerald-400 text-[10px] font-black" style={{ fontFamily: "cursive" }}>Plan · Save · Enjoy</p>
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none" className="mt-0.5 text-emerald-500 opacity-60">
            <path d="M2 6 C5 2, 17 2, 20 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M16 3.5 L20 6 L16 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </motion.div>

      </div>{/* end composition container */}
    </div>
  );
}

function Slide2Visual() { // hero3.png - App Interface
  return (
    <div className="relative w-full h-[240px] sm:h-[280px] md:h-[360px] lg:h-[450px] xl:h-full pointer-events-none flex items-center justify-center xl:justify-end pr-0 xl:pr-4 2xl:pr-8 overflow-hidden xl:overflow-visible">
      <div className="relative w-[560px] xl:w-[600px] 2xl:w-[640px] h-[600px] xl:h-full flex items-center justify-center scale-[0.4] sm:scale-[0.47] md:scale-[0.6] lg:scale-[0.75] xl:scale-100 origin-center xl:origin-right flex-shrink-0">

        {/* ────── Central App/Phone UI Component ────── */}
        <motion.div
          className="relative z-20 w-[260px] bg-white dark:bg-slate-700 rounded-[32px] shadow-2xl border-[3px] border-stone-200/50 dark:border-slate-600/60 overflow-hidden flex flex-col pointer-events-auto"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
          transition={{ opacity: { delay: 0.25, duration: 0.6 }, scale: { delay: 0.25, duration: 0.6 }, y: { delay: 0.8, duration: 6, repeat: Infinity, ease: "easeInOut" } }}
        >
          {/* App Header */}
          <div className="px-5 pt-6 pb-4 bg-white dark:bg-slate-700 flex justify-between items-center border-b border-stone-100 dark:border-slate-800">
            <div>
              <p className="text-[10px] text-stone-400 font-medium">Good Morning,</p>
              <p className="text-[14px] font-black text-stone-800 dark:text-white leading-tight">Alex</p>
            </div>
            <div className="flex items-center gap-3">
              <Bell size={15} className="text-stone-400" />
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-sm">
                <User size={14} />
              </div>
            </div>
          </div>
          
          {/* App Content */}
          <div className="p-4 bg-stone-50 dark:bg-slate-900 flex flex-col gap-3 h-full">
            
            {/* Search */}
            <div className="relative">
              <input type="text" readOnly placeholder="What do you want to cook?" className="w-full bg-white dark:bg-slate-700 border border-stone-200 dark:border-slate-600 rounded-xl py-2.5 pl-9 pr-4 text-[11px] shadow-sm pointer-events-none placeholder-stone-400" />
              <Search size={12} className="absolute left-3 top-[10px] text-stone-400" />
            </div>
            
            {/* 2x1 Feature Row */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-emerald-600 rounded-xl p-3 text-white shadow-sm flex flex-col justify-between">
                <Refrigerator size={16} className="mb-2 opacity-90" />
                <p className="text-[10px] font-bold leading-tight">Ingredient Rescue</p>
              </div>
              <div className="bg-white dark:bg-slate-700 rounded-xl p-3 border border-stone-200 dark:border-slate-600 shadow-sm text-stone-700 dark:text-slate-200 flex flex-col justify-between">
                <Calendar size={16} className="mb-2 text-indigo-500" />
                <p className="text-[10px] font-bold leading-tight">Meal Planner</p>
              </div>
            </div>

            {/* Today's Nutrition */}
            <div className="bg-white dark:bg-slate-700 rounded-xl p-3.5 border border-stone-200 dark:border-slate-600 shadow-sm mt-1">
              <div className="flex justify-between items-center mb-2.5">
                <p className="text-[11px] font-bold text-stone-800 dark:text-white">Today's Nutrition</p>
                <span className="text-[9px] text-orange-500 font-bold bg-orange-50 dark:bg-orange-900/20 px-1.5 py-0.5 rounded-full">1,450 kcal</span>
              </div>
              <div className="flex gap-1 h-2 w-full rounded-full overflow-hidden bg-stone-100 dark:bg-slate-700 mb-2">
                <div className="w-[45%] bg-rose-500 rounded-full" />
                <div className="w-[35%] bg-amber-400 rounded-full" />
                <div className="w-[20%] bg-emerald-400 rounded-full" />
              </div>
              <div className="flex justify-between text-[8px] text-stone-400 font-medium">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>Carbs 45%</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>Protein 35%</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>Fat 20%</span>
              </div>
            </div>
            
            {/* Recent Meals (Visual filler) */}
            <div className="bg-white dark:bg-slate-700 rounded-xl p-3 border border-stone-200 dark:border-slate-600 shadow-sm flex items-center gap-3 mt-1">
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                <img src="/hero3.png" alt="Meal" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-stone-800 dark:text-white truncate">Avocado Toast</p>
                <p className="text-[9px] text-stone-400">Breakfast · 320 kcal</p>
              </div>
              <div className="w-6 h-6 rounded-full bg-stone-100 dark:bg-slate-700 flex items-center justify-center">
                <ChevronRight size={12} className="text-stone-400" />
              </div>
            </div>
            
          </div>
        </motion.div>

        {/* ────── Floating Cards ────── */}
        
        {/* Nutrition Tracker - Top Right */}
        <motion.div
          className="absolute right-[12px] top-[18%] z-30 w-[185px] bg-white/92 dark:bg-slate-800/95 backdrop-blur-md shadow-xl border border-stone-200/60 dark:border-slate-600/70 rounded-2xl p-3 pointer-events-auto"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0, y: [0, -5, 0] }}
          transition={{ opacity: { delay: 0.6, duration: 0.6 }, x: { delay: 0.6, duration: 0.5 }, y: { delay: 1.1, duration: 5.5, repeat: Infinity, ease: "easeInOut" } }}
        >
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-sm shrink-0">
              <Activity size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-stone-900 dark:text-white leading-tight mb-0.5">Nutrition Tracker</p>
              <p className="text-[10px] text-stone-500 dark:text-slate-300 leading-snug">Monitor macros and calories easily.</p>
            </div>
          </div>
        </motion.div>

        {/* Smart Shopping List - Bottom Left */}
        <motion.div
          className="absolute left-[12px] bottom-[22%] z-30 w-[185px] bg-white/92 dark:bg-slate-800/95 backdrop-blur-md shadow-xl border border-stone-200/60 dark:border-slate-600/70 rounded-2xl p-3 pointer-events-auto"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0, y: [0, 5, 0] }}
          transition={{ opacity: { delay: 0.75, duration: 0.6 }, x: { delay: 0.75, duration: 0.5 }, y: { delay: 1.25, duration: 6.5, repeat: Infinity, ease: "easeInOut" } }}
        >
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm shrink-0">
              <ShoppingBasket size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-stone-900 dark:text-white leading-tight mb-0.5">Smart Shopping</p>
              <p className="text-[10px] text-stone-500 dark:text-slate-300 leading-snug">Auto-generate grocery lists.</p>
            </div>
          </div>
        </motion.div>

        {/* Weekly Plan Mini Card - Top Left */}
        <motion.div
          className="absolute left-[0px] top-[26%] z-30 w-[160px] bg-white/92 dark:bg-slate-800/95 backdrop-blur-md shadow-xl border border-stone-200/60 dark:border-slate-600/70 rounded-2xl p-2.5 pointer-events-auto"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0, y: [0, -4, 0] }}
          transition={{ opacity: { delay: 0.5, duration: 0.6 }, x: { delay: 0.5, duration: 0.5 }, y: { delay: 0.9, duration: 5, repeat: Infinity, ease: "easeInOut" } }}
        >
          <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-stone-100 dark:border-slate-800">
            <div className="w-6 h-6 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-sm shrink-0">
              <Calendar size={12} />
            </div>
            <p className="text-[11px] font-bold text-stone-900 dark:text-white leading-none">Weekly Plan</p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-[9px]"><span className="text-emerald-500"><Check size={10}/></span><span className="text-stone-600 dark:text-slate-300">Balanced Macros</span></div>
            <div className="flex items-center gap-1.5 text-[9px]"><span className="text-emerald-500"><Check size={10}/></span><span className="text-stone-600 dark:text-slate-300">Under Budget</span></div>
          </div>
        </motion.div>

        {/* ────── Decorative Annotations ────── */}
        <motion.div
          className="absolute right-[12px] bottom-[30%] pointer-events-none z-10"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <p className="text-emerald-800 dark:text-emerald-400 text-[11px] font-black leading-tight" style={{ fontFamily: "cursive" }}>Track Your Goals</p>
          <svg width="24" height="14" viewBox="0 0 24 14" fill="none" className="mt-0.5 text-emerald-600 opacity-60">
            <path d="M2 7 C6 2, 18 2, 22 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M18 4 L22 7 L18 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </motion.div>

      </div>
    </div>
  );
}
function Slide3Visual() { // hero4.png - Flavor Pairing
  return (
    <div className="relative w-full h-[240px] sm:h-[280px] md:h-[360px] lg:h-[450px] xl:h-full pointer-events-none flex items-center justify-center xl:justify-end pr-0 xl:pr-4 2xl:pr-8 overflow-hidden xl:overflow-visible">
      <div className="relative w-[560px] xl:w-[600px] 2xl:w-[640px] h-[600px] xl:h-full flex items-center justify-center scale-[0.4] sm:scale-[0.47] md:scale-[0.6] lg:scale-[0.75] xl:scale-100 origin-center xl:origin-right flex-shrink-0">

        {/* ────── Main Large Card: Flavor Pairing ────── */}
        <motion.div
          className="relative z-30 w-[300px] bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-[32px] shadow-2xl border-[3px] border-stone-100/80 dark:border-slate-600/60 p-6 pointer-events-auto flex flex-col mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -4, 0] }}
          transition={{ opacity: { delay: 0.25, duration: 0.6 }, y: { delay: 0.8, duration: 6, repeat: Infinity, ease: "easeInOut" } }}
        >
          <h3 className="text-[18px] font-black text-stone-900 dark:text-white mb-2 leading-tight">Flavor Pairing</h3>
          <p className="text-[11px] text-stone-500 dark:text-slate-300 mb-6 leading-relaxed">
            Discover Perfect Ingredient and Flavor Combinations. Get AI-powered pairing suggestions to elevate your dishes.
          </p>

          {/* Radar Visualization Area */}
          <div className="relative w-full aspect-square bg-stone-50 dark:bg-slate-900 rounded-2xl mb-5 flex items-center justify-center overflow-hidden border border-stone-100 dark:border-slate-800 shadow-inner">
            
            {/* The Radar SVG */}
            <div className="w-[140px] h-[140px] relative">
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                {/* Background Web */}
                {[25, 50, 75, 100].map((r, i) => (
                  <circle key={i} cx="50" cy="50" r={r/2} fill="none" stroke="currentColor" className="text-stone-200 dark:text-slate-800" strokeWidth="0.5" />
                ))}
                {/* Axes */}
                {[0, 60, 120, 180, 240, 300].map((deg) => (
                  <line key={deg} x1="50" y1="50" x2={50 + 50 * Math.sin(deg * Math.PI / 180)} y2={50 - 50 * Math.cos(deg * Math.PI / 180)} stroke="currentColor" className="text-stone-200 dark:text-slate-800" strokeWidth="0.5" />
                ))}
                
                {/* Purple Shape */}
                <polygon 
                  points="50,15 85,35 75,75 25,85 10,40" 
                  fill="rgba(168, 85, 247, 0.25)" 
                  stroke="#a855f7" 
                  strokeWidth="2" 
                  strokeLinejoin="round" 
                />
                
                {/* Data Points */}
                <circle cx="50" cy="15" r="3" fill="#a855f7" />
                <circle cx="85" cy="35" r="3" fill="#a855f7" />
                <circle cx="75" cy="75" r="3" fill="#a855f7" />
                <circle cx="25" cy="85" r="3" fill="#a855f7" />
                <circle cx="10" cy="40" r="3" fill="#a855f7" />
              </svg>
            </div>
            
            {/* Floating Labels around radar */}
            <span className="absolute top-2 text-[8px] font-bold text-stone-600 dark:text-slate-300">Spicy</span>
            <span className="absolute right-1 top-[35%] text-[8px] font-bold text-stone-600 dark:text-slate-300">Umami</span>
            <span className="absolute right-4 bottom-2 text-[8px] font-bold text-stone-600 dark:text-slate-300">Balsamic</span>
            <span className="absolute left-4 bottom-2 text-[8px] font-bold text-stone-600 dark:text-slate-300">Earthy</span>
            <span className="absolute left-2 top-[35%] text-[8px] font-bold text-stone-600 dark:text-slate-300">Floral</span>
          </div>

          {/* Pairing Suggestions */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-500/10 px-3 py-2 rounded-xl border border-purple-100 dark:border-purple-800/50">
               <span className="w-4 h-4 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 text-[10px] font-bold">1</span>
               <span className="text-[12px] font-bold text-stone-800 dark:text-white">Lemon & Dill</span>
            </div>
            <div className="flex items-center gap-2 bg-stone-50 dark:bg-slate-700 px-3 py-2 rounded-xl">
               <span className="w-4 h-4 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 text-[10px] font-bold">2</span>
               <span className="text-[12px] font-medium text-stone-600 dark:text-slate-300">Chili & Lime</span>
            </div>
            <div className="flex items-center gap-2 bg-stone-50 dark:bg-slate-700 px-3 py-2 rounded-xl">
               <span className="w-4 h-4 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 text-[10px] font-bold">3</span>
               <span className="text-[12px] font-medium text-stone-600 dark:text-slate-300">Basil & Balsamic</span>
            </div>
          </div>
        </motion.div>

        {/* Removed all artificial CSS/SVG blobs to let the natural food photography in hero4.png shine! */}

      </div>
    </div>
  );
}
// Just a quick icon for the button above
function Plus(props: any) {
  return <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
}

function Slide4Visual() { // hero5.png - AI Meal Planner + Smart Matcher
  const weekPlan = [
    { day: "Mon", meal: "Chicken Bowl",  cost: "$120" },
    { day: "Tue", meal: "Veg Pasta",     cost: "$100" },
    { day: "Wed", meal: "Grilled Fish",  cost: "$150" },
  ];

  return (
    <div className="relative w-full h-[240px] sm:h-[280px] md:h-[360px] lg:h-[450px] xl:h-full pointer-events-none flex items-center justify-center xl:justify-end pr-0 xl:pr-4 2xl:pr-8 overflow-hidden xl:overflow-visible">
      <div className="relative w-[560px] xl:w-[600px] 2xl:w-[640px] h-[600px] xl:h-full flex items-center justify-center scale-[0.4] sm:scale-[0.47] md:scale-[0.6] lg:scale-[0.75] xl:scale-100 origin-center xl:origin-right flex-shrink-0">

        {/* ── Card 1: AI Meal Planner (top-left of composition) ── */}
        <motion.div
          className="absolute left-[10px] top-[8%] z-30 w-[230px] bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl shadow-2xl border border-stone-100 dark:border-slate-600/70 p-4 pointer-events-auto"
          initial={{ opacity: 0, x: -20, y: -10 }}
          animate={{ opacity: 1, x: 0, y: [0, -5, 0] }}
          transition={{ opacity: { delay: 0.3, duration: 0.6 }, x: { delay: 0.3, duration: 0.5 }, y: { delay: 1.0, duration: 5.5, repeat: Infinity, ease: "easeInOut" } }}
        >
          <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-stone-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shrink-0">
              <Calendar size={14} />
            </div>
            <div>
              <p className="text-[13px] font-black text-stone-900 dark:text-white leading-none">AI Meal Planner</p>
              <p className="text-[9px] text-stone-400 mt-0.5">Plan weekly meals with your budget.</p>
            </div>
          </div>
          <div className="space-y-2 mb-3">
            {weekPlan.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={["w-5 h-5 rounded-md flex items-center justify-center shrink-0 text-white text-[9px] font-bold", i === 0 ? "bg-emerald-600" : "bg-stone-200 dark:bg-slate-700"].join(" ")}>
                  {i === 0 ? <Check size={10} /> : <span className="text-stone-500 dark:text-slate-300">{i+1}</span>}
                </div>
                <span className="flex-1 text-[10px] font-semibold text-stone-700 dark:text-slate-200 truncate">{item.meal}</span>
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded-lg shrink-0">{item.cost}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between bg-stone-50 dark:bg-slate-700 rounded-xl px-3 py-2">
            <span className="text-[10px] text-stone-500 dark:text-slate-300">Weekly budget</span>
            <span className="text-[11px] font-black text-emerald-700 dark:text-emerald-400">$370 / $400</span>
          </div>
        </motion.div>

        {/* ── Card 2: Smart Meal Matcher (center-right) ── */}
        <motion.div
          className="absolute right-[12px] top-[35%] z-30 w-[220px] bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl shadow-2xl border border-stone-100 dark:border-slate-600/70 p-4 pointer-events-auto"
          initial={{ opacity: 0, x: 20, y: 10 }}
          animate={{ opacity: 1, x: 0, y: [0, 5, 0] }}
          transition={{ opacity: { delay: 0.55, duration: 0.6 }, x: { delay: 0.55, duration: 0.5 }, y: { delay: 1.2, duration: 6, repeat: Infinity, ease: "easeInOut" } }}
        >
          <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center overflow-hidden shadow-sm bg-gradient-to-br from-emerald-500 via-indigo-500 to-amber-400">
            <Smile size={18} className="text-white" />
          </div>
          <p className="text-[13px] font-black text-stone-900 dark:text-white leading-tight mb-1">Smart Meal Matcher</p>
          <p className="text-[10px] text-stone-400 dark:text-slate-300 leading-snug mb-4">Based on your profile, you might like:</p>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl px-3 py-2.5 mb-3 border border-emerald-100 dark:border-emerald-800/40">
            <p className="text-[11px] font-bold text-stone-800 dark:text-white leading-snug">Spicy Lentil Soup.</p>
            <p className="text-[9px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">98% match · 420 kcal</p>
          </div>
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold py-2.5 rounded-xl transition-colors pointer-events-auto shadow-sm">
            View Full Plan
          </button>
        </motion.div>

        {/* ── Decorative leaf: top-left ── */}
        <motion.div
          className="absolute left-[5%] top-[5%] z-20 pointer-events-none"
          initial={{ opacity: 0, rotate: -15 }}
          animate={{ opacity: 1, rotate: [-15, -10, -15], y: [0, 6, 0] }}
          transition={{ opacity: { delay: 0.7, duration: 0.5 }, y: { delay: 1.1, duration: 7, repeat: Infinity, ease: "easeInOut" }, rotate: { delay: 1.1, duration: 9, repeat: Infinity, ease: "easeInOut" } }}
        >
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" className="text-green-700 drop-shadow-[0_6px_6px_rgba(0,0,0,0.22)]">
            <path d="M12 2C6 2 2 7 2 12C2 18 12 22 12 22C12 22 22 18 22 12C22 7 18 2 12 2Z" fill="currentColor" />
            <path d="M12 22V12" stroke="#4ade80" strokeWidth="0.8" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* ── Decorative leaf: mid-left ── */}
        <motion.div
          className="absolute left-[0%] top-[52%] z-20 pointer-events-none"
          initial={{ opacity: 0, rotate: -65 }}
          animate={{ opacity: 1, rotate: [-65, -58, -65], x: [0, -3, 0] }}
          transition={{ opacity: { delay: 0.85, duration: 0.5 }, x: { delay: 1.4, duration: 6.5, repeat: Infinity, ease: "easeInOut" } }}
        >
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" className="text-green-600 opacity-90 drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)]">
            <path d="M12 2C7 2 3 6 3 11C3 18 12 22 12 22C12 22 21 18 21 11C21 6 17 2 12 2Z" fill="currentColor" />
          </svg>
        </motion.div>

        {/* ── Decorative leaf: lower-left foreground (partially cropped) ── */}
        <motion.div
          className="absolute left-[-5%] bottom-[8%] z-40 pointer-events-none"
          initial={{ opacity: 0, rotate: 20 }}
          animate={{ opacity: 1, rotate: [20, 26, 20], y: [0, 4, 0] }}
          transition={{ opacity: { delay: 1.0, duration: 0.5 }, y: { delay: 1.5, duration: 6, repeat: Infinity, ease: "easeInOut" } }}
        >
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="text-green-800 drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)] blur-[0.5px]">
            <path d="M12 2C6 2 2 7 2 12C2 18 12 22 12 22C12 22 22 18 22 12C22 7 18 2 12 2Z" fill="currentColor" />
            <path d="M12 22V12" stroke="#22c55e" strokeWidth="0.75" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* ── Decorative leaf: right edge (partially cropped) ── */}
        <motion.div
          className="absolute right-[-6%] top-[60%] z-20 pointer-events-none"
          initial={{ opacity: 0, rotate: 110 }}
          animate={{ opacity: 1, rotate: [110, 104, 110], x: [0, 5, 0] }}
          transition={{ opacity: { delay: 0.9, duration: 0.5 }, x: { delay: 1.6, duration: 6.5, repeat: Infinity, ease: "easeInOut" } }}
        >
          <svg width="65" height="65" viewBox="0 0 24 24" fill="none" className="text-green-700 drop-shadow-[0_8px_8px_rgba(0,0,0,0.25)] blur-[1px]">
            <path d="M12 2C7 2 3 6 3 11C3 18 12 22 12 22C12 22 21 18 21 11C21 6 17 2 12 2Z" fill="currentColor" />
          </svg>
        </motion.div>

        {/* ── Subtle bg blur leaf for depth ── */}
        <motion.div
          className="absolute left-[20%] bottom-[30%] z-10 pointer-events-none"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 0.5, scale: 0.6, y: [0, -4, 0] }}
          transition={{ opacity: { delay: 1.1, duration: 0.5 }, y: { delay: 1.7, duration: 8, repeat: Infinity, ease: "easeInOut" } }}
        >
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" className="text-green-500 blur-[3px]">
            <path d="M12 2C7 2 3 6 3 11C3 18 12 22 12 22C12 22 21 18 21 11C21 6 17 2 12 2Z" fill="currentColor" />
          </svg>
        </motion.div>

      </div>
    </div>
  );
}

const VISUALS = [Slide0Visual, Slide1Visual, Slide2Visual, Slide3Visual, Slide4Visual];

// ─── Feature bar ──────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: <Refrigerator size={16} />, label: "AI Ingredient Rescue", href: "/ai-tools/ingredient-rescue" },
  { icon: <Calendar size={16} />, label: "Budget Meal Planner", href: "/ai-tools/budget-meal-planner" },
  { icon: <Activity size={16} />, label: "Nutrition & Meal Tracker", href: "/ai-tools/meal-tracker" },
  { icon: <Smile size={16} />, label: "Taste Matcher", href: "/ai-tools/taste-matcher" },
  { icon: <ShoppingBasket size={16} />, label: "Smart Shopping List", href: "/ai-tools/shopping-list" },
  { icon: <TrendingUp size={16} />, label: "Personalized Dietary Profile", href: "/dashboard/users/dietary-profile" },
];

const GRADIENT_MAP: Record<string, string> = {
  emerald: "from-emerald-700 to-emerald-500 dark:from-emerald-400 dark:to-teal-300 text-emerald-600",
  indigo: "from-indigo-700 to-indigo-500 dark:from-indigo-400 dark:to-purple-300 text-indigo-600",
  orange: "from-orange-600 to-amber-500 dark:from-orange-400 dark:to-amber-300 text-orange-500",
  rose: "from-rose-600 to-pink-500 dark:from-rose-400 dark:to-pink-300 text-rose-500",
  teal: "from-teal-700 to-emerald-500 dark:from-teal-400 dark:to-emerald-300 text-teal-600",
};

// ─── Main Banner Component ────────────────────────────────────────────────────
export default function Banner() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pathname = usePathname();

  const goTo = useCallback((idx: number, dir?: number) => {
    if (dir === undefined) {
      dir = idx > activeIdx ? 1 : -1;
    }
    setDirection(dir);
    setActiveIdx(idx);
  }, [activeIdx]);

  const next = useCallback(() => {
    goTo((activeIdx + 1) % SLIDES.length, 1);
  }, [activeIdx, goTo]);

  const prev = useCallback(() => {
    goTo((activeIdx - 1 + SLIDES.length) % SLIDES.length, -1);
  }, [activeIdx, goTo]);

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(next, 7000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPaused, next]);

  const slide = SLIDES[activeIdx];
  const Visual = VISUALS[activeIdx];

  const textVariants: any = {
    enter: { opacity: 0, y: 15 },
    center: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] } }),
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  };

  const bgVariants: any = {
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.8 } },
  };

  const prefersReduced = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  return (
    <section
      className="relative overflow-hidden bg-[#faf9f6] dark:bg-slate-950 flex flex-col"
      style={{
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)'
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* ── Background Image Layer ── */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#faf9f6] dark:bg-slate-950 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.bgImage}
            variants={prefersReduced ? {} : bgVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <img 
              src={slide.bgImage}
              alt={slide.badge}
              className="w-full h-full object-cover"
              style={{ objectPosition: slide.bgPos }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Left-side gradient scrim — premium seamless blend over food photos ── */}
      {/* Light mode: hero bg colour (#faf9f6) eased out to transparent */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none dark:hidden"
        style={{
          background: [
            'linear-gradient(to right,',
            '  rgba(250,249,246,0.95)  0%,',
            '  rgba(250,249,246,0.94)  5%,',
            '  rgba(250,249,246,0.91) 12%,',
            '  rgba(250,249,246,0.84) 20%,',
            '  rgba(250,249,246,0.72) 30%,',
            '  rgba(250,249,246,0.54) 40%,',
            '  rgba(250,249,246,0.34) 52%,',
            '  rgba(250,249,246,0.16) 62%,',
            '  rgba(250,249,246,0.05) 70%,',
            '  rgba(250,249,246,0.00) 78%',
            ')',
          ].join(' ')
        }}
      />
      {/* Dark mode: slate-950 (#020617) eased out to transparent — cinematic, no hard edge */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none hidden dark:block"
        style={{
          background: [
            'linear-gradient(to right,',
            '  rgba(2,6,23,0.95)  0%,',
            '  rgba(2,6,23,0.93)  5%,',
            '  rgba(2,6,23,0.88) 12%,',
            '  rgba(2,6,23,0.78) 20%,',
            '  rgba(2,6,23,0.63) 30%,',
            '  rgba(2,6,23,0.44) 40%,',
            '  rgba(2,6,23,0.26) 52%,',
            '  rgba(2,6,23,0.11) 62%,',
            '  rgba(2,6,23,0.03) 70%,',
            '  rgba(2,6,23,0.00) 78%',
            ')',
          ].join(' ')
        }}
      />

      {/* ── Hero Content Layer ── */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 pt-8 pb-6 lg:pt-16 lg:pb-16 min-h-[75vh] flex flex-col justify-center pointer-events-none">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center xl:items-stretch flex-1 relative pointer-events-none">
          
          {/* Left column — text */}
          <div className="lg:col-span-6 flex flex-col justify-center items-start text-left z-10 py-6 max-w-2xl pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div key={activeIdx} className="w-full">
                
                <motion.div custom={0} variants={prefersReduced ? {} : textVariants} initial="enter" animate="center" exit="exit" className="mb-4">
                  <span className={`text-[13px] font-bold uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r ${GRADIENT_MAP[slide.accentColor]}`}>
                    {slide.badge}
                  </span>
                </motion.div>

                <motion.h1 custom={1} variants={prefersReduced ? {} : textVariants} initial="enter" animate="center" exit="exit" className="text-4xl sm:text-5xl lg:text-[64px] font-black text-stone-900 dark:text-white tracking-tight leading-[1.05] mb-6">
                  {slide.headline.map((line, i) => (
                    <span key={i} className={i === slide.headlineHighlight ? "text-emerald-700 dark:text-emerald-400" : ""}>
                      {line}{i < slide.headline.length - 1 ? <br /> : null}
                    </span>
                  ))}
                </motion.h1>

                <motion.p custom={2} variants={prefersReduced ? {} : textVariants} initial="enter" animate="center" exit="exit" className="text-stone-600 dark:text-slate-300 text-lg sm:text-xl max-w-lg font-medium leading-relaxed mb-10">
                  {slide.sub}
                </motion.p>

                <motion.div custom={3} variants={prefersReduced ? {} : textVariants} initial="enter" animate="center" exit="exit" className="flex flex-wrap items-center gap-4 mb-4">
                  <Link href={slide.ctaPrimary.href}>
                    <motion.button 
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-4 rounded-full font-bold text-[16px] transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group"
                    >
                      <span>{slide.ctaPrimary.label}</span>
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </motion.button>
                  </Link>
                  <Link href={slide.ctaSecondary.href}>
                    <motion.button 
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white/90 dark:bg-slate-800/95 backdrop-blur-sm border border-stone-200 dark:border-slate-600 text-stone-700 dark:text-slate-200 hover:border-emerald-600 dark:hover:border-emerald-500 hover:text-emerald-700 px-8 py-4 rounded-full font-bold text-[16px] transition-all flex items-center gap-2 group shadow-sm hover:shadow-md"
                    >
                      <span>{slide.ctaSecondary.label}</span>
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right column — Floating Visual Cards Overlay */}
          <div className="lg:col-span-6 relative w-full h-[240px] sm:h-[280px] md:h-[360px] lg:h-[450px] xl:h-full xl:min-h-[400px] pointer-events-none flex items-center justify-center z-10 mt-4 lg:mt-0 mb-2 lg:mb-0 overflow-hidden xl:overflow-visible">
            <AnimatePresence mode="wait">
              <motion.div key={`visual-${activeIdx}`} className="absolute inset-0 pointer-events-none overflow-hidden xl:overflow-visible">
                <Visual />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* ── Carousel controls & Feature Bar (Bottom Navigation) ── */}
      <div className="relative z-20 border-t border-stone-200/50 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md px-6 sm:px-8 lg:px-12 py-3 mt-auto pointer-events-auto">
        <div className="w-full max-w-[1440px] mx-auto flex flex-col xl:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-6 order-2 xl:order-1 shrink-0">
            <div className="flex items-center gap-3">
              <button onClick={prev} aria-label="Previous slide" className="w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 shadow-sm border border-stone-200 dark:border-slate-600 flex items-center justify-center text-stone-500 hover:text-emerald-700 transition-colors pointer-events-auto">
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center gap-2">
                {SLIDES.map((s, i) => (
                  <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} className="relative overflow-hidden w-6 h-6 flex items-center justify-center group pointer-events-auto">
                    <span className={`block rounded-full transition-all duration-300 ${i === activeIdx ? "w-6 h-2 bg-emerald-600" : "w-2 h-2 bg-stone-300 dark:bg-slate-600 group-hover:bg-stone-400"}`} />
                  </button>
                ))}
              </div>
              <button onClick={next} aria-label="Next slide" className="w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 shadow-sm border border-stone-200 dark:border-slate-600 flex items-center justify-center text-stone-500 hover:text-emerald-700 transition-colors pointer-events-auto">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 xl:flex xl:flex-row items-start xl:items-center justify-items-center xl:justify-end gap-x-2 sm:gap-x-4 xl:gap-x-8 gap-y-4 xl:gap-y-0 w-full xl:w-auto order-1 xl:order-2 pb-2 xl:pb-0 pointer-events-auto">
            {FEATURES.map((f, i) => (
              <Link key={f.label} href={f.href} className={`relative flex flex-col xl:flex-row items-center gap-1.5 xl:gap-2 text-[10px] sm:text-[11px] xl:text-[13px] text-center xl:text-left font-bold transition group ${pathname === f.href ? "text-emerald-700 dark:text-emerald-400" : "text-stone-500 dark:text-slate-300 hover:text-stone-800 dark:hover:text-slate-200"}`}>
                <span className={`transition scale-[0.85] sm:scale-90 xl:scale-100 flex-shrink-0 ${pathname === f.href ? "text-emerald-600" : "text-stone-400 group-hover:text-stone-600 dark:group-hover:text-slate-300"}`}>
                  {f.icon}
                </span>
                <span className="leading-tight px-0.5 xl:px-0 xl:whitespace-nowrap">{f.label}</span>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}



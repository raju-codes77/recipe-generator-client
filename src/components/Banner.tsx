"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ChevronLeft, ChevronRight, ArrowRight, ChevronRight as ChevronRightSm,
  Refrigerator, Calendar, BarChart3, Smile, ShoppingBasket,
  Sparkles, Check, Leaf, Flame, Users, Activity,
  DollarSign, Clock, Apple, TrendingUp
} from "lucide-react";

// ─── Slide Data ────────────────────────────────────────────────────────────────

const SLIDES = [
  {
    id: 0,
    badge: "AI Ingredient Rescue",
    badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400",
    tagline: "Good Food. Better You.",
    headline: ["Turn Pantry &", "Leftovers Into", "Delicious Meals"],
    headlineHighlight: 1, // index to highlight with gradient
    highlightText: "Leftovers Into",
    sub: "From forgotten veggies to gourmet recipes — FoodCanvas AI rescues any ingredient combination into a satisfying meal.",
    ctaPrimary: { label: "Start Cooking Free", href: "/ai-tools/ingredient-rescue" },
    ctaSecondary: { label: "See How It Works", href: "/ai-tools/ingredient-rescue" },
    accentColor: "emerald",
    bgFrom: "#f0faf4",
    bgTo: "#fefce8",
    icon: <Refrigerator size={20} />,
  },
  {
    id: 1,
    badge: "Budget AI Meal Planner",
    badgeColor: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400",
    tagline: "Plan. Save. Enjoy.",
    headline: ["Plan Delicious Meals", "Without Breaking", "Your Budget"],
    headlineHighlight: 1,
    highlightText: "Without Breaking",
    sub: "AI generates a complete multi-day meal plan with cost estimates, then builds your shopping list automatically.",
    ctaPrimary: { label: "Generate My Plan", href: "/meal-planner" },
    ctaSecondary: { label: "View Sample Plan", href: "/meal-planner" },
    accentColor: "indigo",
    bgFrom: "#eef2ff",
    bgTo: "#f5f3ff",
    icon: <Calendar size={20} />,
  },
  {
    id: 2,
    badge: "Nutrition & Meal Tracker",
    badgeColor: "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400",
    tagline: "Better Choices. Every Day.",
    headline: ["Understand What", "You Eat and", "Stay On Track"],
    headlineHighlight: 1,
    highlightText: "You Eat and",
    sub: "Snap a photo of your meal — AI instantly logs calories, protein, carbs, and fat against your daily goals.",
    ctaPrimary: { label: "Track My Meals", href: "/ai-tools/meal-tracker" },
    ctaSecondary: { label: "Analyze Nutrition", href: "/ai-tools/nutrition-analyzer" },
    accentColor: "orange",
    bgFrom: "#fff7ed",
    bgTo: "#fef9c3",
    icon: <BarChart3 size={20} />,
  },
  {
    id: 3,
    badge: "Taste Matcher",
    badgeColor: "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400",
    tagline: "Real Ingredients. Real Results.",
    headline: ["Discover Meals That", "Match Your Personal", "Taste Profile"],
    headlineHighlight: 1,
    highlightText: "Match Your Personal",
    sub: "Set your spice level, favorite cuisines, liked and disliked ingredients. AI tailors every recipe recommendation to you.",
    ctaPrimary: { label: "Find My Match", href: "/ai-tools/taste-matcher" },
    ctaSecondary: { label: "Set My Profile", href: "/dashboard/users/dietary-profile" },
    accentColor: "rose",
    bgFrom: "#fff1f2",
    bgTo: "#fff7ed",
    icon: <Smile size={20} />,
  },
  {
    id: 4,
    badge: "Smart Shopping",
    badgeColor: "bg-teal-100 text-teal-700 dark:bg-teal-950/60 dark:text-teal-400",
    tagline: "Shop Smarter. Waste Less.",
    headline: ["Get Exactly What", "You Need for", "Your Meals"],
    headlineHighlight: 1,
    highlightText: "You Need for",
    sub: "Generate an AI-organized, categorized shopping list from your meal plan. Check items off as you go.",
    ctaPrimary: { label: "Build My List", href: "/ai-tools/shopping-list" },
    ctaSecondary: { label: "Plan & Shop", href: "/meal-planner" },
    accentColor: "teal",
    bgFrom: "#f0fdfa",
    bgTo: "#ecfdf5",
    icon: <ShoppingBasket size={20} />,
  },
];

// ─── Feature Visuals (right panel per slide) ─────────────────────────────────

function Slide0Visual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Main food bowl image */}
      <motion.div
        className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white/80 dark:border-slate-800/50"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.img
          src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"
          alt="Fresh ingredients bowl"
          className="w-full h-full object-cover"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </motion.div>

      {/* Floating card: Ingredient Rescue */}
      <FloatingCard delay={0.4} offsetX="-left-4 sm:-left-10" offsetY="top-6 sm:top-10">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
            <Refrigerator size={14} />
          </div>
          <span className="text-[11px] font-bold text-stone-800 dark:text-white">AI Ingredient Rescue</span>
        </div>
        <p className="text-[10px] text-stone-500 dark:text-slate-400 leading-relaxed">Turn pantry &amp; leftovers into delicious meals</p>
        <div className="flex gap-1 mt-2 flex-wrap">
          {["Chicken", "Tomato", "Onion"].map(ing => (
            <span key={ing} className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold">{ing}</span>
          ))}
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-stone-100 text-stone-500 font-semibold">+5 more</span>
        </div>
      </FloatingCard>

      {/* Floating card: Less Food Waste */}
      <FloatingCard delay={0.7} offsetX="-left-4 sm:-left-8" offsetY="bottom-14 sm:bottom-20" floatDir="up">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
            <Leaf size={12} />
          </div>
          <span className="text-[11px] font-bold text-emerald-700">Less Food Waste</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-stone-500">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          <span>Zero-waste recipe generated</span>
        </div>
      </FloatingCard>

      {/* Recipe card bottom right */}
      <motion.div
        className="absolute -bottom-6 right-0 sm:right-2 z-30 w-[200px] bg-white/95 dark:bg-slate-900/95 shadow-lg border border-stone-100 dark:border-slate-800 rounded-2xl p-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [0, -4, 0] }}
        transition={{ opacity: { delay: 0.9, duration: 0.5 }, y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1.5 } }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
            <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80" className="w-full h-full object-cover" alt="recipe" />
          </div>
          <div>
            <p className="text-[10px] font-black text-stone-900 dark:text-white">Chicken Stir Fry</p>
            <p className="text-[9px] text-emerald-600 font-semibold">AI Generated</p>
          </div>
        </div>
        <div className="flex justify-between text-[9px] text-stone-500 border-t border-stone-100 dark:border-slate-800 pt-1.5">
          <span>⏱ 25 min</span><span>🔥 420 kcal</span><span>💪 38g</span>
        </div>
      </motion.div>
    </div>
  );
}

function Slide1Visual() {
  const meals = [
    { type: "Mon", name: "Chicken Bowl", cal: "$3.20", color: "text-indigo-600" },
    { type: "Tue", name: "Veg Pasta", cal: "$2.10", color: "text-indigo-600" },
    { type: "Wed", name: "Grilled Fish", cal: "$4.50", color: "text-indigo-600" },
  ];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white/80 dark:border-slate-800/50"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.img
          src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80"
          alt="Meal planning"
          className="w-full h-full object-cover"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/30 via-transparent to-transparent" />
      </motion.div>

      {/* Floating meal plan card */}
      <FloatingCard delay={0.4} offsetX="-left-4 sm:-left-10" offsetY="top-6 sm:top-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <Calendar size={12} />
          </div>
          <span className="text-[11px] font-bold text-stone-800 dark:text-white">Weekly Plan</span>
        </div>
        {meals.map((m) => (
          <div key={m.type} className="flex items-center justify-between text-[10px] py-0.5 border-b border-stone-100 dark:border-slate-800 last:border-0">
            <span className="text-stone-400 w-6">{m.type}</span>
            <span className="text-stone-700 dark:text-slate-200 font-medium flex-1 mx-2">{m.name}</span>
            <span className={`font-bold ${m.color}`}>{m.cal}</span>
          </div>
        ))}
      </FloatingCard>

      {/* Budget card */}
      <FloatingCard delay={0.7} offsetX="-left-4 sm:-left-8" offsetY="bottom-14 sm:bottom-20" floatDir="up">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
            <DollarSign size={11} />
          </div>
          <div>
            <p className="text-[10px] font-black text-stone-800 dark:text-white">$38.50 <span className="text-stone-400 font-normal">/ week</span></p>
            <p className="text-[9px] text-stone-400">Under $80 budget ✓</p>
          </div>
        </div>
      </FloatingCard>

      {/* Action labels */}
      <motion.div
        className="absolute top-4 right-0 flex flex-col gap-1 items-end"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {["Plan", "Save", "Enjoy"].map((t, i) => (
          <motion.span key={t}
            className="text-[11px] font-black text-indigo-600 dark:text-indigo-400 bg-white/80 dark:bg-slate-900/80 px-2 py-0.5 rounded-full shadow-sm border border-indigo-100 dark:border-indigo-900"
            animate={{ y: [0, -2, 0] }}
            transition={{ repeat: Infinity, duration: 3 + i * 0.5, ease: "easeInOut", delay: i * 0.3 }}
          >{t}</motion.span>
        ))}
      </motion.div>
    </div>
  );
}

function Slide2Visual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white/80 dark:border-slate-800/50"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.img
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80"
          alt="Nutrition tracking"
          className="w-full h-full object-cover"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 via-transparent to-transparent" />
      </motion.div>

      {/* Nutrition card */}
      <FloatingCard delay={0.4} offsetX="-left-4 sm:-left-10" offsetY="top-6 sm:top-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center text-white">
            <Apple size={12} />
          </div>
          <span className="text-[11px] font-bold text-stone-800 dark:text-white">Today&apos;s Progress</span>
        </div>
        <div className="space-y-1.5">
          {[
            { label: "Calories", value: "1,350 / 2,000 kcal", pct: 67, color: "bg-orange-500" },
            { label: "Protein", value: "85g", pct: 56, color: "bg-blue-500" },
            { label: "Carbs", value: "142g", pct: 71, color: "bg-amber-400" },
          ].map((m) => (
            <div key={m.label}>
              <div className="flex justify-between text-[9px] mb-0.5">
                <span className="text-stone-500">{m.label}</span>
                <span className="font-semibold text-stone-700 dark:text-slate-300">{m.value}</span>
              </div>
              <div className="h-1.5 bg-stone-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${m.color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${m.pct}%` }}
                  transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </FloatingCard>

      {/* Macro card bottom right */}
      <motion.div
        className="absolute -bottom-6 right-0 sm:right-2 z-30 bg-white/95 dark:bg-slate-900/95 shadow-lg border border-stone-100 dark:border-slate-800 rounded-2xl p-3 w-[180px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [0, -4, 0] }}
        transition={{ opacity: { delay: 0.8, duration: 0.5 }, y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1.5 } }}
      >
        <p className="text-[9px] font-bold text-stone-400 uppercase mb-1.5">Nutrition Analyzer</p>
        <p className="text-[13px] font-black text-orange-500">820 kcal</p>
        <div className="flex gap-2 mt-1 text-[9px] text-stone-500">
          <span>Protein <b className="text-stone-800 dark:text-white">67g</b></span>
          <span>Carbs <b className="text-stone-800 dark:text-white">92g</b></span>
          <span>Fat <b className="text-stone-800 dark:text-white">16g</b></span>
        </div>
        <div className="mt-2 w-full py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-[9px] font-bold rounded-lg text-center cursor-pointer transition">
          Add to Tracker
        </div>
      </motion.div>
    </div>
  );
}

function Slide3Visual() {
  const chips = [
    { label: "🌶️ Medium Spicy", color: "bg-red-100 text-red-700" },
    { label: "🌿 Vegetarian", color: "bg-green-100 text-green-700" },
    { label: "🍜 Asian", color: "bg-amber-100 text-amber-700" },
    { label: "🇮🇹 Italian", color: "bg-orange-100 text-orange-700" },
    { label: "🥑 High Protein", color: "bg-blue-100 text-blue-700" },
  ];
  const recipes = [
    { name: "Spicy Thai Basil", match: 98, img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?auto=format&fit=crop&w=100&q=80" },
    { name: "Green Curry Bowl", match: 94, img: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=100&q=80" },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white/80 dark:border-slate-800/50"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.img
          src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80"
          alt="Taste matching"
          className="w-full h-full object-cover"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 via-transparent to-transparent" />
      </motion.div>

      <FloatingCard delay={0.4} offsetX="-left-4 sm:-left-10" offsetY="top-6 sm:top-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-rose-500 rounded-lg flex items-center justify-center text-white">
            <Smile size={12} />
          </div>
          <span className="text-[11px] font-bold text-stone-800 dark:text-white">Taste Profile</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {chips.map(c => (
            <span key={c.label} className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${c.color}`}>{c.label}</span>
          ))}
        </div>
      </FloatingCard>

      <motion.div
        className="absolute -bottom-6 right-0 sm:right-2 z-30 bg-white/95 dark:bg-slate-900/95 shadow-lg border border-stone-100 dark:border-slate-800 rounded-2xl p-3 w-[200px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [0, -4, 0] }}
        transition={{ opacity: { delay: 0.8, duration: 0.5 }, y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1.5 } }}
      >
        <p className="text-[9px] font-bold text-stone-400 uppercase mb-2">Matched For You</p>
        {recipes.map(r => (
          <div key={r.name} className="flex items-center gap-2 mb-1.5 last:mb-0">
            <img src={r.img} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" alt={r.name} />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold text-stone-800 dark:text-white truncate">{r.name}</p>
              <p className="text-[9px] text-rose-500 font-semibold">{r.match}% match</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function Slide4Visual() {
  const items = [
    { name: "Chicken Breast", qty: "2 lbs", cat: "Protein", cost: "$5.99" },
    { name: "Broccoli", qty: "1 bunch", cat: "Produce", cost: "$1.29" },
    { name: "Tomato", qty: "4 pcs", cat: "Produce", cost: "$2.10" },
    { name: "Olive Oil", qty: "1 bottle", cat: "Pantry", cost: "$4.50" },
    { name: "Pasta", qty: "500g", cat: "Grains", cost: "$1.99" },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white/80 dark:border-slate-800/50"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
          alt="Shopping groceries"
          className="w-full h-full object-cover"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/30 via-transparent to-transparent" />
      </motion.div>

      <FloatingCard delay={0.4} offsetX="-left-4 sm:-left-10" offsetY="top-6 sm:top-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-teal-600 rounded-lg flex items-center justify-center text-white">
            <ShoppingBasket size={12} />
          </div>
          <span className="text-[11px] font-bold text-stone-800 dark:text-white">Shopping List</span>
        </div>
        {items.map((item, i) => (
          <motion.div
            key={item.name}
            className="flex items-center gap-1.5 py-0.5 border-b border-stone-50 dark:border-slate-800 last:border-0"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
          >
            <div className="w-3.5 h-3.5 rounded border border-teal-300 flex items-center justify-center flex-shrink-0">
              {i < 2 && <Check size={8} className="text-teal-500" strokeWidth={3} />}
            </div>
            <span className={`text-[10px] flex-1 ${i < 2 ? "line-through text-stone-400" : "text-stone-700 dark:text-slate-300"}`}>{item.name}</span>
            <span className="text-[9px] text-stone-400">{item.qty}</span>
            <span className="text-[9px] font-bold text-teal-600">{item.cost}</span>
          </motion.div>
        ))}
      </FloatingCard>

      <motion.div
        className="absolute -bottom-6 right-0 sm:right-2 z-30 bg-white/95 dark:bg-slate-900/95 shadow-lg border border-stone-100 dark:border-slate-800 rounded-2xl p-3 w-[160px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [0, -4, 0] }}
        transition={{ opacity: { delay: 0.8, duration: 0.5 }, y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1.5 } }}
      >
        <p className="text-[9px] text-stone-400 mb-0.5">Estimated Total</p>
        <p className="text-[18px] font-black text-teal-600">$15.87</p>
        <p className="text-[9px] text-stone-400">5 items · 2 categories</p>
      </motion.div>
    </div>
  );
}

const VISUALS = [Slide0Visual, Slide1Visual, Slide2Visual, Slide3Visual, Slide4Visual];

// ─── Feature bar ──────────────────────────────────────────────────────────────

const FEATURES = [
  { icon: <Refrigerator size={16} />, label: "AI Ingredient Rescue", href: "/ai-tools/ingredient-rescue" },
  { icon: <Calendar size={16} />, label: "Budget Meal Planner", href: "/meal-planner" },
  { icon: <Activity size={16} />, label: "Nutrition & Meal Tracker", href: "/ai-tools/meal-tracker" },
  { icon: <Smile size={16} />, label: "Taste Matcher", href: "/ai-tools/taste-matcher" },
  { icon: <ShoppingBasket size={16} />, label: "Smart Shopping List", href: "/ai-tools/shopping-list" },
  { icon: <TrendingUp size={16} />, label: "Personalized Dietary Profile", href: "/dashboard/users/dietary-profile" },
];

// ─── Floating Card wrapper ─────────────────────────────────────────────────────

function FloatingCard({
  children, delay, offsetX, offsetY, floatDir = "down"
}: {
  children: React.ReactNode;
  delay: number;
  offsetX: string;
  offsetY: string;
  floatDir?: "up" | "down";
}) {
  return (
    <motion.div
      className={`absolute ${offsetX} ${offsetY} z-20 bg-white/95 dark:bg-slate-900/95 shadow-md border border-stone-100 dark:border-slate-800 rounded-xl p-2.5 min-w-[140px] max-w-[200px]`}
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0, y: floatDir === "down" ? [-2, 3, -2] : [2, -3, 2] }}
      transition={{
        opacity: { delay, duration: 0.5 },
        x: { delay, duration: 0.5, ease: "easeOut" },
        y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: delay + 0.5 },
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Gradient text colors per slide ──────────────────────────────────────────

const GRADIENT_MAP: Record<string, string> = {
  emerald: "from-emerald-700 to-emerald-500 dark:from-emerald-400 dark:to-teal-300",
  indigo: "from-indigo-700 to-indigo-500 dark:from-indigo-400 dark:to-purple-300",
  orange: "from-orange-600 to-amber-500 dark:from-orange-400 dark:to-amber-300",
  rose: "from-rose-600 to-pink-500 dark:from-rose-400 dark:to-pink-300",
  teal: "from-teal-700 to-emerald-500 dark:from-teal-400 dark:to-emerald-300",
};

const BG_BLOB_MAP: Record<string, string> = {
  emerald: "from-[#EEF5F0] via-transparent to-transparent dark:from-emerald-900/10",
  indigo: "from-[#EEF2FF] via-transparent to-transparent dark:from-indigo-900/10",
  orange: "from-[#FFF7ED] via-transparent to-transparent dark:from-orange-900/10",
  rose: "from-[#FFF1F2] via-transparent to-transparent dark:from-rose-900/10",
  teal: "from-[#F0FDFA] via-transparent to-transparent dark:from-teal-900/10",
};

// ─── Main Banner Component ────────────────────────────────────────────────────

export default function Banner() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((idx: number, dir: number) => {
    setDirection(dir);
    setActiveIdx(idx);
  }, []);

  const next = useCallback(() => {
    goTo((activeIdx + 1) % SLIDES.length, 1);
  }, [activeIdx, goTo]);

  const prev = useCallback(() => {
    goTo((activeIdx - 1 + SLIDES.length) % SLIDES.length, -1);
  }, [activeIdx, goTo]);

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(next, 4800);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPaused, next]);

  const slide = SLIDES[activeIdx];
  const Visual = VISUALS[activeIdx];

  const textVariants: any = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 40, y: 10 }),
    center: { opacity: 1, x: 0, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: (dir: number) => ({ opacity: 0, x: dir * -30, y: -10, transition: { duration: 0.35 } }),
  };

  const visualVariants: any = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 60, scale: 0.96 }),
    center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: (dir: number) => ({ opacity: 0, x: dir * -50, scale: 0.96, transition: { duration: 0.35 } }),
  };

  // prefers-reduced-motion
  const prefersReduced = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  return (
    <section
      className="relative w-full max-w-[1440px] mx-auto overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Dynamic background blob ── */}
      <div
        className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl ${BG_BLOB_MAP[slide.accentColor]} rounded-full blur-[80px] -z-10 transition-all duration-700`}
      />
      <div className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] rounded-full border border-emerald-200/20 dark:border-emerald-800/20 -z-10 pointer-events-none hidden lg:block" />
      <div className="absolute top-1/4 right-10 w-[450px] h-[450px] rounded-full border border-dashed border-emerald-200/30 dark:border-emerald-800/30 -z-10 pointer-events-none hidden lg:block" />

      {/* ── Hero area ── */}
      <div className="px-6 sm:px-8 lg:px-12 pt-8 pb-10 lg:pt-16 lg:pb-16 min-h-[85vh] flex flex-col justify-between">

        {/* Main two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center flex-1">

          {/* Left column — text */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIdx}
                custom={direction}
                variants={prefersReduced ? {} : textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                {/* Badge */}
                <div className={`mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-bold border border-transparent ${slide.badgeColor} shadow-sm`}>
                  {slide.icon}
                  <span>{slide.badge}</span>
                </div>

                {/* Tagline */}
                <p className="text-sm font-semibold text-stone-400 dark:text-slate-500 mb-3 italic">{slide.tagline}</p>

                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-black text-stone-900 dark:text-white tracking-tight leading-[1.05] mb-5">
                  {slide.headline.map((line, i) =>
                    i === slide.headlineHighlight ? (
                      <span key={i} className={`text-transparent bg-clip-text bg-gradient-to-r ${GRADIENT_MAP[slide.accentColor]}`}>
                        {line}{i < slide.headline.length - 1 ? <br /> : null}
                      </span>
                    ) : (
                      <span key={i}>{line}{i < slide.headline.length - 1 ? <br /> : null}</span>
                    )
                  )}
                </h1>

                {/* Subtitle */}
                <p className="text-stone-600 dark:text-slate-400 text-base sm:text-lg max-w-md font-medium leading-relaxed mb-8">
                  {slide.sub}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <Link href={slide.ctaPrimary.href}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white px-7 py-3.5 rounded-full font-bold text-[15px] transition-colors shadow-sm flex items-center gap-2 group"
                    >
                      <span>{slide.ctaPrimary.label}</span>
                      <ChevronRightSm size={18} className="transition-transform group-hover:translate-x-1" />
                    </motion.button>
                  </Link>
                  <Link href={slide.ctaSecondary.href}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-700 dark:text-slate-300 hover:border-emerald-600 dark:hover:border-emerald-500 hover:text-emerald-700 px-7 py-3.5 rounded-full font-bold text-[15px] transition-colors flex items-center gap-2 group shadow-sm"
                    >
                      <span>{slide.ctaSecondary.label}</span>
                      <ArrowRight size={16} className="text-stone-400 group-hover:text-emerald-600 transition-colors" />
                    </motion.button>
                  </Link>
                </div>

                {/* Social proof */}
                <div className="flex items-center gap-5 sm:gap-8 border-t border-stone-200 dark:border-slate-800/60 pt-6">
                  <div className="flex flex-col gap-1">
                    <div className="flex -space-x-3">
                      <img className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User" />
                      <img className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" />
                      <img className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="User" />
                      <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-stone-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-stone-600 dark:text-slate-300">+2k</div>
                    </div>
                    <span className="text-[12px] font-medium text-stone-500 dark:text-slate-400 mt-1">
                      Join <span className="font-bold text-stone-900 dark:text-white">10,000+</span> home cooks
                    </span>
                  </div>
                  <div className="h-10 w-[1px] bg-stone-200 dark:bg-slate-800/60 hidden sm:block" />
                  <div className="hidden sm:flex items-center gap-1.5 text-[12px] text-stone-500 dark:text-slate-400">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-semibold">FoodCanvas AI Beta</span> — Free to use
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right column — visual */}
          <div className="lg:col-span-6 relative flex justify-center items-center mt-10 lg:mt-0">
            <div className="absolute w-[400px] h-[400px] bg-emerald-500/5 dark:bg-emerald-500/5 rounded-full blur-[60px] -z-10" />
            <div className="relative w-full max-w-[460px] aspect-square">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`visual-${activeIdx}`}
                  custom={direction}
                  variants={prefersReduced ? {} : visualVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <Visual />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Carousel controls ── */}
        <div className="flex items-center justify-center gap-6 pt-10 pb-2">
          {/* Prev */}
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="w-9 h-9 rounded-full border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center text-stone-500 hover:text-emerald-700 hover:border-emerald-400 transition shadow-sm"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > activeIdx ? 1 : -1)}
                aria-label={`Slide ${i + 1}`}
                className="relative overflow-hidden"
              >
                <motion.div
                  className={`rounded-full transition-all duration-300 ${i === activeIdx ? "w-6 h-2.5 bg-emerald-600" : "w-2.5 h-2.5 bg-stone-300 dark:bg-slate-600 hover:bg-stone-400"}`}
                  layoutId={undefined}
                />
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={next}
            aria-label="Next slide"
            className="w-9 h-9 rounded-full border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center text-stone-500 hover:text-emerald-700 hover:border-emerald-400 transition shadow-sm"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* ── Feature Bar ── */}
      <div className="border-t border-stone-200 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm px-6 sm:px-8 lg:px-12 py-4">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {FEATURES.map((f, i) => (
            <Link
              key={f.label}
              href={f.href}
              className={`flex items-center gap-2 text-[12px] font-semibold transition group ${i === activeIdx ? "text-emerald-700 dark:text-emerald-400" : "text-stone-500 dark:text-slate-400 hover:text-stone-700 dark:hover:text-slate-200"}`}
            >
              <span className={`transition ${i === activeIdx ? "text-emerald-600" : "text-stone-400 group-hover:text-stone-600 dark:group-hover:text-slate-300"}`}>
                {f.icon}
              </span>
              {f.label}
              {i < FEATURES.length - 1 && (
                <span className="hidden sm:inline text-stone-300 dark:text-slate-700 ml-3">·</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
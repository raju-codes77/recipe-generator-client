const fs = require('fs');
const path = require('path');

const bannerPath = path.join(__dirname, 'src', 'components', 'Banner.tsx');

let content = `"use client";

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
    badge: "AI Meal Planner",
    headline: ["Plan Better Meals.", "Stay Within Budget."],
    headlineHighlight: 1,
    sub: "Build a weekly meal plan that fits your goals, preferences and budget effortlessly.",
    ctaPrimary: { label: "Start Planning Free", href: "/meal-planner" },
    ctaSecondary: { label: "See How It Works", href: "/meal-planner" },
    accentColor: "indigo",
    bgImage: "/hero1.png",
    bgPos: "center right",
  },
  {
    id: 1,
    badge: "Taste Matcher",
    headline: ["Discover Flavors", "You'll Love."],
    headlineHighlight: -1,
    sub: "Get AI-powered ingredient and flavor pairing suggestions tailored perfectly to your taste.",
    ctaPrimary: { label: "Match Flavors Free", href: "/ai-tools/taste-matcher" },
    ctaSecondary: { label: "Explore Pairings", href: "/dashboard/users/dietary-profile" },
    accentColor: "rose",
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
    badge: "Nutrition & Recipes",
    headline: ["Delicious Meals.", "Perfect Nutrition."],
    headlineHighlight: 0,
    sub: "Explore detailed recipes with comprehensive nutritional breakdowns and health scores.",
    ctaPrimary: { label: "Explore Recipes", href: "/recipes" },
    ctaSecondary: { label: "Track Nutrition", href: "/ai-tools/meal-tracker" },
    accentColor: "orange",
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
      className={\`absolute \${offsetX} \${offsetY} \${zIndex} bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-xl border border-white/40 dark:border-slate-700/60 rounded-2xl p-4 pointer-events-auto \${className}\`}
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
          <polygon key={r} points={\`50,\${50-r} \${50+r*0.95},\${50-r*0.31} \${50+r*0.59},\${50+r*0.81} \${50-r*0.59},\${50+r*0.81} \${50-r*0.95},\${50-r*0.31}\`} fill="none" stroke="currentColor" className="text-stone-200 dark:text-slate-700" strokeWidth="0.5" />
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

function Slide0Visual() { // hero1.png - AI Meal Planner
  const meals = [
    { type: "Mon", name: "Grilled Herb Chicken", cost: "$4.50", checked: true },
    { type: "Tue", name: "Roasted Veggie Bowl", cost: "$3.20", checked: true },
    { type: "Wed", name: "Lemon Butter Salmon", cost: "$6.80", checked: false },
    { type: "Thu", name: "Spicy Tofu Stir-fry", cost: "$2.90", checked: false },
  ];
  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none hidden lg:flex">
      {/* Main Meal Planner Card */}
      <FloatingCard delay={0.4} offsetX="right-[10%] xl:right-[15%]" offsetY="top-[20%] xl:top-[25%]" className="w-[260px]">
        <div className="flex items-center gap-3 mb-4 border-b border-stone-100 dark:border-slate-800 pb-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-sm">
            <Calendar size={16} />
          </div>
          <div>
            <h3 className="text-[14px] font-bold text-stone-900 dark:text-white leading-tight">AI Meal Planner</h3>
            <p className="text-[11px] text-stone-500 font-medium">Weekly Budget: $45.00</p>
          </div>
        </div>
        <div className="space-y-2.5">
          {meals.map((m, i) => (
            <div key={i} className="flex items-center justify-between text-[12px] group cursor-pointer">
              <div className="flex items-center gap-2">
                <div className={\`w-4 h-4 rounded-full border flex items-center justify-center transition-colors \${m.checked ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-stone-300 dark:border-slate-600 group-hover:border-indigo-400'}\`}>
                  {m.checked && <Check size={10} strokeWidth={3} />}
                </div>
                <span className="text-stone-400 font-medium w-8">{m.type}</span>
                <span className="text-stone-700 dark:text-slate-200 font-semibold truncate max-w-[100px]">{m.name}</span>
              </div>
              <span className="font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 px-1.5 py-0.5 rounded text-[10px]">{m.cost}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-stone-100 dark:border-slate-800 flex justify-between items-center">
          <span className="text-[11px] text-stone-500 font-medium">Est. Total</span>
          <span className="text-[13px] font-black text-stone-900 dark:text-white">$17.40</span>
        </div>
      </FloatingCard>
      
      {/* Secondary Card */}
      <FloatingCard delay={0.7} offsetX="right-[35%] xl:right-[40%]" offsetY="bottom-[25%] xl:bottom-[30%]" floatDir="up" className="min-w-[160px]" zIndex="z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-600 shadow-inner">
            <Leaf size={18} />
          </div>
          <div>
            <p className="text-[12px] font-black text-stone-900 dark:text-white">Zero Waste</p>
            <p className="text-[10px] text-emerald-600 font-medium">Ingredients optimized</p>
          </div>
        </div>
      </FloatingCard>
    </div>
  );
}

function Slide1Visual() { // hero2.png - Flavor Pairing
  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none hidden lg:flex">
      <FloatingCard delay={0.4} offsetX="right-[15%] xl:right-[20%]" offsetY="top-[25%] xl:top-[30%]" className="w-[240px]">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-rose-500 rounded-lg flex items-center justify-center text-white shadow-sm">
              <Smile size={14} />
            </div>
            <h3 className="text-[14px] font-bold text-stone-900 dark:text-white">Flavor Profile</h3>
          </div>
          <span className="text-[10px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-500/10 px-2 py-1 rounded-full border border-rose-100 dark:border-rose-900">98% Match</span>
        </div>
        
        <RadarChart />
        
        <p className="text-[11px] text-stone-500 dark:text-slate-400 text-center mb-3">Your personalized flavor pairings.</p>
        
        <div className="space-y-2">
          {[
            { a: "Lemon", b: "Dill", icon: "🍋" },
            { a: "Chili", b: "Lime", icon: "🌶️" },
            { a: "Basil", b: "Balsamic", icon: "🌿" }
          ].map((pair, i) => (
            <div key={i} className="flex items-center justify-between text-[12px] font-medium bg-stone-50 dark:bg-slate-800/50 px-3 py-2 rounded-lg border border-stone-100 dark:border-slate-700/50 hover:border-rose-300 dark:hover:border-rose-500/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-2">
                <span className="text-[14px]">{pair.icon}</span>
                <span className="text-stone-700 dark:text-slate-200">{pair.a} <span className="text-rose-400 font-bold mx-0.5">&</span> {pair.b}</span>
              </div>
              <Check size={12} className="text-rose-500" />
            </div>
          ))}
        </div>
      </FloatingCard>
    </div>
  );
}

function Slide2Visual() { // hero3.png - App Interface
  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none hidden lg:flex">
      
      {/* Central Phone/App UI Component */}
      <FloatingCard delay={0.3} offsetX="right-[20%] xl:right-[25%]" offsetY="top-[15%] xl:top-[20%]" floatDir="none" className="w-[280px] h-[480px] p-0 overflow-hidden border-4 border-stone-200 dark:border-slate-800 rounded-[32px] bg-stone-50 dark:bg-slate-950 flex flex-col shadow-2xl">
        {/* App Header */}
        <div className="px-5 pt-6 pb-4 bg-white dark:bg-slate-900 flex justify-between items-center shadow-sm z-10">
          <div>
            <p className="text-[10px] text-stone-400 font-medium">Good Morning,</p>
            <p className="text-[14px] font-black text-stone-800 dark:text-white">Alex</p>
          </div>
          <div className="flex items-center gap-3">
            <Bell size={16} className="text-stone-400" />
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <User size={14} />
            </div>
          </div>
        </div>
        {/* App Content */}
        <div className="p-4 overflow-hidden flex flex-col gap-4">
          <div className="relative">
            <input type="text" placeholder="What do you want to cook?" className="w-full bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-[12px] shadow-sm pointer-events-none" />
            <Search size={14} className="absolute left-4 top-3 text-stone-400" />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-500 rounded-xl p-3 text-white shadow-md">
              <Refrigerator size={18} className="mb-2 opacity-80" />
              <p className="text-[11px] font-bold">Ingredient Rescue</p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-3 border border-stone-200 dark:border-slate-800 shadow-sm text-stone-700 dark:text-slate-200">
              <Calendar size={18} className="mb-2 text-indigo-500" />
              <p className="text-[11px] font-bold">Meal Planner</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-stone-200 dark:border-slate-800 shadow-sm mt-2">
            <div className="flex justify-between items-center mb-3">
              <p className="text-[12px] font-bold text-stone-800 dark:text-white">Today's Nutrition</p>
              <span className="text-[10px] text-orange-500 font-bold">1,450 kcal</span>
            </div>
            <div className="flex gap-2 h-1.5 w-full rounded-full overflow-hidden bg-stone-100 dark:bg-slate-800">
              <div className="w-[45%] bg-rose-500" />
              <div className="w-[35%] bg-amber-400" />
              <div className="w-[20%] bg-emerald-400" />
            </div>
            <div className="flex justify-between mt-2 text-[9px] text-stone-500">
              <span>Carbs (45%)</span>
              <span>Protein (35%)</span>
              <span>Fat (20%)</span>
            </div>
          </div>
        </div>
      </FloatingCard>

      {/* Small floating feature cards surrounding it */}
      <FloatingCard delay={0.6} offsetX="right-[5%] xl:right-[10%]" offsetY="top-[25%] xl:top-[30%]" floatDir="up" className="py-2 px-3 flex items-center gap-2 rounded-full" zIndex="z-30">
        <Activity size={14} className="text-orange-500" />
        <span className="text-[11px] font-bold text-stone-800 dark:text-white">Nutrition Tracker</span>
      </FloatingCard>

      <FloatingCard delay={0.8} offsetX="right-[42%] xl:right-[42%]" offsetY="bottom-[25%] xl:bottom-[30%]" floatDir="down" className="py-2 px-3 flex items-center gap-2 rounded-full" zIndex="z-30">
        <ShoppingBasket size={14} className="text-teal-600" />
        <span className="text-[11px] font-bold text-stone-800 dark:text-white">Smart List</span>
      </FloatingCard>
    </div>
  );
}

function Slide3Visual() { // hero4.png - Recipe Detail / Nutrition
  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none hidden lg:flex">
      {/* Central Recipe Card */}
      <FloatingCard delay={0.4} offsetX="right-[15%] xl:right-[20%]" offsetY="top-[20%] xl:top-[25%]" className="w-[280px] p-0 overflow-hidden">
        {/* Fake Image Area */}
        <div className="h-32 bg-stone-200 dark:bg-slate-800 relative w-full overflow-hidden">
          <img src="/hero4.png" alt="Food" className="w-full h-full object-cover opacity-80" />
          <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <Star size={10} className="text-amber-500 fill-amber-500" />
            <span className="text-[10px] font-bold text-stone-800 dark:text-white">4.9</span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-[16px] font-black text-stone-900 dark:text-white mb-1">Roasted Pumpkin Soup</h3>
          <p className="text-[11px] text-stone-500 mb-4 line-clamp-2">A creamy, comforting bowl of roasted pumpkin blended with autumn spices.</p>
          
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-stone-50 dark:bg-slate-800/50 rounded-lg p-2 text-center border border-stone-100 dark:border-slate-700">
              <Flame size={14} className="mx-auto text-orange-500 mb-1" />
              <p className="text-[9px] text-stone-400">Calories</p>
              <p className="text-[11px] font-bold text-stone-700 dark:text-slate-200">320</p>
            </div>
            <div className="bg-stone-50 dark:bg-slate-800/50 rounded-lg p-2 text-center border border-stone-100 dark:border-slate-700">
              <Activity size={14} className="mx-auto text-emerald-500 mb-1" />
              <p className="text-[9px] text-stone-400">Protein</p>
              <p className="text-[11px] font-bold text-stone-700 dark:text-slate-200">12g</p>
            </div>
            <div className="bg-stone-50 dark:bg-slate-800/50 rounded-lg p-2 text-center border border-stone-100 dark:border-slate-700">
              <HeartPulse size={14} className="mx-auto text-rose-500 mb-1" />
              <p className="text-[9px] text-stone-400">Health</p>
              <p className="text-[11px] font-bold text-stone-700 dark:text-slate-200">95/100</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-[12px] font-bold py-2 rounded-xl transition-colors">Make Recipe</button>
            <button className="w-10 flex items-center justify-center bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 rounded-xl hover:bg-stone-200 dark:hover:bg-slate-700 transition-colors">
              <Plus size={14} />
            </button>
          </div>
        </div>
      </FloatingCard>
    </div>
  );
}

// Just a quick icon for the button above
function Plus(props: any) {
  return <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
}

function Slide4Visual() { // hero5.png - Ingredient Rescue
  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none hidden lg:flex">
      <FloatingCard delay={0.4} offsetX="right-[15%] xl:right-[20%]" offsetY="top-[25%] xl:top-[30%]" className="w-[260px]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-sm">
            <Refrigerator size={16} />
          </div>
          <div>
            <h3 className="text-[14px] font-bold text-stone-900 dark:text-white leading-tight">What's in your fridge?</h3>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {["2 Eggs", "Half Onion", "Leftover Rice", "Spinach", "Tomato"].map((ing, i) => (
             <div key={i} className="bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-400 px-2 py-1 rounded-md text-[11px] font-medium flex items-center gap-1">
               <span>{ing}</span>
             </div>
          ))}
        </div>
        
        <div className="bg-stone-50 dark:bg-slate-800 rounded-xl p-3 border border-stone-100 dark:border-slate-700">
          <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-2">AI Suggestion</p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-stone-200 dark:bg-slate-700 rounded-lg overflow-hidden shrink-0">
               <img src="/hero5.png" alt="Food" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[12px] font-bold text-stone-800 dark:text-white leading-snug">Spinach & Tomato Egg Fried Rice</p>
              <p className="text-[10px] text-teal-600 font-medium mt-0.5">100% Match • 15 mins</p>
            </div>
          </div>
        </div>
      </FloatingCard>
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
            
            {/* Subtle Gradient for Text Readability - Only on left side */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#faf9f6]/95 via-[#faf9f6]/80 to-transparent dark:from-slate-950/95 dark:via-slate-950/80 pointer-events-none w-[90%] md:w-[70%] lg:w-[60%]" />
            <div className="absolute inset-0 bg-black/5 dark:bg-black/20 pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Hero Content Layer ── */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 pt-8 pb-12 lg:pt-16 lg:pb-16 min-h-[75vh] flex flex-col justify-center pointer-events-none">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 relative pointer-events-none">
          
          {/* Left column — text */}
          <div className="lg:col-span-6 flex flex-col justify-center items-start text-left z-10 py-6 max-w-2xl pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div key={activeIdx} className="w-full">
                
                <motion.div custom={0} variants={prefersReduced ? {} : textVariants} initial="enter" animate="center" exit="exit" className="mb-4">
                  <span className={\`text-[13px] font-bold uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r \${GRADIENT_MAP[slide.accentColor]}\`}>
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
                      className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-stone-200 dark:border-slate-700 text-stone-700 dark:text-slate-200 hover:border-emerald-600 dark:hover:border-emerald-500 hover:text-emerald-700 px-8 py-4 rounded-full font-bold text-[16px] transition-all flex items-center gap-2 group shadow-sm hover:shadow-md"
                    >
                      <span>{slide.ctaSecondary.label}</span>
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right column — Floating Visual Cards Overlay */}
          <div className="lg:col-span-6 absolute inset-0 lg:static pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div key={\`visual-\${activeIdx}\`} className="absolute inset-0 pointer-events-none">
                <Visual />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* ── Carousel controls & Feature Bar (Bottom Navigation) ── */}
      <div className="relative z-20 border-t border-stone-200/50 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md px-6 sm:px-8 lg:px-12 py-3 mt-auto pointer-events-auto">
        <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-6 order-2 lg:order-1 shrink-0">
            <div className="flex items-center gap-3">
              <button onClick={prev} aria-label="Previous slide" className="w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 shadow-sm border border-stone-200 dark:border-slate-700 flex items-center justify-center text-stone-500 hover:text-emerald-700 transition-colors pointer-events-auto">
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center gap-2">
                {SLIDES.map((s, i) => (
                  <button key={i} onClick={() => goTo(i)} aria-label={\`Slide \${i + 1}\`} className="relative overflow-hidden w-6 h-6 flex items-center justify-center group pointer-events-auto">
                    <span className={\`block rounded-full transition-all duration-300 \${i === activeIdx ? "w-6 h-2 bg-emerald-600" : "w-2 h-2 bg-stone-300 dark:bg-slate-600 group-hover:bg-stone-400"}\`} />
                  </button>
                ))}
              </div>
              <button onClick={next} aria-label="Next slide" className="w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 shadow-sm border border-stone-200 dark:border-slate-700 flex items-center justify-center text-stone-500 hover:text-emerald-700 transition-colors pointer-events-auto">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="flex overflow-x-auto no-scrollbar items-center justify-start lg:justify-end gap-x-8 gap-y-3 w-full lg:w-auto order-1 lg:order-2 pb-2 lg:pb-0 pointer-events-auto">
            {FEATURES.map((f, i) => (
              <Link key={f.label} href={f.href} className={\`relative flex items-center gap-2 text-[13px] font-bold transition group whitespace-nowrap \${pathname === f.href ? "text-emerald-700 dark:text-emerald-400" : "text-stone-500 dark:text-slate-400 hover:text-stone-800 dark:hover:text-slate-200"}\`}>
                <span className={\`transition \${pathname === f.href ? "text-emerald-600" : "text-stone-400 group-hover:text-stone-600 dark:group-hover:text-slate-300"}\`}>
                  {f.icon}
                </span>
                {f.label}
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
`;

fs.writeFileSync(bannerPath, content);
console.log("Updated Banner.tsx successfully with perfect slide visuals and full width styling.");

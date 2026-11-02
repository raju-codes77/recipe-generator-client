"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ChevronLeft, Calendar, Search, Star, Sparkles } from "lucide-react";

const SLIDES = [
  {
    id: 0,
    badge: "AI MEAL PLANNER",
    headline: "Plan Smarter. Eat Better.",
    sub: "Build your full weekly meal plan on a budget, then let Smart Meal Planner serve up personalized recipe recommendations just for you.",
    ctaPrimary: { label: "Plan My Meals", href: "/ai-tools/meal-planner", icon: Calendar },
    ctaSecondary: { label: "Find My Match", href: "/ai-tools/taste-matcher", icon: Search },
    image: "/hero1.png",
  },
  {
    id: 1,
    badge: "YOUR AI COMPANION",
    headline: "One App. Every Tool You Need.",
    sub: "Plan meals, rescue ingredients, build smart shopping lists, and track your nutrition — all inside one beautifully designed AI assistant.",
    ctaPrimary: { label: "Start For Free", href: "/ai-tools", icon: Sparkles },
    ctaSecondary: { label: "View Dashboard", href: "/dashboard/user", icon: Search },
    image: "/hero2.png",
  },
  {
    id: 2,
    badge: "SMART RECIPE DISCOVERY",
    headline: "Discover Recipes. Track Nutrition.",
    sub: "Get AI-curated recipes with full macro breakdowns — protein, carbs, fat and health scores — so every meal works toward your goals.",
    ctaPrimary: { label: "Explore Recipes", href: "/recipes", icon: Search },
    ctaSecondary: { label: "Try AI Tools", href: "/ai-tools", icon: Sparkles },
    image: "/hero3.png",
  },
  {
    id: 3,
    badge: "AI TASTE MATCHER",
    headline: "Discover Perfect Flavor Pairings.",
    sub: "Let AI reveal the best ingredient combinations for your palate — from spicy & umami to floral & earthy, every dish becomes a masterpiece.",
    ctaPrimary: { label: "Try Taste Matcher", href: "/ai-tools/taste-matcher", icon: Sparkles },
    ctaSecondary: { label: "Explore Recipes", href: "/recipes", icon: Search },
    image: "/hero4.png",
  },
  {
    id: 4,
    badge: "COMPLETE AI TOOLKIT",
    headline: "All Your Tools. One Kitchen.",
    sub: "From ingredient rescue to nutrition tracking — FoodCanvas puts every AI-powered cooking tool at your fingertips in one seamless app.",
    ctaPrimary: { label: "Get Started Free", href: "/ai-tools", icon: Sparkles },
    ctaSecondary: { label: "View Dashboard", href: "/dashboard/user", icon: Search },
    image: "/hero5.png",
  }
];

const AUTOPLAY_INTERVAL = 6000;

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isHovered, nextSlide]);

  const PrimaryIcon = SLIDES[currentIndex].ctaPrimary.icon;
  const SecondaryIcon = SLIDES[currentIndex].ctaSecondary.icon;

  return (
    <section 
      className="relative w-full min-h-[100vh] lg:h-[100vh] flex items-center justify-center bg-[#F5F7F5] dark:bg-[#050505] overflow-hidden pt-24 pb-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Decorative blurred leaves / background elements */}
      <div className="absolute top-[15%] left-[2%] w-16 h-16 bg-emerald-500/20 blur-xl rounded-full z-0" />
      <div className="absolute bottom-[20%] left-[45%] w-24 h-24 bg-teal-500/20 blur-2xl rounded-full z-0" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full flex"
          >
            {/* Background Image spanning the right side with Ken Burns effect */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-white dark:bg-[#111111]">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.05 }}
                transition={{ duration: 10, ease: "linear" }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={SLIDES[currentIndex].image}
                  alt={SLIDES[currentIndex].headline}
                  fill
                  className="object-cover object-right lg:object-[center_right] opacity-90 dark:opacity-60"
                  priority
                />
              </motion.div>
              {/* Grand Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-white/70 lg:bg-gradient-to-r lg:from-white lg:via-white/90 lg:to-transparent dark:from-[#111111] dark:via-[#111111]/95 dark:to-[#111111]/70 dark:lg:from-[#111111] dark:lg:via-[#111111]/90 dark:lg:to-transparent" />
            </div>

            {/* Left Content Container */}
            <div className="w-full max-w-[1600px] mx-auto h-full flex items-center px-8 sm:px-12 lg:pl-20 xl:pl-32 py-16 relative z-10">
              <div className="w-full lg:w-[55%] xl:w-[50%] flex flex-col justify-center h-full">
              
              {/* Eyebrow Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2.5 rounded-full mb-8 w-fit border border-emerald-100 dark:border-emerald-500/20"
              >
                <Sparkles size={14} className="text-emerald-600 dark:text-emerald-400" />
                <span className="text-[11px] sm:text-xs font-bold text-emerald-800 dark:text-emerald-300 tracking-widest uppercase">
                  {SLIDES[currentIndex].badge}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-5xl md:text-6xl xl:text-[76px] font-black leading-[1.05] tracking-tight mb-8"
              >
                {SLIDES[currentIndex].headline.split('. ').map((part, i, arr) => (
                  <span key={i} className={`block ${i === 0 ? 'text-emerald-950 dark:text-white' : 'text-emerald-700 dark:text-emerald-400'}`}>
                    {part}{i !== arr.length - 1 ? '.' : ''}
                  </span>
                ))}
              </motion.h1>

              {/* Subtext */}
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg xl:text-xl text-stone-500 dark:text-stone-400 font-medium leading-relaxed max-w-[480px] mb-10"
              >
                {SLIDES[currentIndex].sub}
              </motion.p>

              {/* CTAs */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12"
              >
                <Link 
                  href={SLIDES[currentIndex].ctaPrimary.href} 
                  className="group relative px-8 py-4 bg-emerald-950 dark:bg-emerald-500 text-white font-bold text-[15px] rounded-full transition-all duration-300 shadow-[0_10px_20px_rgba(2,44,34,0.2)] dark:shadow-[0_10px_20px_rgba(16,185,129,0.2)] hover:shadow-[0_15px_30px_rgba(2,44,34,0.3)] hover:-translate-y-1 flex items-center justify-center gap-3 overflow-hidden w-full sm:w-auto"
                >
                  {PrimaryIcon && <PrimaryIcon size={18} className="relative z-10" />}
                  <span className="relative z-10">{SLIDES[currentIndex].ctaPrimary.label}</span>
                  <ChevronRight size={18} strokeWidth={3} className="relative z-10 opacity-70 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-emerald-900 dark:bg-emerald-400 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
                </Link>

                <Link 
                  href={SLIDES[currentIndex].ctaSecondary.href} 
                  className="group px-8 py-4 bg-white dark:bg-[#161616] text-stone-800 dark:text-white font-bold text-[15px] rounded-full transition-all duration-300 border border-stone-200 dark:border-white/10 hover:border-emerald-200 dark:hover:border-emerald-500/50 hover:bg-stone-50 dark:hover:bg-white/5 hover:-translate-y-1 shadow-sm w-full sm:w-auto flex items-center justify-center gap-3"
                >
                  {SecondaryIcon && <SecondaryIcon size={18} className="text-stone-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />}
                  {SLIDES[currentIndex].ctaSecondary.label}
                </Link>
              </motion.div>

              {/* Trust Avatars */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex items-center gap-4"
              >
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-white dark:border-[#111111] bg-stone-200 overflow-hidden relative"><Image src="https://i.pravatar.cc/100?img=1" alt="User" fill className="object-cover" /></div>
                  <div className="w-10 h-10 rounded-full border-2 border-white dark:border-[#111111] bg-stone-300 overflow-hidden relative"><Image src="https://i.pravatar.cc/100?img=2" alt="User" fill className="object-cover" /></div>
                  <div className="w-10 h-10 rounded-full border-2 border-white dark:border-[#111111] bg-stone-400 overflow-hidden relative"><Image src="https://i.pravatar.cc/100?img=3" alt="User" fill className="object-cover" /></div>
                  <div className="w-10 h-10 rounded-full border-2 border-white dark:border-[#111111] bg-stone-500 overflow-hidden relative"><Image src="https://i.pravatar.cc/100?img=4" alt="User" fill className="object-cover" /></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-stone-600 dark:text-stone-300">Trusted by 50K+ home cooks</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-[11px] font-bold text-stone-500 ml-1">4.8/5</span>
                  </div>
                </div>
              </motion.div>
            </div>
            </div>
            
            {/* Right Side Decorative SaaS Floating UI */}
            <div className="hidden lg:flex absolute right-[2%] xl:right-[5%] top-0 w-[45%] xl:w-[40%] h-full z-10 pointer-events-none items-center justify-center">
               {/* iPhone 15 Pro Max Mockup Frame */}
               <motion.div
                 initial={{ opacity: 0, y: 50, rotate: -2 }}
                 animate={{ opacity: 1, y: 0, rotate: 0 }}
                 transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                 className="relative w-[280px] xl:w-[300px] h-[580px] xl:h-[620px] bg-zinc-950 rounded-[50px] xl:rounded-[55px] shadow-[0_30px_60px_rgba(0,0,0,0.4)] border-[12px] xl:border-[14px] border-zinc-900 overflow-visible flex-shrink-0"
               >
                 {/* Physical Buttons */}
                 <div className="absolute -left-[16px] top-[110px] w-1 h-7 bg-zinc-800 rounded-l-md" /> {/* Action */}
                 <div className="absolute -left-[16px] top-[150px] w-1 h-14 bg-zinc-800 rounded-l-md" /> {/* Vol Up */}
                 <div className="absolute -left-[16px] top-[220px] w-1 h-14 bg-zinc-800 rounded-l-md" /> {/* Vol Down */}
                 <div className="absolute -right-[16px] top-[170px] w-1 h-20 bg-zinc-800 rounded-r-md" /> {/* Power */}

                 {/* Screen Content Wrapper */}
                 <div className="absolute inset-0 rounded-[40px] overflow-hidden bg-white dark:bg-[#111111]">
                   
                   {/* Status Bar */}
                   <div className="absolute top-0 w-full h-12 px-6 flex items-center justify-between z-20 pointer-events-none">
                     <span className="text-[11px] font-semibold text-stone-900 dark:text-white mt-1">9:41</span>
                     <div className="flex items-center gap-1.5 mt-1">
                        {/* Cell Signal */}
                        <div className="w-3.5 h-2.5 flex items-end gap-0.5"><div className="w-[2px] h-1 bg-stone-900 dark:bg-white rounded-full"/><div className="w-[2px] h-1.5 bg-stone-900 dark:bg-white rounded-full"/><div className="w-[2px] h-2 bg-stone-900 dark:bg-white rounded-full"/><div className="w-[2px] h-2.5 bg-stone-900 dark:bg-white rounded-full"/></div>
                        {/* Wifi */}
                        <svg className="w-3.5 h-3.5 text-stone-900 dark:text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21L15.6 16.2C14.6 15.45 13.35 15 12 15C10.65 15 9.4 15.45 8.4 16.2L12 21ZM12 3C7.95 3 4.21 4.34 1.2 6.6L3 9C5.5 7.12 8.62 6 12 6C15.38 6 18.5 7.12 21 9L22.8 6.6C19.79 4.34 16.05 3 12 3ZM12 9C9.3 9 6.81 9.89 4.8 11.4L6.6 13.8C8.1 12.67 9.97 12 12 12C14.03 12 15.9 12.67 17.4 13.8L19.2 11.4C17.19 9.89 14.7 9 12 9Z"/></svg>
                        {/* Battery */}
                        <div className="w-[22px] h-3 border border-stone-400 dark:border-stone-500 rounded-[4px] p-[1px] relative"><div className="w-[75%] h-full bg-stone-900 dark:bg-white rounded-[2px]"/><div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-1.5 bg-stone-400 dark:bg-stone-500 rounded-r-sm"/></div>
                     </div>
                   </div>

                   {/* Dynamic Island */}
                   <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[95px] h-[28px] bg-black rounded-full z-30 flex items-center justify-end px-2 shadow-sm">
                      <div className="w-2.5 h-2.5 bg-[#0a0a2a] rounded-full flex items-center justify-center border border-white/10 shadow-[inset_0_0_2px_rgba(255,255,255,0.5)]">
                         <div className="w-[2px] h-[2px] bg-blue-400/50 rounded-full" />
                      </div>
                   </div>
                 
                 <div className="p-4 pt-16">
                    {/* Mockup Header */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full overflow-hidden relative border border-stone-200 dark:border-white/10 shadow-sm">
                         <Image src="https://i.pravatar.cc/100?img=5" alt="User" fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-[9px] text-stone-500 dark:text-stone-400 font-medium leading-none mb-1">Good Morning,</p>
                        <p className="text-xs font-bold text-stone-800 dark:text-white leading-none">Samantha William</p>
                      </div>
                    </div>
                    
                    <p className="text-sm font-black text-stone-900 dark:text-white mb-3 tracking-tight">What's cooking today?</p>
                    
                    {/* Mockup Search */}
                    <div className="h-9 bg-stone-100 dark:bg-white/5 rounded-xl mb-5 flex items-center px-3 gap-2 border border-transparent dark:border-white/5">
                      <Search size={14} className="text-stone-400" />
                      <span className="text-[10px] text-stone-400 font-medium">Search recipes, ingredients...</span>
                    </div>

                    {/* Mockup Categories */}
                    <div className="flex justify-between mb-6">
                       <div className="flex flex-col items-center gap-1.5">
                          <div className="w-[42px] h-[42px] rounded-2xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-lg shadow-sm border border-orange-100 dark:border-orange-500/20 transition-transform hover:scale-105">🍳</div>
                          <span className="text-[8px] font-bold text-stone-600 dark:text-stone-400">Breakfast</span>
                       </div>
                       <div className="flex flex-col items-center gap-1.5">
                          <div className="w-[42px] h-[42px] rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-lg shadow-sm border border-emerald-100 dark:border-emerald-500/20 transition-transform hover:scale-105">🥗</div>
                          <span className="text-[8px] font-bold text-stone-600 dark:text-stone-400">Lunch</span>
                       </div>
                       <div className="flex flex-col items-center gap-1.5">
                          <div className="w-[42px] h-[42px] rounded-2xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center text-lg shadow-sm border border-rose-100 dark:border-rose-500/20 transition-transform hover:scale-105">🍝</div>
                          <span className="text-[8px] font-bold text-stone-600 dark:text-stone-400">Dinner</span>
                       </div>
                       <div className="flex flex-col items-center gap-1.5">
                          <div className="w-[42px] h-[42px] rounded-2xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-lg shadow-sm border border-purple-100 dark:border-purple-500/20 transition-transform hover:scale-105">🥑</div>
                          <span className="text-[8px] font-bold text-stone-600 dark:text-stone-400">Snack</span>
                       </div>
                    </div>

                    {/* Mockup Trending Section */}
                    <div className="flex items-center justify-between mb-3">
                       <span className="text-[11px] font-bold text-stone-800 dark:text-white">Trending Recipe</span>
                       <ChevronRight size={12} className="text-stone-400" />
                    </div>
                    
                    <div className="flex gap-3 overflow-hidden">
                       {/* Recipe Card 1 */}
                       <div className="w-32 h-36 rounded-2xl bg-stone-200 dark:bg-stone-800 relative overflow-hidden shadow-md flex-shrink-0 group">
                          <Image src="/hero3.png" alt="Recipe" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-black/20 to-transparent opacity-80" />
                          <div className="absolute bottom-2.5 left-2.5 right-2.5">
                             <p className="text-[10px] font-bold text-white leading-snug mb-1">Mediterranean Bowl</p>
                             <p className="text-[8px] text-stone-300 font-medium">25 min • 420 kcal</p>
                          </div>
                          <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                             <span className="text-[10px]">❤️</span>
                          </div>
                       </div>
                       {/* Recipe Card 2 (partially visible) */}
                       <div className="w-32 h-36 rounded-2xl bg-stone-200 dark:bg-stone-800 relative overflow-hidden shadow-md flex-shrink-0 group">
                          <Image src="/hero4.png" alt="Recipe" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-black/20 to-transparent opacity-80" />
                          <div className="absolute bottom-2.5 left-2.5 right-2.5">
                             <p className="text-[10px] font-bold text-white leading-snug mb-1">Avocado Toast</p>
                             <p className="text-[8px] text-stone-300 font-medium">10 min • 320 kcal</p>
                          </div>
                          <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                             <span className="text-[10px]">🤍</span>
                          </div>
                       </div>
                    </div>
                 </div>
                 </div>
               </motion.div>

               {/* Floating Label 1 */}
               <motion.div
                 initial={{ opacity: 0, x: -30 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.7, duration: 0.6 }}
                 className="absolute top-[20%] -left-[10%] xl:-left-[15%] bg-white/95 dark:bg-[#161616]/95 backdrop-blur-md p-3 pr-6 rounded-2xl shadow-xl flex items-center gap-3 border border-stone-100 dark:border-white/5"
               >
                  <div className="w-10 h-10 bg-lime-100 dark:bg-lime-900/30 rounded-xl flex items-center justify-center text-lg">🌿</div>
                  <div>
                    <p className="text-sm font-bold text-stone-900 dark:text-white">Weekly Meal Plan</p>
                    <p className="text-[10px] text-stone-500">Healthy • Tasty • Budget Friendly</p>
                  </div>
               </motion.div>

               {/* Floating Label 2 */}
               <motion.div
                 initial={{ opacity: 0, x: 30 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.9, duration: 0.6 }}
                 className="absolute bottom-[20%] -right-[5%] xl:-right-[10%] bg-white/95 dark:bg-[#161616]/95 backdrop-blur-md px-5 py-4 rounded-2xl shadow-xl border border-stone-100 dark:border-white/5 flex items-center gap-3"
               >
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center text-lg">✨</div>
                  <div>
                     <p className="text-sm font-bold text-stone-900 dark:text-white leading-tight">Personalized</p>
                     <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 leading-tight">Recipes</p>
                  </div>
               </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Banner Controls - Moved to left side to avoid phone overlap */}
        <div className="absolute bottom-10 left-8 sm:left-12 lg:left-20 xl:left-32 flex items-center gap-6 z-30">
          <button 
            onClick={prevSlide} 
            className="w-10 h-10 rounded-full bg-white dark:bg-[#161616] border border-stone-200 dark:border-white/10 shadow-md flex items-center justify-center text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex items-center gap-3">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(index)}
                className="group py-2 px-1"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index === currentIndex 
                      ? "w-8 bg-emerald-800 dark:bg-emerald-400" 
                      : "w-2 bg-stone-300 dark:bg-stone-700 group-hover:bg-stone-400 dark:group-hover:bg-stone-500"
                  }`} 
                />
              </button>
            ))}
          </div>

          <button 
            onClick={nextSlide} 
            className="w-10 h-10 rounded-full bg-white dark:bg-[#161616] border border-stone-200 dark:border-white/10 shadow-md flex items-center justify-center text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
    </section>
  );
}

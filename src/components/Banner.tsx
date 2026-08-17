"use client";
import Image from "next/image";

import { ArrowRight, Sparkles, Activity, Leaf, Users, Flame, Utensils } from "lucide-react";

export default function Banner() {
  return (
    <section className="relative w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 lg:pt-10 lg:pb-16 overflow-hidden">

      {/* Subtle Background Decorative Orbital Line */}
      <div className="absolute top-1/4 right-10 w-[550px] h-[550px] rounded-full border border-dashed border-emerald-200/60 dark:border-emerald-800/30 -z-10 pointer-events-none hidden lg:block" />

      {/* Main Grid: Left Hero Content & Right Hero Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">

        {/* Left Column (Span 6) */}
        <div className="lg:col-span-6 flex flex-col items-start text-left z-10">

          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-6">
            <span>AI-Powered Cooking Platform</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.08] mb-6">
            Cook <br className="hidden sm:block" />
            Smarter. <br />
            <span className="text-emerald-700 dark:text-emerald-400">
              Eat Healthier<span className="text-orange-500 inline-block ml-0.5">.</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg max-w-md font-normal leading-relaxed mb-8">
            AI-powered recipe generator, <br className="hidden sm:block" />
            food analyzer & cooking community <br className="hidden sm:block" />
            all in one place.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <button className="bg-[#ff6b00] hover:bg-[#e66000] text-white px-7 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all shadow-lg shadow-orange-500/25 flex items-center gap-2 group">
              <span>Get Started</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button className="bg-transparent border-2 border-emerald-600 dark:border-emerald-500 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 px-7 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all flex items-center gap-2 group">
              <span>Explore Recipes</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Social Proof Avatars & Join Text */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2.5">
              <img
                className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="User 1"
              />
              <img
                className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="User 2"
              />
              <img
                className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 object-cover"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                alt="User 3"
              />
              <img
                className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 object-cover"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                alt="User 4"
              />
            </div>
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-snug">
              <span>Join </span>
              <span className="font-bold text-orange-500">50K+</span>
              <span> happy users</span>
              <br />
              <span className="text-slate-400 dark:text-slate-500">cooking healthier every day!</span>
            </div>
          </div>

        </div>

        {/* Right Column: Hero Bowl & Floating Badges (Span 6) */}
        <div className="lg:col-span-6 relative flex justify-center items-center">

          {/* Subtle Back Glow */}
          <div className="absolute w-[450px] h-[450px] bg-emerald-300/20 dark:bg-emerald-600/15 rounded-full blur-3xl -z-10" />

          {/* Image Container (Replacing Video) */}
          <div className="relative w-full max-w-[540px] aspect-square flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-3xl lg:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-emerald-900/10 group">
            
            <Image
              src="/hero2.png"
              alt="Healthy Food Bowl"
              fill
              priority
              className="object-cover scale-105 transition-transform duration-[15000ms] ease-in-out group-hover:scale-110"
            />

            {/* AI Dynamic Scanning Effect Layer */}
            <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-70">
              <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-ai-scan shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
              <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,1)]" />
              <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-orange-500 animate-ping shadow-[0_0_10px_rgba(249,115,22,1)]" style={{ animationDuration: '3s' }} />
            </div>

            {/* Floating Badge 1: AI Recipe Generator (Top Left) */}
            <div className="absolute top-[8%] left-[2%] sm:left-[5%] bg-white dark:bg-slate-800 shadow-xl border border-gray-100 dark:border-slate-700/60 rounded-2xl p-2.5 px-3.5 flex items-center gap-3 animate-pulse" style={{ animationDuration: '4s' }}>
              <div className="w-9 h-9 rounded-full bg-orange-100 dark:bg-orange-950/60 flex items-center justify-center text-orange-500">
                <Sparkles size={18} />
              </div>
              <div className="text-left">
                <p className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-white leading-tight">
                  AI Recipe<br />Generator
                </p>
              </div>
            </div>

            {/* Floating Badge 2: Nutrition Analyzer (Bottom Left) */}
            <div className="absolute bottom-[20%] left-[2%] sm:left-[5%] bg-white dark:bg-slate-800 shadow-xl border border-gray-100 dark:border-slate-700/60 rounded-2xl p-2.5 px-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600">
                <Activity size={18} />
              </div>
              <div className="text-left">
                <p className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-white leading-tight">
                  Nutrition<br />Analyzer
                </p>
              </div>
            </div>

            {/* Floating Badge 3: Smart Flavor Pairing (Middle Right) */}
            <div className="absolute top-[48%] right-[-2%] sm:right-[2%] bg-white dark:bg-slate-800 shadow-xl border border-gray-100 dark:border-slate-700/60 rounded-2xl p-2.5 px-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600">
                <Leaf size={18} />
              </div>
              <div className="text-left">
                <p className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-white leading-tight">
                  Smart<br />Flavor Pairing
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Floating Stats Card Bar */}
      <div className="mt-14 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none p-6 sm:p-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 dark:divide-slate-800">

          {/* Stat 1: Recipes Created */}
          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4 first:pt-0 first:px-0">
            <div className="w-12 h-12 rounded-full bg-emerald-100/70 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 shrink-0">
              <ChefHatIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">10K+</h3>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">Recipes Created</p>
            </div>
          </div>

          {/* Stat 2: Happy Users */}
          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100/70 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 shrink-0">
              <Users size={22} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">50K+</h3>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">Happy Users</p>
            </div>
          </div>

          {/* Stat 3: Meals Cooked */}
          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
            <div className="w-12 h-12 rounded-full bg-orange-100/70 dark:bg-orange-950/60 flex items-center justify-center text-orange-500 shrink-0">
              <SoupIcon className="w-6 h-6 text-orange-500 dark:text-orange-400" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">250K+</h3>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">Meals Cooked</p>
            </div>
          </div>

          {/* Stat 4: Ingredients Saved from Waste */}
          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100/70 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 shrink-0">
              <Leaf size={22} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">1M+</h3>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                Ingredients Saved <br className="hidden lg:block" />from Waste
              </p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}

// Custom Chef Hat SVG Component for pixel accuracy
function ChefHatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 19h12M6 16h12M12 3a5 5 0 00-4.546 2.916A4.5 4.5 0 005 10.5c0 1.954 1.242 3.619 3 4.255v1.245h8v-1.245c1.758-.636 3-2.301 3-4.255a4.5 4.5 0 00-2.454-4.584A5 5 0 0012 3z" />
    </svg>
  );
}

// Custom Soup/Meal SVG Component
function SoupIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m-4-3v3m8-3v3M4 11h16a1 1 0 011 1v2a7 7 0 01-14 0v-2a1 1 0 011-1zM5 19h14" />
    </svg>
  );
}

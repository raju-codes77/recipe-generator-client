"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  FiBookOpen, FiFolder, FiAward, FiPieChart, FiPlusCircle, 
  FiTrendingUp, FiCheckCircle, FiChevronRight, FiChevronLeft
} from "react-icons/fi";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, CartesianGrid } from "recharts";

// Mock Data for User Calorie/Nutrition Intake Trend
const calorieData = [
  { day: "Mon", calories: 1650 },
  { day: "Tue", calories: 1820 },
  { day: "Wed", calories: 1950 },
  { day: "Thu", calories: 2100 },
  { day: "Fri", calories: 1880 },
  { day: "Sat", calories: 1760 },
  { day: "Sun", calories: 1980 },
];

export default function UserDashboardPage() {
  return (
    <div className="space-y-6">
      {/* 1. Welcome Header Banner */}
      <div className="relative w-full h-48 sm:h-56 rounded-3xl overflow-hidden shadow-sm flex items-center p-6 sm:p-10">
        <Image 
          src="/dashboard_banner_1788270745532.jpg" 
          alt="Dashboard Banner" 
          fill 
          className="object-cover"
          priority
        />
        {/* Soft white-to-transparent overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent dark:from-black/95 dark:via-black/80"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between w-full">
          <div className="flex items-start gap-4 sm:gap-6">
            <div className="hidden sm:flex w-16 h-16 rounded-full bg-[#2F8F46] text-white items-center justify-center text-3xl shadow-lg shadow-[#2F8F46]/30 shrink-0">
              👨‍🍳
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                Welcome back, Chef! <span className="text-2xl">👋</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1 max-w-xl leading-relaxed font-medium">
                Ready to achieve your health goals today? Generate a new AI recipe or track your daily nutrition intake effortlessly.
              </p>
              
              <div className="flex items-center gap-4 mt-4 text-[11px] font-bold text-gray-700 dark:text-gray-200">
                <span className="flex items-center gap-1.5"><span className="text-orange-500 text-sm">🔥</span> 12 Day Streak</span>
                <span className="text-gray-300 dark:text-gray-600">|</span>
                <span className="flex items-center gap-1.5"><span className="text-yellow-500 text-sm">⭐</span> Level 4 Chef</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 sm:mt-0 relative group">
            <button className="px-5 py-3 bg-[#117A38] hover:bg-[#0E602A] text-white font-bold rounded-2xl shadow-xl shadow-[#117A38]/30 transition-all flex items-center gap-2 text-sm z-10 relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                <FiPlusCircle size={18} />
                Generate New Recipe
              </span>
            </button>
            <div className="absolute -right-8 -top-8 text-[#117A38]/40 dark:text-[#B7E35F]/40 font-cursive text-sm rotate-12 pointer-events-none group-hover:rotate-6 transition-transform">
              Let AI cook~
            </div>
          </div>
        </div>
      </div>

      {/* 2. User Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Saved Recipes */}
        <div className="p-5 rounded-2xl bg-white dark:bg-black/40 border border-gray-100 dark:border-[#89986D]/20 shadow-sm flex flex-col justify-between h-32">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <FiBookOpen size={18} />
              </div>
              <div>
                <h4 className="text-[11px] text-gray-500 dark:text-[#F6F0D7]/60 font-semibold uppercase tracking-wider">My Recipes</h4>
                <h2 className="text-2xl font-black text-gray-900 dark:text-[#F6F0D7] leading-none mt-0.5">24 <span className="text-xs font-semibold text-gray-400">Items</span></h2>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-between mt-2">
            <p className="text-[10px] text-gray-400 dark:text-[#F6F0D7]/40 font-medium">3 added this week</p>
            {/* Mock Sparkline */}
            <svg className="w-16 h-6 text-emerald-500" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="0,25 20,20 40,25 60,10 80,15 100,5" />
              <circle cx="100" cy="5" r="2.5" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Favorite Collections */}
        <div className="p-5 rounded-2xl bg-white dark:bg-black/40 border border-gray-100 dark:border-[#89986D]/20 shadow-sm flex flex-col justify-between h-32">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <FiFolder size={18} />
              </div>
              <div>
                <h4 className="text-[11px] text-gray-500 dark:text-[#F6F0D7]/60 font-semibold uppercase tracking-wider">Collections</h4>
                <h2 className="text-2xl font-black text-gray-900 dark:text-[#F6F0D7] leading-none mt-0.5">8 <span className="text-xs font-semibold text-gray-400">Folders</span></h2>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-between mt-2">
            <p className="text-[10px] text-gray-400 dark:text-[#F6F0D7]/40 font-medium">2 updated this week</p>
            {/* Mock Sparkline */}
            <svg className="w-16 h-6 text-purple-500" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="0,20 20,25 40,15 60,20 80,10 100,15" />
              <circle cx="100" cy="15" r="2.5" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Daily Calorie Intake */}
        <div className="p-5 rounded-2xl bg-white dark:bg-black/40 border border-gray-100 dark:border-[#89986D]/20 shadow-sm flex flex-col justify-between h-32">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-orange-500 dark:text-orange-400">
                <span className="text-lg">🔥</span>
              </div>
              <div>
                <h4 className="text-[11px] text-gray-500 dark:text-[#F6F0D7]/60 font-semibold uppercase tracking-wider">Avg. Calories</h4>
                <h2 className="text-2xl font-black text-gray-900 dark:text-[#F6F0D7] leading-none mt-0.5">1,980 <span className="text-xs font-semibold text-gray-400">kcal</span></h2>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-between mt-2">
            <p className="text-[10px] text-gray-400 dark:text-[#F6F0D7]/40 font-medium">Target: 2,000 kcal/day</p>
            {/* Mock Sparkline */}
            <svg className="w-16 h-6 text-orange-500" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="0,15 20,20 40,10 60,15 80,5 100,10" />
              <circle cx="100" cy="10" r="2.5" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Active Challenges */}
        <div className="p-5 rounded-2xl bg-white dark:bg-black/40 border border-gray-100 dark:border-[#89986D]/20 shadow-sm flex flex-col justify-between h-32">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-500 dark:text-blue-400">
                <FiCheckCircle size={18} />
              </div>
              <div>
                <h4 className="text-[11px] text-gray-500 dark:text-[#F6F0D7]/60 font-semibold uppercase tracking-wider">Challenges</h4>
                <h2 className="text-2xl font-black text-gray-900 dark:text-[#F6F0D7] leading-none mt-0.5">2 <span className="text-xs font-semibold text-gray-400">Active</span></h2>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-between mt-2">
            <p className="text-[10px] text-gray-400 dark:text-[#F6F0D7]/40 font-medium">Keep going strong!</p>
            {/* Mock Sparkline */}
            <svg className="w-16 h-6 text-blue-500" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="0,25 20,20 40,15 60,25 80,10 100,5" />
              <circle cx="100" cy="5" r="2.5" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>

      {/* 3. Middle Section: Calorie Trend Chart & Active Challenges */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Calorie Trend Chart (Spans 2 cols) */}
        <div className="xl:col-span-2 p-6 rounded-3xl bg-white dark:bg-black/40 border border-gray-100 dark:border-[#89986D]/20 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-[#F6F0D7]">Weekly Calorie Intake Trend</h3>
              <p className="text-xs text-gray-400 dark:text-[#F6F0D7]/60 font-medium mt-0.5">Track your daily calorie intake and consistency</p>
            </div>
            <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-gray-50 dark:bg-[#89986D]/10 hover:bg-gray-100 rounded-lg text-gray-700 dark:text-[#F6F0D7] border border-gray-200 dark:border-transparent transition-colors">
              This Week <span className="text-[10px]">▼</span>
            </button>
          </div>
          
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={calorieData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#117A38" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#117A38" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#A0AEC0" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#1A202C' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="calories" 
                  stroke="#117A38" 
                  fillOpacity={1} 
                  fill="url(#colorCalories)" 
                  strokeWidth={2.5}
                  activeDot={{ r: 6, fill: "#117A38", stroke: "#fff", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
            
            {/* Custom Target Line Label Overlay (Mocked) */}
            <div className="absolute right-0 top-14 text-[9px] font-bold text-gray-400 flex flex-col items-end">
              <span>Target: 2,000 kcal</span>
              <div className="w-16 border-t border-dashed border-gray-300 mt-1"></div>
            </div>
          </div>

          {/* Stats Bar under chart */}
          <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">📊</div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase">Avg. Intake</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">1,880 <span className="text-[10px] text-gray-400">kcal</span></p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">🔥</div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase">Highest Day</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">2,100 <span className="text-[10px] text-gray-400">kcal</span></p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">💧</div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase">Lowest Day</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">1,650 <span className="text-[10px] text-gray-400">kcal</span></p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border-4 border-[#117A38] border-r-gray-100 flex items-center justify-center"></div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase">Consistency</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">85%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Challenges Progress */}
        <div className="p-6 rounded-3xl bg-white dark:bg-black/40 border border-gray-100 dark:border-[#89986D]/20 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-[#F6F0D7]">Active Challenges</h3>
              <a href="#" className="text-xs font-bold text-[#117A38] hover:underline">View All</a>
            </div>
            
            <div className="space-y-6">
              {/* Challenge 1 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-[#F6F0D7]">7-Day Healthy Eating</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#117A38] dark:text-[#B7E35F]">5 / 7</span>
                    <span className="text-[10px] text-gray-400 font-medium">Days</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-full h-2.5 bg-gray-100 dark:bg-[#89986D]/20 rounded-full overflow-hidden">
                    <div className="h-full bg-[#117A38] rounded-full" style={{ width: "71%" }}></div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#EAF7E8] flex items-center justify-center shrink-0 shadow-sm border border-white">
                    🥗
                  </div>
                </div>
              </div>

              {/* Challenge 2 */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-[#F6F0D7]">Sugar Detox Challenge</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#FF9F43]">300 / 500</span>
                    <span className="text-[10px] text-gray-400 font-medium">pts</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-full h-2.5 bg-gray-100 dark:bg-[#89986D]/20 rounded-full overflow-hidden">
                    <div className="h-full bg-[#FF9F43] rounded-full" style={{ width: "60%" }}></div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0 shadow-sm border border-white">
                    🍹
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-[#F5FAF6] dark:bg-[#2F8F46]/5 rounded-2xl border border-[#2F8F46]/10 flex items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                <span className="text-yellow-500">🏆</span> You're on fire! <span className="text-orange-500">🔥</span>
              </h4>
              <p className="text-[10px] text-gray-500 mt-1 font-medium leading-relaxed">
                Complete 2 more challenges to earn a special badge!
              </p>
            </div>
            <div className="w-10 h-10 bg-[#117A38] rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-[#117A38]/20">
              <span className="text-lg">⭐</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Section: Recent AI Generated Recipes & Quick Tips */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent AI Generations (Spans 2 cols) */}
        <div className="xl:col-span-2 p-6 rounded-3xl bg-white dark:bg-black/40 border border-gray-100 dark:border-[#89986D]/20 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-[#F6F0D7]">Recent AI Recipe Generations</h3>
            <a href="#" className="text-xs font-bold text-[#117A38] hover:underline">View All</a>
          </div>
          
          <div className="relative flex items-center group">
            {/* Left Arrow */}
            <button className="absolute -left-3 z-10 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 shadow-md hover:bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">
              <FiChevronLeft size={16} />
            </button>

            {/* Horizontal Scroll Container */}
            <div className="flex gap-4 overflow-x-auto pb-4 pt-2 px-1 snap-x snap-mandatory hide-scrollbar w-full">
              {[
                { title: "Avocado Lime Wellness Bowl", time: "20 min", cal: "350 kcal", category: "High Protein", img: "/recipe_bowl_1788270757820.jpg" },
                { title: "Creamy Spinach Pasta", time: "25 min", cal: "420 kcal", category: "Comfort Food", img: "/recipe_pasta_1788270770231.jpg" },
                { title: "Berry Boost Smoothie", time: "10 min", cal: "280 kcal", category: "Low Calorie", img: "/recipe_smoothie_1788270782693.jpg" },
              ].map((rec, i) => (
                <div key={i} className="min-w-[240px] sm:min-w-[280px] bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow snap-start flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-inner">
                    <Image src={rec.img} alt={rec.title} fill className="object-cover" />
                    <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-green-500 text-white text-[8px] font-bold rounded uppercase tracking-wider shadow-sm">
                      NEW
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-tight mb-1">{rec.title}</h4>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium mb-1.5">
                      <span>{rec.cal}</span>
                      <span>•</span>
                      <span>{rec.time}</span>
                    </div>
                    <span className="inline-block text-[9px] font-bold px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">
                      {rec.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button className="absolute -right-3 z-10 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 shadow-md hover:bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">
              <FiChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Daily Nutrition Tip */}
        <div className="p-6 rounded-3xl bg-white dark:bg-black/40 border border-gray-100 dark:border-[#89986D]/20 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-lg font-bold text-gray-900 dark:text-[#F6F0D7]">Daily Nutrition Tip</h3>
            <a href="#" className="text-xs font-bold text-[#117A38] hover:underline">View All</a>
          </div>
          
          <div className="relative z-10 pr-20">
            <span className="text-4xl text-gray-200 dark:text-gray-700 font-serif absolute -top-4 -left-2 leading-none">“</span>
            <p className="text-[11px] sm:text-xs text-gray-600 dark:text-[#F6F0D7]/80 leading-relaxed font-medium relative z-10 italic pl-3">
              Hydration is key to a healthier life. Drink at least 8 glasses of water before your first meal to boost metabolism and energy.
            </p>
            <p className="text-[9px] font-bold text-gray-400 mt-3 pl-3 uppercase tracking-wider">
              - FoodCanvas Nutrition Team
            </p>
          </div>

          <div className="absolute -bottom-8 -right-8 w-48 h-48 opacity-90 mix-blend-multiply dark:mix-blend-normal pointer-events-none">
            <Image src="/water_glass_1788270793954.jpg" alt="Water Glass" fill className="object-contain" />
          </div>
        </div>
      </div>
      
      {/* Add CSS to hide scrollbar for the horizontal list */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
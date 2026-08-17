"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  FiBookOpen, FiHeart, FiAward, FiPieChart, FiPlusCircle, 
  FiClock, FiTrendingUp, FiSmile, FiCheckCircle, FiChevronRight 
} from "react-icons/fi";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";

// Mock Data for User Calorie/Nutrition Intake Trend
const calorieData = [
  { day: "Sun", calories: 1850 },
  { day: "Mon", calories: 2100 },
  { day: "Tue", calories: 1950 },
  { day: "Wed", calories: 2300 },
  { day: "Thu", calories: 2000 },
  { day: "Fri", calories: 2150 },
  { day: "Sat", calories: 1900 },
];

export default function UserDashboardPage() {
  return (
    <div className="space-y-6">
      {/* 1. Welcome Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-gradient-to-r from-[#2F8F46] to-[#176B35] text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="absolute right-4 -bottom-6 opacity-10 text-9xl">🥗</div>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Welcome back, Chef! 👋
          </h1>
          <p className="text-sm text-white/80 mt-1 max-w-xl">
            Ready to achieve your health goals today? Generate a new AI recipe or track your daily nutrition intake effortlessly.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="px-5 py-2.5 bg-[#FF9F43] hover:bg-[#FF9F43]/90 text-white font-bold rounded-xl shadow-lg transition flex items-center gap-2 text-sm">
            <FiPlusCircle size={18} />
            <span>Generate New Recipe</span>
          </button>
        </div>
      </div>

      {/* 2. User Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Saved Recipes */}
        <div className="p-5 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="p-2.5 rounded-xl bg-[#EAF7E8] dark:bg-[#2F8F46]/20 text-[#2F8F46] dark:text-[#B7E35F] text-lg"><FiBookOpen /></span>
            <span className="text-[11px] font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded-full">Active</span>
          </div>
          <h4 className="text-xs text-gray-500 dark:text-[#F6F0D7]/60 font-medium">My Recipes</h4>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F6F0D7] mt-1">24 Items</h2>
          <p className="text-[10px] text-gray-400 dark:text-[#F6F0D7]/40 mt-1">3 added this week</p>
        </div>

        {/* Favorite Collections */}
        <div className="p-5 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="p-2.5 rounded-xl bg-pink-50 dark:bg-pink-500/20 text-pink-600 dark:text-pink-300 text-lg"><FiHeart /></span>
            <span className="text-[11px] font-semibold text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-500/10 px-2 py-0.5 rounded-full">Loved</span>
          </div>
          <h4 className="text-xs text-gray-500 dark:text-[#F6F0D7]/60 font-medium">Collections</h4>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F6F0D7] mt-1">8 Folders</h2>
          <p className="text-[10px] text-gray-400 dark:text-[#F6F0D7]/40 mt-1">Organized meals</p>
        </div>

        {/* Daily Calorie Intake */}
        <div className="p-5 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="p-2.5 rounded-xl bg-[#FFF0DD] dark:bg-[#FF9F43]/20 text-[#FF9F43] text-lg"><FiTrendingUp /></span>
            <span className="text-[11px] font-semibold text-[#FF9F43] bg-orange-50 dark:bg-[#FF9F43]/10 px-2 py-0.5 rounded-full">On Track</span>
          </div>
          <h4 className="text-xs text-gray-500 dark:text-[#F6F0D7]/60 font-medium">Avg. Calories</h4>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F6F0D7] mt-1">1,980 kcal</h2>
          <p className="text-[10px] text-gray-400 dark:text-[#F6F0D7]/40 mt-1">Target: 2,000 kcal/day</p>
        </div>

        {/* Active Challenges */}
        <div className="p-5 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="p-2.5 rounded-xl bg-yellow-50 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-300 text-lg"><FiAward /></span>
            <span className="text-[11px] font-semibold text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-500/10 px-2 py-0.5 rounded-full">2 Active</span>
          </div>
          <h4 className="text-xs text-gray-500 dark:text-[#F6F0D7]/60 font-medium">Challenges</h4>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F6F0D7] mt-1">7-Day Clean</h2>
          <p className="text-[10px] text-gray-400 dark:text-[#F6F0D7]/40 mt-1">5 days completed</p>
        </div>
      </div>

      {/* 3. Middle Section: Calorie Trend Chart & Active Challenges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calorie Trend Chart (Spans 2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-[#F6F0D7]">Weekly Calorie Intake Trend</h3>
              <p className="text-xs text-gray-400 dark:text-[#F6F0D7]/60">Track your daily calorie burn and consumption</p>
            </div>
            <span className="text-xs px-3 py-1 bg-gray-100 dark:bg-[#89986D]/10 rounded-lg text-gray-600 dark:text-[#F6F0D7]">This Week ▾</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={calorieData}>
                <XAxis dataKey="day" stroke="#89986D" fontSize={11} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="calories" stroke="#2F8F46" fill="#2F8F46" fillOpacity={0.15} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Current Challenges Progress */}
        <div className="p-6 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-[#F6F0D7] mb-1">Active Challenges</h3>
            <p className="text-xs text-gray-400 dark:text-[#F6F0D7]/60 mb-4">Keep pushing your wellness goals</p>
            
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#89986D]/5 border border-gray-100 dark:border-[#89986D]/10">
                <div className="flex justify-between text-xs font-semibold text-gray-900 dark:text-[#F6F0D7] mb-1">
                  <span>7-Day Healthy Eating</span>
                  <span className="text-[#2F8F46] dark:text-[#B7E35F]">5/7 Days</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-[#89986D]/20 rounded-full overflow-hidden">
                  <div className="h-full bg-[#2F8F46] rounded-full" style={{ width: "70%" }}></div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#89986D]/5 border border-gray-100 dark:border-[#89986D]/10">
                <div className="flex justify-between text-xs font-semibold text-gray-900 dark:text-[#F6F0D7] mb-1">
                  <span>Sugar Detox Challenge</span>
                  <span className="text-[#FF9F43]">3/10 Days</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-[#89986D]/20 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF9F43] rounded-full" style={{ width: "30%" }}></div>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full mt-4 py-2 text-xs font-semibold text-center text-[#2F8F46] dark:text-[#B7E35F] bg-[#EAF7E8] dark:bg-[#2F8F46]/10 rounded-xl hover:bg-[#EAF7E8]/80 transition">
            Browse All Challenges →
          </button>
        </div>
      </div>

      {/* 4. Bottom Section: Recent AI Generated Recipes & Quick Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent AI Generations (Spans 2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 dark:text-[#F6F0D7]">Recent AI Recipe Generations</h3>
            <span className="text-xs text-[#2F8F46] dark:text-[#B7E35F] font-semibold cursor-pointer">View All</span>
          </div>
          <div className="space-y-3">
            {[
              { title: "Avocado Green Wellness Bowl", time: "2 hours ago", cal: "320 kcal", category: "Healthy" },
              { title: "Mint & Spinach Detox Smoothie", time: "Yesterday", cal: "180 kcal", category: "Beverage" },
              { title: "High-Protein Quinoa Salad", time: "3 days ago", cal: "450 kcal", category: "Protein" },
            ].map((rec, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#89986D]/5 transition border border-gray-100 dark:border-[#89986D]/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF7E8] dark:bg-[#2F8F46]/20 text-[#2F8F46] dark:text-[#B7E35F] flex items-center justify-center font-bold">
                    🥗
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-[#F6F0D7]">{rec.title}</h4>
                    <p className="text-[10px] text-gray-400 dark:text-[#F6F0D7]/60">{rec.time} • {rec.cal}</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#EAF7E8] dark:bg-[#2F8F46]/20 text-[#2F8F46] dark:text-[#B7E35F]">
                  {rec.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Nutrition Tip */}
        <div className="p-6 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">💡</span>
              <h3 className="font-bold text-gray-900 dark:text-[#F6F0D7]">Daily Nutrition Tip</h3>
            </div>
            <p className="text-xs text-gray-600 dark:text-[#F6F0D7]/80 leading-relaxed">
              "Hydration is key to metabolism! Try drinking at least 500ml of water before your first meal to boost your morning energy and digestion."
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-[#89986D]/10 flex items-center justify-between text-xs text-gray-400 dark:text-[#F6F0D7]/60">
            <span>FlavorAI Health Bot</span>
            <span className="text-[#2F8F46] dark:text-[#B7E35F] font-semibold">Updated Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}
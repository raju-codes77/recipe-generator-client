"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiPlusCircle, FiBookOpen, FiHeart, FiTrendingUp, FiSmile, FiClock } from "react-icons/fi";

export default function UserDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-3xl bg-gradient-to-r from-[#2F8F46] to-[#176B35] text-white shadow-xl relative overflow-hidden"
      >
        <div className="absolute right-4 -bottom-6 opacity-10 text-9xl">🥗</div>
        <div className="flex items-center space-x-3 mb-2">
          <FiSmile className="text-3xl text-[#B7E35F]" />
          <h1 className="text-2xl lg:text-3xl font-bold">Welcome back, Chef!</h1>
        </div>
        <p className="text-white/90 max-w-xl text-sm lg:text-base">
          Ready to whip up something healthy today? Use our AI recipe generator to create custom wellness meals based on your available ingredients.
        </p>
        <button className="mt-6 px-6 py-3 bg-[#FF9F43] hover:bg-[#FF9F43]/90 text-white font-bold rounded-2xl shadow-lg transition-all flex items-center space-x-2">
          <FiPlusCircle size={18} />
          <span>Generate New Recipe</span>
        </button>
      </motion.div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="p-3 rounded-xl bg-[#EAF7E8] dark:bg-[#2F8F46]/20 text-[#2F8F46] dark:text-[#B7E35F] text-xl"><FiBookOpen /></span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EAF7E8] text-[#2F8F46]">Active</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-[#F6F0D7]">14 Recipes</h3>
          <p className="text-sm text-gray-500 dark:text-[#F6F0D7]/60">Saved in your cookbook</p>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="p-3 rounded-xl bg-[#FFF0DD] dark:bg-[#FF9F43]/20 text-[#FF9F43] text-xl"><FiTrendingUp /></span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FFF0DD] text-[#FF9F43]">Healthy</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-[#F6F0D7]">1,850 kcal</h3>
          <p className="text-sm text-gray-500 dark:text-[#F6F0D7]/60">Average daily intake</p>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="p-3 rounded-xl bg-[#D8F3DC]/30 dark:bg-[#D8F3DC]/20 text-[#176B35] dark:text-[#D8F3DC] text-xl"><FiHeart /></span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EAF7E8] text-[#2F8F46]">Favorites</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-[#F6F0D7]">8 Items</h3>
          <p className="text-sm text-gray-500 dark:text-[#F6F0D7]/60">Loved wellness meals</p>
        </motion.div>
      </div>

      {/* Recent Activity Section */}
      <div className="p-6 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-[#F6F0D7] mb-6 flex items-center space-x-2">
          <FiClock className="text-[#2F8F46] dark:text-[#B7E35F]" />
          <span>Recent AI Generations</span>
        </h2>
        <div className="space-y-4">
          {[
            { name: "Avocado Green Wellness Bowl", time: "2 hours ago", cal: "320 kcal" },
            { name: "Mint & Spinach Detox Smoothie", time: "Yesterday", cal: "180 kcal" },
            { name: "High-Protein Quinoa Salad", time: "3 days ago", cal: "450 kcal" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-[#89986D]/5 border border-gray-100 dark:border-[#89986D]/10 hover:border-[#2F8F46] transition">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-[#EAF7E8] dark:bg-[#2F8F46]/20 text-[#2F8F46] dark:text-[#B7E35F] flex items-center justify-center text-xl font-bold">
                  🥗
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-[#F6F0D7]">{item.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-[#F6F0D7]/50">{item.time}</p>
                </div>
              </div>
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#EAF7E8] dark:bg-[#2F8F46]/20 text-[#2F8F46] dark:text-[#B7E35F]">
                {item.cal}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
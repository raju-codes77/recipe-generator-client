"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX, FiArrowRight, FiCpu } from "react-icons/fi";
import { SparkleIcon, SpeakerIcon } from "lucide-react";

export default function AIAssistantPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatResponse, setChatResponse] = useState<string | null>(null);

  const popularPrompts = [
    "Quick dinner with chicken",
    "Low calorie breakfast",
    "Vegan pasta recipe",
    "Healthy smoothie ideas",
  ];

  // ব্যাকএন্ড এপিআই কল করার ফাংশন
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || loading) return;

    // ইউজার যে কুয়েরিটি করছে তা সাময়িকভাবে সেভ করে রাখা যেতে পারে যদি প্রয়োজন হয়
    const currentQuery = searchQuery;

    try {
      setLoading(true);
      setChatResponse(null);

      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: currentQuery }),
      });

      const data = await res.json();

      if (data.success) {
        setChatResponse(data.reply);
        setSearchQuery(""); // সার্চ সফল হওয়ার পর ইনপুট বক্স পরিষ্কার করে দেওয়া হলো
      } else {
        setChatResponse("Error: " + (data.error || "Something went wrong"));
      }
    } catch (error) {
      console.error("Failed to connect to chat API:", error);
      setChatResponse("Failed to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 1. Bottom Fixed Floating AI Unique Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="relative group flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#2F8F46] via-[#FF9F43] to-[#2F8F46] shadow-2xl shadow-[#2F8F46]/50 border-2 border-white dark:border-[#89986D]/30 transition-all duration-300 overflow-hidden"
          aria-label="Open AI Assistant"
        >
          {/* Glowing Pulse Effect */}
          <span className="absolute inset-0 rounded-full bg-[#2F8F46] animate-ping opacity-30 pointer-events-none" />

          {/* Unique AI Icon (Brain / Sparkles / CPU vibe) */}
          <div className="relative text-white flex items-center justify-center">
            <FiCpu size={26} className="animate-pulse" />
          </div>

          {/* Floating Sparkle Badge */}
          <span className="absolute top-1 right-1 bg-white dark:bg-black text-[#FF9F43] p-1 rounded-full shadow-md">
            <SpeakerIcon size={10} />
          </span>
        </motion.button>
      </div>

      {/* 2. Modern AI Search / Pop-up Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              className="relative w-full max-w-xl bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#89986D]/20 rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8"
            >
              
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#2F8F46] to-[#FF9F43] p-0.5 flex items-center justify-center text-white shadow-md">
                    <FiCpu size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-[#F6F0D7] flex items-center gap-1.5">
                      FlavorAI Intelligence <SparkleIcon className="text-[#FF9F43]" size={14} />
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-[#F6F0D7]/60">
                      Your personal AI chef & recipe generator
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-[#F6F0D7] bg-gray-100 dark:bg-[#89986D]/10 transition"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Search Form */}
              <form onSubmit={handleSearch} className="relative mb-6">
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-gray-400">
                    <FiSearch size={18} />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ask AI for recipes, ingredients, or cooking tips..."
                    autoFocus
                    className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-gray-50 dark:bg-[#89986D]/10 border border-gray-200 dark:border-[#89986D]/20 text-xs sm:text-sm text-gray-900 dark:text-[#F6F0D7] focus:outline-none focus:border-[#2F8F46] transition"
                  />
                  
                  {/* Clear button inside input if text exists */}
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-12 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"
                    >
                      <FiX size={14} />
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-2 p-2.5 rounded-xl bg-[#2F8F46] text-white hover:bg-[#2F8F46]/90 transition shadow-md disabled:opacity-50"
                  >
                    {loading ? <span className="animate-spin text-xs">⏳</span> : <FiArrowRight size={16} />}
                  </button>
                </div>
              </form>

              {/* AI Response Display Box */}
              {chatResponse && (
                <div className="mb-6 p-4 rounded-2xl bg-gray-50 dark:bg-[#89986D]/10 border border-gray-200 dark:border-[#89986D]/20 max-h-48 overflow-y-auto">
                  <p className="text-[11px] font-bold text-[#2F8F46] mb-1 uppercase tracking-wide">AI Recipe Result:</p>
                  <p className="text-xs sm:text-sm text-gray-800 dark:text-[#F6F0D7] whitespace-pre-line">
                    {chatResponse}
                  </p>
                </div>
              )}

              {/* Popular Suggestions Chips */}
              <div>
                <p className="text-[11px] font-bold text-gray-400 dark:text-[#F6F0D7]/50 uppercase tracking-wide mb-3">
                  Trending AI Prompts:
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSearchQuery(prompt)}
                      className="text-xs px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-[#89986D]/10 text-gray-700 dark:text-[#F6F0D7]/80 hover:bg-[#2F8F46]/10 hover:text-[#2F8F46] dark:hover:text-[#B7E35F] border border-gray-200/60 dark:border-[#89986D]/15 transition flex items-center gap-1.5"
                    >
                      <span className="text-[#FF9F43]">✨</span> {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer Note */}
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-[#89986D]/15 text-center">
                <p className="text-[10px] text-gray-400 dark:text-[#F6F0D7]/40">
                  Powered by FlavorAI Neural Engine
                </p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
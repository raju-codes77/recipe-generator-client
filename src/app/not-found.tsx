
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiHome, FiArrowLeft, FiCompass } from "react-icons/fi";

export default function NotFoundPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black relative overflow-hidden transition-colors duration-300 px-4 py-12">

      {/* Background Decorative Glowing Shapes */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#2F8F46]/10 dark:bg-[#2F8F46]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute bottom-10 -left-24 w-96 h-96 bg-[#FF9F43]/10 dark:bg-[#FF9F43]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Full Screen Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full flex flex-col items-center text-center"
      >

        {/* Logo */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
          className="relative w-20 h-20 sm:w-24 sm:h-24 mb-6"
        >
          <Image
            src="/logohere.png"
            alt="FlavorAI Logo"
            fill
            className="object-contain drop-shadow-lg"
            priority
          />
        </motion.div>

        {/* 404 */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mb-3"
        >
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tight bg-gradient-to-r from-[#2F8F46] via-[#FF9F43] to-[#2F8F46] bg-clip-text text-transparent">
            404
          </h1>
        </motion.div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-[#F6F0D7] mb-3">
          Oops! Recipe Not Found
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-[#F6F0D7]/60 max-w-md mb-8 leading-relaxed">
          Looks like this page got overcooked or doesn't exist in our cookbook.
          Let's get you back to something delicious!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full max-w-md">

          {/* Go Back */}
          <button
            onClick={() => window.history.back()}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl border border-gray-200 dark:border-[#89986D]/20 bg-white/70 dark:bg-[#89986D]/5 hover:bg-gray-100 dark:hover:bg-[#89986D]/15 text-xs font-semibold text-gray-800 dark:text-[#F6F0D7] transition shadow-sm flex items-center justify-center gap-2"
          >
            <FiArrowLeft size={16} />
            <span>Go Back</span>
          </button>

          {/* Go Home */}
          <Link
            href="/"
            className="w-full sm:flex-1 py-3 px-4 bg-[#2F8F46] hover:bg-[#2F8F46]/90 text-white font-bold rounded-xl shadow-lg shadow-[#2F8F46]/30 transition flex items-center justify-center gap-2 text-xs"
          >
            <FiHome size={16} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Explore Recipes */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-[#F6F0D7]/50">
          <FiCompass size={14} className="text-[#2F8F46]" />

          <span>
            Looking for recipes?{" "}
            <Link
              href="/recipes"
              className="text-[#2F8F46] dark:text-[#B7E35F] font-bold hover:underline"
            >
              Explore Menu
            </Link>
          </span>
        </div>

      </motion.div>
    </div>
  );
}

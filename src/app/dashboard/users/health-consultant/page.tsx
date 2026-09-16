"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiCheckCircle, FiClock, FiShield } from "react-icons/fi";
import { Stethoscope, Apple } from "lucide-react";

export default function HealthConsultantPage() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-black/20 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 pt-4 sm:pt-8"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Wellness Consultations
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Get personalized guidance for your wellness journey. Choose a specialist below to start achieving your health goals with professional support.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 pt-6">
          
          {/* Nutrition Specialist Card (Active) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="group relative flex flex-col justify-between p-8 rounded-3xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900/30 shadow-lg shadow-emerald-900/5 hover:shadow-xl transition-all duration-300"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
                  <Apple size={28} strokeWidth={2} />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available Now
                </span>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  AI Nutrition Specialist
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Chat instantly with our AI nutrition specialist for personalized meal planning, dietary advice, and instant health tips.
                </p>
              </div>

              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-500" />
                  Instant dietary advice
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-500" />
                  Custom meal ideas based on your goals
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-500" />
                  Available 24/7 without booking
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <Link
                href="/dashboard/users/ai-nutritionist"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors shadow-md shadow-emerald-600/20"
              >
                Start AI Consultation
                <FiArrowRight size={18} />
              </Link>
            </div>
          </motion.div>

          {/* Doctor Consultation Card (Coming Soon) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="group relative flex flex-col justify-between p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 opacity-80"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                  <Stethoscope size={28} strokeWidth={2} />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <FiClock size={12} />
                  Coming Soon
                </span>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Doctor Consultation
                </h2>
                <p className="text-slate-500 dark:text-slate-500 text-sm leading-relaxed">
                  Doctor consultation services are currently under development. Soon you will be able to book sessions with general physicians and specialists.
                </p>
              </div>

              <div className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-4 flex items-start gap-3">
                <FiShield className="text-slate-400 mt-0.5 shrink-0" />
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  We are working hard to bring verified medical professionals to our platform. We'll notify you when this feature becomes available.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
              <button
                disabled
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 font-bold cursor-not-allowed"
              >
                Booking Unavailable
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Stethoscope, 
  ChevronRight,
  MessageSquare,
  Activity,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function NutritionistSupportSection() {
  return (
    <section className="w-full bg-white dark:bg-[#080B12] py-16 lg:py-24 px-6 md:px-8 transition-colors duration-300 overflow-hidden relative">
      
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-50 dark:bg-emerald-900/10 rounded-bl-[150px] -z-10 opacity-70 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-50 dark:bg-teal-900/10 rounded-tr-[150px] -z-10 opacity-60 blur-3xl" />

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20">
        
        {/* Left Content Area (Width: 5/12) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="lg:w-5/12 space-y-7 relative z-10"
        >
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-white/5 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-stone-200 dark:border-white/10 shadow-sm backdrop-blur-md">
            <Stethoscope className="w-4 h-4" />
            <span className="tracking-widest uppercase">Expert Guidance</span>
          </div>

          {/* Main Title */}
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-black tracking-tight text-stone-900 dark:text-white leading-[1.05] z-10">
            Your Personal <br />
            Nutrition Team, <br />
            <span 
              className="drop-shadow-sm"
              style={{
                background: 'linear-gradient(90deg, #154D31 0%, #24733E 50%, #10B981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Available 24/7.
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg text-stone-600 dark:text-stone-300/90 leading-relaxed font-medium max-w-lg">
            Whether you need instant AI-powered dietary advice or personalized, ongoing counseling from a certified human nutritionist, FoodCanvas has you covered.
          </p>

          {/* Feature List */}
          <div className="space-y-6 pt-4">
            <div className="flex items-start gap-4 group cursor-default">
              <div className="w-12 h-12 rounded-[14px] bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0 shadow-sm border border-teal-100 dark:border-teal-800/30 group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-white mb-1">AI Nutrition Assistant</h3>
                <p className="text-sm font-medium text-stone-500 dark:text-stone-400 leading-snug">Get instant meal plans, macro tracking, and personalized alternative ingredients anytime you need.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group cursor-default">
              <div className="w-12 h-12 rounded-[14px] bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 shadow-sm border border-emerald-100 dark:border-emerald-800/30 group-hover:scale-105 transition-transform duration-300">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-white mb-1">Certified Human Dietitians</h3>
                <p className="text-sm font-medium text-stone-500 dark:text-stone-400 leading-snug">Connect with registered professionals for tailored health strategies and ongoing support.</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-6">
            <Link href="/nutritionist">
              <div 
                className="inline-flex items-center gap-2 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 text-[15px] group cursor-pointer"
                style={{
                  background: 'linear-gradient(90deg, #154D31 0%, #24733E 50%, #10B981 100%)',
                  backgroundSize: '200% 100%',
                  transition: 'background-position 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundPosition = 'right center'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundPosition = 'left center'}
              >
                <span>Get Expert Support</span>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Right Visual Interactive Mockup Area (Width: 7/12) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="lg:w-7/12 relative flex items-center justify-center h-[500px] w-full z-10"
        >
          {/* Subtle Glow Behind Cards */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[80px] -z-10" />

          {/* Human Nutritionist Card (Back/Top Right) */}
          <motion.div 
            whileHover={{ y: -5, rotate: 1 }}
            className="absolute right-0 md:right-8 top-4 w-[280px] sm:w-[320px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-4 z-10 transition-transform"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-100 dark:border-emerald-900 shadow-sm">
                <Image 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80" 
                  alt="Dr. Sarah Jenkins"
                  fill 
                  sizes="56px"
                  className="object-cover"
                />
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
              </div>
              <div>
                <h4 className="font-bold text-stone-900 dark:text-white text-[15px]">Dr. Sarah Jenkins</h4>
                <p className="text-[12px] font-medium text-emerald-600 dark:text-emerald-400">Registered Dietitian</p>
              </div>
            </div>
            
            <div className="bg-stone-50 dark:bg-black/20 rounded-xl p-3 mb-3 border border-stone-100 dark:border-white/5">
              <p className="text-[12px] text-stone-600 dark:text-stone-300 leading-relaxed italic">
                "Based on your latest bloodwork, let's adjust your macros to focus on lean proteins and healthy fats."
              </p>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-500/20 dark:hover:bg-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold py-2 rounded-lg transition-colors">
                Book Session
              </button>
              <button className="w-9 h-9 flex items-center justify-center bg-stone-100 hover:bg-stone-200 dark:bg-white/5 dark:hover:bg-white/10 text-stone-600 dark:text-stone-300 rounded-lg transition-colors">
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* AI Nutritionist Card (Front/Bottom Left) */}
          <motion.div 
            whileHover={{ y: -5, rotate: -1 }}
            className="absolute left-0 md:left-4 bottom-4 w-[290px] sm:w-[340px] bg-white/95 dark:bg-[#111827]/95 backdrop-blur-2xl border border-white dark:border-white/10 rounded-[28px] shadow-[0_20px_50px_rgba(20,80,40,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-5 z-20 transition-transform"
          >
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center shadow-md">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 dark:text-white text-[15px]">AI Nutrition Bot</h4>
                  <p className="text-[11px] font-semibold text-stone-500 dark:text-stone-400">Instant Analysis</p>
                </div>
              </div>
              <div className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-md text-[10px] font-bold">
                Active
              </div>
            </div>

            {/* AI Chat Bubble */}
            <div className="bg-stone-100 dark:bg-black/30 rounded-2xl rounded-tl-sm p-3.5 mb-4 border border-stone-200 dark:border-white/5">
              <p className="text-[13px] text-stone-700 dark:text-stone-300 font-medium leading-relaxed">
                I've analyzed your daily intake. You're 20g short on protein! Try adding Greek yogurt to your breakfast.
              </p>
            </div>

            {/* Suggestions */}
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 bg-white dark:bg-white/5 rounded-xl border border-stone-100 dark:border-white/10 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <Image src="https://images.unsplash.com/photo-1488477181946-6428a0291777?w=100&auto=format&fit=crop&q=60" alt="Yogurt" width={32} height={32} className="rounded-lg object-cover w-8 h-8" />
                  <div>
                    <p className="text-[12px] font-bold text-stone-900 dark:text-white">Greek Yogurt Bowl</p>
                    <p className="text-[10px] text-stone-500">Adds 22g Protein</p>
                  </div>
                </div>
                <button className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors">
                  <CheckCircle2 className="w-5 h-5" />
                </button>
              </div>
            </div>

          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

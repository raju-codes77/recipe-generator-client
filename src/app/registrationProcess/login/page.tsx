"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiMail, FiLock, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Password er 4 ti dhap (Steps) placeholder - pore functionality add korte parbe
  const passwordSteps = [
    { label: "At least 8 characters long", met: password.length >= 8 },
    { label: "Contains a uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains a number", met: /[0-9]/.test(password) },
    { label: "Contains a special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add login functionality here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black p-4 relative overflow-hidden transition-colors duration-300">
      {/* Background Decorative Shapes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#2F8F46]/10 dark:bg-[#2F8F46]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FF9F43]/10 dark:bg-[#FF9F43]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white dark:bg-black/60 border border-gray-200 dark:border-[#89986D]/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#2F8F46] flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-[#2F8F46]/30 mb-3">
            F
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-[#F6F0D7]">Welcome Back!</h1>
          <p className="text-xs text-gray-500 dark:text-[#F6F0D7]/60 mt-1">
            Log in to your FlavorAI account to continue
          </p>
        </div>

        {/* Google Login Button */}
        <button 
          type="button"
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-gray-200 dark:border-[#89986D]/20 bg-gray-50 dark:bg-[#89986D]/5 hover:bg-gray-100 dark:hover:bg-[#89986D]/15 text-xs font-semibold text-gray-800 dark:text-[#F6F0D7] transition shadow-sm"
        >
          <FcGoogle size={20} />
          <span>Continue with Google</span>
        </button>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-200 dark:border-[#89986D]/20" />
          <span className="px-3 text-[10px] uppercase font-semibold text-gray-400 dark:text-[#F6F0D7]/40">or email</span>
          <div className="flex-grow border-t border-gray-200 dark:border-[#89986D]/20" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-[#F6F0D7]/80 mb-1">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400"><FiMail /></span>
              <input 
                type="email5" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="chef@flavorai.com"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-[#89986D]/10 border border-gray-200 dark:border-[#89986D]/20 text-xs text-gray-900 dark:text-[#F6F0D7] focus:outline-none focus:border-[#2F8F46]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-[#F6F0D7]/80 mb-1">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400"><FiLock /></span>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-[#89986D]/10 border border-gray-200 dark:border-[#89986D]/20 text-xs text-gray-900 dark:text-[#F6F0D7] focus:outline-none focus:border-[#2F8F46]"
              />
            </div>
          </div>

          {/* Password 4 Steps Checklist Preview */}
          <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#89986D]/5 border border-gray-100 dark:border-[#89986D]/10 space-y-1.5">
            <p className="text-[10px] font-bold text-gray-500 dark:text-[#F6F0D7]/60 uppercase tracking-wide">Password Requirements (4 steps):</p>
            {passwordSteps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[11px]">
                <FiCheckCircle className={step.met ? "text-[#2F8F46]" : "text-gray-300 dark:text-gray-600"} size={13} />
                <span className={step.met ? "text-gray-900 dark:text-[#F6F0D7] font-medium" : "text-gray-400 dark:text-[#F6F0D7]/40"}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-gray-600 dark:text-[#F6F0D7]/70 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 accent-[#2F8F46]" />
              <span>Remember me</span>
            </label>
            <Link href="#" className="text-[#2F8F46] dark:text-[#B7E35F] hover:underline font-semibold">
              Forgot Password?
            </Link>
          </div>

          <button 
            type="submit"
            className="w-full py-3 bg-[#2F8F46] hover:bg-[#2F8F46]/90 text-white font-bold rounded-xl shadow-lg shadow-[#2F8F46]/30 transition flex items-center justify-center gap-2 text-xs"
          >
            <span>Sign In</span>
            <FiArrowRight size={16} />
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 dark:text-[#F6F0D7]/60 mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="text-[#2F8F46] dark:text-[#B7E35F] font-bold hover:underline">
            Register here
          </Link>
        </p>

      </div>
    </div>
  );
}
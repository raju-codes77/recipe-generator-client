"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiUser, FiMail, FiLock, FiImage, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");

  // Password er 4 ti dhap (Steps) placeholder
  const passwordSteps = [
    { label: "At least 8 characters long", met: password.length >= 8 },
    { label: "Contains a uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains a number", met: /[0-9]/.test(password) },
    { label: "Contains a special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add register functionality here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black p-4 relative overflow-hidden transition-colors duration-300 py-12">
      {/* Background Decorative Shapes */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#2F8F46]/10 dark:bg-[#2F8F46]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-24 w-96 h-96 bg-[#FF9F43]/10 dark:bg-[#FF9F43]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white dark:bg-black/60 border border-gray-200 dark:border-[#89986D]/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#2F8F46] flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-[#2F8F46]/30 mb-3">
            F
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-[#F6F0D7]">Create Account</h1>
          <p className="text-xs text-gray-500 dark:text-[#F6F0D7]/60 mt-1">
            Join FlavorAI and start generating smart recipes
          </p>
        </div>

        {/* Google Signup Button */}
        <button 
          type="button"
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-gray-200 dark:border-[#89986D]/20 bg-gray-50 dark:bg-[#89986D]/5 hover:bg-gray-100 dark:hover:bg-[#89986D]/15 text-xs font-semibold text-gray-800 dark:text-[#F6F0D7] transition shadow-sm mb-4"
        >
          <FcGoogle size={20} />
          <span>Sign up with Google</span>
        </button>

        <div className="flex items-center mb-5">
          <div className="flex-grow border-t border-gray-200 dark:border-[#89986D]/20" />
          <span className="px-3 text-[10px] uppercase font-semibold text-gray-400 dark:text-[#F6F0D7]/40">or with details</span>
          <div className="flex-grow border-t border-gray-200 dark:border-[#89986D]/20" />
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-[#F6F0D7]/80 mb-1">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400"><FiUser /></span>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Chef Alex"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-[#89986D]/10 border border-gray-200 dark:border-[#89986D]/20 text-xs text-gray-900 dark:text-[#F6F0D7] focus:outline-none focus:border-[#2F8F46]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-[#F6F0D7]/80 mb-1">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400"><FiMail /></span>
              <input 
                type="email" 
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

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-[#F6F0D7]/80 mb-1">
              Profile Photo URL <span className="text-[10px] text-gray-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400"><FiImage /></span>
              <input 
                type="url" 
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-[#89986D]/10 border border-gray-200 dark:border-[#89986D]/20 text-xs text-gray-900 dark:text-[#F6F0D7] focus:outline-none focus:border-[#2F8F46]"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3 bg-[#2F8F46] hover:bg-[#2F8F46]/90 text-white font-bold rounded-xl shadow-lg shadow-[#2F8F46]/30 transition flex items-center justify-center gap-2 text-xs mt-2"
          >
            <span>Create Account</span>
            <FiArrowRight size={16} />
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 dark:text-[#F6F0D7]/60 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[#2F8F46] dark:text-[#B7E35F] font-bold hover:underline">
            Log in
          </Link>
        </p>

      </div>
    </div>
  );
}
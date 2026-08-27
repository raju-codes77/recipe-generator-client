"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiLock,
  FiImage,
  FiArrowRight,
  FiCheckCircle,
  FiLoader,
  FiShield,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { createAuthClient } from "better-auth/react";
import toast from "react-hot-toast";

// ব্যাকএন্ড এক্সপ্র্রেস সার্ভারের পোর্ট 5000 পয়েন্ট করার জন্য ক্লায়েন্ট কনফিগারেশন
export const authClient = createAuthClient({
  baseURL: "http://localhost:5000",
});

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [photo, setPhoto] = useState("");
  const [role, setRole] = useState("USER");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Password requirements
  const passwordSteps = [
    {
      label: "At least 8 characters long",
      met: password.length >= 8,
    },
    {
      label: "Contains an uppercase letter",
      met: /[A-Z]/.test(password),
    },
    {
      label: "Contains a number",
      met: /[0-9]/.test(password),
    },
    {
      label: "Contains a special character",
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];

  const isPasswordValid = passwordSteps.every((step) => step.met);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!name.trim()) {
      const msg = "Please enter your full name.";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    if (!email.trim()) {
      const msg = "Please enter your email address.";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    if (!isPasswordValid) {
      const msg = "Please fulfill all password requirements before creating your account.";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

   try {
  setLoading(true);

  const { data, error } = await authClient.signUp.email({
    name: name.trim(),
    email: email.trim(),
    password,
    image: photo.trim() || undefined,
  });

  if (error) {
    console.error("Signup error:", error);

    setErrorMessage(
      error.message || "Unable to create your account. Please try again."
    );

    return;
  }

  console.log("Signup successful:", data);

  setSuccessMessage(
    "Account created successfully! Redirecting..."
  );

  setTimeout(() => {
    router.push("/dashboard/users");
    router.refresh();
  }, 1000);
} catch (error) {
  console.error("Unexpected signup error:", error);

  setErrorMessage(
    "Something went wrong. Please check your connection and try again."
  );
} finally {
  setLoading(false);
}
  };

  const handleGoogleSignup = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      setLoading(true);
      toast.loading("Connecting with Google...", { id: "google-signup" });
      
await authClient.signIn.social({
  provider: "google",
  callbackURL: `${window.location.origin}/dashboard/users`, // Production ebong localhost dutor jonnoi 100% safe
});
    } catch (error) {
      console.error("Google signup error:", error);
      toast.dismiss("google-signup");
      const msg = "Google signup failed. Please try again.";
      setErrorMessage(msg);
      toast.error(msg);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F6F0] dark:bg-black p-4 sm:p-6 lg:p-8 font-sans transition-colors duration-500">
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-5xl bg-[#F4EFE6] dark:bg-[#141414] rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07)] overflow-hidden flex flex-col lg:flex-row border border-[#EBE5D8] dark:border-[#262626]"
      >

        {/* LEFT COLUMN: Image with overlay text and features */}
        <div className="lg:w-1/2 p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
          
          {/* Background Image with Dark Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/brooke-lark-4J059aGa5s4-unsplash.jpg"
              alt="Food Background"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black/20 dark:bg-black/70 backdrop-blur-[2px]" />
          </div>

          {/* Top Logo & Slogan */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="relative w-9 h-9">
                <Image
                  src="/logohere.png"
                  alt="FoodCanvas Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h2 className="font-bold text-xl tracking-tight text-white leading-none">FoodCanvas</h2>
                <p className="text-[11px] text-gray-300 mt-1">Cook. Share. Nourish.</p>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-[1.1] mb-4">
              Good Food, <br />
              <span className="text-[#8cd184]">Better You.</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-200 max-w-md leading-relaxed mb-8">
              Join FoodCanvas and discover AI-powered recipes, nutrition insights, and a community that loves good food as much as you do.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md shadow-sm flex items-center justify-center shrink-0 border border-white/10">
                  <FiCheckCircle className="text-[#8cd184]" size={18} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">AI Recipe Generator</h4>
                  <p className="text-[11px] text-gray-300">Create delicious recipes with ingredients you have.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md shadow-sm flex items-center justify-center shrink-0 border border-white/10">
                  <div className="w-4 h-4 bg-[#8cd184]/20 rounded flex items-center justify-center text-[#8cd184] font-bold text-[10px]">📊</div>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Nutrition Insights</h4>
                  <p className="text-[11px] text-gray-300">Analyze your meals and track what matters.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md shadow-sm flex items-center justify-center shrink-0 border border-white/10">
                  <div className="w-4 h-4 bg-[#8cd184]/20 rounded flex items-center justify-center text-[#8cd184] font-bold text-[10px]">👥</div>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Foodie Community</h4>
                  <p className="text-[11px] text-gray-300">Share, inspire, and connect with food lovers.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quote Box */}
          <div className="relative z-10 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-sm">
            <span className="text-xl font-serif text-[#8cd184] absolute top-2 left-3 leading-none">“</span>
            <p className="text-[11px] italic text-gray-200 pl-3 pr-2">
              Let food be your medicine and medicine be your food.
            </p>
            <p className="text-[10px] font-semibold text-[#8cd184] mt-1.5 pl-3">
              - Hippocrates
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Register Form Section */}
        <div className="w-full lg:w-1/2 bg-white dark:bg-[#121212] p-8 sm:p-10 flex flex-col justify-between overflow-y-auto max-h-[900px] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-800 [&::-webkit-scrollbar-thumb]:rounded-full">
          
          <div>
            {/* Top Log in link header */}
            <div className="flex justify-end items-center mb-6">
              <span className="text-xs text-gray-500 dark:text-gray-400 mr-1.5">Already have an account?</span>
              <Link
                href="/registrationProcess/login"
                className="text-xs font-bold text-[#3A6B35] hover:underline"
              >
                Log in
              </Link>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                Create Your Account <span className="text-lg">🌱</span>
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Start your healthy journey with FoodCanvas</p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/40 dark:border-red-900 px-4 py-3">
                <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                  {errorMessage}
                </p>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="mb-4 rounded-xl border border-green-200 bg-green-50 dark:bg-green-950/40 dark:border-green-900 px-4 py-3">
                <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                  {successMessage}
                </p>
              </div>
            )}

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Full Name */}
              <div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <FiUser size={15} />
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    required
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3A6B35]/30 focus:border-[#3A6B35] transition-all disabled:opacity-50 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <FiMail size={15} />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3A6B35]/30 focus:border-[#3A6B35] transition-all disabled:opacity-50 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Role Selection Dropdown */}
              <div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <FiShield size={15} />
                  </span>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3A6B35]/30 focus:border-[#3A6B35] transition-all disabled:opacity-50 appearance-none"
                  >
                    <option value="USER" className="bg-white dark:bg-gray-900">User (Standard)</option>
                    <option value="ADMIN" className="bg-white dark:bg-gray-900">Admin</option>
                  </select>
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <FiLock size={15} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    disabled={loading}
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-50/50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3A6B35]/30 focus:border-[#3A6B35] transition-all disabled:opacity-50 placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  >
                    {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                  </button>
                </div>
              </div>

              {/* Password Requirements Checklist */}
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 space-y-1.5">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Password must meet:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {passwordSteps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px]">
                      <FiCheckCircle
                        className={step.met ? "text-[#3A6B35]" : "text-gray-300 dark:text-gray-600"}
                        size={13}
                        strokeWidth={2.5}
                      />
                      <span className={step.met ? "text-gray-700 dark:text-gray-200" : "text-gray-400 dark:text-gray-500"}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Profile Photo URL Optional */}
              <div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <FiImage size={15} />
                  </span>
                  <input
                    type="url"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    placeholder="Profile Photo URL (Optional)"
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3A6B35]/30 focus:border-[#3A6B35] transition-all disabled:opacity-50 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#3A6B35] hover:bg-[#30592c] text-white font-semibold rounded-xl shadow-lg shadow-[#3A6B35]/20 transition-all flex items-center justify-center gap-2 text-xs mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <FiLoader className="animate-spin" size={16} />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Sign Up</span>
                    <FiArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Divider: or continue with */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-200 dark:border-gray-800" />
              <span className="px-3 text-[11px] font-medium text-gray-400 dark:text-gray-500">or continue with</span>
              <div className="flex-grow border-t border-gray-200 dark:border-gray-800" />
            </div>

            {/* Google Login Only */}
            <div>
              <button
                type="button"
                onClick={handleGoogleSignup}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] hover:bg-gray-50 dark:hover:bg-[#262626] text-xs font-semibold text-gray-700 dark:text-gray-200 transition shadow-sm disabled:opacity-50"
              >
                <FcGoogle size={18} />
                <span>Continue with Google</span>
              </button>
            </div>
          </div>

          {/* Bottom Footer Notice */}
          <p className="text-center text-[10px] text-gray-400 dark:text-gray-500 mt-8">
            By signing up, you agree to the Terms and acknowledge our <span className="underline">Privacy Policy</span>.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
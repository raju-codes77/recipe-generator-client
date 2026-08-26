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
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast"; // ১. react-hot-toast ইমপোর্ট করা হলো

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
      toast.error(msg); // টোস্ট নোটিফিকেশন
      return;
    }

    if (!email.trim()) {
      const msg = "Please enter your email address.";
      setErrorMessage(msg);
      toast.error(msg); // টোস্ট নোটিফিকেশন
      return;
    }

    if (!isPasswordValid) {
      const msg = "Please fulfill all password requirements before creating your account.";
      setErrorMessage(msg);
      toast.error(msg); // টোস্ট নোটিফিকেশন
      return;
    }

    try {
      setLoading(true);
      toast.loading("Creating your account...", { id: "signup" }); // লোডিং টোস্ট

      const { data, error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        image: photo.trim() || undefined,
        role: role,
      });

      if (error) {
        console.error("Signup error:", error);
        const msg = error.message || "Unable to create your account. Please try again.";
        setErrorMessage(msg);
        toast.dismiss("signup");
        toast.error(msg); // এরর টোস্ট
        setLoading(false);
        return;
      }

      console.log("Signup successful:", data);
      toast.dismiss("signup");
      
      const successMsg = "Account created successfully! Redirecting...";
      setSuccessMessage(successMsg);
      toast.success(successMsg); // সাকসেস টোস্ট

      const currentRole = role ? role.toLowerCase() : "";

      setTimeout(() => {
        if (currentRole === "admin") {
          router.push("/dashboard/admin");
        } else {
          router.push("/dashboard/users");
        }
        router.refresh();
      }, 1000);

    } catch (error) {
      console.error("Unexpected signup error:", error);
      toast.dismiss("signup");
      const msg = "Something went wrong. Please check your connection and try again.";
      setErrorMessage(msg);
      toast.error(msg); // এরর টোস্ট
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
        callbackURL: "/dashboard/users",
      });
    } catch (error) {
      console.error("Google signup error:", error);
      toast.dismiss("google-signup");
      const msg = "Google signup is not configured yet.";
      setErrorMessage(msg);
      toast.error(msg); // এরর টোস্ট
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#89986D]/20 via-white to-white dark:from-black dark:via-gray-950 dark:to-black p-4 transition-colors duration-500">
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-5xl h-[650px] bg-white dark:bg-[#141414] rounded-3xl shadow-[0_20px_50px_-15px_rgba(137,152,109,0.2)] overflow-hidden flex border border-gray-100 dark:border-[#333]"
      >

        {/* LEFT COLUMN: Branding & Image Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#89986D]/5 dark:bg-[#1a1a1a] p-8 xl:p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#2F8F46]/10 rounded-full blur-2xl" />
          
          <div className="relative z-10 flex items-center gap-3 shrink-0">
             <div className="relative w-10 h-10 shrink-0">
              <Image
                src="/logohere.png"
                alt="FoodCanvas Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white">Food Canvas</span>
          </div>

          <div className="relative z-10 flex-grow flex items-center justify-center my-auto">
             <div className="text-center p-8 bg-white/50 dark:bg-black/30 rounded-3xl border border-gray-100 dark:border-gray-800 backdrop-blur-sm">
                <FiCheckCircle className="w-14 h-14 text-[#2F8F46] mx-auto mb-4" strokeWidth={1.5}/>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Join FlavorAI Today!</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">Discover personalized recipes, smart meal planning, and culinary inspiration.</p>
             </div>
          </div>

          <div className="relative z-10 text-xs text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 pt-4 shrink-0">
            <p className="italic">&quot;Creating an account took seconds, and the recipe suggestions have completely changed how I plan my weekly meals.&quot;</p>
            <p className="font-semibold text-gray-900 dark:text-white mt-2">- Michael R, Food Enthusiast</p>
          </div>
        </div>

        {/* RIGHT COLUMN: Register Form Section with Custom Thin Scrollbar */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-800 [&::-webkit-scrollbar-thumb]:rounded-full">
          
          <div>
            <div className="text-center mb-5">
              <div className="relative w-12 h-12 mx-auto mb-2 lg:hidden">
                <Image
                  src="/logohere.png"
                  alt="FoodCanvas Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Account</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Join FlavorAI and start generating smart recipes</p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 dark:bg-red-950/40 dark:border-red-900 px-4 py-3">
                <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                  {errorMessage}
                </p>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="mb-4 rounded-2xl border border-green-200 bg-green-50 dark:bg-green-950/40 dark:border-green-900 px-4 py-3">
                <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                  {successMessage}
                </p>
              </div>
            )}

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-3">

              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1 pl-1">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <FiUser size={16} />
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Chef Alex"
                    required
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F8F46]/30 focus:border-[#2F8F46] transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1 pl-1">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <FiMail size={16} />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="chef@flavorai.com"
                    required
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F8F46]/30 focus:border-[#2F8F46] transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Role Selection Dropdown */}
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1 pl-1">
                  Account Role
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <FiShield size={16} />
                  </span>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F8F46]/30 focus:border-[#2F8F46] transition-all disabled:opacity-50 appearance-none"
                  >
                    <option value="USER" className="bg-white dark:bg-gray-900">User (Standard)</option>
                    <option value="ADMIN" className="bg-white dark:bg-gray-900">Admin</option>
                  </select>
                </div>
              </div>

              {/* Password with Show/Hide Toggle */}
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1 pl-1">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <FiLock size={16} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    disabled={loading}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F8F46]/30 focus:border-[#2F8F46] transition-all disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  >
                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 space-y-1.5">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Password must meet:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {passwordSteps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px]">
                      <FiCheckCircle
                        className={step.met ? "text-[#2F8F46]" : "text-gray-300 dark:text-gray-600"}
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

              {/* Profile Photo URL */}
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1 pl-1">
                  Profile Photo URL <span className="text-[10px] text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <FiImage size={16} />
                  </span>
                  <input
                    type="url"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F8F46]/30 focus:border-[#2F8F46] transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#2F8F46] hover:bg-[#287a3b] text-white font-semibold rounded-xl shadow-lg shadow-[#2F8F46]/20 transition-all flex items-center justify-center gap-2 text-xs mt-1 disabled:opacity-60 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {loading ? (
                  <>
                    <FiLoader className="animate-spin" size={16} />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <FiArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-100 dark:border-gray-800" />
              <span className="px-3 text-[10px] uppercase font-medium text-gray-400 dark:text-gray-600">or</span>
              <div className="flex-grow border-t border-gray-100 dark:border-gray-800" />
            </div>

            {/* Google Signup Button */}
            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] hover:bg-gray-50 dark:hover:bg-[#262626] text-xs font-medium text-gray-700 dark:text-gray-200 transition shadow-sm disabled:opacity-50"
            >
              <FcGoogle size={18} />
              <span>Sign up with Google</span>
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center text-xs text-gray-600 dark:text-gray-400 mt-4 shrink-0">
            Already have an account?{" "}
            <Link
              href="/registrationProcess/login"
              className="text-[#2F8F46] dark:text-[#89986D] font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
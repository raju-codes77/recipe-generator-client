"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
      label: "Contains a uppercase letter",
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
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!isPasswordValid) {
      setErrorMessage(
        "Please fulfill all password requirements before creating your account."
      );
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
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard/users",
      });
    } catch (error) {
      console.error("Google signup error:", error);
      setErrorMessage(
        "Google signup is not configured yet."
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black p-4 relative overflow-hidden transition-colors duration-300 py-12">
      {/* Background Decorative Shapes */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#2F8F46]/10 dark:bg-[#2F8F46]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-24 w-96 h-96 bg-[#FF9F43]/10 dark:bg-[#FF9F43]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white dark:bg-black/60 border border-gray-200 dark:border-[#89986D]/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl relative z-10">

        {/* Brand Header with Logo Component */}
        <div className="text-center mb-6 flex flex-col items-center">
          <div className="relative w-12 h-12 lg:w-14 lg:h-14 shrink-0 transition-transform duration-200 hover:scale-105 mb-3">
            <Image
              src="/logohere.png"
              alt="FoodCanvas Logo"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1024px) 48px, 56px"
            />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-[#F6F0D7]">
            Create Account
          </h1>

          <p className="text-xs text-gray-500 dark:text-[#F6F0D7]/60 mt-1">
            Join FlavorAI and start generating smart recipes
          </p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900/40 px-4 py-3">
            <p className="text-xs text-red-600 dark:text-red-400">
              {errorMessage}
            </p>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 rounded-xl border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900/40 px-4 py-3">
            <p className="text-xs text-green-600 dark:text-green-400">
              {successMessage}
            </p>
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-[#F6F0D7]/80 mb-1">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                <FiUser />
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Chef Alex"
                required
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-[#89986D]/10 border border-gray-200 dark:border-[#89986D]/20 text-xs text-gray-900 dark:text-[#F6F0D7] focus:outline-none focus:border-[#2F8F46] disabled:opacity-60"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-[#F6F0D7]/80 mb-1">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                <FiMail />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="chef@flavorai.com"
                required
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-[#89986D]/10 border border-gray-200 dark:border-[#89986D]/20 text-xs text-gray-900 dark:text-[#F6F0D7] focus:outline-none focus:border-[#2F8F46] disabled:opacity-60"
              />
            </div>
          </div>

          {/* Role Selection Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-[#F6F0D7]/80 mb-1">
              Account Role
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                <FiShield />
              </span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-[#89986D]/10 border border-gray-200 dark:border-[#89986D]/20 text-xs text-gray-900 dark:text-[#F6F0D7] focus:outline-none focus:border-[#2F8F46] disabled:opacity-60 appearance-none"
              >
                <option value="USER" className="bg-white dark:bg-slate-900">User (Standard)</option>
                <option value="ADMIN" className="bg-white dark:bg-slate-900">Admin</option>
              </select>
            </div>
          </div>

          {/* Password with Show/Hide Toggle */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-[#F6F0D7]/80 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                <FiLock />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-50 dark:bg-[#89986D]/10 border border-gray-200 dark:border-[#89986D]/20 text-xs text-gray-900 dark:text-[#F6F0D7] focus:outline-none focus:border-[#2F8F46] disabled:opacity-60"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-[#F6F0D7]"
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#89986D]/5 border border-gray-100 dark:border-[#89986D]/10 space-y-1.5">
            <p className="text-[10px] font-bold text-gray-500 dark:text-[#F6F0D7]/60 uppercase tracking-wide">
              Password Requirements:
            </p>
            {passwordSteps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[11px]">
                <FiCheckCircle
                  className={step.met ? "text-[#2F8F46]" : "text-gray-300 dark:text-gray-600"}
                  size={13}
                />
                <span className={step.met ? "text-gray-900 dark:text-[#F6F0D7] font-medium" : "text-gray-400 dark:text-[#F6F0D7]/40"}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          {/* Profile Photo URL */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-[#F6F0D7]/80 mb-1">
              Profile Photo URL{" "}
              <span className="text-[10px] text-gray-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                <FiImage />
              </span>
              <input
                type="url"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-[#89986D]/10 border border-gray-200 dark:border-[#89986D]/20 text-xs text-gray-900 dark:text-[#F6F0D7] focus:outline-none focus:border-[#2F8F46] disabled:opacity-60"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#2F8F46] hover:bg-[#2F8F46]/90 text-white font-bold rounded-xl shadow-lg shadow-[#2F8F46]/30 transition flex items-center justify-center gap-2 text-xs mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
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
        <div className="flex items-center my-5">
          <div className="flex-grow border-t border-gray-200 dark:border-[#89986D]/20" />
          <span className="px-3 text-[10px] uppercase font-semibold text-gray-400 dark:text-[#F6F0D7]/40">
            or
          </span>
          <div className="flex-grow border-t border-gray-200 dark:border-[#89986D]/20" />
        </div>

        {/* Google Signup Button */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-gray-200 dark:border-[#89986D]/20 bg-gray-50 dark:bg-[#89986D]/5 hover:bg-gray-100 dark:hover:bg-[#89986D]/15 text-xs font-semibold text-gray-800 dark:text-[#F6F0D7] transition shadow-sm mb-4 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <FcGoogle size={20} />
          <span>Sign up with Google</span>
        </button>

        {/* Login Link */}
        <p className="text-center text-xs text-gray-500 dark:text-[#F6F0D7]/60 mt-4">
          Already have an account?{" "}
          <Link
            href="/registrationProcess/login"
            className="text-[#2F8F46] dark:text-[#B7E35F] font-bold hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
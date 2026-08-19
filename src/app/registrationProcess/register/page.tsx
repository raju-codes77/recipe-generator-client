"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiUser, FiMail, FiLock, FiImage, FiArrowRight, FiCheckCircle, FiShield } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";
import { signUp, signIn } from "@/app/lib/auth-client";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user"); // ডিফল্ট রোল user
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const passwordSteps = [
    { label: "At least 8 characters long", met: password.length >= 8 },
    { label: "Contains a uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains a number", met: /[0-9]/.test(password) },
    { label: "Contains a special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await signUp.email(
      {
        email,
        password,
        name,
        image: image || undefined,
        role,
      } as any,
      {
        onSuccess: () => {
          toast.success("Account created successfully! Redirecting...", {
            duration: 3000,
            position: "top-right",
          });
          setLoading(false);

          if (role === "admin") {
            router.push("/dashboard/admin");
          } else {
            router.push("/dashboard/users");
          }
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to create account!", {
            duration: 4000,
            position: "top-right",
          });
          setLoading(false);
        },
      }
    );
  };

  const handleGoogleSignUp = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      console.error("Google sign up failed", error);
      toast.error("Google sign up failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-[#EAF7E8]/40 dark:from-black dark:via-gray-900 dark:to-[#2F8F46]/10 p-4 relative overflow-hidden transition-colors duration-300 py-10">
      {/* Toast Notifications */}
      <Toaster />

      {/* Glossy Glow Background Elements */}
      <div className="absolute top-1/3 -right-10 w-80 h-80 bg-[#2F8F46]/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 -left-10 w-80 h-80 bg-[#FF9F43]/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Glossy Card Container */}
      <div className="w-full max-w-md bg-white/70 dark:bg-black/40 border border-white/40 dark:border-[#89986D]/30 backdrop-blur-2xl p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] relative z-10">
        
        {/* Top Logo */}
        <div className="text-center mb-6 flex flex-col items-center">
          <div className="mb-3 rounded-2xl p-2 bg-white/50 dark:bg-black/50 border border-white/50 dark:border-[#89986D]/30 shadow-md shadow-[#2F8F46]/20 backdrop-blur-md flex items-center justify-center">
            <Image 
              src="/logo.png" 
              alt="FlavorAI Logo" 
              width={148}   
              height={80}  
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-[#F6F0D7]">Create an Account</h1>
          <p className="text-xs text-gray-500 dark:text-[#F6F0D7]/60 mt-1">
            Join FlavorAI to start your culinary journey
          </p>
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
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/50 dark:bg-[#89986D]/10 border border-gray-200 dark:border-[#89986D]/20 text-xs text-gray-900 dark:text-[#F6F0D7] focus:outline-none focus:border-[#2F8F46] backdrop-blur-md"
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
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/50 dark:bg-[#89986D]/10 border border-gray-200 dark:border-[#89986D]/20 text-xs text-gray-900 dark:text-[#F6F0D7] focus:outline-none focus:border-[#2F8F46] backdrop-blur-md"
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
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/50 dark:bg-[#89986D]/10 border border-gray-200 dark:border-[#89986D]/20 text-xs text-gray-900 dark:text-[#F6F0D7] focus:outline-none focus:border-[#2F8F46] backdrop-blur-md"
              />
            </div>
          </div>

          {/* Password 4 Steps Checklist */}
          <div className="p-3 rounded-xl bg-white/40 dark:bg-[#89986D]/5 border border-gray-100 dark:border-[#89986D]/10 space-y-1.5 backdrop-blur-sm">
            <p className="text-[10px] font-bold text-gray-500 dark:text-[#F6F0D7]/60 uppercase tracking-wide">Password Requirements:</p>
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
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/50 dark:bg-[#89986D]/10 border border-gray-200 dark:border-[#89986D]/20 text-xs text-gray-900 dark:text-[#F6F0D7] focus:outline-none focus:border-[#2F8F46] backdrop-blur-md"
              />
            </div>
          </div>

          {/* Role Selection Dropdown / Selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-[#F6F0D7]/80 mb-1">Select Role</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400"><FiShield /></span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as "user" | "admin")}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/50 dark:bg-[#89986D]/10 border border-gray-200 dark:border-[#89986D]/20 text-xs text-gray-900 dark:text-[#F6F0D7] focus:outline-none focus:border-[#2F8F46] backdrop-blur-md cursor-pointer"
              >
                <option value="user" className="dark:bg-gray-900">User (Standard Chef)</option>
                <option value="admin" className="dark:bg-gray-900">Admin (Manager)</option>
              </select>
            </div>
          </div>

          {/* Create Account Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#2F8F46] to-[#176B35] hover:opacity-95 text-white font-bold rounded-xl shadow-lg shadow-[#2F8F46]/30 transition flex items-center justify-center gap-2 text-xs mt-2 disabled:opacity-50"
          >
            <span>{loading ? "Creating Account..." : "Create Account"}</span>
            {!loading && <FiArrowRight size={16} />}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-grow border-t border-gray-200 dark:border-[#89986D]/20" />
          <span className="px-3 text-[10px] uppercase font-semibold text-gray-400 dark:text-[#F6F0D7]/40">or</span>
          <div className="flex-grow border-t border-gray-200 dark:border-[#89986D]/20" />
        </div>

        {/* Google Signup Button */}
        <button 
          type="button"
          onClick={handleGoogleSignUp}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-gray-200 dark:border-[#89986D]/20 bg-white/60 dark:bg-[#89986D]/10 hover:bg-white dark:hover:bg-[#89986D]/20 text-xs font-semibold text-gray-800 dark:text-[#F6F0D7] transition shadow-sm backdrop-blur-md"
        >
          <FcGoogle size={20} />
          <span>Sign up with Google</span>
        </button>

        <p className="text-center text-xs text-gray-500 dark:text-[#F6F0D7]/60 mt-6">
          Already have an account?{" "}
          <Link href="/registrationProcess/login" className="text-[#2F8F46] dark:text-[#B7E35F] font-bold hover:underline">
            Log in
          </Link>
        </p>

      </div>
    </div>
  );
}
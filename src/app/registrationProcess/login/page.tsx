"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiArrowRight,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
  FiAlertTriangle,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast"; // ১. react-hot-toast ইমপোর্ট করা হলো

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ভুলAttempts এবং ব্লক টাইমার ম্যানেজ করার জন্য স্টেট
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(0); // সেকেন্ডে হিসাব হবে

  // টাইমার কাউন্টডাউন ইফেক্ট (৫ মিনিট = ৩০০ সেকেন্ড)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (lockoutTime > 0) {
      timer = setInterval(() => {
        setLockoutTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [lockoutTime]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // যদি ব্লকড থাকে তাহলে সাবমিট করতে দেবে না
    if (lockoutTime > 0) {
      toast.error("Your account is temporarily locked. Please wait.");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);
    toast.loading("Signing in to your account...", { id: "login" }); // লোডিং টোস্ট

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
      });

      if (error) {
        toast.dismiss("login");
        // পাসওয়ার্ড বা ইমেইল ভুল হলে কাউন্ট বাড়াতে হবে
        const newAttempts = failedAttempts + 1;
        setFailedAttempts(newAttempts);

        if (newAttempts >= 3) {
          setLockoutTime(300); // ৫ মিনিট (৩০০ সেকেন্ড) লক করে দেওয়া হলো
          const msg = "Too many failed attempts. Account suspended for 5 minutes.";
          setError(msg);
          toast.error(msg); // লকআউট টোস্ট
          setFailedAttempts(0); // কাউন্ট রিসেট
        } else {
          const msg =
            error.message ||
            `Invalid email or password. Attempt ${newAttempts} of 3.`;
          setError(msg);
          toast.error(msg); // ভুল পাসওয়ার্ডের এরর টোস্ট
        }
        setLoading(false);
        return;
      }

      // সফলভাবে লগইন হলে কাউন্ট রিসেট
      toast.dismiss("login");
      setFailedAttempts(0);
      console.log("Login successful:", data);
      
      const successMsg = "Login successful! Redirecting...";
      setSuccess(successMsg);
      toast.success(successMsg); // সাকসেস টোস্ট

      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);
      toast.dismiss("login");
      const msg = "Something went wrong. Please try again.";
      setError(msg);
      toast.error(msg); // অপ্রত্যাশিত এরর টোস্ট
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (lockoutTime > 0) {
      toast.error("Your account is temporarily locked. Please wait.");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);
    toast.loading("Connecting with Google...", { id: "google-login" });

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      console.error("Google login error:", err);
      toast.dismiss("google-login");
      const msg = "Google login failed. Please try again.";
      setError(msg);
      toast.error(msg); // এরর টোস্ট
      setLoading(false);
    }
  };

  // মিনিট এবং সেকেন্ড ফরম্যাট করার ফাংশন
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#89986D]/20 via-white to-white dark:from-black dark:via-gray-950 dark:to-black p-4 transition-colors duration-500 overflow-hidden">
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-5xl bg-white dark:bg-[#141414] rounded-3xl shadow-[0_20px_50px_-15px_rgba(137,152,109,0.2)] overflow-hidden flex border border-gray-100 dark:border-[#333]"
      >

        {/* LEFT COLUMN: Image / Branding Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#89986D]/5 dark:bg-[#1a1a1a] p-12 flex-col justify-between relative">
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#2F8F46]/10 rounded-full blur-2xl" />
          
          <div className="relative z-10 flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-[#2F8F46] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#2F8F46]/30">
              FC
             </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white">Food Canvas</span>
          </div>

          <div className="relative z-10 flex-grow flex items-center justify-center">
             <div className="text-center p-10 bg-white/50 dark:bg-black/30 rounded-3xl border border-gray-100 dark:border-gray-800 backdrop-blur-sm">
                <FiCheckCircle className="w-16 h-16 text-[#2F8F46] mx-auto mb-6" strokeWidth={1.5}/>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Welcome Back to Food Canvas!</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Access your personalized AI meal plans and recipes instantly.</p>
             </div>
          </div>

          <div className="relative z-10 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 pt-6">
            <p className="italic">&quot;Food Canvas revolutionized how I cook. The recipes are fantastic and the AI suggestions are spot on!&quot;</p>
            <p className="font-semibold text-gray-900 dark:text-white mt-3">- Sarah J, Home Chef</p>
          </div>
        </div>

        {/* RIGHT COLUMN: Login Form Section */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          
          <div className="text-center mb-8">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-[#2F8F46] flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-[#2F8F46]/30 mb-3 lg:hidden">
              FC
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back!</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Log in to your Food Canvas account</p>
          </div>

          {/* Lockout Warning Banner */}
          {lockoutTime > 0 && (
            <div className="mb-5 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-xs font-medium flex items-center gap-2.5">
              <FiAlertTriangle size={18} className="shrink-0" />
              <span>
                Too many incorrect attempts. Please try again in{" "}
                <strong className="font-bold underline">{formatTime(lockoutTime)}</strong>.
              </span>
            </div>
          )}

          {error && lockoutTime === 0 && (
            <div className="mb-5 p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-xs font-medium flex items-center gap-2">
                <FiMail size={16}/> {error}
            </div>
          )}

          {success && (
            <div className="mb-5 p-4 rounded-2xl bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-xs font-medium flex items-center gap-2">
                <FiCheckCircle size={16}/> {success}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email Input */}
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1.5 pl-1">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 dark:text-gray-500">
                  <FiMail size={18} />
                </span>
                <input
                  type="email"
                  value={email}
                  disabled={lockoutTime > 0}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="chef@foodcanvas.com"
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F8F46]/30 focus:border-[#2F8F46] transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password Input with Show/Hide Toggle */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                 <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 pl-1">
                   Password
                 </label>
                 <Link href="/forgot-password" className="text-xs text-[#2F8F46] dark:text-[#89986D] hover:underline font-medium pr-1">
                   Forgot Password?
                 </Link>
              </div>
              
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 dark:text-gray-500">
                  <FiLock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  disabled={lockoutTime > 0}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-12 py-3.5 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F8F46]/30 focus:border-[#2F8F46] transition-all disabled:opacity-50"
                />
                <button
                  type="button"
                  disabled={lockoutTime > 0}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Password Requirements Box */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 space-y-2.5">
              <p className="text-[10px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-wider">
                Password must meet:
              </p>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
                {passwordSteps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs">
                    <FiCheckCircle
                      className={step.met ? "text-[#2F8F46]" : "text-gray-300 dark:text-gray-600"}
                      size={14}
                      strokeWidth={2.5}
                    />
                    <span className={step.met ? "text-gray-700 dark:text-gray-200" : "text-gray-400 dark:text-gray-500"}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-300 cursor-pointer group">
                <input type="checkbox" disabled={lockoutTime > 0} className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-[#2F8F46] focus:ring-[#2F8F46] bg-white dark:bg-[#1a1a1a]" />
                <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Remember me</span>
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading || lockoutTime > 0}
              className="w-full py-4 bg-[#2F8F46] hover:bg-[#287a3b] text-white font-semibold rounded-2xl shadow-lg shadow-[#2F8F46]/20 transition-all flex items-center justify-center gap-2.5 text-sm disabled:opacity-60 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{loading ? "Signing in..." : lockoutTime > 0 ? `Locked (${formatTime(lockoutTime)})` : "Sign In to Food Canvas"}</span>
              {!loading && lockoutTime === 0 && <FiArrowRight size={18} />}
            </button>
          </form>

          <div className="flex items-center my-5">
            <div className="flex-grow border-t border-gray-100 dark:border-gray-800" />
            <span className="px-4 text-[11px] uppercase font-medium text-gray-400 dark:text-gray-600">or</span>
            <div className="flex-grow border-t border-gray-100 dark:border-gray-800" />
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading || lockoutTime > 0}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] hover:bg-gray-50 dark:hover:bg-[#262626] text-sm font-medium text-gray-700 dark:text-gray-200 transition shadow-sm disabled:opacity-50"
          >
            <FcGoogle size={22} />
            <span>Continue with Google</span>
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#2F8F46] dark:text-[#89986D] font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>

       <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#FF9F43]/10 dark:bg-[#FF9F43]/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
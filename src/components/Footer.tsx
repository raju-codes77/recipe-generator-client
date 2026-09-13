"use client";

import Link from "next/link";
import Image from "next/image";
import { FiMail, FiSend, FiHeart } from "react-icons/fi";
// Thik library use korle icon asbe, nicher icons gulo standard use kora holo
import { FaFaceAngry, FaInstagram, FaYoutube } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({ 
  subsets: ["latin"], 
  weight: ["500", "600", "700"],
  display: "swap"
});

export default function Footer() {
    return (
        <footer className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-gray-100 dark:border-slate-800 transition-colors duration-300 text-gray-600 dark:text-slate-300">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16">

                {/* Top Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">

                    {/* Brand & Info (Takes 2 columns on large screens) */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link
                            href="/"
                            className="flex items-center gap-2 group w-fit"
                            aria-label="FoodCanvas - Go to homepage"
                        >
                            {/* Icon Container */}
                            <div className="flex shrink-0 transition-transform duration-300 group-hover:scale-105">
                                <img
                                    src="/navbar_logo.png"
                                    alt="FoodCanvas Logo"
                                    className="w-[34px] h-[34px] md:w-[38px] md:h-[38px] lg:w-[42px] lg:h-[42px] object-contain"
                                />
                            </div>

                            {/* Brand Name */}
                            <div className="flex flex-col leading-none">
                                <div className="relative flex items-center">
                                    <span 
                                        className={`${fredoka.className} text-[24px] md:text-[26px] lg:text-[28px] font-semibold tracking-wide`}
                                        style={{
                                            background: 'linear-gradient(90deg, #176B4D 0%, #65A947 45%, #F2B84B 75%, #F08A35 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                        }}
                                    >
                                        FoodCanvas
                                    </span>
                                    <svg 
                                        className="absolute -top-1 -right-3 w-4 h-4 text-[#65A947] opacity-90 transform rotate-12" 
                                        viewBox="0 0 24 24" 
                                        fill="currentColor"
                                    >
                                        <path d="M17.05,20.28c0.8,0.76,2.06,0.67,2.78-0.12c1.78-1.92,3.31-5.61,1.52-11.41C18.66,0.1,6.58-1.8,2.7,2.2c0,0-1.83,6.31,1.4,11.23c1.78,2.71,5.32,4.64,8.55,4.64c0.88,0,1.76-0.15,2.61-0.45l2.42,2.3c0.76,0.73,1.96,0.65,2.62-0.16c0.55-0.66,0.5-1.63-0.09-2.22L17.05,20.28z M12.65,15.65c-2.42,0-5.18-1.46-6.55-3.53C3.59,8.34,4.95,3.33,4.95,3.33c2.9-2.9,12.28-1.5,14.63,6.17c1.37,4.45,0.18,7.38-1.12,8.79C16.94,19.86,14.77,15.65,12.65,15.65z"/>
                                    </svg>
                                </div>
                                <span className="text-[10px] tracking-[0.15em] uppercase font-semibold text-slate-400 dark:text-slate-500 mt-1 pl-0.5">
                                    Ignite Your Taste
                                </span>
                            </div>
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-slate-400 max-w-sm leading-relaxed">
                            FoodCanvas is your smart culinary companion. Generate AI-powered recipes, manage your pantry, and join a vibrant community of passionate food lovers.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3 pt-2">
                            <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-600 dark:text-slate-300 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white transition-colors">
                                <FaFaceAngry size={14} />
                            </a>
                            <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-600 dark:text-slate-300 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white transition-colors">
                                <FaTwitterSquare size={14} />
                            </a>
                            <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-600 dark:text-slate-300 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white transition-colors">
                                <FaInstagram size={14} />
                            </a>
                            <a href="#" aria-label="Youtube" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-600 dark:text-slate-300 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white transition-colors">
                                <FaYoutube size={14} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                            Quick Links
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/recipes" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                    Recipes
                                </Link>
                            </li>
                            <li>
                                <Link href="/ai-tools" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                    AI Tools
                                </Link>
                            </li>
                            <li>
                                <Link href="/community" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                    Community
                                </Link>
                            </li>
                            <li>
                                <Link href="/challenges" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                    Challenges
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal / Support */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                            Support & Legal
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/help" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookie-policy" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Subscription */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                            Stay Updated
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-slate-400">
                            Subscribe to get special recipe recommendations and AI cooking tips straight to your inbox.
                        </p>
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <FiMail size={16} />
                                </span>
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-gray-700 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm shadow-emerald-600/20"
                            >
                                <span>Subscribe</span>
                                <FiSend size={14} />
                            </button>
                        </form>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-slate-400">
                    <p>© {new Date().getFullYear()} FoodCanvas. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Made with <FiHeart className="text-red-500" size={14} /> for food lovers.
                    </p>
                </div>

            </div>
        </footer>
    );
}
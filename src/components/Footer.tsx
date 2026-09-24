"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMail, FiSend, FiHeart } from "react-icons/fi";
// Thik library use korle icon asbe, nicher icons gulo standard use kora holo
import { FaFaceAngry, FaInstagram, FaYoutube } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import { Fredoka } from "next/font/google";
import toast from "react-hot-toast";

const fredoka = Fredoka({ 
  subsets: ["latin"], 
  weight: ["500", "600", "700"],
  display: "swap"
});

const RESTING_EDGE = "M 0 16 L 1000 16";
const RESTING_FILL = `${RESTING_EDGE} L 1000 32 L 0 32 Z`;

function getWavePaths(amplitude: number, phase: number) {
    const segments = 48;
    const points = Array.from({ length: segments + 1 }, (_, index) => {
        const position = index / segments;
        const envelope = Math.sin(Math.PI * position);
        const wave = Math.sin(position * Math.PI * 2 + phase);
        const y = 16 + amplitude * envelope * wave;
        return `${(position * 1000).toFixed(1)} ${y.toFixed(2)}`;
    });
    const edge = `M ${points[0]} L ${points.slice(1).join(" L ")}`;

    return { edge, fill: `${edge} L 1000 32 L 0 32 Z` };
}

function FooterBounceEdge({ footerRef }: { footerRef: RefObject<HTMLElement | null> }) {
    const [paths, setPaths] = useState({ edge: RESTING_EDGE, fill: RESTING_FILL });

    useEffect(() => {
        let amplitude = 0;
        let phase = 0;
        let previousFrameTime = 0;
        let previousScrollY = window.scrollY;
        let previousScrollTime = performance.now();
        let lastImpactTime = 0;
        let animationFrame = 0;

        const isAtPageBottom = () =>
            document.documentElement.scrollHeight - (window.scrollY + window.innerHeight) <= 3;
        let wasAtBottom = isAtPageBottom();

        const triggerWave = (speed: number) => {
            const now = performance.now();
            if (speed < 0.55 || now - lastImpactTime < 240) return;
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

            lastImpactTime = now;
            amplitude = Math.max(amplitude, Math.min(4 + speed * 1.5, 9));
            phase = 0;
            if (animationFrame === 0) animationFrame = window.requestAnimationFrame(animateWave);
        };

        const animateWave = (time: number) => {
            animationFrame = 0;
            const elapsed = previousFrameTime ? Math.min(time - previousFrameTime, 32) : 16;
            previousFrameTime = time;
            amplitude *= Math.exp(-elapsed / 340);
            phase += elapsed * 0.009;

            if (amplitude < 0.2) {
                amplitude = 0;
                previousFrameTime = 0;
                setPaths({ edge: RESTING_EDGE, fill: RESTING_FILL });
                return;
            }

            setPaths(getWavePaths(amplitude, phase));
            animationFrame = window.requestAnimationFrame(animateWave);
        };

        const handleScroll = () => {
            const now = performance.now();
            const currentY = window.scrollY;
            const elapsed = Math.max(now - previousScrollTime, 16);
            const velocity = (currentY - previousScrollY) / elapsed;
            previousScrollY = currentY;
            previousScrollTime = now;

            const atBottom = isAtPageBottom();
            const reachedBottom = !wasAtBottom && atBottom;
            wasAtBottom = atBottom;

            if (reachedBottom && velocity > 0 && footerRef.current) triggerWave(velocity);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (animationFrame !== 0) window.cancelAnimationFrame(animationFrame);
        };
    }, [footerRef]);

    return (
        <svg
            aria-hidden="true"
            className="pointer-events-none absolute -top-4 inset-x-0 z-0 h-8 w-full overflow-visible"
            viewBox="0 0 1000 32"
            preserveAspectRatio="none"
        >
            <path d={paths.fill} className="fill-white/80 dark:fill-[#080B12]" />
            <path d={paths.edge} fill="none" className="stroke-black/10 dark:stroke-white/10" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
    );
}

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);

    return (
        <footer
            ref={footerRef}
            className="relative w-full pt-4 text-gray-600 dark:text-slate-300"
        >
            <FooterBounceEdge footerRef={footerRef} />
            <div className="relative z-10 bg-white/80 dark:bg-[#080B12] backdrop-blur-md transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 pt-4 pb-12 lg:px-10 lg:pt-8 lg:pb-16">

                {/* Top Grid Section */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">

                    {/* Brand & Info (Takes 2 columns on large screens) */}
                    <div className="col-span-2 md:col-span-1 lg:col-span-2 space-y-4">
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
                    <div className="col-span-1 md:col-span-1 space-y-4 lg:text-center">
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
                    <div className="space-y-4 lg:text-center">
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
                    <div className="col-span-2 md:col-span-1 space-y-4">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                            Stay Updated
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-slate-400">
                            Subscribe to get special recipe recommendations and AI cooking tips straight to your inbox.
                        </p>
                        <form onSubmit={(e) => { e.preventDefault(); toast.success("Successfully subscribed to the newsletter!"); }} className="space-y-2">
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
            </div>
        </footer>
    );
}

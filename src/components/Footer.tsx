"use client";

import React from "react";
import Image from "next/image";
import {
    Send,
    Heart,
    Mail,
    Phone,
    MapPin
} from "lucide-react";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="w-full bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-900 transition-colors duration-300 relative overflow-hidden">

            {/* Decorative Glow Background */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-12 relative z-10">

                {/* Top Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-16 border-b border-gray-100 dark:border-gray-900">

                    {/* Column 1 & 2: Real Logo and About (Spanning 2 cols) */}
                    <div className="lg:col-span-2 flex flex-col items-start space-y-5">
                        {/* Actual Logo Image with Balanced Professional Size */}
                        <div className="flex items-center">
                            <Image
                                src="/logo1.png"
                                alt="FoodCanvas Logo"
                                width={380}
                                height={150}
                                className="h-16 w-auto object-contain"
                                priority
                            />
                        </div>

                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm">
                            Transform your daily cooking experience with smart AI-powered recipes, personalized nutrition insights, and a vibrant community of food lovers.
                        </p>

                        {/* Contact Details */}
                        <div className="space-y-2.5 pt-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-2.5">
                                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                                <span>123 Culinary Ave, Foodie Street, NY</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                                <span>support@foodcanvas.com</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                                <span>+1 (555) 839-2041</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                            Quick Links
                        </h4>
                        <ul className="space-y-3 text-sm font-medium">
                            <li>
                                <a href="/recipes" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Browse Recipes</a>
                            </li>
                            <li>
                                <a href="/pantry" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Pantry-to-Plate AI</a>
                            </li>
                            <li>
                                <a href="/collections" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">My Collections</a>
                            </li>
                            <li>
                                <a href="/nutrition" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Nutrition Insights</a>
                            </li>
                            <li>
                                <a href="/community" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Community</a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Legal & Support */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                            Support
                        </h4>
                        <ul className="space-y-3 text-sm font-medium">
                            <li>
                                <a href="/help" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Help Center</a>
                            </li>
                            <li>
                                <a href="/terms" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Terms of Service</a>
                            </li>
                            <li>
                                <a href="/privacy" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="/cookie" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Cookie Policy</a>
                            </li>
                            <li>
                                <a href="/contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Contact Us</a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 5: Newsletter */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                            Stay Updated
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                            Subscribe to our newsletter for weekly trending recipes and cooking tips.
                        </p>
                        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col space-y-2.5">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
                            >
                                <span>Subscribe</span>
                                <Send className="w-3.5 h-3.5" />
                            </button>
                        </form>
                    </div>

                </div>

                {/* Bottom Bar Section */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">

                    {/* Copyright */}
                    <p>© {new Date().getFullYear()} FoodCanvas. All rights reserved.</p>

                    {/* Made with love */}
                    <div className="flex items-center gap-1">
                        <span>Crafted with</span>
                        <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 mx-0.5" />
                        <span>for food enthusiasts</span>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center space-x-3">
                        <a href="#" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-emerald-600 hover:text-white transition-colors">
                            <FaFacebookF className="w-3.5 h-3.5" />
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-emerald-600 hover:text-white transition-colors">
                            <FaTwitter className="w-3.5 h-3.5" />
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-emerald-600 hover:text-white transition-colors">
                            <FaInstagram className="w-3.5 h-3.5" />
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-emerald-600 hover:text-white transition-colors">
                            <FaLinkedinIn className="w-3.5 h-3.5" />
                        </a>
                    </div>

                </div>

            </div>
        </footer>
    );
}
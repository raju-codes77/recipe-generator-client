"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, Menu, X, Sun, Moon, ChefHat } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Recipes", href: "/recipes" },
    { name: "AI Tools", href: "/ai-tools" },
    { name: "Community", href: "/community" },
    { name: "Challenges", href: "/challenges" },
  ];

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setIsDarkMode(true);
    }
  };

  return (
    <div className="w-full sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 transition-colors duration-300">
      <header className="flex items-center justify-between px-6 lg:px-10 py-3 lg:py-4">

        {/* Left Section: Logo & Nav */}
        <div className="flex items-center gap-12 lg:gap-16">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group transition-all duration-300">
  <div className="bg-green-500 p-1.5 rounded-lg text-white group-hover:rotate-12 transition-transform">
    <ChefHat size={20} />
  </div>
  <h1 className="text-2xl font-extrabold tracking-tight">
    <span className="text-gray-900 dark:text-white">Food</span>
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 ml-1">
      Canvas
    </span>
  </h1>
</Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[15px] transition-colors ${isActive
                      ? "font-bold text-emerald-700 dark:text-emerald-400"
                      : "font-medium text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Section (Search & Actions) */}
        <div className="flex items-center gap-4 sm:gap-6">

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex items-center relative">
            <div className="absolute left-3 text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search recipes, ingredient..."
              className="w-64 pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-gray-700 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500"
            />
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors relative"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Sign Up Button */}
          <Link 
            href="/registrationProcess/register"
            className="hidden sm:block px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-full transition-colors shadow-sm shadow-emerald-600/20"
          >
            Sign Up
          </Link>

          {/* Notifications */}
          <button className="p-2 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
        <Link 
  href="/registrationProcess/login"
  className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200 transform hover:-translate-y-0.5"
>
  Sign In
</Link>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 shadow-lg px-6 z-50 rounded-b-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-4 py-4 border-t border-gray-100 dark:border-slate-800">
              <div className="flex items-center relative mb-2">
                <div className="absolute left-3 text-gray-400">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Search recipes, ingredient..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-gray-700 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500"
                />
              </div>

              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-[15px] py-2 transition-colors ${index !== navLinks.length - 1 ? "border-b border-gray-50 dark:border-slate-800" : ""
                      } ${isActive
                        ? "font-bold text-emerald-700 dark:text-emerald-400"
                        : "font-medium text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <Link
                href="/registrationProcess/register"
                className="text-[15px] font-bold text-emerald-700 dark:text-emerald-400 py-2 border-t border-gray-50 dark:border-slate-800 mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

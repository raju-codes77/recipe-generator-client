"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Bell, Menu, X, Sun, Moon, LogOut } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface NavbarProps {
  initialUser?: {
    name: string;
    email: string;
    image?: string;
  } | null;
}

export default function Navbar({ initialUser }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Test korar jonno by default true rakha holo
  const [user, setUser] = useState<{ name: string; email: string; image?: string } | null>(initialUser || {
    name: "John Doe",
    email: "john@example.com",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  });
  
  const pathname = usePathname();
  const router = useRouter();

  // Base nav links
  const baseNavLinks = [
    { name: "Home", href: "/" },
    { name: "Recipes", href: "/recipes" },
    { name: "AI Tools", href: "/ai-tools" },
    { name: "Community", href: "/community" },
    { name: "Challenges", href: "/challenges" },
  ];

  // Jodi user login thake, tahole navLinks er sathe "Dashboard" add hobe
  const navLinks = user 
    ? [...baseNavLinks, { name: "Dashboard", href: "/dashboard/users" }] 
    : baseNavLinks;

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

  const handleLogout = async () => {
    setUser(null);
    setIsMobileMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <div className="w-full sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 transition-colors duration-300">
      <header className="flex items-center justify-between px-6 lg:px-10 py-3 lg:py-4">

        {/* Left Section: Logo & Nav Links */}
        <div className="flex items-center gap-10 lg:gap-12">
          <div className="flex items-center gap-2">
          <Link 
  href="/" 
  className="flex items-center gap-2.5 group"
  aria-label="FoodCanvas - Go to homepage"
>
  {/* Logo Image */}
  <div className="relative w-12 h-12 lg:w-14 lg:h-14 shrink-0 transition-transform duration-200 group-hover:scale-105">
    <Image
      src="/logohere.png"
      alt="FoodCanvas Logo"
      fill
      className="object-contain"
      priority
      sizes="(max-width: 1024px) 48px, 56px"
    />
  </div>

  {/* Brand Name */}
  <div className="flex flex-col leading-none">
    <span className="text-xl lg:text-2xl font-extrabold tracking-tight">
      <span className="text-[#2F8F46] dark:text-[#4ADE80]">Food</span>
      <span className="text-[#FF6B35]">Canvas</span>
    </span>
    <span className="text-[10px] tracking-[0.15em] uppercase font-semibold text-slate-400 dark:text-slate-500 mt-1">
      Ignite Your Taste
    </span>
  </div>
</Link>
          </div>

          {/* Desktop Navigation Links (Dashboard ekhane automatically add hobe login thakle) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[15px] transition-colors ${
                    isActive
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

          <button
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors relative"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Conditional Rendering for Desktop (User profile & Logout) */}
          {user ? (
            <>
              <button className="p-2 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="hidden sm:flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                    <Image
                      src={user.image || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                      alt="User profile"
                      width={36}
                      height={36}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-slate-200 max-w-[100px] truncate">
                    {user.name}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-slate-800 dark:text-red-400 dark:hover:bg-slate-700 text-sm font-semibold rounded-full transition-colors shadow-sm"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link 
                href="/registrationProcess/register"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-full transition-colors shadow-sm shadow-emerald-600/20"
              >
                Sign Up
              </Link>
            </div>
          )}

          <button
            className="md:hidden p-2 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
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
            className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 shadow-lg px-6 z-50 rounded-b-2xl overflow-hidden border-b border-gray-100 dark:border-slate-800"
          >
            <div className="flex flex-col gap-4 py-4">
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

              {/* Mobile Nav Links (Dashboard included here automatically if logged in) */}
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-[15px] py-2 transition-colors ${
                      index !== navLinks.length - 1 ? "border-b border-gray-50 dark:border-slate-800" : ""
                    } ${
                      isActive
                        ? "font-bold text-emerald-700 dark:text-emerald-400"
                        : "font-medium text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-3 border-t border-gray-100 dark:border-slate-800 flex flex-col gap-3">
                {user ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 py-1">
                      <div className="h-9 w-9 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                        <Image
                          src={user.image || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                          alt="User profile"
                          width={36}
                          height={36}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-800 dark:text-slate-100 truncate">
                        {user.name}
                      </span>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-slate-800 dark:text-red-400 dark:hover:bg-slate-700 text-sm font-semibold rounded-full transition-colors"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/registrationProcess/register"
                    className="flex items-center justify-center w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-full transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Menu, X, Sun, Moon, LogOut } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const userRole = user && typeof user === 'object' && 'role' in user 
    ? String((user as any).role).toLowerCase() 
    : "user";

  const baseNavLinks = [
    { name: "Home", href: "/" },
    { name: "Recipes", href: "/recipes" },
    { name: "AI Tools", href: "/ai-tools" },
    { name: "Community", href: "/community" },
    { name: "Challenges", href: "/challenges" },
  ];

  const dashboardHref = userRole === "admin" ? "/dashboard/admin" : "/dashboard/users";

  const navLinks = user 
    ? [...baseNavLinks, { name: "Dashboard", href: dashboardHref }] 
    : baseNavLinks;

  // ইউজার নেম থেকে প্রথম অক্ষর বের করার ফাংশন (রিয়েল ইমেজ না থাকলে এটি দেখাবে)
  const getInitials = (name?: string) => {
    if (!name) return "FC";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

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
      toast("Light mode activated ☀️", { icon: '🔆' });
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setIsDarkMode(true);
      toast("Dark mode activated 🌙", { icon: '🌙' });
    }
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            setIsMobileMenuOpen(false);
            toast.success("Successfully logged out!");
            router.push("/");
            router.refresh();
          },
        },
      });
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="w-full sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 transition-colors duration-300">
      <header className="flex items-center justify-between px-6 lg:px-10 py-3 lg:py-4">

        {/* Left Section */}
        <div className="flex items-center gap-10 lg:gap-12">
          <div className="flex items-center gap-2">
            <Link 
              href="/" 
              className="flex items-center gap-2.5 group"
              aria-label="FoodCanvas - Go to homepage"
            >
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

          <nav className="hidden md:flex items-center gap-2 lg:gap-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 text-[15px] rounded-xl font-medium transition-all duration-200 ${
                    isActive
                      ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-slate-800 font-semibold shadow-sm"
                      : "text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-emerald-600 dark:bg-emerald-400 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors relative"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {isPending ? (
            <div className="w-24 h-9 bg-gray-200 dark:bg-slate-800 animate-pulse rounded-full" />
          ) : user ? (
            <>
              <button 
                onClick={() => toast("You have no new notifications", { icon: '🔔' })}
                className="p-2 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors relative"
              >
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="hidden sm:flex items-center gap-3">
                <div className="flex items-center gap-2.5 bg-gray-50 dark:bg-slate-800/60 py-1.5 px-3 rounded-full border border-gray-100 dark:border-slate-800">
                  
                  {/* রিয়েল ইমেজ হ্যান্ডলিং (ডামি ইমেজ বাদ) */}
                  <div className="h-8 w-8 rounded-full overflow-hidden border border-emerald-500/30 flex-shrink-0 relative bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User profile"}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    ) : (
                      <span>{getInitials(user.name)}</span>
                    )}
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
                href="/registrationProcess/login"
                className="px-4 py-2 text-gray-700 dark:text-slate-200 hover:text-emerald-600 text-sm font-semibold transition-colors"
              >
                Log in
              </Link>
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
            className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 shadow-xl px-6 z-50 rounded-b-2xl overflow-hidden border-b border-gray-100 dark:border-slate-800"
          >
            <div className="flex flex-col gap-2 py-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-[15px] px-4 py-2.5 rounded-xl transition-colors ${
                      isActive
                        ? "font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-slate-800"
                        : "font-medium text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800/50"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-3 mt-2 border-t border-gray-100 dark:border-slate-800 flex flex-col gap-3">
                {user ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 py-1">
                      <div className="h-9 w-9 rounded-full overflow-hidden border border-emerald-500/30 flex-shrink-0 relative bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                        {user.image ? (
                          <Image
                            src={user.image}
                            alt={user.name || "User profile"}
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                        ) : (
                          <span>{getInitials(user.name)}</span>
                        )}
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
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/registrationProcess/login"
                      className="flex items-center justify-center w-full py-2.5 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 text-sm font-semibold rounded-full transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      href="/registrationProcess/register"
                      className="flex items-center justify-center w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-full transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
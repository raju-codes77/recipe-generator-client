"use client";

import { useState, useEffect, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Menu, X, Sun, Moon, LogOut, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({ 
  subsets: ["latin"], 
  weight: ["500", "600", "700"],
  display: "swap"
});

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const userRole =
    user && typeof user === "object" && "role" in user
      ? String((user as any).role).toLowerCase()
      : "user";

  const baseNavLinks = [
    { name: "Home", href: "/" },
    { name: "Recipes", href: "/recipes" },
    { name: "AI Tools", href: "/ai-tools" },
    { name: "Community", href: "/community" },
    { name: "Challenges", href: "/challenges" },
  ];

  const dashboardHref =
    userRole === "admin" ? "/dashboard/admin" : "/dashboard/users";

  const navLinks = user
    ? [...baseNavLinks, { name: "Dashboard", href: dashboardHref }]
    : baseNavLinks;

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
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      toast("Light mode activated ☀️", { icon: "🔆" });
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setIsDarkMode(true);
      toast("Dark mode activated 🌙", { icon: "🌙" });
    }
  };

  const handleNavLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const isUnmodifiedLeftClick =
      event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey;

    if (
      href === "/community" &&
      pathname === "/community" &&
      isUnmodifiedLeftClick
    ) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.dispatchEvent(new Event("community:refresh"));
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
    <div
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-100/50 dark:border-slate-800/50 shadow-sm"
          : "bg-transparent border-b border-transparent"
        }`}
    >
      <header className="max-w-[1440px] mx-auto flex items-center justify-between px-6 lg:px-12 py-4 lg:py-5">

        {/* Left Section */}
        <div className="flex items-center gap-10 lg:gap-14">
          <Link
            href="/"
            className="flex items-center gap-2 h-12 shrink-0 group"
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
            {/* Brand Text */}
            <div className="relative flex items-center h-full">
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
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
  key={link.name}
  href={link.href}
  onClick={(event) => handleNavLinkClick(event, link.href)}
  className={`relative px-4 py-2.5 text-[15px] rounded-full transition-all duration-300 ${
    isActive
      ? "text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50/80 dark:bg-emerald-500/10"
      : "text-slate-600 dark:text-slate-300 font-medium hover:text-emerald-600 dark:hover:text-emerald-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
  }`}
>
  {link.name}
</Link>
              );
            })}
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-5">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all duration-200"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={18} strokeWidth={2.5} /> : <Moon size={18} strokeWidth={2.5} />}
          </button>

          {/* Authentication Section */}
          {isPending ? (
            <div className="w-28 h-10 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-full" />
          ) : user ? (
            <>
              {/* Notifications */}
              <button
                onClick={() => toast("You have no new notifications", { icon: "🔔" })}
                className="p-2.5 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all duration-200 relative"
                aria-label="Notifications"
              >
                <Bell size={18} strokeWidth={2.5} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
              </button>

              {/* User Profile and Logout */}
              <div className="hidden sm:flex items-center gap-4 pl-2 border-l border-slate-200 dark:border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm relative bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold flex items-center justify-center text-xs">
                    {user.image ? (
                      <Image src={user.image} alt={user.name || "User profile"} fill sizes="36px" className="object-cover" />
                    ) : (
                      <span>{getInitials(user.name)}</span>
                    )}
                  </div>
                  <span className="text-[14px] font-semibold text-slate-700 dark:text-slate-200 max-w-[120px] truncate">
                    {user.name}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-all duration-200"
                  aria-label="Logout"
                  title="Logout"
                >
                  <LogOut size={18} strokeWidth={2.5} />
                </button>
              </div>
            </>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/registrationProcess/login"
                className="px-5 py-2.5 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 text-[15px] font-bold transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/registrationProcess/register"
                className="group relative px-6 py-2.5 text-white text-[15px] font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                style={{
                  background: 'linear-gradient(90deg, #154D31 0%, #24733E 50%, #10B981 100%)',
                  backgroundSize: '200% 100%',
                  transition: 'background-position 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundPosition = 'right center'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundPosition = 'left center'}
              >
                <span>Sign Up</span>
                <ChevronRight size={16} strokeWidth={3} className="opacity-70 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl px-6 pb-6 pt-2 z-50 rounded-b-3xl border-b border-slate-100 dark:border-slate-800"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-[16px] px-5 py-3.5 rounded-2xl transition-all ${isActive
                      ? "font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10"
                      : "font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      }`}
                    onClick={(event) => {
                      setIsMobileMenuOpen(false);
                      handleNavLinkClick(event, link.href);
                    }}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800/60 flex flex-col gap-3">
                {user ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 px-2">
                      <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-emerald-500/30 flex-shrink-0 relative bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                        {user.image ? (
                          <Image src={user.image} alt={user.name || "User"} fill sizes="48px" className="object-cover" />
                        ) : (
                          <span>{getInitials(user.name)}</span>
                        )}
                      </div>
                      <span className="text-[16px] font-bold text-slate-800 dark:text-slate-100">
                        {user.name}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 w-full py-3.5 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20 text-[15px] font-bold rounded-2xl transition-colors"
                    >
                      <LogOut size={18} strokeWidth={2.5} />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/registrationProcess/login"
                      className="flex items-center justify-center w-full py-3.5 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-white text-[15px] font-bold rounded-2xl transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      href="/registrationProcess/register"
                      className="flex items-center justify-center w-full py-3.5 text-white text-[15px] font-bold rounded-2xl transition-all shadow-lg"
                      style={{
                        background: 'linear-gradient(90deg, #154D31 0%, #24733E 50%, #10B981 100%)',
                        backgroundSize: '200% 100%',
                        transition: 'background-position 0.3s ease',
                      }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundPosition = 'right center'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundPosition = 'left center'}
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

"use client";

import { useState, useEffect, useRef, type MouseEvent } from "react";
import Image from "next/image";

import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";
import { Bell, Menu, X, Sun, Moon, LogOut, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { authClient } from "@/lib/auth-client";

import toast from "react-hot-toast";
import { Fredoka } from "next/font/google";
import { useNotifications } from "./notifications/NotificationContext";
import NotificationPanel from "./notifications/NotificationPanel";

const fredoka = Fredoka({ 
  subsets: ["latin"], 
  weight: ["500", "600", "700"],
  display: "swap"
});



function NavbarContent() {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const themeToastTimeoutRef = useRef<number | null>(null);



  const pathname = usePathname();

  const router = useRouter();

  const { togglePanel, unreadCount } = useNotifications();



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
    userRole === "admin" ? "/dashboard/admin" : "/dashboard/user";

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
    return () => {
      if (themeToastTimeoutRef.current !== null) {
        window.clearTimeout(themeToastTimeoutRef.current);
      }
    };
  }, []);

  const showThemeToast = (message: string, icon: string) => {
    toast.dismiss();

    if (themeToastTimeoutRef.current !== null) {
      window.clearTimeout(themeToastTimeoutRef.current);
    }

    themeToastTimeoutRef.current = window.setTimeout(() => {
      toast(message, {
        icon,
        duration: 2200,
      });
      themeToastTimeoutRef.current = null;
    }, 180);
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



  const toggleTheme = (event: MouseEvent<HTMLButtonElement>) => {
    const nextIsDarkMode = !isDarkMode;
    const root = document.documentElement;

    const applyTheme = () => {
      root.classList.toggle("dark", nextIsDarkMode);
      localStorage.theme = nextIsDarkMode ? "dark" : "light";
      setIsDarkMode(nextIsDarkMode);
      showThemeToast(
        nextIsDarkMode ? "Dark mode activated 🌙" : "Light mode activated ☀️",
        nextIsDarkMode ? "🌙" : "🔆",
      );
    };

    const transitionDocument = document as Document & {
      startViewTransition?: (callback: () => void) => { finished: Promise<void> };
    };

    if (
      !transitionDocument.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      applyTheme();
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const originX = bounds.left + bounds.width / 2;
    const originY = bounds.top + bounds.height / 2;
    const farthestCorner = Math.max(
      Math.hypot(originX, originY),
      Math.hypot(window.innerWidth - originX, originY),
      Math.hypot(originX, window.innerHeight - originY),
      Math.hypot(window.innerWidth - originX, window.innerHeight - originY),
    );

    root.style.setProperty("--theme-reveal-x", `${originX}px`);
    root.style.setProperty("--theme-reveal-y", `${originY}px`);
    root.style.setProperty("--theme-reveal-radius", `${Math.ceil(farthestCorner)}px`);

    const transition = transitionDocument.startViewTransition(() => {
      root.classList.add("theme-reveal-active");
      applyTheme();
    });

    const cleanupThemeTransition = () => {
      root.classList.remove("theme-reveal-active");
      root.style.removeProperty("--theme-reveal-x");
      root.style.removeProperty("--theme-reveal-y");
      root.style.removeProperty("--theme-reveal-radius");
    };
    void transition.finished.then(cleanupThemeTransition, cleanupThemeTransition);
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
      className={`w-full fixed top-0 z-50 transition-all duration-300 pt-4 px-4 md:px-8 pointer-events-none`}
    >
      <div className="relative mx-auto w-fit max-w-full pointer-events-auto">
      <motion.header
        data-nav-alignment
        layout="size"
        transition={{ layout: { type: "spring", stiffness: 160, damping: 28, mass: 1 } }}
        className={`w-fit max-w-[calc(100vw-2rem)] ${user ? "xl:min-w-[min(95%,1200px)]" : ""} mx-auto flex items-center justify-between px-6 lg:px-8 h-[60px] lg:h-[64px] rounded-[24px] pointer-events-auto transition-all duration-300 shadow-2xl ${scrolled
          ? "bg-white/95 dark:bg-[#161616]/95 backdrop-blur-xl border border-stone-200/50 dark:border-white/10"
          : "bg-white dark:bg-[#161616] border border-transparent dark:border-white/5"
        }`}
      >



        {/* Left Section */}
        <motion.div layout className="flex shrink-0 items-center gap-10 lg:gap-14">
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
          <motion.nav layout className="hidden shrink-0 items-center gap-1.5 lg:gap-2 xl:flex">
            <AnimatePresence initial={false}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.name}
                  layout
                  initial={link.name === "Dashboard" ? { opacity: 0, scale: 0 } : false}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={link.name === "Dashboard" ? { opacity: 0, scale: 0 } : undefined}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: "center" }}
                  className="shrink-0"
                >
                <Link
                  href={link.href}
                  onClick={(event) => handleNavLinkClick(event, link.href)}
                  className={`relative px-4 py-2 text-[14px] rounded-full transition-all duration-300 ${
                    isActive
                      ? "text-stone-900 dark:text-white font-bold bg-stone-100 dark:bg-white/10"
                      : "text-stone-600 dark:text-stone-300 font-medium hover:text-stone-900 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
                </motion.div>
              );
            })}
            </AnimatePresence>
          </motion.nav>
        </motion.div>



        {/* Right Section */}
        <motion.div layout className="ml-3 flex shrink-0 items-center gap-3 sm:ml-5 sm:gap-5 xl:ml-0">



          {/* Theme Toggle */}

            <button
              onClick={toggleTheme}
              className="p-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/10 rounded-full transition-all duration-200"
              aria-label="Toggle Dark Mode"
            >
            {isDarkMode ? <Sun size={18} strokeWidth={2.5} /> : <Moon size={18} strokeWidth={2.5} />}
          </button>



          {/* Authentication Section */}

          {isPending ? (
            <div className="w-28 h-10 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-full" />
          ) : user ? (
            <>

              <motion.div
                layout
                initial={{ opacity: 0, scale: 0, width: 0 }}
                animate={{ opacity: 1, scale: 1, width: "auto" }}
                exit={{ opacity: 0, scale: 0, width: 0 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "center" }}
                className="relative flex items-center"
              >
                <button
                  id="notification-bell-btn"
                  onClick={togglePanel}
                  className="p-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/10 rounded-full transition-all duration-200 relative"
                  aria-label="Notifications"
                >
                  <Bell size={18} strokeWidth={2.5} />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-bold px-1 min-w-[16px] h-[16px] rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>
                <NotificationPanel />
              </motion.div>



              {/* User Profile and Logout */}
              <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.45, duration: 0.38, ease: [0.22, 1, 0.36, 1] }} style={{ transformOrigin: "center" }} className="hidden xl:flex items-center gap-4 pl-3 border-l border-stone-200 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm relative bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold flex items-center justify-center text-xs">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User profile"}
                        fill
                        sizes="36px"
                        className="object-cover"
                        onError={(e) => {
                          // Hide the image element on error; the parent div's gradient initials will show instead
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <span>{getInitials(user.name)}</span>
                    )}

                  </div>
                  <span className="text-[14px] font-semibold text-stone-700 dark:text-stone-200 max-w-[120px] truncate">
                    {user.name}
                  </span>

                </div>



                <button

                  onClick={handleLogout}
                  className="p-2 text-stone-500 dark:text-stone-400 hover:text-red-600 dark:hover:text-rose-400 hover:bg-red-50 dark:hover:bg-rose-500/10 rounded-full transition-all duration-200"
                  aria-label="Logout"
                  title="Logout"
                >
                  <LogOut size={18} strokeWidth={2.5} />
                </button>

              </motion.div>

              {/* Keep the signed-in avatar visible beside the mobile menu button. */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="xl:hidden"
              >
                <Link
                  href={dashboardHref}
                  aria-label="Open dashboard"
                  title="Open dashboard"
                  className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-gradient-to-br from-emerald-500 to-teal-600 text-xs font-bold text-white shadow-sm transition-transform hover:scale-105 dark:border-slate-800"
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt=""
                      fill
                      sizes="36px"
                      className="object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <span>{getInitials(user.name)}</span>
                  )}
                </Link>
              </motion.div>

            </>

          ) : (
            <motion.div layout initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }} style={{ transformOrigin: "center" }} className="hidden sm:flex items-center gap-2">
              <Link
                href="/registrationProcess/login"
                className="px-5 py-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white text-[14px] font-bold transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/registrationProcess/register"
                className="group relative px-6 py-2 bg-stone-900 dark:bg-white text-white dark:text-[#111111] text-[14px] font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-stone-800 dark:hover:bg-stone-100 flex items-center gap-2"
              >
                <span>Sign Up</span>
                <ChevronRight size={16} strokeWidth={3} className="opacity-70 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>

          )}



          {/* Mobile Menu Button */}

          <button
            className="xl:hidden flex items-center justify-center p-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isMobileMenuOpen ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="flex h-6 w-6 items-center justify-center"
              >
                {isMobileMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
              </motion.span>
            </AnimatePresence>
          </button>

        </motion.div>

      </motion.header>



      {/* Mobile Menu Dropdown */}

      <AnimatePresence>

        {isMobileMenuOpen && (

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="xl:hidden pointer-events-auto absolute top-[calc(100%+0.5rem)] left-0 w-full bg-white/95 dark:bg-[#161616] backdrop-blur-xl shadow-2xl px-6 pb-6 pt-2 z-50 rounded-2xl border border-stone-200/50 dark:border-white/10"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {

                const isActive = pathname === link.href;
                return (

                  <Link

                    key={link.name}

                    href={link.href}
                    className={`text-[15px] px-5 py-3.5 rounded-xl transition-all ${isActive
                      ? "font-bold text-emerald-700 dark:text-white bg-emerald-50 dark:bg-white/10"
                      : "font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-white/5"
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

              <div className="pt-4 mt-2 border-t border-stone-100 dark:border-white/10 flex flex-col gap-3">
                {user ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 px-2">
                      <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-emerald-500/30 flex-shrink-0 relative bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                        {user.image ? (
                          <Image
                            src={user.image}
                            alt={user.name || "User"}
                            fill
                            sizes="48px"
                            className="object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        ) : (

                          <span>{getInitials(user.name)}</span>

                        )}

                      </div>
                      <span className="text-[16px] font-bold text-stone-900 dark:text-white">
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
                      className="flex items-center justify-center w-full py-3.5 bg-white/5 hover:bg-white/10 text-white text-[15px] font-bold rounded-2xl transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      href="/registrationProcess/register"
                      className="flex items-center justify-center w-full py-3.5 bg-white text-[#111111] text-[15px] font-bold rounded-2xl transition-all shadow-lg hover:bg-stone-100"
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

    </div>

  );

}

export default function Navbar() {
  return <NavbarContent />;
}

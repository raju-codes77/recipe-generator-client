"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  FiHome, FiUser, FiSettings, FiMenu, FiX, FiSun, FiMoon, 
  FiLogOut, FiPieChart, FiUsers, FiBookOpen, FiShield 
} from "react-icons/fi";

export default function DashboardSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Initial check for dark mode
    if (document.documentElement.classList.contains("dark")) {
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  };

  const isAdmin = pathname?.includes("/admin");
  const role = isAdmin ? "admin" : "user";

  const userNavItems = [
    { name: "Overview", icon: <FiHome />, href: "/dashboard/user" },
    { name: "My Recipes", icon: <FiBookOpen />, href: "/dashboard/user/recipes" },
    { name: "Nutrition Stats", icon: <FiPieChart />, href: "/dashboard/user/stats" },
    { name: "Profile", icon: <FiUser />, href: "/dashboard/user/profile" },
  ];

  const adminNavItems = [
    { name: "Admin Dashboard", icon: <FiShield />, href: "/dashboard/admin" },
    { name: "Manage Users", icon: <FiUsers />, href: "/dashboard/admin/users" },
    { name: "All Recipes", icon: <FiBookOpen />, href: "/dashboard/admin/recipes" },
    { name: "Settings", icon: <FiSettings />, href: "/dashboard/admin/settings" },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-white dark:bg-black border-b border-gray-200 dark:border-[#89986D]/20 text-gray-800 dark:text-[#F6F0D7] shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-[#2F8F46]">FlavorAI</span>
          <span className="text-[10px] px-2 py-0.5 rounded uppercase font-semibold bg-[#2F8F46]/20 text-[#2F8F46] dark:text-[#B7E35F]">
            {role}
          </span>
        </div>
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl bg-gray-100 dark:bg-[#89986D]/10 text-gray-800 dark:text-[#F6F0D7]"
        >
          {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 flex flex-col justify-between
        bg-white dark:bg-black border-r border-gray-200 dark:border-[#89986D]/20 p-6 transition-transform duration-300 ease-in-out
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div>
          <div className="flex items-center space-x-3 mb-8 pt-14 lg:pt-0">
            <div className="w-10 h-10 rounded-xl bg-[#2F8F46] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#2F8F46]/30">
              F
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide text-gray-900 dark:text-[#F6F0D7]">FlavorAI</h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#EAF7E8] dark:bg-[#EAF7E8]/10 text-[#2F8F46] dark:text-[#B7E35F] capitalize font-medium">
                {role} Panel
              </span>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive 
                      ? "bg-[#2F8F46] text-white shadow-lg shadow-[#2F8F46]/20 font-semibold" 
                      : "text-gray-600 dark:text-[#F6F0D7]/70 hover:bg-[#EAF7E8] dark:hover:bg-[#89986D]/15 hover:text-[#2F8F46] dark:hover:text-[#F6F0D7]"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-[#89986D]/20">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-[#89986D]/10 text-gray-800 dark:text-[#F6F0D7] hover:bg-gray-200 dark:hover:bg-[#89986D]/20 font-medium transition"
          >
            <span className="text-sm">Theme Mode</span>
            {darkMode ? <FiSun className="text-[#B7E35F]" /> : <FiMoon className="text-[#FF9F43]" />}
          </button>

          <Link
            href="/login"
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-500/10 font-medium transition"
          >
            <FiLogOut />
            <span className="text-sm">Logout</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
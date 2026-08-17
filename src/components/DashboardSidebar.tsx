"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  FiHome, FiUsers, FiBookOpen, FiFolder, FiAward, FiMessageSquare, 
  FiAlertCircle, FiCpu, FiShield, FiSliders, FiSettings, FiLock, 
  FiServer, FiHeadphones, FiMenu, FiX, FiSun, FiMoon, FiLogOut 
} from "react-icons/fi";

export default function DashboardSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
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

  // Reference image onujayi complete navigation items
  const adminNavItems = [
    { name: "Dashboard", icon: <FiHome />, href: "/dashboard/admin" },
    { name: "Users", icon: <FiUsers />, href: "/dashboard/admin/users" },
    { name: "Recipes", icon: <FiBookOpen />, href: "/dashboard/admin/recipes" },
    { name: "Collections", icon: <FiFolder />, href: "/dashboard/admin/collections" },
    { name: "Challenges", icon: <FiAward />, href: "/dashboard/admin/challenges" },
    { name: "Community Posts", icon: <FiMessageSquare />, href: "/dashboard/admin/posts" },
    { name: "Reports", icon: <FiAlertCircle />, href: "/dashboard/admin/reports" },
  ];

  const adminToolsItems = [
    { name: "AI Tools", icon: <FiCpu />, href: "/dashboard/admin/ai-tools" },
    { name: "Moderation", icon: <FiShield />, href: "/dashboard/admin/moderation" },
    { name: "Nutrition Analyzer", icon: <FiSliders />, href: "/dashboard/admin/nutrition" },
  ];

  const adminSettingsItems = [
    { name: "Settings", icon: <FiSettings />, href: "/dashboard/admin/settings" },
    { name: "Roles & Permissions", icon: <FiLock />, href: "/dashboard/admin/roles" },
    { name: "System Logs", icon: <FiServer />, href: "/dashboard/admin/logs" },
    { name: "Support Tickets", icon: <FiHeadphones />, href: "/dashboard/admin/support" },
  ];

  const userNavItems = [
    { name: "Dashboard", icon: <FiHome />, href: "/dashboard/user" },
    { name: "My Recipes", icon: <FiBookOpen />, href: "/dashboard/user/recipes" },
    { name: "Collections", icon: <FiFolder />, href: "/dashboard/user/collections" },
    { name: "Challenges", icon: <FiAward />, href: "/dashboard/user/challenges" },
    { name: "AI Tools", icon: <FiCpu />, href: "/dashboard/user/ai-tools" },
    { name: "Settings", icon: <FiSettings />, href: "/dashboard/user/settings" },
  ];

  return (
    <>
      {/* Mobile Header with Hamburger Button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-white dark:bg-black border-b border-gray-200 dark:border-[#89986D]/20 shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-[#2F8F46] flex items-center justify-center text-white font-bold">F</div>
          <span className="text-lg font-bold text-gray-900 dark:text-[#F6F0D7]">FlavorAI</span>
          <span className="text-[10px] px-2 py-0.5 rounded uppercase font-semibold bg-[#2F8F46]/20 text-[#2F8F46] dark:text-[#B7E35F]">
            {role}
          </span>
        </div>
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl bg-gray-100 dark:bg-[#89986D]/10 text-gray-800 dark:text-[#F6F0D7] focus:outline-none"
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Backdrop */}
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

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 flex flex-col justify-between
        bg-white dark:bg-black border-r border-gray-200 dark:border-[#89986D]/20 p-5 transition-transform duration-300 ease-in-out
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="overflow-y-auto space-y-6 pt-14 lg:pt-0">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 px-2">
            <div className="w-9 h-9 rounded-xl bg-[#2F8F46] flex items-center justify-center text-white font-bold text-lg shadow-md shadow-[#2F8F46]/30">
              F
            </div>
            <div>
              <h1 className="text-base font-bold tracking-wide text-gray-900 dark:text-[#F6F0D7]">FlavorAI</h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EAF7E8] dark:bg-[#EAF7E8]/10 text-[#2F8F46] dark:text-[#B7E35F] capitalize font-medium">
                {role} Panel
              </span>
            </div>
          </div>

          {/* Navigation Section */}
          {isAdmin ? (
            <>
              {/* MANAGE */}
              <div className="space-y-1">
                <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-[#F6F0D7]/40 mb-2">Manage</p>
                {adminNavItems.map((item, idx) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        isActive 
                          ? "bg-[#2F8F46] text-white shadow-md shadow-[#2F8F46]/20 font-semibold" 
                          : "text-gray-600 dark:text-[#F6F0D7]/70 hover:bg-[#EAF7E8] dark:hover:bg-[#89986D]/15 hover:text-[#2F8F46] dark:hover:text-[#F6F0D7]"
                      }`}
                    >
                      <span className="text-base">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* AI & TOOLS */}
              <div className="space-y-1 pt-2">
                <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-[#F6F0D7]/40 mb-2">AI & Tools</p>
                {adminToolsItems.map((item, idx) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        isActive 
                          ? "bg-[#2F8F46] text-white shadow-md shadow-[#2F8F46]/20 font-semibold" 
                          : "text-gray-600 dark:text-[#F6F0D7]/70 hover:bg-[#EAF7E8] dark:hover:bg-[#89986D]/15 hover:text-[#2F8F46] dark:hover:text-[#F6F0D7]"
                      }`}
                    >
                      <span className="text-base">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* SETTINGS */}
              <div className="space-y-1 pt-2">
                <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-[#F6F0D7]/40 mb-2">Settings</p>
                {adminSettingsItems.map((item, idx) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        isActive 
                          ? "bg-[#2F8F46] text-white shadow-md shadow-[#2F8F46]/20 font-semibold" 
                          : "text-gray-600 dark:text-[#F6F0D7]/70 hover:bg-[#EAF7E8] dark:hover:bg-[#89986D]/15 hover:text-[#2F8F46] dark:hover:text-[#F6F0D7]"
                      }`}
                    >
                      <span className="text-base">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="space-y-1">
              <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-[#F6F0D7]/40 mb-2">User Menu</p>
              {userNavItems.map((item, idx) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive 
                        ? "bg-[#2F8F46] text-white shadow-md shadow-[#2F8F46]/20 font-semibold" 
                        : "text-gray-600 dark:text-[#F6F0D7]/70 hover:bg-[#EAF7E8] dark:hover:bg-[#89986D]/15 hover:text-[#2F8F46] dark:hover:text-[#F6F0D7]"
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom Theme Toggle & User Profile Preview */}
        <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-[#89986D]/20">
        

          <div className="flex items-center justify-between px-2 pt-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#2F8F46]/20 text-[#2F8F46] dark:text-[#B7E35F] flex items-center justify-center font-bold text-xs">
                A
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-gray-900 dark:text-[#F6F0D7] truncate">Admin User</h4>
                <p className="text-[10px] text-gray-400 dark:text-[#F6F0D7]/60 truncate">admin@flavorai.com</p>
              </div>
            </div>
            <Link href="/login" className="text-red-500 hover:text-red-600 p-1">
              <FiLogOut size={16} />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  FiHome, FiUsers, FiBookOpen, FiFolder, FiAward, FiMessageSquare,
  FiAlertCircle, FiCpu, FiShield, FiMenu, FiX, FiActivity,
  FiBox, FiCalendar, FiShoppingCart, FiList, FiGrid, FiHeart
} from "react-icons/fi";
import { FaDochub } from "react-icons/fa6";

export default function DashboardSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();


  const isAdmin = pathname?.includes("/admin");
  const dashboardIdentity = isAdmin ? "Admin Panel" : "My Dashboard";

  // Admin Navigation  Items
  const adminNavItems = [
    { name: "Dashboard", icon: <FiHome />, href: "/dashboard/admin" },
    { name: "Users", icon: <FiUsers />, href: "/dashboard/admin/users" },
    { name: "Recipes", icon: <FiBookOpen />, href: "/dashboard/admin/recipes" },
    { name: "Challenges", icon: <FiAward />, href: "/dashboard/admin/challenges" },
    { name: "Community Posts", icon: <FiMessageSquare />, href: "/dashboard/admin/posts" }
  ];

  // User Navigation Items (Screenshot onujayi grouped sections)
  const mainNavItems = [
    { name: "Dashboard", icon: <FiHome />, href: "/dashboard/user" },
    { name: "Wellness Hub", icon: <FiHeart />, href: "/dashboard/users/wellness" },
    { name: "Consultation", icon: <FaDochub />, href: "/dashboard/users/health-consultant" },
    { name: "My Recipes", icon: <FiBookOpen />, href: "/dashboard/users/recipes" },
    { name: "Generate Recipe", icon: <FiCpu />, href: "/dashboard/users/ai-recepi-generator", badge: "AI" },
    { name: "Collections", icon: <FiFolder />, href: "/dashboard/users/collections" },
    { name: "Challenges", icon: <FiAward />, href: "/dashboard/users/challenges" },
    { name: "Wellness Reminders", icon: <FiAlertCircle />, href: "/dashboard/wellness-reminders" },
    { name: "All AI Tools", icon: <FiCpu />, href: "/ai-tools" },
  ];

  const aiToolsNavItems = [
    { name: "Ingredient Rescue", icon: <FiBox />, href: "/ai-tools/ingredient-rescue" },
    { name: "Nutrition Analyzer", icon: <FiActivity />, href: "/ai-tools/nutrition-analyzer" },
    { name: "Meal Tracker", icon: <FiActivity />, href: "/ai-tools/meal-tracker" },
    { name: "Taste Matcher", icon: <FiActivity />, href: "/ai-tools/taste-matcher" },
    { name: "Meal Planner", icon: <FiCalendar />, href: "/ai-tools/meal-planner" },
    { name: "Shopping List", icon: <FiShoppingCart />, href: "/ai-tools/shopping-list" },
  ];

  const communityNavItems = [
    { name: "Feed", icon: <FiList />, href: "/community" },
    { name: "All Recipes", icon: <FiGrid />, href: "/recipes" },
    { name: "Community", icon: <FiUsers />, href: "/community" },
  ];

  return (


    <>
      {/* Responsive floating dashboard menu control */}
      <button
        type="button"
        onClick={() => setMobileOpen((open) => !open)}
        aria-label={mobileOpen ? "Close dashboard menu" : "Open dashboard menu"}
        aria-expanded={mobileOpen}
        className="fixed bottom-[5.75rem] right-5 z-40 flex h-13 w-13 items-center justify-center rounded-2xl border-2 border-emerald-500/35 bg-white text-emerald-700 shadow-[0_10px_28px_rgba(15,80,50,0.22)] transition hover:scale-105 hover:border-emerald-600 hover:shadow-[0_14px_34px_rgba(15,80,50,0.32)] dark:bg-slate-850 sm:bottom-[6.25rem] sm:right-6 sm:h-14 sm:w-14 sm:rounded-[22px] lg:hidden"
      >
        {mobileOpen ? <FiX size={23} /> : <FiMenu size={23} />}
      </button>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-[#102016]/55 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:sticky lg:top-[88px] inset-y-0 left-0 z-50 lg:z-40 w-64 lg:h-[calc(100vh-88px)] flex flex-col justify-between
        border-r border-[#dfe8da] bg-[#fbfdf9] p-4 shadow-[8px_0_30px_rgba(40,70,45,0.04)] transition-transform duration-300 ease-in-out dark:border-white/10 dark:bg-[#101611] lg:p-5
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="dashboard-sidebar-scrollbar space-y-6 overflow-y-auto pt-0">

          {/* Dashboard identity */}
          <div className="mb-3 flex items-center space-x-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#2F8F46] text-white shadow-md shadow-[#2F8F46]/30">
              {isAdmin ? <FiShield size={20} /> : <FiHome size={20} />}
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight text-gray-900 dark:text-[#F6F0D7]">{dashboardIdentity}</h1>
              <span className="rounded-full bg-[#EAF7E8] px-2 py-1 text-[9px] font-bold capitalize tracking-wider text-[#2F8F46] dark:bg-[#EAF7E8]/10 dark:text-[#B7E35F]">
                {isAdmin ? "Admin" : "Personal"}
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
                      className={`group flex items-center space-x-3 rounded-2xl px-3 py-2.5 text-xs font-medium transition-all ${isActive
                          ? "bg-[#2F8F46] font-semibold text-white shadow-md shadow-[#2F8F46]/20"
                          : "text-gray-600 hover:bg-[#edf6e9] hover:text-[#2F8F46] dark:text-[#F6F0D7]/70 dark:hover:bg-white/10 dark:hover:text-[#F6F0D7]"
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
            <div className="space-y-6">

              {/* MAIN Section */}
              <div>
                <p className="px-3 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Main</p>
                <div className="space-y-1">
                  {mainNavItems.map((item, idx) => {
                    const isActive = pathname === item.href || (item.href === "/dashboard/user" && pathname === "/dashboard/users");
                    return (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`group flex items-center justify-between rounded-2xl px-3 py-2.5 text-xs transition-all ${isActive
                            ? "bg-[#eaf7e8] font-bold text-[#176B35] shadow-sm dark:bg-[#2F8F46]/20 dark:text-[#B7E35F]"
                            : "font-medium text-gray-600 hover:bg-[#f0f6ed] dark:text-gray-400 dark:hover:bg-white/10"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`text-base transition-transform group-hover:scale-105 ${isActive ? "text-[#2F8F46] dark:text-[#b7df86]" : ""}`}>{item.icon}</span>
                          <span>{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.badge && (
                            <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50">
                              ✨ {item.badge}
                            </span>
                          )}
                          {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#176B35] dark:bg-[#B7E35F]"></div>}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* AI TOOLS Section */}
              <div>
                <p className="px-3 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">AI Tools</p>
                <div className="space-y-1">
                  {aiToolsNavItems.map((item, idx) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-xs font-medium transition-all ${isActive
                            ? "bg-[#eaf7e8] font-bold text-[#176B35] shadow-sm dark:bg-[#2F8F46]/20 dark:text-[#B7E35F]"
                            : "text-gray-600 hover:bg-[#f0f6ed] dark:text-gray-400 dark:hover:bg-white/10"
                          }`}
                      >
                        <span className={`text-base transition-transform group-hover:scale-105 ${isActive ? "text-[#2F8F46] dark:text-[#b7df86]" : ""}`}>{item.icon}</span>
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* COMMUNITY Section */}
              <div>
                <p className="px-3 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Community</p>
                <div className="space-y-1">
                  {communityNavItems.map((item, idx) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-xs font-medium transition-all ${isActive
                            ? "bg-[#eaf7e8] font-bold text-[#176B35] shadow-sm dark:bg-[#2F8F46]/20 dark:text-[#B7E35F]"
                            : "text-gray-600 hover:bg-[#f0f6ed] dark:text-gray-400 dark:hover:bg-white/10"
                          }`}
                      >
                        <span className={`text-base transition-transform group-hover:scale-105 ${isActive ? "text-[#2F8F46] dark:text-[#b7df86]" : ""}`}>{item.icon}</span>
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

            </div>
          )}
        </div>



        {/* Upgrade to Pro & User Profile Preview */}

        <div className="mt-auto space-y-4 pt-6">
          {!isAdmin && (
            <div className="rounded-[22px] border border-[#cce2c4] bg-[#edf7e9] p-4 shadow-sm dark:border-[#2F8F46]/20 dark:bg-[#2F8F46]/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">👑</span>
                <h4 className="font-bold text-gray-900 dark:text-[#F6F0D7] text-xs">Upgrade to Pro</h4>
              </div>
              <p className="text-[10px] text-gray-600 dark:text-[#F6F0D7]/60 mb-3 leading-relaxed">
                Unlock advanced AI tools, custom meal plans, and more.
              </p>
              <Link href="/pro" className="w-full py-2 bg-[#2F8F46] hover:bg-[#257338] text-white text-[11px] font-bold rounded-xl shadow-md transition flex items-center justify-center gap-1.5">
                <span>Upgrade Now</span>
                <span>→</span>
              </Link>
            </div>
          )}


        </div>
      </aside>
    </>
  );
}

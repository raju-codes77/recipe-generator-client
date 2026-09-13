"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  FiHome, FiUsers, FiBookOpen, FiFolder, FiAward, FiMessageSquare, 
  FiAlertCircle, FiCpu, FiShield, FiSliders, FiSettings, FiLock, 
  FiServer, FiHeadphones, FiMenu, FiX, FiActivity,
  FiBox, FiCalendar, FiShoppingCart, FiList, FiGrid
} from "react-icons/fi";
import { FaDochub } from "react-icons/fa6";

export default function DashboardSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();


  const isAdmin = pathname?.includes("/admin");
  const role = isAdmin ? "admin" : "user";

  // Admin Navigation  Items
  const adminNavItems = [
    { name: "Dashboard", icon: <FiHome />, href: "/dashboard/admin" },
    { name: "Users", icon: <FiUsers />, href: "/dashboard/admin/users" },
    { name: "Recipes", icon: <FiBookOpen />, href: "/recipes" },
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

  // User Navigation Items (Screenshot onujayi grouped sections)
  const mainNavItems = [
    { name: "Dashboard", icon: <FiHome />, href: "/dashboard/users" },
    {name: "Nutritionist", icon:<FaDochub/>,  href:"/dashboard/users/example"},
    { name: "My Recipes", icon: <FiBookOpen />, href: "/recipes" },
    { name: "Generate Recipe", icon: <FiCpu />, href: "/dashboard/users/ai-recepi-generator", badge: "AI" },
    { name: "Collections", icon: <FiFolder />, href: "/dashboard/users/static" },
    { name: "Challenges", icon: <FiAward />, href: "/challenges" },
    { name: "Dietary Profile", icon: <FiSliders />, href: "/dashboard/users/dietary-profile" },
    { name: "All AI Tools", icon: <FiCpu />, href: "/ai-tools" },
  ];

  const aiToolsNavItems = [
    { name: "Ingredient Rescue", icon: <FiBox />, href: "/ai-tools/ingredient-rescue" },
    { name: "Nutrition Analyzer", icon: <FiActivity />, href: "/ai-tools/nutrition-analyzer" },
    { name: "Meal Tracker", icon: <FiActivity />, href: "/ai-tools/meal-tracker" },
    { name: "Taste Matcher", icon: <FiActivity />, href: "/ai-tools/taste-matcher" },
    { name: "Meal Planner", icon: <FiCalendar />, href: "/meal-planner" },
    { name: "Shopping List", icon: <FiShoppingCart />, href: "/ai-tools/shopping-list" },
  ];

  const communityNavItems = [
    { name: "Feed", icon: <FiList />, href: "/community" },
    { name: "All Recipes", icon: <FiGrid />, href: "/recipes" },
    { name: "Community", icon: <FiUsers />, href: "/community" },
  ];

  return (

    
    <>
      {/* Mobile Header with Hamburger Button */}
      <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-[#dfe8da] bg-[#fbfdf9]/95 p-3.5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#101611]/95 lg:hidden">
        <div className="flex items-center space-x-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2F8F46] text-base font-black text-white shadow-md shadow-[#2F8F46]/20">F</div>
          <span className="text-base font-black tracking-tight text-gray-900 dark:text-[#F6F0D7]">FoodCanvas</span>
          <span className="rounded-full bg-[#2F8F46]/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#2F8F46] dark:bg-[#B7E35F]/10 dark:text-[#B7E35F]">
            {role}
          </span>
        </div>
        <button 
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Close dashboard menu" : "Open dashboard menu"}
          aria-expanded={mobileOpen}
          className="rounded-xl bg-[#edf4e9] p-2.5 text-[#235f31] transition hover:bg-[#dfeeda] focus:outline-none dark:bg-white/10 dark:text-[#b7df86]"
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
            className="fixed inset-0 z-40 bg-[#102016]/55 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 flex flex-col justify-between
        border-r border-[#dfe8da] bg-[#fbfdf9] p-4 shadow-[8px_0_30px_rgba(40,70,45,0.04)] transition-transform duration-300 ease-in-out dark:border-white/10 dark:bg-[#101611] lg:p-5
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="space-y-6 overflow-y-auto pt-14 lg:pt-0">
          
          {/* Logo & Brand */}
          {isAdmin && (
              <div className="mb-3 flex items-center space-x-3 px-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#2F8F46] text-lg font-black text-white shadow-md shadow-[#2F8F46]/30">
                F
              </div>
              <div>
                <h1 className="text-base font-black tracking-tight text-gray-900 dark:text-[#F6F0D7]">FoodCanvas</h1>
                <span className="rounded-full bg-[#EAF7E8] px-2 py-1 text-[9px] font-bold capitalize tracking-wider text-[#2F8F46] dark:bg-[#EAF7E8]/10 dark:text-[#B7E35F]">
                  {role} Panel
                </span>
              </div>
            </div>
          )}

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
                      className={`group flex items-center space-x-3 rounded-2xl px-3 py-2.5 text-xs font-medium transition-all ${
                        isActive 
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
                      className={`group flex items-center space-x-3 rounded-2xl px-3 py-2.5 text-xs font-medium transition-all ${
                        isActive 
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
                      className={`group flex items-center space-x-3 rounded-2xl px-3 py-2.5 text-xs font-medium transition-all ${
                        isActive 
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
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`group flex items-center justify-between rounded-2xl px-3 py-2.5 text-xs transition-all ${
                          isActive 
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
                        className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-xs font-medium transition-all ${
                          isActive 
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
                        className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-xs font-medium transition-all ${
                          isActive 
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
              <button className="w-full py-2 bg-[#2F8F46] hover:bg-[#257338] text-white text-[11px] font-bold rounded-xl shadow-md transition flex items-center justify-center gap-1.5">
                <span>Upgrade Now</span>
                <span>→</span>
              </button>
            </div>
          )}

         
        </div>
      </aside>
    </>
  );
}
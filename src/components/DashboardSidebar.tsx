"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  FiHome, FiUsers, FiBookOpen, FiFolder, FiAward, FiMessageSquare, 
  FiAlertCircle, FiCpu, FiShield, FiSliders, FiSettings, FiLock, 
  FiServer, FiHeadphones, FiMenu, FiX, FiLogOut, FiActivity,
  FiBox, FiCalendar, FiShoppingCart, FiList, FiGrid
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


  const isAdmin = pathname?.includes("/admin");
  const role = isAdmin ? "admin" : "user";

  // Admin Navigation  Items
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

  // User Navigation Items (Screenshot onujayi grouped sections)
  const mainNavItems = [
    { name: "Dashboard", icon: <FiHome />, href: "/dashboard/users" },
    { name: "My Recipes", icon: <FiBookOpen />, href: "/dashboard/users/myRecipes" },
    { name: "Generate Recipe", icon: <FiCpu />, href: "/dashboard/users/ai-generate", badge: "AI" },
    { name: "Collections", icon: <FiFolder />, href: "/dashboard/users/collectionsDs" },
    { name: "Challenges", icon: <FiAward />, href: "/challenges" },
    { name: "AI Tools", icon: <FiCpu />, href: "/ai-tools" },
    { name: "Nutrition", icon: <FiActivity />, href: "/ai-tools/nutrition-analyzer" },
  ];

  const kitchenNavItems = [
    { name: "Pantry", icon: <FiBox />, href: "/ai-tools/pantry-to-plate" },
    { name: "Meal Plan", icon: <FiCalendar />, href: "/ai-tools/meal-tracker" },
    { name: "Shopping List", icon: <FiShoppingCart />, href: "/dashboard/users/shopping-list" },
  ];

  const communityNavItems = [
    { name: "Feed", icon: <FiList />, href: "/community" },
    { name: "All Recipes", icon: <FiGrid />, href: "/recipes" },
    { name: "Community", icon: <FiUsers />, href: "/community" },
  ];

  return (

    
    <>
      {/* Mobile Header with Hamburger Button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-white dark:bg-black border-b border-gray-200 dark:border-[#89986D]/20 shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-[#2F8F46] flex items-center justify-center text-white font-bold">F</div>
          <span className="text-lg font-bold text-gray-900 dark:text-[#F6F0D7]">FoodCanvas</span>
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
          {isAdmin && (
            <div className="flex items-center space-x-3 px-2 mb-2">
              <div className="w-9 h-9 rounded-xl bg-[#2F8F46] flex items-center justify-center text-white font-bold text-lg shadow-md shadow-[#2F8F46]/30">
                F
              </div>
              <div>
                <h1 className="text-base font-bold tracking-wide text-gray-900 dark:text-[#F6F0D7]">FoodCanvas</h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EAF7E8] dark:bg-[#EAF7E8]/10 text-[#2F8F46] dark:text-[#B7E35F] capitalize font-medium">
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
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all ${
                          isActive 
                            ? "bg-[#EAF7E8] dark:bg-[#2F8F46]/20 font-bold text-[#176B35] dark:text-[#B7E35F]" 
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#89986D]/10 font-medium"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-base">{item.icon}</span>
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

              {/* MY KITCHEN Section */}
              <div>
                <p className="px-3 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">My Kitchen</p>
                <div className="space-y-1">
                  {kitchenNavItems.map((item, idx) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                          isActive 
                            ? "bg-[#EAF7E8] dark:bg-[#2F8F46]/20 font-bold text-[#176B35] dark:text-[#B7E35F]" 
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#89986D]/10"
                        }`}
                      >
                        <span className="text-base">{item.icon}</span>
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
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                          isActive 
                            ? "bg-[#EAF7E8] dark:bg-[#2F8F46]/20 font-bold text-[#176B35] dark:text-[#B7E35F]" 
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#89986D]/10"
                        }`}
                      >
                        <span className="text-base">{item.icon}</span>
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
            <div className="bg-[#EAF7E8] dark:bg-[#2F8F46]/10 rounded-2xl p-4 border border-[#2F8F46]/20">
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

          <div className="flex items-center justify-between px-2 pt-2 border-t border-gray-200 dark:border-[#89986D]/20">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800">
                <img src="/brooke-lark-4J059aGa5s4-unsplash.jpg" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-gray-900 dark:text-[#F6F0D7] truncate">
                  {isAdmin ? "Admin User" : "John Doe"}
                </h4>
                <p className="text-[10px] text-gray-400 dark:text-[#F6F0D7]/60 truncate">
                  {isAdmin ? "Admin" : "Chef"}
                </p>
              </div>
            </div>
            <Link href="/dashboard/settings" className="text-gray-400 hover:text-gray-600 dark:hover:text-[#F6F0D7] p-1 transition-colors">
              <FiSettings size={16} />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
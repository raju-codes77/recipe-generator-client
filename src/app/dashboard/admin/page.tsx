"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FiUsers, FiBookOpen, FiFolder, FiAward, FiMessageSquare, 
  FiPlus, FiShield, FiSettings, FiFileText, FiTrendingUp, FiActivity, FiServer 
} from "react-icons/fi";
import Link from "next/link";
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from "recharts";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Mock Data for Analytics Line Chart
const fallbackLineData = [
  { day: "May 12", users: 4200, recipes: 2100, posts: 1100 },
  { day: "May 13", users: 4800, recipes: 2300, posts: 1400 },
  { day: "May 14", users: 5100, recipes: 2600, posts: 1500 },
  { day: "May 15", users: 6200, recipes: 3200, posts: 1800 },
  { day: "May 16", users: 5500, recipes: 2800, posts: 1600 },
  { day: "May 17", users: 5800, recipes: 3000, posts: 1700 },
  { day: "May 18", users: 7000, recipes: 3600, posts: 2100 },
];

// Mock Data for Donut Chart (User Growth)
const fallbackPieData = [
  { name: "New Users", value: 6245, color: "#2F8F46" },
  { name: "Active Users", value: 4892, color: "#B7E35F" },
  { name: "Returning Users", value: 1449, color: "#FF9F43" },
];

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/dashboard/admin/overview`, {
          credentials: "include"
        });
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error("Failed to load admin dashboard data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  const stats = data?.stats || {
    users: { total: 0, delta: 0 },
    recipes: { total: 0, delta: 0 },
    collections: { total: 0, delta: 0 },
    challenges: { total: 0, delta: 0 },
    posts: { total: 0, delta: 0 }
  };
  
  const lineData = data?.chartData?.length > 0 ? data.chartData : fallbackLineData;
  const pieData = data?.userGrowth ? [
    { name: "New Users", value: data.userGrowth.newUsers, color: "#2F8F46" },
    { name: "Active Users", value: data.userGrowth.activeUsers, color: "#B7E35F" },
    { name: "Returning Users", value: data.userGrowth.returningUsers, color: "#FF9F43" },
  ] : fallbackPieData;

  const topCategories = data?.topCategories?.length > 0 ? data.topCategories : [
    { name: "Healthy", count: "2,345", pct: 27 },
    { name: "Dinner", count: "1,987", pct: 22 },
  ];

  const formatDelta = (delta: number) => {
    return delta >= 0 ? `↑ ${delta}%` : `↓ ${Math.abs(delta)}%`;
  };

  return (
    <div className="space-y-6">
      {/* 1. Welcome Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-white dark:bg-black/40 p-6 rounded-2xl border border-gray-200 dark:border-[#89986D]/20 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-[#F6F0D7] flex items-center gap-2">
            Welcome back, Admin! 👋
          </h1>
          <p className="text-sm text-gray-500 dark:text-[#F6F0D7]/60 mt-1">
            Here's what's happening with FlavorAI today.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-[#89986D]/10 rounded-xl border border-gray-200 dark:border-[#89986D]/20 text-xs font-semibold text-gray-700 dark:text-[#F6F0D7]">
          <span>📅 May 12 - May 18, 2026</span>
        </div>
      </div>

      {/* 2. Top 5 Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Users */}
        <div className="p-5 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="p-2.5 rounded-xl bg-[#EAF7E8] dark:bg-[#2F8F46]/20 text-[#2F8F46] dark:text-[#B7E35F] text-lg"><FiUsers /></span>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${stats.users.delta >= 0 ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10' : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10'}`}>
              {formatDelta(stats.users.delta)}
            </span>
          </div>
          <h4 className="text-xs text-gray-500 dark:text-[#F6F0D7]/60 font-medium">Total Users</h4>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F6F0D7] mt-1">{loading ? "..." : stats.users.total.toLocaleString()}</h2>
          <p className="text-[10px] text-gray-400 dark:text-[#F6F0D7]/40 mt-1">{Math.abs(stats.users.delta)}% from last week</p>
        </div>

        {/* Total Recipes */}
        <div className="p-5 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="p-2.5 rounded-xl bg-[#FFF0DD] dark:bg-[#FF9F43]/20 text-[#FF9F43] text-lg"><FiBookOpen /></span>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${stats.recipes.delta >= 0 ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10' : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10'}`}>
              {formatDelta(stats.recipes.delta)}
            </span>
          </div>
          <h4 className="text-xs text-gray-500 dark:text-[#F6F0D7]/60 font-medium">Total Recipes</h4>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F6F0D7] mt-1">{loading ? "..." : stats.recipes.total.toLocaleString()}</h2>
          <p className="text-[10px] text-gray-400 dark:text-[#F6F0D7]/40 mt-1">{Math.abs(stats.recipes.delta)}% from last week</p>
        </div>

        {/* Collections */}
        <div className="p-5 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 text-lg"><FiFolder /></span>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${stats.collections.delta >= 0 ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10' : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10'}`}>
              {formatDelta(stats.collections.delta)}
            </span>
          </div>
          <h4 className="text-xs text-gray-500 dark:text-[#F6F0D7]/60 font-medium">Collections</h4>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F6F0D7] mt-1">{loading ? "..." : stats.collections.total.toLocaleString()}</h2>
          <p className="text-[10px] text-gray-400 dark:text-[#F6F0D7]/40 mt-1">{Math.abs(stats.collections.delta)}% from last week</p>
        </div>

        {/* Challenges */}
        <div className="p-5 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="p-2.5 rounded-xl bg-yellow-50 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-300 text-lg"><FiAward /></span>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${stats.challenges.delta >= 0 ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10' : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10'}`}>
              {formatDelta(stats.challenges.delta)}
            </span>
          </div>
          <h4 className="text-xs text-gray-500 dark:text-[#F6F0D7]/60 font-medium">Challenges</h4>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F6F0D7] mt-1">{loading ? "..." : stats.challenges.total.toLocaleString()}</h2>
          <p className="text-[10px] text-gray-400 dark:text-[#F6F0D7]/40 mt-1">{Math.abs(stats.challenges.delta)}% from last week</p>
        </div>

        {/* Community Posts */}
        <div className="p-5 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <span className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 text-lg"><FiMessageSquare /></span>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${stats.posts.delta >= 0 ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10' : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10'}`}>
              {formatDelta(stats.posts.delta)}
            </span>
          </div>
          <h4 className="text-xs text-gray-500 dark:text-[#F6F0D7]/60 font-medium">Community Posts</h4>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F6F0D7] mt-1">{loading ? "..." : stats.posts.total.toLocaleString()}</h2>
          <p className="text-[10px] text-gray-400 dark:text-[#F6F0D7]/40 mt-1">{Math.abs(stats.posts.delta)}% from last week</p>
        </div>
      </div>

      {/* 3. Middle Section: Analytics, User Growth, Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics Overview Line Chart */}
        <div className="p-6 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-[#F6F0D7]">Analytics Overview</h3>
            </div>
            <span className="text-xs px-3 py-1 bg-gray-100 dark:bg-[#89986D]/10 rounded-lg text-gray-600 dark:text-[#F6F0D7]">This Week ▾</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <XAxis dataKey="day" stroke="#89986D" fontSize={11} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#2F8F46" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="recipes" stroke="#FF9F43" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="posts" stroke="#8b5cf6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 text-xs text-gray-500 dark:text-[#F6F0D7]/70 mt-2">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#2F8F46]"></span> Users</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#FF9F43]"></span> Recipes</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Posts</span>
          </div>
        </div>

        {/* User Growth Donut Chart */}
        <div className="p-6 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-900 dark:text-[#F6F0D7]">User Growth</h3>
            <span className="text-xs px-3 py-1 bg-gray-100 dark:bg-[#89986D]/10 rounded-lg text-gray-600 dark:text-[#F6F0D7]">This Month ▾</span>
          </div>
          <div className="h-48 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={4} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-lg font-bold text-gray-900 dark:text-[#F6F0D7]">{loading ? "..." : stats.users.total.toLocaleString()}</span>
              <span className="text-[10px] text-gray-400 dark:text-[#F6F0D7]/60">Total Users</span>
            </div>
          </div>
          <div className="space-y-1.5 text-xs text-gray-600 dark:text-[#F6F0D7]/80 mt-2">
            {pieData.map((d, i) => (
              <div key={i} className="flex justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }}></span> 
                  {d.name}
                </span>
                <span className="font-semibold">{loading ? "..." : `${d.value.toLocaleString()} (${Math.round((d.value / (stats.users.total || 1)) * 100)}%)`}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="p-6 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm">
          <h3 className="font-bold text-gray-900 dark:text-[#F6F0D7] mb-4">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Add Recipe", icon: <FiPlus />, href: "/dashboard/admin/recipes" },
              { label: "Challenge", icon: <FiAward />, href: "/dashboard/admin/challenges" },
              { label: "Announcements", icon: <FiMessageSquare />, href: "/dashboard/admin/posts" },
              { label: "Manage Users", icon: <FiUsers />, href: "/dashboard/admin/users" },
              { label: "Moderate Posts", icon: <FiShield />, href: "/dashboard/admin/posts" },
              { label: "Reports", icon: <FiFileText />, href: "/dashboard/admin/users" },
            ].map((action, idx) => (
              <Link 
                key={idx}
                href={action.href}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50 dark:bg-[#89986D]/5 border border-gray-100 dark:border-[#89986D]/10 hover:border-[#2F8F46] hover:bg-gray-100 dark:hover:bg-[#89986D]/10 transition text-center group"
              >
                <span className="text-lg text-[#2F8F46] dark:text-[#B7E35F] mb-1.5 group-hover:scale-110 transition">{action.icon}</span>
                <span className="text-[11px] font-medium text-gray-700 dark:text-[#F6F0D7]">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Bottom Grid: Top Categories, Recent Recipes, Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Recipe Categories */}
        <div className="p-6 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 dark:text-[#F6F0D7]">Top Recipe Categories</h3>
            <span className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-[#89986D]/10 rounded-md text-gray-600 dark:text-[#F6F0D7]">All Time ▾</span>
          </div>
          <div className="space-y-4">
            {loading ? (
              <p className="text-xs text-gray-500">Loading categories...</p>
            ) : topCategories.map((c: any, i: number) => (
              <div key={i}>
                <div className="flex items-center justify-between text-xs font-bold text-gray-700 dark:text-[#F6F0D7] mb-1.5">
                  <span>{c.name}</span>
                  <span className="text-gray-400">{c.count} Recipes ({c.pct}%)</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-[#89986D]/20 rounded-full overflow-hidden">
                  <div className="h-full bg-[#117A38] rounded-full" style={{ width: `${c.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Recipes */}
        <div className="p-6 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 dark:text-[#F6F0D7]">Recent Recipes</h3>
            <Link href="/dashboard/admin/recipes" className="text-xs text-[#2F8F46] dark:text-[#B7E35F] font-semibold cursor-pointer">View All</Link>
          </div>
          <div className="space-y-3">
            {loading ? (
              <p className="text-xs text-gray-500">Loading recipes...</p>
            ) : (data?.recentRecipes || []).length > 0 ? (
              data.recentRecipes.map((rec: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-[#89986D]/5 transition border border-transparent hover:border-gray-200 dark:hover:border-[#89986D]/20">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-[#F6F0D7]">{rec.title}</h4>
                    <p className="text-[10px] text-gray-400 dark:text-[#F6F0D7]/60">By {rec.author} • {rec.cal}</p>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400">Published</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500">No recent recipes.</p>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-6 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 dark:text-[#F6F0D7]">Recent Activity</h3>
            <Link href="/dashboard/admin/posts" className="text-xs text-[#2F8F46] dark:text-[#B7E35F] font-semibold cursor-pointer">View All</Link>
          </div>
          <div className="space-y-3 text-xs">
            {loading ? (
              <p className="text-xs text-gray-500">Loading activity...</p>
            ) : (data?.recentActivity || []).length > 0 ? (
              data.recentActivity.map((act: any, i: number) => {
                const timeDiff = Math.round((new Date().getTime() - new Date(act.time).getTime()) / 60000);
                const timeStr = timeDiff < 60 ? `${timeDiff}m ago` : timeDiff < 1440 ? `${Math.floor(timeDiff/60)}h ago` : `${Math.floor(timeDiff/1440)}d ago`;
                
                return (
                  <div key={i} className="flex items-start justify-between border-b border-gray-100 dark:border-[#89986D]/10 pb-2.5">
                    <span className="text-gray-700 dark:text-[#F6F0D7]/80 pr-2">{act.text}</span>
                    <span className="text-[10px] text-gray-400 dark:text-[#F6F0D7]/50 whitespace-nowrap">{timeStr}</span>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-gray-500">No recent activity.</p>
            )}
          </div>
        </div>
      </div>

      {/* 5. Recent Users Table & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users Table (Spans 2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 dark:text-[#F6F0D7]">Recent Users</h3>
            <Link href="/dashboard/admin/users" className="text-xs text-[#2F8F46] dark:text-[#B7E35F] font-semibold cursor-pointer">View All Users →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 dark:bg-[#89986D]/10 text-gray-500 dark:text-[#F6F0D7]/60 uppercase">
                <tr>
                  <th className="p-3 rounded-l-xl">User</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Joined</th>
                  <th className="p-3">Recipes</th>
                  <th className="p-3 rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-[#89986D]/10">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-xs text-gray-500">Loading users...</td>
                  </tr>
                ) : (data?.recentUsers || []).length > 0 ? (
                  data.recentUsers.map((u: any, i: number) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-[#89986D]/5 transition">
                      <td className="p-3 font-semibold text-gray-900 dark:text-[#F6F0D7]">{u.name}</td>
                      <td className="p-3 text-gray-500 dark:text-[#F6F0D7]/60">{u.email}</td>
                      <td className="p-3 text-gray-500 dark:text-[#F6F0D7]/60">{new Date(u.joined).toLocaleDateString()}</td>
                      <td className="p-3 text-gray-700 dark:text-[#F6F0D7] font-semibold">{u.recipes}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          u.status === "ACTIVE" 
                            ? "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400" 
                            : "bg-red-50 dark:bg-red-500/10 text-red-500"
                        }`}>
                          {u.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-xs text-gray-500">No recent users.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Status */}
        <div className="p-6 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 dark:text-[#F6F0D7]">System Status</h3>
              <span className="text-xs text-[#2F8F46] dark:text-[#B7E35F] font-semibold cursor-pointer">View All</span>
            </div>
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-[#F6F0D7]">Server Status</p>
                  <p className="text-[10px] text-gray-400 dark:text-[#F6F0D7]/60">All systems operational</p>
                </div>
                <span className="text-green-500 text-base">🟢</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-[#F6F0D7]">AI Services</p>
                  <p className="text-[10px] text-gray-400 dark:text-[#F6F0D7]/60">All services running</p>
                </div>
                <span className="text-green-500 text-base">🟢</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-[#F6F0D7]">Database</p>
                  <p className="text-[10px] text-gray-400 dark:text-[#F6F0D7]/60">Connected</p>
                </div>
                <span className="text-green-500 text-base">🟢</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-[#89986D]/10 border border-gray-100 dark:border-[#89986D]/20 text-center">
            <p className="text-[10px] text-gray-500 dark:text-[#F6F0D7]/70 font-semibold uppercase tracking-wider">Uptime</p>
            <h3 className="text-xl font-extrabold text-[#2F8F46] dark:text-[#B7E35F] mt-0.5">100%</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
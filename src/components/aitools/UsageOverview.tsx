"use client";

import { useEffect, useState } from "react";
import { ChefHat, Camera, BarChart3, Sparkles, Smile, ArrowUp, ArrowDown, Bell } from "lucide-react";

type StatData = {
  count: number;
  trend: string;
  trendDir: string;
};

export default function UsageOverview() {
  const [filter, setFilter] = useState("This Month");
  const [data, setData] = useState<Record<string, StatData>>({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`/api/ai-usage/stats?filter=${encodeURIComponent(filter)}`, {
          credentials: "omit" // or "include" depending on whether you want global or personal stats
        });
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error("Failed to fetch AI usage stats", err);
      }
    };
    fetchStats();
  }, [filter]);

  const stats = [
    {
      id: 1,
      label: "Recipes Generated",
      key: "RECIPES",
      icon: ChefHat,
      color: "text-green-600 bg-green-50 dark:bg-green-900/30",
    },
    {
      id: 2,
      label: "Photos Analyzed",
      key: "PHOTOS",
      icon: Camera,
      color: "text-purple-600 bg-purple-50 dark:bg-purple-900/30",
    },
    {
      id: 3,
      label: "Nutrition Analyses",
      key: "NUTRITION",
      icon: BarChart3,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-900/30",
    },
    {
      id: 4,
      label: "Taste Matches",
      key: "TASTE",
      icon: Smile,
      color: "text-orange-500 bg-orange-50 dark:bg-orange-900/30",
    },
    {
      id: 5,
      label: "Wellness Reminders",
      key: "WELLNESS",
      icon: Bell,
      color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-sm mb-6 h-full flex flex-col justify-center">
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">AI Usage Overview</h3>
        <select 
          className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg px-3 py-1.5 focus:outline-none"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>This Month</option>
          <option>Last Month</option>
          <option>All Time</option>
        </select>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {stats.map((stat) => {
          const statData = data[stat.key] || { count: 0, trend: "0%", trendDir: "up" };
          return (
            <div key={stat.id} className="flex flex-col group">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${stat.color} transition-transform group-hover:scale-110 duration-300`}>
                <stat.icon size={18} />
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white leading-tight mb-1">{statData.count.toLocaleString()}</p>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-2">{stat.label}</p>
              <div className={`flex items-center gap-1 text-[10px] font-bold ${statData.trendDir === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                {statData.trendDir === 'up' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                <span>{statData.trend}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

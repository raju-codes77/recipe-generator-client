"use client";

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import { useMealTracker } from "./MealTrackerContext";
import { getDailyHistory, DayEntry } from "@/app/api/meal-tracker/meal-tracker";

// Custom tooltip
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label, todayName }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-md px-3 py-2 text-xs">
        <p className="font-semibold text-gray-700 dark:text-gray-300">{label === todayName ? "Today" : label}</p>
        <p className="text-green-600 font-bold">{payload[0].value} kcal</p>
      </div>
    );
  }
  return null;
};

export default function CalorieTrend() {
  const [range] = useState("7 Days");
  const { mealLog } = useMealTracker();
  const [history, setHistory] = useState<Record<string, DayEntry>>({});

  useEffect(() => {
    getDailyHistory().then(setHistory);
  }, [mealLog]); // Refetch when mealLog changes so today's total is accurate

  // 1. Calculate dynamic 7-day trend
  const todayTotalKcal = mealLog.reduce((acc, m) => acc + m.kcal, 0);
  
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const todayIdx = new Date().getDay();
  const todayName = days[todayIdx];
  
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split("T")[0];
    return {
        day: days[d.getDay()],
        dateStr
    };
  });
  
  const dynamicData = last7Days.map((d, i) => {
    // For today (the last item), use the live calculated todayTotalKcal from mealLog
    if (i === 6) {
        return { day: d.day, kcal: todayTotalKcal };
    }
    // For past days, use the real history from the database
    return {
        day: d.day,
        kcal: history[d.dateStr]?.kcal || 0
    };
  });

  // 2. Calculate dynamic meal distribution
  const colorMap: Record<string, string> = {
    Breakfast: "#a78bfa",
    Lunch: "#16a34a",
    Snack: "#3b82f6",
    Dinner: "#f59e0b",
  };

  const getMealCategory = (timeStr: string) => {
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)?/i);
    if (!match) return "Snack";
    let h = parseInt(match[1]);
    const ampm = match[3]?.toUpperCase();
    if (ampm === "PM" && h < 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;
    
    if (h >= 5 && h < 11) return "Breakfast";
    if (h >= 11 && h < 15) return "Lunch";
    if (h >= 15 && h < 18) return "Snack";
    return "Dinner";
  };

  const distributionMap: Record<string, number> = {};
  mealLog.forEach((meal) => {
    const cat = getMealCategory(meal.time);
    if (!distributionMap[cat]) distributionMap[cat] = 0;
    distributionMap[cat] += meal.kcal;
  });

  if (mealLog.length === 0) {
    distributionMap["Breakfast"] = 0;
    distributionMap["Lunch"] = 0;
    distributionMap["Snack"] = 0;
    distributionMap["Dinner"] = 0;
  }

  const dynamicDistribution = Object.entries(distributionMap).map(([label, kcal]) => ({
    label,
    color: colorMap[label] || "#ec4899",
    kcal,
    pct: todayTotalKcal > 0 ? Math.round((kcal / todayTotalKcal) * 100) + "%" : "0%"
  })).sort((a, b) => {
    const order = ["Breakfast", "Lunch", "Snack", "Dinner"];
    return (order.indexOf(a.label) !== -1 ? order.indexOf(a.label) : 99) - 
           (order.indexOf(b.label) !== -1 ? order.indexOf(b.label) : 99);
  });

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Calorie Trend</h3>
        <select
          className="text-xs border border-gray-200 dark:border-slate-700 rounded-lg px-2 py-1 bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500"
          defaultValue={range}
        >
          <option>7 Days</option>
          <option>14 Days</option>
          <option>30 Days</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={dynamicData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            domain={[0, 1250]}
            ticks={[0, 250, 500, 750, 1000, 1250]}
          />
          <Tooltip content={<CustomTooltip todayName={todayName} />} />
          <Line
            type="monotone"
            dataKey="kcal"
            stroke="#16a34a"
            strokeWidth={2.5}
            dot={{ fill: "#16a34a", r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#16a34a" }}
          />
          {/* Highlight today */}
          <ReferenceDot
            x={todayName}
            y={todayTotalKcal}
            r={6}
            fill="#16a34a"
            stroke="white"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Meal distribution */}
      <div>
        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Meal Distribution
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          {dynamicDistribution.map((d) => (
            <div key={d.label} className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: d.color }}
              />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {d.label}{" "}
                <span className="text-gray-400">
                  {d.kcal} kcal ({d.pct})
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

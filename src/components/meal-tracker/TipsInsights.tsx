"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getDailyHistory, DayEntry } from "@/app/api/meal-tracker/meal-tracker";
import { useMealTracker } from "./MealTrackerContext";

export default function MonthlyCalendarTracker() {
  const { mealLog, dailyGoalKcal } = useMealTracker();
  const [viewDate, setViewDate] = useState(new Date());
  const [history, setHistory] = useState<Record<string, DayEntry>>({});

  // Load stored history
  useEffect(() => {
    getDailyHistory().then((h) => setHistory(h));
  }, [mealLog]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const monthName = viewDate.toLocaleString("default", { month: "long" });

  // Build grid: pad with empty cells before first day
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const todayStr = new Date().toISOString().split("T")[0];

  const prevMonth = () =>
    setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () =>
    setViewDate(new Date(year, month + 1, 1));

  const getDateStr = (day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const getStatus = (entry: DayEntry | undefined, isToday: boolean) => {
    if (!entry || entry.kcal === 0) return "empty";
    const goal = dailyGoalKcal ?? 2000;
    const pct = entry.kcal / goal;
    if (pct <= 0.75) return "under";
    if (pct <= 1.05) return "on-track";
    return "over";
  };

  const statusStyle: Record<string, string> = {
    empty: "bg-gray-50 text-gray-300",
    under: "bg-blue-50 text-blue-700 border border-blue-200",
    "on-track": "bg-green-50 text-green-700 border border-green-200",
    over: "bg-orange-50 text-orange-700 border border-orange-200",
  };

  const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Summary: current month totals
  const monthEntries = Object.entries(history).filter(([d]) =>
    d.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`)
  );
  const monthAvgKcal = monthEntries.length
    ? Math.round(monthEntries.reduce((s, [, e]) => s + e.kcal, 0) / monthEntries.length)
    : 0;
  const monthAvgProtein = monthEntries.length
    ? Math.round(monthEntries.reduce((s, [, e]) => s + e.protein, 0) / monthEntries.length)
    : 0;
  const daysLogged = monthEntries.length;
  const onTrackDays = monthEntries.filter(([, e]) => {
    const goal = dailyGoalKcal ?? 2000;
    const pct = e.kcal / goal;
    return pct > 0.75 && pct <= 1.05;
  }).length;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900">Monthly Tracker</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="p-1 rounded-lg hover:bg-gray-100 transition"
          >
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          </button>
          <span className="text-xs font-semibold text-gray-700 w-24 text-center">
            {monthName} {year}
          </span>
          <button
            onClick={nextMonth}
            className="p-1 rounded-lg hover:bg-gray-100 transition"
          >
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1">
        {DAY_LABELS.map((d) => (
          <div key={d} className="text-[10px] font-semibold text-gray-400 text-center">
            {d}
          </div>
        ))}

        {/* Empty cells before first day */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Day cells */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = getDateStr(day);
          const entry = history[dateStr];
          const isToday = dateStr === todayStr;
          const status = getStatus(entry, isToday);

          return (
            <div
              key={dateStr}
              title={
                entry
                  ? `${entry.kcal} kcal · ${entry.protein}g protein`
                  : "No data"
              }
              className={`relative flex flex-col items-center justify-start rounded-lg p-1 cursor-default transition group ${statusStyle[status]} ${
                isToday ? "ring-2 ring-green-500 ring-offset-1" : ""
              }`}
            >
              <span className={`text-[10px] font-bold leading-tight ${isToday ? "text-green-700" : ""}`}>
                {day}
              </span>
              {entry && entry.kcal > 0 && (
                <span className="text-[8px] leading-tight font-medium opacity-80">
                  {entry.kcal >= 1000 ? `${(entry.kcal / 1000).toFixed(1)}k` : entry.kcal}
                </span>
              )}

              {/* Tooltip on hover */}
              {entry && entry.kcal > 0 && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-20 hidden group-hover:flex flex-col bg-gray-900 text-white rounded-lg px-2.5 py-1.5 text-[10px] whitespace-nowrap shadow-lg">
                  <span className="font-semibold">{entry.kcal} kcal</span>
                  <span className="text-gray-300">{entry.protein}g protein</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 flex-wrap">
        {[
          { color: "bg-blue-200", label: "Under goal" },
          { color: "bg-green-200", label: "On track" },
          { color: "bg-orange-200", label: "Over goal" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1">
            <span className={`w-2.5 h-2.5 rounded-sm ${l.color}`} />
            <span className="text-[10px] text-gray-500">{l.label}</span>
          </div>
        ))}
      </div>

      {/* Monthly Summary */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
        <div className="text-center">
          <p className="text-base font-extrabold text-gray-900">{daysLogged}</p>
          <p className="text-[10px] text-gray-400">Days Logged</p>
        </div>
        <div className="text-center">
          <p className="text-base font-extrabold text-green-600">
            {monthAvgKcal > 0 ? `${monthAvgKcal}` : "--"}
          </p>
          <p className="text-[10px] text-gray-400">Avg kcal/day</p>
        </div>
        <div className="text-center">
          <p className="text-base font-extrabold text-blue-600">
            {monthAvgProtein > 0 ? `${monthAvgProtein}g` : "--"}
          </p>
          <p className="text-[10px] text-gray-400">Avg protein</p>
        </div>
      </div>

      {daysLogged > 0 && (
        <p className="text-[10px] text-center text-gray-400">
          🎯 {onTrackDays} of {daysLogged} days on target this month
        </p>
      )}
    </div>
  );
}

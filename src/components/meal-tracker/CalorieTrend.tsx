"use client";

import React, { useState } from "react";
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

const data = [
  { day: "Mon", kcal: 980 },
  { day: "Tue", kcal: 1150 },
  { day: "Wed", kcal: 870 },
  { day: "Thu", kcal: 1050 },
  { day: "Fri", kcal: 1200 },
  { day: "Sat", kcal: 950 },
  { day: "Sun", kcal: 820 },
];

const distribution = [
  { label: "Breakfast", color: "#a78bfa", kcal: 320, pct: "25%" },
  { label: "Lunch", color: "#16a34a", kcal: 420, pct: "34%" },
  { label: "Snack", color: "#3b82f6", kcal: 180, pct: "13%" },
  { label: "Dinner", color: "#f59e0b", kcal: 350, pct: "28%" },
];

// Custom tooltip for "Today 820 kcal"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-md px-3 py-2 text-xs">
        <p className="font-semibold text-gray-700">{label === "Sun" ? "Today" : label}</p>
        <p className="text-green-600 font-bold">{payload[0].value} kcal</p>
      </div>
    );
  }
  return null;
};

export default function CalorieTrend() {
  const [range] = useState("7 Days");

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900">Calorie Trend</h3>
        <select
          className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white text-gray-600 focus:outline-none focus:ring-1 focus:ring-green-500"
          defaultValue={range}
        >
          <option>7 Days</option>
          <option>14 Days</option>
          <option>30 Days</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
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
          <Tooltip content={<CustomTooltip />} />
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
            x="Sun"
            y={820}
            r={6}
            fill="#16a34a"
            stroke="white"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Meal distribution */}
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-2">
          Meal Distribution
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          {distribution.map((d) => (
            <div key={d.label} className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: d.color }}
              />
              <span className="text-xs text-gray-600">
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

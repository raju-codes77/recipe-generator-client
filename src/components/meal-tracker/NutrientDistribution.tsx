"use client";

import React from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useMealTracker } from "./MealTrackerContext";

export default function NutrientDistribution() {
  const { nutrients, nutrientLegend } = useMealTracker();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col gap-3">
      <h3 className="text-sm font-bold text-gray-900">Nutrient Distribution</h3>

      {nutrients.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart cx="50%" cy="50%" outerRadius={75} data={nutrients}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fontSize: 10, fill: "#6b7280" }}
              />
              <Radar
                name="Nutrients"
                dataKey="value"
                stroke="#16a34a"
                fill="#16a34a"
                fillOpacity={0.2}
              />
              <Tooltip
                formatter={(v: any) => [`${v}%`]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  fontSize: "11px",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>

          <div className="flex flex-col gap-1.5">
            {nutrientLegend.map((l) => (
              <div key={l.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: l.color }}
                  />
                  <span className="text-xs text-gray-700">{l.label}</span>
                </div>
                <span className="text-xs font-medium text-gray-600">
                  {l.value}
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 gap-2 text-gray-400">
          <svg
            viewBox="0 0 100 100"
            className="w-20 h-20 opacity-20"
            fill="none"
          >
            <polygon
              points="50,10 90,35 90,65 50,90 10,65 10,35"
              stroke="#9ca3af"
              strokeWidth="2"
              fill="none"
            />
            <polygon
              points="50,30 70,42 70,58 50,70 30,58 30,42"
              stroke="#9ca3af"
              strokeWidth="1"
              fill="none"
            />
          </svg>
          <p className="text-xs text-center">
            Nutrient data will appear after analysis.
          </p>
        </div>
      )}
    </div>
  );
}

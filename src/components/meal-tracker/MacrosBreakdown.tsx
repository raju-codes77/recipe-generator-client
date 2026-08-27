"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useMealTracker } from "./MealTrackerContext";

export default function MacrosBreakdown() {
  const { analysisResult } = useMealTracker();

  const nutritionFacts = analysisResult?.nutritionFacts ?? null;
  const totalKcal = nutritionFacts?.kcal ?? null;

  const protein = nutritionFacts?.protein ?? 0;
  const carbs = nutritionFacts?.carbs ?? 0;
  const fat = nutritionFacts?.fat ?? 0;
  const totalMacros = protein + carbs + fat;

  const macros = totalMacros > 0 ? [
    { name: "Protein", value: protein, color: "#f87171", pct: `${Math.round((protein/totalMacros)*100)}%` },
    { name: "Carbs", value: carbs, color: "#60a5fa", pct: `${Math.round((carbs/totalMacros)*100)}%` },
    { name: "Fat", value: fat, color: "#fbbf24", pct: `${Math.round((fat/totalMacros)*100)}%` },
  ] : [];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col gap-4">
      <h3 className="text-sm font-bold text-gray-900">Macros Breakdown</h3>

      {macros.length > 0 ? (
        <>
          <div className="relative flex justify-center">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={macros}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {macros.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: any, name: any) => [`${v}g`, name]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    fontSize: "11px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-extrabold text-gray-900">
                {totalKcal ?? "--"}
              </span>
              <span className="text-xs text-gray-400">kcal</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            {macros.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: d.color }}
                  />
                  <span className="text-xs text-gray-700">{d.name}</span>
                </div>
                <span className="text-xs text-gray-500">
                  {d.value}g ({d.pct})
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 gap-2 text-gray-400">
          <div className="w-20 h-20 rounded-full border-4 border-dashed border-gray-200 flex items-center justify-center">
            <span className="text-xs text-gray-300">No data</span>
          </div>
          <p className="text-xs text-center">
            Macro breakdown will appear after analysis.
          </p>
        </div>
      )}
    </div>
  );
}

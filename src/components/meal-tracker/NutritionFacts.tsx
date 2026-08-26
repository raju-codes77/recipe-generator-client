"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { useMealTracker } from "./MealTrackerContext";

export default function NutritionFacts() {
  const { analysisResult } = useMealTracker();
  const nutritionFacts = analysisResult?.nutritionFacts ?? null;

  const val = (v: number | null | undefined, unit = "") =>
    v !== null && v !== undefined ? `${v}${unit}` : "--";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col gap-4">
      <h3 className="text-sm font-bold text-gray-900">
        Nutrition Facts{" "}
        <span className="text-gray-400 font-normal">(Per Serving)</span>
      </h3>

      {/* Big calorie */}
      <div className="flex items-end gap-1">
        <span className="text-5xl font-extrabold text-gray-900 leading-none">
          {nutritionFacts?.kcal ?? "--"}
        </span>
        <span className="text-sm text-gray-400 mb-1">kcal</span>
      </div>

      {/* 2×2 macro grid */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Protein", value: val(nutritionFacts?.protein, "g") },
          { label: "Carbs", value: val(nutritionFacts?.carbs, "g") },
          { label: "Fat", value: val(nutritionFacts?.fat, "g") },
          { label: "Fiber", value: val(nutritionFacts?.fiber, "g") },
        ].map((m) => (
          <div
            key={m.label}
            className="flex flex-col items-center justify-center bg-gray-50 rounded-xl py-2 px-3 text-center"
          >
            <span className="text-xs text-gray-400">{m.label}</span>
            <span className="text-lg font-bold text-gray-900">{m.value}</span>
          </div>
        ))}
      </div>

      <button className="flex items-center gap-1 text-green-600 text-xs font-semibold hover:underline">
        View Full Nutrition Facts
        <ChevronRight className="w-3.5 h-3.5" />
      </button>

      {/* Extra 3 stats */}
      <div className="grid grid-cols-3 gap-2 pt-1 border-t border-gray-100">
        {[
          { label: "Sugar", value: val(nutritionFacts?.sugar, "g") },
          { label: "Sodium", value: val(nutritionFacts?.sodium, "mg") },
          { label: "Cholesterol", value: val(nutritionFacts?.cholesterol, "mg") },
        ].map((e) => (
          <div key={e.label} className="text-center">
            <p className="text-xs text-gray-400">{e.label}</p>
            <p className="text-sm font-bold text-gray-800">{e.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

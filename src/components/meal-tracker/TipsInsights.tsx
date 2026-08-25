"use client";

import React from "react";
import { Lightbulb } from "lucide-react";

export default function TipsInsights() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col gap-4 h-full">
      <div className="flex items-center gap-2">
        <Lightbulb className="w-4 h-4 text-yellow-500" />
        <h3 className="text-sm font-bold text-gray-900">Tips &amp; Insights</h3>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-xl">💡</span>
          <p className="text-sm font-bold text-gray-900">
            Great job! You&apos;re doing well.
          </p>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          You have 1,180 kcal remaining for today. Consider a light dinner with
          protein and veggies.
        </p>

        {/* Tip cards */}
        <div className="flex flex-col gap-2 mt-1">
          {[
            { emoji: "🥗", tip: "Add fiber-rich greens like spinach or kale." },
            { emoji: "💧", tip: "Stay hydrated — aim for 8 glasses of water." },
            { emoji: "🏃", tip: "A 30-min walk can burn ~150 kcal." },
          ].map((t, i) => (
            <div
              key={i}
              className="flex items-start gap-2 bg-gray-50 rounded-xl px-3 py-2"
            >
              <span className="text-base shrink-0">{t.emoji}</span>
              <p className="text-xs text-gray-600">{t.tip}</p>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full border border-green-600 text-green-700 hover:bg-green-50 text-sm font-semibold py-2.5 rounded-xl transition">
        View Personalized Tips
      </button>
    </div>
  );
}

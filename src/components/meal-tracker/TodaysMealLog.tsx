"use client";

import React from "react";
import { MoreHorizontal, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import { useMealTracker } from "./MealTrackerContext";

export default function TodaysMealLog() {
  const { mealLog } = useMealTracker();

  const totalKcal = mealLog.reduce((s, m) => s + m.kcal, 0);
  const totalProtein = mealLog.reduce((s, m) => s + m.protein, 0);
  const totalCarbs = mealLog.reduce((s, m) => s + m.carbs, 0);
  const totalFat = mealLog.reduce((s, m) => s + m.fat, 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900">Today&apos;s Meal Log</h3>
        <button className="text-xs text-green-600 font-semibold hover:underline">
          View All
        </button>
      </div>

      {mealLog.length > 0 ? (
        <>
          <div className="flex flex-col gap-3">
            {mealLog.map((meal, index) => (
              <div key={`${meal.type}-${meal.time}-${index}`} className="flex items-center gap-3 group">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-200">
                  <Image
                    src={meal.img}
                    alt={meal.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>

                <div className="w-20 shrink-0">
                  <p className="text-xs font-semibold text-gray-700">{meal.type}</p>
                  <p className="text-[10px] text-gray-400">{meal.time}</p>
                </div>

                <p className="flex-1 text-xs text-gray-700 truncate">{meal.name}</p>

                <div className="flex items-center gap-1 shrink-0 flex-wrap justify-end">
                  <span className="text-[10px] font-semibold text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded">
                    {meal.kcal} kcal
                  </span>
                  <span className="text-[10px] text-green-700 bg-green-50 px-1.5 py-0.5 rounded">
                    {meal.protein}g
                  </span>
                  <span className="text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                    {meal.carbs}g
                  </span>
                  <span className="text-[10px] text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">
                    {meal.fat}g
                  </span>
                </div>

                <button className="ml-1 opacity-0 group-hover:opacity-100 transition">
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            ))}
          </div>

          {/* Footer totals */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 flex-wrap gap-2">
            <div>
              <p className="text-[10px] text-gray-400">Total Consumed</p>
              <p className="text-sm font-bold text-gray-900">
                {totalKcal.toLocaleString()} kcal
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-gray-900">{totalProtein}g</p>
              <p className="text-[10px] text-gray-400">Protein</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-gray-900">{totalCarbs}g</p>
              <p className="text-[10px] text-gray-400">Carbs</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-gray-900">{totalFat}g</p>
              <p className="text-[10px] text-gray-400">Fat</p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 gap-3 text-gray-400">
          <UtensilsCrossed className="w-8 h-8 text-gray-300" />
          <p className="text-xs text-center">
            No meals logged today.
            <br />
            Upload a meal photo to get started.
          </p>
        </div>
      )}
    </div>
  );
}

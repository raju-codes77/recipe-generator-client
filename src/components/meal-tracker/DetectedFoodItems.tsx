"use client";

import React from "react";
import { useMealTracker } from "./MealTrackerContext";

export default function DetectedFoodItems() {
  const { detectedFoods, confidenceScore } = useMealTracker();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col gap-3">
      <h3 className="text-sm font-bold text-gray-900">Detected Food Items</h3>

      {detectedFoods.length > 0 ? (
        <div className="flex flex-col gap-2 flex-1">
          {detectedFoods.map((food) => (
            <div key={food.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: food.color }}
                />
                <span className="text-xs text-gray-700">{food.name}</span>
              </div>
              <span className="text-xs text-gray-400 shrink-0">
                {food.portion}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center py-8 gap-2 text-gray-400">
          <p className="text-xs text-center">
            No food items detected yet.
            <br />
            Upload a meal photo to begin.
          </p>
        </div>
      )}

      {/* Confidence Score */}
      <div className="mt-2 pt-3 border-t border-gray-100">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-gray-500">Confidence Score</span>
          <span className="text-xs font-semibold text-gray-700">
            {confidenceScore !== null ? `${confidenceScore}%` : "--"}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{ width: confidenceScore !== null ? `${confidenceScore}%` : "0%" }}
          />
        </div>
      </div>
    </div>
  );
}

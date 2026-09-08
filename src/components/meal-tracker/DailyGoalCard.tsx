"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { updateUserGoal } from "@/app/api/meal-tracker/meal-tracker";
import { useMealTracker } from "./MealTrackerContext";

export default function DailyGoalCard() {
  const { dailyGoalKcal, setDailyGoalKcal, mealLog, userId } = useMealTracker();

  const [isEditing, setIsEditing] = useState(false);
  const [tempGoal, setTempGoal] = useState<string | number>(dailyGoalKcal ?? 2000);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (dailyGoalKcal !== null) setTempGoal(dailyGoalKcal);
  }, [dailyGoalKcal]);

  const consumedKcal = mealLog.reduce((acc, meal) => acc + meal.kcal, 0);

  const remainingKcal = dailyGoalKcal ? Math.max(dailyGoalKcal - consumedKcal, 0) : null;
  const goalPercent = dailyGoalKcal ? Math.min(Math.round((consumedKcal / dailyGoalKcal) * 100), 100) : 0;

  const handleSaveGoal = async () => {
    const parsed = parseInt(tempGoal as string, 10);
    if (isNaN(parsed) || parsed <= 0) {
      toast.error("Please enter a valid number");
      return;
    }

    if (!userId) {
      toast.error("User not identified");
      return;
    }

    try {
      setIsSaving(true);
      await updateUserGoal(parsed, userId);
      setDailyGoalKcal(parsed);
      toast.success("Goal updated!");
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to save goal");
    } finally {
      setIsSaving(false);
    }
  };

  const RADIUS = 64;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const progress = goalPercent ?? 0;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress / 100);

  const fmt = (v: number | null) => (v !== null ? v.toLocaleString() : "--");

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between h-5">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Daily Goal</h3>
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={tempGoal}
              onChange={(e) => setTempGoal(e.target.value)}
              className="w-16 px-1 py-0.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-green-500"
              autoFocus
            />
            <button
              onClick={handleSaveGoal}
              disabled={isSaving}
              className="text-xs text-green-600 font-semibold hover:underline disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-xs text-green-600 font-semibold hover:underline"
          >
            Edit Goal
          </button>
        )}
      </div>

      {/* Circular progress ring */}
      <div className="flex justify-center">
        <div className="relative w-44 h-44">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r={RADIUS}
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="14"
            />
            <circle
              cx="80"
              cy="80"
              r={RADIUS}
              fill="none"
              stroke="#16a34a"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-[10px] text-gray-400 leading-tight">
              Daily Calorie Goal
            </p>
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white leading-none mt-1">
              {fmt(dailyGoalKcal)}
            </p>
            <p className="text-xs text-gray-400">kcal</p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex justify-between text-center">
        <div>
          <p className="text-[10px] text-gray-400 mb-0.5">Consumed</p>
          <p className="text-base font-bold text-gray-900 dark:text-white">
            {consumedKcal !== null ? `${fmt(consumedKcal)} kcal` : "--"}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400 mb-0.5">Remaining</p>
          <p className="text-base font-bold text-green-600">
            {remainingKcal !== null ? `${fmt(remainingKcal)} kcal` : "--"}
          </p>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400">
        {goalPercent !== null ? `${goalPercent}% of daily goal` : "No goal set yet"}
      </p>
    </div>
  );
}

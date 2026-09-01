"use client";

import React, { createContext, useContext, useState } from "react";
import { authClient } from "@/lib/auth-client";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FoodItem {
  color?: string;
  emoji: string;
  name: string;
  portion: string;
}

export interface MacroData {
  name: string;
  value: number;
  pct: string;
  color: string;
}

export interface NutrientData {
  subject: string;
  value: number;
}

export interface NutrientLegendItem {
  label: string;
  value: string;
  color: string;
}

export interface NutritionFactsData {
  kcal: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  fiber: number | null;
  sugar: number | null;
  sodium: number | null;
  cholesterol: number | null;
}

export interface Meal {
  type: string;
  time: string;
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  img: string;
}

export interface CaloriePoint {
  day: string;
  kcal: number;
}

export interface MealDistributionItem {
  label: string;
  color: string;
  kcal: number;
  pct: string;
}

export interface AnalysisStep {
  label: string;
  done: boolean;
}

export interface TipItem {
  emoji: string;
  tip: string;
}

// ─── AI Analysis Result ───────────────────────────────────────────────────────

export interface MealAnalysisResult {
  success: boolean;
  isFood: boolean;
  imageUrl: string;
  message: string;
  confidenceScore: number;

  detectedFoods: FoodItem[];

  nutritionFacts: NutritionFactsData;

  mealName: string;
  category: string;

  insightHeading: string;
  insightMessage: string;

  tips: TipItem[];
}

// ─── Context Shape ────────────────────────────────────────────────────────────

interface MealTrackerContextValue {
  // The authenticated user's ID (null when logged out / session loading)
  userId: string | null;

  // Upload / Preview
  analysisImage: string | null;
  setAnalysisImage: (url: string | null) => void;

  // AI Analysis
  analysisResult: MealAnalysisResult | null;
  setAnalysisResult: (result: MealAnalysisResult | null) => void;

  isAnalyzing: boolean;
  setIsAnalyzing: (val: boolean) => void;

  analysisSteps: AnalysisStep[];
  analysisProgress: number;
  analysisComplete: boolean;

  // Daily Goal
  dailyGoalKcal: number | null;
  setDailyGoalKcal: (val: number | null) => void;
  consumedKcal: number | null;
  remainingKcal: number | null;
  goalPercent: number | null;

  // Detected Foods
  detectedFoods: FoodItem[];
  confidenceScore: number | null;

  // Nutrition Facts
  nutritionFacts: NutritionFactsData | null;

  // Macros
  macros: MacroData[];

  // Nutrients
  nutrients: NutrientData[];
  nutrientLegend: NutrientLegendItem[];

  // Meal Log
  mealLog: Meal[];
  setMealLog: (meals: Meal[]) => void;

  // Calorie Trend
  calorieTrend: CaloriePoint[];
  mealDistribution: MealDistributionItem[];

  // Tips
  insightHeading: string | null;
  insightMessage: string | null;
  tips: TipItem[];
}

// ─── Default State ────────────────────────────────────────────────────────────

const defaultValue: MealTrackerContextValue = {
  userId: null,

  analysisImage: null,
  setAnalysisImage: () => { },

  analysisResult: null,
  setAnalysisResult: () => { },

  isAnalyzing: false,
  setIsAnalyzing: () => { },

  analysisSteps: [
    { label: "Detecting food items", done: false },
    { label: "Estimating portion sizes", done: false },
    { label: "Calculating nutrition facts", done: false },
  ],

  analysisProgress: 0,
  analysisComplete: false,

  dailyGoalKcal: 2000,
  setDailyGoalKcal: () => { },
  consumedKcal: null,
  remainingKcal: null,
  goalPercent: null,

  detectedFoods: [],
  confidenceScore: null,

  nutritionFacts: null,

  macros: [],

  nutrients: [],
  nutrientLegend: [],

  mealLog: [],
  setMealLog: () => { },

  calorieTrend: [],
  mealDistribution: [],

  insightHeading: null,
  insightMessage: null,
  tips: [],
};

// ─── Context ──────────────────────────────────────────────────────────────────

const MealTrackerContext =
  createContext<MealTrackerContextValue>(defaultValue);

export function useMealTracker() {
  return useContext(MealTrackerContext);
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function MealTrackerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // ── Auth: derive the real user ID from the better-auth session ─────────────
  // authClient.useSession() re-renders this provider whenever auth state
  // changes (login, logout, token refresh), which drives the isolation effect.
  const { data: session, isPending: isSessionPending } =
    authClient.useSession();

  // While the session is still resolving, treat userId as null so we do not
  // accidentally load or show any user-specific data prematurely.
  const userId: string | null = isSessionPending
    ? null
    : (session?.user?.id ?? null);

  // ── Meal-tracker state ─────────────────────────────────────────────────────
  const [analysisImage, setAnalysisImage] =
    useState<string | null>(null);

  const [analysisResult, setAnalysisResult] =
    useState<MealAnalysisResult | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [dailyGoalKcal, setDailyGoalKcal] = useState<number | null>(null);
  const [mealLog, setMealLog] = useState<Meal[]>([]);

  // ── Data isolation: reset + refetch whenever the authenticated user changes ─
  React.useEffect(() => {
    // Do nothing while the session is still loading to avoid a flash of the
    // previous user's data or a premature clear before we know who is logged in.
    if (isSessionPending) return;

    // Step 1 — Immediately wipe all in-memory state.
    // This guarantees that User A's meals/calories are NEVER shown to User B,
    // even for a single render frame between logout and the next fetch.
    setMealLog([]);
    setDailyGoalKcal(null);
    setAnalysisImage(null);
    setAnalysisResult(null);

    // Step 2 — If nobody is logged in, stay empty and stop.
    if (!userId) return;

    // Step 3 — Fetch this user's data from the correct, isolated sources.
    import("@/app/api/meal-tracker/meal-tracker").then(
      ({ getUserGoal, getMealLog }) => {
        // getUserGoal calls /api/users/goal with credentials: "include".
        // The backend reads the session cookie — no client-provided userId
        // is sent, so this endpoint is already backend-authorised.
        getUserGoal().then((goal: number | null) => {
          setDailyGoalKcal(typeof goal === "number" ? goal : 2000);
        });

        // getMealLog now requires a userId (no "default_user" fallback).
        // It reads localStorage key `meal_log_<userId>`, which is unique
        // per authenticated user, so User A's data is never visible to User B.
        getMealLog(userId).then((logs: Meal[]) => {
          if (Array.isArray(logs)) {
            setMealLog(logs);
          }
        });
      }
    );

  // Re-run whenever the authenticated user identity changes.
  // Covers: first load, login (null → userId), logout (userId → null),
  // and user switching (userIdA → userIdB).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, isSessionPending]);

  const value: MealTrackerContextValue = {
    ...defaultValue,

    // Expose the authenticated userId so child components (e.g. UploadCard)
    // can pass it to saveMealLog without needing to import authClient directly.
    userId,

    analysisImage,
    setAnalysisImage,

    analysisResult,
    setAnalysisResult,

    isAnalyzing,
    setIsAnalyzing,

    dailyGoalKcal,
    setDailyGoalKcal,

    mealLog,
    setMealLog,
  };

  return (
    <MealTrackerContext.Provider value={value}>
      {children}
    </MealTrackerContext.Provider>
  );
}
"use client";

import React, { createContext, useContext, useState } from "react";

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
  const [analysisImage, setAnalysisImage] =
    useState<string | null>(null);

  const [analysisResult, setAnalysisResult] =
    useState<MealAnalysisResult | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [dailyGoalKcal, setDailyGoalKcal] = useState<number | null>(2000);
  const [mealLog, setMealLog] = useState<Meal[]>([]);

  React.useEffect(() => {
    import("@/app/api/meal-tracker/meal-tracker").then(({ getUserGoal, getMealLog }) => {
      getUserGoal().then((goal) => {
        if (goal && typeof goal === "number") {
          setDailyGoalKcal(goal);
        }
      });
      getMealLog().then((logs) => {
        if (logs && Array.isArray(logs)) {
          setMealLog(logs);
        }
      });
    });
  }, []);

  const value: MealTrackerContextValue = {
    ...defaultValue,

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
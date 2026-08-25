"use client";

import React, { createContext, useContext, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FoodItem {
  color: string;
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

// ─── Context Shape ────────────────────────────────────────────────────────────

interface MealTrackerContextValue {
  // Upload / Preview
  analysisImage: string | null;
  setAnalysisImage: (url: string | null) => void;

  // AI Analysis
  analysisSteps: AnalysisStep[];
  analysisProgress: number;
  analysisComplete: boolean;

  // Daily Goal
  dailyGoalKcal: number | null;
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

  // Calorie Trend
  calorieTrend: CaloriePoint[];
  mealDistribution: MealDistributionItem[];

  // Tips
  insightHeading: string | null;
  insightMessage: string | null;
  tips: TipItem[];
}

// ─── Default (empty) state ────────────────────────────────────────────────────

const defaultValue: MealTrackerContextValue = {
  analysisImage: null,
  setAnalysisImage: () => {},

  analysisSteps: [
    { label: "Detecting food items", done: false },
    { label: "Estimating portion sizes", done: false },
    { label: "Calculating nutrition facts", done: false },
  ],
  analysisProgress: 0,
  analysisComplete: false,

  dailyGoalKcal: null,
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

  calorieTrend: [],
  mealDistribution: [],

  insightHeading: null,
  insightMessage: null,
  tips: [],
};

// ─── Context ──────────────────────────────────────────────────────────────────

const MealTrackerContext = createContext<MealTrackerContextValue>(defaultValue);

export function useMealTracker() {
  return useContext(MealTrackerContext);
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function MealTrackerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [analysisImage, setAnalysisImage] = useState<string | null>(null);

  const value: MealTrackerContextValue = {
    ...defaultValue,
    analysisImage,
    setAnalysisImage,
  };

  return (
    <MealTrackerContext.Provider value={value}>
      {children}
    </MealTrackerContext.Provider>
  );
}

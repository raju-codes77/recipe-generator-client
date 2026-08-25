"use client";

import React, { useState } from "react";
import {
  BarChart2,
  Download,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Sparkles,
  Leaf,
  ArrowRight,
} from "lucide-react";

import { MealTrackerProvider, useMealTracker } from "./MealTrackerContext";
import UploadCard from "./UploadCard";
import AIPreviewCard from "./AIPreviewCard";
import AIAnalysisCard from "./AIAnalysisCard";
import DailyGoalCard from "./DailyGoalCard";
import DetectedFoodItems from "./DetectedFoodItems";
import NutritionFacts from "./NutritionFacts";
import MacrosBreakdown from "./MacrosBreakdown";
import NutrientDistribution from "./NutrientDistribution";
import TodaysMealLog from "./TodaysMealLog";
import CalorieTrend from "./CalorieTrend";
import TipsInsights from "./TipsInsights";

// Inner component that consumes context
function DashboardInner() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { insightHeading, insightMessage } = useMealTracker();

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const prevDay = () =>
    setCurrentDate((d) => new Date(d.getTime() - 86400000));
  const nextDay = () =>
    setCurrentDate((d) => new Date(d.getTime() + 86400000));

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 py-6 space-y-6">
        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-green-100">
              <BarChart2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Meal Tracker</h1>
              <p className="text-sm text-gray-500">
                Upload your meal photo and get AI-powered nutrition analysis
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 border border-gray-200 rounded-xl px-3 py-2 bg-white shadow-sm">
              <Calendar className="w-4 h-4 text-gray-500 mr-1" />
              <span className="text-sm font-medium text-gray-700">
                {formatDate(currentDate)}
              </span>
              <button
                onClick={prevDay}
                className="ml-2 p-0.5 rounded hover:bg-gray-100 transition"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={nextDay}
                className="p-0.5 rounded hover:bg-gray-100 transition"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm transition">
              <Download className="w-4 h-4" />
              Export Report
              <ChevronRight className="w-3 h-3 -ml-1" />
            </button>
          </div>
        </div>

        {/* ── ROW 1 ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <UploadCard />
          <AIPreviewCard />
          <AIAnalysisCard />
          <DailyGoalCard />
        </div>

        {/* ── Analysis Results Header ── */}
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-green-600" />
          <h2 className="text-xl font-bold text-gray-900">Analysis Results</h2>
        </div>

        {/* ── ROW 2 ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <DetectedFoodItems />
          <NutritionFacts />
          <MacrosBreakdown />
          <NutrientDistribution />
        </div>

        {/* ── ROW 3 ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1">
            <TodaysMealLog />
          </div>
          <div className="lg:col-span-1">
            <CalorieTrend />
          </div>
          <div className="lg:col-span-1">
            <TipsInsights />
          </div>
        </div>

        {/* ── Bottom Banner ── */}
        {(insightHeading || insightMessage) && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-green-50 border border-green-200 rounded-2xl px-6 py-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 shrink-0 mt-0.5">
                <Leaf className="w-5 h-5 text-green-600" />
              </div>
              <div>
                {insightHeading && (
                  <p className="text-base font-bold text-green-800">
                    {insightHeading}
                  </p>
                )}
                {insightMessage && (
                  <p className="text-sm text-green-700 mt-0.5 max-w-xl">
                    {insightMessage}
                  </p>
                )}
              </div>
            </div>
            <button className="flex items-center gap-2 border border-green-600 text-green-700 hover:bg-green-100 text-sm font-semibold px-5 py-2.5 rounded-xl transition shrink-0">
              Learn More
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Root export wraps everything in the provider
export default function MealTrackerDashboard() {
  return (
    <MealTrackerProvider>
      <DashboardInner />
    </MealTrackerProvider>
  );
}

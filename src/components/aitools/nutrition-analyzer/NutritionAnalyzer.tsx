"use client";

import { useState, useRef } from "react";
import toast from "react-hot-toast";
import UploadCard from "./UploadCard";
import AnalysisResult from "./AnalysisResult";
import type { NutritionResult } from "@/types/nutrition";
import { Loader2, RefreshCw } from "lucide-react";

export default function NutritionAnalyzer() {
  const [result, setResult] = useState<NutritionResult | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("Analyzing image...");

  async function handleFileSelected(file: File) {
    setIsBusy(true);
    setStatusMessage("Uploading image...");

    try {
      const formData = new FormData();
      formData.append("image", file);

      setStatusMessage("Analyzing nutritional content with AI...");

      const res = await fetch("/api/nutrition/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Failed to analyze image");
      }

      // Ensure imageUrl fallback if server returned relative path or missing
      const localPreviewUrl = URL.createObjectURL(file);
      const finalResult: NutritionResult = {
        ...data,
        imageUrl: data.imageUrl || localPreviewUrl,
      };

      setResult(finalResult);
      toast.success("Analysis complete!");
    } catch (err: any) {
      console.error("Analysis error:", err);
      toast.error(err.message || "Something went wrong during analysis.");
    } finally {
      setIsBusy(false);
    }
  }

  function handleReset() {
    setResult(null);
  }

  return (
    <div className="w-full space-y-6">
      {result ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-50">
              Nutritional Breakdown
            </h2>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-medium text-neutral-700 shadow-xs transition hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Analyze Another Image
            </button>
          </div>
          <AnalysisResult result={result} />
          {/* Cross-link to Meal Tracker */}
          <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/40 rounded-2xl text-sm">
            <span className="text-2xl">📊</span>
            <div className="flex-1">
              <p className="font-semibold text-orange-800 dark:text-orange-300">Want to log this meal?</p>
              <p className="text-orange-700 dark:text-orange-400 text-xs mt-0.5">Use the Meal Tracker to snap a photo and track it directly against your daily calorie goal.</p>
            </div>
            <a href="/ai-tools/meal-tracker" className="shrink-0 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition">
              Go to Tracker →
            </a>
          </div>
        </div>
      ) : isBusy ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-neutral-200 bg-white p-12 text-center dark:border-neutral-800 dark:bg-neutral-900">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
            <Loader2 className="h-7 w-7 animate-spin" />
          </div>
          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-50">
            Analyzing Food Photo
          </h3>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            {statusMessage}
          </p>
        </div>
      ) : (
        <UploadCard onFileSelected={handleFileSelected} isBusy={isBusy} />
      )}
    </div>
  );
}
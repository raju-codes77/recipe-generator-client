"use client";

import { useState } from "react";
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
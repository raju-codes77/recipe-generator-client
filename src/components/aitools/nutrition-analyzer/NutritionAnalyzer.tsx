"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { RotateCcw } from "lucide-react";
import type { AnalyzerStatus, NutritionResult } from "@/types/nutrition";
import UploadCard from "./UploadCard";
import AnalysisResult from "./AnalysisResult";

export default function NutritionAnalyzer() {
  const [status, setStatus] = useState<AnalyzerStatus>("idle");
  const [result, setResult] = useState<NutritionResult | null>(null);

  async function handleFileSelected(file: File) {
    setStatus("analyzing");
    const toastId = toast.loading("Analyzing your food photo...");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/nutrition/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error ?? "Analysis failed.");
      }

      // Show the actual uploaded photo instead of the mock placeholder path.
      const objectUrl = URL.createObjectURL(file);
      setResult({ ...data, imageUrl: objectUrl } as NutritionResult);
      setStatus("done");
      toast.success("Analysis complete", { id: toastId });
    } catch (err) {
      setStatus("error");
      toast.error(err instanceof Error ? err.message : "Something went wrong.", {
        id: toastId,
      });
    }
  }

  function handleReset() {
    setResult(null);
    setStatus("idle");
  }

  return (
    <div className="mx-auto w-full max-w-5xl p-4 sm:p-6">
      {status === "done" && result ? (
        <>
          <div className="mb-3.5 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-medium text-neutral-900 dark:text-neutral-50">
                Nutrition analyzer
              </h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Here&apos;s what our AI found in your photo.
              </p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Analyze another photo
            </button>
          </div>
          <AnalysisResult result={result} />
        </>
      ) : (
        <UploadCard onFileSelected={handleFileSelected} isBusy={status === "analyzing"} />
      )}
    </div>
  );
}
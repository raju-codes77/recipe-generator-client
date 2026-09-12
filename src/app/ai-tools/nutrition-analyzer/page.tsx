import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Toaster } from "react-hot-toast";
import NutritionAnalyzer from "@/components/aitools/nutrition-analyzer/NutritionAnalyzer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nutrition Analyzer | FoodCanvas",
  description: "Upload food photos to analyze nutritional content and health insights with AI.",
};

export default function NutritionAnalyzerPage() {
  return (
    <div className="min-h-screen bg-emerald-50/20 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200 p-4 sm:p-6 md:p-10">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link
            href="/ai-tools"
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-2xs hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to AI Tools
          </Link>
          <div className="flex items-center text-xs sm:text-sm text-zinc-400 gap-1.5">
            <span>/</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              Nutrition Analyzer
            </span>
          </div>
        </div>
        <NutritionAnalyzer />
      </div>
    </div>
  );
}
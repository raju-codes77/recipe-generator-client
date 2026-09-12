"use client";

import React, { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { Upload, CloudUpload, CheckSquare } from "lucide-react";
import { useMealTracker } from "./MealTrackerContext";
import { analyzeMeal } from "@/app/api/meal-tracker/meal-tracker";

export default function UploadCard() {
  const {
    setAnalysisImage,
    setAnalysisResult,
    setIsAnalyzing,
    setMealLog,
    mealLog,
    userId,
  } = useMealTracker();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const isRequestingRef = useRef(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be smaller than 10MB.");
      return;
    }

    setSelectedFile(file);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setAnalysisImage(url);

    // Clear previous result when new image is selected
    setAnalysisResult(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (file) {
      handleFile(file);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (isRequestingRef.current) return;
    
    if (!selectedFile) {
      toast.error("Please select an image first.");
      return;
    }

    isRequestingRef.current = true;

    try {
      setLoading(true);
      setIsAnalyzing(true);

      const rawResult = await analyzeMeal(selectedFile);

      console.log("Raw Meal analysis result:", rawResult);

      if (!rawResult.success) {
        toast.error(rawResult.message || "Meal analysis failed.");
        return;
      }

      // Map raw backend response to frontend MealAnalysisResult interface
      const getMacro = (label: string) =>
        rawResult.macros?.find((m: any) => m.label.toLowerCase() === label.toLowerCase())?.grams || 0;
      const getMicro = (label: string) =>
        parseInt(rawResult.micros?.find((m: any) => m.label.toLowerCase() === label.toLowerCase())?.value || "0") || 0;

      const mappedResult = {
        success: rawResult.success,
        isFood: rawResult.isFood,
        imageUrl: rawResult.imageUrl,
        message: rawResult.message,
        confidenceScore: rawResult.confidenceScore || 0,
        detectedFoods: (rawResult.detectedItems || []).map((item: any) => ({
          name: item.name,
          portion: item.portion || "1 serving",
          emoji: item.icon || "🍽️",
          color: "#4ade80", // Default green color for dot
        })),
        nutritionFacts: {
          kcal: rawResult.calories || 0,
          protein: getMacro("protein"),
          carbs: getMacro("carbs"),
          fat: getMacro("fat"),
          fiber: getMicro("fiber"),
          sugar: getMicro("sugar"),
          sodium: getMicro("sodium"),
          cholesterol: getMicro("cholesterol"),
        },
        mealName: rawResult.foodName || rawResult.mealName || "Analyzed Meal",
        category: rawResult.tag || rawResult.category || "Meal",
        insightHeading: "Health Score: " + (rawResult.healthScoreLabel || "Good"),
        insightMessage: "Score: " + (rawResult.healthScore || "N/A"),
        tips: (rawResult.recommendations || []).map((r: any) => ({
          emoji: "💡",
          tip: r.description,
        })),
      };

      // Save API result in Context
      setAnalysisResult(mappedResult);

      // Create a Meal object and add to log
      const newMeal = {
        type: mappedResult.category,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        name: mappedResult.mealName,
        kcal: mappedResult.nutritionFacts.kcal,
        protein: mappedResult.nutritionFacts.protein,
        carbs: mappedResult.nutritionFacts.carbs,
        fat: mappedResult.nutritionFacts.fat,
        img: mappedResult.imageUrl || previewUrl || "",
      };

      const updated = [...mealLog, newMeal];
      setMealLog(updated);

      // Persist meal log and daily history to server is now handled entirely
      // by the backend /api/meals/analyze endpoint to prevent data duplication.

      console.log("Meal name:", mappedResult.mealName);
      console.log("Foods:", mappedResult.detectedFoods);
      console.log("Nutrition:", mappedResult.nutritionFacts);
      console.log("Image URL:", mappedResult.imageUrl);

      toast.success("Meal analyzed successfully!");
    } catch (error) {
      console.error("Meal analysis error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to analyze meal."
      );
    } finally {
      setLoading(false);
      setIsAnalyzing(false);
      isRequestingRef.current = false;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm p-5 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold shrink-0">
          1
        </span>

        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          Upload Your Meal
        </h3>
      </div>

      {/* Description */}
      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
        <CheckSquare className="w-4 h-4 text-green-600 shrink-0" />

        <span>Upload a clear photo of your meal</span>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="flex-1 flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl py-8 px-4 transition cursor-pointer border-gray-300 hover:border-green-400 hover:bg-gray-50 dark:bg-slate-700/50"
      >
        <CloudUpload className="w-10 h-10 text-gray-400" />

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Drag &amp; drop an image here
        </p>

        <p className="text-xs text-gray-400">
          or
        </p>

        {/* Upload Button */}
        <label className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition cursor-pointer">
          <Upload className="w-3.5 h-3.5" />

          Upload Photo

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        <p className="text-[10px] text-gray-400 mt-1">
          JPG, PNG, WEBP up to 10MB
        </p>

        {/* Selected File */}
        {selectedFile && (
          <div className="flex flex-col items-center gap-2 mt-2">
            <p className="text-xs text-green-600 font-medium">
              ✓ {selectedFile.name}
            </p>

            {/* Analyze Button */}
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-xs font-semibold px-5 py-2 rounded-lg transition"
            >
              {loading ? "Analyzing..." : "Analyze Meal"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
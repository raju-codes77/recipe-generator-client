"use client";

import React from "react";
import { CheckCircle2, Circle, Sparkles } from "lucide-react";
import { useMealTracker } from "./MealTrackerContext";

export default function AIAnalysisCard() {
  const { analysisResult, isAnalyzing } = useMealTracker();

  const analysisComplete = !!analysisResult && analysisResult.success;
  const analysisProgress = analysisComplete ? 100 : isAnalyzing ? 50 : 0;
  const analysisSteps = [
    { label: "Detecting food items", done: analysisProgress >= 50 },
    { label: "Estimating portion sizes", done: analysisProgress >= 50 },
    { label: "Calculating nutrition facts", done: analysisComplete },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col gap-4">
      <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
        <span
          className={`inline-block w-2 h-2 rounded-full ${
            analysisComplete
              ? "bg-green-500"
              : analysisProgress > 0
              ? "bg-green-500 animate-pulse"
              : "bg-gray-300"
          }`}
        />
        {analysisComplete
          ? "Analysis complete!"
          : analysisProgress > 0
          ? "AI is analyzing your meal..."
          : "Waiting for upload..."}
      </h3>

      <div className="flex flex-col gap-2.5">
        {analysisSteps.map((step) => (
          <div key={step.label} className="flex items-center gap-2">
            {step.done ? (
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
            ) : (
              <Circle className="w-4 h-4 text-gray-300 shrink-0" />
            )}
            <span
              className={`text-xs ${
                step.done ? "text-gray-700" : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-400">Progress</span>
          <span className="text-xs font-semibold text-gray-700">
            {analysisProgress}%
          </span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-600 rounded-full transition-all duration-500"
            style={{ width: `${analysisProgress}%` }}
          />
        </div>
      </div>

      {/* Success box — only shown when complete */}
      {analysisComplete && (
        <div className="flex items-start gap-2 bg-green-50 border border-green-200 rounded-xl p-3">
          <Sparkles className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-green-800">
              Analysis complete!
            </p>
            <p className="text-[11px] text-green-700 mt-0.5">
              Scroll down to see detailed results.
            </p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!analysisComplete && analysisProgress === 0 && (
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-3">
          <p className="text-xs text-gray-400">
            Upload a meal photo to start AI analysis.
          </p>
        </div>
      )}
    </div>
  );
}

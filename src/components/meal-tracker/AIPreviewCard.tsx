"use client";

import React from "react";
import { X, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useMealTracker } from "./MealTrackerContext";

export default function AIPreviewCard() {
  const { analysisImage, setAnalysisImage } = useMealTracker();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold shrink-0">
            2
          </span>
          <h3 className="text-sm font-bold text-gray-900">
            AI Analysis Preview
          </h3>
        </div>
        <span className="bg-green-100 text-green-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
          New
        </span>
      </div>

      <div className="relative flex-1 min-h-[180px] rounded-xl overflow-hidden bg-gray-50 border border-dashed border-gray-200">
        {analysisImage ? (
          <>
            <Image
              src={analysisImage}
              alt="Uploaded meal"
              fill
              className="object-cover"
              sizes="300px"
            />
            <button
              onClick={() => setAnalysisImage(null)}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow transition z-10"
            >
              <X className="w-3.5 h-3.5 text-gray-700" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2 py-10 text-gray-400">
            <ImageIcon className="w-8 h-8" />
            <p className="text-xs text-center">
              No image yet.
              <br />
              Upload a meal photo to preview.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

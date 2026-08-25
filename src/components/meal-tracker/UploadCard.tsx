"use client";

import React, { useState } from "react";
import { Upload, CloudUpload, CheckSquare } from "lucide-react";
import { useMealTracker } from "./MealTrackerContext";

export default function UploadCard() {
  const { setAnalysisImage } = useMealTracker();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Image must be smaller than 10MB.");
      return;
    }

    setSelectedFile(file);

    // Preview
    const previewUrl = URL.createObjectURL(file);
    setAnalysisImage(previewUrl);
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

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold shrink-0">
          1
        </span>

        <h3 className="text-sm font-bold text-gray-900">
          Upload Your Meal
        </h3>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-600">
        <CheckSquare className="w-4 h-4 text-green-600 shrink-0" />

        <span>Upload a clear photo of your meal</span>
      </div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="flex-1 flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl py-8 px-4 transition cursor-pointer border-gray-300 hover:border-green-400 hover:bg-gray-50"
      >
        <CloudUpload className="w-10 h-10 text-gray-400" />

        <p className="text-xs text-gray-500 text-center">
          Drag &amp; drop an image here
        </p>

        <p className="text-xs text-gray-400">or</p>

        <label className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition cursor-pointer">
          <Upload className="w-3.5 h-3.5" />

          Upload Photo

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        <p className="text-[10px] text-gray-400 mt-1">
          JPG, PNG up to 10MB
        </p>

        {selectedFile && (
          <p className="text-xs text-green-600 font-medium mt-2">
            ✓ {selectedFile.name}
          </p>
        )}
      </div>
    </div>
  );
}
"use client";

import { Sparkles } from "lucide-react";

interface GenerateButtonProps {
  isGenerating: boolean;
  onClick: () => void;
}

export default function GenerateButton({ isGenerating, onClick }: GenerateButtonProps) {
  return (
    <div className="flex flex-col items-center justify-center pt-4 space-y-2">
      <button
        onClick={onClick}
        disabled={isGenerating}
        className="w-full sm:w-auto px-10 py-3.5 rounded-full text-white font-bold text-base sm:text-lg bg-gradient-to-r from-emerald-600 to-orange-500 hover:from-emerald-700 hover:to-orange-600 shadow-md hover:shadow-lg transition transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <Sparkles className="w-5 h-5" />
        {isGenerating ? "Generating Recipe..." : "Generate My Recipe"}
      </button>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
        Our AI will create recipes based on your ingredients and preferences
      </p>
    </div>
  );
}
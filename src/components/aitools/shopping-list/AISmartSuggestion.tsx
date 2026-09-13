"use client";

import React from "react";
import { Lightbulb, ChevronRight } from "lucide-react";

interface Props {
  suggestionCount: number;
  onViewSuggestions: () => void;
}

export default function AISmartSuggestion({ suggestionCount, onViewSuggestions }: Props) {
  return (
    <div className="bg-[#EAF7EF] dark:bg-[#16A34A]/10 rounded-[20px] p-6 border border-[#16A34A]/15 dark:border-[#16A34A]/20">
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb size={16} className="text-[#16A34A] dark:text-[#4ADE80]" />
        <h3 className="text-sm font-bold text-[#0F6B46] dark:text-[#4ADE80]">AI Smart Suggestion</h3>
      </div>
      <p className="text-sm text-[#17211D]/70 dark:text-[#A6B0A9] mb-4">
        Based on your selected recipes, we found {suggestionCount} more ingredients you might need.
      </p>
      <button
        onClick={onViewSuggestions}
        className="px-4 py-2 bg-[#16A34A] hover:bg-[#0F6B46] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
      >
        View Suggestions <ChevronRight size={14} />
      </button>
    </div>
  );
}

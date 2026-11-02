"use client";

import React from "react";
import { Package, Refrigerator } from "lucide-react";

interface Props {
  pantryItemCount: number;
  onCheckPantry: () => void;
}

export default function PantryCard({ pantryItemCount, onCheckPantry }: Props) {
  return (
    <div className="bg-[#F1EDFF] dark:bg-[#8B5CF6]/10 rounded-[20px] p-6 border border-[#8B5CF6]/15 dark:border-[#8B5CF6]/20 relative overflow-hidden">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Package size={16} className="text-[#8B5CF6] dark:text-[#A78BFA]" />
            <h3 className="text-sm font-bold text-[#6D28D9] dark:text-[#A78BFA]">Your Pantry</h3>
          </div>
          <p className="text-sm text-[#17211D]/70 dark:text-[#A6B0A9] mb-4">
            You already have {pantryItemCount} ingredients in your pantry.
          </p>
          <button
            onClick={onCheckPantry}
            className="px-4 py-2 bg-white dark:bg-transparent text-[#6D28D9] dark:text-[#A78BFA] text-xs font-bold rounded-xl border border-[#8B5CF6]/25 hover:bg-[#8B5CF6]/10 transition-colors"
          >
            Check Pantry
          </button>
        </div>
        <div className="w-12 h-12 bg-white/70 dark:bg-white/5 rounded-2xl flex items-center justify-center shrink-0">
          <Refrigerator size={22} className="text-[#8B5CF6] dark:text-[#A78BFA]" />
        </div>
      </div>
    </div>
  );
}

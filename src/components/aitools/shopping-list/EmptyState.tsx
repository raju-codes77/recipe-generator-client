"use client";

import React from "react";
import { ShoppingBasket, Plus, Sparkles } from "lucide-react";

interface Props {
  onAddItem: () => void;
  onGenerateFromRecipe: () => void;
}

export default function EmptyState({ onAddItem, onGenerateFromRecipe }: Props) {
  return (
    <div className="flex flex-col items-center text-center py-14 px-4">
      <div className="w-16 h-16 rounded-2xl bg-[#EAF7EF] dark:bg-[#16A34A]/15 flex items-center justify-center mb-4">
        <ShoppingBasket size={28} className="text-[#16A34A] dark:text-[#4ADE80]" />
      </div>
      <h3 className="text-base font-bold text-[#17211D] dark:text-[#F4F7F4]">Your shopping list is empty.</h3>
      <p className="text-sm text-[#66736C] dark:text-[#A6B0A9] mt-1 max-w-xs">
        Add ingredients manually or generate a list from one of your recipes.
      </p>
      <div className="flex gap-3 mt-5">
        <button
          onClick={onAddItem}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-white dark:bg-transparent text-[#17211D] dark:text-[#F4F7F4] text-sm font-bold border border-[#E5E7EB] dark:border-white/10 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
        >
          <Plus size={16} /> Add Item
        </button>
        <button
          onClick={onGenerateFromRecipe}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-[#16A34A] hover:bg-[#0F6B46] text-white text-sm font-bold rounded-xl transition-colors"
        >
          <Sparkles size={16} /> Generate from Recipe
        </button>
      </div>
    </div>
  );
}

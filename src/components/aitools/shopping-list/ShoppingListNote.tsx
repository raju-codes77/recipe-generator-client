"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";

export default function ShoppingListNote() {
  return (
    <div className="p-4 bg-[#EAF7EF] dark:bg-[#16A34A]/10 text-[#0F6B46] dark:text-[#4ADE80] rounded-2xl text-xs sm:text-sm flex items-start gap-2.5 border border-[#16A34A]/15 dark:border-[#16A34A]/20">
      <ShieldCheck size={16} className="shrink-0 mt-0.5" />
      <p>
        <strong>Note:</strong> This shopping list is generated based on your selected recipes, pantry items and
        preferences. Quantities are estimates and may vary.
      </p>
    </div>
  );
}

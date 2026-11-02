"use client";

import React from "react";
import { PieChart } from "lucide-react";
import { Category } from "./types";
import { CATEGORY_META } from "./constants";

interface CategoryTotal {
  category: Category;
  count: number;
}

interface Props {
  totals: CategoryTotal[];
  total: number;
  fromPantry: number;
}

const COLOR_HEX: Record<Category, string> = {
  Produce: "#16A34A",
  Protein: "#F97316",
  Dairy: "#0ea5e9",
  Pantry: "#8B5CF6",
  Bakery: "#d97706",
  Frozen: "#06b6d4",
  Beverages: "#78716c",
  Other: "#94a3b8",
};

function Donut({ totals, total }: { totals: CategoryTotal[]; total: number }) {
  let cumulative = 0;
  const stops = totals
    .filter((t) => t.count > 0)
    .map((t) => {
      const start = (cumulative / total) * 360;
      cumulative += t.count;
      const end = (cumulative / total) * 360;
      return `${COLOR_HEX[t.category]} ${start}deg ${end}deg`;
    });

  const gradient = stops.length ? `conic-gradient(${stops.join(", ")})` : "conic-gradient(#e2e8f0 0deg 360deg)";

  return (
    <div className="relative w-28 h-28 rounded-full shrink-0" style={{ background: gradient }}>
      <div className="absolute inset-[9px] bg-white dark:bg-[#0b0f19] rounded-full flex flex-col items-center justify-center">
        <span className="text-lg font-extrabold text-[#17211D] dark:text-[#F4F7F4]">{total}</span>
        <span className="text-[10px] text-[#8A948D] dark:text-[#A6B0A9] font-medium text-center leading-tight">
          Total
          <br />
          Items
        </span>
      </div>
    </div>
  );
}

export default function ListSummary({ totals, total, fromPantry }: Props) {
  return (
    <div className="bg-white dark:bg-[#0b0f19] rounded-[20px] p-6 border border-[#E5E7EB] dark:border-white/5 shadow-sm">
      <h3 className="flex items-center gap-2 text-sm font-bold text-[#17211D] dark:text-[#F4F7F4] mb-5">
        <PieChart size={16} className="text-[#16A34A] dark:text-[#4ADE80]" /> List Summary
      </h3>
      <div className="flex items-center gap-5">
        <Donut totals={totals} total={total || 1} />
        <div className="flex-1 space-y-2.5 min-w-0">
          {totals.map(({ category, count }) => (
            <div key={category} className="flex items-center justify-between text-sm gap-2">
              <span className="flex items-center gap-2 text-[#66736C] dark:text-[#A6B0A9] truncate">
                <span className={`w-2 h-2 rounded-full shrink-0 ${CATEGORY_META[category].dot}`} />
                {category}
              </span>
              <span className="font-semibold text-[#17211D] dark:text-[#F4F7F4] shrink-0">{count}</span>
            </div>
          ))}
          <div className="flex items-center justify-between text-sm gap-2 pt-2 border-t border-[#E5E7EB] dark:border-white/10 mt-2">
            <span className="flex items-center gap-2 text-[#66736C] dark:text-[#A6B0A9]">
              <span className="w-2 h-2 rounded-full bg-slate-300 shrink-0" />
              From Pantry
            </span>
            <span className="font-semibold text-[#17211D] dark:text-[#F4F7F4] shrink-0">{fromPantry}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

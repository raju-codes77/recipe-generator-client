"use client";

import React from "react";
import { Check, Pencil, Trash2 } from "lucide-react";
import { ShoppingItem } from "./types";
import { CATEGORY_META, getFoodEmoji } from "./constants";

interface Props {
  item: ShoppingItem;
  onToggle: (id: string) => void;
  onEdit: (item: ShoppingItem) => void;
  onDelete: (id: string) => void;
}

export default function ShoppingItemRow({ item, onToggle, onEdit, onDelete }: Props) {
  const meta = CATEGORY_META[item.category];
  const emoji = getFoodEmoji(item.name, item.category);
  const buyAmount = item.pantryStock ? item.pantryStock.need - item.pantryStock.have : null;

  return (
    <div
      className={`flex items-center justify-between gap-3 p-3 rounded-xl border transition-all ${
        item.checked
          ? "bg-slate-50/60 dark:bg-white/[0.02] border-transparent opacity-60"
          : "bg-white dark:bg-transparent border-[#E5E7EB] dark:border-white/5 hover:bg-[#EAF7EF]/50 dark:hover:bg-white/[0.03]"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => onToggle(item.id)}
          aria-label={item.checked ? "Mark as not done" : "Mark as done"}
          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border-2 transition-colors ${
            item.checked
              ? "bg-[#16A34A] border-[#16A34A] text-white"
              : "border-[#8A948D]/50 text-transparent hover:border-[#16A34A]"
          }`}
        >
          {item.checked && <Check size={13} strokeWidth={3} />}
        </button>

        <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-base ${meta.iconBg}`}>
          {emoji}
        </span>

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`font-medium text-sm ${
                item.checked ? "line-through text-slate-400" : "text-[#17211D] dark:text-[#F4F7F4]"
              }`}
            >
              {item.name}
            </span>
            <span className="text-sm text-[#8A948D] dark:text-[#A6B0A9]">{item.quantity}</span>
            {item.source && (
              <span className={`hidden sm:inline text-[11px] font-semibold px-2 py-1 rounded-full ${meta.badgeBg} ${meta.badgeText}`}>
                From: {item.source}
              </span>
            )}
          </div>
          {item.pantryStock && buyAmount !== null && (
            <p className="text-[11px] text-[#8A948D] dark:text-[#A6B0A9] mt-0.5">
              Need {item.pantryStock.need}
              {item.pantryStock.unit} · Have {item.pantryStock.have}
              {item.pantryStock.unit} ·{" "}
              <span className="font-semibold text-[#F97316] dark:text-[#FB923C]">
                Buy {buyAmount > 0 ? buyAmount : 0}
                {item.pantryStock.unit}
              </span>
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => onEdit(item)}
          aria-label="Edit item"
          className="p-2 text-[#8A948D] hover:text-[#16A34A] hover:bg-[#EAF7EF] dark:hover:bg-white/5 rounded-lg transition-colors"
        >
          <Pencil size={15} />
        </button>
        <button
          onClick={() => onDelete(item.id)}
          aria-label="Delete item"
          className="p-2 text-[#8A948D] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}

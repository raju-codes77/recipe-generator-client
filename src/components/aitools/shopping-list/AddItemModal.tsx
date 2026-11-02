"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Category, ShoppingItem } from "./types";
import { CATEGORY_OPTIONS } from "./constants";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (item: Omit<ShoppingItem, "id" | "checked">) => void;
}

export default function AddItemModal({ open, onClose, onAdd }: Props) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState<Category>("Produce");

  if (!open) return null;

  const reset = () => {
    setName("");
    setQuantity("");
    setCategory("Produce");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quantity.trim()) return;
    onAdd({ name: name.trim(), quantity: quantity.trim(), category, source: "Manual", sourceType: "manual" });
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div
        className="bg-white dark:bg-[#0b0f19] rounded-[20px] p-6 w-full max-w-sm shadow-xl border border-[#E5E7EB] dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-[#17211D] dark:text-[#F4F7F4]">Add Item</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#66736C] hover:bg-slate-100 dark:hover:bg-white/5">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#66736C] dark:text-[#A6B0A9]">Item Name</label>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tomato"
              className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] dark:border-white/10 bg-[#FAFAF8] dark:bg-[#000000] text-sm text-[#17211D] dark:text-[#F4F7F4] focus:outline-none focus:ring-2 focus:ring-[#16A34A]/40"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#66736C] dark:text-[#A6B0A9]">Quantity</label>
            <input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g. 4 pcs"
              className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] dark:border-white/10 bg-[#FAFAF8] dark:bg-[#000000] text-sm text-[#17211D] dark:text-[#F4F7F4] focus:outline-none focus:ring-2 focus:ring-[#16A34A]/40"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#66736C] dark:text-[#A6B0A9]">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] dark:border-white/10 bg-[#FAFAF8] dark:bg-[#000000] text-sm text-[#17211D] dark:text-[#F4F7F4] focus:outline-none focus:ring-2 focus:ring-[#16A34A]/40"
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-[#E5E7EB] dark:border-white/10 text-sm font-bold text-[#17211D] dark:text-[#F4F7F4] hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#16A34A] hover:bg-[#0F6B46] text-white text-sm font-bold rounded-xl transition-colors"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

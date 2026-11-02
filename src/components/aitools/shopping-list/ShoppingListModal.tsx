"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  category: "Produce" | "Protein" | "Dairy" | "Pantry";
  source: string;
  completed: boolean;
  isPantryItem?: boolean;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<ShoppingItem, "id" | "completed"> & { id?: string }) => void;
  initialData?: ShoppingItem | null;
}

export default function ShoppingListModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: ModalProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState<ShoppingItem["category"]>("Produce");
  const [source, setSource] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setQuantity(initialData.quantity);
      setCategory(initialData.category);
      setSource(initialData.source);
    } else {
      setName("");
      setQuantity("");
      setCategory("Produce");
      setSource("Manual Add");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({
      id: initialData?.id,
      name,
      quantity: quantity || "1 pc",
      category,
      source: source || "Manual Add",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900 border border-emerald-100 dark:border-zinc-800">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-800">
          <h3 className="text-lg font-bold text-[#17211D] dark:text-zinc-100">
            {initialData ? "Edit Item" : "Add New Item"}
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-zinc-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#66736C] dark:text-zinc-400 mb-1">
              Item Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tomatoes"
              className="w-full rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-[#17211D] dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#66736C] dark:text-zinc-400 mb-1">
                Quantity
              </label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 500 g, 4 pcs"
                className="w-full rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-[#17211D] dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#66736C] dark:text-zinc-400 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as ShoppingItem["category"])
                }
                className="w-full rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-[#17211D] dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
              >
                <option value="Produce">Produce</option>
                <option value="Protein">Protein</option>
                <option value="Dairy">Dairy</option>
                <option value="Pantry">Pantry</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#66736C] dark:text-zinc-400 mb-1">
              Source / Recipe Name
            </label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="e.g. Chicken Bhuna"
              className="w-full rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-[#17211D] dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100 dark:border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 dark:border-zinc-700 px-4 py-2 text-xs font-semibold text-[#66736C] dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#16A34A] px-4 py-2 text-xs font-semibold text-white shadow hover:bg-[#0F6B46] transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
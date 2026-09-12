"use client";

import React, { useMemo } from "react";
import { Trash2, ChevronDown } from "lucide-react";
import { Category, ShoppingItem, SortMode } from "./types";
import { CATEGORY_ORDER } from "./constants";
import ShoppingCategory from "./ShoppingCategory";
import ShoppingItemRow from "./ShoppingItemRow";
import EmptyState from "./EmptyState";

interface Props {
  items: ShoppingItem[];
  sortMode: SortMode;
  onSortModeChange: (mode: SortMode) => void;
  onToggle: (id: string) => void;
  onEdit: (item: ShoppingItem) => void;
  onDelete: (id: string) => void;
  onClearCompleted: () => void;
  onAddItem: () => void;
  onGenerateFromRecipe: () => void;
}

export default function ShoppingListCard({
  items,
  sortMode,
  onSortModeChange,
  onToggle,
  onEdit,
  onDelete,
  onClearCompleted,
  onAddItem,
  onGenerateFromRecipe,
}: Props) {
  const groupedByCategory = useMemo(() => {
    const present = CATEGORY_ORDER.filter((c) => items.some((i) => i.category === c));
    return present.map((category) => ({
      category,
      items: items.filter((i) => i.category === category),
    }));
  }, [items]);

  const flatSorted = useMemo(() => {
    const copy = [...items];
    if (sortMode === "name") {
      copy.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortMode === "status") {
      copy.sort((a, b) => Number(a.checked) - Number(b.checked));
    }
    return copy;
  }, [items, sortMode]);

  return (
    <div className="bg-white dark:bg-[#0b0f19] rounded-[20px] p-6 border border-[#E5E7EB] dark:border-white/5 shadow-sm">
      <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
        <div className="relative">
          <select
            value={sortMode}
            onChange={(e) => onSortModeChange(e.target.value as SortMode)}
            className="appearance-none pr-8 pl-3 py-2 text-sm font-semibold text-[#17211D] dark:text-[#F4F7F4] border border-[#E5E7EB] dark:border-white/10 rounded-xl bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer focus:outline-none"
          >
            <option value="category">Sort by: Category</option>
            <option value="name">Sort by: Name</option>
            <option value="status">Sort by: Status</option>
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#66736C]" />
        </div>
        <button
          onClick={onClearCompleted}
          className="flex items-center gap-1.5 text-sm font-semibold text-red-500 hover:text-red-600"
        >
          <Trash2 size={15} /> Clear Completed
        </button>
      </div>

      {items.length === 0 ? (
        <EmptyState onAddItem={onAddItem} onGenerateFromRecipe={onGenerateFromRecipe} />
      ) : sortMode === "category" ? (
        <div className="space-y-7">
          {groupedByCategory.map(({ category, items: catItems }) => (
            <ShoppingCategory
              key={category}
              category={category as Category}
              items={catItems}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {flatSorted.map((item) => (
            <ShoppingItemRow key={item.id} item={item} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import React from "react";
import { Category, ShoppingItem } from "./types";
import { CATEGORY_META } from "./constants";
import ShoppingItemRow from "./ShoppingItemRow";

interface Props {
  category: Category;
  items: ShoppingItem[];
  onToggle: (id: string) => void;
  onEdit: (item: ShoppingItem) => void;
  onDelete: (id: string) => void;
}

export default function ShoppingCategory({ category, items, onToggle, onEdit, onDelete }: Props) {
  const meta = CATEGORY_META[category];
  const Icon = meta.icon;

  return (
    <div>
      <h3 className="flex items-center gap-2 text-[15px] font-bold text-[#17211D] dark:text-[#F4F7F4] mb-3">
        <Icon size={16} className={meta.iconColor} />
        {category}
        <span className="text-xs font-medium text-[#8A948D] dark:text-[#A6B0A9]">
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </h3>
      <div className="space-y-2">
        {items.map((item) => (
          <ShoppingItemRow key={item.id} item={item} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}

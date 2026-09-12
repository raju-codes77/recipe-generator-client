"use client";

import React, { useMemo, useState } from "react";
import { Home as HomeIcon, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

import { ShoppingItem, SortMode } from "@/components/aitools/shopping-list/types";
import { CATEGORY_ORDER } from "@/components/aitools/shopping-list/constants";
import { INITIAL_ITEMS, MISSING_INGREDIENTS, RECIPE_GENERATED_ITEMS } from "@/components/aitools/shopping-list/mockData";

import ShoppingListHeader from "@/components/aitools/shopping-list/ShoppingListHeader";
import ShoppingStats from "@/components/aitools/shopping-list/ShoppingStats";
import ShoppingListCard from "@/components/aitools/shopping-list/ShoppingListCard";
import AddItemModal from "@/components/aitools/shopping-list/AddItemModal";
import EditItemModal from "@/components/aitools/shopping-list/EditItemModal";
import ShareListModal from "@/components/aitools/shopping-list/ShareListModal";
import ListSummary from "@/components/aitools/shopping-list/ListSummary";
import QuickActions from "@/components/aitools/shopping-list/QuickActions";
import AISmartSuggestion from "@/components/aitools/shopping-list/AISmartSuggestion";
import PantryCard from "@/components/aitools/shopping-list/PantryCard";
import ShoppingListNote from "@/components/aitools/shopping-list/ShoppingListNote";

function mergeDuplicates(items: ShoppingItem[]): ShoppingItem[] {
  const groups = new Map<string, ShoppingItem[]>();
  items.forEach((item) => {
    const key = `${item.name.toLowerCase()}__${item.category}`;
    groups.set(key, [...(groups.get(key) ?? []), item]);
  });

  const merged: ShoppingItem[] = [];
  groups.forEach((group) => {
    if (group.length === 1) {
      merged.push(group[0]);
      return;
    }
    const first = group[0];
    const numeric = group.every((g) => /^\d+(\.\d+)?\s*\S*$/.test(g.quantity.trim()));
    if (numeric) {
      const unit = first.quantity.trim().replace(/^\d+(\.\d+)?\s*/, "");
      const sum = group.reduce((acc, g) => acc + (parseFloat(g.quantity) || 0), 0);
      merged.push({ ...first, quantity: unit ? `${sum} ${unit}` : `${sum}`, checked: group.every((g) => g.checked) });
    } else {
      merged.push({ ...first, quantity: `${first.quantity} (x${group.length})` });
    }
  });
  return merged;
}

export default function ShoppingListPage() {
  const [items, setItems] = useState<ShoppingItem[]>(INITIAL_ITEMS);
  const [sortMode, setSortMode] = useState<SortMode>("category");
  const [addOpen, setAddOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);
  const [optimizing, setOptimizing] = useState(false);

  const stats = useMemo(() => {
    const total = items.length;
    const completed = items.filter((i) => i.checked).length;
    const remaining = total - completed;
    const fromPantry = items.filter((i) => i.sourceType === "pantry").length;
    return { total, completed, remaining, fromPantry };
  }, [items]);

  const categoryTotals = useMemo(
    () =>
      CATEGORY_ORDER.map((category) => ({
        category,
        count: items.filter((i) => i.category === category).length,
      })).filter((c) => c.count > 0),
    [items]
  );

  // --- handlers -------------------------------------------------------

  const handleToggle = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)));
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast.success("Item removed from your shopping list.");
  };

  const handleAdd = (newItem: Omit<ShoppingItem, "id" | "checked">) => {
    setItems((prev) => [...prev, { ...newItem, id: `manual-${Date.now()}`, checked: false }]);
    toast.success("Item added to your shopping list.");
  };

  const handleSaveEdit = (id: string, updates: Partial<ShoppingItem>) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...updates } : i)));
    toast.success("Shopping item updated.");
  };

  const handleClearCompleted = () => {
    const hasCompleted = items.some((i) => i.checked);
    if (!hasCompleted) {
      toast("Nothing to clear.");
      return;
    }
    setItems((prev) => prev.filter((i) => !i.checked));
    toast.success("Completed items cleared.");
  };

  const handleGenerateFromRecipe = () => {
    setItems((prev) => [
      ...prev,
      ...RECIPE_GENERATED_ITEMS.filter((gen) => !prev.some((i) => i.name === gen.name && i.category === gen.category)),
    ]);
    toast.success("Recipe ingredients added to your shopping list.");
  };

  const handleAddMissing = () => {
    setItems((prev) => [
      ...prev,
      ...MISSING_INGREDIENTS.filter((miss) => !prev.some((i) => i.name === miss.name && i.category === miss.category)),
    ]);
    toast.success("Missing ingredients added.");
  };

  const handleOptimize = () => {
    setOptimizing(true);
    setTimeout(() => {
      setItems((prev) => mergeDuplicates(prev));
      setOptimizing(false);
      toast.success("Your shopping list has been optimized.");
    }, 900);
  };

  const handleViewSuggestions = () => {
    handleAddMissing();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 ">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-[#8A948D] dark:text-[#A6B0A9] mb-5">
        <HomeIcon size={14} />
        <span>Home</span>
        <ChevronRight size={14} />
        <span className="text-[#17211D] dark:text-[#F4F7F4] font-medium">Shopping List</span>
      </div>

      <div className="space-y-6 mb-6">
        <ShoppingListHeader onAddItem={() => setAddOpen(true)} onGenerateFromRecipe={handleGenerateFromRecipe} />
        <ShoppingStats stats={stats} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          <ShoppingListCard
            items={items}
            sortMode={sortMode}
            onSortModeChange={setSortMode}
            onToggle={handleToggle}
            onEdit={setEditingItem}
            onDelete={handleDelete}
            onClearCompleted={handleClearCompleted}
            onAddItem={() => setAddOpen(true)}
            onGenerateFromRecipe={handleGenerateFromRecipe}
          />
          <ShoppingListNote />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <ListSummary totals={categoryTotals} total={stats.total} fromPantry={stats.fromPantry} />
          <QuickActions
            onAddMissing={handleAddMissing}
            onClearCompleted={handleClearCompleted}
            onOptimize={handleOptimize}
            onShare={() => setShareOpen(true)}
            optimizing={optimizing}
          />
          <AISmartSuggestion suggestionCount={MISSING_INGREDIENTS.length} onViewSuggestions={handleViewSuggestions} />
          <PantryCard pantryItemCount={7} onCheckPantry={() => toast("Opening your pantry...")} />
        </div>
      </div>

      <AddItemModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={handleAdd} />
      <EditItemModal item={editingItem} onClose={() => setEditingItem(null)} onSave={handleSaveEdit} />
      <ShareListModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </div>
  );
}

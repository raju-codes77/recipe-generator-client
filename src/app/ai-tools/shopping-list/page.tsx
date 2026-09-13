"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Home as HomeIcon, ChevronRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { ShoppingItem, SortMode, Category } from "@/components/aitools/shopping-list/types";
import { CATEGORY_ORDER } from "@/components/aitools/shopping-list/constants";

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
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function mapBackendItem(item: any): ShoppingItem {
  const qtyStr = typeof item.quantity === "number"
    ? `${item.quantity}${item.unit ? " " + item.unit : ""}`
    : String(item.quantity || "1");

  return {
    id: item.id,
    name: item.name,
    quantity: qtyStr,
    category: (item.category as Category) || "Other",
    checked: Boolean(item.checked),
    source: item.source || undefined,
    sourceType: (item.sourceType as any) || "manual",
  };
}

export default function ShoppingListPage() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [pantryCount, setPantryCount] = useState(0);
  const [sortMode, setSortMode] = useState<SortMode>("category");
  const [addOpen, setAddOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);
  const [optimizing, setOptimizing] = useState(false);

  // Fetch Shopping List from Real Backend API
  const fetchShoppingList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/shopping-list`, {
        credentials: "include",
      });

      if (res.status === 401) {
        toast.error("Please sign in to access your shopping list.");
        setItems([]);
        return;
      }

      if (!res.ok) throw new Error("Failed to load shopping list");

      const data = await res.json();
      const mapped = (data.items || []).map(mapBackendItem);
      setItems(mapped);
      if (data.summary?.fromPantry !== undefined) {
        setPantryCount(data.summary.fromPantry);
      }
    } catch (err: any) {
      console.error("Error loading shopping list:", err);
      toast.error(err.message || "Failed to load shopping list");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShoppingList();
  }, [fetchShoppingList]);

  const stats = useMemo(() => {
    const total = items.length;
    const completed = items.filter((i) => i.checked).length;
    const remaining = total - completed;
    const fromPantry = pantryCount;
    return { total, completed, remaining, fromPantry };
  }, [items, pantryCount]);

  const categoryTotals = useMemo(
    () =>
      CATEGORY_ORDER.map((category) => ({
        category,
        count: items.filter((i) => i.category === category).length,
      })).filter((c) => c.count > 0),
    [items]
  );

  // --- API Handlers -------------------------------------------------------

  const handleToggle = async (id: string) => {
    // Optimistic UI update
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)));
    try {
      const res = await fetch(`${API_URL}/api/shopping-list/${id}/toggle`, {
        method: "PATCH",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to toggle item");
      const data = await res.json();
      setItems((data.items || []).map(mapBackendItem));
    } catch {
      toast.error("Failed to toggle item status.");
      fetchShoppingList();
    }
  };

  const handleDelete = async (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    try {
      const res = await fetch(`${API_URL}/api/shopping-list/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete item");
      const data = await res.json();
      setItems((data.items || []).map(mapBackendItem));
      toast.success("Item removed from your shopping list.");
    } catch {
      toast.error("Failed to delete item.");
      fetchShoppingList();
    }
  };

  const handleAdd = async (newItem: Omit<ShoppingItem, "id" | "checked">) => {
    try {
      // Split quantity into number & unit if possible
      const match = newItem.quantity.match(/^([\d\.]+)\s*(.*)$/);
      const quantity = match ? parseFloat(match[1]) : 1;
      const unit = match ? match[2] : "pcs";

      const res = await fetch(`${API_URL}/api/shopping-list`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: newItem.name,
          quantity,
          unit,
          category: newItem.category,
        }),
      });

      if (!res.ok) throw new Error("Failed to add item");
      const data = await res.json();
      setItems((data.items || []).map(mapBackendItem));
      toast.success("Item added to your shopping list.");
    } catch (err: any) {
      toast.error(err.message || "Failed to add item.");
    }
  };

  const handleSaveEdit = async (id: string, updates: Partial<ShoppingItem>) => {
    try {
      let quantity: number | undefined = undefined;
      let unit: string | undefined = undefined;

      if (updates.quantity) {
        const match = updates.quantity.match(/^([\d\.]+)\s*(.*)$/);
        if (match) {
          quantity = parseFloat(match[1]);
          unit = match[2];
        }
      }

      const res = await fetch(`${API_URL}/api/shopping-list/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: updates.name,
          quantity,
          unit,
          category: updates.category,
        }),
      });

      if (!res.ok) throw new Error("Failed to update item");
      const data = await res.json();
      setItems((data.items || []).map(mapBackendItem));
      toast.success("Shopping item updated.");
    } catch {
      toast.error("Failed to update shopping item.");
    }
  };

  const handleClearCompleted = async () => {
    const hasCompleted = items.some((i) => i.checked);
    if (!hasCompleted) {
      toast("Nothing to clear.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/shopping-list/completed`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to clear completed items");
      const data = await res.json();
      setItems((data.items || []).map(mapBackendItem));
      toast.success("Completed items cleared.");
    } catch {
      toast.error("Failed to clear completed items.");
    }
  };

  const handleOptimize = async () => {
    setOptimizing(true);
    try {
      const res = await fetch(`${API_URL}/api/shopping-list/optimize`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to optimize shopping list");
      const data = await res.json();
      setItems((data.items || []).map(mapBackendItem));
      toast.success("Your shopping list has been optimized.");
    } catch {
      toast.error("Failed to optimize shopping list.");
    } finally {
      setOptimizing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 ">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-[#8A948D] dark:text-[#A6B0A9] mb-5"><Link className="flex justify-center items-center gap-1 hover:text-[#16A34A] cursor-pointer " href='/ai-tools'>
        <span>AI Tools</span>
        <ChevronRight size={14} /></Link>
        <span className="text-[#17211D] dark:text-[#F4F7F4] font-medium">Shopping List</span>
      </div>

      <div className="space-y-6 mb-6">
        <ShoppingListHeader onAddItem={() => setAddOpen(true)} onGenerateFromRecipe={() => fetchShoppingList()} />
        <ShoppingStats stats={stats} />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-[#15211B] rounded-3xl border border-[#E5E7EB] dark:border-white/5 space-y-3">
          <Loader2 className="w-8 h-8 text-[#16A34A] animate-spin" />
          <p className="text-sm font-semibold text-[#66736C] dark:text-[#A6B0A9]">Loading your real shopping list...</p>
        </div>
      ) : (
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
              onGenerateFromRecipe={fetchShoppingList}
            />
            <ShoppingListNote />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ListSummary totals={categoryTotals} total={stats.total} fromPantry={stats.fromPantry} />
            <QuickActions
              onAddMissing={fetchShoppingList}
              onClearCompleted={handleClearCompleted}
              onOptimize={handleOptimize}
              onShare={() => setShareOpen(true)}
              optimizing={optimizing}
            />
            <AISmartSuggestion suggestionCount={items.filter((i) => !i.checked).length} onViewSuggestions={fetchShoppingList} />
            <PantryCard pantryItemCount={pantryCount} onCheckPantry={() => toast("Pantry items checked against shopping list.")} />
          </div>
        </div>
      )}

      <AddItemModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={handleAdd} />
      <EditItemModal item={editingItem} onClose={() => setEditingItem(null)} onSave={handleSaveEdit} />
      <ShareListModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </div>
  );
}

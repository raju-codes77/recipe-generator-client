"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Leaf, AlertTriangle, CheckCircle, Clock, Trash2, Plus, 
  Loader2, RefreshCw, ShoppingBasket, Search, X
} from "lucide-react";
import toast from "react-hot-toast";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// --- Types ---
interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string | null;
  expiryDate: string;
  status: string;
}

interface Stats {
  totalIngredients: number;
  expiringSoon: number;
  expired: number;
  savedFromWaste: number;
  wasted: number;
  wasteReductionPercentage: number;
}

// --- Helper Functions ---
function getDaysRemaining(expiryDate: string) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const exp = new Date(expiryDate);
  exp.setHours(0, 0, 0, 0);
  return Math.ceil((exp.getTime() - now.getTime()) / (1000 * 3600 * 24));
}

function getStatusInfo(days: number) {
  if (days < 0) return { label: "Expired", color: "text-red-600 bg-red-100", border: "border-red-200" };
  if (days <= 1) return { label: "Urgent", color: "text-orange-600 bg-orange-100", border: "border-orange-200" };
  if (days <= 5) return { label: "Use Soon", color: "text-amber-600 bg-amber-100", border: "border-amber-200" };
  return { label: "Fresh", color: "text-emerald-600 bg-emerald-100", border: "border-emerald-200" };
}

export default function FoodWasteManager() {
  const router = useRouter();
  const [items, setItems] = useState<PantryItem[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "", quantity: 1, unit: "pcs", expiryDays: 7
  });

  // --- Fetch Data ---
  const loadData = async () => {
    try {
      const [itemsRes, statsRes] = await Promise.all([
        fetch(`${apiUrl}/api/pantry`, { credentials: "include" }),
        fetch(`${apiUrl}/api/pantry/stats`, { credentials: "include" })
      ]);
      if (itemsRes.ok) setItems(await itemsRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
    } catch (err) {
      toast.error("Failed to load food waste data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // --- Actions ---
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + form.expiryDays);

      const res = await fetch(`${apiUrl}/api/pantry`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          quantity: Number(form.quantity),
          unit: form.unit,
          expiryDate: expiryDate.toISOString(),
          category: "General"
        }),
      });

      if (!res.ok) throw new Error("Failed to add ingredient");
      
      toast.success("Ingredient added to pantry");
      setShowAddForm(false);
      setForm({ name: "", quantity: 1, unit: "pcs", expiryDays: 7 });
      loadData();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`${apiUrl}/api/pantry/${id}`, {
        method: "PUT", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        toast.success(status === "USED" ? "Marked as used! Great job!" : "Item removed.");
        loadData();
      } else {
        toast.error("Failed to update item");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${apiUrl}/api/pantry/${id}`, {
        method: "DELETE", credentials: "include"
      });
      if (res.ok) {
        toast.success("Item deleted");
        loadData();
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  const handleRescue = () => {
    // Collect ingredients expiring in <= 5 days
    const urgentItems = items.filter(i => {
      const days = getDaysRemaining(i.expiryDate);
      return days >= 0 && days <= 5;
    }).map(i => i.name);

    if (urgentItems.length === 0) {
      toast.error("No ingredients expiring soon to rescue!");
      return;
    }
    
    // Redirect to ingredient rescue with pre-populated items
    const query = new URLSearchParams();
    query.set("ingredients", urgentItems.join(","));
    query.set("mode", "leftovers"); // Assume leftover mode
    router.push(`/ai-tools/ingredient-rescue?${query.toString()}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  // --- Render ---
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <Leaf className="w-8 h-8 text-emerald-600" /> Food Waste Manager
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-2xl">
            Use your ingredients before they go to waste. Track freshness, prioritize expiring food, and turn leftovers into recipes.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition"
        >
          <Plus size={18} /> Add Ingredient
        </button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Total Ingredients</p>
            <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{stats.totalIngredients}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-amber-100 dark:border-amber-900/30 shadow-sm">
            <p className="text-sm font-semibold text-amber-600 dark:text-amber-500 flex items-center gap-1.5">
              <Clock size={16} /> Expiring Soon
            </p>
            <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{stats.expiringSoon}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-red-100 dark:border-red-900/30 shadow-sm">
            <p className="text-sm font-semibold text-red-600 dark:text-red-500 flex items-center gap-1.5">
              <AlertTriangle size={16} /> Expired
            </p>
            <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{stats.expired}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 shadow-sm relative overflow-hidden">
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-500 flex items-center gap-1.5 relative z-10">
              <CheckCircle size={16} /> Saved from Waste
            </p>
            <p className="text-3xl font-black text-slate-900 dark:text-white mt-1 relative z-10">{stats.savedFromWaste}</p>
            {stats.wasteReductionPercentage > 0 && (
              <div className="absolute -bottom-2 -right-2 text-[60px] font-black text-emerald-50 dark:text-emerald-900/20 z-0">
                {stats.wasteReductionPercentage}%
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Expiring Soon */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Use These Soon</h2>
            {stats && stats.expiringSoon > 0 && (
              <button
                onClick={handleRescue}
                className="flex items-center gap-1.5 px-4 py-2 bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400 rounded-lg text-sm font-bold transition"
              >
                <RefreshCw size={14} /> AI Rescue Recipes
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700 p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <ShoppingBasket size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Your pantry is empty</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto mb-6">
                Add your ingredients to start tracking freshness and reducing food waste.
              </p>
              <button onClick={() => setShowAddForm(true)} className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl text-sm transition">
                Add First Ingredient
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((item) => {
                const days = getDaysRemaining(item.expiryDate);
                const info = getStatusInfo(days);
                
                return (
                  <div key={item.id} className={`bg-white dark:bg-slate-800 p-4 rounded-2xl border ${info.border} shadow-sm group`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-lg">{item.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.quantity} {item.unit}</p>
                      </div>
                      <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${info.color}`}>
                        {info.label}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                        {days < 0 ? `Expired ${Math.abs(days)} days ago` : `${days} days left`}
                      </div>
                      
                      <div className="flex gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                        <button onClick={() => updateStatus(item.id, "USED")} title="Mark as Used" className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg">
                          <CheckCircle size={16} />
                        </button>
                        <button onClick={() => updateStatus(item.id, "WASTED")} title="Mark as Wasted" className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: AI Rescue Info / Add Form */}
        <div className="space-y-6">
          {showAddForm ? (
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm relative">
              <button onClick={() => setShowAddForm(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Add Ingredient</h3>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Name</label>
                  <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. Spinach" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Quantity</label>
                    <input required type="number" min="0.1" step="0.1" value={form.quantity} onChange={e => setForm({...form, quantity: Number(e.target.value)})} className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Unit</label>
                    <select value={form.unit} onChange={e => setForm({...form, unit: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                      <option value="pcs">Pieces</option>
                      <option value="g">Grams</option>
                      <option value="kg">Kg</option>
                      <option value="ml">ml</option>
                      <option value="l">Liters</option>
                      <option value="bunch">Bunch</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Expires in (Days)</label>
                  <input required type="number" min="1" max="365" value={form.expiryDays} onChange={e => setForm({...form, expiryDays: Number(e.target.value)})} className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <button disabled={submitting} type="submit" className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition flex justify-center items-center">
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : "Save to Pantry"}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-md">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <RefreshCw size={20} /> AI Rescue
              </h3>
              <p className="text-sm text-emerald-50 mb-6 leading-relaxed">
                Don&apos;t let food go to waste! Let AI generate creative recipes using the ingredients that are expiring soon.
              </p>
              <button onClick={handleRescue} className="w-full py-2.5 bg-white text-emerald-700 hover:bg-emerald-50 font-bold rounded-xl text-sm transition shadow-sm">
                Rescue Ingredients
              </button>
            </div>
          )}

          {/* Tips */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-5 border border-slate-100 dark:border-slate-700">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-3">Freshness Tips</h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex gap-2"><span>🌱</span> Store leafy greens with a paper towel to absorb moisture.</li>
              <li className="flex gap-2"><span>🍅</span> Keep tomatoes at room temperature for better flavor.</li>
              <li className="flex gap-2"><span>🧊</span> Freeze expiring veggies for future soups or smoothies.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import {
  User, Flame, Droplets, Leaf, ChefHat, Plus, X, Loader2,
  Save, Target, Heart, Ban, Globe, FlameIcon
} from "lucide-react";
import toast from "react-hot-toast";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const CUISINE_OPTIONS = [
  "Bangladeshi", "Italian", "Mexican", "Indian", "Chinese", "Japanese",
  "Thai", "Mediterranean", "American", "Middle Eastern", "Korean", "French",
];

interface TasteProfile {
  sweetness: number;
  sourness: number;
  saltiness: number;
  umami: number;
  spiciness: number;
  likedIngredients: string[];
  dislikedIngredients: string[];
  preferredCuisines: string[];
}

interface UserGoal {
  dailyKcal: number;
  dailyProtein: number;
}

function SliderField({
  label, icon: Icon, value, onChange, color
}: {
  label: string;
  icon: React.ElementType;
  value: number;
  onChange: (v: number) => void;
  color: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
          <Icon className={`w-4 h-4 ${color}`} /> {label}
        </label>
        <span className={`text-sm font-bold ${color}`}>{value}/10</span>
      </div>
      <div className="relative">
        <input
          type="range" min={1} max={10} step={1} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`w-full h-2 rounded-full appearance-none cursor-pointer`}
          style={{ accentColor: color.includes("emerald") ? "#10b981" : color.includes("amber") ? "#f59e0b" : color.includes("blue") ? "#3b82f6" : color.includes("rose") ? "#f43f5e" : "#8b5cf6" }}
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>Mild</span><span>Intense</span>
        </div>
      </div>
    </div>
  );
}

function TagInput({
  label, icon: Icon, tags, onAdd, onRemove, placeholder, color
}: {
  label: string;
  icon: React.ElementType;
  tags: string[];
  onAdd: (v: string) => void;
  onRemove: (v: string) => void;
  placeholder: string;
  color: string;
}) {
  const [input, setInput] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const val = input.trim();
    if (val && !tags.includes(val)) { onAdd(val); setInput(""); }
  };

  return (
    <div className="space-y-2">
      <label className={`flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300`}>
        <Icon className={`w-4 h-4 ${color}`} /> {label}
      </label>
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text" value={input} onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button type="submit" className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
          <Plus className="w-4 h-4" />
        </button>
      </form>
      <div className="flex flex-wrap gap-2 min-h-[36px]">
        {tags.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {tag}
            <button onClick={() => onRemove(tag)} className="text-slate-400 hover:text-red-500 transition">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function DietaryProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [goal, setGoal] = useState<UserGoal>({ dailyKcal: 2000, dailyProtein: 150 });
  const [profile, setProfile] = useState<TasteProfile>({
    sweetness: 5, sourness: 5, saltiness: 5, umami: 5, spiciness: 5,
    likedIngredients: [], dislikedIngredients: [], preferredCuisines: [],
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [goalRes, profileRes] = await Promise.all([
          fetch(`${apiUrl}/api/users/goal`, { credentials: "include" }),
          fetch(`${apiUrl}/api/users/taste-profile`, { credentials: "include" }),
        ]);
        if (goalRes.ok) setGoal(await goalRes.json());
        if (profileRes.ok) setProfile(await profileRes.json());
      } catch (err) {
        toast.error("Failed to load your profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const [goalRes, profileRes] = await Promise.all([
        fetch(`${apiUrl}/api/users/goal`, {
          method: "PUT", credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dailyKcal: goal.dailyKcal, dailyProtein: goal.dailyProtein }),
        }),
        fetch(`${apiUrl}/api/users/taste-profile`, {
          method: "PUT", credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profile),
        }),
      ]);
      if (!goalRes.ok || !profileRes.ok) throw new Error("Failed to save");
      toast.success("Dietary profile saved! AI tools will use these preferences.");
    } catch (err: any) {
      toast.error(err.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const toggleCuisine = (cuisine: string) => {
    setProfile((p) => ({
      ...p,
      preferredCuisines: p.preferredCuisines.includes(cuisine)
        ? p.preferredCuisines.filter((c) => c !== cuisine)
        : [...p.preferredCuisines, cuisine],
    }));
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <User className="w-7 h-7 text-indigo-600" /> Dietary Profile
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Set your nutrition goals and taste preferences. AI tools use this to personalize recipes and meal plans.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-2xl shadow-md transition"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </div>

      {/* Calorie & Protein Goals */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
        <h2 className="font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-600" /> Daily Nutrition Goals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-1.5">
              <FlameIcon className="w-4 h-4 text-orange-500" /> Daily Calorie Goal (kcal)
            </label>
            <input
              type="number" min={500} max={6000} step={50} value={goal.dailyKcal}
              onChange={(e) => setGoal((g) => ({ ...g, dailyKcal: Number(e.target.value) }))}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-xs text-slate-400 mt-1">Average adult: 1,800–2,500 kcal/day</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-blue-500" /> Daily Protein Goal (g)
            </label>
            <input
              type="number" min={20} max={500} step={5} value={goal.dailyProtein}
              onChange={(e) => setGoal((g) => ({ ...g, dailyProtein: Number(e.target.value) }))}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-xs text-slate-400 mt-1">Recommended: 0.8–2g per kg of body weight</p>
          </div>
        </div>
      </div>

      {/* Taste Preferences */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
        <h2 className="font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
          <ChefHat className="w-5 h-5 text-emerald-600" /> Taste Preferences
          <span className="text-xs font-normal text-slate-400 ml-1">Used to personalize AI recipe generation</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <SliderField label="Spiciness" icon={Flame} value={profile.spiciness}
            onChange={(v) => setProfile((p) => ({ ...p, spiciness: v }))} color="text-rose-500" />
          <SliderField label="Sweetness" icon={Heart} value={profile.sweetness}
            onChange={(v) => setProfile((p) => ({ ...p, sweetness: v }))} color="text-amber-500" />
          <SliderField label="Sourness" icon={Droplets} value={profile.sourness}
            onChange={(v) => setProfile((p) => ({ ...p, sourness: v }))} color="text-yellow-500" />
          <SliderField label="Saltiness" icon={Leaf} value={profile.saltiness}
            onChange={(v) => setProfile((p) => ({ ...p, saltiness: v }))} color="text-blue-500" />
          <SliderField label="Umami Depth" icon={ChefHat} value={profile.umami}
            onChange={(v) => setProfile((p) => ({ ...p, umami: v }))} color="text-purple-500" />
        </div>
      </div>

      {/* Preferred Cuisines */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
        <h2 className="font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
          <Globe className="w-5 h-5 text-teal-600" /> Preferred Cuisines
        </h2>
        <div className="flex flex-wrap gap-2">
          {CUISINE_OPTIONS.map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => toggleCuisine(cuisine)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                profile.preferredCuisines.includes(cuisine)
                  ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-teal-400"
              }`}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>

      {/* Liked / Disliked Ingredients */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
          <h2 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Heart className="w-4 h-4 text-emerald-600" /> Liked Ingredients
          </h2>
          <TagInput
            label="" icon={Heart}
            tags={profile.likedIngredients}
            onAdd={(v) => setProfile((p) => ({ ...p, likedIngredients: [...p.likedIngredients, v] }))}
            onRemove={(v) => setProfile((p) => ({ ...p, likedIngredients: p.likedIngredients.filter((i) => i !== v) }))}
            placeholder="e.g. garlic, mushroom..."
            color="text-emerald-600"
          />
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
          <h2 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Ban className="w-4 h-4 text-rose-500" /> Disliked / Avoid
          </h2>
          <TagInput
            label="" icon={Ban}
            tags={profile.dislikedIngredients}
            onAdd={(v) => setProfile((p) => ({ ...p, dislikedIngredients: [...p.dislikedIngredients, v] }))}
            onRemove={(v) => setProfile((p) => ({ ...p, dislikedIngredients: p.dislikedIngredients.filter((i) => i !== v) }))}
            placeholder="e.g. cilantro, olives..."
            color="text-rose-500"
          />
        </div>
      </div>

      {/* Save button bottom */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-2xl shadow-md transition"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : "Save Dietary Profile"}
        </button>
      </div>
    </div>
  );
}

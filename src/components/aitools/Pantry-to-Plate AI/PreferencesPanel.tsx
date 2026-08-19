"use client";

import { LucideIcon, Globe, Utensils, Clock, Leaf, Users, Dumbbell, Droplet, Tag, Sparkles } from "lucide-react";
import { CUISINE_OPTIONS,
  MEAL_TYPE_OPTIONS,
 COOKING_TIME_OPTIONS,
   DIET_OPTIONS,
   SERVINGS_OPTIONS,
   AI_OPTIONS,AiOptionIcon } from "./constants";
// import {
//   CUISINE_OPTIONS,
//   MEAL_TYPE_OPTIONS,
//   COOKING_TIME_OPTIONS,
//   DIET_OPTIONS,
//   SERVINGS_OPTIONS,
//   AI_OPTIONS,
//   AiOptionIcon,
// } from "./constants";

const ICONS: Record<AiOptionIcon, LucideIcon> = { Leaf, Dumbbell, Droplet, Tag };

interface PreferencesPanelProps {
  cuisine: string;
  setCuisine: (v: string) => void;
  mealType: string;
  setMealType: (v: string) => void;
  cookingTime: string;
  setCookingTime: (v: string) => void;
  diet: string;
  setDiet: (v: string) => void;
  servings: string;
  setServings: (v: string) => void;
  selectedOptions: string[];
  toggleOption: (option: string) => void;
}

export default function PreferencesPanel({
  cuisine,
  setCuisine,
  mealType,
  setMealType,
  cookingTime,
  setCookingTime,
  diet,
  setDiet,
  servings,
  setServings,
  selectedOptions,
  toggleOption,
}: PreferencesPanelProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex items-center gap-3">
        <span className="w-7 h-7 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-sm">
          2
        </span>
        <h2 className="text-lg font-bold">Customize your preferences</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Cuisine" icon={Globe} value={cuisine} onChange={setCuisine} options={CUISINE_OPTIONS} />
        <Field label="Meal Type" icon={Utensils} value={mealType} onChange={setMealType} options={MEAL_TYPE_OPTIONS} />
        <Field label="Cooking Time" icon={Clock} value={cookingTime} onChange={setCookingTime} options={COOKING_TIME_OPTIONS} />
        <Field label="Diet" icon={Leaf} value={diet} onChange={setDiet} options={DIET_OPTIONS} />

        <div className="space-y-1 sm:col-span-2">
          <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> Servings
          </label>
          <select
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm focus:outline-none"
          >
            {SERVINGS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
          <Sparkles className="w-3.5 h-3.5 text-purple-500" />
          <span>Special AI Options</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {AI_OPTIONS.map((opt) => {
            const Icon = ICONS[opt.icon];
            const isSelected = selectedOptions.includes(opt.name);
            return (
              <button
                key={opt.name}
                onClick={() => toggleOption(opt.name)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                  isSelected
                    ? "border-purple-500 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50"
                    : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {opt.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  icon: LucideIcon;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}

function Field({ label, icon: Icon, value, onChange, options }: FieldProps) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5" /> {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
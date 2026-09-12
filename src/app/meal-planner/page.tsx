"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  User, Check, ChevronRight, Settings, Plus, RefreshCw, 
  MapPin, ShoppingBasket, DollarSign, Leaf, ChefHat, 
  CalendarDays, Activity, ChevronDown, ChevronUp, Clock, X, Info, AlertCircle, ArrowLeft, Heart, Flame, LayoutDashboard, Store
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ── Types ──────────────────────────────────────────────────────────────────
type MealProfile = {
  id?: string;
  foodPreference: string;
  favoriteCuisines: string[];
  likedFoods: string[];
  dislikedFoods: string[];
  allergies: string[];
  dietaryRestrictions: string[];
  healthGoal: string;
  dailyMeals: number;
  cookingTime: string;
  mealPreferences: string[];
  dailyCalorieTarget: number | null;
};

// ── Shared UI Components for Onboarding ──────────────────────────────────
const ChipInput = ({ 
  label, placeholder, values, onChange, isWarning = false 
}: { 
  label: string; placeholder: string; values: string[]; onChange: (v: string[]) => void; isWarning?: boolean 
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!values.includes(inputValue.trim())) {
        onChange([...values, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeValue = (val: string) => {
    onChange(values.filter(v => v !== val));
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <label className="block text-sm font-bold text-slate-900 dark:text-white">{label}</label>
        {isWarning && <AlertCircle size={14} className="text-amber-500" />}
      </div>
      {isWarning && (
        <p className="text-xs text-amber-600 dark:text-amber-400 mb-2 font-medium bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg">
          These will be treated as strict exclusions when generating meals.
        </p>
      )}
      <div className={`p-2 rounded-2xl border bg-slate-50 dark:bg-slate-800 transition-colors ${isWarning ? "border-amber-200 focus-within:border-amber-500" : "border-slate-200 focus-within:border-emerald-500"}`}>
        <div className="flex flex-wrap gap-2 mb-2">
          {values.map(v => (
            <span key={v} className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-semibold shadow-sm ${isWarning ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300" : "bg-white text-slate-700 dark:bg-slate-700 dark:text-slate-200"}`}>
              {isWarning && <AlertCircle size={12}/>} {v}
              <button type="button" onClick={() => removeValue(v)} className="hover:text-red-500 ml-1"><X size={14} /></button>
            </span>
          ))}
        </div>
        <input 
          type="text" 
          value={inputValue} 
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={values.length === 0 ? placeholder : "Type and press Enter..."}
          className="w-full px-2 py-1.5 bg-transparent focus:outline-none text-sm"
        />
      </div>
    </div>
  );
};

// ── Profile Onboarding Component ──────────────────────────────────────────
function MealProfileOnboarding({ profile, onSave, userId }: { profile: MealProfile | null, onSave: (p: MealProfile) => void, userId?: string }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<MealProfile>(profile || {
    foodPreference: "Non-Vegetarian",
    favoriteCuisines: [],
    likedFoods: [],
    dislikedFoods: [],
    allergies: [],
    dietaryRestrictions: ["None"],
    healthGoal: "Balanced Diet",
    dailyMeals: 3,
    cookingTime: "Flexible",
    mealPreferences: ["Breakfast", "Lunch", "Dinner"],
    dailyCalorieTarget: null,
  });
  
  const [saving, setSaving] = useState(false);

  const stepsList = [
    { num: 1, title: "Food Preferences" },
    { num: 2, title: "Goals & Lifestyle" },
    { num: 3, title: "Dietary Needs" },
    { num: 4, title: "Meal Routine" },
    { num: 5, title: "Review" }
  ];

  const handleArrayToggle = (field: keyof MealProfile, value: string, mutuallyExclusiveNone: boolean = false) => {
    setFormData(prev => {
      const arr = prev[field] as string[];
      if (mutuallyExclusiveNone) {
        if (value === "None") return { ...prev, [field]: ["None"] };
        const newArr = arr.includes(value) ? arr.filter(v => v !== value) : [...arr.filter(v => v !== "None"), value];
        return { ...prev, [field]: newArr.length ? newArr : ["None"] };
      }
      if (arr.includes(value)) return { ...prev, [field]: arr.filter(v => v !== value) };
      return { ...prev, [field]: [...arr, value] };
    });
  };

  const submit = async () => {
    setSaving(true);
    try {
      const payload = { ...formData };
      if (userId) (payload as any).userId = userId;

      const res = await fetch(`${apiUrl}/api/meal-profile`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || errJson.message || "Failed to save profile");
      }
      const saved = await res.json();
      toast.success("Meal Profile Saved!");
      onSave(saved);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto font-sans">
      <div className="relative w-full h-[220px] rounded-3xl overflow-hidden mb-8 shadow-sm">
        <Image src="/images/meal_profile_hero.jpg" alt="Setup profile" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-emerald-900/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex flex-col justify-end p-8">
          <div className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-100 mb-3 w-fit border border-white/20 shadow-sm">
            FIRST-TIME SETUP
          </div>
          <h1 className="text-3xl font-black text-white mb-2">Create your meal profile</h1>
          <p className="text-emerald-50 text-sm max-w-md">Your answers help FoodCanvas create personalized meal plans that actually fit your lifestyle.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-8 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-xs text-slate-400">Onboarding Progress</h3>
            <div className="space-y-4">
              {stepsList.map(s => (
                <div key={s.num} className={`flex items-center gap-3 transition-colors ${step === s.num ? "text-emerald-600 font-bold" : step > s.num ? "text-slate-800 dark:text-slate-200" : "text-slate-400 font-medium"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === s.num ? "bg-emerald-100 text-emerald-700" : step > s.num ? "bg-slate-100 dark:bg-slate-800" : "bg-transparent border border-slate-200"}`}>
                    {step > s.num ? <Check size={14} className="text-emerald-600" /> : `0${s.num}`}
                  </div>
                  <span className="text-sm">{s.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:hidden w-full px-2 mb-4">
          <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
            <span>Step {step} of 5</span>
            <span className="text-emerald-600">{stepsList[step-1].title}</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${(step / 5) * 100}%` }}></div>
          </div>
        </div>

        <div className="flex-1 bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 border border-slate-200 dark:border-slate-800 shadow-sm mb-24 lg:mb-0">
          
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">How do you like to eat?</h2>
              <p className="text-slate-500 mb-8">Choose the option that best describes your everyday food preference.</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { id: "Non-Vegetarian", icon: "🥩" }, { id: "Vegetarian", icon: "🥗" }, 
                  { id: "Vegan", icon: "🌱" }, { id: "Halal", icon: "🌙" }
                ].map(p => (
                  <button key={p.id} onClick={() => setFormData({...formData, foodPreference: p.id})} className={`p-4 rounded-2xl border-2 text-left transition-all ${formData.foodPreference === p.id ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "border-slate-100 bg-white hover:border-slate-200 dark:bg-slate-800 dark:border-slate-700"}`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-2xl">{p.icon}</span>
                      {formData.foodPreference === p.id && <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"><Check size={12} className="text-white"/></div>}
                    </div>
                    <span className={`font-bold ${formData.foodPreference === p.id ? "text-emerald-900 dark:text-emerald-100" : "text-slate-700 dark:text-slate-300"}`}>{p.id}</span>
                  </button>
                ))}
              </div>

              <ChipInput label="Foods you enjoy" placeholder="e.g. chicken, rice, salmon, vegetables" values={formData.likedFoods} onChange={v => setFormData({...formData, likedFoods: v})} />
              <ChipInput label="Any food allergies?" placeholder="e.g. peanuts, shrimp, milk" values={formData.allergies} onChange={v => setFormData({...formData, allergies: v})} isWarning={true} />
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">What are you working toward?</h2>
              <p className="text-slate-500 mb-8">Select a goal and let us know your lifestyle preferences.</p>

              <label className="block text-sm font-bold text-slate-900 dark:text-white mb-4">Health / Diet Goal</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {[
                  { id: "Maintain Weight", icon: "⚖️", desc: "Keep things steady and balanced." },
                  { id: "Weight Loss", icon: "📉", desc: "Caloric deficit and lean meals." },
                  { id: "Weight Gain", icon: "📈", desc: "Caloric surplus and rich foods." },
                  { id: "Muscle Building", icon: "💪", desc: "Prioritize protein-rich meals." },
                  { id: "Balanced Diet", icon: "🍎", desc: "Overall health and wellness." }
                ].map(g => (
                  <button key={g.id} onClick={() => setFormData({...formData, healthGoal: g.id})} className={`p-4 rounded-2xl border-2 text-left flex gap-4 transition-all ${formData.healthGoal === g.id ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "border-slate-100 bg-white hover:border-slate-200 dark:bg-slate-800 dark:border-slate-700"}`}>
                    <span className="text-2xl">{g.icon}</span>
                    <div>
                      <h4 className={`font-bold text-sm mb-1 ${formData.healthGoal === g.id ? "text-emerald-900 dark:text-emerald-100" : "text-slate-800 dark:text-slate-200"}`}>{g.id}</h4>
                      <p className="text-xs text-slate-500">{g.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <label className="block text-sm font-bold text-slate-900 dark:text-white mb-4">Cooking Time</label>
              <div className="grid grid-cols-3 gap-2 mb-8">
                {[
                  { id: "Quick (< 20 min)", label: "Quick", desc: "Under 20m" },
                  { id: "Moderate (20-40 min)", label: "Moderate", desc: "20-40m" },
                  { id: "Flexible", label: "Flexible", desc: "Any time" }
                ].map(c => (
                  <button key={c.id} onClick={() => setFormData({...formData, cookingTime: c.id})} className={`p-3 rounded-2xl border-2 text-center transition-all ${formData.cookingTime === c.id ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "border-slate-100 bg-white hover:border-slate-200 dark:bg-slate-800 dark:border-slate-700"}`}>
                    <span className={`block font-bold text-sm ${formData.cookingTime === c.id ? "text-emerald-900 dark:text-emerald-100" : "text-slate-800 dark:text-slate-200"}`}>{c.label}</span>
                    <span className="text-[10px] text-slate-500">{c.desc}</span>
                  </button>
                ))}
              </div>

              <ChipInput label="Favorite Cuisines" placeholder="e.g. Bangladeshi, Indian, Italian, Mexican" values={formData.favoriteCuisines} onChange={v => setFormData({...formData, favoriteCuisines: v})} />
              <ChipInput label="Foods You Don't Like" placeholder="e.g. mushrooms, olives, eggplant" values={formData.dislikedFoods} onChange={v => setFormData({...formData, dislikedFoods: v})} />
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Any dietary restrictions?</h2>
              <p className="text-slate-500 mb-8">Select any specific diets you follow. You can choose multiple.</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["None", "Low Carb", "Low Sodium", "Gluten Free", "High Protein", "Low Fat"].map(r => (
                  <button key={r} onClick={() => handleArrayToggle("dietaryRestrictions", r, true)} className={`p-4 rounded-2xl border-2 text-center font-bold text-sm transition-all ${formData.dietaryRestrictions.includes(r) ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300" : "border-slate-100 bg-white text-slate-600 hover:border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"}`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Tell us about your daily routine</h2>
              <p className="text-slate-500 mb-8">We&apos;ll structure your meal plan to fit your schedule.</p>

              <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-1">Daily Meals</label>
                <p className="text-xs text-slate-500 mb-4">How many meals do you usually eat each day?</p>
                <div className="flex items-center gap-6 max-w-[200px]">
                  <button onClick={() => setFormData({...formData, dailyMeals: Math.max(2, formData.dailyMeals - 1)})} className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700">-</button>
                  <span className="text-3xl font-black w-12 text-center text-emerald-600">{formData.dailyMeals}</span>
                  <button onClick={() => setFormData({...formData, dailyMeals: Math.min(6, formData.dailyMeals + 1)})} className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700">+</button>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-1">Daily calorie target</label>
                <p className="text-xs text-slate-500 mb-3">Leave blank and we&apos;ll estimate based on your profile.</p>
                <div className="relative max-w-[200px]">
                  <input type="number" placeholder="e.g. 1800" value={formData.dailyCalorieTarget || ""} onChange={e => setFormData({...formData, dailyCalorieTarget: Number(e.target.value) || null})} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:border-emerald-500 font-bold" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">kcal</span>
                </div>
              </div>

              <label className="block text-sm font-bold text-slate-900 dark:text-white mb-4">Meal Preferences</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "Breakfast", icon: "🍳" }, { id: "Lunch", icon: "🥗" }, 
                  { id: "Dinner", icon: "🍲" }, { id: "Snacks", icon: "🍎" }
                ].map(m => (
                  <button key={m.id} onClick={() => handleArrayToggle("mealPreferences", m.id)} className={`p-4 rounded-2xl border-2 text-left flex items-center gap-3 transition-all ${formData.mealPreferences.includes(m.id) ? "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-100" : "border-slate-100 bg-white text-slate-600 hover:border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"}`}>
                    <span className="text-xl">{m.icon}</span>
                    <span className="font-bold text-sm">{m.id}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Your meal profile is ready</h2>
              <p className="text-slate-500 mb-8">Review your choices before creating your personalized plan.</p>

              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-between items-center group">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Food Preference</span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{formData.foodPreference}</span>
                  </div>
                  <button onClick={() => setStep(1)} className="text-xs font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition">Edit</button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-between items-center group">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Goal</span>
                      <span className="font-bold text-sm text-slate-900 dark:text-white">{formData.healthGoal}</span>
                    </div>
                    <button onClick={() => setStep(2)} className="text-xs font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition">Edit</button>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-between items-center group">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Cooking Time</span>
                      <span className="font-bold text-sm text-slate-900 dark:text-white">{formData.cookingTime.split(' ')[0]}</span>
                    </div>
                    <button onClick={() => setStep(2)} className="text-xs font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition">Edit</button>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-between items-center group">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Restrictions</span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{formData.dietaryRestrictions.join(", ")}</span>
                  </div>
                  <button onClick={() => setStep(3)} className="text-xs font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition">Edit</button>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-2xl border border-amber-100 dark:border-amber-800 flex justify-between items-center group">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 block mb-1 flex items-center gap-1"><AlertCircle size={10}/> Allergies</span>
                    <span className="font-bold text-sm text-amber-900 dark:text-amber-100">{formData.allergies.length ? formData.allergies.join(", ") : "None"}</span>
                  </div>
                  <button onClick={() => setStep(1)} className="text-xs font-bold text-amber-600 opacity-0 group-hover:opacity-100 transition">Edit</button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-between items-center group">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Daily Meals</span>
                      <span className="font-bold text-sm text-slate-900 dark:text-white">{formData.dailyMeals}</span>
                    </div>
                    <button onClick={() => setStep(4)} className="text-xs font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition">Edit</button>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-between items-center group">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Target Calories</span>
                      <span className="font-bold text-sm text-slate-900 dark:text-white">{formData.dailyCalorieTarget ? `${formData.dailyCalorieTarget} kcal` : "Auto"}</span>
                    </div>
                    <button onClick={() => setStep(4)} className="text-xs font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition">Edit</button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-4 lg:relative lg:bg-transparent lg:border-t-0 lg:p-0 lg:mt-6 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center lg:justify-end lg:gap-4">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="px-6 py-3.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 flex items-center gap-2 transition">
              <ArrowLeft size={16} /> Back
            </button>
          )}
          {step === 1 && <div className="lg:hidden"></div>}
          
          {step < 5 ? (
            <button onClick={() => setStep(step + 1)} className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-2 transition shadow-md">
              Continue <ChevronRight size={16} />
            </button>
          ) : (
            <button onClick={submit} disabled={saving} className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-2 transition shadow-lg shadow-emerald-600/20 w-full sm:w-auto justify-center">
              {saving ? <><RefreshCw className="animate-spin" size={16} /> Saving...</> : "Create My Meal Plan →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Data Normalization ───────────────────────────────────────────────────────
const normalizeMeal = (meal: any, type: string) => {
  if (!meal) return null;

  const cleanText = (val: any) => {
    if (typeof val !== 'string') return val;
    const cleaned = val.replace(/svg/gi, '').trim();
    if (!cleaned || cleaned === '--' || cleaned.toLowerCase() === 'n/a' || cleaned.toLowerCase() === 'none' || cleaned.toLowerCase() === 'null') return null;
    return cleaned;
  };

  const cleanNum = (val: any, removeRegex: RegExp) => {
    if (val === undefined || val === null) return null;
    if (typeof val === 'number') return val === 0 ? null : val;
    const str = String(val).replace(/svg/gi, '').replace(removeRegex, '').replace(/--/g, '').trim();
    if (!str || str.toLowerCase() === 'n/a' || str === '0' || str === '00' || str === '0.00' || str.toLowerCase() === 'null') return null;
    const num = Number(str.replace(/[^0-9.]/g, ''));
    if (num === 0) return null;
    return str; // Return cleaned string (e.g., "12", "12g")
  };

  let prep = meal.prepTime ?? meal.prep_time ?? meal.preparationTime ?? meal.nutrition?.prepTime ?? null;
  prep = cleanText(prep);
  if (prep === '0' || prep === '00' || prep === '0 mins' || prep === '0 minutes') prep = null;
  if (prep && typeof prep === 'string' && !prep.toLowerCase().includes('min')) prep = `${prep} mins`;

  let ings = meal.ingredients || [];
  if (typeof ings === 'string') ings = [ings];
  if (!Array.isArray(ings)) ings = [];
  ings = ings.map(cleanText).filter((i: string | null) => i && i.toLowerCase() !== "ingredients will be available in the recipe details." && i.toLowerCase() !== "ingredients");

  // Fix estimatedCost (e.g. INR0, BDT0)
  let cost = meal.estimatedCost ?? meal.cost ?? meal.price ?? null;
  cost = cleanNum(cost, /[A-Za-z৳$£₹€]/g); // strip currency symbols to check if it's 0

  return {
    _type: type,
    name: cleanText(meal.name ?? meal.title ?? meal.mealName ?? "Untitled Meal"),
    description: cleanText(meal.description ?? meal.summary ?? ""),
    calories: cleanNum(meal.calories ?? meal.kcal ?? meal.nutrition?.calories, /kcal/i),
    protein: cleanNum(meal.protein ?? meal.nutrition?.protein, /g/i),
    carbs: cleanNum(meal.carbs ?? meal.nutrition?.carbs, /g/i),
    fat: cleanNum(meal.fat ?? meal.nutrition?.fat, /g/i),
    prepTime: prep,
    ingredients: ings,
    image: meal.image ?? meal.imageUrl ?? null,
    estimatedCost: cost
  };
};

// ── Fallback Visual Logic ──
const getMealVisual = (type: string) => {
  const t = type.toLowerCase();
  if (t.includes("breakfast")) return { bg: "from-amber-100 to-orange-50 dark:from-amber-900/40 dark:to-orange-900/20", icon: "🥣" };
  if (t.includes("lunch")) return { bg: "from-emerald-100 to-teal-50 dark:from-emerald-900/40 dark:to-teal-900/20", icon: "🥗" };
  if (t.includes("dinner")) return { bg: "from-indigo-100 to-blue-50 dark:from-indigo-900/40 dark:to-blue-900/20", icon: "🍲" };
  if (t.includes("snack")) return { bg: "from-rose-100 to-pink-50 dark:from-rose-900/40 dark:to-pink-900/20", icon: "🍎" };
  return { bg: "from-slate-100 to-gray-50 dark:from-slate-800 dark:to-slate-900", icon: "🍽️" };
};

// ── Nearby Stores Component (Redesigned) ─────────────────────────────────────
const NearbyStores = ({ ingredients = [], aiStores = [] }: { ingredients?: string[], aiStores?: any[] }) => {
  const [status, setStatus] = useState<"initial" | "loading" | "error" | "success" | "provider_missing">("initial");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [locationStr, setLocationStr] = useState<string>("");
  const [searchMethod, setSearchMethod] = useState<"manual" | "geo" | null>(null);

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim() && !zip.trim()) {
      toast.error("Please enter a city or postal code.");
      return;
    }
    
    setSearchMethod("manual");
    setStatus("loading");
    
    // Simulate API request to missing provider
    setTimeout(() => {
      toast.error("Live store results require a configured Places API provider.");
      setStatus("provider_missing");
      setLocationStr(`${city} ${zip}`);
    }, 800);
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      toast.error("Location access is not supported by your browser.");
      return;
    }
    
    setSearchMethod("geo");
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setStatus("success");
        setLocationStr(`${pos.coords.latitude},${pos.coords.longitude}`);
      },
      (err) => {
        setStatus("initial");
        toast.error("Location access was denied. You can search by city and postal/ZIP code instead.");
      },
      { timeout: 10000 }
    );
  };

  const renderStoreCards = () => {
    if (!aiStores || aiStores.length === 0) return null;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {aiStores.map((store: any, idx: number) => (
          <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 flex flex-col h-full">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-2">
              <Store size={14} className="text-emerald-600"/> {store.name}
            </h4>
            {store.location && <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><MapPin size={12}/> {store.location}</p>}
            {store.distance && <p className="text-xs text-slate-400 font-medium mb-3">📏 {store.distance}</p>}
            
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.name + " " + (store.location || ""))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-bold text-emerald-600 hover:text-emerald-700 transition group"
            >
              <span>View on Map</span>
              <ChevronRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        ))}
      </div>
    );
  };

  const getMapSearchUrl = () => {
    const queryStr = ingredients.length > 0 
      ? `grocery stores for ${ingredients.slice(0, 3).join(", ")}` 
      : "grocery stores";
    
    if (searchMethod === "manual") {
      return `https://www.google.com/maps/search/${encodeURIComponent(queryStr + " in " + locationStr)}`;
    }
    return `https://www.google.com/maps/search/${encodeURIComponent(queryStr)}/@${locationStr},15z`;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm mt-8">
      <div className="mb-8">
        <h3 className="font-black text-xl mb-2 flex items-center gap-2 text-slate-900 dark:text-white"><Store size={22} className="text-emerald-600"/> Where to Buy</h3>
        <p className="text-sm text-slate-500">Find grocery stores near you where you can buy the ingredients for this meal plan.</p>
      </div>
      
      {/* Search Form */}
      <div className="mb-10 p-5 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800">
        <form onSubmit={handleManualSearch} className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">City</label>
            <input 
              type="text" 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city" 
              className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Postal / ZIP Code</label>
            <input 
              type="text" 
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="Enter postal or ZIP code" 
              className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>
          <div className="md:w-auto flex items-end">
            <button type="submit" className="w-full md:w-auto px-6 py-3 bg-slate-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition shadow-sm whitespace-nowrap">
              Find Nearby Stores
            </button>
          </div>
        </form>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">or</span>
          <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
        </div>

        <button 
          type="button"
          onClick={handleGeolocation} 
          className="w-full px-4 py-3 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-sm transition flex justify-center items-center gap-2 shadow-sm"
        >
          <MapPin size={16} className="text-emerald-600"/> Use My Location
        </button>
      </div>

      {/* Loading State */}
      {status === "loading" && (
        <div className="flex flex-col items-center text-center p-8 bg-slate-50 dark:bg-slate-800/50 rounded-2xl mb-8">
          <RefreshCw className="animate-spin text-emerald-500 mb-3" size={24} />
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Finding nearby grocery stores...</p>
        </div>
      )}

      {/* Missing Provider Error State */}
      {status === "provider_missing" && (
        <div className="flex flex-col items-center text-center p-8 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-2xl mb-8">
          <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-3">
            <Store size={24} className="text-amber-600" />
          </div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-slate-200 mb-2">Nearby store search is currently unavailable.</h4>
          <p className="text-xs text-slate-500 mb-6 max-w-md">A location provider API (like Google Places) is required to display live store cards here. However, you can still view results directly on the map.</p>
          
          <a 
            href={getMapSearchUrl()}
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-sm transition flex justify-center items-center gap-2"
          >
            <MapPin size={16}/> View on Map Fallback
          </a>
        </div>
      )}

      {/* Geolocation Success Fallback */}
      {status === "success" && searchMethod === "geo" && (
        <div className="flex flex-col items-center text-center p-8 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-900/30 rounded-2xl mb-8">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-3">
            <MapPin size={24} className="text-emerald-600" />
          </div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-slate-200 mb-2">Location acquired successfully!</h4>
          <p className="text-xs text-slate-500 mb-6">Open the map to see stores near you.</p>
          
          <a 
            href={getMapSearchUrl()}
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition flex justify-center items-center gap-2"
          >
            <MapPin size={16}/> View on Map
          </a>
        </div>
      )}

      {/* AI Store Cards (If available from plan generation) */}
      {status === "initial" && aiStores && aiStores.length > 0 && (
        <div className="mb-8">
          <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-2">AI Suggested Stores</h4>
          {renderStoreCards()}
        </div>
      )}

      {/* Online Shopping Section */}
      <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
        <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Shop Online</h4>
        <p className="text-sm text-slate-500 mb-4">Prefer online shopping? Find these ingredients from online grocery platforms.</p>
        
        <a 
          href={`https://www.instacart.com/store/s?k=${encodeURIComponent(ingredients.slice(0, 5).join(" "))}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white rounded-xl font-bold text-sm transition-all shadow-sm hover:shadow-md"
        >
          <ShoppingBasket size={16}/> Shop Ingredients Online
        </a>
      </div>
    </div>
  );
};

// ── Main Page Component ────────────────────────────────────────────────────
export default function MealPlannerPage() {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  const [tab, setTab] = useState<"standard" | "budget">("standard");
  const [profile, setProfile] = useState<MealProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [editProfile, setEditProfile] = useState(false);

  // Generation States
  const [plan, setPlan] = useState<any>(null);
  const [generating, setGenerating] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number>(7);
  const [peopleCount, setPeopleCount] = useState<number>(2);
  
  // Navigation
  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);
  const [modalMeal, setModalMeal] = useState<any>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Budget States
  const [country, setCountry] = useState("United States");
  const [city, setCity] = useState("New York");
  const [budget, setBudget] = useState(150);

  const currencies: Record<string, string> = {
    "Bangladesh": "৳", "United States": "$", "United Kingdom": "£", "India": "₹", "Canada": "$", "Australia": "$"
  };
  const currency = currencies[country] || "$";

  useEffect(() => {
    const url = userId ? `${apiUrl}/api/meal-profile?userId=${userId}` : `${apiUrl}/api/meal-profile`;
    fetch(url, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if (data && data.foodPreference) setProfile(data);
        setLoadingProfile(false);
      })
      .catch(() => setLoadingProfile(false));
  }, [userId]);

  const generatePlan = async () => {
    if (generating) return;
    setGenerating(true);
    setPlan(null);
    setApiError(null);
    try {
      const endpoint = tab === "standard" ? "/api/meal-planner/generate" : "/api/meal-planner/generate-budget";
      const payload: any = tab === "standard" 
        ? { days: selectedDays, peopleCount }
        : { country, city, currency, budget, days: selectedDays, peopleCount };

      if (userId) payload.userId = userId;

      const res = await fetch(`${apiUrl}${endpoint}`, {
        method: "POST", credentials: "include", headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to generate plan");
      }
      
      const data = await res.json();
      
      // -- Ensure mathematical accuracy of AI-generated totals --
      const cleanNum = (val: any) => {
        if (val === undefined || val === null) return 0;
        if (typeof val === 'number') return val;
        const str = String(val).replace(/[^0-9.]/g, '');
        return Number(str) || 0;
      };

      let totalCost = 0;
      let totalCalories = 0;
      let totalProtein = 0;
      let validDaysCount = data.days?.length || 0;

      if (data.days && Array.isArray(data.days)) {
        data.days.forEach((day: any) => {
          let dayCost = 0, dayCals = 0, dayPro = 0, dayCarbs = 0, dayFat = 0;
          if (day.meals) {
            Object.values(day.meals).forEach((meal: any) => {
              if (!meal) return;
              const cost = cleanNum(meal.estimatedCost ?? meal.cost ?? meal.price);
              const cals = cleanNum(meal.calories ?? meal.kcal ?? meal.nutrition?.calories);
              const pro = cleanNum(meal.protein ?? meal.nutrition?.protein);
              const carbs = cleanNum(meal.carbs ?? meal.nutrition?.carbs);
              const fat = cleanNum(meal.fat ?? meal.nutrition?.fat);

              dayCost += cost;
              dayCals += cals;
              dayPro += pro;
              dayCarbs += carbs;
              dayFat += fat;
              
              meal.estimatedCost = cost || undefined;
              meal.calories = cals || undefined;
              meal.protein = pro || undefined;
              meal.carbs = carbs || undefined;
              meal.fat = fat || undefined;
            });
          }
          
          if (!day.dailyTotals) day.dailyTotals = {};
          day.dailyTotals.calories = dayCals;
          day.dailyTotals.protein = dayPro;
          day.dailyTotals.carbs = dayCarbs;
          day.dailyTotals.fat = dayFat;
          day.dailyTotals.estimatedCost = dayCost;
          
          totalCost += dayCost;
          totalCalories += dayCals;
          totalProtein += dayPro;
        });
      }

      if (tab === "budget") {
        data.totalEstimatedCost = Number(totalCost.toFixed(2));
        if (!data.summary) data.summary = {};
        data.summary.averageDailyCost = validDaysCount ? Number((totalCost / validDaysCount).toFixed(2)) : 0;
      }
      
      if (!data.summary) data.summary = {};
      data.summary.averageDailyCalories = validDaysCount ? Math.round(totalCalories / validDaysCount) : 0;
      data.summary.averageProtein = validDaysCount ? Math.round(totalProtein / validDaysCount) : 0;
      // Attach peopleCount to plan to display it correctly
      data.peopleCount = peopleCount;
      // ---------------------------------------------------------

      setPlan(data);
      setActiveDayIndex(0);
      toast.success(`${selectedDays}-Day ${tab === "budget" ? "Budget " : ""}Meal plan generated!`);
    } catch (err: any) {
      setApiError(err.message || "Something went wrong while generating your plan. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  if (loadingProfile) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950"><RefreshCw className="animate-spin text-emerald-600 w-8 h-8" /></div>;
  }

  if (!profile || editProfile) {
    return (
      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pt-8 px-4 pb-24">
        <Toaster />
        <MealProfileOnboarding profile={profile} onSave={(p) => { setProfile(p); setEditProfile(false); }} userId={userId} />
      </div>
    );
  }

  const activeDayData = plan?.days?.[activeDayIndex];
  
  // Calculate total meals across the generated days safely
  const totalMealsCount = plan?.days?.reduce((acc: number, day: any) => {
    let count = 0;
    if (day.meals) {
      Object.values(day.meals).forEach((mealData: any) => {
        if (Array.isArray(mealData)) count += mealData.length;
        else if (mealData?.options && Array.isArray(mealData.options)) count += mealData.options.length;
        else count += 1;
      });
    }
    return acc + count;
  }, 0) || 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 font-sans text-slate-800 dark:text-slate-200">
      <Toaster />

      {/* ── Modal Overlay for Meal Details ── */}
      {modalMeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all" onClick={() => setModalMeal(null)}>
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            {modalMeal.image ? (
               <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-800">
                 <Image src={modalMeal.image} alt={modalMeal.name || "Meal"} fill className="object-cover" />
                 <button onClick={() => setModalMeal(null)} className="absolute top-4 right-4 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition backdrop-blur-md"><X size={20} /></button>
               </div>
            ) : (
               <div className={`relative h-40 w-full bg-gradient-to-br ${getMealVisual(modalMeal._type || "").bg} flex items-center justify-center`}>
                 <span className="text-6xl drop-shadow-md">{getMealVisual(modalMeal._type || "").icon}</span>
                 <button onClick={() => setModalMeal(null)} className="absolute top-4 right-4 bg-black/10 text-slate-800 dark:text-white p-2 rounded-full hover:bg-black/20 transition backdrop-blur-md"><X size={20} /></button>
               </div>
            )}
            
            <div className="p-8 max-h-[60vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{modalMeal.name || "Delicious Meal"}</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">{modalMeal.description || "A healthy and balanced meal."}</p>
              
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                {modalMeal.calories ? (
                  <div className="flex-1 text-center bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl">
                    <span className="block text-lg font-bold text-emerald-600">{modalMeal.calories}</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">kcal</span>
                  </div>
                ) : (
                  <div className="flex-1 text-center bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl">
                    <span className="block text-xs font-medium text-slate-500">Calories unavailable</span>
                  </div>
                )}
                {modalMeal.protein && (
                  <div className="flex-1 text-center bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl">
                    <span className="block text-lg font-bold text-slate-900 dark:text-white">{modalMeal.protein}g</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Protein</span>
                  </div>
                )}
                {modalMeal.prepTime && (
                  <div className="flex-1 text-center bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl">
                    <span className="block text-lg font-bold text-slate-900 dark:text-white flex items-center justify-center gap-1"><Clock size={14}/> {modalMeal.prepTime}</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Prep</span>
                  </div>
                )}
              </div>

              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3 uppercase tracking-wider flex items-center gap-2"><LayoutDashboard size={16}/> Ingredients</h4>
              {modalMeal.ingredients && modalMeal.ingredients.length > 0 ? (
                <ul className="space-y-2 mb-6">
                  {modalMeal.ingredients.map((ing: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {ing}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500 italic mb-6">Ingredients will be available in the recipe details.</p>
              )}
              
              {tab === "budget" && modalMeal.estimatedCost !== undefined && (
                <div className="mt-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 p-4 rounded-2xl flex justify-between items-center">
                  <span className="font-bold text-amber-700 dark:text-amber-400 text-sm">Estimated Cost</span>
                  <span className="font-black text-amber-700 dark:text-amber-400 text-xl">{plan?.budget?.currency}{modalMeal.estimatedCost}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Hero Header ── */}
      <div className="relative w-full h-[300px] bg-slate-900 overflow-hidden">
        <Image src="/images/meal_planner_hero.jpg" alt="Healthy meal prep" fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent"></div>
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12">
          <p className="text-emerald-400 font-bold text-xs tracking-widest uppercase mb-3 flex items-center gap-2">
            <ChefHat size={16} /> AI MEAL PLANNER
          </p>
          <h1 className="text-4xl font-black text-white mb-2 leading-tight">
            {tab === "standard" ? "Plan your week. Eat better." : "Eat well. Spend smarter."}
          </h1>
          <p className="text-slate-300 max-w-md text-sm">
            {tab === "standard" ? "Personalized meals built around your goals, preferences and dietary needs." : "Build affordable meal plans using your local foods, currency and estimated grocery costs."}
          </p>
        </div>
      </div>

      {/* ── Content Container ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        
        {/* ── Tabs (Segmented Control) ── */}
        <div className="flex w-fit bg-slate-100/80 dark:bg-slate-800/80 p-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm mb-10">
          <button onClick={() => {setTab("standard"); setPlan(null); setApiError(null);}} className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${tab === "standard" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}>
            Meal Planner
          </button>
          <button onClick={() => {setTab("budget"); setPlan(null); setApiError(null);}} className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${tab === "budget" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}>
            Budget Planner
          </button>
        </div>

        {/* ── Plan Configuration ── */}
        {!plan && !generating && (
          <div className="max-w-3xl">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm mb-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Plan Duration</h2>
                  <div className="grid grid-cols-3 gap-3">
                    {[3, 7, 14].map(d => (
                      <button key={d} onClick={() => setSelectedDays(d)} className={`py-4 rounded-2xl text-center transition border-2 ${selectedDays === d ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" : "border-slate-100 bg-white text-slate-600 hover:border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"}`}>
                        <span className="block text-xl font-black">{d}</span>
                        <span className="text-[10px] uppercase tracking-wider font-bold">Days</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Number of People</h2>
                  <div className="flex items-center justify-between border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-4 bg-slate-50 dark:bg-slate-800 h-[76px]">
                    <button 
                      onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}
                      className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:border-emerald-200 transition"
                    >
                      <span className="text-xl font-black leading-none pb-0.5">-</span>
                    </button>
                    <div className="text-center">
                      <span className="block text-2xl font-black text-slate-900 dark:text-white leading-none mb-1">{peopleCount}</span>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">People</span>
                    </div>
                    <button 
                      onClick={() => setPeopleCount(Math.min(20, peopleCount + 1))}
                      className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:border-emerald-200 transition"
                    >
                      <span className="text-xl font-black leading-none pb-0.5">+</span>
                    </button>
                  </div>
                </div>
              </div>

              {tab === "budget" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Country</label>
                    <select value={country} onChange={e => setCountry(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium">
                      {Object.keys(currencies).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">City</label>
                    <input type="text" value={city} onChange={e => setCity(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Budget ({currency})</label>
                    <input type="number" value={budget} onChange={e => setBudget(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium" />
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                <button onClick={() => setEditProfile(true)} className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition">
                  <User size={14}/> Edit Profile
                </button>
                <button onClick={generatePlan} className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-black text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-xl font-bold transition shadow-md">
                  Generate My Plan
                </button>
              </div>
            </div>

            {apiError && (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-6 flex flex-col items-start gap-3">
                <div>
                  <h4 className="font-bold text-sm mb-1">We couldn&apos;t create your meal plan right now.</h4>
                  <p className="text-xs opacity-90">Please try again.</p>
                </div>
                <button onClick={generatePlan} className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-900 rounded-lg text-sm font-bold transition">Try Again</button>
              </div>
            )}

            {!apiError && (
              <div className="mt-12 text-center flex flex-col items-center opacity-60">
                <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <Leaf size={28} className="text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">Your personalized meal plan is ready to be created.</h3>
              </div>
            )}
          </div>
        )}

        {/* ── Loading State ── */}
        {generating && (
          <div className="max-w-3xl py-12 flex flex-col items-center text-center animate-in fade-in">
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 border-4 border-slate-100 dark:border-slate-800 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-3xl">🍲</div>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Creating your personalized meal plan...</h2>
            <div className="flex flex-col gap-2 text-sm text-slate-500 font-medium">
              <p className="animate-pulse">Analyzing your preferences...</p>
              <p className="animate-pulse delay-100">Planning balanced meals...</p>
              <p className="animate-pulse delay-200">Calculating nutrition...</p>
            </div>
          </div>
        )}

        {/* ── Generated Plan ── */}
        {plan && !generating && plan.days && plan.days.length > 0 && (
          <div className="animate-in fade-in duration-700">
            
            {/* Profile Context Indicator */}
            <div className="mb-10 flex flex-wrap items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-full w-fit shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><User size={12}/> Personalized for you</span>
              <span className="text-slate-300 dark:text-slate-700 hidden sm:inline mx-1">•</span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{profile.foodPreference}</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{profile.healthGoal}</span>
              {profile.dailyCalorieTarget && (
                <>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">~{profile.dailyCalorieTarget} kcal/day</span>
                </>
              )}
              <button onClick={() => setEditProfile(true)} className="ml-2 text-xs text-emerald-600 hover:text-emerald-700 font-bold transition flex items-center gap-1">Edit</button>
            </div>

            {/* Weekly Summary */}
            <div className="mb-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
                    Your {plan.days?.length}-Day Plan
                  </h2>
                  <div className="flex items-center gap-2">
                    <p className="text-slate-500 text-sm">Generated specifically for your profile goals.</p>
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full mx-1"></span>
                    <span className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
                      <User size={12}/> For {plan.peopleCount || 2} People
                    </span>
                  </div>
                </div>
                <button onClick={() => setPlan(null)} className="px-6 py-2.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-sm">
                  Regenerate
                </button>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex-1 min-w-[140px] shadow-sm flex flex-col justify-center">
                  <p className="text-3xl font-black text-slate-900 dark:text-white mb-1">{plan.days.length}</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Days</p>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex-1 min-w-[140px] shadow-sm flex flex-col justify-center">
                  <p className="text-3xl font-black text-slate-900 dark:text-white mb-1">{totalMealsCount}</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Meals</p>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex-1 min-w-[140px] shadow-sm flex flex-col justify-center">
                  <p className="text-3xl font-black text-slate-900 dark:text-white mb-1">~{plan.summary?.averageDailyCalories || "--"}</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">kcal/day</p>
                </div>
                {tab === "budget" && plan.totalEstimatedCost !== undefined && (
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl p-5 flex-1 min-w-[160px] shadow-sm flex flex-col justify-center">
                    <p className="text-3xl font-black text-emerald-700 dark:text-emerald-400 mb-1">{plan.budget?.currency}{plan.totalEstimatedCost}</p>
                    <p className="text-xs font-bold text-emerald-700/60 uppercase tracking-wider">Total Est. Cost</p>
                  </div>
                )}
              </div>
            </div>

            {/* Horizontal Day Navigation */}
            <div className="flex gap-3 overflow-x-auto pb-6 mb-8 custom-scrollbar hide-scrollbar-on-mobile snap-x">
              {plan.days.map((day: any, index: number) => {
                const isActive = activeDayIndex === index;
                let formattedDate = day.date || `Day ${day.day}`;
                try {
                  if (day.date && day.date.includes('-')) {
                    const d = new Date(day.date);
                    formattedDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
                  }
                } catch(e) {}
                
                return (
                  <button 
                    key={index} 
                    onClick={() => setActiveDayIndex(index)}
                    className={`snap-start shrink-0 px-6 py-4 rounded-[20px] border transition-all duration-200 min-w-[120px] text-center flex flex-col items-center justify-center gap-1.5 ${isActive ? "bg-emerald-600 border-emerald-600 text-white shadow-md transform scale-[1.02]" : "bg-white border-slate-200 text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400"}`}
                  >
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? "text-emerald-200" : "text-slate-400"}`}>DAY {day.day}</span>
                    <span className="font-extrabold text-lg leading-none">{formattedDate}</span>
                  </button>
                );
              })}
            </div>

            {activeDayData && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* Main Content: Meals Grid */}
                <div className="lg:col-span-3">
                  <div className="mb-8">
                    {(() => {
                      let activeDateDisplay = activeDayData.date || `Day ${activeDayData.day}`;
                      try {
                        if (activeDayData.date && activeDayData.date.includes('-')) {
                          const d = new Date(activeDayData.date);
                          activeDateDisplay = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
                        }
                      } catch(e) {}
                      return <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Meals for {activeDateDisplay}</h3>;
                    })()}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12 w-full items-stretch">
                    {(() => {
                      const mealTypes = ["breakfast", "morningSnack", "lunch", "eveningSnack", "dinner"];
                      const allMeals: any[] = [];
                      
                      mealTypes.forEach(mealType => {
                        let rawData = activeDayData.meals?.[mealType];
                        if (!rawData) return;
                        
                        const processMeal = (rawMeal: any, index: number, isArray: boolean) => {
                          const meal = normalizeMeal(rawMeal, mealType) as any;
                          if (!meal || !meal.name || meal.name === "Untitled Meal") return;
                          meal._uniqueKey = `${mealType}-${index}`;
                          meal._displayOption = isArray ? ` Option ${index + 1}` : "";
                          meal._typeStr = mealType.replace(/([A-Z])/g, ' $1').trim().toUpperCase();
                          allMeals.push(meal);
                        };

                        if (Array.isArray(rawData)) {
                          rawData.forEach((item, idx) => processMeal(item, idx, true));
                        } else if (rawData.options && Array.isArray(rawData.options)) {
                          rawData.options.forEach((item: any, idx: number) => processMeal(item, idx, true));
                        } else {
                          processMeal(rawData, 0, false);
                        }
                      });

                      if (allMeals.length === 0) return <p className="text-slate-500 italic col-span-full">No meals planned for this day.</p>;

                      return allMeals.map(meal => {
                        const visual = getMealVisual(meal._type);
                        const isSnack = meal._type.toLowerCase().includes('snack');
                        
                        return (
                          <div 
                            key={meal._uniqueKey} 
                            onClick={() => setModalMeal(meal)}
                            role="button"
                            tabIndex={0}
                            className={`group text-left bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-300 flex flex-col h-full cursor-pointer relative ${isSnack ? "border-dashed" : ""}`}
                          >
                            {/* Meal Card Header / Visual */}
                            {meal.image ? (
                              <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden shrink-0">
                                <Image src={meal.image} alt={meal.name} fill className="object-cover group-hover:scale-105 transition duration-700 ease-out" />
                                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-black text-white uppercase tracking-wider z-10">
                                  {meal._typeStr}
                                </div>
                              </div>
                            ) : (
                              <div className={`relative w-full aspect-[4/3] bg-gradient-to-br ${visual.bg} flex items-center justify-center overflow-hidden shrink-0`}>
                                <div className="absolute top-4 left-4 bg-white/60 dark:bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-wider z-10 shadow-sm border border-black/5 dark:border-white/10">
                                  {meal._typeStr}
                                </div>
                                <span className="text-6xl opacity-90 group-hover:scale-110 transition duration-500 ease-out">{visual.icon}</span>
                              </div>
                            )}
                            
                            {tab === "budget" && meal.estimatedCost !== undefined && meal.estimatedCost !== null && (
                              <div className="absolute top-4 right-4 bg-amber-500/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-black text-white shadow-md z-10">
                                {plan.budget?.currency}{meal.estimatedCost}
                              </div>
                            )}

                            {/* Card Body */}
                            <div className="p-5 flex-1 flex flex-col relative z-10 bg-white dark:bg-slate-900">
                              {meal._displayOption && <span className="text-[10px] font-bold text-emerald-600 mb-1.5 block uppercase">{meal._displayOption}</span>}
                              <h4 className="font-extrabold text-slate-900 dark:text-white text-lg leading-tight mb-2 break-words group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">{meal.name}</h4>
                              {meal.description && <p className="text-xs text-slate-500 line-clamp-2 mb-5 leading-relaxed break-words">{meal.description}</p>}
                              
                              <div className="flex flex-wrap gap-2 mt-auto mb-4 text-[11px] font-bold tracking-wide">
                                {meal.calories && <span className="bg-slate-50 border border-slate-100 dark:bg-slate-800 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-lg shrink-0">{meal.calories} kcal</span>}
                                {meal.protein && <span className="bg-emerald-50/50 border border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800/30 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded-lg shrink-0">{meal.protein}g P</span>}
                                {meal.prepTime && <span className="bg-blue-50/50 border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-lg flex items-center gap-1 shrink-0"><Clock size={12}/> {meal.prepTime}</span>}
                              </div>
                              
                              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between group-hover:border-emerald-100 dark:group-hover:border-emerald-900/30 transition-colors">
                                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-500">View Details</span>
                                <ChevronRight size={16} className="text-emerald-600 dark:text-emerald-500 transform group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                  
                  {tab === "budget" && plan.budget && (
                    <NearbyStores 
                      ingredients={plan.shoppingList?.map((i: any) => i.name) || []} 
                      aiStores={plan.nearbyStores || []}
                    />
                  )}
                </div>

                {/* Sidebar Context */}
                <div className="space-y-6">
                  
                  {/* Compact Daily Nutrition Summary */}
                  {activeDayData.dailyTotals && (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                      <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2"><Activity size={16}/> Daily Nutrition</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1 font-bold"><span className="text-slate-600 dark:text-slate-400">Calories</span> <span className="text-slate-900 dark:text-white">{activeDayData.dailyTotals.calories || 0} kcal</span></div>
                          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5"><div className="bg-slate-800 dark:bg-slate-200 h-1.5 rounded-full" style={{width: '75%'}}></div></div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1 font-bold"><span className="text-slate-600 dark:text-slate-400">Protein</span> <span className="text-slate-900 dark:text-white">{activeDayData.dailyTotals.protein || 0}g</span></div>
                          <div className="w-full bg-emerald-100 dark:bg-emerald-900/50 rounded-full h-1.5"><div className="bg-emerald-500 h-1.5 rounded-full" style={{width: '60%'}}></div></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="flex justify-between text-[10px] uppercase font-bold text-slate-400 mb-1"><span>Carbs</span> <span>{activeDayData.dailyTotals.carbs || 0}g</span></div>
                            <div className="w-full bg-blue-100 dark:bg-blue-900/50 rounded-full h-1"><div className="bg-blue-500 h-1 rounded-full" style={{width: '50%'}}></div></div>
                          </div>
                          <div>
                            <div className="flex justify-between text-[10px] uppercase font-bold text-slate-400 mb-1"><span>Fat</span> <span>{activeDayData.dailyTotals.fat || 0}g</span></div>
                            <div className="w-full bg-amber-100 dark:bg-amber-900/50 rounded-full h-1"><div className="bg-amber-500 h-1 rounded-full" style={{width: '40%'}}></div></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {tab === "budget" && plan.budget && (
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                      <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><ShoppingBasket size={18}/> Shopping List</h3>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                          <span className="text-sm font-medium text-slate-500">Daily Average</span>
                          <span className="text-lg font-black text-amber-600">{plan.budget.currency}{plan.summary.averageDailyCost}</span>
                        </div>
                      </div>

                      <div className="">
                        <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider mb-3">Key Ingredients</h4>
                        <div className="space-y-2">
                          {plan.shoppingList?.slice(0, 6).map((item: any, i: number) => (
                            <div key={i} className="flex justify-between text-sm">
                              <span className="font-medium text-slate-700 dark:text-slate-300">{item.name}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-slate-400">{item.quantity}</span>
                                {item.estimatedCost && (
                                  <span className="text-amber-600 font-bold text-xs">{plan.budget?.currency}{item.estimatedCost}</span>
                                )}
                              </div>
                            </div>
                          ))}
                          {plan.shoppingList?.length > 6 && (
                            <p className="text-xs text-emerald-600 font-bold mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">+ {plan.shoppingList.length - 6} more items</p>
                          )}
                        </div>
                        
                        <div className="mt-6 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex items-start gap-2 text-slate-500">
                          <Info size={14} className="mt-0.5 shrink-0" />
                          <p className="text-[10px] leading-snug font-medium">* Prices are AI estimates for reference.</p>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

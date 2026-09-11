"use client";

import React, { useState } from "react";
import { Calendar, Loader2, RefreshCw, Save, ChefHat, Clock, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function MealPlannerPage() {
  const [days, setDays] = useState(3);
  const [mealsPerDay, setMealsPerDay] = useState(3);
  const [cuisines, setCuisines] = useState("");
  const [cookingTime, setCookingTime] = useState(30);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mealPlan, setMealPlan] = useState<any>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setMealPlan(null);
    
    // Simulate generation
    setTimeout(() => {
      const mockPlan = Array.from({ length: days }).map((_, d) => ({
        day: d + 1,
        meals: Array.from({ length: mealsPerDay }).map((_, m) => ({
          type: m === 0 ? "Breakfast" : m === 1 ? "Lunch" : "Dinner",
          name: ["Avocado Toast", "Chicken Salad", "Steak & Potatoes", "Pancakes", "Tofu Stir Fry"][Math.floor(Math.random() * 5)],
          time: Math.floor(Math.random() * 30) + 15,
          cals: Math.floor(Math.random() * 400) + 300,
          img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&auto=format&fit=crop&q=60"
        }))
      }));
      setMealPlan(mockPlan);
      setIsGenerating(false);
      toast.success("Meal plan generated successfully!");
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl p-8 mb-8 border border-indigo-100 dark:border-indigo-800/50 flex items-center gap-6">
        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-600/30">
          <Calendar size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">AI Meal Planner</h1>
          <p className="text-slate-600 dark:text-slate-300">
            Build a personalized meal plan without spending hours deciding what to eat.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Plan Preferences</h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Number of Days: {days}</label>
                <input 
                  type="range" min="1" max="7" value={days} onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Meals per Day: {mealsPerDay}</label>
                <input 
                  type="range" min="1" max="4" value={mealsPerDay} onChange={(e) => setMealsPerDay(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Preferred Cuisines</label>
                <input 
                  type="text" placeholder="e.g. Italian, Mexican..." value={cuisines} onChange={(e) => setCuisines(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Max Cooking Time (mins)</label>
                <select 
                  value={cookingTime} onChange={(e) => setCookingTime(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value={15}>15 mins or less</option>
                  <option value={30}>30 mins or less</option>
                  <option value={45}>45 mins or less</option>
                  <option value={60}>1 hour</option>
                  <option value={120}>No limit</option>
                </select>
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full mt-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Calendar size={20} />}
              {isGenerating ? "Generating Plan..." : "Generate Meal Plan"}
            </button>
            
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-xl text-xs flex items-start gap-2 border border-blue-100 dark:border-blue-800/30">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <p>Generation logic is currently simulated for the UI prototype. Backend API integration pending.</p>
            </div>
          </div>
        </div>

        {/* Plan Display */}
        <div className="lg:col-span-2">
          {!mealPlan && !isGenerating ? (
            <div className="h-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/30 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl p-12 text-center min-h-[400px]">
              <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-500 rounded-full flex items-center justify-center mb-6">
                <ChefHat size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Ready to plan your meals?</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">
                Set your preferences on the left and hit generate to let AI build a perfect meal plan tailored to your taste.
              </p>
            </div>
          ) : isGenerating ? (
            <div className="h-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/30 rounded-3xl p-12 text-center min-h-[400px]">
              <Loader2 size={48} className="animate-spin text-indigo-500 mb-6" />
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Crafting your perfect plan...</h3>
              <p className="text-slate-500 dark:text-slate-400">Analyzing your taste profile and dietary preferences.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Your {days}-Day Plan</h2>
                <div className="flex gap-2">
                  <button className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Regenerate">
                    <RefreshCw size={20} />
                  </button>
                  <button className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold rounded-lg shadow-sm flex items-center gap-2 hover:bg-slate-800 transition-colors">
                    <Save size={16} /> Save Plan
                  </button>
                </div>
              </div>

              {mealPlan.map((dayPlan: any, i: number) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
                  <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 border-b border-slate-100 dark:border-slate-700">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white">Day {dayPlan.day}</h3>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-700">
                    {dayPlan.meals.map((meal: any, j: number) => (
                      <div key={j} className="p-6 flex flex-col sm:flex-row gap-4 items-center group hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                        <div className="w-16 sm:w-20 text-center sm:text-left shrink-0">
                          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">{meal.type}</span>
                        </div>
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
                          <img src={meal.img} alt={meal.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow text-center sm:text-left">
                          <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">{meal.name}</h4>
                          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 font-medium">
                            <span className="flex items-center gap-1"><Clock size={12}/> {meal.time} mins</span>
                            <span className="flex items-center gap-1">• {meal.cals} kcal</span>
                          </div>
                        </div>
                        <div className="shrink-0 flex gap-2">
                          <button className="text-xs font-semibold px-3 py-1.5 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">Swap</button>
                          <button className="text-xs font-semibold px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-100 transition-colors">View</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

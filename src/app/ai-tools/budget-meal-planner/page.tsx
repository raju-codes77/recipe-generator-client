"use client";

import React, { useState } from "react";
import { Wallet, Loader2, DollarSign, Calendar, Save, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function BudgetMealPlannerPage() {
  const [budget, setBudget] = useState(50);
  const [days, setDays] = useState(3);
  const [mealsPerDay, setMealsPerDay] = useState(3);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mealPlan, setMealPlan] = useState<any>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setMealPlan(null);
    
    // Simulate generation
    setTimeout(() => {
      const mockPlan = {
        estimatedCost: Math.floor(budget * 0.85 * 100) / 100, // Slightly under budget
        days: Array.from({ length: days }).map((_, d) => ({
          day: d + 1,
          meals: Array.from({ length: mealsPerDay }).map((_, m) => ({
            type: m === 0 ? "Breakfast" : m === 1 ? "Lunch" : "Dinner",
            name: ["Oatmeal Bowl", "Lentil Soup", "Rice & Beans", "Pasta Marinara", "Egg Scramble"][Math.floor(Math.random() * 5)],
            estCost: (Math.random() * 3 + 1).toFixed(2),
            img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&auto=format&fit=crop&q=60"
          }))
        }))
      };
      setMealPlan(mockPlan);
      setIsGenerating(false);
      toast.success("Budget plan generated!");
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-3xl p-8 mb-8 border border-cyan-100 dark:border-cyan-800/50 flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 bg-cyan-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-cyan-600/30">
          <Wallet size={32} />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Budget Meal Planning</h1>
          <p className="text-slate-600 dark:text-slate-300">
            Plan delicious meals while staying within your budget. Let AI optimize your grocery list for savings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Your Budget</h3>
            
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Total Budget ($)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <DollarSign size={18} className="text-slate-400" />
                  </div>
                  <input 
                    type="number" min="10" step="5" value={budget} onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Days to Plan: {days}</label>
                <input 
                  type="range" min="1" max="14" value={days} onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full accent-cyan-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Meals per Day: {mealsPerDay}</label>
                <input 
                  type="range" min="1" max="4" value={mealsPerDay} onChange={(e) => setMealsPerDay(Number(e.target.value))}
                  className="w-full accent-cyan-600"
                />
              </div>

              <button 
                type="submit"
                disabled={isGenerating}
                className="w-full py-4 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Wallet size={20} />}
                {isGenerating ? "Optimizing Budget..." : "Plan on a Budget"}
              </button>
            </form>
          </div>
          
          {/* Simulated UI disclaimer */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-2xl text-xs flex items-start gap-3 border border-blue-100 dark:border-blue-800/30">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <p className="font-medium">
              <strong>UI Prototype:</strong> Costs shown are estimates. True integration requires connecting to a live grocery pricing API.
            </p>
          </div>
        </div>

        {/* Plan Display */}
        <div className="lg:col-span-2">
          {!mealPlan && !isGenerating ? (
            <div className="h-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/30 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl p-12 text-center min-h-[400px]">
              <div className="w-20 h-20 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-500 rounded-full flex items-center justify-center mb-6">
                <DollarSign size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Eat well, spend less</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">
                Set your budget on the left to generate an affordable, healthy meal plan.
              </p>
            </div>
          ) : isGenerating ? (
            <div className="h-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/30 rounded-3xl p-12 text-center min-h-[400px]">
              <Loader2 size={48} className="animate-spin text-cyan-500 mb-6" />
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Crunching the numbers...</h3>
              <p className="text-slate-500 dark:text-slate-400">Finding affordable, nutritious recipes.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Estimated Total Cost</p>
                  <h2 className="text-4xl font-black text-cyan-600 dark:text-cyan-400">${mealPlan.estimatedCost.toFixed(2)}</h2>
                  <p className="text-xs text-slate-400 mt-1">Well under your ${budget} budget!</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold rounded-xl shadow-sm flex items-center gap-2 hover:bg-slate-800 transition-colors">
                    <Save size={16} /> Save Plan
                  </button>
                </div>
              </div>

              {mealPlan.days.map((dayPlan: any, i: number) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
                  <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                      <Calendar size={18} className="text-slate-400" /> Day {dayPlan.day}
                    </h3>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-700">
                    {dayPlan.meals.map((meal: any, j: number) => (
                      <div key={j} className="p-6 flex flex-col sm:flex-row gap-4 items-center group hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                        <div className="w-16 sm:w-20 text-center sm:text-left shrink-0">
                          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">{meal.type}</span>
                        </div>
                        <div className="flex-grow text-center sm:text-left">
                          <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">{meal.name}</h4>
                        </div>
                        <div className="shrink-0 font-mono text-sm font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600">
                          ~${meal.estCost}
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

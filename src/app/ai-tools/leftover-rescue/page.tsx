"use client";

import React, { useState } from "react";
import { Recycle, Search, Plus, X, Loader2, ArrowRight, AlertCircle, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

export default function LeftoverRescuePage() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any>(null);

  const addIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    const val = inputValue.trim().toLowerCase();
    if (val && !ingredients.includes(val)) {
      setIngredients([...ingredients, val]);
      setInputValue("");
    }
  };

  const removeIngredient = (ing: string) => {
    setIngredients(ingredients.filter(i => i !== ing));
  };

  const handleRescue = () => {
    if (ingredients.length === 0) {
      toast.error("Please add at least one leftover ingredient!");
      return;
    }

    setIsSearching(true);
    setResults(null);

    // Simulate search API
    setTimeout(() => {
      setResults([
        {
          id: 1,
          name: "Quick Fried Rice",
          img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200&auto=format&fit=crop&q=60",
          uses: ingredients.slice(0, 3), // mock uses
          needs: ["Soy Sauce", "Sesame Oil"],
          time: 15,
          match: 95
        },
        {
          id: 2,
          name: "Leftover Hash",
          img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200&auto=format&fit=crop&q=60",
          uses: ingredients.slice(0, 2),
          needs: ["Potatoes", "Olive Oil"],
          time: 25,
          match: 88
        }
      ]);
      setIsSearching(false);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-3xl p-8 mb-8 border border-amber-100 dark:border-amber-800/50 flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-amber-500/30">
          <Recycle size={32} />
        </div>
        <div className="text-center md:text-left flex-grow">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Leftover Rescue</h1>
          <p className="text-slate-600 dark:text-slate-300">
            Tell FoodCanvas what you have left, and discover ways to turn it into something delicious instead of wasting it.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Section */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">What's in your fridge?</h3>
            
            <form onSubmit={addIngredient} className="relative mb-6">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g. Rice, Chicken, Carrots..."
                className="w-full pl-5 pr-12 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
                <Plus size={18} />
              </button>
            </form>

            <div className="flex flex-wrap gap-2 mb-8 min-h-[100px] content-start">
              {ingredients.length === 0 ? (
                <span className="text-sm text-slate-400 italic w-full text-center mt-4">No ingredients added yet.</span>
              ) : (
                ingredients.map((ing) => (
                  <div key={ing} className="bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 border border-amber-200 dark:border-amber-800/60 transition-all hover:bg-amber-200 dark:hover:bg-amber-800/60 cursor-default">
                    {ing}
                    <button onClick={() => removeIngredient(ing)} className="hover:text-red-500 transition-colors">
                      <X size={14} strokeWidth={3} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <button 
              onClick={handleRescue}
              disabled={isSearching || ingredients.length === 0}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 disabled:opacity-50 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {isSearching ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
              {isSearching ? "Finding Recipes..." : "Rescue My Leftovers"}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-7">
          {!results && !isSearching ? (
             <div className="h-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/30 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl p-12 text-center min-h-[400px]">
               <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 text-amber-500 rounded-full flex items-center justify-center mb-6">
                 <Sparkles size={40} />
               </div>
               <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Zero Waste Starts Here</h3>
               <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                 Add your leftovers and we'll show you how to turn them into a brand new meal.
               </p>
             </div>
          ) : isSearching ? (
             <div className="h-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/30 rounded-3xl p-12 text-center min-h-[400px]">
               <Loader2 size={48} className="animate-spin text-amber-500 mb-6" />
               <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Searching the database...</h3>
               <p className="text-slate-500 dark:text-slate-400">Finding the best matches for your ingredients.</p>
             </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">We found {results.length} matches!</h2>
              
              {results.map((recipe: any) => (
                <div key={recipe.id} className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row gap-6 group hover:shadow-md transition-shadow">
                  <div className="w-full sm:w-40 h-40 rounded-2xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 relative">
                    <img src={recipe.img} alt={recipe.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 left-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-[10px] font-black px-2 py-1 rounded-md text-amber-600 dark:text-amber-400">
                      {recipe.match}% MATCH
                    </div>
                  </div>
                  
                  <div className="flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{recipe.name}</h3>
                      <span className="text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 px-2 py-1 rounded-md">
                        {recipe.time} mins
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-2 mb-4 text-sm flex-grow">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Uses your leftovers</p>
                        <p className="font-medium text-emerald-600 dark:text-emerald-400">
                          {recipe.uses.length > 0 ? recipe.uses.join(", ") : "None"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">You may need</p>
                        <p className="font-medium text-amber-600 dark:text-amber-400">
                          {recipe.needs.length > 0 ? recipe.needs.join(", ") : "Nothing!"}
                        </p>
                      </div>
                    </div>
                    
                    <button className="mt-auto py-2.5 w-full bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-700 dark:bg-slate-700 dark:hover:bg-amber-900/30 dark:text-slate-200 dark:hover:text-amber-400 font-bold rounded-xl transition-colors border border-slate-200 dark:border-slate-600 flex items-center justify-center gap-2 text-sm">
                      View Full Recipe <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-2xl text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center gap-3 border border-blue-100 dark:border-blue-800/30">
                <AlertCircle size={20} className="shrink-0" />
                <p className="font-medium">
                  <strong>UI Prototype:</strong> This page is ready to be connected to the backend. It will route requests through the Pantry-to-Plate service once configured.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

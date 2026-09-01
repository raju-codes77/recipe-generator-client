import React from 'react';
import { Search, Sparkles, LayoutGrid, ChevronRight } from 'lucide-react';

export default function FlavorPairingBanner() {
  const categories = ["Popular", "Vegetables", "Fruits", "Herbs", "Spices", "Meats", "Seafood", "Dairy"];
  
  const ingredients = [
    { name: "Chicken", icon: "🍗" },
    { name: "Tomato", icon: "🍅" },
    { name: "Basil", icon: "🌿" },
    { name: "Salmon", icon: "🐟" },
    { name: "Avocado", icon: "🥑" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white font-sans">
      
      {/* Top Banner / Header Section */}
      <div className="relative bg-gradient-to-r from-emerald-50/60 to-emerald-100/30 rounded-3xl p-8 mb-8 flex flex-col md:flex-row justify-between items-center overflow-hidden border border-emerald-100/50">
        <div className="z-10 max-w-xl">
          <div className="flex items-center gap-2 text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full text-xs font-semibold w-max mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Flavor Pairing
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-2">
            Flavor Pairing
          </h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Discover perfect ingredient and flavor combinations.<br />
            Get AI-powered pairing suggestions to elevate your dishes.
          </p>
        </div>

        {/* Decorative Floating Salad Image / Illustration placeholder */}
        <div className="mt-6 md:mt-0 z-10">
          <div className="w-48 h-36 bg-contain bg-no-repeat bg-center flex items-center justify-center">
            {/* Replace with your actual banner salad illustration asset */}
            <span className="text-6xl">🥗</span>
          </div>
        </div>
      </div>

      {/* Main Card Container */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/80 p-6 md:p-8">
        
        {/* Step Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-emerald-700/20">
            1
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Select an Ingredient</h2>
            <p className="text-xs md:text-sm text-gray-500">Choose your main ingredient to find perfect pairings.</p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mb-6">
          <input 
            type="text" 
            placeholder="Search Ingredient... (e.g., Chicken, Basil, Chocolate)"
            className="w-full bg-gray-50/80 border border-gray-200 rounded-xl py-3.5 pl-4 pr-12 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all"
          />
          <Search className="absolute right-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium whitespace-nowrap transition-all ${
                index === 0 
                  ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20' 
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Ingredient Selection Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {ingredients.map((item, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 p-3 rounded-xl border border-gray-200/80 hover:border-emerald-600 hover:shadow-md transition-all cursor-pointer bg-white group"
            >
              <span className="text-2xl p-1 bg-gray-50 rounded-lg group-hover:scale-110 transition-transform">{item.icon}</span>
              <span className="text-xs md:text-sm font-semibold text-gray-800">{item.name}</span>
            </div>
          ))}

          {/* More Button */}
          <div className="flex items-center justify-center gap-2 p-3 rounded-xl border border-gray-200/80 hover:border-emerald-600 hover:shadow-md transition-all cursor-pointer bg-white group">
            <LayoutGrid className="w-4 h-4 text-emerald-700" />
            <span className="text-xs md:text-sm font-semibold text-gray-800">More</span>
          </div>
        </div>

      </div>
    </div>
  );
}
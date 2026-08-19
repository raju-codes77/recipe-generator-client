"use client";

import Image from "next/image";
import { 
  Bookmark, 
  Heart, 
  Leaf, 
  Coffee, 
  Zap, 
  Flame, 
  UtensilsCrossed, 
  ChevronRight, 
  Plus 
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="space-y-6">
      
      {/* ================================================= */}
      {/* ১. MY COLLECTIONS CARD */}
      {/* ================================================= */}
      <div className="rounded-[28px] border border-[#E2EBE4] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#131B2E]">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 dark:text-white">My Collections</h3>
          <button className="text-xs font-bold text-[#24733E] dark:text-[#10B981] hover:underline cursor-pointer">
            View All
          </button>
        </div>

        {/* Collections List */}
        <div className="space-y-3">
          
          {/* Item 1 */}
          <div className="group flex items-center justify-between p-2 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF6EE] text-[#F97316] dark:bg-orange-500/10">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">Quick & Easy</h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">12 recipes</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
          </div>

          {/* Item 2 */}
          <div className="group flex items-center justify-between p-2 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF4EB] text-[#24733E] dark:bg-[#10B981]/10">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">Healthy Meals</h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">18 recipes</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
          </div>

          {/* Item 3 */}
          <div className="group flex items-center justify-between p-2 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF4EB] text-[#24733E] dark:bg-[#10B981]/10">
                <Leaf className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">Vegetarian</h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">15 recipes</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
          </div>

          {/* Item 4 */}
          <div className="group flex items-center justify-between p-2 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF9E6] text-amber-500 dark:bg-amber-500/10">
                <Coffee className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">Breakfast Ideas</h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">8 recipes</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
          </div>

        </div>

        {/* Create New Collection Button */}
        <button className="w-full mt-4 py-3 rounded-2xl border border-dashed border-[#24733E] text-[#24733E] dark:border-[#10B981] dark:text-[#10B981] text-xs font-bold hover:bg-emerald-50 dark:hover:bg-[#10B981]/10 transition-colors flex items-center justify-center gap-2 cursor-pointer">
          <Plus className="h-4 w-4" />
          Create New Collection
        </button>

      </div>


      {/* ================================================= */}
      {/* ২. RECOMMENDED COLLECTIONS CARD */}
      {/* ================================================= */}
      <div className="rounded-[28px] border border-[#E2EBE4] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#131B2E]">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Recommended Collections</h3>

        <div className="space-y-4">
          
          {/* Rec 1 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                <Image 
                  src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=100&auto=format&fit=crop&q=60" 
                  alt="High Protein Meals" 
                  fill 
                  className="object-cover" 
                />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1">High Protein Meals</h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">24 recipes • 1.2k followers</p>
              </div>
            </div>
            <button className="cursor-pointer px-3 py-1.5 rounded-xl border border-[#E2EBE4] text-xs font-bold text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5 transition-colors">
              Follow
            </button>
          </div>

          {/* Rec 2 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                <Image 
                  src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=100&auto=format&fit=crop&q=60" 
                  alt="Low Carb Recipes" 
                  fill 
                  className="object-cover" 
                />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1">Low Carb Recipes</h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">18 recipes • 892 followers</p>
              </div>
            </div>
            <button className="cursor-pointer px-3 py-1.5 rounded-xl border border-[#E2EBE4] text-xs font-bold text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5 transition-colors">
              Follow
            </button>
          </div>

          {/* Rec 3 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                <Image 
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=100&auto=format&fit=crop&q=60" 
                  alt="One Pot Wonders" 
                  fill 
                  className="object-cover" 
                />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1">One Pot Wonders</h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">15 recipes • 1.5k followers</p>
              </div>
            </div>
            <button className="cursor-pointer px-3 py-1.5 rounded-xl border border-[#E2EBE4] text-xs font-bold text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5 transition-colors">
              Follow
            </button>
          </div>

        </div>
      </div>


      {/* ================================================= */}
      {/* ৩. AI BANNER CARD */}
      {/* ================================================= */}
      <div className="rounded-[28px] bg-[#EAF4EB] dark:bg-[#132A26] p-6 relative overflow-hidden border border-[#D1E7D3] dark:border-white/10">
        
        <div className="max-w-[70%]">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">
            Can&apos;t find what you want?
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            Generate recipes from your ingredients with AI
          </p>
          <button className="cursor-pointer px-4 py-2.5 rounded-xl bg-[#24733E] text-white text-xs font-bold hover:bg-[#1e5d32] transition-colors shadow-sm">
            Try Pantry-to-Plate AI
          </button>
        </div>

        {/* Decorative Vegetables Illustration Image (Similar to screenshot layout) */}
        <div className="absolute -bottom-4 -right-4 w-32 h-32 pointer-events-none opacity-90">
          <Image 
            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&auto=format&fit=crop&q=60" 
            alt="AI Vegetables Bowl" 
            fill 
            className="object-contain"
          />
        </div>

      </div>

    </div>
  );
}
"use client";

import Image from "next/image";
import { Star } from "lucide-react";

interface DetailsSidebarProps {
  recipeImage?: string;
}

const DetailsSidebar = ({ recipeImage }: DetailsSidebarProps) => {
  const defaultImage = recipeImage || "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=150&q=80";

  return (
    <div className="lg:col-span-4 flex flex-col gap-6">
      
      {/* ABOUT THE AUTHOR CARD */}
      <div className="bg-white dark:bg-[#131B2E] p-5 rounded-[24px] border border-gray-100 dark:border-white/10 shadow-sm">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">About the Author</h3>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-200">
              <Image 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                alt="Sarah Ahmed" 
                fill 
                className="object-cover" 
              />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">Sarah Ahmed</h4>
              <p className="text-[11px] text-gray-400">Food Enthusiast</p>
            </div>
          </div>
          <button className="px-3.5 py-1.5 rounded-full border border-[#24733E] text-[#24733E] dark:border-[#10B981] dark:text-[#10B981] text-xs font-bold hover:bg-[#24733E] hover:text-white transition-colors cursor-pointer">
            Follow
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
          Love creating healthy and delicious recipes with a touch of creativity.
        </p>
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100 dark:border-white/10 text-center">
          <div>
            <span className="text-xs font-bold text-gray-800 dark:text-white block">24</span>
            <span className="text-[9px] text-gray-400">Recipes</span>
          </div>
          <div className="border-x border-gray-100 dark:border-white/10">
            <span className="text-xs font-bold text-gray-800 dark:text-white block">1.2k</span>
            <span className="text-[9px] text-gray-400">Followers</span>
          </div>
          <div>
            <span className="text-xs font-bold text-gray-800 dark:text-white block">180</span>
            <span className="text-[9px] text-gray-400">Following</span>
          </div>
        </div>
      </div>

      {/* YOU MIGHT ALSO LIKE CARD */}
      <div className="bg-white dark:bg-[#131B2E] p-5 rounded-[24px] border border-gray-100 dark:border-white/10 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">You Might Also Like</h3>
          <span className="text-xs font-semibold text-[#24733E] dark:text-[#10B981] cursor-pointer hover:underline">View All</span>
        </div>

        <div className="flex flex-col gap-3">
          {[
            { title: "Teriyaki Chicken Bowl", time: "25 min", rating: "4.7" },
            { title: "Mediterranean Quinoa Bowl", time: "30 min", rating: "4.6" },
            { title: "Spicy Shrimp Bowl", time: "20 min", rating: "4.5" },
            { title: "Tofu Buddha Bowl", time: "25 min", rating: "4.8" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
              <div className="relative h-12 w-12 rounded-xl overflow-hidden shrink-0">
                <Image src={defaultImage} alt={item.title} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-gray-800 dark:text-white truncate">{item.title}</h4>
                <div className="flex items-center gap-2 mt-0.5 text-[10px] text-gray-400">
                  <span className="flex items-center gap-0.5 text-amber-500 font-semibold">
                    <Star className="h-2.5 w-2.5 fill-current" /> {item.rating}
                  </span>
                  <span>•</span>
                  <span>{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI BANNER CARD */}
      <div className="bg-emerald-50 dark:bg-[#132A26] p-5 rounded-[24px] border border-emerald-100 dark:border-emerald-900/30">
        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Can&apos;t find what you want?</h4>
        <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          Generate recipes from your ingredients with AI.
        </p>
        <button className="w-full py-2.5 rounded-xl bg-[#24733E] dark:bg-[#10B981] text-white dark:text-black text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-sm">
          Try Pantry-to-Plate AI
        </button>
      </div>

    </div>
  );
};

export default DetailsSidebar;
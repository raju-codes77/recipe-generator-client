"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingBasket, Plus, Sparkles } from "lucide-react";

interface Props {
  onAddItem: () => void;
  onGenerateFromRecipe: () => void;
}

export default function ShoppingListHeader({ onAddItem, onGenerateFromRecipe }: Props) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="flex justify-between bg-[#EAF7EF] dark:bg-[#16A34A]/10 rounded-[20px] p-6 border border-[#16A34A]/10 dark:border-[#16A34A]/20">
      <div >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#16A34A] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-[#16A34A]/25">
            <ShoppingBasket size={24} />
          </div>
          <div>
            <h1 className="text-[28px] sm:text-[32px] font-extrabold text-[#17211D] dark:text-[#F4F7F4] leading-tight">
              Smart Shopping List
            </h1>
            <p className="text-sm text-[#66736C] dark:text-[#A6B0A9] mt-1">
              Everything you need, nothing you don&apos;t.
            </p>
            <p className="text-sm text-[#66736C] dark:text-[#A6B0A9] mt-3 max-w-md">
              Get AI-powered shopping lists based on your recipes, pantry and preferences.
            </p>
          </div>
        </div>


        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={onAddItem}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white dark:bg-[#15211B] text-[#17211D] dark:text-[#F4F7F4] text-sm font-bold border border-[#E5E7EB] dark:border-white/10 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
          >
            <Plus size={16} /> Add Item
          </button>
          <button
            onClick={onGenerateFromRecipe}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#16A34A] hover:bg-[#0F6B46] text-white text-sm font-bold rounded-xl shadow-sm transition-colors"
          >
            <Sparkles size={16} /> Generate from Recipe
          </button>
        </div>

      </div>
      {!imgFailed && (
        <div className=" relative w-40 h-40 lg:w-62 lg:h-50 shrink-0 hidden sm:block">
          <Image
            src="/images/shopping-bag-hero.png"
            alt="Grocery bag full of fresh vegetables"
            fill
            sizes="228px"
            className="object-contain"
            priority
            onError={() => setImgFailed(true)}
          />
        </div>
      )}

    </div>
  );
}

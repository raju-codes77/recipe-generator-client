import Image from "next/image";
import { Refrigerator, BarChart3, Camera, Smile, ArrowRight, Calendar, ShoppingBasket, Recycle, Replace, Wallet } from "lucide-react";
import Link from "next/link";

export default function AvailableTools() {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Available AI Tools</h3>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* 1. Pantry-to-Plate AI */}
        <div className="bg-green-50/50 dark:bg-slate-800/50 rounded-3xl p-6 border border-green-100 dark:border-slate-700 relative overflow-hidden group hover:shadow-md transition-shadow flex flex-col h-full">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-sm shadow-green-600/30">
            <Refrigerator size={24} />
          </div>

          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-lg">Pantry-to-Plate AI</h4>
            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-200">Popular</span>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-grow">
            Turn your available ingredients into delicious recipes. Reduce food waste and get smart recipe suggestions.
          </p>

          <Link
            href="/ai-tools/pantry-to-plate"
            className="mt-auto text-green-700 dark:text-green-500 font-semibold text-sm flex items-center gap-1.5 group-hover:gap-2 transition-all w-fit"
          >
            Generate recipes <ArrowRight size={16} />
          </Link>
        </div>

        {/* 2. Nutrition Analyzer */}
        <div className="bg-blue-50/50 dark:bg-slate-800/50 rounded-3xl p-6 border border-blue-100 dark:border-slate-700 relative overflow-hidden group hover:shadow-md transition-shadow flex flex-col h-full">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-sm shadow-blue-600/30">
            <BarChart3 size={24} />
          </div>

          <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2">Nutrition Analyzer</h4>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-grow">
            Analyze the nutritional value of any recipe. Get detailed insights on calories, macros, vitamins, and minerals.
          </p>

          <Link href="/ai-tools/nutrition-analyzer" className="mt-auto text-blue-700 dark:text-blue-500 font-semibold text-sm flex items-center gap-1.5 group-hover:gap-2 transition-all w-fit">
            Analyze nutrition <ArrowRight size={16} />
          </Link>
        </div>

        {/* 3. AI Meal Tracker */}
        <div className="bg-orange-50/50 dark:bg-slate-800/50 rounded-3xl p-6 border border-orange-100 dark:border-slate-700 relative overflow-hidden group hover:shadow-md transition-shadow flex flex-col h-full">
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white mb-6 shadow-sm shadow-orange-500/30">
            <Camera size={24} />
          </div>

          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-lg">AI Meal Tracker</h4>
            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-200">New</span>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-grow">
            Snap a photo of your meal and let AI instantly log your calories, macros, and daily nutrition goals.
          </p>

          <Link href="/ai-tools/meal-tracker" className="mt-auto text-orange-600 dark:text-orange-500 font-semibold text-sm flex items-center gap-1.5 group-hover:gap-2 transition-all w-fit">
            Track Meal <ArrowRight size={16} />
          </Link>
        </div>

        {/* 4. Taste Matcher */}
        <div className="bg-emerald-50/50 dark:bg-slate-800/50 rounded-3xl p-6 border border-emerald-100 dark:border-slate-700 relative overflow-hidden group hover:shadow-md transition-shadow flex flex-col h-full">
          <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-sm shadow-emerald-600/30">
            <Smile size={24} />
          </div>

          <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2">Taste Matcher</h4>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-grow">
            Find recipes that match your taste preferences. Our AI learns what you like and suggests recipes you'll love.
          </p>

          <Link href="/ai-tools/taste-matcher" className="mt-auto text-emerald-700 dark:text-emerald-500 font-semibold text-sm flex items-center gap-1.5 group-hover:gap-2 transition-all w-fit">
            Find my match <ArrowRight size={16} />
          </Link>
        </div>

        {/* 5. AI Meal Planner */}
        <div className="bg-indigo-50/50 dark:bg-slate-800/50 rounded-3xl p-6 border border-indigo-100 dark:border-slate-700 relative overflow-hidden group hover:shadow-md transition-shadow flex flex-col h-full">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-sm shadow-indigo-600/30">
            <Calendar size={24} />
          </div>

          <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2">AI Meal Planner</h4>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-grow">
            Plan balanced meals for your week based on your taste, goals, time, and available ingredients.
          </p>

          <Link href="/ai-tools/meal-planner" className="mt-auto text-indigo-700 dark:text-indigo-500 font-semibold text-sm flex items-center gap-1.5 group-hover:gap-2 transition-all w-fit">
            Plan My Meals <ArrowRight size={16} />
          </Link>
        </div>

        {/* 6. Smart Shopping List */}
        <div className="bg-teal-50/50 dark:bg-slate-800/50 rounded-3xl p-6 border border-teal-100 dark:border-slate-700 relative overflow-hidden group hover:shadow-md transition-shadow flex flex-col h-full">
          <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-sm shadow-teal-600/30">
            <ShoppingBasket size={24} />
          </div>

          <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2">Smart Shopping List</h4>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-grow">
            Turn your recipes and meal plans into an organized shopping list automatically.
          </p>

          <Link href="/ai-tools/shopping-list" className="mt-auto text-teal-700 dark:text-teal-500 font-semibold text-sm flex items-center gap-1.5 group-hover:gap-2 transition-all w-fit">
            Build Shopping List <ArrowRight size={16} />
          </Link>
        </div>

        {/* 7. Leftover Rescue */}
        <div className="bg-amber-50/50 dark:bg-slate-800/50 rounded-3xl p-6 border border-amber-100 dark:border-slate-700 relative overflow-hidden group hover:shadow-md transition-shadow flex flex-col h-full">
          <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white mb-6 shadow-sm shadow-amber-500/30">
            <Recycle size={24} />
          </div>

          <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2">Leftover Rescue</h4>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-grow">
            Turn leftover ingredients into delicious recipes instead of letting food go to waste.
          </p>

          <Link href="/ai-tools/leftover-rescue" className="mt-auto text-amber-600 dark:text-amber-500 font-semibold text-sm flex items-center gap-1.5 group-hover:gap-2 transition-all w-fit">
            Rescue My Leftovers <ArrowRight size={16} />
          </Link>
        </div>

        {/* 8. Smart Ingredient Substitution */}
        <div className="bg-rose-50/50 dark:bg-slate-800/50 rounded-3xl p-6 border border-rose-100 dark:border-slate-700 relative overflow-hidden group hover:shadow-md transition-shadow flex flex-col h-full">
          <div className="w-12 h-12 bg-rose-500 rounded-xl flex items-center justify-center text-white mb-6 shadow-sm shadow-rose-500/30">
            <Replace size={24} />
          </div>

          <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2">Smart Ingredient Substitution</h4>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-grow">
            Don't have an ingredient? Find smart alternatives that fit your recipe, diet, and available ingredients.
          </p>

          <Link href="/ai-tools/ingredient-substitution" className="mt-auto text-rose-600 dark:text-rose-500 font-semibold text-sm flex items-center gap-1.5 group-hover:gap-2 transition-all w-fit">
            Find Substitutes <ArrowRight size={16} />
          </Link>
        </div>

        {/* 9. Budget Meal Planning */}
        <div className="bg-cyan-50/50 dark:bg-slate-800/50 rounded-3xl p-6 border border-cyan-100 dark:border-slate-700 relative overflow-hidden group hover:shadow-md transition-shadow flex flex-col h-full">
          <div className="w-12 h-12 bg-cyan-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-sm shadow-cyan-600/30">
            <Wallet size={24} />
          </div>

          <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2">Budget Meal Planning</h4>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-grow">
            Create affordable meal plans based on your budget, ingredients, and nutritional needs.
          </p>

          <Link href="/ai-tools/budget-meal-planner" className="mt-auto text-cyan-700 dark:text-cyan-500 font-semibold text-sm flex items-center gap-1.5 group-hover:gap-2 transition-all w-fit">
            Plan on a Budget <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  );
}

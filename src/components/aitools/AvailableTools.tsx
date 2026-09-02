import Image from "next/image";
import { Refrigerator, BarChart3, Camera, Sparkles, Smile, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AvailableTools() {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Available AI Tools</h3>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* 1. Pantry-to-Plate AI */}
        <div className="bg-green-50/50 dark:bg-slate-800/50 rounded-3xl p-6 border border-green-100 dark:border-slate-700 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-sm shadow-green-600/30">
            <Refrigerator size={24} />
          </div>

          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-lg">Pantry-to-Plate AI</h4>
            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-200">Popular</span>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 max-w-[200px]">
            Turn your available ingredients into delicious recipes. Reduce food waste and get smart recipe suggestions.
          </p>

          <Link
            href="/ai-tools/pantry-to-plate"
            className="text-green-700 dark:text-green-500 font-semibold text-sm flex items-center gap-1.5 group-hover:gap-2 transition-all"
          >
            Generate recipes <ArrowRight size={16} />
          </Link>

          {/* Decorative Image */}
          <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-4 border-white dark:border-slate-800 overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform duration-500">
            <Image
              src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop&q=80"
              alt="Pantry Salad"
              fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* 2. Nutrition Analyzer */}
        <div className="bg-blue-50/50 dark:bg-slate-800/50 rounded-3xl p-6 border border-blue-100 dark:border-slate-700 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-sm shadow-blue-600/30">
            <BarChart3 size={24} />
          </div>

          <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2">Nutrition Analyzer</h4>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 max-w-[200px]">
            Analyze the nutritional value of any recipe. Get detailed insights on calories, macros, vitamins, and minerals.
          </p>

          <Link href="/ai-tools/nutrition-analyzer" className="text-blue-700 dark:text-blue-500 font-semibold text-sm flex items-center gap-1.5 group-hover:gap-2 transition-all">
            Analyze nutrition <ArrowRight size={16} />
          </Link>

          {/* Decorative Graphic */}
          <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-36 h-36 rounded-full border-4 border-white dark:border-slate-800 overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform duration-500">
            <Image
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&auto=format&fit=crop&q=80"
              alt="Healthy Food"
              fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          {/* Overlay Box */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-700 p-2.5 rounded-xl shadow-lg border border-slate-100 dark:border-slate-600 text-[10px] font-bold z-10 w-24">
            <p className="text-xs text-slate-900 dark:text-white mb-1.5">420 kcal</p>
            <div className="flex justify-between items-center text-slate-500 mb-0.5"><span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>Protein</span><span>32g</span></div>
            <div className="flex justify-between items-center text-slate-500 mb-0.5"><span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>Carbs</span><span>38g</span></div>
            <div className="flex justify-between items-center text-slate-500"><span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>Fat</span><span>12g</span></div>
          </div>
        </div>

        {/* 3. AI Meal Tracker */}
        <Link href="/ai-tools/meal-tracker" className="block bg-orange-50/50 dark:bg-slate-800/50 rounded-3xl p-6 border border-orange-100 dark:border-slate-700 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white mb-6 shadow-sm shadow-orange-500/30">
            <Camera size={24} />
          </div>

          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-lg">AI Meal Tracker</h4>
            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-200">New</span>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 max-w-[200px]">
            Snap a photo of your meal and let AI instantly log your calories, macros, and daily nutrition goals.
          </p>

          <span className="text-orange-600 dark:text-orange-500 font-semibold text-sm flex items-center gap-1.5 group-hover:gap-2 transition-all">
            Track Meal <ArrowRight size={16} />
          </span>

          {/* Decorative Tracker Graphic */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-28 h-28 lg:w-32 lg:h-32 rounded-2xl bg-white dark:bg-slate-700 p-2 shadow-lg border border-orange-200 dark:border-slate-600 transform group-hover:scale-105 transition-transform duration-500 flex flex-col gap-2">
            <div className="relative w-full h-16 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80"
                alt="Healthy Bowl"
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-1 px-1">
              <div className="w-full bg-slate-100 dark:bg-slate-600 h-1.5 rounded-full overflow-hidden">
                <div className="bg-orange-500 w-3/4 h-full"></div>
              </div>
              <div className="flex justify-between text-[8px] text-slate-400 font-bold">
                <span>450 kcal</span>
                <span>75%</span>
              </div>
            </div>
          </div>
        </Link>

        {/* 4. Flavor Pairing */}
        <div className="md:col-span-1 lg:col-span-2 bg-purple-50/50 dark:bg-slate-800/50 rounded-3xl p-6 border border-purple-100 dark:border-slate-700 relative overflow-hidden group hover:shadow-md transition-shadow flex flex-col justify-center">
          <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-sm shadow-purple-600/30">
            <Sparkles size={24} />
          </div>

          <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2">Flavor Pairing</h4>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 max-w-[280px]">
            Discover perfect ingredient and flavor combinations. Get AI-powered pairing suggestions to elevate your dishes.
          </p>

          <Link href={"/ai-tools/flavor-pairing"} className="text-purple-700 dark:text-purple-500 font-semibold text-sm flex items-center gap-1.5 group-hover:gap-2 transition-all">
            Explore pairings <ArrowRight size={16} />
          </Link>

          {/* Decorative Ingredients Circle */}
          <div className="absolute right-0 md:right-10 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-dashed border-purple-300 dark:border-purple-900/50 flex items-center justify-center hidden sm:flex">
            <div className="relative w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 overflow-hidden shadow-lg z-10 transform group-hover:scale-105 transition-transform duration-500">
              <Image
                src="https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=400&auto=format&fit=crop&q=80"
                alt="Spices"
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            {/* Small floating ingredients */}
            <div className="absolute -top-2 right-6 w-8 h-8 rounded-full bg-white dark:bg-slate-700 shadow-md flex items-center justify-center text-xs border border-slate-100 z-20">🍅</div>
            <div className="absolute bottom-8 -left-3 w-8 h-8 rounded-full bg-white dark:bg-slate-700 shadow-md flex items-center justify-center text-xs border border-slate-100 z-20">🌿</div>
            <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white dark:bg-slate-700 shadow-md flex items-center justify-center text-xs border border-slate-100 z-20">🍋</div>
          </div>
        </div>

        {/* 5. Taste Matcher */}
        <div className="md:col-span-1 lg:col-span-1 bg-green-50/50 dark:bg-slate-800/50 rounded-3xl p-6 border border-green-100 dark:border-slate-700 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-sm shadow-green-600/30">
            <Smile size={24} />
          </div>

          <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2">Taste Matcher</h4>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 max-w-[200px]">
            Find recipes that match your taste preferences. Our AI learns what you like and suggests recipes you&apos;ll love.
          </p>

          <Link href="/ai-tools/taste-matcher" className="text-green-700 dark:text-green-500 font-semibold text-sm flex items-center gap-1.5 group-hover:gap-2 transition-all">
            Find my match <ArrowRight size={16} />
          </Link>

          {/* Decorative Matcher Graphic */}
          <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-dashed border-green-300 dark:border-green-900/50 flex items-center justify-center hidden xl:flex">
            {/* Center icon */}
            <div className="w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center shadow-lg z-10">
              <Smile size={24} />
            </div>
            {/* Surrounding food bubbles */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 overflow-hidden z-20">
              <Image src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&auto=format&fit=crop&q=60" alt="Food" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
            </div>
            <div className="absolute bottom-6 -left-4 w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 overflow-hidden z-20">
              <Image src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100&auto=format&fit=crop&q=60" alt="Food" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
            </div>
            <div className="absolute bottom-6 -right-4 w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 overflow-hidden z-20">
              <Image src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=100&auto=format&fit=crop&q=60" alt="Food" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

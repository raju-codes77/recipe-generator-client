const fs = require('fs');
const file = 'c:/Main-Projects/recipe-generator-client/src/components/Banner.tsx';
let code = fs.readFileSync(file, 'utf8');

const startIdx = code.indexOf('function Slide2Visual() { // hero3.png - App Interface');
const endIdx = code.indexOf('function Slide3Visual() { // hero4.png - Recipe Detail / Nutrition');

if (startIdx !== -1 && endIdx !== -1) {
  const replacement = `function Slide2Visual() { // hero3.png - App Interface
  return (
    <div className="relative w-full h-full pointer-events-none hidden xl:flex items-center justify-end pr-4 2xl:pr-8">
      
      {/* ── Fixed-width composition container ── */}
      <div className="relative w-[560px] xl:w-[600px] 2xl:w-[640px] h-full flex items-center justify-center">

        {/* ────── Central App/Phone UI Component ────── */}
        <motion.div
          className="relative z-20 w-[260px] bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl border-[3px] border-stone-200/50 dark:border-slate-700/50 overflow-hidden flex flex-col pointer-events-auto"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
          transition={{ opacity: { delay: 0.25, duration: 0.6 }, scale: { delay: 0.25, duration: 0.6 }, y: { delay: 0.8, duration: 6, repeat: Infinity, ease: "easeInOut" } }}
        >
          {/* App Header */}
          <div className="px-5 pt-6 pb-4 bg-white dark:bg-slate-900 flex justify-between items-center border-b border-stone-100 dark:border-slate-800">
            <div>
              <p className="text-[10px] text-stone-400 font-medium">Good Morning,</p>
              <p className="text-[14px] font-black text-stone-800 dark:text-white leading-tight">Alex</p>
            </div>
            <div className="flex items-center gap-3">
              <Bell size={15} className="text-stone-400" />
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-sm">
                <User size={14} />
              </div>
            </div>
          </div>
          
          {/* App Content */}
          <div className="p-4 bg-stone-50 dark:bg-slate-950 flex flex-col gap-3 h-full">
            
            {/* Search */}
            <div className="relative">
              <input type="text" readOnly placeholder="What do you want to cook?" className="w-full bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl py-2.5 pl-9 pr-4 text-[11px] shadow-sm pointer-events-none placeholder-stone-400" />
              <Search size={12} className="absolute left-3 top-[10px] text-stone-400" />
            </div>
            
            {/* 2x1 Feature Row */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-emerald-600 rounded-xl p-3 text-white shadow-sm flex flex-col justify-between">
                <Refrigerator size={16} className="mb-2 opacity-90" />
                <p className="text-[10px] font-bold leading-tight">Ingredient Rescue</p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-stone-200 dark:border-slate-700 shadow-sm text-stone-700 dark:text-slate-200 flex flex-col justify-between">
                <Calendar size={16} className="mb-2 text-indigo-500" />
                <p className="text-[10px] font-bold leading-tight">Meal Planner</p>
              </div>
            </div>

            {/* Today's Nutrition */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-3.5 border border-stone-200 dark:border-slate-700 shadow-sm mt-1">
              <div className="flex justify-between items-center mb-2.5">
                <p className="text-[11px] font-bold text-stone-800 dark:text-white">Today's Nutrition</p>
                <span className="text-[9px] text-orange-500 font-bold bg-orange-50 dark:bg-orange-900/20 px-1.5 py-0.5 rounded-full">1,450 kcal</span>
              </div>
              <div className="flex gap-1 h-2 w-full rounded-full overflow-hidden bg-stone-100 dark:bg-slate-700 mb-2">
                <div className="w-[45%] bg-rose-500 rounded-full" />
                <div className="w-[35%] bg-amber-400 rounded-full" />
                <div className="w-[20%] bg-emerald-400 rounded-full" />
              </div>
              <div className="flex justify-between text-[8px] text-stone-400 font-medium">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>Carbs 45%</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>Protein 35%</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>Fat 20%</span>
              </div>
            </div>
            
            {/* Recent Meals (Visual filler) */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-stone-200 dark:border-slate-700 shadow-sm flex items-center gap-3 mt-1">
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                <img src="/hero3.png" alt="Meal" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-stone-800 dark:text-white truncate">Avocado Toast</p>
                <p className="text-[9px] text-stone-400">Breakfast · 320 kcal</p>
              </div>
              <div className="w-6 h-6 rounded-full bg-stone-100 dark:bg-slate-700 flex items-center justify-center">
                <ChevronRight size={12} className="text-stone-400" />
              </div>
            </div>
            
          </div>
        </motion.div>

        {/* ────── Floating Cards ────── */}
        
        {/* Nutrition Tracker - Top Right */}
        <motion.div
          className="absolute right-[12px] top-[18%] z-30 w-[185px] bg-white/92 dark:bg-slate-900/92 backdrop-blur-md shadow-xl border border-stone-200/60 dark:border-slate-700/60 rounded-2xl p-3 pointer-events-auto"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0, y: [0, -5, 0] }}
          transition={{ opacity: { delay: 0.6, duration: 0.6 }, x: { delay: 0.6, duration: 0.5 }, y: { delay: 1.1, duration: 5.5, repeat: Infinity, ease: "easeInOut" } }}
        >
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-sm shrink-0">
              <Activity size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-stone-900 dark:text-white leading-tight mb-0.5">Nutrition Tracker</p>
              <p className="text-[10px] text-stone-500 dark:text-slate-400 leading-snug">Monitor macros and calories easily.</p>
            </div>
          </div>
        </motion.div>

        {/* Smart Shopping List - Bottom Left */}
        <motion.div
          className="absolute left-[12px] bottom-[22%] z-30 w-[185px] bg-white/92 dark:bg-slate-900/92 backdrop-blur-md shadow-xl border border-stone-200/60 dark:border-slate-700/60 rounded-2xl p-3 pointer-events-auto"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0, y: [0, 5, 0] }}
          transition={{ opacity: { delay: 0.75, duration: 0.6 }, x: { delay: 0.75, duration: 0.5 }, y: { delay: 1.25, duration: 6.5, repeat: Infinity, ease: "easeInOut" } }}
        >
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm shrink-0">
              <ShoppingBasket size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-stone-900 dark:text-white leading-tight mb-0.5">Smart Shopping</p>
              <p className="text-[10px] text-stone-500 dark:text-slate-400 leading-snug">Auto-generate grocery lists.</p>
            </div>
          </div>
        </motion.div>

        {/* Weekly Plan Mini Card - Top Left */}
        <motion.div
          className="absolute left-[0px] top-[26%] z-30 w-[160px] bg-white/92 dark:bg-slate-900/92 backdrop-blur-md shadow-xl border border-stone-200/60 dark:border-slate-700/60 rounded-2xl p-2.5 pointer-events-auto"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0, y: [0, -4, 0] }}
          transition={{ opacity: { delay: 0.5, duration: 0.6 }, x: { delay: 0.5, duration: 0.5 }, y: { delay: 0.9, duration: 5, repeat: Infinity, ease: "easeInOut" } }}
        >
          <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-stone-100 dark:border-slate-800">
            <div className="w-6 h-6 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-sm shrink-0">
              <Calendar size={12} />
            </div>
            <p className="text-[11px] font-bold text-stone-900 dark:text-white leading-none">Weekly Plan</p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-[9px]"><span className="text-emerald-500"><Check size={10}/></span><span className="text-stone-600 dark:text-slate-300">Balanced Macros</span></div>
            <div className="flex items-center gap-1.5 text-[9px]"><span className="text-emerald-500"><Check size={10}/></span><span className="text-stone-600 dark:text-slate-300">Under Budget</span></div>
          </div>
        </motion.div>

        {/* ────── Decorative Annotations ────── */}
        <motion.div
          className="absolute right-[12px] bottom-[30%] pointer-events-none z-10"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <p className="text-emerald-800 dark:text-emerald-400 text-[11px] font-black leading-tight" style={{ fontFamily: "cursive" }}>Track Your Goals</p>
          <svg width="24" height="14" viewBox="0 0 24 14" fill="none" className="mt-0.5 text-emerald-600 opacity-60">
            <path d="M2 7 C6 2, 18 2, 22 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M18 4 L22 7 L18 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </motion.div>

      </div>
    </div>
  );
}
`;
  code = code.substring(0, startIdx) + replacement + code.substring(endIdx);
  fs.writeFileSync(file, code, 'utf8');
  console.log('Successfully replaced Slide2Visual!');
} else {
  console.log('Could not find start/end bounds!');
}

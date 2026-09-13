const fs = require('fs');
const file = 'c:/Main-Projects/recipe-generator-client/src/components/Banner.tsx';
let code = fs.readFileSync(file, 'utf8');

const startIdx = code.indexOf('function Slide1Visual() { // hero2.png - "Your Personal AI Food Assistant"');
const endIdx = code.indexOf('function Slide2Visual() { // hero3.png - App Interface');

if (startIdx !== -1 && endIdx !== -1) {
  const replacement = `function Slide1Visual() { // hero2.png — "Your Personal AI Food Assistant"
  const weekMeals = [
    { day: "Mon", meal: "Herb Chicken Bowl", cost: "$4.50" },
    { day: "Tue", meal: "Veggie Pasta",       cost: "$3.20" },
    { day: "Wed", meal: "Lemon Salmon",       cost: "$6.80" },
  ];

  return (
    // We render on xl+ only; within the 6-col right grid space we create a self-contained
    // composition using a single relative container with known width, so all cards are
    // positioned relative to THAT container, not the whole viewport.
    <div className="relative w-full h-full pointer-events-none hidden xl:flex items-center justify-end pr-4 2xl:pr-8">

      {/* ── Fixed-width composition container ── */}
      <div className="relative w-[560px] xl:w-[600px] 2xl:w-[640px] h-full flex items-center justify-center">

        {/* ────── Central Phone Card ────── */}
        <motion.div
          className="relative z-20 w-[220px] bg-white dark:bg-slate-900 rounded-[28px] shadow-2xl border-2 border-stone-200/50 dark:border-slate-700/50 overflow-hidden flex flex-col pointer-events-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{ opacity: { delay: 0.25, duration: 0.6 }, y: { delay: 0.8, duration: 5, repeat: Infinity, ease: "easeInOut" } }}
        >
          {/* App header */}
          <div className="px-4 pt-3 pb-2 bg-white dark:bg-slate-900 flex justify-between items-center border-b border-stone-100 dark:border-slate-800">
            <div className="flex flex-col">
              <span className="text-[8px] text-stone-400 font-medium">Good Morning 👋</span>
              <span className="text-[13px] font-black text-stone-800 dark:text-white leading-tight">FoodCanvas</span>
            </div>
            <div className="flex items-center gap-2">
              <Bell size={13} className="text-stone-400" />
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-[11px]">A</div>
            </div>
          </div>

          {/* Search */}
          <div className="px-3 py-2 bg-stone-50 dark:bg-slate-950">
            <div className="relative">
              <input readOnly placeholder="Search recipes, ingredients…"
                className="w-full bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl py-2 pl-7 pr-3 text-[10px] shadow-sm pointer-events-none placeholder-stone-400" />
              <Search size={10} className="absolute left-2.5 top-[9px] text-stone-400" />
            </div>
          </div>

          {/* Feature 2×2 tiles */}
          <div className="px-3 pt-1 pb-2 grid grid-cols-2 gap-1.5 bg-stone-50 dark:bg-slate-950">
            <div className="bg-emerald-600 rounded-xl p-2.5 text-white shadow-sm">
              <Refrigerator size={13} className="mb-1 opacity-90" />
              <p className="text-[9px] font-bold leading-snug">Ingredient Rescue</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-2.5 border border-stone-200 dark:border-slate-700 shadow-sm">
              <Calendar size={13} className="mb-1 text-indigo-500" />
              <p className="text-[9px] font-bold text-stone-700 dark:text-slate-200 leading-snug">Meal Planner</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-2.5 border border-stone-200 dark:border-slate-700 shadow-sm">
              <ShoppingBasket size={13} className="mb-1 text-teal-600" />
              <p className="text-[9px] font-bold text-stone-700 dark:text-slate-200 leading-snug">Smart List</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-2.5 border border-stone-200 dark:border-slate-700 shadow-sm">
              <Activity size={13} className="mb-1 text-orange-500" />
              <p className="text-[9px] font-bold text-stone-700 dark:text-slate-200 leading-snug">Nutrition</p>
            </div>
          </div>

          {/* Today's nutrition card */}
          <div className="px-3 pb-3 bg-stone-50 dark:bg-slate-950">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-2.5 border border-stone-100 dark:border-slate-700 shadow-sm">
              <div className="flex justify-between items-center mb-1.5">
                <p className="text-[10px] font-bold text-stone-800 dark:text-white">Today's Nutrition</p>
                <span className="text-[8px] text-orange-500 font-bold bg-orange-50 dark:bg-orange-900/20 px-1.5 py-0.5 rounded-full">1,450 kcal</span>
              </div>
              <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-stone-100 dark:bg-slate-700 mb-1">
                <div className="w-[45%] bg-rose-400" /><div className="w-[35%] bg-amber-400" /><div className="w-[20%] bg-emerald-400" />
              </div>
              <div className="flex justify-between text-[8px] text-stone-400 mb-2">
                <span>Carbs 45%</span><span>Protein 35%</span><span>Fat 20%</span>
              </div>
              {/* Mini meal row */}
              <div className="flex items-center gap-2 pt-2 border-t border-stone-100 dark:border-slate-700">
                <div className="w-7 h-7 rounded-lg overflow-hidden bg-stone-200 dark:bg-slate-700 shrink-0">
                  <img src="/hero2.png" alt="Meal" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-bold text-stone-800 dark:text-white truncate">Grilled Chicken Bowl</p>
                  <p className="text-[8px] text-emerald-600 font-medium">480 kcal · Healthy</p>
                </div>
                <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <Check size={8} className="text-emerald-700" strokeWidth={3} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ────── Weekly Plan Card — top-left of phone ────── */}
        <motion.div
          className="absolute left-[10px] top-[8%] z-30 w-[175px] bg-white/92 dark:bg-slate-900/92 backdrop-blur-md shadow-xl border border-stone-200/60 dark:border-slate-700/60 rounded-2xl p-3 pointer-events-auto"
          initial={{ opacity: 0, x: -16, y: 12 }}
          animate={{ opacity: 1, x: 0, y: [0, -5, 0] }}
          transition={{ opacity: { delay: 0.5, duration: 0.6 }, x: { delay: 0.5, duration: 0.5 }, y: { delay: 1.0, duration: 5.5, repeat: Infinity, ease: "easeInOut" } }}
        >
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-stone-100 dark:border-slate-800">
            <div className="w-6 h-6 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-sm shrink-0">
              <Calendar size={12} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-stone-900 dark:text-white leading-none">Weekly Plan</p>
              <p className="text-[9px] text-stone-400">Budget: $38</p>
            </div>
          </div>
          <div className="space-y-1.5">
            {weekMeals.map((m, i) => (
              <div key={i} className="flex items-center gap-1 text-[9px]">
                <span className="text-stone-400 font-semibold w-6">{m.day}</span>
                <span className="text-stone-700 dark:text-slate-200 font-semibold flex-1 truncate">{m.meal}</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-1 py-0.5 rounded text-[8px] shrink-0">{m.cost}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ────── AI Ingredient Rescue — left, upper-mid ────── */}
        <motion.div
          className="absolute left-[0px] top-[38%] z-30 w-[180px] bg-white/92 dark:bg-slate-900/92 backdrop-blur-md shadow-xl border border-stone-200/60 dark:border-slate-700/60 rounded-2xl p-3 pointer-events-auto"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0, y: [0, 5, 0] }}
          transition={{ opacity: { delay: 0.65, duration: 0.6 }, x: { delay: 0.65, duration: 0.5 }, y: { delay: 1.1, duration: 6, repeat: Infinity, ease: "easeInOut" } }}
        >
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shrink-0">
              <Refrigerator size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-stone-900 dark:text-white leading-tight mb-0.5">AI Ingredient Rescue</p>
              <p className="text-[10px] text-stone-500 dark:text-slate-400 leading-snug">Turn pantry & leftovers into delicious meals.</p>
            </div>
            <ChevronRight size={12} className="text-stone-300 dark:text-slate-600 shrink-0 mt-0.5" />
          </div>
        </motion.div>

        {/* ────── Smart Shopping List — left, lower ────── */}
        <motion.div
          className="absolute left-[12px] bottom-[16%] z-30 w-[180px] bg-white/92 dark:bg-slate-900/92 backdrop-blur-md shadow-xl border border-stone-200/60 dark:border-slate-700/60 rounded-2xl p-3 pointer-events-auto"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0, y: [0, -5, 0] }}
          transition={{ opacity: { delay: 0.8, duration: 0.6 }, x: { delay: 0.8, duration: 0.5 }, y: { delay: 1.2, duration: 5.5, repeat: Infinity, ease: "easeInOut" } }}
        >
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm shrink-0">
              <ShoppingBasket size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-stone-900 dark:text-white leading-tight mb-0.5">Smart Shopping List</p>
              <p className="text-[10px] text-stone-500 dark:text-slate-400 leading-snug">Get everything you need within your budget.</p>
            </div>
            <ChevronRight size={12} className="text-stone-300 dark:text-slate-600 shrink-0 mt-0.5" />
          </div>
        </motion.div>

        {/* ────── AI Meal Planner — right, upper ────── */}
        <motion.div
          className="absolute right-[0px] top-[20%] z-30 w-[175px] bg-white/92 dark:bg-slate-900/92 backdrop-blur-md shadow-xl border border-stone-200/60 dark:border-slate-700/60 rounded-2xl p-3 pointer-events-auto"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0, y: [0, -5, 0] }}
          transition={{ opacity: { delay: 0.7, duration: 0.6 }, x: { delay: 0.7, duration: 0.5 }, y: { delay: 1.15, duration: 6.5, repeat: Infinity, ease: "easeInOut" } }}
        >
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shrink-0">
              <Calendar size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-stone-900 dark:text-white leading-tight mb-0.5">AI Meal Planner</p>
              <p className="text-[10px] text-stone-500 dark:text-slate-400 leading-snug">Plan your weekly meals with your budget.</p>
            </div>
            <ChevronRight size={12} className="text-stone-300 dark:text-slate-600 shrink-0 mt-0.5" />
          </div>
        </motion.div>

        {/* ────── Nutrition Analyzer — right, lower ────── */}
        <motion.div
          className="absolute right-[8px] bottom-[18%] z-30 w-[175px] bg-white/92 dark:bg-slate-900/92 backdrop-blur-md shadow-xl border border-stone-200/60 dark:border-slate-700/60 rounded-2xl p-3 pointer-events-auto"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0, y: [0, 5, 0] }}
          transition={{ opacity: { delay: 0.9, duration: 0.6 }, x: { delay: 0.9, duration: 0.5 }, y: { delay: 1.3, duration: 5, repeat: Infinity, ease: "easeInOut" } }}
        >
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-sm shrink-0">
              <Activity size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-stone-900 dark:text-white leading-tight mb-0.5">Nutrition Analyzer</p>
              <p className="text-[10px] text-stone-500 dark:text-slate-400 leading-snug">Know what you eat, track your goals.</p>
            </div>
            <ChevronRight size={12} className="text-stone-300 dark:text-slate-600 shrink-0 mt-0.5" />
          </div>
        </motion.div>

        {/* ────── Handwritten: "Less Food Waste" ────── */}
        <motion.div
          className="absolute left-[12px] bottom-[40%] pointer-events-none z-10"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <p className="text-emerald-800 dark:text-emerald-400 text-[11px] font-black leading-tight" style={{ fontFamily: "cursive" }}>Less</p>
          <p className="text-emerald-800 dark:text-emerald-400 text-[11px] font-black leading-tight" style={{ fontFamily: "cursive" }}>Food Waste</p>
          <svg width="26" height="14" viewBox="0 0 26 14" fill="none" className="mt-0.5 text-emerald-600 opacity-60">
            <path d="M2 7 C7 2, 19 2, 24 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M20 4.5 L24 7 L20 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </motion.div>

        {/* ────── Handwritten: "Plan · Save · Enjoy" ────── */}
        <motion.div
          className="absolute right-[8px] bottom-[40%] pointer-events-none z-10"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          <p className="text-emerald-700 dark:text-emerald-400 text-[10px] font-black" style={{ fontFamily: "cursive" }}>Plan · Save · Enjoy</p>
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none" className="mt-0.5 text-emerald-500 opacity-60">
            <path d="M2 6 C5 2, 17 2, 20 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M16 3.5 L20 6 L16 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </motion.div>

      </div>{/* end composition container */}
    </div>
  );\n}\n\n`;
  code = code.substring(0, startIdx) + replacement + code.substring(endIdx);
  fs.writeFileSync(file, code, 'utf8');
  console.log('Successfully replaced Slide1Visual!');
} else {
  console.log('Could not find start/end bounds!');
}

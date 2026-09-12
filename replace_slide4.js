const fs = require('fs');
const file = 'c:/Main-Projects/recipe-generator-client/src/components/Banner.tsx';
let code = fs.readFileSync(file, 'utf8');

// Replace SLIDES[3]
const slidesStart = code.indexOf('{', code.indexOf('id: 3,'));
const slidesEnd = code.indexOf('},', slidesStart) + 1;

if (slidesStart !== -1 && slidesEnd !== -1) {
  const newSlide3 = `{
    id: 3,
    badge: "Good Food. Better You.",
    headline: ["Cook Smarter.", "Eat Healthier.", "With FoodCanvas."],
    headlineHighlight: -1,
    sub: "Your personal AI-powered food assistant. Plan, cook, track and enjoy better meals — every day.",
    ctaPrimary: { label: "Start Cooking →", href: "/ai-tools" },
    ctaSecondary: { label: "Explore Features", href: "/recipes" },
    accentColor: "emerald",
    bgImage: "/hero4.png",
    bgPos: "center",
  }`;
  // Let's do a more robust string replacement for the array item to not mess up indices
  code = code.replace(/\{\s*id:\s*3,[\s\S]*?bgPos:\s*"[^"]*",?\s*\}/, newSlide3);
}

// Replace Slide3Visual
const s3vStart = code.indexOf('function Slide3Visual() { // hero4.png - Recipe Detail / Nutrition');
const s3vEnd = code.indexOf('// Just a quick icon for the button above');

if (s3vStart !== -1 && s3vEnd !== -1) {
  const replacement = `function Slide3Visual() { // hero4.png - Flavor Pairing
  return (
    <div className="relative w-full h-full pointer-events-none hidden xl:flex items-center justify-end pr-4 2xl:pr-8">
      
      {/* ── Fixed-width composition container ── */}
      <div className="relative w-[560px] xl:w-[600px] 2xl:w-[640px] h-full flex items-center justify-center">

        {/* ────── Main Large Card: Flavor Pairing ────── */}
        <motion.div
          className="relative z-30 w-[300px] bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl border-[3px] border-stone-100/80 dark:border-slate-700/50 p-6 pointer-events-auto flex flex-col mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{ opacity: { delay: 0.25, duration: 0.6 }, y: { delay: 0.8, duration: 6, repeat: Infinity, ease: "easeInOut" } }}
        >
          <h3 className="text-[18px] font-black text-stone-900 dark:text-white mb-2 leading-tight">Flavor Pairing</h3>
          <p className="text-[11px] text-stone-500 dark:text-slate-400 mb-6 leading-relaxed">
            Discover Perfect Ingredient and Flavor Combinations. Get AI-powered pairing suggestions to elevate your dishes.
          </p>

          {/* Radar Visualization Area */}
          <div className="relative w-full aspect-square bg-stone-50 dark:bg-slate-950 rounded-2xl mb-5 flex items-center justify-center overflow-hidden border border-stone-100 dark:border-slate-800 shadow-inner">
            
            {/* The Radar SVG */}
            <div className="w-[140px] h-[140px] relative">
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                {/* Background Web */}
                {[25, 50, 75, 100].map((r, i) => (
                  <circle key={i} cx="50" cy="50" r={r/2} fill="none" stroke="currentColor" className="text-stone-200 dark:text-slate-800" strokeWidth="0.5" />
                ))}
                {/* Axes */}
                {[0, 60, 120, 180, 240, 300].map((deg) => (
                  <line key={deg} x1="50" y1="50" x2={50 + 50 * Math.sin(deg * Math.PI / 180)} y2={50 - 50 * Math.cos(deg * Math.PI / 180)} stroke="currentColor" className="text-stone-200 dark:text-slate-800" strokeWidth="0.5" />
                ))}
                
                {/* Purple Shape */}
                <polygon 
                  points="50,15 85,35 75,75 25,85 10,40" 
                  fill="rgba(168, 85, 247, 0.25)" 
                  stroke="#a855f7" 
                  strokeWidth="2" 
                  strokeLinejoin="round" 
                />
                
                {/* Data Points */}
                <circle cx="50" cy="15" r="3" fill="#a855f7" />
                <circle cx="85" cy="35" r="3" fill="#a855f7" />
                <circle cx="75" cy="75" r="3" fill="#a855f7" />
                <circle cx="25" cy="85" r="3" fill="#a855f7" />
                <circle cx="10" cy="40" r="3" fill="#a855f7" />
              </svg>
            </div>
            
            {/* Floating Labels around radar */}
            <span className="absolute top-2 text-[8px] font-bold text-stone-600 dark:text-slate-300">Spicy</span>
            <span className="absolute right-1 top-[35%] text-[8px] font-bold text-stone-600 dark:text-slate-300">Umami</span>
            <span className="absolute right-4 bottom-2 text-[8px] font-bold text-stone-600 dark:text-slate-300">Balsamic</span>
            <span className="absolute left-4 bottom-2 text-[8px] font-bold text-stone-600 dark:text-slate-300">Earthy</span>
            <span className="absolute left-2 top-[35%] text-[8px] font-bold text-stone-600 dark:text-slate-300">Floral</span>
          </div>

          {/* Pairing Suggestions */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-500/10 px-3 py-2 rounded-xl border border-purple-100 dark:border-purple-800/50">
               <span className="w-4 h-4 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 text-[10px] font-bold">1</span>
               <span className="text-[12px] font-bold text-stone-800 dark:text-white">Lemon & Dill</span>
            </div>
            <div className="flex items-center gap-2 bg-stone-50 dark:bg-slate-800 px-3 py-2 rounded-xl">
               <span className="w-4 h-4 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 text-[10px] font-bold">2</span>
               <span className="text-[12px] font-medium text-stone-600 dark:text-slate-300">Chili & Lime</span>
            </div>
            <div className="flex items-center gap-2 bg-stone-50 dark:bg-slate-800 px-3 py-2 rounded-xl">
               <span className="w-4 h-4 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 text-[10px] font-bold">3</span>
               <span className="text-[12px] font-medium text-stone-600 dark:text-slate-300">Basil & Balsamic</span>
            </div>
          </div>
        </motion.div>


        {/* ────── Decorative Food/Leaf Elements ────── */}
        
        {/* Top Center Leaf */}
        <motion.div
          className="absolute left-[35%] top-[10%] z-40"
          initial={{ opacity: 0, scale: 0, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: [-20, -15, -20], y: [0, 8, 0] }}
          transition={{ opacity: { delay: 0.6, duration: 0.5 }, scale: { delay: 0.6, duration: 0.5 }, y: { delay: 1, duration: 7, repeat: Infinity, ease: "easeInOut" }, rotate: { delay: 1, duration: 8, repeat: Infinity, ease: "easeInOut" } }}
        >
           {/* Recreating a leaf shape using SVG */}
           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-emerald-500 opacity-90 drop-shadow-lg">
             <path d="M12 2C7 2 3 6 3 11C3 18 12 22 12 22C12 22 21 18 21 11C21 6 17 2 12 2Z" fill="currentColor" />
             <path d="M12 22V11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
           </svg>
        </motion.div>
        
        {/* Upper Center Subtle Leaf */}
        <motion.div
          className="absolute left-[50%] top-[20%] z-20"
          initial={{ opacity: 0, scale: 0, rotate: 45 }}
          animate={{ opacity: 1, scale: 0.7, rotate: [45, 55, 45], y: [0, -6, 0] }}
          transition={{ opacity: { delay: 0.7, duration: 0.5 }, scale: { delay: 0.7, duration: 0.5 }, y: { delay: 1.2, duration: 6, repeat: Infinity, ease: "easeInOut" }, rotate: { delay: 1.2, duration: 9, repeat: Infinity, ease: "easeInOut" } }}
        >
           <svg width="30" height="30" viewBox="0 0 24 24" fill="none" className="text-emerald-600 opacity-80 drop-shadow-md">
             <path d="M12 2C7 2 3 6 3 11C3 18 12 22 12 22C12 22 21 18 21 11C21 6 17 2 12 2Z" fill="currentColor" />
           </svg>
        </motion.div>

        {/* Center Small Tomato */}
        <motion.div
          className="absolute left-[30%] top-[50%] z-40"
          initial={{ opacity: 0, scale: 0, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{ opacity: { delay: 0.8, duration: 0.5 }, scale: { delay: 0.8, duration: 0.5 }, y: { delay: 1.4, duration: 5, repeat: Infinity, ease: "easeInOut" } }}
        >
           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-red-600 shadow-xl border border-rose-300 relative overflow-hidden flex items-center justify-center">
             <div className="w-3 h-3 bg-white/20 rounded-full absolute top-2 right-2 blur-[1px]"></div>
             {/* Little green stem */}
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="absolute top-[-2px] text-green-700">
               <path d="M12 2L12 8M12 8L8 6M12 8L16 6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
             </svg>
           </div>
        </motion.div>
        
        {/* Left-Center Leaf */}
        <motion.div
          className="absolute left-[10%] top-[45%] z-40"
          initial={{ opacity: 0, scale: 0, rotate: -70 }}
          animate={{ opacity: 1, scale: 1.2, rotate: [-70, -60, -70], x: [0, -5, 0] }}
          transition={{ opacity: { delay: 0.85, duration: 0.5 }, scale: { delay: 0.85, duration: 0.5 }, x: { delay: 1.5, duration: 6.5, repeat: Infinity, ease: "easeInOut" }, rotate: { delay: 1.5, duration: 7.5, repeat: Infinity, ease: "easeInOut" } }}
        >
           <svg width="45" height="45" viewBox="0 0 24 24" fill="none" className="text-emerald-400 opacity-95 drop-shadow-xl">
             <path d="M12 2C7 2 3 6 3 11C3 18 12 22 12 22C12 22 21 18 21 11C21 6 17 2 12 2Z" fill="currentColor" />
             <path d="M12 22V11" stroke="white" strokeWidth="1" strokeLinecap="round" />
           </svg>
        </motion.div>

        {/* Lower Center-Left Lemon */}
        <motion.div
          className="absolute left-[15%] bottom-[25%] z-40"
          initial={{ opacity: 0, scale: 0, rotate: 15 }}
          animate={{ opacity: 1, scale: 1, rotate: [15, 25, 15], y: [0, -8, 0] }}
          transition={{ opacity: { delay: 0.95, duration: 0.5 }, scale: { delay: 0.95, duration: 0.5 }, y: { delay: 1.3, duration: 6, repeat: Infinity, ease: "easeInOut" }, rotate: { delay: 1.3, duration: 8, repeat: Infinity, ease: "easeInOut" } }}
        >
           <div className="w-14 h-12 rounded-[50%] bg-gradient-to-br from-yellow-200 to-yellow-500 shadow-xl border border-yellow-200 relative overflow-hidden transform rotate-[-10deg]">
             {/* Pores */}
             <div className="absolute w-1 h-1 bg-yellow-600/30 rounded-full top-3 left-4"></div>
             <div className="absolute w-1 h-1 bg-yellow-600/30 rounded-full top-5 left-8"></div>
             <div className="absolute w-1.5 h-1.5 bg-yellow-600/20 rounded-full top-8 left-3"></div>
             <div className="absolute w-1 h-1 bg-yellow-600/30 rounded-full top-7 left-10"></div>
             {/* Highlight */}
             <div className="absolute w-6 h-3 bg-white/40 rounded-full top-2 left-2 rotate-[20deg] blur-[2px]"></div>
           </div>
        </motion.div>

        {/* Upper Right Leaf */}
        <motion.div
          className="absolute right-[8%] top-[15%] z-40"
          initial={{ opacity: 0, scale: 0, rotate: 60 }}
          animate={{ opacity: 1, scale: 0.9, rotate: [60, 70, 60], y: [0, -10, 0] }}
          transition={{ opacity: { delay: 0.75, duration: 0.5 }, scale: { delay: 0.75, duration: 0.5 }, y: { delay: 1.1, duration: 7, repeat: Infinity, ease: "easeInOut" }, rotate: { delay: 1.1, duration: 9, repeat: Infinity, ease: "easeInOut" } }}
        >
           <svg width="35" height="35" viewBox="0 0 24 24" fill="none" className="text-emerald-500 opacity-90 drop-shadow-lg">
             <path d="M12 2C7 2 3 6 3 11C3 18 12 22 12 22C12 22 21 18 21 11C21 6 17 2 12 2Z" fill="currentColor" />
           </svg>
        </motion.div>

        {/* Right Side Leaf (near card) */}
        <motion.div
          className="absolute right-[0%] top-[45%] z-40"
          initial={{ opacity: 0, scale: 0, rotate: 110 }}
          animate={{ opacity: 1, scale: 0.8, rotate: [110, 100, 110], x: [0, 8, 0] }}
          transition={{ opacity: { delay: 0.9, duration: 0.5 }, scale: { delay: 0.9, duration: 0.5 }, x: { delay: 1.4, duration: 6, repeat: Infinity, ease: "easeInOut" }, rotate: { delay: 1.4, duration: 8, repeat: Infinity, ease: "easeInOut" } }}
        >
           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-emerald-600 opacity-90 drop-shadow-xl">
             <path d="M12 2C7 2 3 6 3 11C3 18 12 22 12 22C12 22 21 18 21 11C21 6 17 2 12 2Z" fill="currentColor" />
             <path d="M12 22V11" stroke="white" strokeWidth="1" strokeLinecap="round" />
           </svg>
        </motion.div>

        {/* Lower Right Leaf (partially cropped visually) */}
        <motion.div
          className="absolute right-[-5%] bottom-[15%] z-40"
          initial={{ opacity: 0, scale: 0, rotate: -40 }}
          animate={{ opacity: 1, scale: 1.3, rotate: [-40, -30, -40], y: [0, 5, 0] }}
          transition={{ opacity: { delay: 1.0, duration: 0.5 }, scale: { delay: 1.0, duration: 0.5 }, y: { delay: 1.6, duration: 7, repeat: Infinity, ease: "easeInOut" }, rotate: { delay: 1.6, duration: 9, repeat: Infinity, ease: "easeInOut" } }}
        >
           <svg width="50" height="50" viewBox="0 0 24 24" fill="none" className="text-emerald-700 opacity-95 drop-shadow-2xl">
             <path d="M12 2C7 2 3 6 3 11C3 18 12 22 12 22C12 22 21 18 21 11C21 6 17 2 12 2Z" fill="currentColor" />
           </svg>
        </motion.div>

      </div>
    </div>
  );
}
`;
  code = code.substring(0, s3vStart) + replacement + code.substring(s3vEnd);
}

fs.writeFileSync(file, code, 'utf8');
console.log('Successfully replaced Slide3Visual!');

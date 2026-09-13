const fs = require('fs');
const file = 'c:/Main-Projects/recipe-generator-client/src/components/Banner.tsx';
let code = fs.readFileSync(file, 'utf8');

const s3vStart = code.indexOf('function Slide3Visual() { // hero4.png - Flavor Pairing');
const s3vEnd = code.indexOf('// Just a quick icon for the button above', s3vStart);

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
        {/* We use opaque, highly detailed SVGs to completely cover the blue/teal blobs from the background image */}
        
        {/* TOP AREA (Replaces top dots/blobs) */}
        <motion.div
          className="absolute left-[35%] top-[10%] z-40"
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: [-10, -5, -10], y: [0, 6, 0] }}
          transition={{ opacity: { delay: 0.6, duration: 0.5 }, y: { delay: 1, duration: 6, repeat: Infinity, ease: "easeInOut" }, rotate: { delay: 1, duration: 8, repeat: Infinity, ease: "easeInOut" } }}
        >
           {/* Large Basil Leaf 1 */}
           <svg width="60" height="60" viewBox="0 0 24 24" fill="none" className="text-green-700 drop-shadow-[0_8px_8px_rgba(0,0,0,0.25)]">
             <path d="M12 2C6 2 2 7 2 12C2 18 12 22 12 22C12 22 22 18 22 12C22 7 18 2 12 2Z" fill="currentColor" />
             <path d="M12 22V12" stroke="#4ade80" strokeWidth="1" strokeLinecap="round" />
           </svg>
        </motion.div>
        
        <motion.div
          className="absolute left-[40%] top-[8%] z-30"
          initial={{ opacity: 0, scale: 0.8, rotate: 45 }}
          animate={{ opacity: 1, scale: 0.8, rotate: [45, 50, 45], y: [0, -4, 0] }}
          transition={{ opacity: { delay: 0.7, duration: 0.5 }, y: { delay: 1.2, duration: 5, repeat: Infinity, ease: "easeInOut" }, rotate: { delay: 1.2, duration: 7, repeat: Infinity, ease: "easeInOut" } }}
        >
           {/* Secondary top leaf, slightly blurred for depth */}
           <svg width="45" height="45" viewBox="0 0 24 24" fill="none" className="text-green-600 drop-shadow-md blur-[1px]">
             <path d="M12 2C7 2 3 6 3 11C3 18 12 22 12 22C12 22 21 18 21 11C21 6 17 2 12 2Z" fill="currentColor" />
           </svg>
        </motion.div>

        {/* AROUND THE TOMATO (Replaces teal circle near tomato) */}
        <motion.div
          className="absolute left-[30%] top-[48%] z-40"
          initial={{ opacity: 0, scale: 0.8, rotate: 20 }}
          animate={{ opacity: 1, scale: 1, rotate: [20, 25, 20], y: [0, -5, 0] }}
          transition={{ opacity: { delay: 0.8, duration: 0.5 }, y: { delay: 1.4, duration: 5.5, repeat: Infinity, ease: "easeInOut" }, rotate: { delay: 1.4, duration: 8, repeat: Infinity, ease: "easeInOut" } }}
        >
           {/* Beautiful fresh basil leaf covering the blob */}
           <svg width="55" height="55" viewBox="0 0 24 24" fill="none" className="text-green-700 drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)]">
             <path d="M12 2C7 2 3 6 3 11C3 18 12 22 12 22C12 22 21 18 21 11C21 6 17 2 12 2Z" fill="currentColor" />
             <path d="M12 22V11" stroke="#22c55e" strokeWidth="1" strokeLinecap="round" />
           </svg>
        </motion.div>
        
        {/* ABOVE / BESIDE THE FOOD BOWL */}
        <motion.div
          className="absolute left-[50%] top-[30%] z-40"
          initial={{ opacity: 0, scale: 0.8, rotate: -40 }}
          animate={{ opacity: 1, scale: 1, rotate: [-40, -35, -40], x: [0, 4, 0] }}
          transition={{ opacity: { delay: 0.85, duration: 0.5 }, x: { delay: 1.5, duration: 6, repeat: Infinity, ease: "easeInOut" }, rotate: { delay: 1.5, duration: 7.5, repeat: Infinity, ease: "easeInOut" } }}
        >
           <svg width="45" height="45" viewBox="0 0 24 24" fill="none" className="text-green-800 drop-shadow-[0_6px_6px_rgba(0,0,0,0.25)]">
             <path d="M12 2C7 2 3 6 3 11C3 18 12 22 12 22C12 22 21 18 21 11C21 6 17 2 12 2Z" fill="currentColor" />
             <path d="M12 22V11" stroke="#4ade80" strokeWidth="0.75" strokeLinecap="round" />
           </svg>
        </motion.div>

        {/* RIGHT SIDE / PAPER BAG (Replaces large teal circle) */}
        <motion.div
          className="absolute right-[5%] top-[15%] z-40"
          initial={{ opacity: 0, scale: 0.8, rotate: 75 }}
          animate={{ opacity: 1, scale: 1.2, rotate: [75, 80, 75], y: [0, -6, 0] }}
          transition={{ opacity: { delay: 0.75, duration: 0.5 }, y: { delay: 1.1, duration: 6.5, repeat: Infinity, ease: "easeInOut" }, rotate: { delay: 1.1, duration: 9, repeat: Infinity, ease: "easeInOut" } }}
        >
           {/* Very large opaque leaf to cover the big teal circle on the paper bag */}
           <svg width="75" height="75" viewBox="0 0 24 24" fill="none" className="text-green-700 drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]">
             <path d="M12 2C6 2 2 7 2 12C2 18 12 22 12 22C12 22 22 18 22 12C22 7 18 2 12 2Z" fill="currentColor" />
             <path d="M12 22V12" stroke="#4ade80" strokeWidth="1" strokeLinecap="round" />
           </svg>
        </motion.div>

        {/* NEAR THE FLAVOR PAIRING CARD (Edges) */}
        <motion.div
          className="absolute right-[-2%] top-[45%] z-20"
          initial={{ opacity: 0, scale: 0.8, rotate: 110 }}
          animate={{ opacity: 1, scale: 0.9, rotate: [110, 105, 110], x: [0, 5, 0] }}
          transition={{ opacity: { delay: 0.9, duration: 0.5 }, x: { delay: 1.4, duration: 6, repeat: Infinity, ease: "easeInOut" } }}
        >
           <svg width="60" height="60" viewBox="0 0 24 24" fill="none" className="text-green-600 opacity-90 drop-shadow-lg blur-[2px]">
             <path d="M12 2C7 2 3 6 3 11C3 18 12 22 12 22C12 22 21 18 21 11C21 6 17 2 12 2Z" fill="currentColor" />
           </svg>
        </motion.div>

        {/* LOWER AREA (Wooden table replacements) */}
        <motion.div
          className="absolute left-[15%] bottom-[20%] z-40"
          initial={{ opacity: 0, scale: 0.8, rotate: -25 }}
          animate={{ opacity: 1, scale: 1, rotate: [-25, -20, -25], y: [0, 4, 0] }}
          transition={{ opacity: { delay: 0.95, duration: 0.5 }, y: { delay: 1.3, duration: 5.5, repeat: Infinity, ease: "easeInOut" } }}
        >
           <svg width="50" height="50" viewBox="0 0 24 24" fill="none" className="text-green-700 drop-shadow-[0_5px_5px_rgba(0,0,0,0.4)]">
             <path d="M12 2C7 2 3 6 3 11C3 18 12 22 12 22C12 22 21 18 21 11C21 6 17 2 12 2Z" fill="currentColor" />
             <path d="M12 22V11" stroke="#22c55e" strokeWidth="0.75" strokeLinecap="round" />
           </svg>
        </motion.div>
        
        {/* Tiny subtle background leaf for depth */}
        <motion.div
          className="absolute left-[25%] bottom-[35%] z-10"
          initial={{ opacity: 0, scale: 0.5, rotate: 15 }}
          animate={{ opacity: 1, scale: 0.5, rotate: [15, 25, 15], y: [0, -3, 0] }}
          transition={{ opacity: { delay: 1.1, duration: 0.5 }, y: { delay: 1.5, duration: 7, repeat: Infinity, ease: "easeInOut" } }}
        >
           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-green-500 blur-[3px]">
             <path d="M12 2C7 2 3 6 3 11C3 18 12 22 12 22C12 22 21 18 21 11C21 6 17 2 12 2Z" fill="currentColor" />
           </svg>
        </motion.div>
        
        {/* Right Lower Edge leaf (partially cropped visually) */}
        <motion.div
          className="absolute right-[10%] bottom-[5%] z-40"
          initial={{ opacity: 0, scale: 0.8, rotate: -40 }}
          animate={{ opacity: 1, scale: 1.3, rotate: [-40, -35, -40], y: [0, 4, 0] }}
          transition={{ opacity: { delay: 1.0, duration: 0.5 }, y: { delay: 1.6, duration: 6.5, repeat: Infinity, ease: "easeInOut" } }}
        >
           <svg width="70" height="70" viewBox="0 0 24 24" fill="none" className="text-green-800 drop-shadow-[0_8px_8px_rgba(0,0,0,0.3)]">
             <path d="M12 2C7 2 3 6 3 11C3 18 12 22 12 22C12 22 21 18 21 11C21 6 17 2 12 2Z" fill="currentColor" />
           </svg>
        </motion.div>

      </div>
    </div>
  );
}
`;
  code = code.substring(0, s3vStart) + replacement + code.substring(s3vEnd);
  fs.writeFileSync(file, code, 'utf8');
  console.log('Successfully refined Slide3Visual decorative elements!');
} else {
  console.log('Could not find start/end bounds!');
}

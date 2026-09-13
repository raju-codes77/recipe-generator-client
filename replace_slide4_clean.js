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
          className="relative z-30 w-[300px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-[32px] shadow-2xl border-[3px] border-stone-100/80 dark:border-slate-700/50 p-6 pointer-events-auto flex flex-col mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -4, 0] }}
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

        {/* Removed all artificial CSS/SVG blobs to let the natural food photography in hero4.png shine! */}

      </div>
    </div>
  );
}
`;
  code = code.substring(0, s3vStart) + replacement + code.substring(s3vEnd);
  fs.writeFileSync(file, code, 'utf8');
  console.log('Successfully cleaned Slide3Visual!');
} else {
  console.log('Could not find start/end bounds!');
}

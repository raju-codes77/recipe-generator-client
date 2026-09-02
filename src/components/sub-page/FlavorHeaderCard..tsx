import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function FlavorHeaderCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-6 sm:p-8 mb-10 overflow-hidden bg-emerald-50/40 dark:bg-gray-900/80 rounded-3xl border border-emerald-100/80 dark:border-gray-800 hover:border-emerald-400 dark:hover:border-emerald-500/50 shadow-sm hover:shadow-xl hover:shadow-emerald-900/10 transition-all duration-300 group"
    >
      <div className="relative z-10 max-w-xl">
        <div className="flex items-center gap-2 mb-3">
          <motion.span
            animate={{ rotate: [0, 12, 0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkles className="w-7 h-7 text-emerald-600" strokeWidth={2.2} />
          </motion.span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Flavor Pairing
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
          Discover perfect ingredient and flavor combinations.
          <br />
          Get AI-powered pairing suggestions to elevate your dishes.
        </p>
      </div>

      {/* Increased container width and height (w-80 h-56 / lg:w-96 lg:h-64) */}
      <div className="relative hidden md:flex items-center justify-center w-80 lg:w-96 h-52 lg:h-60 shrink-0 overflow-visible">
        {/* Soft ambient glow */}
        <div className="absolute right-1/3 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-emerald-400/15 dark:bg-emerald-500/15 blur-2xl pointer-events-none" />
        
        {/* Larger Image with scale override */}
        <img
          src="/images/flavor.png" 
          alt="Flavor Pairing Illustration"
          className="w-full h-full object-contain scale-125 transition-transform duration-500 group-hover:scale-135 relative z-10 drop-shadow-md"
        />
      </div>
    </motion.div>
  );
}
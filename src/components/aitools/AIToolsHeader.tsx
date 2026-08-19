import Image from "next/image";
import { Cpu, Leaf, HeartPulse, Activity } from "lucide-react";

export default function AIToolsHeader() {
  return (
    <div className="relative w-full flex flex-col md:flex-row items-center justify-between py-2 md:py-2 mb-1 overflow-hidden">

      {/* Left Content */}
      <div className="w-full md:w-1/2 z-10 mb-6 md:mb-0 relative">
        <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-bold mb-3">
          <Cpu size={14} />
          <span>AI Tools</span>
        </div>

        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-3">
          <span className="text-green-700 dark:text-green-500">AI-Powered</span> Cooking Assistant
        </h1>

        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed max-w-lg">
          Explore powerful AI tools designed to help users discover recipes, analyze
          nutrition, match flavors, and create personalized cooking experiences.
        </p>
      </div>

      {/* Right Content / Graphics */}
      <div className="w-full md:w-1/2 relative min-h-[140px] md:min-h-[180px] flex items-center justify-center lg:justify-end mt-2 md:mt-0">
        <div className="relative w-full max-w-[380px] aspect-[4/3] md:aspect-[3/2] overflow-hidden">
          <Image
            src="/aiHeader2.png"
            alt="AI Cooking Assistant Graphic"
            fill
            className="object-contain object-right"
            priority
          />
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { PlayCircle } from "lucide-react";

export default function MyChallenges() {
  return (
    <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">My Challenges</h3>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700/50 p-6 flex flex-col md:flex-row items-center gap-8">
        {/* Active Progress */}
        <div className="w-full md:w-1/2 flex gap-4 items-center">
           <Image
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80"
            alt="Challenge"
            width={100}
            height={100}
            className="w-24 h-24 rounded-xl object-cover"
          />
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-2">
              <PlayCircle size={12} /> In Progress
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2">7-Day Healthy Eating</h4>
            
            {/* Progress Bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 mb-1">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <div className="flex justify-between text-[10px] font-medium text-slate-500">
              <span>Day 3 of 7</span>
              <span>45%</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-24 bg-slate-100 dark:bg-slate-700"></div>

        {/* Call to action */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            You&apos;re doing great! Log your meal for Day 4.
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg text-sm transition-colors shadow-sm shadow-green-600/20">
            Submit Entry
          </button>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { CheckCircle, Trophy } from "lucide-react";

export default function CompletedChallenges() {
  const completed = [
    {
      id: 1,
      title: "Vegan Week Challenge",
      desc: "A full week of delicious and healthy plant-based meals.",
      img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80",
      winner: "Sarah Ahmed",
      participants: "3.2K",
    },
    {
      id: 2,
      title: "Zero Waste Cooking",
      desc: "Creative ways to use kitchen scraps and reduce food waste.",
      img: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=500&auto=format&fit=crop&q=80",
      winner: "Healthy Bites",
      participants: "1.9K",
    },
  ];

  return (
    <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Completed Challenges</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {completed.map((c) => (
          <div key={c.id} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700/50 flex group">
            
            {/* Image (Left) */}
            <div className="relative w-2/5 min-w-[120px] h-full overflow-hidden">
              <Image
                src={c.img}
                alt={c.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-slate-900/20"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-slate-800/90 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
              </div>
            </div>

            {/* Content (Right) */}
            <div className="p-5 flex-1 flex flex-col justify-center">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">{c.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                {c.desc}
              </p>
              
              <div className="bg-orange-50 dark:bg-orange-950/30 p-2.5 rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
                  <Trophy size={14} className="text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">Winner</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{c.winner}</p>
                </div>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}

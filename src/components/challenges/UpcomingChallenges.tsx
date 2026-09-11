import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { Challenge } from "@/types/challenge";

export default function UpcomingChallenges({ challenges = [] }: { challenges?: Challenge[] }) {
  if (challenges.length === 0) return null;

  return (
    <div className="mb-10">
      <div className="flex justify-between items-end mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Upcoming Challenges</h3>
        <Link href="/challenges?tab=upcoming" className="text-sm font-semibold text-green-600 hover:text-green-700">View All</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {challenges.map((c) => (
          <Link href={`/challenges/${c.id}`} key={c.id} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700/50 flex group hover:shadow-md transition-shadow">
            
            {/* Image (Left) */}
            <div className="relative w-1/3 min-w-[100px] h-full overflow-hidden">
              <Image
                src={c.coverImage || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80"}
                alt={c.title}
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content (Right) */}
            <div className="p-4 flex-1">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">
                <Calendar size={12} />
                <span>Starts Soon</span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1 leading-tight">{c.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {c.description}
              </p>
            </div>
            
          </Link>
        ))}
      </div>
    </div>
  );
}

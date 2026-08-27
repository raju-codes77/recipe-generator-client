import Image from "next/image";
import { Calendar } from "lucide-react";

export default function UpcomingChallenges() {
  const upcoming = [
    {
      id: 1,
      title: "Breakfast Bliss Challenge",
      desc: "Kickstart your day with delicious breakfast ideas.",
      img: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&auto=format&fit=crop&q=80",
      startsIn: 3,
    },
    {
      id: 2,
      title: "Summer BBQ Challenge",
      desc: "Fire up the grill and share your best BBQ recipes.",
      img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&auto=format&fit=crop&q=80",
      startsIn: 7,
    },
    {
      id: 3,
      title: "Smoothie Week Challenge",
      desc: "Blend your way to health! Share your best smoothies.",
      img: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&auto=format&fit=crop&q=80",
      startsIn: 12,
    },
  ];

  return (
    <div className="mb-10">
      <div className="flex justify-between items-end mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Upcoming Challenges</h3>
        <a href="#" className="text-sm font-semibold text-green-600 hover:text-green-700">View All</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {upcoming.map((c) => (
          <div key={c.id} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700/50 flex group hover:shadow-md transition-shadow">
            
            {/* Image (Left) */}
            <div className="relative w-1/3 min-w-[100px] h-full overflow-hidden">
              <Image
                src={c.img}
                alt={c.title}
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content (Right) */}
            <div className="p-4 flex-1">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">
                <Calendar size={12} />
                <span>Starts in {c.startsIn} days</span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1 leading-tight">{c.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {c.desc}
              </p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}

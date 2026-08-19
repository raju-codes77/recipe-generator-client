import Image from "next/image";
import { Users, Gift } from "lucide-react";

export default function ActiveChallenges() {
  const challenges = [
    {
      id: 1,
      title: "30-Minute Meals Challenge",
      desc: "Create quick and delicious meals in 30 minutes or less!",
      img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop&q=80",
      daysLeft: 5,
      participants: "1.8K",
    },
    {
      id: 2,
      title: "Healthy Dessert Challenge",
      desc: "Make a healthy dessert that's both tasty and guilt-free.",
      img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=80",
      daysLeft: 3,
      participants: "1.2K",
    },
    {
      id: 3,
      title: "One Pot Wonders",
      desc: "Show us your favorite one-pot meal that's easy and delicious.",
      img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=80",
      daysLeft: 6,
      participants: "2.1K",
    },
    {
      id: 4,
      title: "Global Flavors Challenge",
      desc: "Explore international cuisines and share your global flavors!",
      img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop&q=80",
      daysLeft: 9,
      participants: "1.5K",
    },
  ];

  return (
    <div className="mb-10">
      <div className="flex justify-between items-end mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Active Challenges</h3>
        <a href="#" className="text-sm font-semibold text-green-600 hover:text-green-700">View All</a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {challenges.map((c) => (
          <div key={c.id} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col group hover:shadow-md transition-shadow">
            
            {/* Card Image */}
            <div className="relative w-full h-40 overflow-hidden">
              <Image
                src={c.img}
                alt={c.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <div className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse"></div>
                {c.daysLeft} Days Left
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4 flex flex-col flex-1">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2 line-clamp-1">{c.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed flex-1">
                {c.desc}
              </p>

              <div className="flex items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-300 mb-5">
                <div className="flex items-center gap-1.5">
                  <Users size={14} className="text-slate-400" />
                  <span>{c.participants}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Gift size={14} className="text-green-500" />
                  <span>Win Badges</span>
                </div>
              </div>

              <button className="w-full py-2 border border-green-600 text-green-600 dark:border-green-500 dark:text-green-500 rounded-lg text-sm font-semibold hover:bg-green-50 dark:hover:bg-green-950/30 transition-colors">
                Join Now
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

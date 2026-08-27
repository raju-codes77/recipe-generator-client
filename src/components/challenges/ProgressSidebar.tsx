import Image from "next/image";
import { Heart, Clock, CupSoda, Globe } from "lucide-react";

export default function ProgressSidebar() {
  const leaderboard = [
    { rank: 1, name: "Sarah Ahmed", points: "1,250", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop&q=80" },
    { rank: 2, name: "Riya's Kitchen", points: "980", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&fit=crop&q=80" },
    { rank: 3, name: "Healthy Bites", points: "870", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&fit=crop&q=80" },
    { rank: 4, name: "Foodie Forever", points: "760", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop&q=80" },
    { rank: 5, name: "Spice Lover", points: "640", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&fit=crop&q=80" },
  ];

  const badges = [
    { name: "Healthy Hero", icon: Heart, color: "bg-green-100 text-green-600", border: "border-green-200" },
    { name: "Quick Chef", icon: Clock, color: "bg-orange-100 text-orange-600", border: "border-orange-200" },
    { name: "Dessert Master", icon: CupSoda, color: "bg-purple-100 text-purple-600", border: "border-purple-200" },
    { name: "Global Explorer", icon: Globe, color: "bg-blue-100 text-blue-600", border: "border-blue-200" },
  ];

  return (
    <div className="flex flex-col gap-6">
      
      {/* 1. My Progress Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50">
        <div className="flex justify-between items-end mb-6">
          <h3 className="font-bold text-slate-900 dark:text-white">My Progress</h3>
          <a href="#" className="text-xs font-semibold text-green-600">View All</a>
        </div>
        
        <div className="flex items-center gap-6">
          {/* Circular Progress */}
          <div className="relative w-20 h-20 flex-shrink-0">
            <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
              <path
                className="text-slate-100 dark:text-slate-700"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-green-600"
                strokeDasharray="75, 100"
                strokeWidth="4"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-black text-slate-900 dark:text-white leading-none">4</span>
              <span className="text-[8px] text-slate-500 uppercase tracking-tighter">Challenges<br/>Completed</span>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex flex-col gap-4 flex-1">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Total Participated</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">12</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Badges Earned</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">8</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Recent Badges Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50">
        <div className="flex justify-between items-end mb-6">
          <h3 className="font-bold text-slate-900 dark:text-white">Recent Badges</h3>
          <a href="#" className="text-xs font-semibold text-green-600">View All</a>
        </div>
        
        <div className="flex justify-between items-start gap-2">
          {badges.map((b, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${b.color} ${b.border}`}>
                <b.icon size={20} className="fill-current bg-transparent opacity-80" />
              </div>
              <span className="text-[9px] font-semibold text-slate-600 dark:text-slate-400 text-center max-w-[50px] leading-tight">
                {b.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Leaderboard Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50">
        <div className="flex justify-between items-end mb-6">
          <h3 className="font-bold text-slate-900 dark:text-white">Leaderboard</h3>
          <select className="bg-transparent text-xs text-slate-500 border-none outline-none font-semibold cursor-pointer">
            <option>This Month</option>
            <option>All Time</option>
          </select>
        </div>
        
        <div className="flex flex-col gap-4">
          {leaderboard.map((user) => (
            <div key={user.rank} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                user.rank === 1 ? "bg-amber-100 text-amber-600" :
                user.rank === 2 ? "bg-slate-100 text-slate-600" :
                user.rank === 3 ? "bg-orange-100 text-orange-600" :
                "bg-transparent text-slate-400"
              }`}>
                {user.rank}
              </div>
              <Image src={user.img} alt={user.name} width={32} height={32} className="rounded-full object-cover w-8 h-8" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex-1">{user.name}</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white">{user.points} pts</span>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-6 py-2.5 border border-green-600 text-green-600 dark:border-green-500 dark:text-green-500 rounded-xl text-sm font-semibold hover:bg-green-50 dark:hover:bg-green-950/30 transition-colors">
          View Full Leaderboard
        </button>
      </div>

      {/* 4. Rewards Banner */}
      <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-100 dark:border-green-900/50 relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">Win Exciting Rewards!</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 max-w-[150px] leading-relaxed">
            Complete challenges, earn badges, and win amazing prizes from our partners.
          </p>
          <button className="bg-white dark:bg-slate-800 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-400 px-4 py-1.5 rounded-lg text-xs font-bold hover:shadow-sm">
            Learn More
          </button>
        </div>
        <div className="absolute -right-4 -bottom-4 w-32 h-32 opacity-90">
           <Image
            src="https://cdn-icons-png.flaticon.com/512/4213/4213958.png"
            alt="Gift"
            fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

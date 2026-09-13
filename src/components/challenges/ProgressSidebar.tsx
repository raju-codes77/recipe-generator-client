"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Clock, CupSoda, Globe, Trophy } from "lucide-react";
import { getChallengeProgress, getLeaderboard, getBadges } from "@/lib/challengeApi";
import { authClient } from "@/lib/auth-client";

export default function ProgressSidebar() {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  const [progress, setProgress] = useState({ totalParticipated: 0, completedChallenges: 0, streak: 0, xp: 0 });
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [badges, setBadges] = useState<any[]>([]);

  useEffect(() => {
    // Fetch leaderboard (global) regardless of auth
    getLeaderboard().then(setLeaderboard).catch(() => {});

    // Fetch progress and badges only if authenticated
    if (userId) {
      getChallengeProgress(userId).then(data => {
        if (data) setProgress(data);
      }).catch(() => {});
      
      getBadges(userId).then(data => {
        if (data) setBadges(data);
      }).catch(() => {});
    } else {
      setProgress({ totalParticipated: 0, completedChallenges: 0, streak: 0, xp: 0 });
      setBadges([]);
    }
  }, [userId]);

  // Fallback generic icons since dynamic badges from DB might not have standard icon mapping yet
  const getBadgeIcon = (name: string) => {
    if (name.includes("Hero")) return Heart;
    if (name.includes("Quick")) return Clock;
    if (name.includes("Master")) return CupSoda;
    return Globe;
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* 1. My Progress Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50">
        <div className="flex justify-between items-end mb-6">
          <h3 className="font-bold text-slate-900 dark:text-white">My Progress</h3>
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
                strokeDasharray={`${Math.min(progress.completedChallenges * 10, 100)}, 100`}
                strokeWidth="4"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-black text-slate-900 dark:text-white leading-none">{progress.completedChallenges}</span>
              <span className="text-[8px] text-slate-500 uppercase tracking-tighter">Challenges<br/>Completed</span>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex flex-col gap-4 flex-1">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Total Participated</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{progress.totalParticipated}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Experience Points</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{progress.xp} XP</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Recent Badges Card */}
      {badges.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50">
          <div className="flex justify-between items-end mb-6">
            <h3 className="font-bold text-slate-900 dark:text-white">Recent Badges</h3>
          </div>
          
          <div className="flex justify-start items-start gap-4 flex-wrap">
            {badges.slice(0, 4).map((b, i) => {
              const Icon = getBadgeIcon(b.badge.name);
              return (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center bg-green-100 text-green-600 border-green-200`}>
                    <Icon size={20} className="fill-current bg-transparent opacity-80" />
                  </div>
                  <span className="text-[9px] font-semibold text-slate-600 dark:text-slate-400 text-center max-w-[50px] leading-tight">
                    {b.badge.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Leaderboard Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Trophy size={16} className="text-amber-500" /> Leaderboard
          </h3>
        </div>
        
        <div className="flex flex-col gap-3">
          {leaderboard.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-sm font-semibold text-gray-700 mb-1">No participants yet</p>
              <p className="text-xs text-gray-400 mb-3">Join a challenge to appear on the leaderboard!</p>
              <Link href="/challenges" className="text-xs font-bold text-green-600 hover:text-green-700 underline underline-offset-2">
                Explore Challenges →
              </Link>
            </div>
          ) : (
            leaderboard.map((user, index) => {
              const rank = index + 1;
              // Initials fallback if no avatar image
              const initials = (user.name as string)
                .split(" ")
                .slice(0, 2)
                .map((w: string) => w[0]?.toUpperCase() ?? "")
                .join("");

              const rankStyle =
                rank === 1 ? "bg-amber-100 text-amber-700 ring-1 ring-amber-300" :
                rank === 2 ? "bg-slate-100 text-slate-600 ring-1 ring-slate-300" :
                rank === 3 ? "bg-orange-100 text-orange-600 ring-1 ring-orange-300" :
                "bg-gray-50 text-slate-400";

              return (
                <div key={user.id} className="flex items-center gap-3 py-1">
                  {/* Rank badge */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${rankStyle}`}>
                    {rank <= 3 ? ["🥇","🥈","🥉"][rank - 1] : rank}
                  </div>

                  {/* Avatar */}
                  <div className="relative w-8 h-8 flex-shrink-0">
                    {user.image ? (
                      <Image
                        src={user.image as string}
                        alt={user.name as string}
                        width={32}
                        height={32}
                        className="rounded-full object-cover w-8 h-8 ring-2 ring-white"
                        onError={(e) => {
                          // If image fails to load, hide it — the initials div will show
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold ring-2 ring-white">
                        {initials}
                      </div>
                    )}
                  </div>

                  {/* Name + stats */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-400">{user.completedChallenges} completed</p>
                  </div>

                  {/* XP */}
                  <span className="text-xs font-black text-amber-600 flex-shrink-0">{user.xp ?? 0} XP</span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 4. Rewards Banner */}
      <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-100 dark:border-green-900/50 relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">Win Exciting Rewards!</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 max-w-[150px] leading-relaxed">
            Complete challenges, earn badges, and win amazing prizes from our partners.
          </p>
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

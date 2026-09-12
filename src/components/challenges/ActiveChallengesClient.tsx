"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { getChallenges } from "@/lib/challengeApi";
import { Challenge } from "@/types/challenge";
import { Flame, Clock, ArrowRight, RotateCcw, LogIn, Rocket } from "lucide-react";

// Skeleton loader card
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-44 bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 rounded-md w-3/4" />
        <div className="h-3 bg-gray-100 rounded-md w-full" />
        <div className="h-2.5 bg-gray-100 rounded-full w-full mt-2" />
        <div className="flex gap-3 mt-3">
          <div className="h-8 bg-gray-200 rounded-lg w-24" />
          <div className="h-8 bg-gray-200 rounded-lg w-24" />
        </div>
        <div className="h-10 bg-gray-200 rounded-xl w-full mt-2" />
      </div>
    </div>
  );
}

// Individual active challenge card with progress details
function ActiveChallengeCard({ challenge }: { challenge: Challenge }) {
  const p = challenge.myParticipant;
  if (!p) return null;

  const joinedAt = new Date(p.joinedAt);
  const deadline = new Date(joinedAt.getTime() + p.totalDays * 24 * 60 * 60 * 1000);
  const daysRemaining = Math.max(0, Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

  const difficultyColors: Record<string, string> = {
    Beginner: "bg-emerald-100 text-emerald-700",
    Intermediate: "bg-amber-100 text-amber-700",
    Advanced: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-300">
      {/* Cover Image */}
      <div className="relative h-44 w-full flex-shrink-0">
        <Image
          src={challenge.coverImage || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80"}
          alt={challenge.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${difficultyColors[challenge.difficulty] ?? "bg-gray-100 text-gray-700"}`}>
          {challenge.difficulty}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 leading-snug mb-1">{challenge.title}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">{challenge.description}</p>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1.5">
            <span>Progress</span>
            <span className="text-green-700 font-bold">{p.completedDays} / {p.totalDays} days</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-400 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${p.completionPercentage}%` }}
            />
          </div>
          <p className="text-right text-xs font-bold text-green-600 mt-1">{p.completionPercentage}%</p>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-3 text-xs font-semibold">
          {p.currentStreak > 0 && (
            <span className="flex items-center gap-1.5 bg-orange-50 text-orange-600 px-2.5 py-1.5 rounded-full">
              <Flame size={12} /> {p.currentStreak} day streak
            </span>
          )}
          <span className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full ${daysRemaining <= 2 ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"}`}>
            <Clock size={12} /> {daysRemaining === 0 ? "Last day!" : `${daysRemaining} day${daysRemaining !== 1 ? "s" : ""} left`}
          </span>
          <span className="flex items-center gap-1.5 bg-amber-50 text-amber-600 px-2.5 py-1.5 rounded-full">
            ⭐ {challenge.rewardPoints} XP
          </span>
        </div>

        {/* CTA */}
        <Link
          href={`/challenges/${challenge.id}`}
          className="mt-auto w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-2.5 rounded-xl transition-colors text-sm"
        >
          Continue Challenge <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default function ActiveChallengesClient() {
  const { data: session, isPending } = authClient.useSession();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActive = useCallback(async (userId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getChallenges({
        mine: true,
        participantStatus: "ACTIVE",
        userId,
      });
      setChallenges(data);
    } catch {
      setError("Unable to load your active challenges.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isPending) {
      if (session?.user?.id) {
        fetchActive(session.user.id);
      } else {
        setIsLoading(false);
      }
    }
  }, [session, isPending, fetchActive]);

  // --- Not logged in ---
  if (!isPending && !session?.user) {
    return (
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-green-950 mb-6">Active Challenges</h3>
        <div className="flex flex-col items-center justify-center py-16 px-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-center">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <LogIn className="text-green-600" size={26} />
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-2">Sign in to see your active challenges</h4>
          <p className="text-gray-500 text-sm mb-6">Your in-progress challenges will appear here once you're signed in.</p>
          <Link
            href="/registrationProcess/login"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2.5 rounded-xl transition-colors text-sm"
          >
            Sign In <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  // --- Loading skeletons ---
  if (isLoading) {
    return (
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-green-950 mb-6">Active Challenges</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  // --- Error state ---
  if (error) {
    return (
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-green-950 mb-6">Active Challenges</h3>
        <div className="flex flex-col items-center justify-center py-14 px-6 bg-red-50 rounded-2xl border border-red-100 text-center">
          <p className="text-red-600 font-semibold mb-4">{error}</p>
          <button
            onClick={() => session?.user?.id && fetchActive(session.user.id)}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2 rounded-xl text-sm transition-colors"
          >
            <RotateCcw size={14} /> Try Again
          </button>
        </div>
      </div>
    );
  }

  // --- Empty state ---
  if (challenges.length === 0) {
    return (
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-green-950 mb-6">Active Challenges</h3>
        <div className="flex flex-col items-center justify-center py-16 px-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-center">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <Rocket className="text-green-600" size={26} />
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-2">No Active Challenges</h4>
          <p className="text-gray-500 text-sm mb-6">You haven't joined any active challenges yet.<br />Explore a challenge and start building your progress.</p>
          <Link
            href="/challenges?tab=all"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2.5 rounded-xl transition-colors text-sm"
          >
            Explore Challenges <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  // --- Active challenge cards ---
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-green-950">Active Challenges</h3>
        <span className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full">
          {challenges.length} in progress
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <ActiveChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  );
}

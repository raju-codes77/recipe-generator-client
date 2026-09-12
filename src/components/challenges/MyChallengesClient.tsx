"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { getChallenges } from "@/lib/challengeApi";
import { Challenge } from "@/types/challenge";
import {
  ArrowRight, CheckCircle2, Flame, Clock,
  Loader2, RotateCcw, LogIn, Rocket, Trophy, Gift,
} from "lucide-react";

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse flex gap-4 p-4">
      <div className="w-20 h-20 bg-gray-200 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-2.5 py-1">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-2.5 bg-gray-100 rounded w-full" />
        <div className="h-2.5 bg-gray-100 rounded w-2/3" />
        <div className="h-8 bg-gray-200 rounded-xl w-28 mt-2" />
      </div>
    </div>
  );
}

// ─── Active challenge card ─────────────────────────────────────────────────────
function ActiveCard({ challenge }: { challenge: Challenge }) {
  const p = challenge.myParticipant!;
  const joinedAt = new Date(p.joinedAt);
  const deadline = new Date(joinedAt.getTime() + p.totalDays * 86400000);
  const daysRemaining = Math.max(0, Math.ceil((deadline.getTime() - Date.now()) / 86400000));

  return (
    <div className="bg-white rounded-2xl border-2 border-green-100 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-0 overflow-hidden">
      {/* Thumbnail */}
      <div className="relative w-full sm:w-28 h-32 sm:h-auto flex-shrink-0">
        <Image
          src={challenge.coverImage || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80"}
          alt={challenge.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col gap-3">
        <div>
          <h4 className="text-base font-bold text-gray-900 leading-snug">{challenge.title}</h4>
          <p className="text-xs text-gray-500 mt-0.5">{challenge.difficulty} · {challenge.durationDays} days</p>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
            <span>{p.completedDays} / {p.totalDays} days</span>
            <span className="text-green-700 font-bold">{p.completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${p.completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Stats + CTA */}
        <div className="flex flex-wrap items-center gap-2 mt-auto">
          {p.currentStreak > 0 && (
            <span className="flex items-center gap-1 text-xs font-semibold bg-orange-50 text-orange-600 px-2 py-1 rounded-full">
              <Flame size={11} /> {p.currentStreak}d streak
            </span>
          )}
          <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${daysRemaining <= 1 ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"}`}>
            <Clock size={11} /> {daysRemaining === 0 ? "Last day!" : `${daysRemaining}d left`}
          </span>
          <Link
            href={`/challenges/${challenge.id}`}
            className="ml-auto flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
          >
            Continue <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Completed challenge card ──────────────────────────────────────────────────
function CompletedCard({ challenge }: { challenge: Challenge }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:shadow-sm transition-shadow flex flex-col sm:flex-row gap-0 overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
      {/* Thumbnail */}
      <div className="relative w-full sm:w-28 h-24 sm:h-auto flex-shrink-0">
        <Image
          src={challenge.coverImage || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80"}
          alt={challenge.title}
          fill
          className="object-cover grayscale-[30%]"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-green-900/30">
          <CheckCircle2 className="text-white drop-shadow" size={28} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col gap-2">
        <div>
          <h4 className="text-base font-bold text-gray-900">{challenge.title}</h4>
          <p className="text-xs text-gray-400 mt-0.5">{challenge.difficulty} · {challenge.durationDays} days</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-auto">
          <span className="flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
            <CheckCircle2 size={11} /> 100% Complete
          </span>
          <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
            <Gift size={11} /> +{challenge.rewardPoints} XP
          </span>
          <Link
            href={`/challenges/${challenge.id}`}
            className="ml-auto flex items-center gap-1.5 border border-gray-200 hover:border-green-400 text-gray-600 hover:text-green-700 text-xs font-bold px-4 py-2 rounded-xl transition-colors"
          >
            View <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────────
export default function MyChallengesClient() {
  const { data: session, isPending } = authClient.useSession();
  const [active, setActive] = useState<Challenge[]>([]);
  const [completed, setCompleted] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = session?.user?.id ?? null;

  const fetchMine = useCallback(async (uid: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch both buckets in parallel — the backend filters by userId + participantStatus
      const [activeChallenges, completedChallenges] = await Promise.all([
        getChallenges({ mine: true, participantStatus: "ACTIVE",    userId: uid }),
        getChallenges({ mine: true, participantStatus: "COMPLETED", userId: uid }),
      ]);
      setActive(activeChallenges);
      setCompleted(completedChallenges);
    } catch {
      setError("Unable to load your challenges.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isPending) {
      if (userId) {
        fetchMine(userId);
      } else {
        setIsLoading(false);
      }
    }
  }, [isPending, userId, fetchMine]);

  // ── Not authenticated ──────────────────────────────────────────────────────
  if (!isPending && !session?.user) {
    return (
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-green-950 mb-6">My Challenges</h3>
        <div className="flex flex-col items-center justify-center py-16 px-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-center">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <LogIn className="text-green-600" size={26} />
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-2">Sign in to view your challenges</h4>
          <p className="text-gray-500 text-sm mb-6">Your active and completed challenges will appear here once you&apos;re signed in.</p>
          <Link href="/registrationProcess/login" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors">
            Sign In <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  // ── Loading skeletons ──────────────────────────────────────────────────────
  if (isLoading || isPending) {
    return (
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-green-950 mb-6">My Challenges</h3>
        <div className="space-y-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-green-950 mb-6">My Challenges</h3>
        <div className="flex flex-col items-center justify-center py-14 px-6 bg-red-50 rounded-2xl border border-red-100 text-center">
          <p className="text-red-600 font-semibold mb-4">{error}</p>
          <button onClick={() => userId && fetchMine(userId)} className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2 rounded-xl text-sm transition-colors">
            <RotateCcw size={13} /> Try Again
          </button>
        </div>
      </div>
    );
  }

  // ── Fully empty (never joined) ─────────────────────────────────────────────
  if (active.length === 0 && completed.length === 0) {
    return (
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-green-950 mb-6">My Challenges</h3>
        <div className="flex flex-col items-center justify-center py-16 px-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-center">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <Rocket className="text-green-600" size={26} />
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-2">No Challenges Yet</h4>
          <p className="text-gray-500 text-sm mb-6">You haven&apos;t joined any challenges yet.<br />Explore challenges and join one to start tracking your progress.</p>
          <Link href="/challenges?tab=all" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors">
            Explore Challenges <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  // ── Populated ─────────────────────────────────────────────────────────────
  return (
    <div className="mb-12 space-y-10">
      <h3 className="text-2xl font-bold text-green-950">My Challenges</h3>

      {/* Active section */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block animate-pulse" />
            Active
          </h4>
          {active.length > 0 && (
            <span className="text-xs font-bold bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full">
              {active.length}
            </span>
          )}
        </div>

        {active.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 px-6 bg-gray-50 rounded-2xl border border-dashed border-gray-100 text-center">
            <p className="text-gray-500 text-sm mb-3">No active challenges right now.</p>
            <Link href="/challenges?tab=all" className="text-sm font-bold text-green-600 hover:text-green-700 underline underline-offset-2">
              Explore Challenges →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {active.map(c => <ActiveCard key={c.id} challenge={c} />)}
          </div>
        )}
      </section>

      {/* Completed section */}
      {completed.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Trophy size={18} className="text-amber-500" /> Completed
            </h4>
            <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full">
              {completed.length}
            </span>
          </div>
          <div className="space-y-3">
            {completed.map(c => <CompletedCard key={c.id} challenge={c} />)}
          </div>
        </section>
      )}
    </div>
  );
}

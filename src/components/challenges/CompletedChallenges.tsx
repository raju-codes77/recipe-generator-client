"use client";

import { useState, useEffect, useCallback } from "react";
import { authClient } from "@/lib/auth-client";
import { getChallenges } from "@/lib/challengeApi";
import { Challenge } from "@/types/challenge";
import ChallengeCard from "./ChallengeCard";
import Link from "next/link";
import { ArrowRight, LogIn, Trophy, RotateCcw } from "lucide-react";

export default function CompletedChallenges() {
  const { data: session, isPending } = authClient.useSession();
  const userId = session?.user?.id ?? null;

  const [completed, setCompleted] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompleted = useCallback(async (uid: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getChallenges({ mine: true, participantStatus: "COMPLETED", userId: uid });
      setCompleted(data);
    } catch {
      setError("Unable to load your completed challenges.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isPending) {
      if (userId) {
        fetchCompleted(userId);
      } else {
        setIsLoading(false);
      }
    }
  }, [isPending, userId, fetchCompleted]);

  if (!isPending && !userId) {
    return (
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-green-950 mb-6">Completed Challenges</h3>
        <div className="flex flex-col items-center justify-center py-16 px-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-center">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <LogIn className="text-green-600" size={26} />
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-2">Sign in to view completed challenges</h4>
          <p className="text-gray-500 text-sm mb-6">Your completed challenges will appear here once you're signed in.</p>
          <Link href="/registrationProcess/login" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors">
            Sign In <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading || isPending) {
    return (
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-green-950 mb-6">Completed Challenges</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 h-64 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-green-950 mb-6">Completed Challenges</h3>
        <div className="flex flex-col items-center justify-center py-14 px-6 bg-red-50 rounded-2xl border border-red-100 text-center">
          <p className="text-red-600 font-semibold mb-4">{error}</p>
          <button onClick={() => userId && fetchCompleted(userId)} className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2 rounded-xl text-sm transition-colors">
            <RotateCcw size={13} /> Try Again
          </button>
        </div>
      </div>
    );
  }

  if (completed.length === 0) {
    return (
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-green-950 mb-6">Completed Challenges</h3>
        <div className="flex flex-col items-center justify-center py-16 px-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-center">
          <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mb-4">
            <Trophy className="text-amber-600" size={26} />
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-2">No Completed Challenges Yet</h4>
          <p className="text-gray-500 text-sm mb-6">You haven't completed any challenges yet.<br />Keep pushing forward!</p>
          <Link href="/challenges?tab=active" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors">
            View Active Challenges <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-green-950">Completed Challenges</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {completed.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  );
}

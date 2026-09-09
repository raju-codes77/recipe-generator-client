"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { getChallenges, joinChallenge } from "@/lib/challengeApi";
import { Challenge } from "@/types/challenge";
import {
  Flame, Clock, Users, Gift, ArrowRight,
  Loader2, RotateCcw, CheckCircle2, Trophy,
} from "lucide-react";

// ─── Skeleton ──────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-52 bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 rounded-md w-3/4" />
        <div className="h-3 bg-gray-100 rounded-md w-full" />
        <div className="flex gap-3 mt-3">
          <div className="h-7 bg-gray-200 rounded-full w-20" />
          <div className="h-7 bg-gray-200 rounded-full w-20" />
        </div>
        <div className="h-10 bg-gray-200 rounded-xl w-full mt-2" />
      </div>
    </div>
  );
}

// ─── Individual discovery card ─────────────────────────────────────────────────
function DiscoveryChallengeCard({
  challenge,
  userId,
  onJoinSuccess,
}: {
  challenge: Challenge;
  userId: string | null;
  onJoinSuccess: (challengeId: string, participant: any) => void;
}) {
  const participant = challenge.myParticipant;
  const joined = !!participant;
  const [isJoining, setIsJoining] = useState(false);

  const difficultyColors: Record<string, string> = {
    Beginner: "bg-emerald-100 text-emerald-700",
    Intermediate: "bg-amber-100 text-amber-700",
    Advanced: "bg-red-100 text-red-700",
  };

  const handleJoin = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!userId) {
      window.location.href = "/registrationProcess/login";
      return;
    }
    try {
      setIsJoining(true);
      const res = await joinChallenge(challenge.id, userId);
      onJoinSuccess(challenge.id, res.participant);
    } catch (err: any) {
      alert(err.message || "Failed to join challenge");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-300 group">
      {/* Cover */}
      <div className="relative h-52 w-full flex-shrink-0 overflow-hidden">
        <Image
          src={challenge.coverImage || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80"}
          alt={challenge.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {challenge.isFeatured && (
            <span className="inline-flex items-center gap-1 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              <Flame size={11} /> Featured
            </span>
          )}
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${difficultyColors[challenge.difficulty] ?? "bg-gray-100 text-gray-700"}`}>
            {challenge.difficulty}
          </span>
        </div>
        {joined && (
          <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 size={12} /> Joined
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900 leading-snug mb-1">{challenge.title}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">{challenge.description}</p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-3 text-xs font-semibold text-gray-500">
          <span className="flex items-center gap-1">
            <Clock size={13} className="text-green-500" />
            {challenge.durationDays} days
          </span>
          <span className="flex items-center gap-1">
            <Users size={13} className="text-green-500" />
            {challenge._count?.participants ?? 0} joined
          </span>
          <span className="flex items-center gap-1">
            <Gift size={13} className="text-amber-500" />
            {challenge.rewardPoints} XP
          </span>
        </div>

        {/* If already joined, show mini progress */}
        {joined && participant && (
          <div>
            <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
              <span>Your progress</span>
              <span className="text-green-700">{participant.completedDays}/{participant.totalDays} days · {participant.completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full"
                style={{ width: `${participant.completionPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto">
          {joined ? (
            <Link
              href={`/challenges/${challenge.id}`}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl transition-colors text-sm"
            >
              Continue Challenge <ArrowRight size={15} />
            </Link>
          ) : (
            <button
              onClick={handleJoin}
              disabled={isJoining}
              className="w-full flex items-center justify-center gap-2 bg-white border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white font-bold py-2.5 rounded-xl transition-all text-sm disabled:opacity-60"
            >
              {isJoining ? (
                <><Loader2 size={15} className="animate-spin" /> Joining…</>
              ) : (
                <><Trophy size={15} /> Join Challenge</>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main export ────────────────────────────────────────────────────────────────
export default function AllChallengesClient({
  search = "",
  sort = "latest",
}: {
  search?: string;
  sort?: string;
}) {
  const { data: session, isPending } = authClient.useSession();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [pagination, setPagination] = useState<{ page: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean } | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = session?.user?.id ?? null;

  // Reset page to 1 when search or sort changes
  useEffect(() => {
    setPage(1);
  }, [search, sort]);

  const fetchAll = useCallback(async (currentPage: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const { getPaginatedChallenges } = await import("@/lib/challengeApi");
      const data = await getPaginatedChallenges({
        status: "active",
        search,
        sort,
        page: currentPage,
        limit: 6,
        ...(userId ? { userId } : {}),
      });
      setChallenges(data.challenges);
      setPagination(data.pagination);
    } catch {
      setError("Unable to load challenges.");
    } finally {
      setIsLoading(false);
    }
  }, [search, sort, userId]);

  useEffect(() => {
    if (!isPending) {
      fetchAll(page);
    }
  }, [isPending, page, fetchAll]);

  // Listen for custom event from GenerateChallengesButton
  useEffect(() => {
    const handleGeneration = () => {
      setPage(1);
      fetchAll(1);
    };
    window.addEventListener("challengesGenerated", handleGeneration);
    return () => window.removeEventListener("challengesGenerated", handleGeneration);
  }, [fetchAll]);

  // Optimistic join update
  const handleJoinSuccess = (challengeId: string, participant: any) => {
    setChallenges(prev =>
      prev.map(c =>
        c.id === challengeId ? { ...c, myParticipant: participant } : c
      )
    );
  };

  // Loading
  if (isLoading || isPending) {
    return (
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-green-950">All Challenges</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-green-950 mb-6">All Challenges</h3>
        <div className="flex flex-col items-center justify-center py-14 px-6 bg-red-50 rounded-2xl border border-red-100 text-center">
          <p className="text-red-600 font-semibold mb-4">{error}</p>
          <button
            onClick={() => fetchAll(page)}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2 rounded-xl text-sm transition-colors"
          >
            <RotateCcw size={14} /> Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty
  if (challenges.length === 0) {
    return (
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-green-950 mb-6">All Challenges</h3>
        <div className="flex flex-col items-center justify-center py-16 px-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-center">
          <Trophy className="text-green-500 mb-4" size={36} />
          <h4 className="text-lg font-bold text-gray-900 mb-2">No challenges available</h4>
          <p className="text-gray-500 text-sm">Check back soon — new challenges are added regularly!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-green-950">All Challenges</h3>
        <span className="text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
          Page {page} {pagination && pagination.totalPages > 1 && `of ${pagination.totalPages}`}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {challenges.map(challenge => (
          <DiscoveryChallengeCard
            key={challenge.id}
            challenge={challenge}
            userId={userId}
            onJoinSuccess={handleJoinSuccess}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={!pagination.hasPreviousPage}
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          <div className="flex items-center gap-1 mx-2">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 flex items-center justify-center text-sm font-bold rounded-md transition-colors ${
                  page === p 
                    ? "bg-green-600 text-white" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
            disabled={!pagination.hasNextPage}
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

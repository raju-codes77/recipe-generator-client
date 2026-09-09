"use client";

import { useState, useEffect } from "react";
import { getChallengeParticipant, completeChallengeDay } from "@/lib/challengeApi";
import { authClient } from "@/lib/auth-client";
import { Loader2, CheckCircle2, Lock, ArrowRight, Gift, Trophy } from "lucide-react";
import JoinChallengeButton from "./JoinChallengeButton";
import { useRouter } from "next/navigation";

export default function ChallengeActions({ challenge }: { challenge: any }) {
  const { data: session, isPending } = authClient.useSession();
  const [participant, setParticipant] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isPending) {
      if (session?.user?.id) {
        getChallengeParticipant(challenge.id, session.user.id)
          .then(data => {
            setParticipant(data);
          })
          .catch(() => setParticipant(null))
          .finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    }
  }, [session, isPending, challenge.id]);

  if (isLoading || isPending) {
    return <div className="h-32 flex items-center justify-center"><Loader2 className="animate-spin text-green-600" /></div>;
  }

  const handleCompleteDay = async (dayId: string) => {
    if (!session?.user?.id) return;
    try {
      setIsCompleting(true);
      const res = await completeChallengeDay(challenge.id, dayId, session.user.id);
      setParticipant(res.participant);
      alert("Day completed! +XP earned!");
      router.refresh();
    } catch (error: any) {
      alert(error.message || "Failed to complete day");
    } finally {
      setIsCompleting(false);
    }
  };

  if (!participant) {
    return (
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 sticky top-8">
        <h3 className="text-xl font-bold text-green-950 mb-4">Ready to Start?</h3>
        <p className="text-gray-600 mb-6 text-sm">Join this challenge to track your progress, earn XP, and unlock exclusive community badges.</p>
        
        <JoinChallengeButton challengeId={challenge.id} onJoinSuccess={(newParticipant) => setParticipant(newParticipant)} />

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Rewards Included</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                <Gift size={14} />
              </div>
              {challenge.rewardPoints} Experience Points
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                <Trophy size={14} />
              </div>
              Completion Badge
            </li>
          </ul>
        </div>
      </div>
    );
  }

  // Calculate deadline
  const joinedAt = new Date(participant.joinedAt);
  const deadline = new Date(joinedAt.getTime() + participant.totalDays * 24 * 60 * 60 * 1000);
  const daysRemaining = Math.max(0, Math.ceil((deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="bg-white rounded-2xl p-6 border border-green-200 shadow-sm sticky top-8">
      <h3 className="text-xl font-bold text-green-950 mb-2">
        {participant.status === "COMPLETED" ? "Challenge Completed!" : 
         participant.status === "EXPIRED" ? "Challenge Expired" : "Continue Challenge"}
      </h3>
      
      <div className="mt-6 space-y-4">
        <div>
          <div className="flex justify-between text-sm font-semibold text-gray-600 mb-1">
            <span>Progress</span>
            <span>{participant.completedDays} / {participant.totalDays} days</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3.5 overflow-hidden">
            <div className="bg-green-600 h-3.5 rounded-full transition-all duration-500" style={{ width: `${participant.completionPercentage}%` }}></div>
          </div>
          <p className="text-right text-xs font-bold text-green-700 mt-1">{participant.completionPercentage}%</p>
        </div>

        <div className="flex justify-between bg-green-50 p-4 rounded-xl border border-green-100">
          <div className="text-center">
            <p className="text-xs text-green-800 font-semibold uppercase tracking-wider">Current Streak</p>
            <p className="text-2xl font-black text-green-600">{participant.currentStreak} <span className="text-sm">days</span></p>
          </div>
          <div className="text-center">
            <p className="text-xs text-orange-800 font-semibold uppercase tracking-wider">Deadline</p>
            <p className="text-2xl font-black text-orange-500">{daysRemaining} <span className="text-sm">days left</span></p>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">Your Daily Tasks</h4>
        {challenge.days.map((day: any) => {
          const isCompleted = day.dayNumber <= participant.completedDays;
          const isCurrent = day.dayNumber === participant.currentDay && participant.status === "ACTIVE";
          const isLocked = day.dayNumber > participant.currentDay || participant.status !== "ACTIVE";

          return (
            <div key={day.id} className={`p-4 rounded-xl border ${
              isCompleted ? 'bg-gray-50 border-gray-200 opacity-70' :
              isCurrent ? 'bg-green-50 border-green-500 shadow-sm ring-1 ring-green-500' :
              'bg-white border-gray-200 opacity-50'
            }`}>
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm font-bold ${isCurrent ? 'text-green-800' : 'text-gray-600'}`}>Day {day.dayNumber}</span>
                {isCompleted && <CheckCircle2 className="text-green-500" size={18} />}
                {isCurrent && <ArrowRight className="text-green-600" size={18} />}
                {isLocked && !isCompleted && <Lock className="text-gray-400" size={18} />}
              </div>
              <h5 className="font-semibold text-gray-900 text-sm mb-1">{day.title}</h5>
              
              {isCurrent && (
                <button
                  onClick={() => handleCompleteDay(day.id)}
                  disabled={isCompleting}
                  className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-bold transition flex justify-center items-center"
                >
                  {isCompleting ? <Loader2 className="animate-spin" size={16} /> : "Complete Today's Challenge"}
                </button>
              )}
              {isCompleted && (
                <p className="mt-2 text-xs font-semibold text-green-600 flex items-center gap-1">
                  <CheckCircle2 size={12} /> Completed
                </p>
              )}
              {isLocked && !isCompleted && (
                <p className="mt-2 text-xs font-medium text-gray-500">Available tomorrow</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

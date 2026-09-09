"use client";

import { useState, useEffect } from "react";
import { getChallengeParticipant, completeChallengeDay } from "@/lib/challengeApi";
import { authClient } from "@/lib/auth-client";
import { Target, Trophy, Loader2, CheckCircle2, Lock, ArrowRight, Gift } from "lucide-react";
import JoinChallengeButton from "./JoinChallengeButton";
import { useRouter } from "next/navigation";

export default function ChallengeDashboardClient({ challenge }: { challenge: any }) {
  const { data: session, isPending } = authClient.useSession();
  const [participant, setParticipant] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isPending) {
      if (session?.user?.id) {
        getChallengeParticipant(challenge.id, session.user.id)
          .then(data => setParticipant(data))
          .catch(() => setParticipant(null))
          .finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    }
  }, [session, isPending, challenge.id]);

  const handleCompleteDay = async (dayId: string) => {
    if (!session?.user?.id) return;
    try {
      setIsCompleting(true);
      const res = await completeChallengeDay(challenge.id, dayId, session.user.id);
      setParticipant(res.participant);
      alert("Mission completed! +XP earned!");
      router.refresh();
    } catch (error: any) {
      alert(error.message || "Failed to complete mission");
    } finally {
      setIsCompleting(false);
    }
  };

  const renderSidebar = () => {
    if (isLoading || isPending) {
      return <div className="h-32 flex items-center justify-center bg-gray-50 rounded-2xl"><Loader2 className="animate-spin text-green-600" /></div>;
    }

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
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
      {/* MAIN CONTENT AREA */}
      <div className="lg:col-span-2 space-y-10">
        
        <section>
          <h2 className="text-2xl font-bold text-green-950 mb-4 flex items-center gap-2">
            <Target className="text-green-600" /> Overview
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg bg-green-50/30 p-6 rounded-2xl border border-green-100">
            {challenge.description}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-green-950 mb-6 flex items-center gap-2">
            <Trophy className="text-green-600" /> Your Challenge Mission
          </h2>
          <div className="space-y-4">
            {challenge.days && challenge.days.length > 0 ? (
              challenge.days.map((day: any) => {
                // Determine user state context
                const isCompleted = participant ? day.dayNumber <= participant.completedDays : false;
                const isCurrent = participant ? (day.dayNumber === participant.currentDay && participant.status === "ACTIVE") : false;
                const isLocked = participant ? (day.dayNumber > participant.currentDay || participant.status !== "ACTIVE") : true; 

                const unjoined = !participant;

                return (
                  <div key={day.id} className={`p-6 rounded-2xl border-2 transition-all ${
                    isCompleted ? 'bg-gray-50 border-gray-200 opacity-70' :
                    isCurrent ? 'bg-green-50 border-green-500 shadow-sm' :
                    unjoined ? 'bg-white border-gray-100 hover:border-green-200' :
                    'bg-white border-gray-100 opacity-50'
                  }`}>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-3">
                      <h3 className={`text-lg font-bold ${isCurrent ? 'text-green-900' : 'text-gray-900'}`}>
                        {day.title}
                      </h3>
                      {!unjoined && (
                        <div className="flex-shrink-0">
                          {isCompleted && <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm font-bold"><CheckCircle2 size={16} /> Completed</span>}
                          {isCurrent && <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold"><ArrowRight size={16} /> Current Mission</span>}
                          {isLocked && !isCompleted && <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-sm font-bold"><Lock size={16} /> Locked</span>}
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-base leading-relaxed">{day.description}</p>

                    {isCurrent && (
                      <button
                        onClick={() => handleCompleteDay(day.id)}
                        disabled={isCompleting}
                        className="mt-5 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition flex justify-center items-center shadow-sm"
                      >
                        {isCompleting ? <Loader2 className="animate-spin" size={18} /> : "Complete Mission"}
                      </button>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 bg-gray-50 p-6 rounded-2xl border border-gray-100">No mission points available for this challenge yet.</p>
            )}
          </div>
        </section>

      </div>

      {/* SIDEBAR AREA */}
      <div className="lg:col-span-1">
        {renderSidebar()}
      </div>

    </div>
  );
}

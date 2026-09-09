"use client";

import { useState } from "react";
import { joinChallenge } from "@/lib/challengeApi";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function JoinChallengeButton({ challengeId, onJoinSuccess }: { challengeId: string, onJoinSuccess?: (p: any) => void }) {
  const [isJoining, setIsJoining] = useState(false);
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleJoin = async () => {
    if (!session?.user?.id) {
      alert("You must be logged in to join a challenge.");
      return;
    }

    try {
      setIsJoining(true);
      const res = await joinChallenge(challengeId, session.user.id); 
      alert("Successfully joined the challenge!");
      if (onJoinSuccess && res.participant) {
        onJoinSuccess(res.participant);
      }
      router.refresh();
    } catch (error: any) {
      alert(error.message || "Failed to join challenge");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <button
      onClick={handleJoin}
      disabled={isJoining}
      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-6 rounded-xl transition-colors shadow-sm disabled:opacity-70 flex justify-center items-center"
    >
      {isJoining ? (
        <>
          <Loader2 className="animate-spin mr-2" size={20} />
          Joining...
        </>
      ) : (
        "Join Challenge"
      )}
    </button>
  );
}

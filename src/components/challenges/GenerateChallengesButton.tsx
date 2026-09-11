"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { generateChallenges } from "@/lib/challengeApi";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function GenerateChallengesButton() {
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      const newChallenges = await generateChallenges(true);
      if (newChallenges.length > 0) {
        // Dispatch event to tell AllChallengesClient to reset page to 1 and refetch
        window.dispatchEvent(new Event("challengesGenerated"));
        // Standard router refresh as backup
        router.refresh();
      }
      toast.success("Successfully generated new AI challenges!");
    } catch (error) {
      console.error(error);
      toast.error("Unable to generate new challenges. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex justify-center mt-8 mb-12">
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-green-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isGenerating ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Generating Challenges...
          </>
        ) : (
          <>
            <Sparkles size={20} />
            Generate More Challenges
          </>
        )}
      </button>
    </div>
  );
}

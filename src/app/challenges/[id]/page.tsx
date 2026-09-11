import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Gift, Users } from "lucide-react";
import { getChallengeById } from "@/lib/challengeApi";
import ChallengeDashboardClient from "./ChallengeDashboardClient";

export default async function ChallengeDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const challenge = await getChallengeById(resolvedParams.id);

  if (!challenge) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold text-green-950 mb-4">Challenge Not Found</h2>
        <Link href="/challenges" className="text-green-600 hover:underline">Return to Challenges</Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/challenges" className="inline-flex items-center gap-2 text-green-700 hover:text-green-900 mb-6 font-medium transition-colors">
        <ArrowLeft size={20} /> Back to Challenges
      </Link>

      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
        <div className="relative h-[300px] md:h-[400px] w-full">
          <Image
            src={challenge.coverImage || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80"}
            alt={challenge.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-8 w-full text-white">
            <div className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-4">
              {challenge.difficulty}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{challenge.title}</h1>
            
            <div className="flex flex-wrap gap-6 text-gray-200 text-sm md:text-base font-medium">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-green-400" />
                <span>{challenge.durationDays} Days</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={18} className="text-green-400" />
                <span>{challenge._count?.participants || 0} Joined</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift size={18} className="text-green-400" />
                <span>{challenge.rewardPoints} XP Reward</span>
              </div>
            </div>
          </div>
        </div>

        <ChallengeDashboardClient challenge={challenge} />
      </div>
    </div>
  );
}

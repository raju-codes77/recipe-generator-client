import { Challenge } from "@/types/challenge";
import ChallengeCard from "./ChallengeCard";

export default function ActiveChallenges({ challenges = [] }: { challenges?: Challenge[] }) {
  if (challenges.length === 0) {
    return (
      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-6 text-green-950">Active Challenges</h3>
        <p className="text-gray-500">No active challenges available right now.</p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-green-950">Active Challenges</h3>
        <button className="text-green-700 font-medium hover:text-green-800 text-sm">View All</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  );
}

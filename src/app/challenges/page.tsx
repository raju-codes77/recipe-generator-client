import ChallengesHeader from "@/components/challenges/ChallengesHeader";
import ChallengesFilter from "@/components/challenges/ChallengesFilter";
import FeaturedChallenge from "@/components/challenges/FeaturedChallenge";
import ActiveChallenges from "@/components/challenges/ActiveChallenges";
import UpcomingChallenges from "@/components/challenges/UpcomingChallenges";
import CompletedChallenges from "@/components/challenges/CompletedChallenges";
import MyChallenges from "@/components/challenges/MyChallenges";
import ProgressSidebar from "@/components/challenges/ProgressSidebar";
import { Suspense } from "react";

export const metadata = {
  title: "Challenges | FoodCanvas",
  description: "Join exciting cooking challenges on FoodCanvas.",
};

export default async function ChallengesPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const tab = resolvedSearchParams.tab || "all";

  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
      
      <ChallengesHeader />
      <Suspense fallback={<div className="h-10 mb-8" />}>
        <ChallengesFilter />
      </Suspense>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10">
        
        {/* Left Content Area (approx 75% on large screens) */}
        <div className="xl:col-span-8 2xl:col-span-9 flex flex-col">
          {tab === "all" && (
            <>
              <FeaturedChallenge />
              <ActiveChallenges />
              <UpcomingChallenges />
            </>
          )}

          {tab === "active" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ActiveChallenges />
            </div>
          )}

          {tab === "upcoming" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <UpcomingChallenges />
            </div>
          )}

          {tab === "completed" && <CompletedChallenges />}

          {tab === "my" && <MyChallenges />}
        </div>

        {/* Right Sidebar Area (approx 25% on large screens) */}
        <div className="xl:col-span-4 2xl:col-span-3">
          <ProgressSidebar />
        </div>
        
      </div>
    </div>
  );
}

import ChallengesHeader from "@/components/challenges/ChallengesHeader";
import ChallengesFilter from "@/components/challenges/ChallengesFilter";
import FeaturedChallenge from "@/components/challenges/FeaturedChallenge";
import AllChallengesClient from "@/components/challenges/AllChallengesClient";
import ActiveChallengesClient from "@/components/challenges/ActiveChallengesClient";
import MyChallengesClient from "@/components/challenges/MyChallengesClient";
import UpcomingChallenges from "@/components/challenges/UpcomingChallenges";
import CompletedChallenges from "@/components/challenges/CompletedChallenges";
import ProgressSidebar from "@/components/challenges/ProgressSidebar";
import GenerateChallengesButton from "@/components/challenges/GenerateChallengesButton";
import { Suspense } from "react";
import { getChallenges, getFeaturedChallenge, generateChallenges } from "@/lib/challengeApi";

export const metadata = {
  title: "Challenges | FoodCanvas",
  description: "Join exciting cooking challenges on FoodCanvas.",
};

export default async function ChallengesPage({ searchParams }: { searchParams: Promise<{ tab?: string; search?: string; sort?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const tab = resolvedSearchParams.tab || "all";
  const search = resolvedSearchParams.search || "";
  const sort = resolvedSearchParams.sort || "latest";

  // Auto-generate initial challenges if DB is empty (best-effort – never crash the page)
  try { await generateChallenges(false); } catch { /* backend may be warming up */ }

  // Fetch non-personalized data (server-side). Fall back to empty values if backend is unavailable.
  let featuredChallenge = null;
  let upcomingChallenges: any[] = [];

  try {
    [featuredChallenge, upcomingChallenges] = await Promise.all([
      getFeaturedChallenge(),
      getChallenges({ status: 'upcoming', search, sort }),
    ]);
  } catch {
    // If the backend is down the page still renders; client components show their own states
  }
  // Note: mine=true data is fetched client-side by MyChallengesClient / ActiveChallengesClient

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
              {featuredChallenge && <FeaturedChallenge challenge={featuredChallenge} />}
              {/* AllChallengesClient fetches all globally active challenges client-side
                  so it can embed per-user join state without a server session */}
              <AllChallengesClient search={search} sort={sort} />
              {upcomingChallenges.length > 0 && <UpcomingChallenges challenges={upcomingChallenges} />}
              <GenerateChallengesButton />
            </>
          )}

          {tab === "active" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ActiveChallengesClient />
            </div>
          )}

          {tab === "upcoming" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <UpcomingChallenges challenges={upcomingChallenges} />
            </div>
          )}

          {tab === "completed" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CompletedChallenges />
            </div>
          )}

          {tab === "my" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* MyChallengesClient reads session client-side so it only ever shows the
                  current authenticated user's own ACTIVE + COMPLETED challenges */}
              <MyChallengesClient />
            </div>
          )}
        </div>

        {/* Right Sidebar Area (approx 25% on large screens) */}
        <div className="xl:col-span-4 2xl:col-span-3">
          <ProgressSidebar />
        </div>
        
      </div>
    </div>
  );
}

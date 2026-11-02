import MyChallengesClient from "@/components/challenges/MyChallengesClient";
import { FiAward } from "react-icons/fi";

export const metadata = {
  title: "My Challenges | Dashboard",
  description: "View and manage your cooking challenges.",
};

export default function MyChallengesDashboardPage() {
  return (
    <div className="p-6 sm:p-10 min-h-screen">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf4e9] text-[#2F8F46] dark:bg-[#2F8F46]/20 dark:text-[#B7E35F]">
          <FiAward size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Challenges History</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Track your progress and see your completed challenges.</p>
        </div>
      </div>
      <div className="max-w-4xl">
        <MyChallengesClient />
      </div>
    </div>
  );
}

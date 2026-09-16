"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LayoutGrid, Circle, Calendar, CheckCircle, User } from "lucide-react";

export default function ChallengesFilter() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "all";

  const tabs = [
    { id: "all", label: "All Challenges", icon: LayoutGrid },
    { id: "active", label: "Active", icon: Circle },
    { id: "upcoming", label: "Upcoming", icon: Calendar },
    { id: "completed", label: "Completed", icon: CheckCircle },
    { id: "my", label: "My Challenges", icon: User },
  ];

  return (
    <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.id}
              href={`/challenges?tab=${tab.id}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              <Icon size={16} className={isActive ? "text-green-700 dark:text-green-500" : "text-slate-400"} />
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

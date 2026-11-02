import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AIOverviewContent from "@/components/aitools/AIOverviewContent";

export const metadata: Metadata = {
  title: "How FoodCanvas AI Tools Work | FoodCanvas",
  description: "Learn what each FoodCanvas AI cooking and nutrition tool does.",
};

export default function AIToolsOverviewPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-black dark:text-slate-100 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center gap-3">
          <Link
            href="/ai-tools"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 dark:border-[#2c2c32] dark:bg-[#1a1a1f] dark:text-slate-300 dark:hover:bg-[#25252a]"
          >
            <ArrowLeft size={16} />
            Back to AI Tools
          </Link>
          <div className="flex items-center gap-1.5 text-sm text-slate-400">
            <span>/</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">AI Tools Overview</span>
          </div>
        </div>

        <AIOverviewContent />
      </div>
    </main>
  );
}

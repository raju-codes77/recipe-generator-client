import AiTasteMatcherBanner from "@/components/sub-page/AiTasteMatcherBanner";
import TasteMatcherDashboard from "@/components/sub-page/TasteMatcherDashboard";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Taste Matcher | FoodCanvas",
  description: "Find recipes that match your unique taste preferences.",
};

export default async function TasteMatcherPage() {
  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/ai-tools"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 dark:border-[#2c2c32] dark:bg-[#1a1a1f] dark:text-gray-300 dark:hover:bg-[#25252a]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to AI Tools
        </Link>
        <div className="flex items-center gap-1.5 text-sm text-gray-400">
          <span>/</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            AI Taste Matcher
          </span>
        </div>
      </div>
      <AiTasteMatcherBanner />
      <TasteMatcherDashboard />
    </div>
  );
}

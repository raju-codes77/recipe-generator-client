import AiTasteMatcherBanner from "@/components/sub-page/AiTasteMatcherBanner";
import TasteMatcherDashboard from "@/components/sub-page/TasteMatcherDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Taste Matcher | FoodCanvas",
  description: "Find recipes that match your unique taste preferences.",
};

export default async function TasteMatcherPage() {
  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
      <AiTasteMatcherBanner />
      <TasteMatcherDashboard />
    </div>
  );
}
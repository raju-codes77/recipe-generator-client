import type { Metadata } from "next";
import CommunityFeed from "@/components/community/CommunityFeed";

export const metadata: Metadata = {
  title: "Community | FoodCanvas",
  description:
    "Explore recipes, food photos, and cooking experiences shared by the FoodCanvas community.",
};

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-[#FCFDF9] dark:bg-[#0a0a0a]">
      <CommunityFeed />
    </main>
  );
}
import AIToolsHeader from "@/components/aitools/AIToolsHeader";
import AvailableTools from "@/components/aitools/AvailableTools";
import HowItWorks from "@/components/aitools/HowItWorks";
import UsageOverview from "@/components/aitools/UsageOverview";
import SafetyBanner from "@/components/aitools/SafetyBanner";

export const metadata = {
  title: "AI Tools | FoodCanvas",
  description: "Explore powerful AI tools designed to help users discover recipes and analyze nutrition.",
};

export default function AIToolsPage() {
  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AIToolsHeader />
      <AvailableTools />
      
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-10">
        <div className="xl:col-span-5">
          <HowItWorks />
        </div>
        <div className="xl:col-span-7">
          <UsageOverview />
        </div>
      </div>

      <SafetyBanner />
    </div>
  );
}

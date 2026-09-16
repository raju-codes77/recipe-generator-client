import Banner from "@/components/Banner";
import HowItWorksSection from "@/components/HowItWorksSection";
import RecipeCollectionSection from "@/components/RecipeCollection";
import CommunitySection from "@/components/CommunitySection";
import NutritionistSupportSection from "@/components/NutritionistSupport";


import WellnessReminderLanding from "@/components/WellnessReminderLanding";


export default function Home() {
  return (
    <div>
      <Banner />
      <RecipeCollectionSection />
      <NutritionistSupportSection />
      <WellnessReminderLanding />
      <HowItWorksSection />
      <CommunitySection />
    </div>
  );
}

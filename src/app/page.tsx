import Banner from "@/components/Banner";
import HowItWorksSection from "@/components/HowItWorksSection";
import RecipeCollectionSection from "@/components/RecipeCollection";
import CommunitySection from "@/components/CommunitySection";
import NutritionistSupportSection from "@/components/NutritionistSupport";


export default function Home() {
  return (
    <div>
      <Banner />
      <RecipeCollectionSection />
      <NutritionistSupportSection />
      <HowItWorksSection />
      <CommunitySection />
    </div>
  );
}

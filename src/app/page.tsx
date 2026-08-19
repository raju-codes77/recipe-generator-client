import Banner from "@/components/Banner";
import PersonalizationSection from "@/components/PersonalizationSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import RecipeCollectionSection from "@/components/RecipeCollection";
import CommunitySection from "@/components/CommunitySection";


export default function Home() {
  return (
    <div>
      <Banner />
      <RecipeCollectionSection />
      <PersonalizationSection />
      <HowItWorksSection />
      <CommunitySection />
    </div>
  );
}

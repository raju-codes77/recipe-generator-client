import Banner from "@/components/Banner";
import HowItWorksSection from "@/components/HowItWorksSection";
import RecipeCollectionSection from "@/components/RecipeCollection";
import CommunitySection from "@/components/CommunitySection";
import PantryToPlateSection from "@/components/PantryToPlate";
  

export default function Home() {
  return (
    <div>
      <Banner />
      <PantryToPlateSection />
      <HowItWorksSection />
      <RecipeCollectionSection />
      <CommunitySection />
    </div>
  );
}

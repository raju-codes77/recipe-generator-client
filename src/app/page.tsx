import Banner from "@/components/Banner";
import PersonalizationSection from "@/components/PersonalizationSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import RecipeCollectionSection from "@/components/RecipeCollection";
import CommunitySection from "@/components/CommunitySection";
import CounterProps from "@/components/CounterProps";
import PantryToPlateSection from "@/components/PantryToPlate";


export default function Home() {
  return (
    <div>
      <Banner />
      <RecipeCollectionSection />
      <PersonalizationSection />
      <CounterProps />
      <PantryToPlateSection/>
      <HowItWorksSection />
      <CommunitySection />
    </div>
  );
}

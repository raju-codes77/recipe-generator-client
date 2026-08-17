import Banner from "@/components/Banner";
import PersonalizationSection from "@/components/PersonalizationSection";
import CounterProps from "@/components/CounterProps";
import HowItWorksSection from "@/components/HowItWorksSection";
import RecipeCollectionSection from "@/components/RecipeCollection";


export default function Home() {
  return (
    <div>
      <Banner />
      <RecipeCollectionSection/>
      <PersonalizationSection />
      <CounterProps />
      <HowItWorksSection />
    </div>
  );
}

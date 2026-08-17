import Banner from "@/components/Banner";
import PersonalizationSection from "@/components/PersonalizationSection";
import CounterProps from "@/components/CounterProps";
import HowItWorksSection from "@/components/HowItWorksSection";


export default function Home() {
  return (
    <div>
      <Banner />
      <PersonalizationSection />
      <CounterProps />
      <HowItWorksSection />
    </div>
  );
}

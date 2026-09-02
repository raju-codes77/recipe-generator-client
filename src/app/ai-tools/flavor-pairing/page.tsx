
import FlavorPairingFull from "@/components/sub-page/FlavorPairingFull";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flavor Pairing | FoodCanvas",
  description: "Find recipes that match your unique taste preferences.",
};

export default async function FlavorPairingPage() {
  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <FlavorPairingFull/>
    </div>
  );
}
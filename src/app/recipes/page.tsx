import ExploreRecipes from "@/components/recipes/ExploreRecipes";

export default function RecipesPage() {
  return (
    <main className="relative min-h-screen bg-white dark:bg-black pt-0 pb-8 transition-colors duration-300 overflow-hidden text-gray-900 dark:text-white">
      
      {/* Background Glow / Styled Light Effect */}
      <div className="absolute top-0 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#10B981]/10 via-[#24733E]/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-orange-500/5 via-[#10B981]/5 to-transparent blur-[100px] pointer-events-none" />

      <ExploreRecipes />
    </main>
  );
}
import RecipeCard from "@/components/recipes/RecipeCard";
import FilterCard from "@/components/recipes/FilterCard";
import { Sparkles, Compass } from "lucide-react";

interface Recipe {
  id: number;
  title: string;
  image: string;
  rating: number;
  time: number;
  calories: number;
}

// Hard-coded dummy recipes data (pore backend theke anben)
const DUMMY_RECIPES: Recipe[] = [
  {
    id: 1,
    title: "Spicy Shrimp Tacos",
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
    rating: 4.8,
    time: 23,
    calories: 640,
  },
  {
    id: 2,
    title: "Quinoa Power Bowl",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999",
    rating: 4.9,
    time: 25,
    calories: 580,
  },
  {
    id: 3,
    title: "Creamy Chicken Alfredo",
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
    rating: 4.7,
    time: 30,
    calories: 710,
  },
  {
    id: 4,
    title: "Creamy Chicken Alfredo",
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
    rating: 4.7,
    time: 30,
    calories: 710,
  },
];

const Recipes: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#C5DED0] bg-[#EAF4EB] px-3 py-1 text-xs font-semibold text-[#24733E]">
          <Sparkles className="h-3.5 w-3.5 text-orange-500" />
          <span>Community Collection</span>
        </div>

        <h1 className="mb-2 flex items-center gap-2.5 text-3xl font-bold text-gray-900">
          <span className="text-orange-500">Explore</span>
          <span className="text-[#24733E]">Collections</span>

          <Compass className="h-7 w-7 text-orange-500" />
        </h1>

        <p className="text-gray-600">
          Discover popular recipes crafted by our global community.
        </p>
      </div>

      {/* Filter Card */}
      <div className="mb-7">
        <FilterCard />
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {DUMMY_RECIPES.map((recipe: Recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
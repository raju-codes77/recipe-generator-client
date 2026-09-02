"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Clock, Flame, Star, ArrowLeft, Heart, Folder, Share2,
  ChefHat, Users, Award, ThumbsUp, ThumbsDown, X, Plus
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import DetailsSidebar from "@/components/recipes/details/DetailsSidebar";
import RecipeDetailsSkeleton from "@/components/recipes/details/RecipeDetailsSkeleton";
import toast from "react-hot-toast";

interface Ingredient {
  id?: number;
  name: string;
  measure?: string | null;
}

interface Review {
  id: string;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  timeAgo: string;
  likes: number;
  dislikes: number;
}

interface RecipeDetail {
  id: string;
  title: string;
  image: string;
  images?: string[];
  rating: number;
  totalReviews?: number;
  time: number;
  prepTime?: number;
  calories: number;
  cuisine?: string;
  category?: string;
  description?: string;
  servings?: number;
  createdAt?: string;
  carbs?: number;
  protein?: number;
  fat?: number;
  fiber?: number;
  ingredients?: Ingredient[];
  instructions?: string | string[];
  reviews?: Review[];
  user?: {
    name: string;
    image?: string;
  };
}

export default function RecipeDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const { data: session } = authClient.useSession();
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ACTIVE IMAGE THUMBNAIL STATE
  const [activeImage, setActiveImage] = useState<string>("");

  // FAVORITE STATES
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);

  // COLLECTION MODAL STATES
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [collections, setCollections] = useState<any[]>([]);
  const [loadingCollections, setLoadingCollections] = useState(false);

  // NEW COLLECTION INPUT STATE
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [isSubmittingNew, setIsSubmittingNew] = useState(false);

  const [activeTab, setActiveTab] = useState("Overview");

  // FETCH RECIPE DETAILS
  useEffect(() => {
    if (!id) return;

    async function fetchRecipeDetails() {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/recipes/${id}`, {
          credentials: "include",
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch recipe details");
        }

        if (data.success) {
          setRecipe(data.recipe);
          setActiveImage(data.recipe.image || data.recipe.images?.[0] || "");
        } else {
          setError("Recipe not found");
        }
      } catch (err: any) {
        console.error("Error fetching recipe:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchRecipeDetails();
  }, [id]);

  // CHECK FAVORITE STATUS & LISTEN TO SYNC EVENTS
  useEffect(() => {
    if (!session?.user?.id || !id) {
      setIsFavorite(false);
      return;
    }

    const checkStatuses = async () => {
      try {
        const favResponse = await fetch(
          `http://localhost:5000/api/favorites/check?userId=${session.user.id}&recipeId=${id}`,
          { credentials: "include" }
        );
        const favContentType = favResponse.headers.get("content-type");
        if (favContentType && favContentType.includes("application/json")) {
          const favData = await favResponse.json();
          if (favResponse.ok && favData.success) {
            setIsFavorite(favData.isFavorite);
          }
        }
      } catch (error) {
        console.error("Status check error:", error);
      }
    };

    checkStatuses();

    const handleRecipeUpdate = () => {
      checkStatuses();
    };

    window.addEventListener("recipeUpdated", handleRecipeUpdate);
    window.addEventListener("collectionUpdated", handleRecipeUpdate);
    return () => {
      window.removeEventListener("recipeUpdated", handleRecipeUpdate);
      window.removeEventListener("collectionUpdated", handleRecipeUpdate);
    };
  }, [session?.user?.id, id]);

  // OPTIMISTIC FAVORITE TOGGLE HANDLER
  const handleFavoriteToggle = async () => {
    if (!session?.user?.id) {
      toast.error("Please login to save recipes.");
      return;
    }

    if (!recipe?.id || isFavoriteLoading) return;

    const previousState = isFavorite;
    const nextState = !previousState;

    setIsFavorite(nextState);
    setIsFavoriteLoading(true);

    try {
      const method = previousState ? "DELETE" : "POST";
      const response = await fetch("http://localhost:5000/api/favorites", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId: session.user.id,
          recipeId: recipe.id,
        }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await response.text();
        console.error("Non-JSON response:", textResponse);
        throw new Error("Server returned an invalid response.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update favorites");
      }

      if (nextState) {
        toast.success("Added to favorites!");
      } else {
        toast.success("Removed from favorites!");
      }

      window.dispatchEvent(new Event("recipeUpdated"));
    } catch (err: any) {
      console.error("Favorite toggle error:", err);
      setIsFavorite(previousState);
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsFavoriteLoading(false);
    }
  };

  // FETCH COLLECTIONS HELPER
  const fetchCollections = async () => {
    if (!session?.user?.id) return;
    setLoadingCollections(true);
    try {
      const res = await fetch(`http://localhost:5000/api/collections?userId=${session.user.id}`);
      const data = await res.json();
      if (data.success) {
        setCollections(data.collections);
      } else {
        setCollections([]);
      }
    } catch (err) {
      console.error("Failed to fetch collections:", err);
      toast.error("Failed to load collections");
    } finally {
      setLoadingCollections(false);
    }
  };

  // OPEN COLLECTION MODAL
  const handleOpenCollectionModal = async () => {
    if (!session?.user?.id) {
      toast.error("Please login first to save recipes to collections.");
      return;
    }

    if (!recipe?.id) return;

    setIsCollectionModalOpen(true);
    setIsCreatingNew(false);
    setNewCollectionName("");
    await fetchCollections();
  };

  // SAVE TO SPECIFIC COLLECTION WITH TOAST
  const handleAddToCollection = async (collectionId: string) => {
    if (!recipe?.id) return;

    try {
      const res = await fetch("http://localhost:5000/api/collections/add-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collectionId, recipeId: recipe.id }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Recipe added to collection successfully!");
        setIsCollectionModalOpen(false);
        window.dispatchEvent(new Event("collectionUpdated"));
      } else {
        toast.error(data.message || "Recipe already exists in this collection");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  // CREATE NEW COLLECTION FROM MODAL
  const handleCreateCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionName.trim()) {
      toast.error("Please enter a collection name");
      return;
    }

    if (!session?.user?.id) return;

    setIsSubmittingNew(true);
    try {
      const res = await fetch("http://localhost:5000/api/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user.id,
          name: newCollectionName.trim(),
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Collection created successfully!");
        setNewCollectionName("");
        setIsCreatingNew(false);
        await fetchCollections();
        if (data.collection?.id) {
          await handleAddToCollection(data.collection.id);
        }
        window.dispatchEvent(new Event("collectionUpdated"));
      } else {
        toast.error(data.message || "Failed to create collection");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsSubmittingNew(false);
    }
  };

  // HELPER TO VALIDATE AUTHOR IMAGE URL
  const isValidAuthorImage = (url?: string | null): boolean => {
    if (!url || typeof url !== "string") return false;
    const trimmed = url.trim();
    if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
      return false;
    }
    const lower = trimmed.toLowerCase();
    if (lower.includes("facebook.com") || lower.includes("fbcdn.net")) {
      return false;
    }
    return true;
  };

  if (loading) {
    return <RecipeDetailsSkeleton />;
  }

  if (error || !recipe) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white text-gray-900 dark:bg-black dark:text-white">
        <p className="text-lg font-medium text-red-500">Error: {error || "Recipe not found"}</p>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded-xl bg-[#24733E] px-4 py-2 text-sm font-bold text-white hover:bg-[#1e5d32]"
        >
          <ArrowLeft className="h-4 w-4" /> Go Back
        </button>
      </div>
    );
  }

  const formattedInstructions: string[] = typeof recipe.instructions === "string"
    ? recipe.instructions.split("\n").filter(Boolean)
    : Array.isArray(recipe.instructions)
      ? recipe.instructions
      : [];

  const thumbnailList = recipe.images?.length ? recipe.images : [recipe.image];

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-900 transition-colors duration-200 dark:bg-black dark:text-white pb-16">
      <div className="mx-auto max-w-7xl px-4 py-6">

        {/* BREADCRUMB */}
        <div className="mb-4 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="cursor-pointer hover:underline" onClick={() => router.push("/")}>Home</span>
          <span>/</span>
          <span className="cursor-pointer hover:underline" onClick={() => router.back()}>Recipes</span>
          <span>/</span>
          <span className="font-semibold text-gray-800 dark:text-white">{recipe.title}</span>
        </div>

        {/* TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT MAIN CONTENT AREA */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* HERO SECTION / OVERVIEW */}
            <div id="overview" className="grid grid-cols-1 md:grid-cols-12 items-center bg-white dark:bg-[#131B2E] p-6 rounded-[28px] border border-gray-100 dark:border-white/15 shadow-sm gap-6">

              {/* Big Image */}
              <div className="md:col-span-6 flex flex-col gap-3">
                <div className="relative h-[320px] w-full overflow-hidden rounded-[20px] shadow-sm">
                  <Image
                    src={activeImage || recipe.image || "/placeholder.png"}
                    alt={recipe.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority
                  />
                  {/* FAVORITE BUTTON */}
                  <button
                    onClick={handleFavoriteToggle}
                    disabled={isFavoriteLoading}
                    className={`absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-md transition-all shadow-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#131B2E]/80 ${isFavorite ? "text-red-500 bg-red-50 dark:bg-red-950/50" : "text-gray-700 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500"
                      }`}
                    title={isFavorite ? "Remove from favorites" : "Save to favorites"}
                  >
                    <Heart className={`h-4 w-4 transition-transform ${isFavorite ? "fill-red-500 text-red-500 scale-110" : ""}`} />
                  </button>
                </div>

                {/* Small Thumbnails */}
                <div className="grid grid-cols-5 gap-2">
                  {thumbnailList.map((imgUrl, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`relative h-14 rounded-xl overflow-hidden border cursor-pointer transition-all ${activeImage === imgUrl ? "border-[#24733E] ring-2 ring-[#24733E]/30" : "border-gray-200 dark:border-white/10 hover:border-[#24733E]"
                        }`}
                    >
                      <Image src={imgUrl} alt={`thumb-${i}`} fill sizes="100vw" className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Details & Stats */}
              <div className="flex flex-col md:col-span-6 justify-between h-full">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex items-center gap-1 bg-amber-400/10 px-2.5 py-0.5 rounded-full text-amber-500 font-bold text-xs">
                      <Star className="h-3 w-3 fill-current" />
                      <span>{recipe.rating || 0}</span>
                    </span>
                    {recipe.createdAt && (
                      <span className="text-xs text-gray-400">
                        • {new Date(recipe.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  <h1 className="mb-2 text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                    {recipe.title}
                  </h1>

                  {/* Author Info */}
                  <div className="mb-3 flex items-center gap-2.5">
                    <div className="relative h-7 w-7 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      {isValidAuthorImage(recipe.user?.image) ? (
                        <Image
                          src={recipe.user!.image!}
                          alt="Author"
                          fill
                          sizes="100vw"
                          className="object-cover"
                        />
                      ) : (
                        <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      )}
                    </div>
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200">{recipe.user?.name || "Anonymous Chef"}</span>
                  </div>

                  <p className="mb-4 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {recipe.description || "A delicious and wholesome recipe crafted with fresh ingredients and wonderful flavors."}
                  </p>
                </div>

                {/* TIME, SERVINGS & CALORIES BAR */}
                <div className="grid grid-cols-4 gap-1 py-2.5 px-3 rounded-xl bg-[#FAFAFA] dark:bg-black border border-gray-100 dark:border-white/10 mb-4">
                  <div className="flex flex-col items-center text-center">
                    <Clock className="h-3.5 w-3.5 text-[#24733E] dark:text-[#10B981] mb-0.5" />
                    <span className="text-[9px] text-gray-400">Prep Time</span>
                    <span className="text-[11px] font-bold text-gray-800 dark:text-white">{recipe.prepTime || 15} min</span>
                  </div>
                  <div className="flex flex-col items-center text-center border-x border-gray-200 dark:border-white/10">
                    <Flame className="h-3.5 w-3.5 text-orange-500 mb-0.5" />
                    <span className="text-[9px] text-gray-400">Cook Time</span>
                    <span className="text-[11px] font-bold text-gray-800 dark:text-white">{recipe.time} min</span>
                  </div>
                  <div className="flex flex-col items-center text-center border-r border-gray-200 dark:border-white/10">
                    <Users className="h-3.5 w-3.5 text-blue-500 mb-0.5" />
                    <span className="text-[9px] text-gray-400">Servings</span>
                    <span className="text-[11px] font-bold text-gray-800 dark:text-white">{recipe.servings || 2}</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Award className="h-3.5 w-3.5 text-amber-500 mb-0.5" />
                    <span className="text-[9px] text-gray-400">Calories</span>
                    <span className="text-[11px] font-bold text-gray-800 dark:text-white">{recipe.calories} kcal</span>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleOpenCollectionModal}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-sm cursor-pointer bg-[#24733E] text-white hover:bg-[#1e5d32]"
                  >
                    <Folder className="h-3.5 w-3.5" />
                    <span>Save Recipe</span>
                  </button>

                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: recipe.title, url: window.location.href }).catch(() => { });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        toast.success("Link copied to clipboard!");
                      }
                    }}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1C2538] text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 cursor-pointer"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Share</span>
                  </button>
                </div>

              </div>
            </div>

            {/* NAVIGATION TABS BAR */}
            <div className="sticky top-0 z-20 bg-[#F9FAFB] dark:bg-black py-2 flex items-center gap-6 border-b border-gray-200 dark:border-white/10 overflow-x-auto">
              {["Overview", "Ingredients", "Instructions", "Nutrition", "Reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    const element = document.getElementById(tab.toLowerCase());
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className={`pb-3 text-xs font-bold whitespace-nowrap transition-colors relative cursor-pointer ${activeTab === tab
                    ? "text-[#24733E] dark:text-[#10B981]"
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#24733E] dark:bg-[#10B981]" />
                  )}
                </button>
              ))}
            </div>

            {/* INGREDIENTS & INSTRUCTIONS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

              {/* INGREDIENTS */}
              <div id="ingredients" className="md:col-span-5 bg-white dark:bg-[#131B2E] p-5 rounded-[24px] border border-gray-100 dark:border-white/10 shadow-sm scroll-mt-16">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ChefHat className="h-4 w-4 text-[#24733E] dark:text-[#10B981]" />
                    <h2 className="text-sm font-bold text-gray-900 dark:text-white">Ingredients</h2>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-[#24733E] dark:text-[#10B981]">
                    {recipe.ingredients?.length || 0} items
                  </span>
                </div>

                <ul className="flex flex-col gap-2.5">
                  {recipe.ingredients && recipe.ingredients.length > 0 ? (
                    recipe.ingredients.map((item, index) => (
                      <li key={index} className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300 pb-2 border-b border-gray-50 dark:border-white/5 last:border-none">
                        <div className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#24733E] dark:bg-[#10B981]" />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <span className="text-gray-400 text-[11px]">{item.measure || ""}</span>
                      </li>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400">No ingredients specified.</p>
                  )}
                </ul>
              </div>

              {/* INSTRUCTIONS */}
              <div id="instructions" className="md:col-span-7 bg-white dark:bg-[#131B2E] p-5 rounded-[24px] border border-gray-100 dark:border-white/10 shadow-sm scroll-mt-16">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-sm font-bold text-gray-900 dark:text-white">Instructions</h2>
                  <span className="text-[10px] text-gray-400">{formattedInstructions.length} steps</span>
                </div>

                <div className="flex flex-col gap-3">
                  {formattedInstructions.length > 0 ? (
                    formattedInstructions.map((step, index) => (
                      <div key={index} className="flex gap-3 p-3 rounded-xl bg-[#FAFAFA] dark:bg-black/40 border border-gray-100 dark:border-white/5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#24733E] text-[10px] font-bold text-white dark:bg-[#10B981] dark:text-black">
                          {index + 1}
                        </span>
                        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                          {step}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400">No instructions provided.</p>
                  )}
                </div>
              </div>

            </div>

            {/* NUTRITION INFORMATION */}
            <div id="nutrition" className="bg-white dark:bg-[#131B2E] p-5 rounded-[24px] border border-gray-100 dark:border-white/10 shadow-sm scroll-mt-16">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-gray-900 dark:text-white">Nutrition Information</h2>
                <span className="text-[10px] text-gray-400">Per serving</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="flex flex-col items-center p-2.5 rounded-xl bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-white/5">
                  <Flame className="h-4 w-4 text-orange-500 mb-1" />
                  <span className="text-xs font-bold text-gray-800 dark:text-white">{recipe.calories} kcal</span>
                  <span className="text-[9px] text-gray-400">Calories</span>
                </div>
                <div className="flex flex-col items-center p-2.5 rounded-xl bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-white/5">
                  <span className="text-xs font-black text-[#24733E] dark:text-[#10B981] mb-0.5">{recipe.carbs ?? 58} g</span>
                  <span className="text-[11px] font-bold text-gray-800 dark:text-white">Carbs</span>
                  <span className="text-[9px] text-gray-400">Total</span>
                </div>
                <div className="flex flex-col items-center p-2.5 rounded-xl bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-white/5">
                  <span className="text-xs font-black text-[#24733E] dark:text-[#10B981] mb-0.5">{recipe.protein ?? 32} g</span>
                  <span className="text-[11px] font-bold text-gray-800 dark:text-white">Protein</span>
                  <span className="text-[9px] text-gray-400">High</span>
                </div>
                <div className="flex flex-col items-center p-2.5 rounded-xl bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-white/5">
                  <span className="text-xs font-black text-[#24733E] dark:text-[#10B981] mb-0.5">{recipe.fat ?? 18} g</span>
                  <span className="text-[11px] font-bold text-gray-800 dark:text-white">Fat</span>
                  <span className="text-[9px] text-gray-400">Healthy</span>
                </div>
                <div className="flex flex-col items-center p-2.5 rounded-xl bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-white/5 col-span-2 md:col-span-1">
                  <span className="text-xs font-black text-[#24733E] dark:text-[#10B981] mb-0.5">{recipe.fiber ?? 6} g</span>
                  <span className="text-[11px] font-bold text-gray-800 dark:text-white">Fiber</span>
                  <span className="text-[9px] text-gray-400">Dietary</span>
                </div>
              </div>
            </div>

            {/* REVIEWS SECTION */}
            <div id="reviews" className="bg-white dark:bg-[#131B2E] p-5 rounded-[24px] border border-gray-100 dark:border-white/10 shadow-sm scroll-mt-16">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4">What people are saying</h2>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pb-6 border-b border-gray-100 dark:border-white/10">
                <div className="md:col-span-4 flex flex-col items-center justify-center text-center border-r border-gray-100 dark:border-white/10">
                  <span className="text-3xl font-black text-gray-900 dark:text-white">{recipe.rating || 4.8}</span>
                  <div className="flex text-amber-400 my-1">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400">{recipe.totalReviews || recipe.reviews?.length || 24} total reviews</span>
                </div>

                <div className="md:col-span-8 flex flex-col gap-1.5">
                  {[
                    { stars: 5, count: 18, width: "90%" },
                    { stars: 4, count: 5, width: "40%" },
                    { stars: 3, count: 1, width: "15%" },
                    { stars: 2, count: 0, width: "0%" },
                    { stars: 1, count: 0, width: "0%" },
                  ].map((row) => (
                    <div key={row.stars} className="flex items-center gap-2 text-[11px] text-gray-500">
                      <span>{row.stars}</span>
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <div className="flex-1 h-2 bg-gray-100 dark:bg-black rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: row.width }} />
                      </div>
                      <span className="w-4 text-right">{row.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {recipe.reviews && recipe.reviews.length > 0 ? (
                recipe.reviews.map((rev) => (
                  <div key={rev.id} className="pt-4 flex gap-3 border-b border-gray-50 dark:border-white/5 last:border-none">
                    <div className="relative h-8 w-8 rounded-full overflow-hidden shrink-0 bg-gray-200">
                      {isValidAuthorImage(rev.userImage) ? (
                        <Image src={rev.userImage!} alt={rev.userName} fill sizes="100vw" className="object-cover" />
                      ) : (
                        <Users className="h-4 w-4 m-auto text-gray-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-gray-800 dark:text-white">{rev.userName}</span>
                          <span className="text-[10px] text-gray-400 ml-2">{rev.timeAgo}</span>
                        </div>
                        <div className="flex text-amber-400">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                        {rev.comment}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-[11px] text-gray-400">
                        <button className="flex items-center gap-1 hover:text-[#24733E]"><ThumbsUp className="h-3 w-3" /> {rev.likes}</button>
                        <button className="flex items-center gap-1 hover:text-red-500"><ThumbsDown className="h-3 w-3" /> {rev.dislikes}</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="pt-4 flex gap-3">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden shrink-0">
                    <Image src={recipe.image || "/placeholder.png"} alt="Reviewer" fill sizes="100vw" className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-gray-800 dark:text-white">{recipe.user?.name || "Community Member"}</span>
                        <span className="text-[10px] text-gray-400 ml-2">Recently</span>
                      </div>
                      <div className="flex text-amber-400">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      {recipe.description || "A wonderful recipe! Highly recommended for everyone to try."}
                    </p>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* RIGHT SIDEBAR COMPONENT */}
          <DetailsSidebar
            recipeId={recipe.id}
            recipeCategory={recipe.category} 
            recipeImage={recipe.image}
            recipeUser={recipe.user}
          />

        </div>

      </div>

      {/* ADD TO COLLECTION MODAL  */}
      {isCollectionModalOpen && (
        <div 
          onClick={(e) => e.stopPropagation()} 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
        >
          <div className="bg-white dark:bg-[#131B2E] border border-gray-200 dark:border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Save to Collection</h3>
              <button 
                onClick={() => setIsCollectionModalOpen(false)} 
                className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {!isCreatingNew ? (
              <>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {loadingCollections ? (
                    <p className="text-xs text-gray-400 text-center py-4">Loading your collections...</p>
                  ) : collections.length > 0 ? (
                    collections.map((col) => (
                      <div
                        key={col.id}
                        onClick={() => handleAddToCollection(col.id)}
                        className="flex justify-between items-center p-3 border border-gray-100 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-2">
                          <Folder className="w-4 h-4 text-[#24733E] dark:text-[#10B981]" />
                          <span className="font-medium text-xs text-gray-800 dark:text-gray-200">{col.name}</span>
                        </div>
                        <span className="text-[10px] bg-[#EAF4EB] text-[#24733E] dark:bg-[#10B981]/20 dark:text-[#10B981] px-2.5 py-1 rounded-lg font-bold group-hover:bg-[#24733E] group-hover:text-white transition-colors">
                          Save
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 text-center py-4">
                      No collections found yet.
                    </p>
                  )}
                </div>

                {/* CREATE NEW COLLECTION TRIGGER BUTTON */}
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsCreatingNew(true)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-dashed border-[#24733E] dark:border-[#10B981] text-[#24733E] dark:text-[#10B981] text-xs font-bold hover:bg-[#24733E]/5 dark:hover:bg-[#10B981]/10 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create New Collection</span>
                  </button>
                </div>
              </>
            ) : (
              /* CREATE NEW COLLECTION FORM */
              <form onSubmit={handleCreateCollection} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Collection Name
                  </label>
                  <input
                    type="text"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    placeholder="e.g., Weekend Brunch, Keto..."
                    autoFocus
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-900 shadow-sm outline-none transition-all focus:border-[#24733E] dark:border-white/10 dark:bg-[#1A233A] dark:text-white dark:focus:border-[#10B981]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={isSubmittingNew}
                    className="flex-1 bg-[#24733E] hover:bg-[#1d5c32] dark:bg-[#10B981] dark:hover:bg-[#0e9f6e] text-white text-xs font-bold py-2 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isSubmittingNew ? "Creating..." : "Create & Save"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCreatingNew(false)}
                    className="px-3 py-2 text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
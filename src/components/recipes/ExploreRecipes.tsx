"use client";

import { useState, useMemo, useEffect } from "react";
import RecipeCard from "@/components/recipes/RecipeCard";
import FilterCard from "@/components/recipes/FilterCard";
import Pagination from "@/components/recipes/Pagination";

import {
  SlidersHorizontal,
  LayoutGrid,
  List,
  Clock,
  Flame,
  ArrowUpRight,
  Folder,
  ArrowLeft,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import Sidebar from "./Sidebar";
import toast from "react-hot-toast";
import RecipeSkeleton from "./RecipeSkeleton";

interface Recipe {
  id: string;
  title: string;
  image: string;
  rating: number;
  time: number;
  calories: number;
  cuisine?: string;
  category?: string;
  diet?: string;
  difficulty?: string;
  ingredients?: any[];
}

interface Collection {
  id: string;
  name: string;
  recipes?: { recipe: Recipe }[];
  createdAt?: string;
}

export default function ExploreRecipes() {
  // ================= SESSION =================
  const { data: session } = authClient.useSession();

  // ================= RECIPES & COLLECTIONS =================
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ================= DYNAMIC DROPDOWN OPTIONS =================
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableCuisines, setAvailableCuisines] = useState<string[]>([]);

  // ================= TABS & COLLECTION SELECTION =================
  const [activeTab, setActiveTab] = useState("All Recipes");
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
  const [selectedCollectionName, setSelectedCollectionName] = useState<string | null>(null);

  // ================= VIEW MODE =================
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // ================= FILTERS =================
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDiet, setSelectedDiet] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [maxTime, setMaxTime] = useState(60);
  const [maxCalories, setMaxCalories] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("Latest");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  //  PAGINATION 
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 12;

  // FETCH DATA
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        if (activeTab === "My Collections" && !selectedCollectionId) {
          if (!session?.user?.id) {
            setCollections([]);
            setLoading(false);
            return;
          }

          const response = await fetch(
            `http://localhost:5000/api/collections?userId=${session.user.id}`,
            { credentials: "include" }
          );
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Failed to fetch collections");
          }

          if (data.success && Array.isArray(data.collections)) {
            setCollections(data.collections);
          } else {
            setCollections([]);
          }
          setRecipes([]);
          setLoading(false);
          return;
        }

        const params = new URLSearchParams();

        if (searchQuery.trim()) {
          params.append("search", searchQuery.trim());
        }
        if (selectedCategory !== "All") {
          params.append("category", selectedCategory);
        }
        if (selectedCuisine !== "All") {
          params.append("cuisine", selectedCuisine);
        }
        if (maxTime < 60) {
          params.append("maxTime", String(maxTime));
        }
        if (maxCalories < 1000) {
          params.append("maxCalories", String(maxCalories));
        }
        if (minRating > 0) {
          params.append("minRating", String(minRating));
        }
        if (sortBy !== "Latest") {
          params.append("sortBy", sortBy);
        }

        if (activeTab === "My Recipes") {
          params.append("tab", "my-recipes");
          if (session?.user?.id) {
            params.append("userId", session.user.id);
          }
        } else if (activeTab === "Favorite Recipes") {
          params.append("tab", "favorites");
          if (session?.user?.id) {
            params.append("userId", session.user.id);
          }
        } else if (activeTab === "My Collections" && selectedCollectionId) {
          params.append("tab", "collections");
          if (session?.user?.id) {
            params.append("userId", session.user.id);
          }
        }

        const response = await fetch(
          `http://localhost:5000/api/recipes?${params.toString()}`,
          { credentials: "include" }
        );

        const contentType = response.headers.get("content-type");
        let data;
        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          const text = await response.text();
          console.error("Non-JSON response:", text.substring(0, 200));
          throw new Error("Received non-JSON response from server");
        }

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch recipes");
        }

        if (data.success && Array.isArray(data.recipes)) {
          let fetchedRecipes = data.recipes;

          if (activeTab === "My Collections" && selectedCollectionId) {
            const currentCollection = collections.find((c) => c.id === selectedCollectionId);
            if (currentCollection && currentCollection.recipes) {
              const allowedRecipeIds = currentCollection.recipes.map((r) => r.recipe.id);
              fetchedRecipes = fetchedRecipes.filter((r: Recipe) => allowedRecipeIds.includes(r.id));
            }
          }

          setRecipes(fetchedRecipes);

          if (selectedCategory === "All" && selectedCuisine === "All" && !searchQuery) {
            const uniqueCategories = Array.from(
              new Set(fetchedRecipes.map((recipe: any) => recipe.category).filter(Boolean))
            ) as string[];

            const uniqueCuisines = Array.from(
              new Set(fetchedRecipes.map((recipe: any) => recipe.cuisine).filter(Boolean))
            ) as string[];

            if (uniqueCategories.length > 0) setAvailableCategories(uniqueCategories);
            if (uniqueCuisines.length > 0) setAvailableCuisines(uniqueCuisines);
          }
        } else {
          setRecipes([]);
        }
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || "An error occurred while fetching data");
        setRecipes([]);
        setCollections([]);
      } finally {
        setLoading(false);
      }
    }

    if (
      (activeTab === "My Recipes" ||
        activeTab === "Favorite Recipes" ||
        activeTab === "My Collections") &&
      !session?.user?.id
    ) {
      setRecipes([]);
      setCollections([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(timer);
  }, [
    activeTab,
    selectedCollectionId,
    session?.user?.id,
    searchQuery,
    selectedCategory,
    selectedCuisine,
    maxTime,
    maxCalories,
    minRating,
    sortBy,
  ]);

  // ================= COLLECTION UPDATED EVENT LISTENER =================
  useEffect(() => {
    const handleCollectionUpdate = async () => {
      if (activeTab === "My Collections" && !selectedCollectionId && session?.user?.id) {
        try {
          const response = await fetch(
            `http://localhost:5000/api/collections?userId=${session.user.id}`,
            { credentials: "include" }
          );
          const data = await response.json();
          if (response.ok && data.success && Array.isArray(data.collections)) {
            setCollections(data.collections);
          }
        } catch (err) {
          console.error("Failed to fetch collections on update:", err);
        }
      }
    };

    window.addEventListener("collectionUpdated", handleCollectionUpdate);
    return () => {
      window.removeEventListener("collectionUpdated", handleCollectionUpdate);
    };
  }, [activeTab, selectedCollectionId, session?.user?.id]);

  // ================= DELETE COLLECTION HANDLER =================
  const handleDeleteCollection = async (e: React.MouseEvent, collectionId: string) => {
    e.stopPropagation();

    try {
      const response = await fetch(`http://localhost:5000/api/collections`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          collectionId,
          userId: session?.user?.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete collection");
      }

      setCollections((prev) => prev.filter((col) => col.id !== collectionId));
      window.dispatchEvent(new Event("collectionUpdated"));
      toast.success("Collection deleted successfully!");
    } catch (err: any) {
      console.error("Delete error:", err);
      toast.error(err.message || "Something went wrong while deleting");
    }
  };

  // PAGINATION
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const currentRecipes = useMemo(() => {
    const startIndex = (currentPage - 1) * recipesPerPage;
    return recipes.slice(startIndex, startIndex + recipesPerPage);
  }, [recipes, currentPage]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCuisine("All");
    setSelectedCategory("All");
    setSelectedDiet("All");
    setSelectedDifficulty("All");
    setMaxTime(60);
    setMaxCalories(1000);
    setMinRating(0);
    setSortBy("Latest");
    setCurrentPage(1);
  };

  const isFiltered = Boolean(
    searchQuery ||
      selectedCuisine !== "All" ||
      selectedCategory !== "All" ||
      maxTime < 60 ||
      maxCalories < 1000 ||
      minRating > 0 ||
      sortBy !== "Latest"
  );

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white text-gray-900 dark:bg-black dark:text-white">
        <p className="text-lg font-medium text-red-500">Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="cursor-pointer rounded-xl bg-[#24733E] px-4 py-2 text-sm font-bold text-white hover:bg-[#1e5d32]"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-200 dark:bg-black dark:text-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        
        {/* TOP BIG FILTER CARD  */}
        <div className="mb-8 w-full">
          <FilterCard
            searchQuery={searchQuery}
            setSearchQuery={(q) => {
              setSearchQuery(q);
              setCurrentPage(1);
            }}
            selectedCategory={selectedCategory}
            setSelectedCategory={(c) => {
              setSelectedCategory(c);
              setCurrentPage(1);
            }}
            selectedCuisine={selectedCuisine}
            setSelectedCuisine={(c) => {
              setSelectedCuisine(c);
              setCurrentPage(1);
            }}
            sortBy={sortBy}
            setSortBy={(s) => {
              setSortBy(s);
              setCurrentPage(1);
            }}
            showAdvancedFilters={showAdvancedFilters}
            setShowAdvancedFilters={setShowAdvancedFilters}
            maxTime={maxTime}
            setMaxTime={(t) => {
              setMaxTime(t);
              setCurrentPage(1);
            }}
            maxCalories={maxCalories}
            setMaxCalories={(c) => {
              setMaxCalories(c);
              setCurrentPage(1);
            }}
            minRating={minRating}
            setMinRating={(r) => {
              setMinRating(r);
              setCurrentPage(1);
            }}
            resetFilters={resetFilters}
            isFiltered={isFiltered}
            availableCategories={availableCategories}
            availableCuisines={availableCuisines}
          />
        </div>

        {/* { MAIN CONTENT + SIDEBAR LAYOUT /} */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 flex flex-col w-full min-w-0">

            <div className="mb-6 flex flex-col gap-4 border-b border-gray-200 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
              
              {/* TABS */}
              <div className="no-scrollbar flex items-center gap-6 overflow-x-auto">
                {[
                  "All Recipes",
                  "My Recipes",
                  "Favorite Recipes",
                  "My Collections",
                ].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      if (tab !== "My Collections") {
                        setSelectedCollectionId(null);
                        setSelectedCollectionName(null);
                      }
                      setCurrentPage(1);
                    }}
                    className={`relative cursor-pointer whitespace-nowrap pb-3 text-sm font-semibold transition-colors ${
                      activeTab === tab
                        ? "text-[#24733E] dark:text-[#10B981]"
                        : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    }`}
                  >
                    {tab === "My Collections" && selectedCollectionName
                      ? `Collection: ${selectedCollectionName}`
                      : tab}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#24733E] dark:bg-[#10B981]" />
                    )}
                  </button>
                ))}
              </div>

              {/* COUNT + VIEW */}
              <div className="flex items-center justify-between gap-4 pb-3 sm:justify-end">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  {activeTab === "My Collections" && !selectedCollectionId
                    ? `${collections.length} Folders`
                    : `${recipes.length} Recipes`}
                </span>

                {!(activeTab === "My Collections" && !selectedCollectionId) && (
                  <div className="flex items-center gap-1 rounded-xl border border-[#E2EBE4] bg-white p-1 dark:border-white/10 dark:bg-[#131B2E]">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`cursor-pointer rounded-lg p-1.5 transition-colors ${
                        viewMode === "grid"
                          ? "bg-[#EAF4EB] text-[#24733E] dark:bg-[#10B981]/20 dark:text-[#10B981]"
                          : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                      }`}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => setViewMode("list")}
                      className={`cursor-pointer rounded-lg p-1.5 transition-colors ${
                        viewMode === "list"
                          ? "bg-[#EAF4EB] text-[#24733E] dark:bg-[#10B981]/20 dark:text-[#10B981]"
                          : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* MAIN CONTENT AREA (LOADING SKELETON, FOLDERS OR RECIPES) */}
            {loading ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <RecipeSkeleton key={i} />
                ))}
              </div>
            ) : activeTab === "My Collections" && !selectedCollectionId ? (
              collections.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {collections.map((col) => (
                    <div
                      key={col.id}
                      onClick={() => {
                        setSelectedCollectionId(col.id);
                        setSelectedCollectionName(col.name);
                        setCurrentPage(1);
                      }}
                      className="group flex cursor-pointer items-center justify-between rounded-[20px] border border-[#E2EBE4] bg-white p-5 shadow-sm transition-all hover:border-[#24733E] hover:shadow-md dark:border-white/10 dark:bg-[#131B2E] dark:hover:border-[#10B981]"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF4EB] text-[#24733E] dark:bg-[#10B981]/20 dark:text-[#10B981]">
                          <Folder className="h-6 w-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="truncate font-bold text-gray-900 group-hover:text-[#24733E] dark:text-white dark:group-hover:text-[#10B981]">
                            {col.name}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {col.recipes?.length || 0} recipes
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0 ml-2">
                        <button
                          onClick={(e) => handleDeleteCollection(e, col.id)}
                          title="Delete Collection"
                          className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-[#24733E] dark:group-hover:text-[#10B981]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-[24px] border border-[#E2EBE4] bg-white py-16 text-center shadow-sm dark:border-white/10 dark:bg-[#131B2E]">
                  <Folder className="mx-auto mb-3 h-12 w-12 text-gray-300 dark:text-gray-500" />
                  <h3 className="mb-1 text-lg font-bold text-gray-800 dark:text-white">
                    No collection folders found
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Create a collection folder to start organizing your recipes.
                  </p>
                </div>
              )
            ) : (
              <div className="flex flex-col w-full">
                
                {/* ====== BACK BUTTON ====== */}
                {activeTab === "My Collections" && selectedCollectionId && (
                  <button
                    onClick={() => {
                      setSelectedCollectionId(null);
                      setSelectedCollectionName(null);
                      setCurrentPage(1);
                    }}
                    className="group mb-6 flex w-fit cursor-pointer items-center gap-2 rounded-[12px] border border-[#E2EBE4] bg-white px-4 py-2 text-sm font-bold text-gray-600 shadow-sm transition-all hover:border-[#24733E] hover:text-[#24733E] dark:border-white/10 dark:bg-[#131B2E] dark:text-gray-300 dark:hover:border-[#10B981] dark:hover:text-[#10B981]"
                  >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Folders
                  </button>
                )}
                {/* ========================= */}

                {currentRecipes.length > 0 ? (
                  viewMode === "grid" ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {currentRecipes.map((recipe, index) => (
                        <div key={recipe.id} className="w-full min-w-0">
                          <RecipeCard 
                            recipe={recipe} 
                            index={index}
                            onFavoriteRemoved={(removedId) => {
                              // Only remove instantly if we are on the Favorite Recipes tab
                              if (activeTab === "Favorite Recipes") {
                                setRecipes((prev) => prev.filter((r) => r.id !== removedId));
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {currentRecipes.map((recipe) => (
                        <div
                          key={recipe.id}
                          className="flex flex-col items-center gap-6 rounded-[24px] border border-[#E2EBE4] bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-white/10 dark:bg-[#131B2E] md:flex-row"
                        >
                          <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-2xl bg-gray-100 dark:bg-black md:w-56">
                            <Image
                              src={recipe.image}
                              alt={recipe.title}
                              fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover"
                            />
                            <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full border border-white/10 bg-white/90 px-2.5 py-1 text-xs font-bold text-gray-800 shadow-sm backdrop-blur-md dark:bg-[#131B2E]/90 dark:text-white">
                              ⭐ {recipe.rating}
                            </div>
                          </div>

                          <div className="flex w-full flex-1 flex-col justify-between">
                            <div>
                              <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
                                {recipe.title}
                              </h3>
                              <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
                                Homemade • Delicious • Easy to make
                              </p>

                              <div className="mb-4 flex w-fit flex-wrap items-center gap-6 rounded-xl border border-gray-100 bg-[#FAFAFA] px-4 py-3 text-xs dark:border-white/10 dark:bg-black">
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                  <Clock className="h-4 w-4 text-[#24733E] dark:text-[#10B981]" />
                                  <span>{recipe.time} mins</span>
                                </div>

                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                  <Flame className="h-4 w-4 text-orange-500" />
                                  <span>{recipe.calories} kcal</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-gray-100 pt-2 dark:border-white/10">
                              <span className="rounded-full bg-[#EAF4EB] px-3 py-1 text-xs font-semibold text-[#24733E] dark:bg-[#132A26] dark:text-[#10B981]">
                                {recipe.cuisine || "Recipe"}
                              </span>

                              <button className="flex cursor-pointer items-center gap-1.5 text-xs font-bold text-[#24733E] hover:underline dark:text-[#10B981]">
                                <span>View Recipe</span>
                                <ArrowUpRight className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                ) : (
                  <div className="rounded-[24px] border border-[#E2EBE4] bg-white py-16 text-center shadow-sm dark:border-white/10 dark:bg-[#131B2E]">
                    <SlidersHorizontal className="mx-auto mb-3 h-12 w-12 text-gray-300 dark:text-gray-500" />
                    <h3 className="mb-1 text-lg font-bold text-gray-800 dark:text-white">
                      {activeTab === "My Recipes"
                        ? "You haven't created any recipes yet"
                        : activeTab === "Favorite Recipes"
                        ? "No favorite recipes yet"
                        : activeTab === "My Collections"
                        ? "No recipes in this collection yet"
                        : "No recipes found"}
                    </h3>
                    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                      {activeTab === "Favorite Recipes"
                        ? "Love a recipe to save it here."
                        : activeTab === "My Collections"
                        ? "Add recipes to this collection to see them here."
                        : "Try adjusting your search or selecting a different filter."}
                    </p>
                    {activeTab === "All Recipes" && (
                      <button
                        onClick={resetFilters}
                        className="cursor-pointer rounded-[12px] bg-[#24733E] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#1e5d32] dark:bg-[#10B981] dark:hover:bg-[#059669]"
                      >
                        Clear all filters
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && !(activeTab === "My Collections" && !selectedCollectionId) && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            )}
          </div>

          {/* ================= RIGHT SIDEBAR (Span 4) ================= */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full">
            <Sidebar
              selectedCollectionId={selectedCollectionId}
              onSelectCollection={(colId, colName) => {
                setActiveTab("My Collections");
                setSelectedCollectionId(colId || null);
                setSelectedCollectionName(colName || null);
                setCurrentPage(1);
              }}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Sparkles,
  Plus,
  Trash2,
  Clock,
  ChefHat,
  Flame,
  Search,
  Check,
  FileText,
  Salad,
  Loader2,
} from "lucide-react";
import { Post, RecipeDetail, Ingredient, CookingStep } from "./types";
import { CURRENT_USER } from "./mockData";
import { fetchMealDbRecipes } from "./mealDbService";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishPost: (post: Post, imageFile?: File) => Promise<void> | void;
  initialUseAI?: boolean;
}

const PRESET_FOOD_PHOTOS = [
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=900&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=80",
];

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onPublishPost,
  initialUseAI = false,
}) => {
  const [activeTab, setActiveTab] = useState<"standard" | "ai_import">(initialUseAI ? "ai_import" : "standard");

  // Form Fields
  const [caption, setCaption] = useState("");
  const [title, setTitle] = useState("");
  const [cuisine, setCuisine] = useState("Healthy Fusion");
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");
  const [prepTime, setPrepTime] = useState(15);
  const [cookTime, setCookTime] = useState(20);
  const [servings, setServings] = useState(2);
  const [selectedPhoto, setSelectedPhoto] = useState(PRESET_FOOD_PHOTOS[0]);
  const [customPhotoUrl, setCustomPhotoUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [isPublishing, setIsPublishing] = useState(false);
  const [tagsInput, setTagsInput] = useState("#PantryToPlate, #HealthyDinner, #FoodCanvas");
  const [isChallengeEntry, setIsChallengeEntry] = useState(false);

  // Nutrition
  const [calories, setCalories] = useState(420);
  const [protein, setProtein] = useState(28);
  const [carbs, setCarbs] = useState(40);
  const [fat, setFat] = useState(14);

  // Ingredients & Steps
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "Fresh Chicken Breast or Tofu", amount: "300g" },
    { name: "Extra Virgin Olive Oil", amount: "2 tbsp" },
    { name: "Minced Garlic & Herbs", amount: "1 tbsp" },
    { name: "Steamed Greens / Veggies", amount: "2 cups" },
  ]);

  const [steps, setSteps] = useState<CookingStep[]>([
    {
      stepNumber: 1,
      instruction: "Season the main protein thoroughly with herbs, minced garlic, sea salt, and olive oil.",
      durationMinutes: 5,
      tip: "Let sit for 5 minutes to absorb aromatics.",
    },
    {
      stepNumber: 2,
      instruction: "Sear in a hot pan over medium heat for 6-8 minutes per side until golden and cooked through.",
      durationMinutes: 12,
    },
    {
      stepNumber: 3,
      instruction: "Plate over seasoned vegetables and finish with a squeeze of fresh lemon juice.",
      durationMinutes: 3,
    },
  ]);

  // AI & TheMealDB Import states
  const [apiSearchQuery, setApiSearchQuery] = useState("Chicken");
  const [isSearchingApi, setIsSearchingApi] = useState(false);
  const [apiResults, setApiResults] = useState<Post[]>([]);

  if (!isOpen) return null;

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "" }]);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleAddStep = () => {
    setSteps([
      ...steps,
      {
        stepNumber: steps.length + 1,
        instruction: "",
        durationMinutes: 5,
      },
    ]);
  };

  const handleRemoveStep = (index: number) => {
    const updated = steps.filter((_, i) => i !== index).map((st, idx) => ({ ...st, stepNumber: idx + 1 }));
    setSteps(updated);
  };

  const handleSearchTheMealDb = async () => {
    if (!apiSearchQuery.trim()) return;
    setIsSearchingApi(true);
    try {
      const posts = await fetchMealDbRecipes(apiSearchQuery);
      setApiResults(posts);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearchingApi(false);
    }
  };

  const handleImportApiRecipe = (importedPost: Post) => {
    if (!importedPost.recipe) return;
    setTitle(importedPost.recipe.title);
    setCaption(importedPost.caption);
    setCuisine(importedPost.recipe.cuisine);
    setDifficulty(importedPost.recipe.difficulty);
    setPrepTime(importedPost.recipe.prepTimeMinutes);
    setCookTime(importedPost.recipe.cookTimeMinutes);
    setServings(importedPost.recipe.servings);
    setIngredients(importedPost.recipe.ingredients);
    setSteps(importedPost.recipe.steps);
    setSelectedPhoto(importedPost.imageUrl);
    setCalories(importedPost.recipe.nutrition.calories);
    setProtein(importedPost.recipe.nutrition.protein);
    setCarbs(importedPost.recipe.nutrition.carbs);
    setFat(importedPost.recipe.nutrition.fat);
    setActiveTab("standard");
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedTags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0)
      .map((t) => (t.startsWith("#") ? t : `#${t}`));

    const recipe: RecipeDetail = {
      title: title.trim() || "Delicious Community Dish",
      cuisine,
      difficulty,
      prepTimeMinutes: Number(prepTime),
      cookTimeMinutes: Number(cookTime),
      servings: Number(servings),
      dietaryTags: ["Community Recipe", cuisine],
      ingredients: ingredients.filter((i) => i.name.trim().length > 0),
      steps: steps.filter((s) => s.instruction.trim().length > 0),
      nutrition: {
        calories: Number(calories),
        protein: Number(protein),
        carbs: Number(carbs),
        fat: Number(fat),
      },
      sourceType: activeTab === "ai_import" ? "ai_generated" : "community",
    };

    const newPost: Post = {
      id: `post_${Date.now()}`,
      author: CURRENT_USER,
      caption: caption.trim() || `Cooked this delicious ${title}! Fresh ingredients and incredible flavors. ✨`,
      imageUrl: customPhotoUrl.trim() || selectedPhoto,
      recipe,
      rating: {
        overall: 5.0,
        flavor: 5.0,
        ease: 5.0,
        presentation: 5.0,
        totalReviews: 1,
      },
      likesCount: 1,
      isLiked: true,
      savesCount: 0,
      isSaved: false,
      commentsCount: 0,
      comments: [],
      reviews: [],
      madeItCount: 1,
      hasMadeIt: true,
      tags: parsedTags,
      createdAt: "Just now",
      isChallengeEntry,
      challengeName: isChallengeEntry ? "Summer Harvest Salad Challenge" : undefined,
    };

    setIsPublishing(true);
    try {
      await onPublishPost(newPost, imageFile);
      onClose();
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative my-8 w-full max-w-3xl rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-[#121212] max-h-[90vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2F8F46] text-white">
              <ChefHat className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-neutral-900 dark:text-white">
                Share Recipe & Cooking Experience
              </h3>
              <p className="text-xs text-neutral-500">
                Post your meal, photo, ingredients, and steps to the community feed
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Toggle: Standard vs. AI / TheMealDB Generator */}
        <div className="flex border-b border-slate-100 px-6 pt-3 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900/30">
          <button
            onClick={() => setActiveTab("standard")}
            className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs sm:text-sm font-bold transition ${
              activeTab === "standard"
                ? "border-[#2F8F46] text-[#2F8F46] dark:border-[#B7E35F] dark:text-[#B7E35F]"
                : "border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Manual Recipe Form</span>
          </button>
          <button
            onClick={() => setActiveTab("ai_import")}
            className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs sm:text-sm font-bold transition ${
              activeTab === "ai_import"
                ? "border-[#2F8F46] text-[#2F8F46] dark:border-[#B7E35F] dark:text-[#B7E35F]"
                : "border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <Sparkles className="h-4 w-4 text-[#FF9F43]" />
            <span>Auto-Draft via TheMealDB / AI</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === "ai_import" ? (
            /* AI / TheMealDB Import Panel */
            <div className="space-y-5">
              <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-br from-[#FFF0DD]/70 to-white p-4.5 dark:border-amber-900/40 dark:from-amber-950/20 dark:to-[#121212]">
                <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold text-sm">
                  <Sparkles className="h-4 w-4 text-[#FF9F43]" />
                  <span>Instant Recipe Auto-Draft</span>
                </div>
                <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  Search millions of culinary preparations or staple ingredients. FoodCanvas will automatically format
                  the ingredients, steps, timings, and nutrition for you to tweak and share!
                </p>
              </div>

              {/* Search Bar */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search meal or ingredient (e.g. Salmon, Pasta, Curry, Tacos)..."
                    value={apiSearchQuery}
                    onChange={(e) => setApiSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearchTheMealDb()}
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-900 placeholder-neutral-400 focus:border-[#2F8F46] focus:outline-hidden focus:ring-2 focus:ring-[#2F8F46]/15 dark:border-neutral-700 dark:bg-[#18181b] dark:text-white"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSearchTheMealDb}
                  disabled={isSearchingApi}
                  className="flex items-center gap-2 rounded-xl bg-[#2F8F46] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#176B35] disabled:opacity-50"
                >
                  {isSearchingApi ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  <span>Search</span>
                </button>
              </div>

              {/* AI Scan Animation while loading */}
              {isSearchingApi && (
                <div className="relative h-24 w-full overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4 dark:border-emerald-900 dark:bg-emerald-950/20">
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#2F8F46] to-transparent animate-ai-scan" />
                  <div className="flex flex-col items-center justify-center h-full text-center text-xs text-neutral-600 dark:text-neutral-300">
                    <p className="font-bold text-[#2F8F46] dark:text-[#B7E35F]">Analyzing Culinary Database...</p>
                    <p className="text-[11px] text-neutral-400">
                      Extracting steps, ingredients, and nutritional balance
                    </p>
                  </div>
                </div>
              )}

              {/* Results List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto">
                {apiResults.map((resPost) => (
                  <div
                    key={resPost.id}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 hover:border-[#2F8F46] transition dark:border-neutral-800 dark:bg-[#18181b]"
                  >
                    <img
                      src={resPost.imageUrl}
                      alt={resPost.recipe?.title}
                      className="h-16 w-16 rounded-xl object-cover"
                    />
                    <div className="flex-1 overflow-hidden">
                      <h4 className="truncate font-bold text-xs text-neutral-900 dark:text-white">
                        {resPost.recipe?.title}
                      </h4>
                      <p className="text-[11px] text-neutral-500">
                        {resPost.recipe?.cuisine} • {resPost.recipe?.difficulty}
                      </p>
                      <button
                        onClick={() => handleImportApiRecipe(resPost)}
                        className="mt-2 inline-flex items-center gap-1 rounded-lg bg-[#EAF7E8] px-2.5 py-1 text-[11px] font-bold text-[#176B35] hover:bg-[#D8F3DC] transition dark:bg-emerald-950 dark:text-[#B7E35F]"
                      >
                        <Check className="h-3 w-3" /> Auto-Fill Recipe
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Standard Manual Form */
            <form id="create-post-form" onSubmit={handlePublish} className="space-y-6">
              {/* Recipe Title & Caption */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                  Recipe Title & Narrative
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Crispy Lemon Basil Pan-Seared Salmon"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 placeholder-neutral-400 focus:border-[#2F8F46] focus:outline-hidden focus:ring-2 focus:ring-[#2F8F46]/15 dark:border-neutral-700 dark:bg-[#18181b] dark:text-white"
                />
                <textarea
                  rows={3}
                  placeholder="Tell the community about your dish: flavor profile, who you made it for, or secret technique tips..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:border-[#2F8F46] focus:outline-hidden focus:ring-2 focus:ring-[#2F8F46]/15 dark:border-neutral-700 dark:bg-[#18181b] dark:text-white"
                />
              </div>

              {/* Recipe Quick Metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Cuisine</label>
                  <input
                    type="text"
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-neutral-900 dark:border-neutral-700 dark:bg-[#18181b] dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as "Easy" | "Medium" | "Hard")}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-neutral-900 dark:border-neutral-700 dark:bg-[#18181b] dark:text-white"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Prep Time (min)</label>
                  <input
                    type="number"
                    value={prepTime}
                    onChange={(e) => setPrepTime(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-neutral-900 dark:border-neutral-700 dark:bg-[#18181b] dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Cook Time (min)</label>
                  <input
                    type="number"
                    value={cookTime}
                    onChange={(e) => setCookTime(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-neutral-900 dark:border-neutral-700 dark:bg-[#18181b] dark:text-white"
                  />
                </div>
              </div>

              {/* Photo Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                  Dish Presentation Photo
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
                  {PRESET_FOOD_PHOTOS.map((photo, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedPhoto(photo);
                        setCustomPhotoUrl("");
                      }}
                      className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition ${
                        selectedPhoto === photo && !customPhotoUrl
                          ? "border-[#2F8F46] ring-2 ring-[#2F8F46]/30"
                          : "border-transparent hover:opacity-80"
                      }`}
                    >
                      <img src={photo} alt="Food Preset" className="h-full w-full object-cover" />
                      {selectedPhoto === photo && !customPhotoUrl && (
                        <div className="absolute inset-0 bg-[#2F8F46]/20 flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Or paste custom image URL..."
                  value={customPhotoUrl}
                  onChange={(e) => setCustomPhotoUrl(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs text-neutral-900 placeholder-neutral-400 dark:border-neutral-700 dark:bg-[#18181b] dark:text-white"
                />
                <label className="mt-3 block rounded-xl border border-dashed border-emerald-300 p-3 text-xs font-semibold text-[#2F8F46] cursor-pointer hover:bg-[#EAF7E8] dark:border-emerald-800 dark:text-[#B7E35F]">
                  Upload your own food photo (max 6 MB)
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="mt-2 block w-full text-xs text-neutral-500"
                    onChange={(event) => setImageFile(event.target.files?.[0])}
                  />
                </label>
              </div>

              {/* Ingredients List Builder */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                    Ingredients ({ingredients.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddIngredient}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#2F8F46] hover:underline dark:text-[#B7E35F]"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Ingredient
                  </button>
                </div>
                <div className="space-y-2">
                  {ingredients.map((ing, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Ingredient name (e.g. Fresh Basil)"
                        value={ing.name}
                        onChange={(e) => {
                          const updated = [...ingredients];
                          updated[idx].name = e.target.value;
                          setIngredients(updated);
                        }}
                        className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-neutral-900 dark:border-neutral-700 dark:bg-[#18181b] dark:text-white"
                      />
                      <input
                        type="text"
                        placeholder="Amount (e.g. 2 tbsp)"
                        value={ing.amount}
                        onChange={(e) => {
                          const updated = [...ingredients];
                          updated[idx].amount = e.target.value;
                          setIngredients(updated);
                        }}
                        className="w-32 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-neutral-900 dark:border-neutral-700 dark:bg-[#18181b] dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveIngredient(idx)}
                        className="p-2 text-neutral-400 hover:text-rose-500 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Instructions Builder */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                    Step-by-Step Cooking Steps ({steps.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddStep}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#2F8F46] hover:underline dark:text-[#B7E35F]"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Step
                  </button>
                </div>
                <div className="space-y-3">
                  {steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 rounded-2xl bg-neutral-50 p-3 dark:bg-neutral-900/60"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2F8F46] text-xs font-bold text-white shrink-0">
                        {step.stepNumber}
                      </span>
                      <div className="flex-1 space-y-2">
                        <textarea
                          rows={2}
                          placeholder={`Describe cooking step #${step.stepNumber}...`}
                          value={step.instruction}
                          onChange={(e) => {
                            const updated = [...steps];
                            updated[idx].instruction = e.target.value;
                            setSteps(updated);
                          }}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-neutral-900 dark:border-neutral-700 dark:bg-[#18181b] dark:text-white"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Optional chef tip..."
                            value={step.tip || ""}
                            onChange={(e) => {
                              const updated = [...steps];
                              updated[idx].tip = e.target.value;
                              setSteps(updated);
                            }}
                            className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-neutral-900 placeholder-neutral-400 dark:border-neutral-700 dark:bg-[#18181b] dark:text-white"
                          />
                          <input
                            type="number"
                            placeholder="Mins"
                            value={step.durationMinutes || ""}
                            onChange={(e) => {
                              const updated = [...steps];
                              updated[idx].durationMinutes = Number(e.target.value);
                              setSteps(updated);
                            }}
                            className="w-20 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-neutral-900 placeholder-neutral-400 dark:border-neutral-700 dark:bg-[#18181b] dark:text-white"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveStep(idx)}
                        className="p-1.5 text-neutral-400 hover:text-rose-500 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nutrition & Challenge Tag */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-neutral-800">
                <div>
                  <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-1">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-neutral-900 dark:border-neutral-700 dark:bg-[#18181b] dark:text-white"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    <input
                      type="checkbox"
                      checked={isChallengeEntry}
                      onChange={(e) => setIsChallengeEntry(e.target.checked)}
                      className="rounded text-[#2F8F46] focus:ring-[#2F8F46]"
                    />
                    <span>Submit to #SummerHarvestSalad Weekly Challenge (500 XP)</span>
                  </label>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900/30">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-neutral-600 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            Cancel
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            form="create-post-form"
            disabled={isPublishing}
            className="flex items-center gap-2 rounded-xl bg-[#2F8F46] px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-emerald-800/15 transition hover:bg-[#176B35]"
          >
            <ChefHat className="h-4 w-4" />
            <span>{isPublishing ? "Publishing..." : "Publish to Community"}</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

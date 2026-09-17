"use client";

import Link from "next/link";
import { ArrowLeft, Recycle, Refrigerator } from "lucide-react";
import RecipeResultView from "@/components/aitools/Pantry-to-Plate AI/RecipeResultView";
import PantryPanel from "@/components/aitools/Pantry-to-Plate AI/PantryPanel";
import PreferencesPanel from "@/components/aitools/Pantry-to-Plate AI/PreferencesPanel";
import GenerateButton from "@/components/aitools/Pantry-to-Plate AI/GenerateButton";
import { usePantryToPlate } from "@/hooks/usePantryToPlate";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function IngredientRescueContent() {
  const searchParams = useSearchParams();
  const urlIngredients = searchParams.get("ingredients");
  const initialIngredients = urlIngredients ? urlIngredients.split(",").map(i => i.trim()).filter(Boolean) : undefined;

  const {
    ingredients,
    inputValue,
    setInputValue,
    recentIngredients,
    handleAddIngredient,
    handleRemoveIngredient,
    clearIngredients,
    clearRecent,
    cuisine,
    setCuisine,
    mealType,
    setMealType,
    cookingTime,
    setCookingTime,
    diet,
    setDiet,
    servings,
    setServings,
    selectedOptions,
    toggleOption,
    isGenerating,
    generatedRecipe,
    handleGenerateRecipe,
    resetRecipe,
    handleRefineRecipe,
    refiningOption,
  } = usePantryToPlate(false, initialIngredients);

  return (
    <div className="min-h-screen bg-emerald-50/20 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200 p-4 sm:p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3">
          <Link
            href="/ai-tools"
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-2xs hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to AI Tools
          </Link>
          <div className="flex items-center text-xs sm:text-sm text-zinc-400 gap-1.5">
            <span>/</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              AI Ingredient Rescue
            </span>
          </div>
        </div>

        {/* Context banner */}
        {!generatedRecipe && (
          <div className="rounded-2xl px-5 py-4 border text-sm font-medium bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300">
            🥗 Pantry Mode: Add your available pantry ingredients. AI will generate a recipe using mainly what you have.
          </div>
        )}

        {generatedRecipe ? (
          <RecipeResultView
            recipe={generatedRecipe}
            onBack={resetRecipe}
            onRefine={handleRefineRecipe}
            refiningOption={refiningOption}
            userPantryIngredients={ingredients}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PantryPanel
                ingredients={ingredients}
                inputValue={inputValue}
                setInputValue={setInputValue}
                onAdd={handleAddIngredient}
                onRemove={handleRemoveIngredient}
                onClear={clearIngredients}
              />

              <PreferencesPanel
                cuisine={cuisine}
                setCuisine={setCuisine}
                mealType={mealType}
                setMealType={setMealType}
                cookingTime={cookingTime}
                setCookingTime={setCookingTime}
                diet={diet}
                setDiet={setDiet}
                servings={servings}
                setServings={setServings}
                selectedOptions={selectedOptions}
                toggleOption={toggleOption}
              />
            </div>

            <GenerateButton
              isGenerating={isGenerating}
              onClick={handleGenerateRecipe}
              label="Generate Recipe"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default function IngredientRescuePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-zinc-400">Loading...</div>}>
      <IngredientRescueContent />
    </Suspense>
  );
}

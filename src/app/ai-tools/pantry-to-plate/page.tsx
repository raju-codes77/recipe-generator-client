"use client";

import { Toaster } from "react-hot-toast";
// import { usePantryToPlate } from "../../hooks/usePantryToPlate";
import RecipeResultView from "@/components/aitools/Pantry-to-Plate AI/RecipeResultView";
import Hero from "@/components/aitools/Pantry-to-Plate AI/Hero";
import PantryPanel from "@/components/aitools/Pantry-to-Plate AI/PantryPanel";
import PreferencesPanel from "@/components/aitools/Pantry-to-Plate AI/PreferencesPanel";
import GenerateButton from "@/components/aitools/Pantry-to-Plate AI/GenerateButton";
import { usePantryToPlate } from "@/hooks/usePantryToPlate";
// import Hero from "../../components/Hero";
// import PantryPanel from "../../components/PantryPanel";
// import PreferencesPanel from "../../components/PreferencesPanel";
// import GenerateButton from "../../components/GenerateButton";
// import RecipeResultView from "../../components/RecipeResultView";

export default function PantryToPlatePage() {
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
  } = usePantryToPlate();

  return (
    <div className="min-h-screen bg-emerald-50/20 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200 p-4 sm:p-6 md:p-10">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 gap-2">
          <span>AI Tools</span>
          <span>&gt;</span>
          <span className="font-medium text-emerald-600 dark:text-emerald-400">
            Pantry-to-Plate AI
          </span>
        </div>

        {generatedRecipe ? (
          <RecipeResultView recipe={generatedRecipe} onBack={resetRecipe} />
        ) : (
          <>
            <Hero
              recentIngredients={recentIngredients}
              onAddIngredient={handleAddIngredient}
              onClearRecent={clearRecent}
            />

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

            <GenerateButton isGenerating={isGenerating} onClick={handleGenerateRecipe} />
          </>
        )}
      </div>
    </div>
  );
}
"use client";

import { DEFAULT_INGREDIENTS } from "@/components/aitools/Pantry-to-Plate AI/constants";
import { Recipe } from "@/components/aitools/Pantry-to-Plate AI/types";
import { useState } from "react";
import toast from "react-hot-toast";

export function usePantryToPlate() {
  const [ingredients, setIngredients] = useState<string[]>(DEFAULT_INGREDIENTS);
  const [inputValue, setInputValue] = useState<string>("");
  const [recentIngredients, setRecentIngredients] = useState<string[]>([
    "Chicken",
    "Tomato",
    "Onion",
    "Rice",
    "Garlic",
  ]);

  const [cuisine, setCuisine] = useState<string>("Bangladeshi");
  const [mealType, setMealType] = useState<string>("Breakfast");
  const [cookingTime, setCookingTime] = useState<string>("Up to 30 min");
  const [diet, setDiet] = useState<string>("Vegetarian");
  const [servings, setServings] = useState<string>("1");
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["Reduce Food Waste"]);

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);

  // NEW: refine এর জন্য
  const [refiningOption, setRefiningOption] = useState<string | null>(null);

  const handleAddIngredient = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (ingredients.map((i) => i.toLowerCase()).includes(trimmed.toLowerCase())) {
      toast.error(`${trimmed} is already in your pantry!`);
      return;
    }
    setIngredients((prev) => [...prev, trimmed]);
    setInputValue("");
    toast.success(`Added ${trimmed} to pantry`);
  };

  const handleRemoveIngredient = (item: string) => {
    setIngredients((prev) => prev.filter((i) => i !== item));
    toast.success(`Removed ${item}`);
  };

  const clearIngredients = () => {
    setIngredients([]);
    toast.success("Pantry cleared");
  };

  const clearRecent = () => {
    setRecentIngredients([]);
    toast.success("Recent list cleared");
  };

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const handleGenerateRecipe = async () => {
    if (ingredients.length === 0) {
      toast.error("Please add at least one ingredient!");
      return;
    }

    setIsGenerating(true);
    const toastId = toast.loading("AI is generating your custom recipe...");

    try {
      const res = await fetch("/api/pantry-to-plate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients,
          cuisine,
          mealType,
          cookingTime,
          diet,
          servings,
          selectedOptions,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to generate recipe");
      }

      const recipe: Recipe = await res.json();
      setGeneratedRecipe(recipe);
      toast.success("Recipe generated successfully!", { id: toastId });

      setRecentIngredients((prev) => {
        const merged = [...new Set([...ingredients, ...prev])];
        return merged.slice(0, 8);
      });
    } catch (err: any) {
      toast.error(err.message || "Couldn't generate a recipe. Please try again.", { id: toastId });
    } finally {
      setIsGenerating(false);
    }
  };

  // NEW: refine handler
  const handleRefineRecipe = async (refinement: string) => {
    if (!generatedRecipe) return;

    setRefiningOption(refinement);
    const toastId = toast.loading(`Refining: ${refinement}...`);

    try {
      const res = await fetch("/api/pantry-to-plate/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: generatedRecipe.id, refinement }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to refine recipe");
      }

      const updated: Recipe = await res.json();
      setGeneratedRecipe(updated);
      toast.success(`Recipe updated: ${refinement}`, { id: toastId });
    } catch (err: any) {
      toast.error(err.message || "Couldn't refine the recipe. Please try again.", { id: toastId });
    } finally {
      setRefiningOption(null);
    }
  };

  const resetRecipe = () => setGeneratedRecipe(null);

  return {
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
    handleRefineRecipe,   // NEW
    refiningOption,          // NEW
  };
}
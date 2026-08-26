import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChefHat, Clock, X } from "lucide-react";
import { Post } from "./types";

interface RecipeDetailsModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
}

export const RecipeDetailsModal: React.FC<RecipeDetailsModalProps> = ({ post, isOpen, onClose }) => {
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const recipe = post.recipe;

  if (!recipe) return null;

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((current) => ({ ...current, [index]: !current[index] }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Recipe details for ${recipe.title}`}
          onMouseDown={onClose}
        >
          <motion.section
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onMouseDown={(event) => event.stopPropagation()}
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 bg-[#FCFDF9] shadow-2xl dark:border-neutral-800 dark:bg-[#121212]"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-slate-200 bg-[#FCFDF9]/95 px-5 py-4 backdrop-blur dark:border-neutral-800 dark:bg-[#121212]/95 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#2F8F46] text-white">
                  <ChefHat className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="truncate text-base font-extrabold text-neutral-900 dark:text-white">{recipe.title}</h2>
                  <p className="text-xs text-neutral-500">
                    {recipe.cuisine} · {recipe.difficulty} · {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-neutral-500 transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
                aria-label="Close recipe details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 p-5 sm:p-6">
              <div className="grid grid-cols-4 gap-2 rounded-2xl border border-slate-200 bg-white p-3 text-center dark:border-neutral-800 dark:bg-[#18181b] sm:gap-3 sm:p-4">
                {[
                  [`${recipe.nutrition.calories}`, "Calories", "text-[#2F8F46] dark:text-[#B7E35F]"],
                  [`${recipe.nutrition.protein}g`, "Protein", "text-[#FF9F43]"],
                  [`${recipe.nutrition.carbs}g`, "Carbs", "text-neutral-700 dark:text-neutral-300"],
                  [`${recipe.nutrition.fat}g`, "Fat", "text-neutral-700 dark:text-neutral-300"],
                ].map(([value, label, color]) => (
                  <div key={label}>
                    <span className={`block text-sm font-black ${color}`}>{value}</span>
                    <span className="text-[10px] text-neutral-500 sm:text-xs">{label}</span>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                  Ingredients ({recipe.servings} servings)
                </h3>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {recipe.ingredients.map((ingredient, index) => {
                    const isChecked = Boolean(checkedIngredients[index]);
                    return (
                      <button
                        key={`${ingredient.name}-${index}`}
                        onClick={() => toggleIngredient(index)}
                        className={`flex items-center gap-2.5 rounded-xl border p-3 text-left text-xs transition sm:text-sm ${isChecked ? "border-emerald-200 bg-[#EAF7E8]/60 text-neutral-400 line-through dark:border-emerald-900/40 dark:bg-emerald-950/20" : "border-slate-200 bg-white text-neutral-800 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-[#18181b] dark:text-neutral-200"}`}
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border ${isChecked ? "border-[#2F8F46] bg-[#2F8F46] text-white" : "border-slate-300 dark:border-neutral-600"}`}
                        >
                          {isChecked && <Check className="h-3 w-3" />}
                        </span>
                        <span className="flex-1 font-medium">{ingredient.name}</span>
                        <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400">
                          {ingredient.amount}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                  Step-by-step cooking method
                </h3>
                <div className="space-y-3">
                  {recipe.steps.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-neutral-800 dark:bg-[#18181b]"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2F8F46] text-xs font-bold text-white">
                        {step.stepNumber}
                      </span>
                      <div className="min-w-0 flex-1 text-xs leading-relaxed text-neutral-800 dark:text-neutral-200 sm:text-sm">
                        <p>{step.instruction}</p>
                        {step.tip && (
                          <p className="mt-2 rounded-xl bg-[#FFF0DD] p-2.5 text-xs font-medium text-amber-950 dark:bg-amber-950/40 dark:text-amber-300">
                            💡 <span className="font-bold">Chef Tip:</span> {step.tip}
                          </p>
                        )}
                      </div>
                      {step.durationMinutes && (
                        <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-neutral-400">
                          <Clock className="h-3.5 w-3.5" />
                          {step.durationMinutes}m
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const DEFAULT_INGREDIENTS: string[] = [
  "Chicken",
  "Rice",
  "Tomato",
  "Onion",
  "Garlic",
  "Potato",
  "Green Chili",
  "Egg",
];

export const SUGGESTIONS: string[] = ["Bell Pepper", "Carrot", "Cheese", "Yogurt", "Cumin", "Coriander"];

export const CUISINE_OPTIONS: string[] = ["Bangladeshi", "Indian", "Italian"];
export const MEAL_TYPE_OPTIONS: string[] = ["Breakfast", "Lunch", "Dinner"];
export const COOKING_TIME_OPTIONS: string[] = ["Up to 15 min", "Up to 30 min"];
export const DIET_OPTIONS: string[] = ["Non-Vegetarian", "Vegetarian"];

export interface ServingOption {
  value: string;
  label: string;
}
export const SERVINGS_OPTIONS: ServingOption[] = [
  { value: "1", label: "1 Person" },
  { value: "2", label: "2 People" },
  { value: "4", label: "4 People" },
];

export type AiOptionIcon = "Leaf" | "Dumbbell" | "Droplet" | "Tag";
export interface AiOption {
  name: string;
  icon: AiOptionIcon;
}
export const AI_OPTIONS: AiOption[] = [
  { name: "Reduce Food Waste", icon: "Leaf" },
  { name: "High Protein", icon: "Dumbbell" },
  { name: "Low Calorie", icon: "Droplet" },
  { name: "Budget Friendly", icon: "Tag" },
];

export type RefineIcon = "Leaf" | "Dumbbell" | "SpicyIcon" | "Tag" | "Users";
export interface RefineOption {
  label: string;
  icon: RefineIcon;
  color: string;
}
export const REFINE_OPTIONS: RefineOption[] = [
  { label: "Make Healthier", icon: "Leaf", color: "text-emerald-500" },
  { label: "More Protein", icon: "Dumbbell", color: "text-indigo-500" },
  { label: "Less Spicy", icon: "SpicyIcon", color: "text-red-500" },
  { label: "Vegetarian", icon: "Leaf", color: "text-emerald-500" },
  { label: "Budget Friendly", icon: "Tag", color: "text-amber-500" },
  { label: "For More People", icon: "Users", color: "text-blue-500" },
];
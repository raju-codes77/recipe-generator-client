import { ShoppingItem } from "./types";

export const INITIAL_ITEMS: ShoppingItem[] = [
  // Produce
  { id: "p1", name: "Tomato", quantity: "4 pcs", category: "Produce", checked: false, source: "Chicken Bhuna", sourceType: "recipe" },
  { id: "p2", name: "Green Chili", quantity: "5 pcs", category: "Produce", checked: false, source: "Chicken Bhuna", sourceType: "recipe" },
  { id: "p3", name: "Carrot", quantity: "2 pcs", category: "Produce", checked: true, source: "Vegetable Rice", sourceType: "recipe" },
  { id: "p4", name: "Spinach", quantity: "1 bunch", category: "Produce", checked: false, source: "Vegetable Rice", sourceType: "recipe" },

  // Protein
  { id: "pr1", name: "Chicken", quantity: "500 g", category: "Protein", checked: false, source: "Chicken Bhuna", sourceType: "recipe" },
  { id: "pr2", name: "Egg", quantity: "4 pcs", category: "Protein", checked: true, source: "Vegetable Rice", sourceType: "recipe" },

  // Dairy
  { id: "d1", name: "Yogurt", quantity: "250 g", category: "Dairy", checked: false, source: "Chicken Salad", sourceType: "recipe" },

  // Pantry
  { id: "pa1", name: "Soy Sauce", quantity: "1 bottle", category: "Pantry", checked: true, source: "Chicken Bhuna", sourceType: "recipe" },
  {
    id: "pa2",
    name: "Rice",
    quantity: "1 kg",
    category: "Pantry",
    checked: false,
    source: "From Pantry",
    sourceType: "pantry",
    pantryStock: { need: 2, have: 1, unit: "kg" },
  },
  { id: "pa3", name: "Onion", quantity: "3 pcs", category: "Pantry", checked: false, source: "Manual", sourceType: "manual" },
  { id: "pa4", name: "Garlic", quantity: "1 bulb", category: "Pantry", checked: false, source: "From Pantry", sourceType: "pantry" },
];

export const MISSING_INGREDIENTS: ShoppingItem[] = [
  { id: "miss1", name: "Ginger", quantity: "1 piece", category: "Produce", checked: false, source: "Chicken Bhuna", sourceType: "recipe" },
  { id: "miss2", name: "Cumin Powder", quantity: "1 tbsp", category: "Pantry", checked: false, source: "Chicken Bhuna", sourceType: "recipe" },
];

export const RECIPE_GENERATED_ITEMS: ShoppingItem[] = [
  { id: "gen1", name: "Basmati Rice", quantity: "2 cups", category: "Pantry", checked: false, source: "Vegetable Pulao", sourceType: "recipe" },
  { id: "gen2", name: "Bell Pepper", quantity: "2 pcs", category: "Produce", checked: false, source: "Vegetable Pulao", sourceType: "recipe" },
  { id: "gen3", name: "Butter", quantity: "50 g", category: "Dairy", checked: false, source: "Vegetable Pulao", sourceType: "recipe" },
];

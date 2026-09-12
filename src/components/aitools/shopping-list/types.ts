export type Category =
  | "Produce"
  | "Protein"
  | "Dairy"
  | "Pantry"
  | "Bakery"
  | "Frozen"
  | "Beverages"
  | "Other";

export type SortMode = "category" | "name" | "status";

export interface PantryStock {
  need: number;
  have: number;
  unit: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  category: Category;
  checked: boolean;
  source?: string;
  sourceType?: "recipe" | "pantry" | "manual";
  pantryStock?: PantryStock;
}

export interface ShoppingStatsData {
  total: number;
  completed: number;
  remaining: number;
  fromPantry: number;
}

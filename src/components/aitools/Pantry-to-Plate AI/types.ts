export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  time: string;
  level: string;
  kcal: string;
  protein: string;
  whyChosen: string;
  ingredients: string[];
  instructions: string[];
}

export interface GenerateRecipePayload {
  ingredients: string[];
  cuisine: string;
  mealType: string;
  cookingTime: string;
  diet: string;
  servings: string;
  selectedOptions: string[];
}
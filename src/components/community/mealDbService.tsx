import { Post, RecipeDetail, Ingredient, CookingStep } from './types';

interface MealDbItem {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  [key: string]: string | undefined;
}

// Convert MealDB item to rich Post format
export function convertMealDbToPost(meal: MealDbItem, indexOffset: number = 0): Post {
  const ingredients: Ingredient[] = [];
  
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({
        name: ingredient.trim(),
        amount: measure ? measure.trim() : 'As needed',
      });
    }
  }

  // Parse instructions into steps
  const rawSteps = meal.strInstructions
    ? meal.strInstructions
        .split(/\r?\n|\.\s+/)
        .filter((s) => s && s.trim().length > 10)
    : ['Follow traditional cooking preparation for this recipe.'];

  const steps: CookingStep[] = rawSteps.slice(0, 6).map((instruction, idx) => ({
    stepNumber: idx + 1,
    instruction: instruction.trim().endsWith('.') ? instruction.trim() : `${instruction.trim()}.`,
    durationMinutes: Math.floor(Math.random() * 8) + 4,
    tip: idx === 0 ? 'Preheat pan properly for optimal caramelization.' : undefined,
  }));

  const dietaryTags: string[] = [];
  if (meal.strCategory) dietaryTags.push(meal.strCategory);
  if (meal.strArea) dietaryTags.push(`${meal.strArea} Cuisine`);
  if (meal.strTags) {
    meal.strTags.split(',').forEach((t) => {
      if (t.trim()) dietaryTags.push(t.trim());
    });
  }

  const recipe: RecipeDetail = {
    title: meal.strMeal,
    cuisine: meal.strArea || 'International',
    difficulty: ingredients.length > 8 ? 'Medium' : 'Easy',
    prepTimeMinutes: Math.min(30, Math.max(10, ingredients.length * 3)),
    cookTimeMinutes: Math.min(60, Math.max(15, steps.length * 7)),
    servings: Math.floor(Math.random() * 3) + 2,
    dietaryTags: Array.from(new Set(dietaryTags)).slice(0, 4),
    ingredients,
    steps,
    nutrition: {
      calories: Math.floor(Math.random() * 300) + 380,
      protein: Math.floor(Math.random() * 25) + 20,
      carbs: Math.floor(Math.random() * 35) + 25,
      fat: Math.floor(Math.random() * 15) + 10,
      fiber: Math.floor(Math.random() * 6) + 3,
    },
    sourceType: 'mealdb',
    mealDbId: meal.idMeal,
  };

  const sampleAuthors = [
    {
      id: 'chef_sofia',
      name: 'Chef Sofia Rossi',
      username: 'sofia_cooks',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      badge: 'Verified Chef',
      role: 'chef' as const,
      followersCount: 4280,
      recipesCount: 45,
      isFollowing: false,
    },
    {
      id: 'chef_liam',
      name: 'Liam Chen',
      username: 'liam_flavorlab',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      badge: 'FlavorAI Pro',
      role: 'creator' as const,
      followersCount: 2910,
      recipesCount: 32,
      isFollowing: true,
    },
    {
      id: 'chef_maya',
      name: 'Maya Patel',
      username: 'maya_nutritious',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      badge: 'Nutritionist',
      role: 'creator' as const,
      followersCount: 5120,
      recipesCount: 68,
      isFollowing: false,
    },
    {
      id: 'chef_david',
      name: 'David Miller',
      username: 'david_grillmaster',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      badge: 'Community Legend',
      role: 'user' as const,
      followersCount: 1450,
      recipesCount: 19,
      isFollowing: false,
    },
  ];

  const author = sampleAuthors[indexOffset % sampleAuthors.length];

  return {
    id: `mealdb_${meal.idMeal}`,
    author,
    caption: `Just perfected this delicious ${meal.strMeal}! ${meal.strArea ? `Authentic ${meal.strArea} flavors` : 'Packed with hearty fresh ingredients'}. The aroma in my kitchen right now is unreal. Check out the ingredients and full step checklist below! 🌿✨`,
    imageUrl: meal.strMealThumb || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    recipe,
    rating: {
      overall: Number((4.6 + (indexOffset % 4) * 0.1).toFixed(1)),
      flavor: 4.9,
      ease: 4.7,
      presentation: 4.8,
      totalReviews: 18 + indexOffset * 4,
    },
    likesCount: 142 + indexOffset * 27,
    isLiked: false,
    savesCount: 64 + indexOffset * 11,
    isSaved: false,
    commentsCount: 12 + indexOffset * 2,
    madeItCount: 19 + indexOffset * 3,
    hasMadeIt: false,
    tags: [
      meal.strCategory ? `#${meal.strCategory.replace(/\s+/g, '')}` : '#Homemade',
      meal.strArea ? `#${meal.strArea}Food` : '#FreshFlavors',
      '#FoodCanvasCommunity',
      '#HealthyCooking',
    ],
    createdAt: `${indexOffset + 1}h ago`,
    comments: [
      {
        id: `c_${meal.idMeal}_1`,
        userId: 'u_101',
        userName: 'Aria Taylor',
        userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
        content: 'I made this yesterday and swapped in olive oil. My whole family cleared their plates in minutes!',
        createdAt: '45m ago',
        likesCount: 6,
        isLiked: false,
      },
      {
        id: `c_${meal.idMeal}_2`,
        userId: 'u_102',
        userName: 'Ethan Wright',
        userAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
        content: 'The step-by-step timer is so helpful. Great recipe formatting!',
        createdAt: '1h ago',
        likesCount: 3,
        isLiked: false,
      },
    ],
    reviews: [
      {
        id: `r_${meal.idMeal}_1`,
        userId: 'u_101',
        userName: 'Aria Taylor',
        userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
        userBadge: 'Verified Cook',
        rating: 5,
        flavorRating: 5,
        easeRating: 5,
        presentationRating: 5,
        comment: 'Outstanding flavor profile. Even beginner-friendly since the spices are well-balanced.',
        cookingTips: 'Make sure not to rush the simmering step for maximum depth.',
        createdAt: 'Yesterday',
        likesCount: 14,
        isLiked: false,
      },
    ],
  };
}

export async function fetchMealDbRecipes(searchQuery: string = 'chicken'): Promise<Post[]> {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchQuery)}`);
    if (!res.ok) throw new Error('Failed to fetch from TheMealDB');
    const data = await res.json();
    if (data.meals && Array.isArray(data.meals)) {
      return data.meals.map((meal: MealDbItem, idx: number) => convertMealDbToPost(meal, idx));
    }
    return [];
  } catch (error) {
    console.warn('TheMealDB fetch error, falling back to cached seed data:', error);
    return [];
  }
}

export async function fetchRandomMealDbRecipe(): Promise<Post | null> {
  try {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    if (!res.ok) return null;
    const data = await res.json();
    if (data.meals && data.meals.length > 0) {
      return convertMealDbToPost(data.meals[0], 0);
    }
    return null;
  } catch {
    return null;
  }
}

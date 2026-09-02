import { Star, Leaf, Flame, Citrus, Carrot, Milk, Droplet } from 'lucide-react';

export const categories = [
  'Popular',
  'Vegetables',
  'Fruits',
  'Herbs',
  'Spices',
  'Meats',
  'Seafood',
  'Dairy',
];

// Full ingredient catalog — single source of truth used for BOTH the
// "quick ingredients" grid (Step 1) and the search dropdown.
// Each ingredient can belong to more than one category (e.g. Chicken is
// both "Popular" and "Meats").
export const allIngredients = [
  { name: 'Chicken', emoji: '🍗', bg: 'bg-rose-100 dark:bg-rose-900/30', categories: ['Popular', 'Meats'] },
  { name: 'Tomato', emoji: '🍅', bg: 'bg-red-100 dark:bg-red-900/30', categories: ['Popular', 'Vegetables'] },
  { name: 'Basil', emoji: '🌿', bg: 'bg-emerald-100 dark:bg-emerald-900/30', categories: ['Popular', 'Herbs'] },
  { name: 'Salmon', emoji: '🐟', bg: 'bg-orange-100 dark:bg-orange-900/30', categories: ['Popular', 'Seafood'] },
  { name: 'Avocado', emoji: '🥑', bg: 'bg-lime-100 dark:bg-lime-900/30', categories: ['Popular', 'Fruits'] },
  { name: 'Garlic', emoji: '🧄', bg: 'bg-gray-100 dark:bg-gray-800', categories: ['Popular', 'Vegetables'] },
  { name: 'Onion', emoji: '🧅', bg: 'bg-rose-50 dark:bg-rose-900/30', categories: ['Vegetables'] },
  { name: 'Bell Pepper', emoji: '🫑', bg: 'bg-emerald-50 dark:bg-emerald-900/30', categories: ['Vegetables'] },
  { name: 'Mushroom', emoji: '🍄', bg: 'bg-gray-100 dark:bg-gray-800', categories: ['Vegetables'] },
  { name: 'Lemon', emoji: '🍋', bg: 'bg-amber-50 dark:bg-amber-900/30', categories: ['Fruits'] },
  { name: 'Orange', emoji: '🍊', bg: 'bg-orange-50 dark:bg-orange-900/30', categories: ['Fruits'] },
  { name: 'Lime', emoji: '🟢', bg: 'bg-lime-50 dark:bg-lime-900/30', categories: ['Fruits'] },
  { name: 'Pineapple', emoji: '🍍', bg: 'bg-amber-50 dark:bg-amber-900/30', categories: ['Fruits'] },
  { name: 'Rosemary', emoji: '🌱', bg: 'bg-emerald-50 dark:bg-emerald-900/30', categories: ['Herbs'] },
  { name: 'Thyme', emoji: '🍃', bg: 'bg-emerald-50 dark:bg-emerald-900/30', categories: ['Herbs'] },
  { name: 'Parsley', emoji: '🌿', bg: 'bg-emerald-50 dark:bg-emerald-900/30', categories: ['Herbs'] },
  { name: 'Paprika', emoji: '🌶️', bg: 'bg-red-50 dark:bg-red-900/30', categories: ['Spices'] },
  { name: 'Cumin', emoji: '🟤', bg: 'bg-amber-50 dark:bg-amber-900/30', categories: ['Spices'] },
  { name: 'Turmeric', emoji: '🟡', bg: 'bg-amber-50 dark:bg-amber-900/30', categories: ['Spices'] },
  { name: 'Black Pepper', emoji: '⚫', bg: 'bg-gray-100 dark:bg-gray-800', categories: ['Spices'] },
  { name: 'Beef', emoji: '🥩', bg: 'bg-rose-100 dark:bg-rose-900/30', categories: ['Meats'] },
  { name: 'Lamb', emoji: '🍖', bg: 'bg-rose-100 dark:bg-rose-900/30', categories: ['Meats'] },
  { name: 'Shrimp', emoji: '🦐', bg: 'bg-orange-100 dark:bg-orange-900/30', categories: ['Seafood'] },
  { name: 'Tuna', emoji: '🐟', bg: 'bg-orange-100 dark:bg-orange-900/30', categories: ['Seafood'] },
  { name: 'Parmesan', emoji: '🧀', bg: 'bg-amber-50 dark:bg-amber-900/30', categories: ['Dairy'] },
  { name: 'Yogurt', emoji: '🥣', bg: 'bg-gray-100 dark:bg-gray-800', categories: ['Dairy'] },
  { name: 'Butter', emoji: '🧈', bg: 'bg-amber-50 dark:bg-amber-900/30', categories: ['Dairy'] },
];

// Default shortlist shown under "Popular" (Step 1 quick-select row)
export const quickIngredients = allIngredients.filter((i) =>
  i.categories.includes('Popular')
);

export const pairingTabs = [
  { name: 'Best Matches', icon: Star },
  { name: 'Herbs', icon: Leaf },
  { name: 'Spices', icon: Flame },
  { name: 'Citrus & Fruits', icon: Citrus },
  { name: 'Vegetables', icon: Carrot },
  { name: 'Cheese & Dairy', icon: Milk },
  { name: 'Sauces & Oils', icon: Droplet },
];

// NOTE: this is still demo data tied to "Chicken" pairings — Step 3
// (API layer) will replace this with real per-ingredient results.
export const pairingsByTab = {
  'Best Matches': [
    { name: 'Basil', emoji: '🌿', blurb: 'Classic combination that brings fresh, aromatic flavor.', bestIn: 'Italian, Mediterranean', iconBg: 'bg-emerald-50 dark:bg-emerald-900/30' },
    { name: 'Garlic', emoji: '🧄', blurb: 'Adds depth and savory richness to {ingredient} dishes.', bestIn: 'Mediterranean, Asian', iconBg: 'bg-gray-100 dark:bg-gray-800' },
    { name: 'Lemon', emoji: '🍋', blurb: 'Bright citrus notes that enhance natural flavors.', bestIn: 'Mediterranean, Grill', iconBg: 'bg-amber-50 dark:bg-amber-900/30' },
    { name: 'Rosemary', emoji: '🌱', blurb: 'Earthy, pine-like flavor perfect for roasted {ingredient}.', bestIn: 'European, Roast', iconBg: 'bg-emerald-50 dark:bg-emerald-900/30' },
  ],
  Herbs: [
    { name: 'Basil', emoji: '🌿', blurb: 'Classic combination that brings fresh, aromatic flavor.', bestIn: 'Italian, Mediterranean', iconBg: 'bg-emerald-50 dark:bg-emerald-900/30' },
    { name: 'Rosemary', emoji: '🌱', blurb: 'Earthy, pine-like flavor perfect for roasted {ingredient}.', bestIn: 'European, Roast', iconBg: 'bg-emerald-50 dark:bg-emerald-900/30' },
    { name: 'Thyme', emoji: '🍃', blurb: 'Subtle, earthy aroma that works beautifully in braises.', bestIn: 'French, Roast', iconBg: 'bg-emerald-50 dark:bg-emerald-900/30' },
    { name: 'Parsley', emoji: '🌿', blurb: 'Fresh, slightly peppery finish that brightens rich dishes.', bestIn: 'Mediterranean, Garnish', iconBg: 'bg-emerald-50 dark:bg-emerald-900/30' },
  ],
  Spices: [
    { name: 'Paprika', emoji: '🌶️', blurb: 'Smoky sweetness that adds color and depth to the skin.', bestIn: 'Spanish, Grill', iconBg: 'bg-red-50 dark:bg-red-900/30' },
    { name: 'Cumin', emoji: '🟤', blurb: 'Warm, earthy notes that pair well with bold marinades.', bestIn: 'Middle Eastern, Indian', iconBg: 'bg-amber-50 dark:bg-amber-900/30' },
    { name: 'Black Pepper', emoji: '⚫', blurb: 'Sharp heat that balances rich, fatty cuts.', bestIn: 'Global, Everyday', iconBg: 'bg-gray-100 dark:bg-gray-800' },
    { name: 'Turmeric', emoji: '🟡', blurb: 'Earthy color and flavor, great in curries and rubs.', bestIn: 'Indian, Southeast Asian', iconBg: 'bg-amber-50 dark:bg-amber-900/30' },
  ],
  'Citrus & Fruits': [
    { name: 'Lemon', emoji: '🍋', blurb: 'Bright citrus notes that enhance natural flavors.', bestIn: 'Mediterranean, Grill', iconBg: 'bg-amber-50 dark:bg-amber-900/30' },
    { name: 'Orange', emoji: '🍊', blurb: 'Sweet citrus glaze that caramelizes beautifully when roasted.', bestIn: 'Asian, Glaze', iconBg: 'bg-orange-50 dark:bg-orange-900/30' },
    { name: 'Lime', emoji: '🟢', blurb: 'Sharp, zesty acidity that lifts grilled and fried {ingredient}.', bestIn: 'Mexican, Thai', iconBg: 'bg-lime-50 dark:bg-lime-900/30' },
    { name: 'Pineapple', emoji: '🍍', blurb: 'Sweet and tangy, a natural tenderizer for marinades.', bestIn: 'Tropical, Grill', iconBg: 'bg-amber-50 dark:bg-amber-900/30' },
  ],
  Vegetables: [
    { name: 'Garlic', emoji: '🧄', blurb: 'Adds depth and savory richness to {ingredient} dishes.', bestIn: 'Mediterranean, Asian', iconBg: 'bg-gray-100 dark:bg-gray-800' },
    { name: 'Onion', emoji: '🧅', blurb: 'Sweet, caramelized base flavor for sauces and roasts.', bestIn: 'Global, Braise', iconBg: 'bg-rose-50 dark:bg-rose-900/30' },
    { name: 'Bell Pepper', emoji: '🫑', blurb: 'Sweet crunch that balances smoky, spiced preparations.', bestIn: 'Fajitas, Stir-fry', iconBg: 'bg-emerald-50 dark:bg-emerald-900/30' },
    { name: 'Mushroom', emoji: '🍄', blurb: 'Earthy umami that deepens creamy {ingredient} dishes.', bestIn: 'French, Creamy', iconBg: 'bg-gray-100 dark:bg-gray-800' },
  ],
  'Cheese & Dairy': [
    { name: 'Parmesan', emoji: '🧀', blurb: 'Nutty, salty crust that crisps up beautifully when baked.', bestIn: 'Italian, Bake', iconBg: 'bg-amber-50 dark:bg-amber-900/30' },
    { name: 'Yogurt', emoji: '🥣', blurb: 'Tangy tenderizer that keeps meat moist in marinades.', bestIn: 'Middle Eastern, Indian', iconBg: 'bg-gray-100 dark:bg-gray-800' },
    { name: 'Butter', emoji: '🧈', blurb: 'Rich, silky finish for basting and pan sauces.', bestIn: 'French, Roast', iconBg: 'bg-amber-50 dark:bg-amber-900/30' },
    { name: 'Cream', emoji: '🥛', blurb: 'Smooth base for comforting, savory sauces.', bestIn: 'French, Creamy', iconBg: 'bg-gray-100 dark:bg-gray-800' },
  ],
  'Sauces & Oils': [
    { name: 'Olive Oil', emoji: '🫒', blurb: 'Fruity, smooth base for marinades and finishing drizzles.', bestIn: 'Mediterranean, Grill', iconBg: 'bg-emerald-50 dark:bg-emerald-900/30' },
    { name: 'Soy Sauce', emoji: '🥢', blurb: 'Savory umami depth, great for glazes and stir-fries.', bestIn: 'Asian, Stir-fry', iconBg: 'bg-gray-100 dark:bg-gray-800' },
    { name: 'Honey Mustard', emoji: '🍯', blurb: 'Sweet and tangy glaze that caramelizes when roasted.', bestIn: 'American, Glaze', iconBg: 'bg-amber-50 dark:bg-amber-900/30' },
    { name: 'Teriyaki', emoji: '🍶', blurb: 'Sweet-savory glaze with deep umami character.', bestIn: 'Japanese, Grill', iconBg: 'bg-rose-50 dark:bg-rose-900/30' },
  ],
};

export const topPairings = pairingsByTab['Best Matches'];

// Fills the {ingredient} placeholder in a blurb with the selected ingredient's
// name (lowercased so it reads naturally inside a sentence, e.g. "salmon dishes").
export function personalizeBlurb(blurb, ingredientName) {
    return blurb.replace(/\{ingredient\}/g, ingredientName.toLowerCase());
}

// Returns the pairing cards for a given tab, personalized for the selected
// ingredient. Falls back to "Best Matches" if the tab key is unknown.
export function getPairingsForTab(tabName, ingredientName) {
    const list = pairingsByTab[tabName] ?? pairingsByTab['Best Matches'];
    return list.map((p) => ({
        ...p,
        blurb: personalizeBlurb(p.blurb, ingredientName),
    }));
}

// --- URL <-> data helpers (used by the dynamic route) ------------------

// "Bell Pepper" -> "bell-pepper", "Cheese & Dairy" -> "cheese-and-dairy"
export function slugify(str) {
    return str
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

export function findIngredientBySlug(slug) {
    return allIngredients.find((ing) => slugify(ing.name) === slug);
}

export function findTabBySlug(slug) {
    return pairingTabs.find((tab) => slugify(tab.name) === slug);
}
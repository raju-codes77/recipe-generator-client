import {
    Star,
    Leaf,
    Flame,
    Citrus,
    Carrot,
    Milk,
    Droplet,
} from 'lucide-react';

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

export const quickIngredients = [
    { name: 'Chicken', emoji: '🍗', bg: 'bg-rose-100 dark:bg-rose-900/30' },
    { name: 'Tomato', emoji: '🍅', bg: 'bg-red-100 dark:bg-red-900/30' },
    { name: 'Basil', emoji: '🌿', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
    { name: 'Salmon', emoji: '🐟', bg: 'bg-orange-100 dark:bg-orange-900/30' },
    { name: 'Avocado', emoji: '🥑', bg: 'bg-lime-100 dark:bg-lime-900/30' },
];

export const pairingTabs = [
    { name: 'Best Matches', icon: Star },
    { name: 'Herbs', icon: Leaf },
    { name: 'Spices', icon: Flame },
    { name: 'Citrus & Fruits', icon: Citrus },
    { name: 'Vegetables', icon: Carrot },
    { name: 'Cheese & Dairy', icon: Milk },
    { name: 'Sauces & Oils', icon: Droplet },
];

export const pairingsByTab = {
    'Best Matches': [
        {
            name: 'Basil',
            emoji: '🌿',
            blurb: 'Classic combination that brings fresh, aromatic flavor.',
            bestIn: 'Italian, Mediterranean',
            iconBg: 'bg-emerald-50 dark:bg-emerald-900/30',
        },
        {
            name: 'Garlic',
            emoji: '🧄',
            blurb: 'Adds depth and savory richness to chicken dishes.',
            bestIn: 'Mediterranean, Asian',
            iconBg: 'bg-gray-100 dark:bg-gray-800',
        },
        {
            name: 'Lemon',
            emoji: '🍋',
            blurb: 'Bright citrus notes that enhance natural flavors.',
            bestIn: 'Mediterranean, Grill',
            iconBg: 'bg-amber-50 dark:bg-amber-900/30',
        },
        {
            name: 'Rosemary',
            emoji: '🌱',
            blurb: 'Earthy, pine-like flavor perfect for roasted chicken.',
            bestIn: 'European, Roast',
            iconBg: 'bg-emerald-50 dark:bg-emerald-900/30',
        },
    ],
    Herbs: [
        {
            name: 'Basil',
            emoji: '🌿',
            blurb: 'Classic combination that brings fresh, aromatic flavor.',
            bestIn: 'Italian, Mediterranean',
            iconBg: 'bg-emerald-50 dark:bg-emerald-900/30',
        },
        {
            name: 'Rosemary',
            emoji: '🌱',
            blurb: 'Earthy, pine-like flavor perfect for roasted chicken.',
            bestIn: 'European, Roast',
            iconBg: 'bg-emerald-50 dark:bg-emerald-900/30',
        },
        {
            name: 'Thyme',
            emoji: '🍃',
            blurb: 'Subtle, earthy aroma that works beautifully in braises.',
            bestIn: 'French, Roast',
            iconBg: 'bg-emerald-50 dark:bg-emerald-900/30',
        },
        {
            name: 'Parsley',
            emoji: '🌿',
            blurb: 'Fresh, slightly peppery finish that brightens rich dishes.',
            bestIn: 'Mediterranean, Garnish',
            iconBg: 'bg-emerald-50 dark:bg-emerald-900/30',
        },
    ],
    Spices: [
        {
            name: 'Paprika',
            emoji: '🌶️',
            blurb: 'Smoky sweetness that adds color and depth to the skin.',
            bestIn: 'Spanish, Grill',
            iconBg: 'bg-red-50 dark:bg-red-900/30',
        },
        {
            name: 'Cumin',
            emoji: '🟤',
            blurb: 'Warm, earthy notes that pair well with bold marinades.',
            bestIn: 'Middle Eastern, Indian',
            iconBg: 'bg-amber-50 dark:bg-amber-900/30',
        },
        {
            name: 'Black Pepper',
            emoji: '⚫',
            blurb: 'Sharp heat that balances rich, fatty cuts.',
            bestIn: 'Global, Everyday',
            iconBg: 'bg-gray-100 dark:bg-gray-800',
        },
        {
            name: 'Turmeric',
            emoji: '🟡',
            blurb: 'Earthy color and flavor, great in curries and rubs.',
            bestIn: 'Indian, Southeast Asian',
            iconBg: 'bg-amber-50 dark:bg-amber-900/30',
        },
    ],
    'Citrus & Fruits': [
        {
            name: 'Lemon',
            emoji: '🍋',
            blurb: 'Bright citrus notes that enhance natural flavors.',
            bestIn: 'Mediterranean, Grill',
            iconBg: 'bg-amber-50 dark:bg-amber-900/30',
        },
        {
            name: 'Orange',
            emoji: '🍊',
            blurb: 'Sweet citrus glaze that caramelizes beautifully when roasted.',
            bestIn: 'Asian, Glaze',
            iconBg: 'bg-orange-50 dark:bg-orange-900/30',
        },
        {
            name: 'Lime',
            emoji: '🟢',
            blurb: 'Sharp, zesty acidity that lifts grilled and fried chicken.',
            bestIn: 'Mexican, Thai',
            iconBg: 'bg-lime-50 dark:bg-lime-900/30',
        },
        {
            name: 'Pineapple',
            emoji: '🍍',
            blurb: 'Sweet and tangy, a natural tenderizer for marinades.',
            bestIn: 'Tropical, Grill',
            iconBg: 'bg-amber-50 dark:bg-amber-900/30',
        },
    ],
    Vegetables: [
        {
            name: 'Garlic',
            emoji: '🧄',
            blurb: 'Adds depth and savory richness to chicken dishes.',
            bestIn: 'Mediterranean, Asian',
            iconBg: 'bg-gray-100 dark:bg-gray-800',
        },
        {
            name: 'Onion',
            emoji: '🧅',
            blurb: 'Sweet, caramelized base flavor for sauces and roasts.',
            bestIn: 'Global, Braise',
            iconBg: 'bg-rose-50 dark:bg-rose-900/30',
        },
        {
            name: 'Bell Pepper',
            emoji: '🫑',
            blurb: 'Sweet crunch that balances smoky, spiced preparations.',
            bestIn: 'Fajitas, Stir-fry',
            iconBg: 'bg-emerald-50 dark:bg-emerald-900/30',
        },
        {
            name: 'Mushroom',
            emoji: '🍄',
            blurb: 'Earthy umami that deepens creamy chicken dishes.',
            bestIn: 'French, Creamy',
            iconBg: 'bg-gray-100 dark:bg-gray-800',
        },
    ],
    'Cheese & Dairy': [
        {
            name: 'Parmesan',
            emoji: '🧀',
            blurb: 'Nutty, salty crust that crisps up beautifully when baked.',
            bestIn: 'Italian, Bake',
            iconBg: 'bg-amber-50 dark:bg-amber-900/30',
        },
        {
            name: 'Yogurt',
            emoji: '🥣',
            blurb: 'Tangy tenderizer that keeps meat moist in marinades.',
            bestIn: 'Middle Eastern, Indian',
            iconBg: 'bg-gray-100 dark:bg-gray-800',
        },
        {
            name: 'Butter',
            emoji: '🧈',
            blurb: 'Rich, silky finish for basting and pan sauces.',
            bestIn: 'French, Roast',
            iconBg: 'bg-amber-50 dark:bg-amber-900/30',
        },
        {
            name: 'Cream',
            emoji: '🥛',
            blurb: 'Smooth base for comforting, savory sauces.',
            bestIn: 'French, Creamy',
            iconBg: 'bg-gray-100 dark:bg-gray-800',
        },
    ],
    'Sauces & Oils': [
        {
            name: 'Olive Oil',
            emoji: '🫒',
            blurb: 'Fruity, smooth base for marinades and finishing drizzles.',
            bestIn: 'Mediterranean, Grill',
            iconBg: 'bg-emerald-50 dark:bg-emerald-900/30',
        },
        {
            name: 'Soy Sauce',
            emoji: '🥢',
            blurb: 'Savory umami depth, great for glazes and stir-fries.',
            bestIn: 'Asian, Stir-fry',
            iconBg: 'bg-gray-100 dark:bg-gray-800',
        },
        {
            name: 'Honey Mustard',
            emoji: '🍯',
            blurb: 'Sweet and tangy glaze that caramelizes when roasted.',
            bestIn: 'American, Glaze',
            iconBg: 'bg-amber-50 dark:bg-amber-900/30',
        },
        {
            name: 'Teriyaki',
            emoji: '🍶',
            blurb: 'Sweet-savory glaze with deep umami character.',
            bestIn: 'Japanese, Grill',
            iconBg: 'bg-rose-50 dark:bg-rose-900/30',
        },
    ],
};

export const topPairings = pairingsByTab['Best Matches'];
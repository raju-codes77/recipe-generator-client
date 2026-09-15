import { Leaf, Beef, Milk, Package, Wheat, Coffee, LucideIcon } from "lucide-react";
import { Category } from "./types";

export const BRAND = {
  green: "#16A34A",
  darkGreen: "#0F6B46",
  lightGreen: "#EAF7EF",
  cream: "#FFF9F1",
  orange: "#F97316",
  softOrange: "#FFF1E8",
  purple: "#8B5CF6",
  softPurple: "#F1EDFF",
  darkText: "#17211D",
  secondaryText: "#66736C",
  muted: "#8A948D",
  border: "#E5E7EB",
  background: "#FAFAF8",
};

interface CategoryMeta {
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  dot: string;
  badgeBg: string;
  badgeText: string;
}

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  Produce: {
    icon: Leaf,
    iconColor: "text-[#16A34A] dark:text-[#4ADE80]",
    iconBg: "bg-[#EAF7EF] dark:bg-[#16A34A]/15",
    dot: "bg-[#16A34A] dark:bg-[#4ADE80]",
    badgeBg: "bg-[#EAF7EF] dark:bg-[#16A34A]/15",
    badgeText: "text-[#0F6B46] dark:text-[#4ADE80]",
  },
  Protein: {
    icon: Beef,
    iconColor: "text-[#F97316] dark:text-[#FB923C]",
    iconBg: "bg-[#FFF1E8] dark:bg-[#F97316]/15",
    dot: "bg-[#F97316] dark:bg-[#FB923C]",
    badgeBg: "bg-[#FFF1E8] dark:bg-[#F97316]/15",
    badgeText: "text-[#C2410C] dark:text-[#FB923C]",
  },
  Dairy: {
    icon: Milk,
    iconColor: "text-sky-500 dark:text-sky-400",
    iconBg: "bg-sky-50 dark:bg-sky-400/15",
    dot: "bg-sky-500 dark:bg-sky-400",
    badgeBg: "bg-sky-50 dark:bg-sky-400/15",
    badgeText: "text-sky-700 dark:text-sky-300",
  },
  Pantry: {
    icon: Package,
    iconColor: "text-[#8B5CF6] dark:text-[#A78BFA]",
    iconBg: "bg-[#F1EDFF] dark:bg-[#8B5CF6]/15",
    dot: "bg-[#8B5CF6] dark:bg-[#A78BFA]",
    badgeBg: "bg-[#F1EDFF] dark:bg-[#8B5CF6]/15",
    badgeText: "text-[#6D28D9] dark:text-[#A78BFA]",
  },
  Bakery: {
    icon: Wheat,
    iconColor: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-amber-50 dark:bg-amber-400/15",
    dot: "bg-amber-500 dark:bg-amber-400",
    badgeBg: "bg-amber-50 dark:bg-amber-400/15",
    badgeText: "text-amber-700 dark:text-amber-300",
  },
  Frozen: {
    icon: Package,
    iconColor: "text-cyan-600 dark:text-cyan-400",
    iconBg: "bg-cyan-50 dark:bg-cyan-400/15",
    dot: "bg-cyan-500 dark:bg-cyan-400",
    badgeBg: "bg-cyan-50 dark:bg-cyan-400/15",
    badgeText: "text-cyan-700 dark:text-cyan-300",
  },
  Beverages: {
    icon: Coffee,
    iconColor: "text-stone-600 dark:text-stone-400",
    iconBg: "bg-stone-100 dark:bg-stone-400/15",
    dot: "bg-stone-500 dark:bg-stone-400",
    badgeBg: "bg-stone-100 dark:bg-stone-400/15",
    badgeText: "text-stone-700 dark:text-stone-300",
  },
  Other: {
    icon: Package,
    iconColor: "text-[#66736C] dark:text-[#A6B0A9]",
    iconBg: "bg-slate-100 dark:bg-white/5",
    dot: "bg-slate-400",
    badgeBg: "bg-slate-100 dark:bg-white/5",
    badgeText: "text-slate-700 dark:text-slate-300",
  },
};

export const CATEGORY_ORDER: Category[] = [
  "Produce",
  "Protein",
  "Dairy",
  "Pantry",
  "Bakery",
  "Frozen",
  "Beverages",
  "Other",
];

export const CATEGORY_OPTIONS: Category[] = ["Produce", "Protein", "Dairy", "Pantry", "Other"];

// Per-item food icons ("meal icons") — falls back to a category-level icon
// when a specific item isn't in the map, so any manually-added item still
// gets a sensible icon.
const FOOD_EMOJI: Record<string, string> = {
  tomato: "🍅",
  "green chili": "🌶️",
  chili: "🌶️",
  carrot: "🥕",
  spinach: "🥬",
  chicken: "🍗",
  egg: "🥚",
  yogurt: "🥛",
  "soy sauce": "🥫",
  rice: "🍚",
  "basmati rice": "🍚",
  onion: "🧅",
  garlic: "🧄",
  ginger: "🫚",
  "cumin powder": "🧂",
  "bell pepper": "🫑",
  butter: "🧈",
  milk: "🥛",
  cheese: "🧀",
  bread: "🍞",
  fish: "🐟",
  potato: "🥔",
  lemon: "🍋",
  apple: "🍎",
  banana: "🍌",
};

const CATEGORY_FALLBACK_EMOJI: Record<Category, string> = {
  Produce: "🥬",
  Protein: "🍗",
  Dairy: "🥛",
  Pantry: "🧂",
  Bakery: "🍞",
  Frozen: "🧊",
  Beverages: "🥤",
  Other: "🛒",
};

export function getFoodEmoji(name: string, category: Category): string {
  return FOOD_EMOJI[name.trim().toLowerCase()] ?? CATEGORY_FALLBACK_EMOJI[category];
}

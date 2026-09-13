import { Refrigerator, BarChart3, Camera, Smile, ArrowRight, Calendar, ShoppingBasket } from "lucide-react";
import Link from "next/link";

const TOOLS = [
  {
    href: "/ai-tools/ingredient-rescue",
    icon: <Refrigerator size={24} />,
    iconBg: "bg-emerald-600",
    iconShadow: "shadow-emerald-600/30",
    cardBg: "bg-emerald-50/50 dark:bg-slate-800/50",
    border: "border-emerald-100 dark:border-slate-700",
    linkColor: "text-emerald-700 dark:text-emerald-500",
    badge: { text: "Popular", color: "bg-green-100 text-green-700 border-green-200" },
    title: "AI Ingredient Rescue",
    description:
      "Turn your pantry ingredients or leftovers into delicious recipes. Two modes: Pantry AI or Leftover Rescue. Reduce food waste smartly.",
    cta: "Start Cooking",
  },
  {
    href: "/ai-tools/nutrition-analyzer",
    icon: <BarChart3 size={24} />,
    iconBg: "bg-blue-600",
    iconShadow: "shadow-blue-600/30",
    cardBg: "bg-blue-50/50 dark:bg-slate-800/50",
    border: "border-blue-100 dark:border-slate-700",
    linkColor: "text-blue-700 dark:text-blue-500",
    badge: null,
    title: "Nutrition & Meal Tracker",
    description:
      "Analyze the nutritional content of any food from a photo. Track daily calories, protein, carbs, and fat against your personal goals.",
    cta: "Analyze & Track",
  },
  {
    href: "/ai-tools/meal-tracker",
    icon: <Camera size={24} />,
    iconBg: "bg-orange-500",
    iconShadow: "shadow-orange-500/30",
    cardBg: "bg-orange-50/50 dark:bg-slate-800/50",
    border: "border-orange-100 dark:border-slate-700",
    linkColor: "text-orange-600 dark:text-orange-500",
    badge: { text: "New", color: "bg-green-100 text-green-700 border-green-200" },
    title: "AI Meal Tracker",
    description:
      "Snap a photo of your meal and let AI instantly log your calories, macros, and daily nutrition goals. Synced to your account.",
    cta: "Track Meal",
  },
  {
    href: "/ai-tools/taste-matcher",
    icon: <Smile size={24} />,
    iconBg: "bg-emerald-600",
    iconShadow: "shadow-emerald-600/30",
    cardBg: "bg-emerald-50/50 dark:bg-slate-800/50",
    border: "border-emerald-100 dark:border-slate-700",
    linkColor: "text-emerald-700 dark:text-emerald-500",
    badge: null,
    title: "Taste Matcher",
    description:
      "Find recipes that match your personal taste profile. Your preferences influence recipe suggestions across all AI tools.",
    cta: "Find My Match",
  },
  {
    href: "/meal-planner",
    icon: <Calendar size={24} />,
    iconBg: "bg-indigo-600",
    iconShadow: "shadow-indigo-600/30",
    cardBg: "bg-indigo-50/50 dark:bg-slate-800/50",
    border: "border-indigo-100 dark:border-slate-700",
    linkColor: "text-indigo-700 dark:text-indigo-500",
    badge: { text: "AI Powered", color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
    title: "Budget AI Meal Planner",
    description:
      "Generate a multi-day meal plan with estimated costs, then auto-build your complete shopping list — all from one tool.",
    cta: "Plan & Shop",
  },
  {
    href: "/ai-tools/shopping-list",
    icon: <ShoppingBasket size={24} />,
    iconBg: "bg-teal-600",
    iconShadow: "shadow-teal-600/30",
    cardBg: "bg-teal-50/50 dark:bg-slate-800/50",
    border: "border-teal-100 dark:border-slate-700",
    linkColor: "text-teal-700 dark:text-teal-500",
    badge: null,
    title: "Smart Shopping List",
    description:
      "Manage your grocery list. Add items manually or import from your meal plan. Check off purchased items and track your spending.",
    cta: "Open List",
  },
  {
    href: "/ai-tools/food-waste-manager",
    icon: <Refrigerator size={24} />,
    iconBg: "bg-emerald-600",
    iconShadow: "shadow-emerald-600/30",
    cardBg: "bg-emerald-50/50 dark:bg-slate-800/50",
    border: "border-emerald-100 dark:border-slate-700",
    linkColor: "text-emerald-700 dark:text-emerald-500",
    badge: { text: "New", color: "bg-green-100 text-green-700 border-green-200" },
    title: "Food Waste Manager",
    description:
      "Track ingredient freshness, get expiry reminders, and discover AI recipes before your food goes to waste.",
    cta: "Manage My Food",
  },
];

export default function AvailableTools() {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Available AI Tools</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOLS.map((tool) => (
          <div
            key={tool.href}
            className={`${tool.cardBg} rounded-3xl p-6 border ${tool.border} relative overflow-hidden group hover:shadow-md transition-shadow flex flex-col h-full`}
          >
            <div className={`w-12 h-12 ${tool.iconBg} rounded-xl flex items-center justify-center text-white mb-6 shadow-sm ${tool.iconShadow}`}>
              {tool.icon}
            </div>

            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-bold text-slate-900 dark:text-white text-lg">{tool.title}</h4>
              {tool.badge && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tool.badge.color}`}>
                  {tool.badge.text}
                </span>
              )}
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-grow">
              {tool.description}
            </p>

            <Link
              href={tool.href}
              className={`mt-auto ${tool.linkColor} font-semibold text-sm flex items-center gap-1.5 group-hover:gap-2 transition-all w-fit`}
            >
              {tool.cta} <ArrowRight size={16} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

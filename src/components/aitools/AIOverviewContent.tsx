import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Calendar,
  Camera,
  CheckCircle2,
  Refrigerator,
  ShieldCheck,
  ShoppingBasket,
  Smile,
  UsersRound,
} from "lucide-react";

const AI_TOOL_GUIDE: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "AI Ingredient Rescue",
    description: "Turn the ingredients you already have into recipe ideas and reduce food waste.",
    icon: Refrigerator,
  },
  {
    title: "Nutrition Analyzer",
    description: "Analyze food information from a photo and review estimated calories, protein, carbs, and fat.",
    icon: BarChart3,
  },
  {
    title: "AI Meal Tracker",
    description: "Upload a meal photo to log nutrition and compare your intake with your daily goals.",
    icon: Camera,
  },
  {
    title: "Taste Matcher",
    description: "Use your taste profile, ingredient preferences, and cuisines to find more relevant recipes.",
    icon: Smile,
  },
  {
    title: "Smart Meal Planner",
    description: "Create a multi-day meal plan with estimated nutrition and costs, then build a shopping list.",
    icon: Calendar,
  },
  {
    title: "Smart Shopping List",
    description: "Manage grocery items, import ingredients, mark purchases, and keep track of your list.",
    icon: ShoppingBasket,
  },
];

export default function AIOverviewContent() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#2c2c32] dark:bg-[#1a1a1f] sm:p-8 lg:p-10">
      <div className="max-w-3xl">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600 text-white shadow-lg shadow-green-600/25">
          <ShieldCheck size={24} />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          How FoodCanvas AI Tools Work
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
          Each tool is designed to turn your ingredients, food photos, preferences, and goals into useful cooking guidance.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {AI_TOOL_GUIDE.map((tool) => {
          const Icon = tool.icon;

          return (
            <div
              key={tool.title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-[#3a3a40] dark:bg-[#25252a]"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
                  <Icon size={19} />
                </div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">{tool.title}</h2>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{tool.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 border-t border-slate-200 pt-8 dark:border-[#2c2c32]">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
              <UsersRound size={19} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Community AI Features</h2>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-[#3a3a40] dark:bg-[#25252a]">
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
            FoodCanvas Community uses AI-powered content moderation to review uploaded images and help ensure that shared posts and stories stay relevant to food, cooking, and the community.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/50 dark:bg-amber-900/20">
        <div className="flex gap-3">
          <CheckCircle2 className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" size={19} />
          <div>
            <h2 className="text-sm font-bold text-amber-900 dark:text-amber-200">Use AI as a helpful guide</h2>
            <p className="mt-1 text-sm leading-relaxed text-amber-800 dark:text-amber-300">
              AI results are estimates and suggestions. Always review ingredients, allergens, nutrition details, and cooking safety before preparing a meal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

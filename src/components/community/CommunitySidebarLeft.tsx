import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Compass,
  TrendingUp,
  Users,
  Clock,
  Salad,
  Trophy,
  Sparkles,
  Bookmark,
  Heart,
  ChefHat,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { CURRENT_USER } from "./mockData";
import { Author, RecipeCollection } from "./types";
import { CommunityAvatar } from "./CommunityAvatar";

interface CommunitySidebarLeftProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  collections: RecipeCollection[];
  savedPostsCount: number;
  likedPostsCount: number;
  currentUser?: Author | null;
  isAuthenticated?: boolean;
  onRequireAuthentication?: (action: string) => void;
}

export const CommunitySidebarLeft: React.FC<CommunitySidebarLeftProps> = ({
  activeFilter,
  setActiveFilter,
  collections,
  savedPostsCount,
  likedPostsCount,
  currentUser = CURRENT_USER,
  isAuthenticated = true,
  onRequireAuthentication = () => undefined,
}) => {
  const filterCategories = [
    { id: "all", label: "All Community Posts", icon: Compass },
    { id: "trending", label: "Trending & Top Rated", icon: TrendingUp, badge: "Hot" },
    { id: "following", label: "Following Cooks", icon: Users },
    { id: "quick", label: "Quick 15-Min Meals", icon: Clock },
    { id: "wellness", label: "High Protein & Healthy", icon: Salad },
    {
      id: "challenge",
      label: "Summer Salad Challenge",
      icon: Trophy,
      badge: "500 XP",
    },
    { id: "ai_sparks", label: "AI Generated Sparks", icon: Sparkles },
    ...(isAuthenticated
      ? [
          {
            id: "saved",
            label: "My Saved Recipes",
            icon: Bookmark,
            count: savedPostsCount,
          },
          {
            id: "liked",
            label: "Recipes I Liked",
            icon: Heart,
            count: likedPostsCount,
          },
        ]
      : []),
  ];

  return (
    <aside className="space-y-6">
      {/* Member profile or visitor invitation */}
      {isAuthenticated && currentUser ? (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-[#121212]">
          <div className="flex items-center gap-3.5">
            <Link href={`/community/users/${currentUser.id}`} className="relative shrink-0" aria-label="Open your community profile">
              <CommunityAvatar
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-[#2F8F46]"
              />
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF9F43] text-white ring-2 ring-white dark:ring-[#121212]">
                <ChefHat className="h-3 w-3" />
              </span>
            </Link>

            <Link href={`/community/users/${currentUser.id}`} className="min-w-0">
              <h3 className="font-bold text-base leading-tight text-neutral-900 dark:text-white">
                {currentUser.name}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                @{currentUser.username}
              </p>
              <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[#EAF7E8] px-2.5 py-0.5 text-[10px] font-bold text-[#176B35] dark:bg-emerald-950/60 dark:text-[#B7E35F]">
                🥈 {currentUser.badge || "FoodCanvas Cook"}
              </span>
            </Link>
          </div>

          {/* User Stats Grid */}
          <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-neutral-50 p-3 text-center dark:bg-neutral-900/60">
            <div>
              <span className="block font-extrabold text-sm text-[#2F8F46] dark:text-[#B7E35F]">
                {currentUser.recipesCount}
              </span>
              <span className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400">
                Recipes
              </span>
            </div>

            <div>
              <span className="block font-extrabold text-sm text-neutral-800 dark:text-neutral-200">
                {currentUser.followersCount}
              </span>
              <span className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400">
                Followers
              </span>
            </div>

            <div>
              <span className="block font-extrabold text-sm text-[#FF9F43]">
                {savedPostsCount}
              </span>
              <span className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400">
                Saved
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-[#EAF7E8] to-white p-5 shadow-xs dark:border-emerald-900/60 dark:from-emerald-950/30 dark:to-[#121212]">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2F8F46] text-white">
            <ChefHat className="h-5 w-5" />
          </div>

          <h3 className="mt-3 font-extrabold text-base text-neutral-900 dark:text-white">
            Cook, share, connect
          </h3>

          <p className="mt-1.5 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
            Join FoodCanvas to post recipes, save favorites, and follow cooks.
          </p>

          <Link
            href="/registrationProcess/register"
            onClick={() => onRequireAuthentication("join the Community")}
            className="mt-4 flex w-full items-center justify-center rounded-xl bg-[#2F8F46] px-3 py-2.5 text-xs font-bold text-white transition hover:bg-[#176B35]"
          >
            Create free account
          </Link>

          <Link
            href="/registrationProcess/login"
            onClick={() => onRequireAuthentication("use Community member features")}
            className="mt-2 block text-center text-xs font-bold text-[#176B35] hover:underline dark:text-[#B7E35F]"
          >
            Already a member? Log in
          </Link>
        </div>
      )}

      {/* Navigation Filter Links */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs dark:border-neutral-800 dark:bg-[#121212]">
        <h4 className="px-3 pb-2.5 text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          Feeds & Categories
        </h4>

        <nav className="space-y-1">
          {filterCategories
            .filter((cat) => isAuthenticated || cat.id !== "following")
            .map((cat) => {
              const Icon = cat.icon;
              const isActive = activeFilter === cat.id;

              return (
                <motion.button
                  key={cat.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`relative flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition ${
                    isActive
                      ? "bg-[#2F8F46] text-white shadow-md shadow-emerald-800/15"
                      : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`h-4 w-4 ${
                        isActive ? "text-white" : "text-neutral-400"
                      }`}
                    />
                    <span>{cat.label}</span>
                  </div>

                  {cat.badge && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-[#FF9F43]/15 text-[#FF9F43]"
                      }`}
                    >
                      {cat.badge}
                    </span>
                  )}

                  {cat.count !== undefined && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                      }`}
                    >
                      {cat.count}
                    </span>
                  )}
                </motion.button>
              );
            })}
        </nav>
      </div>

      {/* Recipe Collections Box */}
      {isAuthenticated && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-[#121212]">
          <div className="flex items-center justify-between pb-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              My Collections
            </h4>
            <span className="cursor-pointer text-xs font-semibold text-[#2F8F46] hover:underline dark:text-[#B7E35F]">
              + New
            </span>
          </div>

          <div className="space-y-2">
            {collections.map((col) => (
              <motion.div
                key={col.id}
                whileHover={{ x: 3 }}
                onClick={() => setActiveFilter("saved")}
                className="group flex cursor-pointer items-center justify-between rounded-xl p-2 transition hover:bg-neutral-50 dark:hover:bg-neutral-900"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <img
                    src={col.coverImage}
                    alt={col.name}
                    className="h-10 w-10 rounded-lg object-cover"
                  />

                  <div className="truncate">
                    <p className="truncate text-xs font-bold text-neutral-800 group-hover:text-[#2F8F46] dark:text-neutral-200">
                      {col.name}
                    </p>
                    <p className="text-[11px] text-neutral-400">
                      {col.recipeCount} recipes
                    </p>
                  </div>
                </div>

                <ChevronRight className="h-4 w-4 text-neutral-400 transition-transform group-hover:text-[#2F8F46]" />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Community Safety Note */}
      <div className="flex items-center gap-2.5 rounded-xl bg-neutral-50 px-3.5 py-2.5 text-xs text-neutral-500 dark:bg-neutral-900/50 dark:text-neutral-400">
        <ShieldCheck className="h-4 w-4 shrink-0 text-[#2F8F46]" />
        <span>FoodCanvas 24/7 moderation active for recipe safety.</span>
      </div>
    </aside>
  );
};

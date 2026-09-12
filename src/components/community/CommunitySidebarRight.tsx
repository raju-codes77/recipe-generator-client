import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { UserPlus, UserCheck, Trophy, Sparkles, TrendingUp, Star, LockKeyhole } from "lucide-react";
import { Author, Post } from "./types";
import { CommunityAvatar } from "./CommunityAvatar";

interface CommunitySidebarRightProps {
  chefs: Author[];
  currentUserId?: string;
  onToggleFollow: (chefId: string) => void;
  trendingPosts: Post[];
  onSelectRecipe: (post: Post) => void;
  isAuthenticated?: boolean;
  onRequireAuthentication?: (action: string) => void;
}

export const CommunitySidebarRight: React.FC<CommunitySidebarRightProps> = ({
  chefs,
  currentUserId,
  onToggleFollow,
  trendingPosts,
  onSelectRecipe,
  isAuthenticated = true,
  onRequireAuthentication = () => undefined,
}) => {
  const [showAllChefs, setShowAllChefs] = React.useState(false);
  const visibleChefs = showAllChefs ? chefs : chefs.slice(0, 3);
  return (
    <aside className="space-y-6">
      {/* Weekly Cooking Challenge Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-200/80 bg-gradient-to-br from-[#FFF0DD]/90 via-[#FFF8EE] to-white p-5 shadow-xs dark:border-amber-900/50 dark:bg-none dark:bg-[#181511] dark:from-transparent dark:to-transparent">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#FF9F43] px-2.5 py-0.5 text-[10px] font-extrabold text-white">
            <Trophy className="h-3 w-3" /> WEEKLY CHALLENGE
          </span>
          <span className="text-xs font-semibold text-amber-800 dark:text-amber-400">⏳ 2 Days Left</span>
        </div>

        <h4 className="mt-2.5 text-base font-black text-neutral-900 dark:text-amber-300">🥗 #SummerHarvestSalad</h4>
        <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Create a vibrant salad utilizing seasonal vegetables and post your dish photo with the tag.
        </p>

        <div className="mt-3.5 flex items-center justify-between border-t border-amber-200/60 pt-2.5 text-xs font-semibold dark:border-neutral-800">
          <div className="flex items-center gap-1.5 text-[#2F8F46] dark:text-[#B7E35F]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>500 XP + Chef Badge</span>
          </div>
          <span className="text-neutral-500 dark:text-neutral-400">48 Entries</span>
        </div>
      </div>

      {isAuthenticated ? (
        <>
      {/* Top Chefs to Follow */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-xs dark:border-neutral-800 dark:bg-[#121212]">
        <div className="flex items-center justify-between pb-3">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            Top Community Chefs
          </h4>
          {chefs.length > 3 && (
            <button
              type="button"
              onClick={() => setShowAllChefs((visible) => !visible)}
              className="text-xs font-semibold text-[#2F8F46] hover:underline dark:text-[#B7E35F]"
            >
              {showAllChefs ? "View Less" : "View More"}
            </button>
          )}
        </div>

        <div className="space-y-3.5 mt-1">
          {visibleChefs.map((chef) => {
            const isCurrentUser = chef.id === currentUserId;

            return (
              <div key={chef.id} className="flex items-center justify-between">
                <Link
                  href={`/community/users/${encodeURIComponent(chef.id)}`}
                  className="flex min-w-0 items-center gap-3 overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F8F46]"
                  aria-label={`View ${chef.name}'s Community profile`}
                >
                  <CommunityAvatar
                    src={chef.avatar}
                    alt={chef.name}
                    className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-[#2F8F46]/40"
                  />
                  <div className="truncate">
                    <h5 className="truncate text-xs font-bold text-neutral-900 dark:text-white">{chef.name}</h5>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                      <span>{chef.recipesCount} recipes</span> • <span>{chef.badge}</span>
                    </p>
                  </div>
                </Link>

                {isCurrentUser ? (
                  <span className="ml-2 shrink-0 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-bold text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                    You
                  </span>
                ) : isAuthenticated ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onToggleFollow(chef.id)}
                    className={`ml-2 shrink-0 rounded-full px-3 py-1 text-xs font-bold transition ${
                      chef.isFollowing
                        ? "border border-emerald-200 bg-[#EAF7E8] text-[#176B35] dark:border-emerald-800 dark:bg-emerald-950 dark:text-[#B7E35F]"
                        : "bg-[#2F8F46] text-white hover:bg-[#176B35]"
                    }`}
                  >
                    {chef.isFollowing ? (
                      <span className="flex items-center gap-1">
                        <UserCheck className="h-3 w-3" /> Following
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <UserPlus className="h-3 w-3" /> Follow
                      </span>
                    )}
                  </motion.button>
                ) : (
                  <button
                    onClick={() => onRequireAuthentication("follow Community chefs")}
                    className="ml-2 shrink-0 rounded-full border border-emerald-200 px-3 py-1 text-xs font-bold text-[#176B35] transition hover:bg-[#EAF7E8] dark:border-emerald-800 dark:text-[#B7E35F]"
                  >
                    Log in
                  </button>
                )}
              </div>
            );
          })}
          {chefs.length === 0 && (
            <p className="py-2 text-xs text-neutral-500 dark:text-neutral-400">
              No active Community members yet.
            </p>
          )}
        </div>
      </div>

      {/* Trending Recipes This Week */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-xs dark:border-neutral-800 dark:bg-[#121212]">
        <div className="flex items-center gap-2 pb-3">
          <TrendingUp className="h-4 w-4 text-[#FF9F43]" />
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            Trending in Kitchens
          </h4>
        </div>

        <div className="space-y-3">
          {trendingPosts.slice(0, 3).map((post, idx) => (
            <motion.div
              key={post.id}
              whileHover={{ x: 3 }}
              onClick={() => onSelectRecipe(post)}
              className="group flex items-center gap-3 cursor-pointer rounded-xl p-1.5 transition hover:bg-neutral-50 dark:hover:bg-neutral-900"
            >
              <span className="font-black text-sm text-neutral-300 group-hover:text-[#2F8F46] w-4 text-center">
                0{idx + 1}
              </span>
              {post.imageUrl ? (
                <img
                  src={post.imageUrl}
                  alt={post.recipe?.title || "Recipe"}
                  className="h-12 w-12 rounded-xl object-cover"
                />
              ) : (
                <div aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EAF7E8] text-xs font-black text-[#2F8F46] dark:bg-emerald-950/50 dark:text-[#B7E35F]">
                  FC
                </div>
              )}
              <div className="flex-1 overflow-hidden">
                <h5 className="truncate text-xs font-bold text-neutral-800 group-hover:text-[#2F8F46] dark:text-neutral-200">
                  {post.recipe?.title || post.caption.slice(0, 30)}
                </h5>
                <div className="mt-1 flex items-center gap-2 text-[11px] text-neutral-500">
                  <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {post.rating.overall}
                  </span>
                  <span>•</span>
                  <span>{post.likesCount} loved</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

        </>
      ) : (
        <>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-[#121212]">
            <div className="flex items-center gap-2.5 text-neutral-700 dark:text-neutral-200">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EAF7E8] text-[#2F8F46] dark:bg-emerald-950/60 dark:text-[#B7E35F]"><LockKeyhole className="h-4 w-4" /></span>
              <h4 className="text-[11px] font-bold uppercase tracking-wider">Top Community Chefs</h4>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">Log in to discover and follow FoodCanvas chefs.</p>
            <Link href="/registrationProcess/login" className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-[#2F8F46] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#176B35]">Log in to explore</Link>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-[#121212]">
            <div className="flex items-center gap-2.5 text-neutral-700 dark:text-neutral-200">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF0DD] text-[#FF9F43] dark:bg-amber-950/50 dark:text-amber-300"><LockKeyhole className="h-4 w-4" /></span>
              <h4 className="text-[11px] font-bold uppercase tracking-wider">Trending in Kitchens</h4>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">Log in to see what the Community is cooking right now.</p>
            <Link href="/registrationProcess/login" className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-[#2F8F46] px-3 py-2 text-xs font-bold text-[#176B35] transition hover:bg-[#EAF7E8] dark:text-[#B7E35F] dark:hover:bg-emerald-950/40">Log in to view trends</Link>
          </div>
        </>
      )}

      {/* Compact footer links */}
      <nav
        aria-label="Community support and legal links"
        className="px-1 pb-2 text-[11px] leading-5 text-neutral-400 dark:text-neutral-500"
      >
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <Link className="transition hover:text-[#2F8F46] dark:hover:text-[#B7E35F]" href="/help">
            Help Center
          </Link>
          <span aria-hidden="true">·</span>
          <Link className="transition hover:text-[#2F8F46] dark:hover:text-[#B7E35F]" href="/terms">
            Terms of Service
          </Link>
          <span aria-hidden="true">·</span>
          <Link className="transition hover:text-[#2F8F46] dark:hover:text-[#B7E35F]" href="/privacy">
            Privacy Policy
          </Link>
          <span aria-hidden="true">·</span>
          <Link className="transition hover:text-[#2F8F46] dark:hover:text-[#B7E35F]" href="/cookie-policy">
            Cookie Policy
          </Link>
        </div>
        <p className="mt-1">© {new Date().getFullYear()} FoodCanvas. All rights reserved.</p>
      </nav>
    </aside>
  );
};

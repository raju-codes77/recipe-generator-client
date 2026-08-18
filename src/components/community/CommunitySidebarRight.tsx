import React from 'react';
import { motion } from 'motion/react';
import {
  Flame,
  UserPlus,
  UserCheck,
  Trophy,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Star,
  Radio,
} from 'lucide-react';
import { Author, Post } from './types';

interface CommunitySidebarRightProps {
  chefs: Author[];
  onToggleFollow: (chefId: string) => void;
  trendingPosts: Post[];
  onSelectRecipe: (post: Post) => void;
  onOpenCreatePostWithAI: () => void;
}

export const CommunitySidebarRight: React.FC<CommunitySidebarRightProps> = ({
  chefs,
  onToggleFollow,
  trendingPosts,
  onSelectRecipe,
  onOpenCreatePostWithAI,
}) => {
  return (
    <aside className="space-y-6">
      {/* Weekly Cooking Challenge Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-200/80 bg-gradient-to-br from-[#FFF0DD]/90 via-[#FFF8EE] to-white p-5 shadow-xs dark:border-amber-900/50 dark:bg-none dark:bg-[#181511] dark:from-transparent dark:to-transparent">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#FF9F43] px-2.5 py-0.5 text-[10px] font-extrabold text-white">
            <Trophy className="h-3 w-3" /> WEEKLY CHALLENGE
          </span>
          <span className="text-xs font-semibold text-amber-800 dark:text-amber-400">
            ⏳ 2 Days Left
          </span>
        </div>

        <h4 className="mt-2.5 text-base font-black text-neutral-900 dark:text-amber-300">
          🥗 #SummerHarvestSalad
        </h4>
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

      {/* Top Chefs to Follow */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-xs dark:border-neutral-800 dark:bg-[#121212]">
        <div className="flex items-center justify-between pb-3">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            Top Community Chefs
          </h4>
          <span className="text-xs font-semibold text-[#2F8F46] hover:underline cursor-pointer dark:text-[#B7E35F]">
            See All
          </span>
        </div>

        <div className="space-y-3.5 mt-1">
          {chefs.map((chef) => (
            <div key={chef.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3 overflow-hidden">
                <img
                  src={chef.avatar}
                  alt={chef.name}
                  className="h-10 w-10 rounded-full object-cover ring-1 ring-[#2F8F46]/40"
                />
                <div className="truncate">
                  <h5 className="truncate text-xs font-bold text-neutral-900 dark:text-white">
                    {chef.name}
                  </h5>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                    <span>{chef.recipesCount} recipes</span> • <span>{chef.badge}</span>
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onToggleFollow(chef.id)}
                className={`ml-2 shrink-0 rounded-full px-3 py-1 text-xs font-bold transition ${
                  chef.isFollowing
                    ? 'border border-emerald-200 bg-[#EAF7E8] text-[#176B35] dark:border-emerald-800 dark:bg-emerald-950 dark:text-[#B7E35F]'
                    : 'bg-[#2F8F46] text-white hover:bg-[#176B35]'
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
            </div>
          ))}
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
              <img
                src={post.imageUrl}
                alt={post.recipe?.title || 'Recipe'}
                className="h-12 w-12 rounded-xl object-cover"
              />
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

      {/* AI Recipe Assistant Spotlight */}
      <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-[#EAF7E8]/80 to-white p-5 text-neutral-800 shadow-xs dark:border-emerald-900/50 dark:from-emerald-950/30 dark:to-neutral-900 dark:text-neutral-200">
        <div className="flex items-center gap-2 text-[#2F8F46] dark:text-[#B7E35F]">
          <Sparkles className="h-4 w-4 text-[#FF9F43]" />
          <span className="text-xs font-bold uppercase tracking-wider">AI Recipe Generator</span>
        </div>
        <p className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Need recipe ideas from your leftover ingredients? Auto-generate a formatted recipe to post to the community.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenCreatePostWithAI}
          className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2F8F46] py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-800/15 transition hover:bg-[#176B35]"
        >
          <span>Auto-Draft Community Recipe</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </motion.button>
      </div>

      {/* Live Community Activity Ticker */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-[#121212] text-xs">
        <div className="flex items-center gap-2 text-neutral-400 pb-2">
          <Radio className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Live Kitchen Activity</span>
        </div>
        <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
          <p className="truncate">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">Liam</span> posted a new dish photo
          </p>
          <p className="truncate">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">Sofia</span> rated Shakshuka ★★★★★
          </p>
          <p className="truncate">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">Elena</span> completed #SummerSalad
          </p>
        </div>
      </div>
    </aside>
  );
};

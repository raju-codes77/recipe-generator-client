"use client";

import { CalendarDays, ChevronRight, Leaf, Users } from "lucide-react";
import { Post } from "./types";

interface CommunitySeasonalKitchenProps { posts: Post[]; onSelectRecipe: (post: Post) => void; }
const seasonalData = [
  { name: "Winter Kitchen", months: [11, 0, 1], ingredients: ["root", "citrus", "lentil"], displayIngredients: ["Root vegetables", "Citrus", "Lentils"], tip: "Warm, hearty recipes are leading this season." },
  { name: "Spring Kitchen", months: [2, 3, 4], ingredients: ["herb", "pea", "strawberr"], displayIngredients: ["Fresh herbs", "Peas", "Strawberries"], tip: "Fresh herbs and lighter recipes are in focus." },
  { name: "Summer Kitchen", months: [5, 6, 7], ingredients: ["mango", "cucumber", "tomato"], displayIngredients: ["Mango", "Cucumber", "Tomato"], tip: "Bright, fresh ingredients are trending in Community." },
  { name: "Autumn Kitchen", months: [8, 9, 10], ingredients: ["pumpkin", "apple", "sweet potato"], displayIngredients: ["Pumpkin", "Apple", "Sweet potato"], tip: "Roasted and comforting flavours are in focus." },
];

export function CommunitySeasonalKitchen({ posts, onSelectRecipe }: CommunitySeasonalKitchenProps) {
  const season = seasonalData.find((item) => item.months.includes(new Date().getMonth())) ?? seasonalData[0];
  const seasonalPosts = posts.filter((post) => { const content = `${post.recipe?.title ?? ""} ${post.caption} ${post.tags.join(" ")} ${post.recipe?.ingredients.map((item) => item.name).join(" ") ?? ""}`.toLowerCase(); return season.ingredients.some((ingredient) => content.includes(ingredient)); });
  const featuredPost = seasonalPosts[0];
  const totalLikes = seasonalPosts.reduce((sum, post) => sum + post.likesCount, 0);
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-[#121212]">
      <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF0DD] text-[#FF9F43] dark:bg-amber-950/50 dark:text-amber-300"><Leaf className="h-4 w-4" /></span><h4 className="text-[11px] font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-200">Seasonal Kitchen</h4></div><CalendarDays className="h-4 w-4 text-[#FF9F43]" /></div>
      <div className="mt-3 flex items-end justify-between gap-3"><div><h5 className="text-sm font-black text-neutral-900 dark:text-white">{season.name}</h5><p className="mt-1 text-[10px] leading-relaxed text-neutral-500 dark:text-neutral-400">{season.tip}</p></div><div className="text-right"><p className="text-lg font-black text-[#2F8F46] dark:text-[#B7E35F]">{seasonalPosts.length}</p><p className="text-[9px] font-bold uppercase text-neutral-400">matching posts</p></div></div>
      <div className="mt-3 flex flex-wrap gap-1.5">{season.displayIngredients.map((ingredient) => <span key={ingredient} className="rounded-full bg-[#EAF7E8] px-2.5 py-1 text-[10px] font-bold text-[#2F8F46] dark:bg-emerald-950/60 dark:text-[#B7E35F]">{ingredient}</span>)}</div>
      <div className="mt-3 flex items-center gap-3 border-t border-slate-100 pt-3 text-[10px] text-neutral-500 dark:border-neutral-800 dark:text-neutral-400"><span className="flex items-center gap-1"><Users className="h-3 w-3" /> {seasonalPosts.length} creators</span><span>•</span><span>{totalLikes} reactions</span></div>
      {featuredPost ? <button type="button" onClick={() => onSelectRecipe(featuredPost)} className="mt-3 flex w-full items-center justify-between rounded-xl border border-[#2F8F46]/20 bg-[#F6FBF5] p-2.5 text-left transition hover:border-[#2F8F46]/50 dark:bg-emerald-950/20"><span className="min-w-0"><span className="block text-[9px] font-bold uppercase text-[#2F8F46] dark:text-[#B7E35F]">Featured seasonal post</span><span className="block truncate text-[10px] font-bold text-neutral-700 dark:text-neutral-200">{featuredPost.recipe?.title || featuredPost.caption}</span></span><ChevronRight className="h-4 w-4 shrink-0 text-[#2F8F46]" /></button> : <p className="mt-3 rounded-xl bg-neutral-50 p-2.5 text-[10px] text-neutral-500 dark:bg-neutral-900">No matching seasonal post yet. Be the first to share one.</p>}
    </section>
  );
}

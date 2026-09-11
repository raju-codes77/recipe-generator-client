"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChefHat, Clock3, Minus, Plus, Replace, Timer } from "lucide-react";
import { Post } from "./types";

type ToolkitMode = "scale" | "timer" | "substitute";
const substitutions: Record<string, string> = {
  butter: "olive oil or coconut oil",
  egg: "1 tbsp ground flaxseed mixed with 3 tbsp water",
  milk: "unsweetened soy milk, oat milk, or coconut milk",
  yogurt: "sour cream or blended cottage cheese",
  lemon: "lime juice or white vinegar",
  cream: "evaporated milk or blended cashews",
  flour: "1:1 all-purpose gluten-free flour",
  sugar: "honey or maple syrup",
  honey: "maple syrup or date syrup",
  breadcrumbs: "crushed crackers or rolled oats",
  "baking powder": "baking soda with a small amount of lemon juice",
  "soy sauce": "tamari or coconut aminos",
  garlic: "1/8 tsp garlic powder per clove",
  onion: "shallot or 1 tsp onion powder",
};

interface CommunityKitchenToolkitProps { posts: Post[]; }

export function CommunityKitchenToolkit({ posts }: CommunityKitchenToolkitProps) {
  const [mode, setMode] = useState<ToolkitMode>("scale");
  const [servings, setServings] = useState(2);
  const [ingredient, setIngredient] = useState("butter");
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const featuredRecipePost = useMemo(() => posts.find((post) => post.recipe?.ingredients.length && post.recipe.steps.length), [posts]);
  const recipe = featuredRecipePost?.recipe;
  const baseServings = recipe?.servings ?? 2;
  const totalMinutes = (recipe?.prepTimeMinutes ?? 10) + (recipe?.cookTimeMinutes ?? 15);
  const scaleFactor = servings / baseServings;
  const formattedTime = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  useEffect(() => {
    if (!timerRunning || seconds <= 0) return;
    const timer = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [timerRunning, seconds]);
  useEffect(() => { if (seconds === 0) setTimerRunning(false); }, [seconds]);

  const loadRecipeTimer = () => { setSeconds(totalMinutes * 60); setTimerRunning(false); setMode("timer"); };

  const scaleAmount = (amount: string) => {
    const match = amount.match(/^(\d+(?:\.\d+)?|\d+\/\d+)(.*)$/);
    if (!match) return amount;
    const value = match[1].includes("/")
      ? (() => {
          const [numerator, denominator] = match[1].split("/").map(Number);
          return denominator ? numerator / denominator : 0;
        })()
      : Number(match[1]);
    const scaled = value * scaleFactor;
    const display = Number.isInteger(scaled) ? String(scaled) : scaled.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
    return `${display}${match[2]}`;
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-[#121212]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#EAF7E8] text-[#2F8F46] dark:bg-emerald-950/60 dark:text-[#B7E35F]"><ChefHat className="h-4 w-4" /></span><div className="min-w-0"><h4 className="text-[11px] font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-200">Kitchen Toolkit</h4><p className="mt-0.5 truncate text-[10px] text-neutral-500 dark:text-neutral-400">{recipe ? `Working with ${recipe.title}` : "Community cooking utilities"}</p></div></div>
        <Link href="/ai-tools" className="shrink-0 text-[10px] font-bold text-[#2F8F46] hover:underline dark:text-[#B7E35F]">AI Tools</Link>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1 border-b border-slate-100 pb-1 dark:border-neutral-800">{([ ["scale", "Scale", Plus], ["timer", "Recipe timer", Clock3], ["substitute", "Swap", Replace] ] as const).map(([value, label, Icon]) => <button key={value} type="button" onClick={() => setMode(value)} className={`flex items-center justify-center gap-1 rounded-lg px-1 py-2 text-[10px] font-bold transition ${mode === value ? "bg-[#EAF7E8] text-[#2F8F46] dark:bg-emerald-950/60 dark:text-[#B7E35F]" : "text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-900"}`}><Icon className="h-3 w-3" />{label}</button>)}</div>
      {mode === "scale" && <div className="mt-3"><div className="flex items-center justify-between gap-2"><div><p className="text-[10px] font-semibold text-neutral-500">Adjust servings</p><p className="text-[9px] text-neutral-400">Original: {baseServings} servings</p></div><div className="flex items-center gap-2"><button type="button" onClick={() => setServings((value) => Math.max(1, value - 1))} className="rounded-md border border-slate-200 p-1 dark:border-neutral-700" aria-label="Decrease servings"><Minus className="h-3 w-3" /></button><span className="min-w-5 text-center text-xs font-black text-neutral-800 dark:text-white">{servings}</span><button type="button" onClick={() => setServings((value) => Math.min(20, value + 1))} className="rounded-md border border-slate-200 p-1 dark:border-neutral-700" aria-label="Increase servings"><Plus className="h-3 w-3" /></button></div></div>{recipe ? <div className="mt-2 space-y-1.5">{recipe.ingredients.slice(0, 3).map((item) => <div key={item.name} className="flex items-center justify-between gap-2 text-[10px]"><span className="truncate text-neutral-600 dark:text-neutral-300">{item.name}</span><span className="shrink-0 font-bold text-[#2F8F46] dark:text-[#B7E35F]">{item.amount} → {scaleAmount(item.amount)}</span></div>)}<p className="pt-1 text-[9px] text-neutral-400">Quantities update automatically for {servings} servings.</p></div> : <p className="mt-2 text-[10px] text-neutral-500">Recipe details will appear when Community recipes load.</p>}</div>}
      {mode === "timer" && <div className="mt-3"><div className="flex items-center justify-between gap-2"><div><p className="text-[10px] font-semibold text-neutral-500">Full recipe timer</p><p className="text-[9px] text-neutral-400">{recipe ? `Prep ${recipe.prepTimeMinutes} min + cook ${recipe.cookTimeMinutes} min` : "Load a recipe timer"}</p></div><Timer className="h-4 w-4 text-[#FF9F43]" /></div><div className="mt-2 flex items-center justify-between gap-2"><p className="font-mono text-xl font-black text-neutral-800 dark:text-white">{formattedTime}</p><div className="flex gap-1.5"><button type="button" onClick={loadRecipeTimer} className="rounded-lg bg-[#EAF7E8] px-2 py-2 text-[10px] font-bold text-[#2F8F46] dark:bg-emerald-950/60 dark:text-[#B7E35F]">Set {totalMinutes} min</button><button type="button" onClick={() => setTimerRunning((value) => !value)} disabled={seconds === 0} className="rounded-lg bg-[#2F8F46] px-2 py-2 text-[10px] font-bold text-white disabled:opacity-40">{timerRunning ? "Pause" : "Start"}</button></div></div></div>}
      {mode === "substitute" && <div className="mt-3"><label htmlFor="community-ingredient-swap" className="mb-1.5 block text-[10px] font-semibold text-neutral-500">Choose an ingredient</label><div className="rounded-xl border border-slate-200 bg-neutral-50 p-1 dark:border-neutral-700 dark:bg-neutral-900"><select id="community-ingredient-swap" value={ingredient} onChange={(event) => setIngredient(event.target.value)} className="w-full rounded-lg border-0 bg-transparent px-2 py-2 text-xs text-neutral-800 outline-none dark:bg-neutral-900 dark:text-neutral-200" aria-label="Ingredient to substitute">{Object.keys(substitutions).map((item) => <option key={item} value={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</option>)}</select></div><div className="mt-2 rounded-xl bg-[#F6FBF5] p-2.5 text-[10px] leading-relaxed text-neutral-600 dark:bg-emerald-950/20 dark:text-neutral-300"><span className="font-bold text-[#2F8F46] dark:text-[#B7E35F]">Suggested replacement:</span> {substitutions[ingredient]}</div></div>}
      <Link href="/ai-tools" className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold text-[#2F8F46] hover:underline dark:text-[#B7E35F]">Open full AI cooking tools <ArrowRight className="h-3 w-3" /></Link>
    </section>
  );
}

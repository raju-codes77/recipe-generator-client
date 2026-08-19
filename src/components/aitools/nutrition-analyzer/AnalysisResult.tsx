"use client";

import Image from "next/image";
import {
  CircleCheck,
  Clock,
  Sparkles,
  Flame,
  Candy,
  UtensilsCrossed,
  Lightbulb,
  Leaf,
  Sprout,
  Droplet,
  ShieldCheck,
  SmilePlus,
  Maximize2,
} from "lucide-react";
// import type { NutritionResult } from "@/types/nutrition";
import { ItemIcon } from "./icon-map";
import { NutritionResult } from "@/types/nutrition";

const macroColor: Record<string, string> = {
  success: "#10b981",
  warning: "#f59e0b",
  pro: "#8b5cf6",
};

function macroGradient(macros: NutritionResult["macros"]) {
  let acc = 0;
  const stops = macros.map((m) => {
    const start = acc;
    acc += m.percent;
    return `${macroColor[m.color]} ${start}% ${acc}%`;
  });
  return `conic-gradient(${stops.join(", ")})`;
}

export default function AnalysisResult({ result }: { result: NutritionResult }) {
  return (
    <div className="space-y-3.5">
      <div className="grid gap-3.5 md:grid-cols-2">
        {/* Detected food card */}
        <div className="rounded-xl bg-neutral-50 p-3.5 dark:bg-neutral-900">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950">
                <CircleCheck className="h-3 w-3" />
              </span>
              Analysis result
            </span>
            <span className="flex items-center gap-1 text-[11px] text-neutral-400">
              <Clock className="h-3 w-3" />
              Analyzed just now
            </span>
          </div>

          <div className="relative mb-2.5 h-36 w-full overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-800">
            <Image
              src={result.imageUrl}
              alt={result.foodName}
              fill
              className="object-cover"
              unoptimized
            />
            <button
              type="button"
              className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-neutral-200 bg-white/90 dark:border-neutral-700 dark:bg-neutral-900/90"
              aria-label="Expand image"
            >
              <Maximize2 className="h-3 w-3 text-neutral-500" />
            </button>
          </div>

          <div className="mb-2 flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-sm font-medium text-neutral-900 dark:text-neutral-50">
              <UtensilsCrossed className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              {result.foodName}
            </p>
          </div>
          <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-md bg-emerald-100 px-2.5 py-1 text-[11px] font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
            {result.tag}
          </span>

          <p className="mb-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
            Detected items
          </p>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {result.detectedItems.map((item) => (
              <span
                key={item.name}
                className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[11px] text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
              >
                <ItemIcon name={item.icon} className="h-3 w-3" />
                {item.name}
              </span>
            ))}
          </div>

          <p className="mb-1 flex items-center gap-1 text-[11px] text-neutral-500 dark:text-neutral-400">
            AI confidence score
          </p>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${result.confidenceScore}%` }}
            />
          </div>
          <p className="mt-1 text-right text-[11px] text-neutral-400">
            {result.confidenceScore}%
          </p>
        </div>

        {/* Nutrition facts card */}
        <div className="rounded-xl bg-neutral-50 p-3.5 dark:bg-neutral-900">
          <p className="mb-3 flex items-center gap-1.5 text-sm font-medium text-neutral-900 dark:text-neutral-50">
            <Flame className="h-4 w-4 text-amber-500" />
            Nutrition facts
            <span className="text-[11px] font-normal text-neutral-400">· per serving</span>
          </p>

          <div className="mb-3.5 flex items-center gap-4">
            <div
              className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full"
              style={{ background: macroGradient(result.macros) }}
            >
              <div className="flex h-[66px] w-[66px] flex-col items-center justify-center rounded-full bg-neutral-50 dark:bg-neutral-900">
                <span className="text-base font-medium text-neutral-900 dark:text-neutral-50">
                  {result.calories}
                </span>
                <span className="text-[10px] text-neutral-400">kcal</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              {result.macros.map((m) => (
                <div key={m.label} className="flex items-center gap-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: macroColor[m.color] }}
                  />
                  {m.label} · {m.percent}% · {m.grams}g
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {result.micros.map((m) => (
              <div
                key={m.label}
                className="rounded-lg bg-white p-2 text-center dark:bg-neutral-800"
              >
                {m.label === "Fiber" && <Sprout className="mx-auto h-3.5 w-3.5 text-emerald-500" />}
                {m.label === "Sugar" && <Candy className="mx-auto h-3.5 w-3.5 text-amber-500" />}
                {m.label === "Sodium" && <Droplet className="mx-auto h-3.5 w-3.5 text-blue-500" />}
                <p className="mt-0.5 text-[10px] text-neutral-500 dark:text-neutral-400">{m.label}</p>
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-3.5 md:grid-cols-3">
        {/* Insights */}
        <div className="rounded-xl bg-neutral-50 p-3.5 dark:bg-neutral-900">
          <p className="mb-3 flex items-center gap-1.5 text-xs font-medium text-neutral-900 dark:text-neutral-50">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            AI health insights
          </p>
          <div className="space-y-3">
            {result.insights.map((insight) => (
              <div key={insight.title} className="flex gap-2">
                <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-md bg-emerald-100 dark:bg-emerald-950">
                  <ItemIcon name={insight.icon} className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                </span>
                <div>
                  <p className="text-xs font-medium text-neutral-900 dark:text-neutral-50">
                    {insight.title}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug text-neutral-500 dark:text-neutral-400">
                    {insight.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health score */}
        <div className="rounded-xl bg-neutral-50 p-3.5 dark:bg-neutral-900">
          <p className="mb-3 flex items-center gap-1.5 text-xs font-medium text-neutral-900 dark:text-neutral-50">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            Health score
          </p>
          <div className="mb-3 flex items-center gap-3">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(#10b981 0 ${result.healthScore * 10}%, #e5e5e5 ${
                  result.healthScore * 10
                }% 100%)`,
              }}
            >
              <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-neutral-50 dark:bg-neutral-900">
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                  {result.healthScore}
                </span>
              </div>
            </div>
            <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
              <SmilePlus className="h-3.5 w-3.5" />
              {result.healthScoreLabel}
            </span>
          </div>
          <div className="space-y-1.5">
            {result.scoreBreakdown.map((s) => (
              <div key={s.label} className="flex justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
                <span>{s.label}</span>
                <span className="font-medium text-neutral-900 dark:text-neutral-50">{s.value}/10</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="rounded-xl bg-neutral-50 p-3.5 dark:bg-neutral-900">
          <p className="mb-3 flex items-center gap-1.5 text-xs font-medium text-neutral-900 dark:text-neutral-50">
            <Lightbulb className="h-3.5 w-3.5 text-blue-500" />
            AI recommendations
          </p>
          <div className="space-y-3">
            {result.recommendations.map((rec) => (
              <div key={rec.title} className="flex gap-2">
                <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-md bg-blue-100 dark:bg-blue-950">
                  {rec.icon === "leaf" && <Leaf className="h-3 w-3 text-blue-600 dark:text-blue-400" />}
                  {rec.icon === "avocado" && <Sprout className="h-3 w-3 text-blue-600 dark:text-blue-400" />}
                  {rec.icon === "droplet" && <Droplet className="h-3 w-3 text-blue-600 dark:text-blue-400" />}
                </span>
                <div>
                  <p className="text-xs font-medium text-neutral-900 dark:text-neutral-50">
                    {rec.title}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug text-neutral-500 dark:text-neutral-400">
                    {rec.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
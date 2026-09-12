"use client";

import { useMemo } from "react";
import { Activity, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface HealthScoreCardProps {
  kcal: string;    // e.g. "520"
  protein: string; // e.g. "36g"
  time: string;    // e.g. "28m"
  level: string;   // "Easy" | "Medium" | "Hard"
  instructions: string[];
  ingredients: string[];
}

function calcHealthScore({
  kcal,
  protein,
  instructions,
  ingredients,
}: {
  kcal: string;
  protein: string;
  instructions: string[];
  ingredients: string[];
}): { score: number; breakdown: { label: string; points: number; max: number; tip?: string }[] } {
  const cal = parseInt(kcal) || 0;
  const prot = parseInt(protein) || 0;
  const instrText = instructions.join(" ").toLowerCase();
  const ingText = ingredients.join(" ").toLowerCase();

  // 1. Calorie range (0–30 pts): ideal 300–650 kcal
  let calPts = 0;
  let calTip: string | undefined;
  if (cal >= 300 && cal <= 650) {
    calPts = 30;
  } else if (cal < 300) {
    calPts = 15;
    calTip = "Meal may be too low-calorie for a main dish.";
  } else if (cal <= 800) {
    calPts = 20;
    calTip = "Consider reducing oil or portion size to cut calories.";
  } else {
    calPts = 8;
    calTip = "High-calorie meal. Try reducing oil, butter, or portion size.";
  }

  // 2. Protein density (0–25 pts): ideal ≥ 20g
  let protPts = 0;
  let protTip: string | undefined;
  if (prot >= 30) protPts = 25;
  else if (prot >= 20) protPts = 20;
  else if (prot >= 10) { protPts = 12; protTip = "Add beans, eggs, or lean meat to boost protein."; }
  else { protPts = 5; protTip = "Very low protein. Consider adding a protein source."; }

  // 3. Cooking method (0–20 pts): reward steam/bake/grill, penalize deep fry
  let cookPts = 20;
  let cookTip: string | undefined;
  if (instrText.includes("deep fry") || instrText.includes("deep-fry")) {
    cookPts = 5; cookTip = "Deep-frying adds significant calories. Try air-frying or baking.";
  } else if (instrText.includes("fry") || instrText.includes("pan-fry")) {
    cookPts = 12; cookTip = "Use less oil when frying to reduce calories.";
  } else if (instrText.includes("steam") || instrText.includes("bak") || instrText.includes("grill")) {
    cookPts = 20;
  }

  // 4. Vegetable/whole food content (0–15 pts)
  const veggies = ["vegetable", "spinach", "broccoli", "carrot", "onion", "tomato", "pepper", "zucchini", "kale", "lettuce", "cabbage", "mushroom", "celery", "pea"];
  const veggieCount = veggies.filter((v) => ingText.includes(v)).length;
  const veggPts = Math.min(15, veggieCount * 5);
  const veggTip = veggieCount === 0 ? "Add vegetables for fiber, vitamins, and minerals." : undefined;

  // 5. Avoid processed/sugary (0–10 pts)
  const processed = ["sugar", "syrup", "soda", "processed", "bacon", "hot dog", "sausage"];
  const hasBad = processed.some((b) => ingText.includes(b) || instrText.includes(b));
  const procPts = hasBad ? 4 : 10;
  const procTip = hasBad ? "Reduce processed or sugary ingredients for a healthier meal." : undefined;

  const total = calPts + protPts + cookPts + veggPts + procPts;
  const score = Math.round((total / 100) * 10 * 10) / 10; // out of 10, 1dp

  return {
    score,
    breakdown: [
      { label: "Calorie Balance", points: calPts, max: 30, tip: calTip },
      { label: "Protein Content", points: protPts, max: 25, tip: protTip },
      { label: "Cooking Method", points: cookPts, max: 20, tip: cookTip },
      { label: "Vegetable Content", points: veggPts, max: 15, tip: veggTip },
      { label: "Whole Ingredients", points: procPts, max: 10, tip: procTip },
    ],
  };
}

function scoreColor(score: number) {
  if (score >= 8) return { ring: "stroke-emerald-500", text: "text-emerald-600 dark:text-emerald-400", label: "Excellent", bg: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/40" };
  if (score >= 6) return { ring: "stroke-yellow-500", text: "text-yellow-600 dark:text-yellow-400", label: "Good", bg: "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800/40" };
  return { ring: "stroke-orange-500", text: "text-orange-600 dark:text-orange-400", label: "Could Improve", bg: "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800/40" };
}

export default function HealthScoreCard({ kcal, protein, time, level, instructions, ingredients }: HealthScoreCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { score, breakdown } = useMemo(
    () => calcHealthScore({ kcal, protein, instructions, ingredients }),
    [kcal, protein, instructions, ingredients]
  );
  const color = scoreColor(score);
  const tips = breakdown.filter((b) => b.tip);

  const circumference = 2 * Math.PI * 28;
  const offset = circumference - (score / 10) * circumference;

  return (
    <div className={`border rounded-2xl p-4 space-y-3 ${color.bg}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className={`w-4 h-4 ${color.text}`} />
          <span className="font-bold text-sm text-zinc-800 dark:text-zinc-100">Health Score</span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${color.text} bg-white/60 dark:bg-black/20`}>
            {color.label}
          </span>
        </div>
        <button
          onClick={() => setExpanded((e) => !e)}
          className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex items-center gap-4">
        {/* Ring */}
        <div className="relative shrink-0">
          <svg width="72" height="72" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r="28" fill="none" stroke="currentColor" strokeWidth="6" className="text-zinc-200 dark:text-zinc-700" />
            <circle
              cx="36" cy="36" r="28"
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className={`${color.ring} transition-all duration-700`}
              transform="rotate(-90 36 36)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-lg font-extrabold ${color.text}`}>{score}</span>
            <span className="text-[9px] text-zinc-400 font-medium">/ 10</span>
          </div>
        </div>

        {/* Quick stats */}
        <div className="flex-1 grid grid-cols-2 gap-1.5 text-xs">
          {breakdown.map((b) => (
            <div key={b.label} className="flex items-center gap-1.5">
              <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-1.5 flex-1">
                <div
                  className={`h-1.5 rounded-full ${b.points / b.max >= 0.8 ? "bg-emerald-500" : b.points / b.max >= 0.5 ? "bg-yellow-500" : "bg-orange-500"}`}
                  style={{ width: `${(b.points / b.max) * 100}%` }}
                />
              </div>
              <span className="text-zinc-500 dark:text-zinc-400 w-24 shrink-0">{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      {expanded && tips.length > 0 && (
        <div className="space-y-1.5 pt-1 border-t border-zinc-200/60 dark:border-zinc-700/40">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Improvement Suggestions</p>
          {tips.map((t) => (
            <p key={t.label} className="text-xs text-zinc-600 dark:text-zinc-300 flex items-start gap-1.5">
              <span className="text-orange-400 mt-0.5">•</span> {t.tip}
            </p>
          ))}
        </div>
      )}

      <p className="text-[10px] text-zinc-400 italic">
        * Health score is a general estimate. Consult a nutritionist for personalized advice.
      </p>
    </div>
  );
}

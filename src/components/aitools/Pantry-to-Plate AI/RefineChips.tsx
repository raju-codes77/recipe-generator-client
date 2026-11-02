"use client";

import { LucideIcon, Leaf, Dumbbell, FlameIcon as SpicyIcon, Tag, Users } from "lucide-react";
import { REFINE_OPTIONS, RefineIcon } from "./constants";

const ICONS: Record<RefineIcon, LucideIcon> = { Leaf, Dumbbell, SpicyIcon, Tag, Users };

interface RefineChipsProps {
  onRefine: (refinement: string) => void;
  refiningOption: string | null;
}

export default function RefineChips({ onRefine, refiningOption }: RefineChipsProps) {
  const isBusy = refiningOption !== null;

  return (
    <div className="space-y-2.5 pt-2">
      <p className="text-xs font-bold tracking-wider text-zinc-400 uppercase">Refine This Recipe</p>
      <div className="flex flex-wrap gap-2">
        {REFINE_OPTIONS.map((opt) => {
          const Icon = ICONS[opt.icon];
          const isActive = refiningOption === opt.label;
          return (
            <button
              key={opt.label}
              onClick={() => onRefine(opt.label)}
              disabled={isBusy}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition disabled:opacity-50 ${
                isActive
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50"
                  : "border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${opt.color}`} />
              {isActive ? "Refining..." : opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
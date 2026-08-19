"use client";

import toast from "react-hot-toast";
import { LucideIcon, Leaf, Dumbbell, FlameIcon as SpicyIcon, Tag, Users } from "lucide-react";
import { REFINE_OPTIONS, RefineIcon } from "./constants";
// import { REFINE_OPTIONS, RefineIcon } from "./constants";

const ICONS: Record<RefineIcon, LucideIcon> = { Leaf, Dumbbell, SpicyIcon, Tag, Users };

export default function RefineChips() {
  return (
    <div className="space-y-2.5 pt-2">
      <p className="text-xs font-bold tracking-wider text-zinc-400 uppercase">Refine This Recipe</p>
      <div className="flex flex-wrap gap-2">
        {REFINE_OPTIONS.map((opt) => {
          const Icon = ICONS[opt.icon];
          return (
            <button
              key={opt.label}
              onClick={() => toast.success(`Refining: ${opt.label}`)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
            >
              <Icon className={`w-3.5 h-3.5 ${opt.color}`} /> {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
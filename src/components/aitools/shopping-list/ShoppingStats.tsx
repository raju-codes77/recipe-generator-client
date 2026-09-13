"use client";

import React from "react";
import { ShoppingBasket, CheckCircle2, Clock, Home } from "lucide-react";
import { ShoppingStatsData } from "./types";

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  tone: string;
  iconColor: string;
}

function StatItem({ icon, value, label, tone, iconColor }: StatItemProps) {
  return (
    <div className="flex items-center gap-3 bg-white dark:bg-[#0b0f19] border border-[#E5E7EB] dark:border-white/5 rounded-2xl px-4 py-3 flex-1 min-w-[130px]">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${tone} ${iconColor}`}>
        {icon}
      </div>
      <div className="leading-tight">
        <p className="text-lg font-extrabold text-[#17211D] dark:text-[#F4F7F4]">{value}</p>
        <p className="text-[11px] font-medium text-[#66736C] dark:text-[#A6B0A9] whitespace-nowrap">{label}</p>
      </div>
    </div>
  );
}

export default function ShoppingStats({ stats }: { stats: ShoppingStatsData }) {
  return (
    <div className="flex flex-wrap gap-3">
      <StatItem
        icon={<ShoppingBasket size={16} />}
        value={stats.total}
        label="Total Items"
        tone="bg-[#EAF7EF] dark:bg-[#16A34A]/15"
        iconColor="text-[#16A34A] dark:text-[#4ADE80]"
      />
      <StatItem
        icon={<CheckCircle2 size={16} />}
        value={stats.completed}
        label="Completed"
        tone="bg-[#EAF7EF] dark:bg-[#16A34A]/15"
        iconColor="text-[#16A34A] dark:text-[#4ADE80]"
      />
      <StatItem
        icon={<Clock size={16} />}
        value={stats.remaining}
        label="Remaining"
        tone="bg-[#FFF1E8] dark:bg-[#F97316]/15"
        iconColor="text-[#F97316] dark:text-[#FB923C]"
      />
      <StatItem
        icon={<Home size={16} />}
        value={stats.fromPantry}
        label="From Pantry"
        tone="bg-[#F1EDFF] dark:bg-[#8B5CF6]/15"
        iconColor="text-[#8B5CF6] dark:text-[#A78BFA]"
      />
    </div>
  );
}

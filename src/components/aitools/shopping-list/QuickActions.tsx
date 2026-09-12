"use client";

import React from "react";
import { ShoppingCart, Trash2, Sparkles, Share2, ChevronRight, LucideIcon } from "lucide-react";

interface ActionProps {
  icon: LucideIcon;
  label: string;
  iconColor: string;
  onClick: () => void;
  loading?: boolean;
}

function ActionRow({ icon: Icon, label, iconColor, onClick, loading }: ActionProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#EAF7EF] dark:hover:bg-white/5 transition-colors group disabled:opacity-60"
    >
      <span className="flex items-center gap-3 text-sm font-semibold text-[#17211D] dark:text-[#F4F7F4]">
        <Icon size={16} className={iconColor} />
        {loading ? `${label}...` : label}
      </span>
      <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-400" />
    </button>
  );
}

interface Props {
  onAddMissing: () => void;
  onClearCompleted: () => void;
  onOptimize: () => void;
  onShare: () => void;
  optimizing?: boolean;
}

export default function QuickActions({ onAddMissing, onClearCompleted, onOptimize, onShare, optimizing }: Props) {
  return (
    <div className="bg-white dark:bg-[#0b0f19] rounded-[20px] p-6 border border-[#E5E7EB] dark:border-white/5 shadow-sm">
      <h3 className="text-sm font-bold text-[#17211D] dark:text-[#F4F7F4] mb-2">Quick Actions</h3>
      <div className="space-y-1">
        <ActionRow icon={ShoppingCart} label="Add All Missing Ingredients" iconColor="text-[#16A34A]" onClick={onAddMissing} />
        <ActionRow icon={Trash2} label="Clear Completed" iconColor="text-red-500" onClick={onClearCompleted} />
        <ActionRow icon={Sparkles} label="Optimize List" iconColor="text-[#8B5CF6]" onClick={onOptimize} loading={optimizing} />
        <ActionRow icon={Share2} label="Share List" iconColor="text-sky-500" onClick={onShare} />
      </div>
    </div>
  );
}

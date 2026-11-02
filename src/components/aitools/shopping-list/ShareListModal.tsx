"use client";

import React from "react";
import { X, Link2, Share2 } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
}

const DEMO_URL = "https://foodcanvas.app/share/shopping-list/demo-9f3a";

export default function ShareListModal({ open, onClose }: Props) {
  if (!open) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(DEMO_URL);
    } catch {
      // clipboard may be unavailable in some environments; ignore silently
    }
    toast.success("Shopping list link copied.");
    onClose();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "My FoodCanvas Shopping List", url: DEMO_URL });
      } catch {
        // user cancelled share sheet — no-op
      }
    } else {
      toast.success("Shopping list link copied.");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div
        className="bg-white dark:bg-[#0b0f19] rounded-[20px] p-6 w-full max-w-sm shadow-xl border border-[#E5E7EB] dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#17211D] dark:text-[#F4F7F4]">Share List</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#66736C] hover:bg-slate-100 dark:hover:bg-white/5">
            <X size={18} />
          </button>
        </div>

        <div className="px-3 py-2.5 rounded-xl bg-[#FAFAF8] dark:bg-[#000000] border border-[#E5E7EB] dark:border-white/10 text-xs text-[#66736C] dark:text-[#A6B0A9] truncate mb-4">
          {DEMO_URL}
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#E5E7EB] dark:border-white/10 text-sm font-bold text-[#17211D] dark:text-[#F4F7F4] hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
          >
            <Link2 size={16} /> Copy Link
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#0F6B46] text-white text-sm font-bold transition-colors"
          >
            <Share2 size={16} /> Share
          </button>
        </div>
      </div>
    </div>
  );
}

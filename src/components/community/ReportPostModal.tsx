import React, { useState } from "react";
import { motion } from "motion/react";
import { X, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Post } from "./types";

interface ReportPostModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReport?: (postId: string, reason: string, details: string) => Promise<void> | void;
}

const REPORT_REASONS = [
  {
    id: "food_safety",
    title: "Food Safety & Hazardous Instructions",
    description: "Contains harmful ingredient pairings, toxic items, or unsafe temperatures.",
  },
  {
    id: "inappropriate",
    title: "Inappropriate or Offensive Content",
    description: "Violates community guidelines, hateful speech, or inappropriate imagery.",
  },
  {
    id: "misleading",
    title: "Misleading Recipe / Deceptive Photos",
    description: "Recipe produces completely different results or impossible culinary proportions.",
  },
  {
    id: "copyright",
    title: "Plagiarism & Copyright Infringement",
    description: "Copied verbatim from another chef or cookbook without proper credit.",
  },
  {
    id: "spam",
    title: "Spam or Commercial Ads",
    description: "Promoting unverified products, affiliate marketing, or automated bot posts.",
  },
];

export const ReportPostModal: React.FC<ReportPostModalProps> = ({ post, isOpen, onClose, onSubmitReport }) => {
  const [selectedReason, setSelectedReason] = useState(REPORT_REASONS[0].id);
  const [details, setDetails] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !post) return null;

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmitReport) await onSubmitReport(post.id, selectedReason, details);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-lg rounded-3xl border border-rose-100 bg-white p-6 shadow-2xl dark:border-rose-900/30 dark:bg-[#121212]"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <X className="h-5 w-5" />
        </button>

        {isSubmitted ? (
          <div className="py-6 text-center space-y-3">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-[#2F8F46] dark:bg-emerald-950 dark:text-[#B7E35F]">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="font-extrabold text-lg text-neutral-900 dark:text-white">Report Submitted for Moderation</h3>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
              Thank you for keeping FoodCanvas safe. Our community moderation team will review this recipe promptly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmitReport} className="space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-950/60">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-neutral-900 dark:text-white">Report Community Content</h3>
                <p className="text-xs text-neutral-500">
                  Help maintain safety and quality across the FoodCanvas kitchen
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-neutral-50 p-3 text-xs text-neutral-600 dark:bg-neutral-900 dark:text-neutral-300">
              Reporting:{" "}
              <span className="font-bold text-neutral-900 dark:text-white">
                {post.recipe?.title || post.caption.slice(0, 40)}
              </span>{" "}
              by @{post.author.username}
            </div>

            {/* Reasons List */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {REPORT_REASONS.map((r) => (
                <label
                  key={r.id}
                  className={`flex items-start gap-3 rounded-xl border p-3 transition cursor-pointer ${
                    selectedReason === r.id
                      ? "border-rose-300 bg-rose-50/50 dark:border-rose-900 dark:bg-rose-950/20"
                      : "border-slate-200 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
                  }`}
                >
                  <input
                    type="radio"
                    name="reportReason"
                    value={r.id}
                    checked={selectedReason === r.id}
                    onChange={() => setSelectedReason(r.id)}
                    className="mt-0.5 text-rose-600 focus:ring-rose-500"
                  />
                  <div>
                    <span className="block font-bold text-xs text-neutral-800 dark:text-neutral-200">{r.title}</span>
                    <span className="text-[11px] text-neutral-500 leading-tight">{r.description}</span>
                  </div>
                </label>
              ))}
            </div>

            {/* Additional details */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Additional Details (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Provide specific notes to assist moderation verification..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-neutral-900 focus:border-rose-500 dark:border-neutral-700 dark:bg-[#18181b] dark:text-white"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-4 py-2 text-xs font-bold text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-rose-700"
              >
                Submit Report
              </motion.button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

import React from "react";
import { Bookmark, X } from "lucide-react";
import type { Post } from "./types";

interface ConfirmUnsaveModalProps {
  post: Post | null;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
}

export const ConfirmUnsaveModal: React.FC<ConfirmUnsaveModalProps> = ({ post, onClose, onConfirm }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs" role="dialog" aria-modal="true" aria-label="Confirm unsave" onClick={onClose}>
      <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-[#121212]" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 dark:bg-rose-950/40 dark:text-rose-300">
              <Bookmark className="h-5 w-5 fill-current" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">Remove from Saved?</h3>
              <p className="mt-1 line-clamp-2 text-xs text-neutral-500">{post.recipe?.title || post.caption}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close confirmation" className="rounded-full p-2 text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800">
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-5 text-sm leading-6 text-neutral-600 dark:text-neutral-300">This post will be removed from your saved posts and collections.</p>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-xl px-4 py-2.5 text-xs font-bold text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800">Keep saved</button>
          <button type="button" onClick={() => void onConfirm()} className="rounded-xl bg-rose-500 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-rose-600">Remove saved</button>
        </div>
      </div>
    </div>
  );
};

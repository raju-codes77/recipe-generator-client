import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Link2, MessageCircle, Send, Share2, X, Globe2 } from "lucide-react";
import { Post } from "./types";
import { CommunityAvatar } from "./CommunityAvatar";
import { parseCommunityTags } from "./community-tags";

interface CommunityShareModalProps {
  post: Post | null;
  isOpen: boolean;
  currentUserName?: string;
  currentUserAvatar?: string;
  isSubmitting?: boolean;
  onClose: () => void;
  onShareNow: (caption: string, tags: string[]) => Promise<void> | void;
}

export const CommunityShareModal: React.FC<CommunityShareModalProps> = ({
  post,
  isOpen,
  currentUserName = "Your profile",
  currentUserAvatar = "",
  isSubmitting = false,
  onClose,
  onShareNow,
}) => {
  const [caption, setCaption] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCaption("");
      setTagsInput("");
      setCopied(false);
    }
  }, [isOpen, post?.id]);

  if (!post) return null;

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/community/recipe/${post.id}`
    : "";
  const shareText = caption.trim() || post.caption;

  const copyLink = async () => {
    await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const openExternalShare = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="community-share-title"
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-neutral-700 dark:bg-[#121614]"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-neutral-800">
              <h2 id="community-share-title" className="text-xl font-black text-neutral-900 dark:text-white">Share</h2>
              <button type="button" onClick={onClose} aria-label="Close share dialog" className="rounded-full bg-neutral-100 p-2 text-neutral-600 transition hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div className="flex items-center gap-3">
                <CommunityAvatar src={currentUserAvatar} alt={currentUserName} className="h-11 w-11 rounded-full object-cover ring-2 ring-[#2F8F46]/30" />
                <div className="min-w-0">
                  <p className="truncate font-bold text-neutral-900 dark:text-white">{currentUserName}</p>
                  <span className="text-xs text-neutral-500">Sharing to your Community profile</span>
                </div>
              </div>

              <textarea
                value={caption}
                onChange={(event) => setCaption(event.target.value)}
                rows={3}
                placeholder="Say something about this..."
                className="w-full resize-none rounded-2xl border border-slate-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-[#2F8F46] focus:ring-2 focus:ring-[#2F8F46]/15 dark:border-neutral-700 dark:bg-[#181B19] dark:text-white"
              />

              <input
                type="text"
                value={tagsInput}
                onChange={(event) => setTagsInput(event.target.value)}
                placeholder="Add hashtags for your share (optional)"
                className="w-full rounded-2xl border border-slate-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#2F8F46] focus:ring-2 focus:ring-[#2F8F46]/15 dark:border-neutral-700 dark:bg-[#181B19] dark:text-white"
              />

              <div className="rounded-2xl border border-slate-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-[#181B19]">
                <div className="flex items-center gap-3">
                  {post.imageUrl ? <img src={post.imageUrl} alt="" className="h-16 w-16 rounded-xl object-cover" /> : <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#EAF7E8] text-xs font-black text-[#2F8F46] dark:bg-emerald-950/50 dark:text-[#B7E35F]">FC</div>}
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#2F8F46] dark:text-[#B7E35F]">Original post</p>
                    <p className="mt-1 line-clamp-2 text-sm font-semibold text-neutral-800 dark:text-neutral-200">{post.caption}</p>
                    <p className="mt-1 text-xs text-neutral-500">by {post.author.name}</p>
                  </div>
                </div>
              </div>

              <button type="button" disabled={isSubmitting} onClick={() => void onShareNow(caption.trim(), parseCommunityTags(tagsInput))} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2F8F46] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#176B35] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#B7E35F] dark:text-[#14230D] dark:hover:bg-[#C7ED7D]">
                <Send className="h-4 w-4" />
                {isSubmitting ? "Sharing..." : "Share now"}
              </button>

              <div className="border-t border-slate-200 pt-4 dark:border-neutral-800">
                <h3 className="mb-3 text-base font-bold text-neutral-900 dark:text-white">Share to</h3>
                <div className="grid grid-cols-4 gap-3">
                  <button type="button" onClick={() => openExternalShare(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`)} className="flex flex-col items-center gap-2 text-xs font-semibold text-neutral-600 transition hover:text-[#25D366] dark:text-neutral-300"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]"><MessageCircle className="h-5 w-5" /></span>WhatsApp</button>
                  <button type="button" onClick={() => openExternalShare(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`)} className="flex flex-col items-center gap-2 text-xs font-semibold text-neutral-600 transition hover:text-[#1877F2] dark:text-neutral-300"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1877F2]/15 text-[#1877F2]"><Globe2 className="h-5 w-5" /></span>Facebook</button>
                  <button type="button" onClick={() => void copyLink()} className="flex flex-col items-center gap-2 text-xs font-semibold text-neutral-600 transition hover:text-[#2F8F46] dark:text-neutral-300"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2F8F46]/15 text-[#2F8F46] dark:text-[#B7E35F]">{copied ? <Check className="h-5 w-5" /> : <Link2 className="h-5 w-5" />}</span>{copied ? "Copied" : "Copy link"}</button>
                  <button type="button" onClick={() => void navigator.share?.({ title: post.recipe?.title || "FoodCanvas post", text: shareText, url: shareUrl })} className="flex flex-col items-center gap-2 text-xs font-semibold text-neutral-600 transition hover:text-[#FF9F43] dark:text-neutral-300"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF9F43]/15 text-[#FF9F43]"><Share2 className="h-5 w-5" /></span>More</button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

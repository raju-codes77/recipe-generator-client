import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Heart, MessageCircle, Send, Share2 } from "lucide-react";
import type { Comment, Post } from "./types";
import { CommunityAvatar } from "./CommunityAvatar";

interface CommunityPostDetailsModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
  onLike?: () => Promise<{ active: boolean }> | void;
  onLoadComments?: () => Promise<Comment[]>;
  onAddComment?: (content: string) => Promise<void>;
  onShare?: () => Promise<void> | void;
}

export const CommunityPostDetailsModal: React.FC<CommunityPostDetailsModalProps> = ({
  post,
  isOpen,
  onClose,
  onLike,
  onLoadComments,
  onAddComment,
  onShare,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isSendingComment, setIsSendingComment] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !post) return;
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setIsLiked(post.isLiked);
    setLikesCount(post.likesCount);
    setComments(post.comments);
    setCommentsCount(post.commentsCount);
    setCommentText("");
    setActionError(null);

    if (onLoadComments) {
      setIsLoadingComments(true);
      void onLoadComments()
        .then((loadedComments) => {
          setComments(loadedComments);
          setCommentsCount(loadedComments.length);
        })
        .catch(() => setActionError("Unable to load comments right now."))
        .finally(() => setIsLoadingComments(false));
    }

    return () => { document.body.style.overflow = previousBodyOverflow; };
  }, [isOpen, onLoadComments, post]);

  if (!post) return null;

  const handleLike = async () => {
    if (!onLike) return;
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    setLikesCount((current) => Math.max(0, current + (nextLiked ? 1 : -1)));
    try {
      const result = await onLike();
      if (result) setIsLiked(result.active);
    } catch {
      setIsLiked(!nextLiked);
      setLikesCount((current) => Math.max(0, current + (nextLiked ? -1 : 1)));
      setActionError("Unable to update the like right now.");
    }
  };

  const handleComment = async (event: React.FormEvent) => {
    event.preventDefault();
    const content = commentText.trim();
    if (!content || !onAddComment || isSendingComment) return;
    setIsSendingComment(true);
    setActionError(null);
    try {
      await onAddComment(content);
      setCommentText("");
      if (onLoadComments) {
        const loadedComments = await onLoadComments();
        setComments(loadedComments);
        setCommentsCount(loadedComments.length);
      } else {
        setCommentsCount((current) => current + 1);
      }
    } catch {
      setActionError("Unable to post your comment right now.");
    } finally {
      setIsSendingComment(false);
    }
  };

  const handleShare = async () => {
    if (!onShare || isSharing) return;
    setIsSharing(true);
    try {
      await onShare();
    } catch {
      setActionError("Unable to share this post right now.");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-x-0 bottom-0 top-16 z-[80] overflow-y-auto bg-[#090B0A]/95 text-white backdrop-blur-sm sm:top-[72px] lg:top-[88px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Community post details"
        >
          <div className="relative mx-auto flex min-h-full w-full max-w-6xl flex-col px-4 pb-4 pt-2 sm:px-8 sm:pb-8 sm:pt-4">
            <button type="button" onClick={onClose} className="absolute left-0 top-1 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#121614]/90 text-neutral-200 shadow-lg backdrop-blur transition hover:bg-white/10 sm:left-4 sm:top-3 lg:-left-12 lg:top-4" aria-label="Go back to saved posts">
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div className="grid flex-1 gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
              <section className="flex min-h-[calc(100dvh-8rem)] flex-col justify-center rounded-3xl border border-white/10 bg-[#121614] p-6 shadow-2xl sm:p-10">
                <div className="mb-8 flex items-center gap-3">
                  <CommunityAvatar src={post.author.avatar} alt={post.author.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-[#2F8F46]/50" />
                  <div><h1 className="text-lg font-black">{post.author.name}</h1><p className="text-xs text-neutral-400">{post.createdAt}</p></div>
                </div>
                {post.imageUrl && <img src={post.imageUrl} alt={post.recipe?.title || "Community post"} className="mb-8 max-h-[52vh] w-full rounded-2xl object-contain" />}
                <p className="whitespace-pre-wrap text-xl font-semibold leading-9 text-neutral-100 sm:text-3xl sm:leading-[1.35]">{post.caption}</p>
                {post.tags.length > 0 && <div className="mt-8 flex flex-wrap gap-2">{post.tags.map((tag) => <span key={tag} className="rounded-full bg-[#17351F] px-3 py-1.5 text-xs font-bold text-[#B7E35F]">{tag}</span>)}</div>}
              </section>

              <aside className="flex flex-col rounded-3xl border border-white/10 bg-[#121614] p-5 shadow-2xl sm:p-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4"><div><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#B7E35F]">Community post</p><h2 className="mt-1 text-lg font-black">Post activity</h2></div><MessageCircle className="h-5 w-5 text-[#B7E35F]" /></div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button type="button" onClick={() => void handleLike()} className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold transition ${isLiked ? "border-rose-500/50 bg-rose-500/10 text-rose-300" : "border-white/15 text-neutral-300 hover:border-rose-400/50 hover:text-rose-300"}`}><Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} /> {likesCount} likes</button>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs font-bold text-neutral-300"><MessageCircle className="h-4 w-4" /> {commentsCount} comments</span>
                  <button type="button" onClick={() => void handleShare()} disabled={!onShare || isSharing} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs font-bold text-neutral-300 transition hover:border-[#B7E35F]/60 hover:text-[#B7E35F] disabled:opacity-50"><Share2 className="h-4 w-4" /> {isSharing ? "Sharing..." : "Share"}</button>
                </div>
                {onAddComment && <form onSubmit={handleComment} className="mt-5 flex gap-2"><input value={commentText} onChange={(event) => setCommentText(event.target.value)} placeholder="Write a comment..." className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white outline-none placeholder:text-neutral-500 focus:border-[#2F8F46]" /><button type="submit" disabled={!commentText.trim() || isSendingComment} aria-label="Send comment" className="rounded-full bg-[#2F8F46] p-2.5 text-white disabled:opacity-50"><Send className="h-4 w-4" /></button></form>}
                {actionError && <p className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-300">{actionError}</p>}
                <div className="mt-6 flex-1 space-y-3 overflow-y-auto border-t border-white/10 pt-5"><h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">Comments</h3>{isLoadingComments ? <p className="text-xs text-neutral-500">Loading comments...</p> : comments.length === 0 ? <p className="text-xs text-neutral-500">No comments yet.</p> : comments.map((comment) => <div key={comment.id} className="flex gap-3"><CommunityAvatar src={comment.userAvatar} alt={comment.userName} className="h-8 w-8 shrink-0 rounded-full object-cover" /><div className="min-w-0 flex-1 rounded-2xl bg-white/5 px-3 py-2"><p className="text-xs font-bold">{comment.userName}</p><p className="mt-1 text-xs leading-5 text-neutral-300">{comment.content}</p><p className="mt-1 text-[10px] text-neutral-500">{comment.createdAt}</p></div></div>)}</div>
              </aside>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

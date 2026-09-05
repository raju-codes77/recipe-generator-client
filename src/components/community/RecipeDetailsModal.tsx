import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Bookmark, Check, ChefHat, Clock, Heart, MessageCircle, Send, X } from "lucide-react";
import { CommunityAvatar } from "./CommunityAvatar";
import { Comment, Post } from "./types";

interface RecipeDetailsModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
  fullScreen?: boolean;
  onLike?: () => void;
  onSave?: () => void;
  onAddComment?: (content: string) => Promise<void>;
  onLoadComments?: () => Promise<Comment[]>;
}

export const RecipeDetailsModal: React.FC<RecipeDetailsModalProps> = ({ post, isOpen, onClose, fullScreen = false, onLike, onSave, onAddComment, onLoadComments }) => {
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [commentText, setCommentText] = useState("");
  const [isSendingComment, setIsSendingComment] = useState(false);
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentsCount, setCommentsCount] = useState(post.commentsCount);
  const recipe = post.recipe;

  useEffect(() => {
    if (!isOpen || !fullScreen) return;
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousBodyOverflow; };
  }, [fullScreen, isOpen]);

  useEffect(() => {
    setIsLiked(post.isLiked);
    setLikesCount(post.likesCount);
    setCommentText("");
    setComments(post.comments);
    setCommentsCount(post.commentsCount);
  }, [post]);

  useEffect(() => {
    if (!isOpen || !onLoadComments) return;
    setIsLoadingComments(true);
    void onLoadComments().then(setComments).finally(() => setIsLoadingComments(false));
  }, [isOpen, onLoadComments]);

  if (!recipe) return null;

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((current) => ({ ...current, [index]: !current[index] }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-x-0 bottom-0 top-0 z-40 flex items-center justify-center ${fullScreen ? "bg-[#FCFDF9] pt-16 dark:bg-[#090B0A] sm:pt-[76px]" : "bg-black/70 p-3 backdrop-blur-sm sm:p-6"}`}
          role="dialog"
          aria-modal="true"
          aria-label={`Recipe details for ${recipe.title}`}
          onMouseDown={fullScreen ? undefined : onClose}
        >
          <motion.section
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onMouseDown={(event) => event.stopPropagation()}
            className={`h-full w-full overflow-y-auto border-slate-200 bg-[#FCFDF9] shadow-2xl dark:border-neutral-800 dark:bg-[#121212] ${fullScreen ? "max-h-full max-w-none rounded-none border-0" : "max-h-[92vh] max-w-3xl rounded-3xl border"}`}
          >
            {!fullScreen && (
              <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-slate-200 bg-[#FCFDF9]/95 px-5 py-4 backdrop-blur dark:border-neutral-800 dark:bg-[#121212]/95 sm:px-6">
                <div className="flex min-w-0 items-center gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#2F8F46] text-white"><ChefHat className="h-5 w-5" /></span><div className="min-w-0"><h2 className="truncate text-base font-extrabold text-neutral-900 dark:text-white">{recipe.title}</h2><p className="text-xs text-neutral-500">{recipe.cuisine} · {recipe.difficulty} · {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins</p></div></div>
                <button onClick={onClose} className="rounded-full p-2 text-neutral-500 transition hover:bg-neutral-100 dark:hover:bg-neutral-800" aria-label="Close recipe details"><X className="h-5 w-5" /></button>
              </div>
            )}

            <div className={`mx-auto space-y-6 p-5 sm:p-8 ${fullScreen ? "grid max-w-6xl gap-6 space-y-0 lg:grid-cols-2" : ""}`}>
              {fullScreen && <div className="relative"><button type="button" onClick={onClose} className="absolute left-0 top-[-3.25rem] z-10 rounded-full border border-slate-200 bg-white/90 p-2 text-neutral-600 shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white dark:border-neutral-700 dark:bg-[#18181b]/90 dark:text-neutral-300 dark:hover:bg-[#242725] sm:left-auto sm:right-[calc(100%+1rem)] sm:top-4" aria-label="Go back from recipe details"><ArrowLeft className="h-5 w-5" /></button><div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-[#18181b]"><img src={post.imageUrl} alt={recipe.title} className="h-full min-h-64 w-full object-cover sm:min-h-80" /></div></div>}
              <div className={`${fullScreen ? "rounded-3xl border border-slate-200 bg-white p-5 text-left dark:border-neutral-800 dark:bg-[#18181b]" : ""}`}>
                {fullScreen && <><h1 className="text-2xl font-black text-neutral-900 dark:text-white sm:text-3xl">{recipe.title}</h1><p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">{post.caption}</p><p className="mt-2 text-xs text-neutral-500">Shared by {post.author.name} · {post.createdAt}</p><div className="mt-5 flex flex-wrap gap-2"><button type="button" onClick={() => { setIsLiked((current) => !current); setLikesCount((current) => current + (isLiked ? -1 : 1)); onLike?.(); }} className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold transition ${isLiked ? "border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-900 dark:bg-rose-950/30" : "border-slate-200 text-neutral-600 hover:border-rose-200 hover:text-rose-600 dark:border-neutral-700 dark:text-neutral-300"}`}><Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} /> {likesCount} likes</button><button type="button" onClick={onSave} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-bold text-neutral-600 transition hover:border-[#2F8F46] hover:text-[#2F8F46] dark:border-neutral-700 dark:text-neutral-300"><Bookmark className="h-4 w-4" /> Saved</button><span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-bold text-neutral-500 dark:border-neutral-700"><MessageCircle className="h-4 w-4" /> {commentsCount} comments</span></div>{onAddComment && <form onSubmit={async (event) => { event.preventDefault(); const content = commentText.trim(); if (!content || isSendingComment) return; setIsSendingComment(true); try { await onAddComment(content); setCommentText(""); setCommentsCount((current) => current + 1); if (onLoadComments) setComments(await onLoadComments()); } finally { setIsSendingComment(false); } }} className="mt-4 flex gap-2"><input value={commentText} onChange={(event) => setCommentText(event.target.value)} placeholder="Write a comment..." className="min-w-0 flex-1 rounded-full border border-slate-200 bg-transparent px-4 py-2 text-xs outline-none focus:border-[#2F8F46] dark:border-neutral-700" /><button type="submit" disabled={!commentText.trim() || isSendingComment} aria-label="Send comment" className="rounded-full bg-[#2F8F46] p-2 text-white disabled:opacity-50"><Send className="h-4 w-4" /></button></form>}<div className="mt-5 space-y-3 border-t border-slate-200 pt-4 dark:border-neutral-800"><h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">Comments</h3>{isLoadingComments ? <p className="text-xs text-neutral-500">Loading comments...</p> : comments.length === 0 ? <p className="text-xs text-neutral-500">No comments yet.</p> : comments.map((comment) => <div key={comment.id} className="flex gap-3"><CommunityAvatar src={comment.userAvatar} alt={comment.userName} className="h-8 w-8 shrink-0 rounded-full object-cover" /><div className="min-w-0 rounded-2xl bg-neutral-100 px-3 py-2 dark:bg-neutral-800"><p className="text-xs font-bold text-neutral-900 dark:text-white">{comment.userName}</p><p className="mt-1 text-xs leading-5 text-neutral-600 dark:text-neutral-300">{comment.content}</p><p className="mt-1 text-[10px] text-neutral-500">{comment.createdAt}</p></div></div>)}</div></>}
                {!fullScreen && <div className="grid grid-cols-4 gap-2 rounded-2xl border border-slate-200 bg-white p-3 text-center dark:border-neutral-800 dark:bg-[#18181b] sm:gap-3 sm:p-4">{[[`${recipe.nutrition.calories}`, "Calories", "text-[#2F8F46] dark:text-[#B7E35F]"], [`${recipe.nutrition.protein}g`, "Protein", "text-[#FF9F43]"], [`${recipe.nutrition.carbs}g`, "Carbs", "text-neutral-700 dark:text-neutral-300"], [`${recipe.nutrition.fat}g`, "Fat", "text-neutral-700 dark:text-neutral-300"]].map(([value, label, color]) => <div key={label}><span className={`block text-sm font-black ${color}`}>{value}</span><span className="text-[10px] text-neutral-500 sm:text-xs">{label}</span></div>)}</div>}
              </div>

              <div className={fullScreen ? "rounded-3xl border border-slate-200 bg-white p-5 dark:border-neutral-800 dark:bg-[#18181b]" : ""}>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                  Ingredients ({recipe.servings} servings)
                </h3>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {recipe.ingredients.map((ingredient, index) => {
                    const isChecked = Boolean(checkedIngredients[index]);
                    return (
                      <button
                        key={`${ingredient.name}-${index}`}
                        onClick={() => toggleIngredient(index)}
                        className={`flex items-center gap-2.5 rounded-xl border p-3 text-left text-xs transition sm:text-sm ${isChecked ? "border-emerald-200 bg-[#EAF7E8]/60 text-neutral-400 line-through dark:border-emerald-900/40 dark:bg-emerald-950/20" : "border-slate-200 bg-white text-neutral-800 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-[#18181b] dark:text-neutral-200"}`}
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border ${isChecked ? "border-[#2F8F46] bg-[#2F8F46] text-white" : "border-slate-300 dark:border-neutral-600"}`}
                        >
                          {isChecked && <Check className="h-3 w-3" />}
                        </span>
                        <span className="flex-1 font-medium">{ingredient.name}</span>
                        <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400">
                          {ingredient.amount}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={fullScreen ? "rounded-3xl border border-slate-200 bg-white p-5 dark:border-neutral-800 dark:bg-[#18181b]" : ""}>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                  Step-by-step cooking method
                </h3>
                <div className="space-y-3">
                  {recipe.steps.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-neutral-800 dark:bg-[#18181b]"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2F8F46] text-xs font-bold text-white">
                        {step.stepNumber}
                      </span>
                      <div className="min-w-0 flex-1 text-xs leading-relaxed text-neutral-800 dark:text-neutral-200 sm:text-sm">
                        <p>{step.instruction}</p>
                        {step.tip && (
                          <p className="mt-2 rounded-xl bg-[#FFF0DD] p-2.5 text-xs font-medium text-amber-950 dark:bg-amber-950/40 dark:text-amber-300">
                            💡 <span className="font-bold">Chef Tip:</span> {step.tip}
                          </p>
                        )}
                      </div>
                      {step.durationMinutes && (
                        <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-neutral-400">
                          <Clock className="h-3.5 w-3.5" />
                          {step.durationMinutes}m
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

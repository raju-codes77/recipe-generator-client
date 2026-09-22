import React, { useEffect, useState } from "react";
import { MessageCircle, Pencil, Reply, Trash2, X } from "lucide-react";
import { CommunityAvatar } from "./CommunityAvatar";
import { Comment, Post } from "./types";
import { CommunityConfirmModal } from "./CommunityConfirmModal";

interface RecipeCommentsPanelProps {
  post: Post;
  currentUserId?: string;
  onAddComment: (content: string, parentId?: string) => Promise<void>;
  onUpdateComment?: (commentId: string, content: string) => Promise<void>;
  onDeleteComment?: (commentId: string) => Promise<void>;
  onLoadComments: () => Promise<Comment[]>;
  embedded?: boolean;
  onCommentsCountChange?: (count: number) => void;
  onOpenProfile?: (userId: string) => void;
  isExpanded?: boolean;
  onHideComments?: () => void;
}

export const RecipeCommentsPanel: React.FC<RecipeCommentsPanelProps> = ({
  post,
  currentUserId,
  onAddComment,
  onUpdateComment,
  onDeleteComment,
  onLoadComments,
  embedded = false,
  onCommentsCountChange,
  onOpenProfile,
  isExpanded = true,
  onHideComments,
}) => {
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);
  const [replyText, setReplyText] = useState("");
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [editingText, setEditingText] = useState("");
  const [menuCommentId, setMenuCommentId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCommentLimit, setVisibleCommentLimit] = useState(3);
  const [hiddenReplyIds, setHiddenReplyIds] = useState<Set<string>>(new Set());
  const [commentToDelete, setCommentToDelete] = useState<Comment | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const countComments = (items: Comment[]): number => items.reduce((total, item) => total + 1 + countComments(item.replies ?? []), 0);
  const applyComments = (items: Comment[]) => {
    setComments(items);
    setVisibleCommentLimit((current) => Math.min(Math.max(current, 3), Math.max(items.length, 3)));
    onCommentsCountChange?.(countComments(items));
  };
  const reloadComments = async () => applyComments(await onLoadComments());

  useEffect(() => {
    setIsLoading(true);
    void onLoadComments().then(applyComments).finally(() => setIsLoading(false));
  }, [onLoadComments, post.id]);

  const submit = async (event: React.FormEvent, parentId?: string) => {
    event.preventDefault();
    const content = (parentId ? replyText : commentText).trim();
    if (!content) return;
    await onAddComment(content, parentId);
    setCommentText("");
    setReplyText("");
    setReplyingTo(null);
    await reloadComments();
  };

  const saveEdit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingComment || !editingText.trim() || !onUpdateComment) return;
    await onUpdateComment(editingComment.id, editingText.trim());
    setEditingComment(null);
    setEditingText("");
    await reloadComments();
  };

  const removeComment = async () => {
    if (!commentToDelete || !onDeleteComment || isDeleting) return;
    setIsDeleting(true);
    try {
      await onDeleteComment(commentToDelete.id);
      setCommentToDelete(null);
      setMenuCommentId(null);
      await reloadComments();
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleReplies = (commentId: string) => {
    setHiddenReplyIds((current) => {
      const next = new Set(current);
      if (next.has(commentId)) next.delete(commentId);
      else next.add(commentId);
      return next;
    });
  };

  const renderComment = (comment: Comment, depth = 0): React.ReactNode => {
    const isOwn = currentUserId === comment.userId;
    const replies = comment.replies ?? [];
    return (
      <div key={comment.id} className={`flex items-start gap-3 ${depth ? "ml-7 border-l-2 border-emerald-100 pl-3 dark:border-emerald-950" : ""}`}>
        <button type="button" onClick={() => onOpenProfile?.(comment.userId)} disabled={!onOpenProfile} className="shrink-0 self-start rounded-full disabled:cursor-default" aria-label={`Open ${comment.userName}'s profile`}><CommunityAvatar src={comment.userAvatar} alt={comment.userName} className="h-8 w-8 rounded-full object-cover" /></button>
        <div className="min-w-0 flex-1 rounded-2xl bg-neutral-100 px-3 py-2 dark:bg-neutral-800">
          <div className="flex items-start justify-between gap-2"><div><p className="text-xs font-bold text-neutral-900 dark:text-white">{comment.userName}</p><p className="text-[10px] text-neutral-500">{comment.createdAt}</p></div>{isOwn && (onUpdateComment || onDeleteComment) && <div className="relative"><button type="button" onClick={() => setMenuCommentId((id) => id === comment.id ? null : comment.id)} aria-label="Comment actions" className="rounded-full px-1 text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700">•••</button>{menuCommentId === comment.id && <div className="absolute right-0 top-6 z-20 w-28 rounded-xl border border-slate-200 bg-white p-1 shadow-lg dark:border-neutral-700 dark:bg-neutral-900"><button type="button" onClick={() => { setEditingComment(comment); setEditingText(comment.content); setMenuCommentId(null); }} className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800"><Pencil className="h-3.5 w-3.5" /> Edit</button><button type="button" onClick={() => { setCommentToDelete(comment); setMenuCommentId(null); }} className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"><Trash2 className="h-3.5 w-3.5" /> Delete</button></div>}</div>}</div>
          {editingComment?.id === comment.id ? <form onSubmit={(event) => void saveEdit(event)} className="mt-2 flex gap-2"><input value={editingText} onChange={(event) => setEditingText(event.target.value)} autoFocus className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs dark:border-neutral-700 dark:bg-neutral-900 dark:text-white" /><button type="submit" className="text-xs font-bold text-[#2F8F46]">Save</button><button type="button" onClick={() => setEditingComment(null)} aria-label="Cancel edit" className="text-neutral-400"><X className="h-4 w-4" /></button></form> : <p className="mt-1 text-xs leading-5 text-neutral-600 dark:text-neutral-300">{comment.content}</p>}
          <button type="button" onClick={() => { setReplyingTo(comment); setReplyText(""); }} className="mt-2 inline-flex items-center gap-1 align-middle text-[11px] font-bold text-neutral-500 hover:text-[#2F8F46] dark:text-neutral-400"><Reply className="h-3.5 w-3.5" /> Reply</button>
          {replyingTo?.id === comment.id && <form onSubmit={(event) => void submit(event, comment.id)} className="mt-2 flex gap-2"><input value={replyText} onChange={(event) => setReplyText(event.target.value)} placeholder={`Reply to ${comment.userName}...`} autoFocus className="min-w-0 flex-1 rounded-lg border border-emerald-200 bg-white px-2.5 py-2 text-xs dark:border-emerald-900 dark:bg-neutral-900 dark:text-white" /><button type="submit" disabled={!replyText.trim()} className="text-xs font-bold text-[#2F8F46] disabled:opacity-40">Send</button></form>}
          {replies.length > 0 && <><button type="button" onClick={() => toggleReplies(comment.id)} className="mt-2 ml-3 inline-flex items-center align-middle text-[11px] font-bold text-neutral-500 hover:text-[#2F8F46] dark:text-neutral-400">{hiddenReplyIds.has(comment.id) ? `Show ${replies.length} repl${replies.length === 1 ? "y" : "ies"}` : "Hide replies"}</button>{!hiddenReplyIds.has(comment.id) && <div className="mt-3 space-y-3">{replies.map((reply) => renderComment(reply, depth + 1))}</div>}</>}
        </div>
      </div>
    );
  };

  const visibleComments = comments.slice(0, visibleCommentLimit);
  return <><div className={embedded ? "mt-5 border-t border-slate-200 pt-4 text-left dark:border-neutral-800" : "mt-5 rounded-3xl border border-slate-200 bg-white p-5 text-left dark:border-neutral-800 dark:bg-[#18181b]"}>{isExpanded && <div className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-[#2F8F46]" /><h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">Comments</h3></div>}<form onSubmit={(event) => void submit(event)} className={`${isExpanded ? "mt-4" : "mt-0"} flex gap-2`}><input value={commentText} onChange={(event) => setCommentText(event.target.value)} placeholder="Write a comment..." className="min-w-0 flex-1 rounded-full border border-slate-200 bg-transparent px-4 py-2 text-xs outline-none focus:border-[#2F8F46] dark:border-neutral-700" /><button type="submit" disabled={!commentText.trim()} aria-label="Send comment" className="rounded-full bg-[#2F8F46] px-3 py-2 text-xs font-bold text-white disabled:opacity-50">Send</button></form>{isExpanded && <><div className={embedded ? "community-comments-scroll mt-4 max-h-64 space-y-3 overflow-y-auto pr-1" : "mt-4 space-y-3"}>{isLoading ? <p className="text-xs text-neutral-500">Loading comments...</p> : comments.length === 0 ? <p className="text-xs text-neutral-500">No comments yet.</p> : visibleComments.map((comment) => renderComment(comment))}</div>{comments.length > 3 && <div className="mt-4 flex items-center justify-center gap-4 border-t border-slate-200 pt-3 dark:border-neutral-800"><button type="button" onClick={() => setVisibleCommentLimit((current) => Math.min(current + 3, comments.length))} disabled={visibleCommentLimit >= comments.length} className="text-[11px] font-bold text-[#2F8F46] disabled:cursor-default disabled:opacity-40">Show More</button><button type="button" onClick={() => setVisibleCommentLimit(3)} disabled={visibleCommentLimit <= 3} className="text-[11px] font-bold text-neutral-500 disabled:cursor-default disabled:opacity-40 dark:text-neutral-400">Show Less</button><button type="button" onClick={onHideComments} className="text-[11px] font-bold text-neutral-500 hover:text-[#2F8F46] dark:text-neutral-400">Hide Comments</button></div>}</>}</div><CommunityConfirmModal isOpen={Boolean(commentToDelete)} title="Delete this comment?" message="This comment and its replies will be permanently removed." confirmLabel="Delete comment" isLoading={isDeleting} onClose={() => setCommentToDelete(null)} onConfirm={() => void removeComment()} /></>;
};

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  MessageCircle,
  Star,
  Bookmark,
  Share2,
  Send,
  MoreHorizontal,
  ChevronDown,
  Clock,
  Flame,
  CheckCircle2,
  ShieldAlert,
  ChefHat,
  SendHorizontal,
  Trash2,
  Pencil,
  Pin,
} from "lucide-react";
import { Post } from "./types";
import { RecipeDetailsModal } from "./RecipeDetailsModal";
import { CommunityAvatar } from "./CommunityAvatar";
import Link from "next/link";

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onSave: (postId: string) => void;
  onShare: (post: Post) => void;
  onRate: (post: Post) => void;
  onReport: (post: Post) => void;
  onDelete?: (postId: string) => void | Promise<void>;
  onEdit?: (post: Post) => void | Promise<void>;
  onTogglePin?: (postId: string, isPinned: boolean) => void | Promise<void>;
  onDirectMessage: (authorId: string, post?: Post) => void;
  onToggleFollow: (authorId: string) => void;
  onAddComment: (postId: string, content: string) => void;
  onLoadInteractions?: (
    postId: string,
    options?: { commentsTake?: number; commentsSkip?: number; reviewsTake?: number; reviewsSkip?: number },
  ) => Promise<unknown>;
  onMadeIt: (postId: string) => void;
  currentUserId?: string;
  isAuthenticated?: boolean;
  onRequireAuthentication?: (action: string) => void;
  hasActiveStory?: boolean;
  onAuthorAvatarClick?: () => void;
  onImageClick?: (post: Post) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onSave,
  onShare,
  onRate,
  onReport,
  onDelete,
  onEdit,
  onTogglePin,
  onDirectMessage,
  onToggleFollow,
    onAddComment,
    onLoadInteractions,
  onMadeIt,
  currentUserId,
  isAuthenticated = true,
  onRequireAuthentication = () => undefined,
    hasActiveStory = false,
    onAuthorAvatarClick,
    onImageClick,
}) => {
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [isCaptionExpanded, setIsCaptionExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");
  const [likedAnimation, setLikedAnimation] = useState(false);
  const [isLoadingMoreComments, setIsLoadingMoreComments] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // Close 3-dot dropdown menu when clicking anywhere outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const handleLikeClick = () => {
    if (!isAuthenticated) {
      onRequireAuthentication("react to recipes");
      return;
    }
    setLikedAnimation(true);
    setTimeout(() => setLikedAnimation(false), 600);
    onLike(post.id);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      onRequireAuthentication("comment on recipes");
      return;
    }
    if (!newCommentText.trim()) return;
    onAddComment(post.id, newCommentText.trim());
    setNewCommentText("");
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs transition-shadow duration-300 hover:shadow-lg dark:border-neutral-800 dark:bg-[#121212]"
    >
      {/* 1. Author Header Bar */}
      <div className="flex items-center justify-between gap-2 px-4 sm:px-6 pt-5 pb-3.5">
        <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
          {onAuthorAvatarClick ? (
            <button
              type="button"
              onClick={onAuthorAvatarClick}
              aria-label={`View ${post.author.name}'s story`}
              className="relative shrink-0"
            >
              <CommunityAvatar
                src={post.author.avatar}
                alt={post.author.name}
                className={`h-11 w-11 rounded-full object-cover ring-2 ${
                  hasActiveStory ? "ring-[#FF9F43]" : "ring-emerald-100 dark:ring-emerald-950"
                }`}
              />
              {post.author.role === "chef" && (
                <span className="absolute -bottom-1 -right-1 rounded-full bg-[#FF9F43] p-1 text-white ring-2 ring-white dark:ring-[#121212]">
                  <ChefHat className="h-3 w-3" />
                </span>
              )}
            </button>
          ) : (
          <Link href={`/community/users/${post.author.id}`} className="relative shrink-0">
            <CommunityAvatar
              src={post.author.avatar}
              alt={post.author.name}
              className={`h-10 w-10 rounded-full object-cover ring-2 sm:h-12 sm:w-12 ${
                hasActiveStory ? "ring-[#FF9F43]" : "ring-emerald-100 dark:ring-emerald-950"
              }`}
            />
            {post.author.role === "chef" && (
              <span
                title="Verified Chef"
                className="absolute -bottom-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-[#2F8F46] text-white ring-2 ring-white dark:ring-[#121212]"
              >
                <ChefHat className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              </span>
            )}
          </Link>
          )}
          <div className="min-w-0 truncate">
            <div className="flex items-center gap-2">
              <Link
                href={`/community/users/${post.author.id}`}
                className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white hover:text-[#2F8F46] cursor-pointer transition truncate"
              >
                {post.author.name}
              </Link>
              {post.author.badge && (
                <span className="hidden sm:inline-flex items-center rounded-full bg-[#EAF7E8] px-2.5 py-0.5 text-[10px] font-bold text-[#176B35] dark:bg-emerald-950/60 dark:text-[#B7E35F] shrink-0">
                  {post.author.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{post.createdAt}</p>
          </div>
        </div>

        {/* Header Right: Follow + Options Menu */}
        <div className="flex items-center gap-2 shrink-0">
          {post.author.id !== currentUserId && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                isAuthenticated ? onToggleFollow(post.author.id) : onRequireAuthentication("follow Community cooks")
              }
              className={`whitespace-nowrap shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                post.author.isFollowing
                  ? "border border-slate-200 text-neutral-600 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300"
                  : "bg-[#EAF7E8] text-[#176B35] hover:bg-[#D8F3DC] dark:bg-emerald-950/60 dark:text-[#B7E35F]"
              }`}
            >
              {post.author.isFollowing ? "Following" : "+ Follow"}
            </motion.button>
          )}

          <div ref={menuRef} className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowMenu(!showMenu)}
              className="rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800"
            >
              <MoreHorizontal className="h-5 w-5" />
            </motion.button>

            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 5 }}
                  className="absolute right-0 top-10 z-20 w-52 rounded-2xl border border-slate-200 bg-white py-2 shadow-xl dark:border-neutral-800 dark:bg-[#18181b] text-xs"
                >
                  {post.author.id === currentUserId ? (
                    <>
                      <button onClick={() => { void onEdit?.(post); setShowMenu(false); }} className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-neutral-700 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800"><Pencil className="h-4 w-4 text-[#2F8F46]" /> Edit post</button>
                      <button onClick={() => { onSave(post.id); setShowMenu(false); }} className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-neutral-700 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800"><Bookmark className="h-4 w-4 text-[#2F8F46]" /> {post.isSaved ? "Remove from Saved" : "Save to Collection"}</button>
                      <button onClick={() => { void onTogglePin?.(post.id, !post.isPinned); setShowMenu(false); }} className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-neutral-700 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800"><Pin className="h-4 w-4 text-[#FF9F43]" /> {post.isPinned ? "Unpin post" : "Pin post"}</button>
                      <div className="my-1.5 border-t border-slate-100 dark:border-neutral-800" />
                      <button onClick={() => { if (window.confirm("Delete this post? This cannot be undone.")) void onDelete?.(post.id); setShowMenu(false); }} className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"><Trash2 className="h-4 w-4" /> Delete post</button>
                    </>
                  ) : (
                    <>
                  <button
                    onClick={() => {
                      if (isAuthenticated) onSave(post.id);
                      else onRequireAuthentication("save recipes");
                      setShowMenu(false);
                    }}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-neutral-700 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800"
                  >
                    <Bookmark className="h-4 w-4 text-[#2F8F46]" />
                    {post.isSaved ? "Remove from Saved" : "Save to Collection"}
                  </button>
                  <button
                    onClick={() => {
                      if (isAuthenticated) onDirectMessage(post.author.id, post);
                      else onRequireAuthentication("send messages");
                      setShowMenu(false);
                    }}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-neutral-700 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800"
                  >
                    <Send className="h-4 w-4 text-[#FF9F43]" />
                    Send via Direct Message
                  </button>
                  <button
                    onClick={() => {
                      onShare(post);
                      setShowMenu(false);
                    }}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-neutral-700 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800"
                  >
                    <Share2 className="h-4 w-4 text-neutral-500" />
                    Copy Recipe Link
                  </button>
                  <div className="my-1.5 border-t border-slate-100 dark:border-neutral-800" />
                  <button
                    onClick={() => {
                      if (isAuthenticated) onReport(post);
                      else onRequireAuthentication("report content");
                      setShowMenu(false);
                    }}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-semibold"
                  >
                    <ShieldAlert className="h-4 w-4" />
                    Report Recipe Content
                  </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 2. Post Caption Narrative */}
      <div className="px-4 sm:px-6 pb-4">
        <div>
          <p
            className={`text-sm sm:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed whitespace-pre-line ${
              !isCaptionExpanded ? "line-clamp-2" : ""
            }`}
          >
            {post.caption}
          </p>
          {post.caption.length > 120 && (
            <button
              onClick={() => setIsCaptionExpanded(!isCaptionExpanded)}
              className="mt-1 text-xs sm:text-sm font-bold text-[#2F8F46] hover:underline dark:text-[#B7E35F] cursor-pointer"
            >
              {isCaptionExpanded ? "Show less" : "...more"}
            </button>
          )}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="rounded-lg bg-[#EAF7E8] px-2.5 py-1 text-xs font-semibold text-[#176B35] hover:bg-[#D8F3DC] cursor-pointer transition dark:bg-emerald-950/50 dark:text-[#B7E35F]"
              >
                {tag}
              </span>
            ))}
            {post.isChallengeEntry && (
              <span className="rounded-lg bg-[#FFF0DD] px-2.5 py-1 text-xs font-bold text-[#FF9F43] flex items-center gap-1.5 dark:bg-amber-950/40">
                <Flame className="h-3.5 w-3.5" /> Challenge: {post.challengeName}
              </span>
            )}
          </div>
        )}
      </div>

      {/* 3. Food Photo with Overlay Metadata Badge */}
      <div className="relative aspect-4/3 sm:aspect-16/10 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        {onImageClick ? (
          <button type="button" onClick={() => onImageClick(post)} className="absolute inset-0 h-full w-full cursor-zoom-in text-left" aria-label="Open full-size food image">
            <img src={post.imageUrl} alt={post.recipe?.title || "Community Food"} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
          </button>
        ) : (
          <img src={post.imageUrl} alt={post.recipe?.title || "Community Food"} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
        )}

        {/* Metadata Chips on Image */}
        {post.recipe && (
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                <Clock className="h-3.5 w-3.5 text-[#B7E35F]" />
                {post.recipe.prepTimeMinutes + post.recipe.cookTimeMinutes} mins
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                <Flame className="h-3.5 w-3.5 text-[#FF9F43]" />
                {post.recipe.nutrition.calories} kcal
              </span>
              <span className="hidden sm:inline-flex items-center rounded-full bg-[#2F8F46]/90 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                {post.recipe.difficulty}
              </span>
            </div>

            {/* Overall Rating Pill */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (isAuthenticated ? onRate(post) : onRequireAuthentication("rate and review recipes"))}
              className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-extrabold text-neutral-900 shadow-md backdrop-blur-md cursor-pointer hover:bg-amber-50 dark:bg-[#18181b]/95 dark:text-white"
            >
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span>{post.rating.overall}</span>
              <span className="text-[11px] font-normal text-neutral-500">({post.rating.totalReviews})</span>
            </motion.div>
          </div>
        )}
      </div>

      {/* 4. Recipe Accordion / Drawer Toggle */}
      {post.recipe && (
        <div className="border-t border-slate-100 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900/30">
          <button
            onClick={() => setIsRecipeModalOpen(true)}
            className="flex w-full items-center justify-between gap-3 px-4 sm:px-6 py-4 text-left transition hover:bg-neutral-100/60 dark:hover:bg-neutral-900"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#2F8F46] text-white">
                <ChefHat className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white truncate">
                  {post.recipe.title}
                </h4>
                <p className="text-xs text-neutral-500 truncate">
                  {post.recipe.ingredients.length} ingredients • {post.recipe.steps.length} cooking steps
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs sm:text-sm font-bold text-[#2F8F46] dark:text-[#B7E35F] shrink-0 whitespace-nowrap">
              <span>View Recipe</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </button>
        </div>
      )}

      {/* 5. Engagement & Social Actions Bar */}
      <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 dark:border-neutral-800">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Like Heart Button with bouncy animation */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={handleLikeClick}
            className={`flex items-center gap-2 text-xs sm:text-sm font-bold transition ${
              post.isLiked ? "text-rose-500" : "text-neutral-600 hover:text-rose-500 dark:text-neutral-300"
            }`}
          >
            <motion.div animate={likedAnimation ? { scale: [1, 1.4, 1] } : {}}>
              <Heart className={`h-5 w-5 ${post.isLiked ? "fill-rose-500 text-rose-500" : ""}`} />
            </motion.div>
            <span>{post.likesCount}</span>
          </motion.button>

          {/* Comments Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              const shouldShowComments = !showComments;
              setShowComments(shouldShowComments);
              if (shouldShowComments && post.commentsCount > 0 && post.comments.length === 0) {
                void onLoadInteractions?.(post.id, { commentsTake: 8, commentsSkip: 0, reviewsTake: 0 });
              }
            }}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-600 hover:text-[#2F8F46] transition dark:text-neutral-300 dark:hover:text-[#B7E35F]"
          >
            <MessageCircle className="h-5 w-5" />
            <span>{post.comments.length || post.commentsCount}</span>
          </motion.button>

          {/* Rate Trigger - Star Icon Only */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.85 }}
            onClick={() => (isAuthenticated ? onRate(post) : onRequireAuthentication("rate and review recipes"))}
            title="Rate & Review Recipe"
            className="flex items-center text-neutral-600 hover:text-amber-500 transition dark:text-neutral-300"
          >
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
          </motion.button>
        </div>

        {/* Right Actions: Save & Share & DM */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() =>
              isAuthenticated ? onDirectMessage(post.author.id, post) : onRequireAuthentication("send messages")
            }
            title="Send to a Friend"
            className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100 hover:text-[#FF9F43] dark:text-neutral-400 dark:hover:bg-neutral-800"
          >
            <Send className="h-4 w-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => (isAuthenticated ? onSave(post.id) : onRequireAuthentication("save recipes"))}
            title="Save to Collection"
            className={`rounded-full p-2 transition ${
              post.isSaved
                ? "text-[#2F8F46]"
                : "text-neutral-500 hover:bg-neutral-100 hover:text-[#2F8F46] dark:text-neutral-400 dark:hover:bg-neutral-800"
            }`}
          >
            <Bookmark className={`h-4 w-4 ${post.isSaved ? "fill-[#2F8F46]" : ""}`} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onShare(post)}
            title="Share Recipe"
            className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800"
          >
            <Share2 className="h-4 w-4" />
          </motion.button>
        </div>
      </div>

      {/* 6. Inline Interactive Comments Section with Animation */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-slate-100 bg-neutral-50/50 px-6 py-5 dark:border-neutral-800 dark:bg-neutral-900/40"
          >
            <h5 className="font-bold text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
              Community Comments ({post.comments.length} of {post.commentsCount})
            </h5>

            {/* New Comment Input */}
            {isAuthenticated ? (
              <form onSubmit={handleCommentSubmit} className="flex items-center gap-2.5 mb-5">
                <input
                  type="text"
                  placeholder="Add cooking tips, substitutions, or feedback..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:border-[#2F8F46] focus:outline-hidden focus:ring-2 focus:ring-[#2F8F46]/15 dark:border-neutral-700 dark:bg-[#18181b] dark:text-white"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!newCommentText.trim()}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2F8F46] text-white transition hover:bg-[#176B35] disabled:opacity-40"
                >
                  <SendHorizontal className="h-4 w-4" />
                </motion.button>
              </form>
            ) : (
              <button
                onClick={() => onRequireAuthentication("comment on recipes")}
                className="mb-5 w-full rounded-xl border border-dashed border-emerald-300 bg-white px-4 py-3 text-left text-xs font-semibold text-[#176B35] transition hover:bg-[#EAF7E8] dark:border-emerald-900 dark:bg-[#18181b] dark:text-[#B7E35F]"
              >
                Log in to add your cooking tip or feedback
              </button>
            )}

            {/* Comments List */}
            <div className="space-y-3">
              {post.comments.length === 0 ? (
                <p className="text-center text-xs text-neutral-400 py-3">
                  No comments yet. Be the first cook to share feedback!
                </p>
              ) : (
                post.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-3 text-xs sm:text-sm">
                    <Link
                      href={`/community/users/${comment.userId}`}
                      aria-label={`View ${comment.userName}'s profile`}
                      className="shrink-0 rounded-full transition hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#2F8F46]"
                    >
                      <CommunityAvatar
                        src={comment.userAvatar}
                        alt={comment.userName}
                        className="h-8 w-8 rounded-full object-cover ring-1 ring-slate-200 dark:ring-neutral-700"
                      />
                    </Link>
                    <div className="flex-1 rounded-2xl bg-white p-3.5 shadow-xs border border-slate-200 dark:border-neutral-800 dark:bg-[#18181b]">
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/community/users/${comment.userId}`}
                          className="font-bold text-neutral-900 transition hover:text-[#2F8F46] dark:text-white dark:hover:text-[#B7E35F]"
                        >
                          {comment.userName}
                        </Link>
                        <span className="text-[11px] text-neutral-400">{comment.createdAt}</span>
                      </div>
                      <p className="mt-1 text-neutral-700 dark:text-neutral-300 leading-relaxed">{comment.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {post.comments.length < post.commentsCount && (
              <button
                type="button"
                disabled={isLoadingMoreComments}
                onClick={() => {
                  if (!onLoadInteractions) return;
                  setIsLoadingMoreComments(true);
                  void onLoadInteractions(post.id, {
                    commentsTake: 8,
                    commentsSkip: post.comments.length,
                    reviewsTake: 0,
                  }).finally(() => setIsLoadingMoreComments(false));
                }}
                className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-[#176B35] transition hover:bg-[#EAF7E8] disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-700 dark:text-[#B7E35F] dark:hover:bg-emerald-950/40"
              >
                {isLoadingMoreComments ? "Loading comments..." : "Load more comments"}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <RecipeDetailsModal post={post} isOpen={isRecipeModalOpen} onClose={() => setIsRecipeModalOpen(false)} />
    </motion.article>
  );
};

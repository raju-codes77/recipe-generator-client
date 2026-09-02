import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  Star,
  Check,
} from 'lucide-react';
import { Post, Review } from './types';
import { CURRENT_USER } from './mockData';

interface RecipeReviewModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (postId: string, review: Review) => void;
  onLoadMoreReviews?: () => void;
  hasMoreReviews?: boolean;
  isLoadingMoreReviews?: boolean;
}

export const RecipeReviewModal: React.FC<RecipeReviewModalProps> = ({
  post,
  isOpen,
  onClose,
  onSubmitReview,
  onLoadMoreReviews,
  hasMoreReviews = false,
  isLoadingMoreReviews = false,
}) => {
  const [overallRating, setOverallRating] = useState(5);
  const [flavorRating, setFlavorRating] = useState(5);
  const [easeRating, setEaseRating] = useState(5);
  const [presentationRating, setPresentationRating] = useState(5);
  const [commentText, setCommentText] = useState('');
  const [cookingTips, setCookingTips] = useState('');
  const [hoverStar, setHoverStar] = useState<number | null>(null);

  if (!isOpen || !post) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newReview: Review = {
      id: `rev_${Date.now()}`,
      userId: CURRENT_USER.id,
      userName: CURRENT_USER.name,
      userAvatar: CURRENT_USER.avatar,
      userBadge: 'Community Cook',
      rating: overallRating,
      flavorRating,
      easeRating,
      presentationRating,
      comment: commentText.trim(),
      cookingTips: cookingTips.trim() || undefined,
      createdAt: 'Just now',
      likesCount: 0,
      isLiked: false,
    };

    onSubmitReview(post.id, newReview);
    setCommentText('');
    setCookingTips('');
    onClose();
  };

  const renderInteractiveStars = (
    value: number,
    onChange: (val: number) => void,
    sizeClass = 'h-6 w-6'
  ) => {
    return (
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHoverStar(star)}
            onMouseLeave={() => setHoverStar(null)}
            className="p-0.5 text-neutral-300 transition"
          >
            <Star
              className={`${sizeClass} ${
                star <= (hoverStar !== null ? hoverStar : value)
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-neutral-300 dark:text-neutral-700'
              }`}
            />
          </motion.button>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative my-8 w-full max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-[#121212] max-h-[90vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <img
              src={post.imageUrl}
              alt={post.recipe?.title}
              className="h-12 w-12 rounded-xl object-cover ring-1 ring-emerald-200"
            />
            <div>
              <h3 className="font-extrabold text-base text-neutral-900 dark:text-white">
                Rate & Review Recipe
              </h3>
              <p className="text-xs text-neutral-500 truncate max-w-sm">
                {post.recipe?.title || post.caption.slice(0, 40)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Rating Summary Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-[#EAF7E8]/70 p-4.5 border border-emerald-100 dark:bg-neutral-900 dark:border-neutral-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#176B35] dark:text-[#B7E35F]">
                Community Score
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-black text-neutral-900 dark:text-white">
                  {post.rating.overall}
                </span>
                <div className="flex items-center text-amber-400">
                  <Star className="h-4 w-4 fill-amber-400" />
                  <span className="ml-1 text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                    from {post.rating.totalReviews} cooks
                  </span>
                </div>
              </div>
            </div>

            {/* Criteria Breakdown mini chips */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-xl bg-white p-2.5 border border-slate-200 dark:bg-[#18181b] dark:border-neutral-700">
                <span className="block font-black text-[#2F8F46] dark:text-[#B7E35F]">
                  {post.rating.flavor} ★
                </span>
                <span className="text-[10px] text-neutral-500">Flavor</span>
              </div>
              <div className="rounded-xl bg-white p-2.5 border border-slate-200 dark:bg-[#18181b] dark:border-neutral-700">
                <span className="block font-black text-[#FF9F43]">
                  {post.rating.ease} ★
                </span>
                <span className="text-[10px] text-neutral-500">Ease</span>
              </div>
              <div className="rounded-xl bg-white p-2.5 border border-slate-200 dark:bg-[#18181b] dark:border-neutral-700">
                <span className="block font-black text-emerald-700 dark:text-emerald-300">
                  {post.rating.presentation} ★
                </span>
                <span className="text-[10px] text-neutral-500">Visual</span>
              </div>
            </div>
          </div>

          {/* Form to submit review */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              Your Cooking Rating & Feedback
            </h4>

            {/* Star Selector Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl bg-neutral-50 p-4.5 border border-slate-200 dark:border-neutral-800 dark:bg-neutral-900/60">
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Overall Experience *
                </label>
                {renderInteractiveStars(overallRating, setOverallRating, 'h-6 w-6')}
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Flavor & Taste Profile
                </label>
                {renderInteractiveStars(flavorRating, setFlavorRating, 'h-5 w-5')}
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Ease of Recipe Steps
                </label>
                {renderInteractiveStars(easeRating, setEaseRating, 'h-5 w-5')}
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Visual Presentation
                </label>
                {renderInteractiveStars(presentationRating, setPresentationRating, 'h-5 w-5')}
              </div>
            </div>

            {/* Review Comment */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Your Review & Outcome *
              </label>
              <textarea
                required
                rows={3}
                placeholder="How did the dish turn out? Was the seasoning balanced? Did you or your family enjoy it?"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:border-[#2F8F46] focus:ring-2 focus:ring-[#2F8F46]/15 dark:border-neutral-700 dark:bg-[#18181b] dark:text-white"
              />
            </div>

            {/* Helpful Cooking Tips / Substitutions */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Cooking Tips & Substitutions (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Subbed dairy milk for oat milk, added crushed red chili..."
                value={cookingTips}
                onChange={(e) => setCookingTips(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-neutral-900 focus:border-[#2F8F46] dark:border-neutral-700 dark:bg-[#18181b] dark:text-white"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
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
                disabled={!commentText.trim()}
                className="flex items-center gap-1.5 rounded-xl bg-[#2F8F46] px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-800/15 transition hover:bg-[#176B35] disabled:opacity-40"
              >
                <Check className="h-4 w-4" />
                <span>Submit Review</span>
              </motion.button>
            </div>
          </form>

          {/* Existing Community Reviews Section */}
          <div className="border-t border-slate-100 pt-5 dark:border-neutral-800">
            <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-500 mb-3">
              Community Reviews ({post.reviews.length} of {post.rating.totalReviews})
            </h4>

            {post.reviews.length === 0 ? (
              <p className="text-xs text-neutral-400 py-3 text-center">
                No detailed reviews yet. Be the first to share your cooking thoughts!
              </p>
            ) : (
              <div className="space-y-3">
                {post.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-neutral-800 dark:bg-[#18181b]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={rev.userAvatar}
                          alt={rev.userName}
                          className="h-8 w-8 rounded-full object-cover ring-1 ring-slate-200"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-neutral-900 dark:text-white">
                              {rev.userName}
                            </span>
                            {rev.userBadge && (
                              <span className="rounded-full bg-[#EAF7E8] px-2 py-0.5 text-[9px] font-bold text-[#176B35] dark:bg-emerald-950 dark:text-[#B7E35F]">
                                {rev.userBadge}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-neutral-400">{rev.createdAt}</span>
                        </div>
                      </div>

                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < rev.rating ? 'fill-amber-400' : 'text-neutral-300 dark:text-neutral-700'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="mt-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {rev.comment}
                    </p>

                    {rev.cookingTips && (
                      <p className="mt-2 rounded-xl bg-[#FFF0DD] p-2.5 text-xs font-medium text-amber-950 dark:bg-amber-950/40 dark:text-amber-200">
                        💡 <span className="font-bold">Tip / Alteration:</span> {rev.cookingTips}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {hasMoreReviews && (
              <button
                type="button"
                onClick={onLoadMoreReviews}
                disabled={isLoadingMoreReviews}
                className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-[#176B35] transition hover:bg-[#EAF7E8] disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-700 dark:text-[#B7E35F] dark:hover:bg-emerald-950/40"
              >
                {isLoadingMoreReviews ? "Loading reviews..." : "Load more reviews"}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

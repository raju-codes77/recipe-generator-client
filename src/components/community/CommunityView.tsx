'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  PlusCircle,
  RefreshCw,
  Check,
  Utensils,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import {
  Post,
  Review,
  StoryItem,
  RecipeCollection,
  NotificationItem,
  Author,
} from './types';
import {
  INITIAL_COMMUNITY_POSTS,
  INITIAL_STORIES,
  INITIAL_COLLECTIONS,
  TOP_CHEFS_TO_FOLLOW,
  INITIAL_NOTIFICATIONS,
  CURRENT_USER,
} from './mockData';
import { fetchRandomMealDbRecipe } from './mealDbService';

import { CommunityHeader } from './CommunityHeader';
import { StoriesBar } from './StoriesBar';
import { CommunitySidebarLeft } from './CommunitySidebarLeft';
import { CommunitySidebarRight } from './CommunitySidebarRight';
import { PostCard } from './PostCard';
import { CreatePostModal } from './CreatePostModal';
import { RecipeReviewModal } from './RecipeReviewModal';
import { ReportPostModal } from './ReportPostModal';
import { SendDirectMessageModal } from './SendDirectMessageModal';
import { SaveToCollectionModal } from './SaveToCollectionModal';
import { StoryViewerModal } from './StoryViewerModal';
import { TeamIntegrationModal } from './TeamIntegrationModal';

const POSTS_PER_PAGE = 4;

export const CommunityView: React.FC = () => {
  // Theme state
  const [darkMode, setDarkMode] = useState(false);

  // Community data state
  const [posts, setPosts] = useState<Post[]>(INITIAL_COMMUNITY_POSTS);
  const [stories, setStories] = useState<StoryItem[]>(INITIAL_STORIES);
  const [collections, setCollections] = useState<RecipeCollection[]>(INITIAL_COLLECTIONS);
  const [chefs, setChefs] = useState<Author[]>(TOP_CHEFS_TO_FOLLOW);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Navigation & Filtering
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoadingApi, setIsLoadingApi] = useState<boolean>(false);

  // Modals state
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [createPostInitialAI, setCreatePostInitialAI] = useState(false);
  const [reviewModalPost, setReviewModalPost] = useState<Post | null>(null);
  const [reportModalPost, setReportModalPost] = useState<Post | null>(null);
  const [saveModalPost, setSaveModalPost] = useState<Post | null>(null);
  const [dmModalOpen, setDmModalOpen] = useState(false);
  const [dmRecipientId, setDmRecipientId] = useState<string | undefined>(undefined);
  const [dmAttachedPost, setDmAttachedPost] = useState<Post | null>(null);
  const [viewingStory, setViewingStory] = useState<StoryItem | null>(null);
  const [teamGuideOpen, setTeamGuideOpen] = useState(false);

  // Toast alert
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Dark mode HTML class sync
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle Likes
  const handleToggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likesCount: isLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1),
          };
        }
        return p;
      })
    );
  };

  // Handle Save / Bookmark
  const handleToggleSave = (postId: string) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;
    setSaveModalPost(post);
  };

  const handleSaveToCollection = (collectionId: string, postId: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, isSaved: true, savesCount: p.savesCount + 1 } : p))
    );
    setCollections((prev) =>
      prev.map((col) =>
        col.id === collectionId ? { ...col, recipeCount: col.recipeCount + 1 } : col
      )
    );
    showToast('Saved recipe to your collection!');
  };

  const handleCreateCollection = (name: string, description: string) => {
    const newCol: RecipeCollection = {
      id: `col_${Date.now()}`,
      name,
      description,
      coverImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format&fit=crop&q=80',
      recipeCount: 1,
    };
    setCollections([...collections, newCol]);
    showToast(`Created collection "${name}"`);
  };

  // Handle Comments
  const handleAddComment = (postId: string, content: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const newComment = {
            id: `c_${Date.now()}`,
            userId: CURRENT_USER.id,
            userName: CURRENT_USER.name,
            userAvatar: CURRENT_USER.avatar,
            content,
            createdAt: 'Just now',
            likesCount: 0,
            isLiked: false,
          };
          return {
            ...p,
            comments: [newComment, ...p.comments],
            commentsCount: p.commentsCount + 1,
          };
        }
        return p;
      })
    );
    showToast('Comment posted!');
  };

  // Handle Reviews & Ratings
  const handleSubmitReview = (postId: string, review: Review) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const totalReviews = p.rating.totalReviews + 1;
          const newOverall = Number(
            ((p.rating.overall * p.rating.totalReviews + review.rating) / totalReviews).toFixed(1)
          );
          return {
            ...p,
            reviews: [review, ...p.reviews],
            rating: {
              ...p.rating,
              overall: newOverall,
              totalReviews,
            },
          };
        }
        return p;
      })
    );
    showToast('Recipe review submitted! Thank you for rating.');
  };

  // Handle "I Made This!"
  const handleMadeIt = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const hasMadeIt = !p.hasMadeIt;
          return {
            ...p,
            hasMadeIt,
            madeItCount: hasMadeIt ? p.madeItCount + 1 : Math.max(0, p.madeItCount - 1),
          };
        }
        return p;
      })
    );
    showToast('Marked as cooked! Added to your cooking history.');
  };

  // Handle Follow / Unfollow
  const handleToggleFollow = (authorId: string) => {
    setChefs((prev) =>
      prev.map((chef) =>
        chef.id === authorId ? { ...chef, isFollowing: !chef.isFollowing } : chef
      )
    );
    setPosts((prev) =>
      prev.map((p) =>
        p.author.id === authorId
          ? {
              ...p,
              author: {
                ...p.author,
                isFollowing: !p.author.isFollowing,
                followersCount: p.author.isFollowing
                  ? p.author.followersCount - 1
                  : p.author.followersCount + 1,
              },
            }
          : p
      )
    );
    showToast('Updated chef following status');
  };

  // Handle Share (link copy)
  const handleShare = (post: Post) => {
    navigator.clipboard.writeText(
      `https://foodcanvas.app/community/recipe/${post.id}`
    );
    showToast('Recipe link copied to clipboard! Ready to share.');
  };

  // Handle Direct Message open
  const handleOpenDM = (authorId?: string, post?: Post) => {
    setDmRecipientId(authorId);
    setDmAttachedPost(post || null);
    setDmModalOpen(true);
  };

  // Fetch Random TheMealDB Spark Recipe
  const handleFetchRandomMealDb = async () => {
    setIsLoadingApi(true);
    try {
      const randomPost = await fetchRandomMealDbRecipe();
      if (randomPost) {
        setPosts((prev) => [randomPost, ...prev]);
        showToast(`Imported "${randomPost.recipe?.title}" from TheMealDB API!`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingApi(false);
    }
  };

  // Filter & Search Logic
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = post.recipe?.title.toLowerCase().includes(q);
        const matchesCaption = post.caption.toLowerCase().includes(q);
        const matchesAuthor = post.author.name.toLowerCase().includes(q);
        const matchesTag = post.tags.some((t) => t.toLowerCase().includes(q));
        const matchesIngredient = post.recipe?.ingredients.some((i) =>
          i.name.toLowerCase().includes(q)
        );
        if (!matchesTitle && !matchesCaption && !matchesAuthor && !matchesTag && !matchesIngredient) {
          return false;
        }
      }

      // Category / Tab filter
      switch (activeFilter) {
        case 'trending':
          return post.rating.overall >= 4.8 || post.likesCount > 300;
        case 'following':
          return post.author.isFollowing;
        case 'quick':
          return (
            post.recipe &&
            post.recipe.prepTimeMinutes + post.recipe.cookTimeMinutes <= 25
          );
        case 'wellness':
          return (
            post.recipe &&
            (post.recipe.dietaryTags.includes('High Protein') ||
              post.recipe.dietaryTags.includes('Gluten-Free') ||
              post.recipe.dietaryTags.includes('Vegan') ||
              post.recipe.nutrition.protein >= 25)
          );
        case 'challenge':
          return post.isChallengeEntry;
        case 'ai_sparks':
          return post.recipe?.sourceType === 'ai_generated' || post.recipe?.sourceType === 'mealdb';
        case 'saved':
          return post.isSaved;
        case 'liked':
          return post.isLiked;
        default:
          return true;
      }
    });
  }, [posts, activeFilter, searchQuery]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE) || 1;
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const savedPostsCount = posts.filter((p) => p.isSaved).length;
  const likedPostsCount = posts.filter((p) => p.isLiked).length;

  return (
    <div className="min-h-screen bg-[#FCFDF9] text-neutral-900 transition-colors duration-200 dark:bg-[#0a0a0a] dark:text-neutral-100 font-sans">
      {/* Toast Alert Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl bg-[#176B35] px-5 py-3.5 text-xs font-bold text-white shadow-2xl"
          >
            <Check className="h-4 w-4 text-[#B7E35F]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <CommunityHeader
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenCreatePost={() => {
          setCreatePostInitialAI(false);
          setCreatePostOpen(true);
        }}
        onOpenTeamGuide={() => setTeamGuideOpen(true)}
        onOpenMessages={() => handleOpenDM()}
        notifications={notifications}
        onSearch={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      {/* Main Container Layout: 3 Columns */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Column 1: Left Navigation & Profile */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <CommunitySidebarLeft
                activeFilter={activeFilter}
                setActiveFilter={(f) => {
                  setActiveFilter(f);
                  setCurrentPage(1);
                }}
                collections={collections}
                onOpenTeamGuide={() => setTeamGuideOpen(true)}
                savedPostsCount={savedPostsCount}
                likedPostsCount={likedPostsCount}
              />
            </div>
          </div>

          {/* Column 2: Main Social Cooking Feed */}
          <div className="lg:col-span-6 space-y-7">
            {/* Cooking Stories Carousel */}
            <StoriesBar
              stories={stories}
              onSelectStory={(s) => setViewingStory(s)}
              onAddStory={() => {
                setCreatePostInitialAI(false);
                setCreatePostOpen(true);
              }}
            />

            {/* Quick Share / Post Creator Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-[#121212]"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={CURRENT_USER.avatar}
                  alt={CURRENT_USER.name}
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-[#2F8F46]"
                />
                <button
                  onClick={() => {
                    setCreatePostInitialAI(false);
                    setCreatePostOpen(true);
                  }}
                  className="flex-1 rounded-2xl border border-slate-200 bg-neutral-50 px-5 py-3 text-left text-xs sm:text-sm text-neutral-400 hover:border-[#2F8F46] hover:bg-[#EAF7E8]/40 transition dark:border-neutral-700 dark:bg-neutral-900/70 dark:text-neutral-400"
                >
                  Share your recipe, culinary photo, or technique...
                </button>
              </div>

              {/* Action shortcuts */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3.5 text-xs dark:border-neutral-800">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setCreatePostInitialAI(false);
                    setCreatePostOpen(true);
                  }}
                  className="flex items-center gap-2 font-bold text-neutral-600 hover:text-[#2F8F46] transition dark:text-neutral-300 dark:hover:text-[#B7E35F]"
                >
                  <PlusCircle className="h-4 w-4 text-[#2F8F46]" />
                  <span>Post Recipe</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setCreatePostInitialAI(true);
                    setCreatePostOpen(true);
                  }}
                  className="flex items-center gap-2 font-bold text-neutral-600 hover:text-[#FF9F43] transition dark:text-neutral-300"
                >
                  <Sparkles className="h-4 w-4 text-[#FF9F43]" />
                  <span>TheMealDB & AI Import</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleFetchRandomMealDb}
                  disabled={isLoadingApi}
                  className="flex items-center gap-2 font-bold text-[#176B35] hover:underline transition dark:text-[#B7E35F]"
                >
                  <RefreshCw className={`h-4 w-4 ${isLoadingApi ? 'animate-spin' : ''}`} />
                  <span>Random Spark</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Filter Status & Active Tabs */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2.5">
                <h2 className="font-extrabold text-sm uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                  {activeFilter === 'all'
                    ? 'Community Cooking Feed'
                    : activeFilter === 'trending'
                    ? '🌟 Trending Recipes'
                    : activeFilter === 'following'
                    ? '👥 Recipes by Chefs You Follow'
                    : activeFilter === 'challenge'
                    ? '🏆 Challenge Submissions'
                    : activeFilter === 'saved'
                    ? '🔖 My Saved Recipes'
                    : activeFilter === 'liked'
                    ? '❤️ Liked Recipes'
                    : `${activeFilter.toUpperCase()} Recipes`}
                </h2>
                <span className="rounded-full bg-[#EAF7E8] px-2.5 py-0.5 text-xs font-bold text-[#176B35] dark:bg-emerald-950/60 dark:text-[#B7E35F]">
                  {filteredPosts.length}
                </span>
              </div>

              {activeFilter !== 'all' && (
                <button
                  onClick={() => setActiveFilter('all')}
                  className="text-xs font-bold text-[#2F8F46] hover:underline dark:text-[#B7E35F]"
                >
                  Reset Filter
                </button>
              )}
            </div>

            {/* Posts Stream */}
            {paginatedPosts.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-emerald-200 p-12 text-center bg-white dark:border-neutral-800 dark:bg-[#121212]">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF7E8] text-[#2F8F46] dark:bg-emerald-950 dark:text-[#B7E35F] mb-4">
                  <Utensils className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                  No recipes found in this filter
                </h3>
                <p className="text-xs text-neutral-500 mt-1.5 max-w-sm mx-auto">
                  Try clearing your search or publish the very first recipe in this category!
                </p>
                <div className="mt-5 flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setActiveFilter('all');
                      setSearchQuery('');
                    }}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300"
                  >
                    View All Feeds
                  </button>
                  <button
                    onClick={() => {
                      setCreatePostInitialAI(false);
                      setCreatePostOpen(true);
                    }}
                    className="rounded-xl bg-[#2F8F46] px-5 py-2 text-xs font-bold text-white transition hover:bg-[#176B35]"
                  >
                    + Share a Recipe
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-7">
                {paginatedPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onLike={handleToggleLike}
                    onSave={handleToggleSave}
                    onShare={handleShare}
                    onRate={(p) => setReviewModalPost(p)}
                    onReport={(p) => setReportModalPost(p)}
                    onDirectMessage={(authorId, p) => handleOpenDM(authorId, p)}
                    onToggleFollow={handleToggleFollow}
                    onAddComment={handleAddComment}
                    onMadeIt={handleMadeIt}
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-[#121212]">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 dark:border-neutral-700 dark:text-neutral-300"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    const isActive = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`h-8 w-8 rounded-xl text-xs font-bold transition ${
                          isActive
                            ? 'bg-[#2F8F46] text-white shadow-xs'
                            : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 dark:border-neutral-700 dark:text-neutral-300"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Column 3: Right Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <CommunitySidebarRight
                chefs={chefs}
                onToggleFollow={handleToggleFollow}
                trendingPosts={posts}
                onSelectRecipe={(p) => setReviewModalPost(p)}
                onOpenCreatePostWithAI={() => {
                  setCreatePostInitialAI(true);
                  setCreatePostOpen(true);
                }}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <CreatePostModal
        isOpen={createPostOpen}
        onClose={() => setCreatePostOpen(false)}
        initialUseAI={createPostInitialAI}
        onPublishPost={(newPost) => {
          setPosts([newPost, ...posts]);
          showToast('Recipe published to FoodCanvas Community!');
        }}
      />

      <RecipeReviewModal
        post={reviewModalPost}
        isOpen={!!reviewModalPost}
        onClose={() => setReviewModalPost(null)}
        onSubmitReview={handleSubmitReview}
      />

      <ReportPostModal
        post={reportModalPost}
        isOpen={!!reportModalPost}
        onClose={() => setReportModalPost(null)}
      />

      <SaveToCollectionModal
        post={saveModalPost}
        isOpen={!!saveModalPost}
        onClose={() => setSaveModalPost(null)}
        collections={collections}
        onSaveToCollection={handleSaveToCollection}
        onCreateCollection={handleCreateCollection}
      />

      <SendDirectMessageModal
        isOpen={dmModalOpen}
        onClose={() => {
          setDmModalOpen(false);
          setDmRecipientId(undefined);
          setDmAttachedPost(null);
        }}
        initialRecipientId={dmRecipientId}
        attachedPost={dmAttachedPost}
      />

      <StoryViewerModal
        story={viewingStory}
        isOpen={!!viewingStory}
        onClose={() => setViewingStory(null)}
      />

      <TeamIntegrationModal
        isOpen={teamGuideOpen}
        onClose={() => setTeamGuideOpen(false)}
      />
    </div>
  );
};

export default CommunityView;

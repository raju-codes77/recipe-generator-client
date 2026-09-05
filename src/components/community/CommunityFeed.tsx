"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PlusCircle, RefreshCw, Check, Utensils, Sparkles, Search, X } from "lucide-react";
import { Post, Review, StoryItem, RecipeCollection, NotificationItem, Author } from "./types";
import { fetchRandomMealDbRecipe } from "./mealDbService";

import { StoriesBar } from "./StoriesBar";
import { CommunitySidebarLeft } from "./CommunitySidebarLeft";
import { CommunitySidebarRight } from "./CommunitySidebarRight";
import { PostCard } from "./PostCard";
import { CreatePostModal } from "./CreatePostModal";
import { RecipeReviewModal } from "./RecipeReviewModal";
import { ReportPostModal } from "./ReportPostModal";
import { SendDirectMessageModal } from "./SendDirectMessageModal";
import { SaveToCollectionModal } from "./SaveToCollectionModal";
import { StoryViewerModal } from "./StoryViewerModal";
import { StoryEditorModal } from "./StoryEditorModal";
import { CommunityAvatar } from "./CommunityAvatar";
import { communityApi } from "@/app/api/community/community-api";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const POSTS_PER_PAGE = 4;
const API_POSTS_PER_PAGE = 12;

interface CommunityCache {
  posts: Post[];
  stories: StoryItem[];
  hasMorePosts: boolean;
}

let communityCache: CommunityCache | null = null;

const getCommunityChefs = (communityPosts: Post[], viewerId?: string) => {
  const uniqueChefs = Array.from(new Map(communityPosts.map((post) => [post.author.id, post.author])).values());
  return uniqueChefs.filter((chef) => chef.id !== viewerId).slice(0, 8);
};

export const CommunityFeed: React.FC = () => {
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const isAuthenticated = Boolean(session?.user);

  // Community data state
  const [posts, setPosts] = useState<Post[]>(() => communityCache?.posts ?? []);
  const [stories, setStories] = useState<StoryItem[]>(() => communityCache?.stories ?? []);
  const [collections, setCollections] = useState<RecipeCollection[]>([]);
  const [chefs, setChefs] = useState<Author[]>(() => getCommunityChefs(communityCache?.posts ?? []));
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(() => !communityCache);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [hasMoreServerPosts, setHasMoreServerPosts] = useState(() => communityCache?.hasMorePosts ?? true);
  const [isLoadingMorePosts, setIsLoadingMorePosts] = useState(false);

  // Navigation & Filtering
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visiblePostCount, setVisiblePostCount] = useState<number>(POSTS_PER_PAGE);
  const [isLoadingApi, setIsLoadingApi] = useState<boolean>(false);
  const feedEndRef = useRef<HTMLDivElement>(null);

  // Modals state
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [createPostInitialAI, setCreatePostInitialAI] = useState(false);
  const [reviewModalPost, setReviewModalPost] = useState<Post | null>(null);
  const [isLoadingMoreReviews, setIsLoadingMoreReviews] = useState(false);
  const [reportModalPost, setReportModalPost] = useState<Post | null>(null);
  const [saveModalPost, setSaveModalPost] = useState<Post | null>(null);
  const [dmModalOpen, setDmModalOpen] = useState(false);
  const [dmRecipientId, setDmRecipientId] = useState<string | undefined>(undefined);
  const [dmAttachedPost, setDmAttachedPost] = useState<Post | null>(null);
  const [viewingStory, setViewingStory] = useState<StoryItem | null>(null);
  const [storyEditorFile, setStoryEditorFile] = useState<File | null>(null);

  const storyGroups = useMemo(() => {
    const groups = new Map<string, StoryItem[]>();

    stories.forEach((story) => {
      const authorStories = groups.get(story.author.id) ?? [];
      authorStories.push(story);
      groups.set(story.author.id, authorStories);
    });

    return Array.from(groups.values()).map((group) => [...group].reverse());
  }, [stories]);

  const handleNextStory = useCallback(() => {
    if (!viewingStory) return;

    const currentGroupIndex = storyGroups.findIndex((group) => group.some((story) => story.id === viewingStory.id));
    if (currentGroupIndex < 0) {
      setViewingStory(null);
      return;
    }

    const currentGroup = storyGroups[currentGroupIndex];
    const currentStoryIndex = currentGroup.findIndex((story) => story.id === viewingStory.id);

    if (currentStoryIndex < currentGroup.length - 1) {
      setViewingStory(currentGroup[currentStoryIndex + 1]);
      return;
    }

    const nextGroup = storyGroups[currentGroupIndex + 1];
    setViewingStory(nextGroup?.[0] ?? null);
  }, [storyGroups, viewingStory]);

  const handlePreviousStory = useCallback(() => {
    if (!viewingStory) return;

    const currentGroupIndex = storyGroups.findIndex((group) => group.some((story) => story.id === viewingStory.id));
    if (currentGroupIndex < 0) return;

    const currentGroup = storyGroups[currentGroupIndex];
    const currentStoryIndex = currentGroup.findIndex((story) => story.id === viewingStory.id);

    if (currentStoryIndex > 0) {
      setViewingStory(currentGroup[currentStoryIndex - 1]);
      return;
    }

    const previousGroup = storyGroups[currentGroupIndex - 1];
    setViewingStory(previousGroup?.[previousGroup.length - 1] ?? viewingStory);
  }, [storyGroups, viewingStory]);

  const viewingStoryGroup = viewingStory
    ? storyGroups.find((group) => group.some((story) => story.id === viewingStory.id))
    : undefined;
  const viewingStoryIndex = viewingStoryGroup?.findIndex((story) => story.id === viewingStory?.id) ?? 0;

  // Toast alert
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  const currentUserPost = posts.find((post) => post.author.id === session?.user?.id);
  const currentUser: Author | null = session?.user
    ? {
        id: session.user.id,
        name: session.user.name,
        username: session.user.email.split("@")[0],
        avatar: session.user.image || "",
        role: "user",
        followersCount: currentUserPost?.author.followersCount || 0,
        recipesCount: posts.filter((post) => post.author.id === session.user.id).length,
      }
    : null;

  const loadCommunity = useCallback(async () => {
    setLoadError(null);
    try {
      const [loadedPosts, loadedStories] = await Promise.all([
        communityApi.listPosts({ take: API_POSTS_PER_PAGE, skip: 0 }),
        communityApi.listStories(),
      ]);
      setPosts(loadedPosts);
      setStories(loadedStories);
      setHasMoreServerPosts(loadedPosts.length === API_POSTS_PER_PAGE);
      setVisiblePostCount(POSTS_PER_PAGE);
      setChefs(getCommunityChefs(loadedPosts, session?.user.id));
      communityCache = {
        posts: loadedPosts,
        stories: loadedStories,
        hasMorePosts: loadedPosts.length === API_POSTS_PER_PAGE,
      };
      try {
        const suggestedChefs = await communityApi.listSuggestedChefs();
        setChefs(suggestedChefs);
      } catch {
        // Keep the feed usable if an older deployment does not have this route yet.
        setChefs(getCommunityChefs(loadedPosts));
      }
      if (session?.user) {
        try {
          const [loadedCollections, loadedNotifications] = await Promise.all([
            communityApi.listCollections(),
            communityApi.listNotifications(),
          ]);
          setCollections(loadedCollections);
          setNotifications(loadedNotifications);
        } catch {
          // These require a valid authenticated session. If a cross-origin
          // cookie is unavailable, keep the public feed usable instead of
          // replacing it with a Community-wide error.
          setCollections([]);
          setNotifications([]);
        }
      } else {
        setCollections([]);
        setNotifications([]);
      }
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Unable to load the Community feed");
    } finally {
      setIsInitialLoading(false);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    void loadCommunity();
  }, [loadCommunity]);

  const runMutation = useCallback(
    async (mutation: () => Promise<unknown>, success: string) => {
      try {
        await mutation();
        await loadCommunity();
        showToast(success);
      } catch (error) {
        showToast(error instanceof Error ? error.message : "Community action failed");
      }
    },
    [loadCommunity, showToast],
  );

  const loadMorePosts = useCallback(async () => {
    if (isLoadingMorePosts || !hasMoreServerPosts) return;

    setIsLoadingMorePosts(true);
    try {
      const nextPosts = await communityApi.listPosts({
        take: API_POSTS_PER_PAGE,
        skip: posts.length,
      });
      setPosts((currentPosts) => {
        const existingIds = new Set(currentPosts.map((post) => post.id));
        const mergedPosts = [...currentPosts, ...nextPosts.filter((post) => !existingIds.has(post.id))];
        communityCache = {
          posts: mergedPosts,
          stories: communityCache?.stories ?? stories,
          hasMorePosts: nextPosts.length === API_POSTS_PER_PAGE,
        };
        return mergedPosts;
      });
      setHasMoreServerPosts(nextPosts.length === API_POSTS_PER_PAGE);
      setVisiblePostCount((count) => count + POSTS_PER_PAGE);
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Unable to load more Community posts");
    } finally {
      setIsLoadingMorePosts(false);
    }
  }, [hasMoreServerPosts, isLoadingMorePosts, posts.length, showToast, stories]);

  const loadPostInteractions = useCallback(async (
    postId: string,
    options: { commentsTake?: number; commentsSkip?: number; reviewsTake?: number; reviewsSkip?: number } = {},
  ) => {
    const interactions = await communityApi.getPostInteractions(postId, options);
    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id !== postId) return post;

        return {
          ...post,
          comments:
            options.commentsTake === 0
              ? post.comments
              : options.commentsSkip
                ? [...post.comments, ...interactions.comments]
                : interactions.comments,
          reviews:
            options.reviewsTake === 0
              ? post.reviews
              : options.reviewsSkip
                ? [...post.reviews, ...interactions.reviews]
                : interactions.reviews,
        };
      }),
    );
    return interactions;
  }, []);

  const handleOpenReview = useCallback(
    async (post: Post) => {
      try {
        const interactions = await loadPostInteractions(post.id, {
          commentsTake: 0,
          reviewsTake: 5,
          reviewsSkip: 0,
        });
        setReviewModalPost({ ...post, reviews: interactions.reviews });
      } catch (error) {
        showToast(error instanceof Error ? error.message : "Unable to load recipe reviews");
      }
    },
    [loadPostInteractions, showToast],
  );

  const loadMoreReviews = useCallback(async () => {
    if (!reviewModalPost || isLoadingMoreReviews || reviewModalPost.reviews.length >= reviewModalPost.rating.totalReviews) {
      return;
    }

    setIsLoadingMoreReviews(true);
    try {
      const interactions = await communityApi.getPostInteractions(reviewModalPost.id, {
        commentsTake: 0,
        reviewsTake: 5,
        reviewsSkip: reviewModalPost.reviews.length,
      });
      const updatedPost = { ...reviewModalPost, reviews: [...reviewModalPost.reviews, ...interactions.reviews] };
      setReviewModalPost(updatedPost);
      setPosts((currentPosts) =>
        currentPosts.map((post) => (post.id === updatedPost.id ? { ...post, reviews: updatedPost.reviews } : post)),
      );
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Unable to load more reviews");
    } finally {
      setIsLoadingMoreReviews(false);
    }
  }, [isLoadingMoreReviews, reviewModalPost, showToast]);

  const requireAuthentication = useCallback(
    (action: string) => {
      showToast(`Log in to ${action}.`);
    },
    [showToast],
  );

  // Handle Likes
  const handleToggleLike = (postId: string) =>
    void runMutation(() => communityApi.toggleLike(postId), "Updated recipe like");

  // Handle Save / Bookmark
  const handleToggleSave = (postId: string) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;
    setSaveModalPost(post);
  };

  const handleDeletePost = (postId: string) =>
    void runMutation(() => communityApi.deletePost(postId), "Post deleted");

  const handleEditPost = async (post: Post) => {
    const caption = window.prompt("Edit post caption", post.caption);
    if (caption === null || !caption.trim()) return;
    await runMutation(() => communityApi.updatePost(post.id, { caption: caption.trim() }), "Post updated");
  };

  const handleTogglePin = (postId: string, isPinned: boolean) =>
    void runMutation(() => communityApi.updatePost(postId, { isPinned }), isPinned ? "Post pinned to your profile" : "Post unpinned");

  const handleSaveToCollection = (collectionId: string, postId: string) =>
    void runMutation(() => communityApi.savePost(postId, collectionId), "Saved recipe to your collection!");

  const handleCreateCollection = (name: string, description: string) =>
    void runMutation(() => communityApi.createCollection(name, description), `Created collection "${name}"`);

  // Handle Comments
  const handleAddComment = (postId: string, content: string) =>
    void runMutation(() => communityApi.addComment(postId, content), "Comment posted!");

  // Handle Reviews & Ratings
  const handleSubmitReview = (postId: string, review: Review) =>
    void runMutation(() => communityApi.saveReview(postId, review), "Recipe review submitted!");

  // Handle "I Made This!"
  const handleMadeIt = (postId: string) =>
    void runMutation(() => communityApi.toggleMadeIt(postId), "Updated your cooking history");

  // Handle Follow / Unfollow
  const handleToggleFollow = (authorId: string) =>
    void runMutation(() => communityApi.toggleFollow(authorId), "Updated chef following status");

  // Handle Share (link copy)
  const handleShare = (post: Post) => {
    navigator.clipboard.writeText(`https://foodcanvas.app/community/recipe/${post.id}`);
    showToast("Recipe link copied to clipboard! Ready to share.");
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
        const matchesIngredient = post.recipe?.ingredients.some((i) => i.name.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCaption && !matchesAuthor && !matchesTag && !matchesIngredient) {
          return false;
        }
      }

      // Category / Tab filter
      switch (activeFilter) {
        case "trending":
          return post.rating.overall >= 4.8 || post.likesCount > 300;
        case "following":
          return post.author.isFollowing;
        case "quick":
          return post.recipe && post.recipe.prepTimeMinutes + post.recipe.cookTimeMinutes <= 25;
        case "wellness":
          return (
            post.recipe &&
            (post.recipe.dietaryTags.includes("High Protein") ||
              post.recipe.dietaryTags.includes("Gluten-Free") ||
              post.recipe.dietaryTags.includes("Vegan") ||
              post.recipe.nutrition.protein >= 25)
          );
        case "challenge":
          return post.isChallengeEntry;
        case "ai_sparks":
          return post.recipe?.sourceType === "ai_generated" || post.recipe?.sourceType === "mealdb";
        case "saved":
          return post.isSaved;
        case "liked":
          return post.isLiked;
        default:
          return true;
      }
    });
  }, [posts, activeFilter, searchQuery]);

  const matchingAuthors = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    return Array.from(new Map(posts.map((post) => [post.author.id, post.author])).values())
      .filter((author) => author.name.toLowerCase().includes(query) || author.username.toLowerCase().includes(query))
      .slice(0, 4);
  }, [posts, searchQuery]);

  const matchingRecipes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    return posts
      .filter((post) => post.recipe?.title.toLowerCase().includes(query) || post.caption.toLowerCase().includes(query))
      .slice(0, 4);
  }, [posts, searchQuery]);

  const visiblePosts = useMemo(() => filteredPosts.slice(0, visiblePostCount), [filteredPosts, visiblePostCount]);
  const hasMoreLoadedPosts = visiblePostCount < filteredPosts.length;
  const hasMorePosts = hasMoreLoadedPosts || hasMoreServerPosts;

  const handleLoadMore = useCallback(() => {
    if (hasMoreLoadedPosts) {
      setVisiblePostCount((count) => count + POSTS_PER_PAGE);
      return;
    }
    void loadMorePosts();
  }, [hasMoreLoadedPosts, loadMorePosts]);

  useEffect(() => {
    setVisiblePostCount(POSTS_PER_PAGE);
  }, [activeFilter, searchQuery]);

  useEffect(() => {
    const feedEnd = feedEndRef.current;
    if (!feedEnd || !hasMorePosts) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (hasMoreLoadedPosts) {
          setVisiblePostCount((count) => count + POSTS_PER_PAGE);
          return;
        }
        void loadMorePosts();
      },
      { rootMargin: "360px 0px" },
    );
    observer.observe(feedEnd);
    return () => observer.disconnect();
  }, [hasMoreLoadedPosts, hasMorePosts, loadMorePosts]);

  const savedPostsCount = posts.filter((p) => p.isSaved).length;
  const likedPostsCount = posts.filter((p) => p.isLiked).length;

  return (
    <div className="community-surface min-h-screen bg-[#FCFDF9] text-neutral-900 transition-colors duration-200 dark:bg-[#0a0a0a] dark:text-neutral-100 font-sans">
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

      {/* Main Container Layout: 3 Columns (Enhanced sizing & comfortable spacing) */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-12">
          {/* Column 1: Left Navigation & Profile */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-6">
              <CommunitySidebarLeft
                activeFilter={activeFilter}
                setActiveFilter={(f) => {
                  setActiveFilter(f);
                }}
                collections={collections}
                savedPostsCount={savedPostsCount}
                likedPostsCount={likedPostsCount}
                currentUser={currentUser}
                isAuthenticated={isAuthenticated}
                onRequireAuthentication={requireAuthentication}
              />
            </div>
          </div>

          {/* Column 2: Main Social Cooking Feed */}
          <div className="lg:col-span-6 space-y-7">
            {/* Cooking Stories Carousel */}
            <StoriesBar
              stories={stories}
              onSelectStory={(story) => {
                const group = storyGroups.find((items) => items.some((item) => item.id === story.id));
                setViewingStory(group?.[0] ?? story);
              }}
              onAddStory={(file) => setStoryEditorFile(file)}
              isAuthenticated={isAuthenticated}
              onRequireAuthentication={requireAuthentication}
            />

            {/* Quick Share / Post Creator Bar */}
            {isSessionPending ? (
              <div className="h-28 animate-pulse rounded-3xl border border-slate-200 bg-white dark:border-neutral-800 dark:bg-[#121212]" />
            ) : isAuthenticated && currentUser ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-[#121212]"
              >
                <div className="flex items-center gap-3.5">
                  <CommunityAvatar
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-[#2F8F46]"
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
                    <RefreshCw className={`h-4 w-4 ${isLoadingApi ? "animate-spin" : ""}`} />
                    <span>Random Spark</span>
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <div className="rounded-3xl border border-emerald-200 bg-gradient-to-r from-[#EAF7E8] to-white p-5 shadow-xs dark:border-emerald-900/60 dark:from-emerald-950/30 dark:to-[#121212]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-extrabold text-neutral-900 dark:text-white">
                      Share your kitchen creativity
                    </p>
                    <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-300">
                      Log in to publish recipes, photos, cooking tips, and AI recipe ideas.
                    </p>
                  </div>
                  <Link
                    href="/registrationProcess/login"
                    className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#2F8F46] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#176B35]"
                  >
                    Log in to post
                  </Link>
                </div>
              </div>
            )}

            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search recipes, ingredients, cooks, or chefs"
                aria-label="Search Community"
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-10 text-xs text-neutral-900 outline-none transition focus:border-[#2F8F46] focus:ring-2 focus:ring-[#2F8F46]/15 dark:border-neutral-800 dark:bg-[#121212] dark:text-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800"
                  aria-label="Clear Community search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              {searchQuery && (matchingAuthors.length > 0 || matchingRecipes.length > 0) && (
                <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-neutral-800 dark:bg-[#18181b]">
                  {matchingAuthors.length > 0 && (
                    <div className="p-2">
                      <p className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                        People
                      </p>
                      {matchingAuthors.map((author) => (
                        <button
                          key={author.id}
                          onClick={() => {
                            setActiveFilter("all");
                            setSearchQuery(author.name);
                          }}
                          className="flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left transition hover:bg-neutral-50 dark:hover:bg-neutral-800"
                        >
                          <CommunityAvatar
                            src={author.avatar}
                            alt={author.name}
                            className="h-8 w-8 shrink-0 rounded-full object-cover"
                          />
                          <span className="truncate text-xs font-bold text-neutral-800 dark:text-neutral-100">
                            {author.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                  {matchingRecipes.length > 0 && (
                    <div className="border-t border-slate-100 p-2 dark:border-neutral-800">
                      <p className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                        Recipes and posts
                      </p>
                      {matchingRecipes.map((post) => (
                        <button
                          key={post.id}
                          onClick={() => {
                            setActiveFilter("all");
                            setSearchQuery(post.recipe?.title || post.caption);
                          }}
                          className="flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left transition hover:bg-neutral-50 dark:hover:bg-neutral-800"
                        >
                          <img src={post.imageUrl} alt="" className="h-8 w-8 shrink-0 rounded-lg object-cover" />
                          <span className="truncate text-xs font-bold text-neutral-800 dark:text-neutral-100">
                            {post.recipe?.title || post.caption}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Filter Status & Active Tabs */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2.5">
                <h2 className="font-extrabold text-sm uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                  {activeFilter === "all"
                    ? "Community Cooking Feed"
                    : activeFilter === "trending"
                      ? "🌟 Trending Recipes"
                      : activeFilter === "following"
                        ? "👥 Recipes by Chefs You Follow"
                        : activeFilter === "challenge"
                          ? "🏆 Challenge Submissions"
                          : activeFilter === "saved"
                            ? "🔖 My Saved Recipes"
                            : activeFilter === "liked"
                              ? "❤️ Liked Recipes"
                              : `${activeFilter.toUpperCase()} Recipes`}
                </h2>
              </div>

              {activeFilter !== "all" && (
                <button
                  onClick={() => setActiveFilter("all")}
                  className="text-xs font-bold text-[#2F8F46] hover:underline dark:text-[#B7E35F]"
                >
                  Reset Filter
                </button>
              )}
            </div>

            {/* Posts Stream */}
            {isInitialLoading ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:bg-[#121212]">
                Loading the Community feed...
              </div>
            ) : loadError ? (
              <div className="rounded-3xl border border-rose-200 bg-white p-8 text-center dark:border-rose-900 dark:bg-[#121212]">
                <p className="text-sm font-bold text-rose-600">{loadError}</p>
                <button
                  onClick={() => void loadCommunity()}
                  className="mt-3 rounded-xl bg-[#2F8F46] px-4 py-2 text-xs font-bold text-white"
                >
                  Try Again
                </button>
              </div>
            ) : visiblePosts.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-emerald-200 p-12 text-center bg-white dark:border-neutral-800 dark:bg-[#121212]">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF7E8] text-[#2F8F46] dark:bg-emerald-950 dark:text-[#B7E35F] mb-4">
                  <Utensils className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                  No recipes found in this filter
                </h3>
                <p className="text-xs text-neutral-500 mt-1.5 max-w-sm mx-auto">
                  {isAuthenticated
                    ? "Try clearing your search or publish the very first recipe in this category!"
                    : "Be the first to join FoodCanvas and share a recipe with the Community!"}
                </p>
                <div className="mt-5 flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setActiveFilter("all");
                      setSearchQuery("");
                    }}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300"
                  >
                    View All Feeds
                  </button>
                  <button
                    onClick={() => {
                      if (!isAuthenticated) {
                        requireAuthentication("share a recipe");
                        return;
                      }
                      setCreatePostInitialAI(false);
                      setCreatePostOpen(true);
                    }}
                    className="rounded-xl bg-[#2F8F46] px-5 py-2 text-xs font-bold text-white transition hover:bg-[#176B35]"
                  >
                    {isAuthenticated ? "+ Share a Recipe" : "Log in to share a recipe"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-7">
                {visiblePosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onLike={handleToggleLike}
                    onSave={handleToggleSave}
                    onShare={handleShare}
                    onRate={(p) => void handleOpenReview(p)}
                    onReport={(p) => setReportModalPost(p)}
                    onDelete={handleDeletePost}
                    onEdit={handleEditPost}
                    onTogglePin={handleTogglePin}
                    onDirectMessage={(authorId, p) => handleOpenDM(authorId, p)}
                    onToggleFollow={handleToggleFollow}
                    onAddComment={handleAddComment}
                    onLoadInteractions={loadPostInteractions}
                    onMadeIt={handleMadeIt}
                    currentUserId={currentUser?.id}
                    isAuthenticated={isAuthenticated}
                    onRequireAuthentication={requireAuthentication}
                    hasActiveStory={stories.some((story) => story.author.id === post.author.id)}
                    onAuthorAvatarClick={
                      stories.some((story) => story.author.id === post.author.id)
                        ? () => {
                            const group = storyGroups.find((items) => items.some((item) => item.author.id === post.author.id));
                            setViewingStory(group?.[0] ?? null);
                          }
                        : undefined
                    }
                  />
                ))}
              </div>
            )}

            <div ref={feedEndRef} className="flex min-h-12 items-center justify-center" aria-live="polite">
              {hasMorePosts ? (
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={isLoadingMorePosts}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-[#176B35] transition hover:bg-[#EAF7E8] disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-700 dark:text-[#B7E35F] dark:hover:bg-emerald-950/40"
                >
                  {isLoadingMorePosts ? "Loading more recipes..." : "Load more recipes"}
                </button>
              ) : filteredPosts.length > POSTS_PER_PAGE ? (
                <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500">
                  You have reached the latest Community recipes.
                </span>
              ) : null}
            </div>
          </div>

          {/* Column 3: Right Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-6">
              <CommunitySidebarRight
                chefs={chefs}
                onToggleFollow={handleToggleFollow}
                trendingPosts={posts}
                onSelectRecipe={(p) => {
                  if (!isAuthenticated) {
                    requireAuthentication("rate and review recipes");
                    return;
                  }
                  setReviewModalPost(p);
                }}
                onOpenCreatePostWithAI={() => {
                  if (!isAuthenticated) {
                    requireAuthentication("create an AI recipe");
                    return;
                  }
                  setCreatePostInitialAI(true);
                  setCreatePostOpen(true);
                }}
                isAuthenticated={isAuthenticated}
                onRequireAuthentication={requireAuthentication}
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
        onPublishPost={async (newPost, imageFile) => {
          const imageUrl = imageFile ? await communityApi.uploadImage(imageFile, "posts") : newPost.imageUrl;
          const createdPost = await communityApi.createPost({ ...newPost, imageUrl });
          setPosts((currentPosts) => {
            const updatedPosts = [createdPost, ...currentPosts.filter((post) => post.id !== createdPost.id)];
            communityCache = {
              posts: updatedPosts,
              stories: communityCache?.stories ?? stories,
              hasMorePosts: hasMoreServerPosts,
            };
            return updatedPosts;
          });
          setChefs((currentChefs) => {
            if (createdPost.author.id === session?.user?.id) return currentChefs;
            return [createdPost.author, ...currentChefs.filter((chef) => chef.id !== createdPost.author.id)].slice(0, 8);
          });
          showToast("Recipe published to FoodCanvas Community!");
        }}
      />

      <RecipeReviewModal
        post={reviewModalPost}
        isOpen={!!reviewModalPost}
        onClose={() => {
          setReviewModalPost(null);
          setIsLoadingMoreReviews(false);
        }}
        onSubmitReview={handleSubmitReview}
        onLoadMoreReviews={() => void loadMoreReviews()}
        hasMoreReviews={Boolean(reviewModalPost && reviewModalPost.reviews.length < reviewModalPost.rating.totalReviews)}
        isLoadingMoreReviews={isLoadingMoreReviews}
      />

      <ReportPostModal
        post={reportModalPost}
        isOpen={!!reportModalPost}
        onClose={() => setReportModalPost(null)}
        onSubmitReport={async (postId, reason, details) => {
          await communityApi.reportPost(postId, reason, details);
          showToast("Report submitted for moderation");
        }}
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
        key={viewingStory?.id ?? "community-story-viewer"}
        story={viewingStory}
        isOpen={!!viewingStory}
        onClose={() => setViewingStory(null)}
        onNextStory={handleNextStory}
        onPreviousStory={handlePreviousStory}
        storyCount={viewingStoryGroup?.length ?? 1}
        storyIndex={viewingStoryIndex}
        isOwnStory={viewingStory?.author.id === session?.user?.id}
        dashboardHref={isAuthenticated ? "/dashboard/users" : "/registrationProcess/login"}
        profileHref={session?.user ? `/community/users/${encodeURIComponent(session.user.id)}` : "/registrationProcess/login"}
        profileImage={session?.user?.image}
        notifications={notifications}
        onOpenMessages={() => {
          setDmRecipientId(undefined);
          setDmAttachedPost(null);
          setDmModalOpen(true);
        }}
        onDeleteStory={async (storyId) => {
          await communityApi.deleteStory(storyId);
          await loadCommunity();
          setViewingStory(null);
          showToast("Story deleted");
        }}
      />

      <StoryEditorModal
        file={storyEditorFile}
        isOpen={!!storyEditorFile}
        onClose={() => setStoryEditorFile(null)}
        onShare={async (editedFile, caption) => {
          const imageUrl = await communityApi.uploadImage(editedFile, "stories");
          await communityApi.createStory(imageUrl, caption);
          await loadCommunity();
          showToast("Story published for 24 hours");
        }}
      />
    </div>
  );
};

export default CommunityFeed;

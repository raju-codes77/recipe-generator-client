"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MessageCircle, UserPlus } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { communityApi } from "@/app/api/community/community-api";
import { CommunityAvatar } from "@/components/community/CommunityAvatar";
import { PostCard } from "@/components/community/PostCard";
import { StoryViewerModal } from "@/components/community/StoryViewerModal";
import type { Post, PublicCommunityProfile, StoryItem } from "@/components/community/types";

export default function CommunityUserProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const [profile, setProfile] = useState<PublicCommunityProfile | null>(null);
  const [viewingStory, setViewingStory] = useState<StoryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);

    try {
      setProfile(await communityApi.getPublicProfile(userId));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load this profile");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadProfile(), 0);
    return () => window.clearTimeout(timer);
  }, [loadProfile]);

  const storyGroup = useMemo(() => profile?.stories.slice().reverse() ?? [], [profile]);

  const handleNextStory = useCallback(() => {
    if (!viewingStory) return;
    const index = storyGroup.findIndex((story) => story.id === viewingStory.id);
    setViewingStory(index >= 0 && index < storyGroup.length - 1 ? storyGroup[index + 1] : null);
  }, [storyGroup, viewingStory]);

  const handlePreviousStory = useCallback(() => {
    if (!viewingStory) return;
    const index = storyGroup.findIndex((story) => story.id === viewingStory.id);
    if (index > 0) setViewingStory(storyGroup[index - 1]);
  }, [storyGroup, viewingStory]);

  const requireAuthentication = () => router.push("/registrationProcess/login");

  const updateProfile = async (action: () => Promise<unknown>) => {
    if (isSessionPending) return;
    if (!session?.user) {
      requireAuthentication();
      return;
    }
    await action();
    await loadProfile();
  };

  const loadPostInteractions = async (
    postId: string,
    options: { commentsTake?: number; commentsSkip?: number; reviewsTake?: number; reviewsSkip?: number } = {},
  ) => {
    const interactions = await communityApi.getPostInteractions(postId, options);
    setProfile((currentProfile) =>
      currentProfile
        ? {
            ...currentProfile,
            posts: currentProfile.posts.map((post) =>
              post.id !== postId
                ? post
                : {
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
                  },
            ),
          }
        : currentProfile,
    );
  };

  const sharePost = async (post: Post) => {
    const url = `${window.location.origin}/community/users/${post.author.id}`;
    if (navigator.share) {
      await navigator.share({ title: post.recipe?.title || "FoodCanvas Community Post", url });
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  if (loading) {
    return <main className="min-h-screen bg-[#FCFDF9] p-6 text-center text-sm text-neutral-500 dark:bg-[#0a0a0a]">Loading profile...</main>;
  }

  if (error || !profile) {
    return (
      <main className="min-h-screen bg-[#FCFDF9] p-6 dark:bg-[#0a0a0a]">
        <div className="mx-auto max-w-2xl rounded-3xl border border-rose-200 bg-white p-8 text-center dark:border-rose-900 dark:bg-[#121212]">
          <p className="text-sm font-bold text-rose-600">{error || "Profile not found"}</p>
          <button onClick={() => void loadProfile()} className="mt-4 rounded-xl bg-[#2F8F46] px-4 py-2 text-xs font-bold text-white">Try again</button>
        </div>
      </main>
    );
  }

  const hasStories = profile.stories.length > 0;
  const storyIndex = viewingStory ? storyGroup.findIndex((story) => story.id === viewingStory.id) : 0;

  return (
    <main className="min-h-screen bg-[#FCFDF9] px-0 py-4 text-neutral-900 dark:bg-[#0a0a0a] dark:text-neutral-100 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-4xl">
        <button onClick={() => router.back()} className="mb-4 ml-4 inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 transition hover:text-[#2F8F46] sm:mb-5 sm:ml-0 sm:text-sm">
          <ArrowLeft className="h-4 w-4" /> Back to Community
        </button>

        <section className="border-y border-slate-200 bg-white px-4 py-5 shadow-xs dark:border-neutral-800 dark:bg-[#121212] sm:rounded-3xl sm:border sm:p-8">
          <div className="grid grid-cols-[80px_minmax(0,1fr)] items-start gap-x-4 gap-y-3 sm:flex sm:items-center sm:gap-6">
            <button type="button" onClick={() => hasStories && setViewingStory(storyGroup[0])} className={`shrink-0 rounded-full ${hasStories ? "bg-gradient-to-tr from-[#2F8F46] via-[#B7E35F] to-[#FF9F43] p-1" : ""}`} aria-label={hasStories ? "View user's stories" : "User profile photo"}>
              <CommunityAvatar src={profile.user.avatar} alt={profile.user.name} className="h-20 w-20 rounded-full border-4 border-white object-cover dark:border-[#121212] sm:h-28 sm:w-28" />
            </button>
            <div className="col-start-1 row-start-2 min-w-0 text-center sm:hidden">
              <h1 className="truncate text-base font-black tracking-tight">{profile.user.name}</h1>
              <p className="mt-1 truncate text-xs text-neutral-500 dark:text-neutral-400">@{profile.user.username}</p>
            </div>
            <div className="col-start-2 row-span-2 row-start-1 min-w-0 flex-1 sm:col-auto sm:row-auto">
              <div className="hidden sm:block">
                <h1 className="text-2xl font-black tracking-tight">{profile.user.name}</h1>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">@{profile.user.username}</p>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px] sm:mt-4 sm:flex sm:justify-start sm:gap-5 sm:text-sm">
                <span><strong className="block text-sm sm:inline">{profile.posts.length}</strong> posts</span>
                <span><strong className="block text-sm sm:inline">{profile.user.followersCount}</strong> followers</span>
                <span><strong className="block text-sm sm:inline">{profile.followingCount}</strong> following</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:flex sm:flex-wrap sm:gap-3">
                {profile.user.id !== session?.user?.id && (
                  <button onClick={() => void updateProfile(() => communityApi.toggleFollow(profile.user.id))} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2F8F46] px-3 py-2.5 text-xs font-bold text-white transition hover:bg-[#176B35] sm:px-5">
                    <UserPlus className="h-4 w-4" /> {profile.user.isFollowing ? "Following" : "Follow"}
                  </button>
                )}
                <button onClick={requireAuthentication} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-neutral-700 dark:border-neutral-700 dark:text-neutral-200 sm:px-5">
                  <MessageCircle className="h-4 w-4" /> Message
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 text-lg font-black">{profile.user.name}&apos;s Community Posts</h2>
          {profile.posts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 p-10 text-center text-sm text-neutral-500 dark:border-neutral-700">No public posts yet.</div>
          ) : (
            <div className="space-y-7">
              {profile.posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={(postId) => void updateProfile(() => communityApi.toggleLike(postId))}
                  onSave={(postId) => void updateProfile(() => communityApi.savePost(postId))}
                  onShare={(postToShare) => void sharePost(postToShare)}
                  onRate={() => undefined}
                  onReport={() => undefined}
                  onDirectMessage={() => requireAuthentication()}
                  onToggleFollow={() => void updateProfile(() => communityApi.toggleFollow(profile.user.id))}
                  onAddComment={(postId, content) => void updateProfile(() => communityApi.addComment(postId, content))}
                  onLoadInteractions={loadPostInteractions}
                  onMadeIt={(postId) => void updateProfile(() => communityApi.toggleMadeIt(postId))}
                  currentUserId={session?.user?.id}
                  isAuthenticated={Boolean(session?.user)}
                  onRequireAuthentication={requireAuthentication}
                  hasActiveStory={hasStories}
                  onAuthorAvatarClick={hasStories ? () => setViewingStory(storyGroup[0] ?? null) : undefined}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      <StoryViewerModal
        story={viewingStory}
        isOpen={Boolean(viewingStory)}
        onClose={() => setViewingStory(null)}
        onNextStory={handleNextStory}
        onPreviousStory={handlePreviousStory}
        storyCount={storyGroup.length || 1}
        storyIndex={storyIndex < 0 ? 0 : storyIndex}
      />
    </main>
  );
}

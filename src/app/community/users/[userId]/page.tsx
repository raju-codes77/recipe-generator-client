"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Award, BookOpen, CalendarDays, Camera, Check, Eye, Heart, LayoutDashboard, MapPin, MessageCircle, Pencil, UserPlus, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { communityApi } from "@/app/api/community/community-api";
import { CommunityAvatar } from "@/components/community/CommunityAvatar";
import { PostCard } from "@/components/community/PostCard";
import { CreatePostModal } from "@/components/community/CreatePostModal";
import { StoryViewerModal } from "@/components/community/StoryViewerModal";
import { StoryEditorModal } from "@/components/community/StoryEditorModal";
import { UnsavedChangesModal } from "@/components/community/UnsavedChangesModal";
import { RecipeDetailsModal } from "@/components/community/RecipeDetailsModal";
import type { Post, PublicCommunityProfile, StoryItem } from "@/components/community/types";

function ProfileSkeleton() {
  return (
    <main className="min-h-screen bg-[#F1F5F0] px-0 pb-10 dark:bg-[#090B0A] sm:px-6 sm:pt-5">
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="mb-4 h-4 w-32 rounded bg-neutral-200 dark:bg-neutral-800" />
        <section className="overflow-hidden border-y border-slate-200 bg-white dark:border-neutral-800 dark:bg-[#121614] sm:rounded-3xl sm:border">
          <div className="h-36 bg-neutral-200 dark:bg-neutral-800 sm:h-64" />
          <div className="relative px-4 pb-7 sm:px-10">
            <div className="-mt-14 flex flex-col gap-4 sm:-mt-20 sm:flex-row sm:items-end">
              <div className="h-40 w-40 shrink-0 rounded-full border-8 border-white bg-neutral-200 dark:border-[#121614] dark:bg-neutral-800" />
              <div className="flex-1 space-y-3 pb-2">
                <div className="h-7 w-48 rounded bg-neutral-200 dark:bg-neutral-800" />
                <div className="h-4 w-64 rounded bg-neutral-200 dark:bg-neutral-800" />
              </div>
              <div className="h-10 w-28 rounded-xl bg-neutral-200 dark:bg-neutral-800" />
            </div>
            <div className="mt-5 h-5 w-full max-w-2xl rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="mt-3 h-4 w-40 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="mt-6 h-14 rounded bg-neutral-200 dark:bg-neutral-800" />
          </div>
          <div className="flex gap-6 border-t border-slate-200 px-4 py-4 dark:border-neutral-800 sm:px-10">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={`profile-tab-skeleton-${item}`} className="h-4 w-20 rounded bg-neutral-200 dark:bg-neutral-800" />
            ))}
          </div>
        </section>
        <section className="mt-6 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <div className="h-64 rounded-3xl bg-white dark:bg-[#121614]" />
          <div className="space-y-6">
            <div className="h-28 rounded-3xl bg-white dark:bg-[#121614]" />
            <div className="h-[520px] rounded-3xl bg-white dark:bg-[#121614]" />
          </div>
        </section>
      </div>
    </main>
  );
}

export default function CommunityUserProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const [profile, setProfile] = useState<PublicCommunityProfile | null>(null);
  const [viewingStory, setViewingStory] = useState<StoryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"Overview" | "My Recipes" | "Saved" | "About">("Overview");
  const [localCoverImage, setLocalCoverImage] = useState<string | null>(null);
  const [localAvatarImage, setLocalAvatarImage] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isProfileCloseConfirmOpen, setIsProfileCloseConfirmOpen] = useState(false);
  const [socialList, setSocialList] = useState<"followers" | "following" | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [storyEditorFile, setStoryEditorFile] = useState<File | null>(null);
  const [isCreateRecipeOpen, setIsCreateRecipeOpen] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(false);
  const [isLoadingMorePosts, setIsLoadingMorePosts] = useState(false);
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const [isLoadingSavedPosts, setIsLoadingSavedPosts] = useState(false);
  const [savedPostsError, setSavedPostsError] = useState<string | null>(null);
  const [savedPostDetails, setSavedPostDetails] = useState<Post | null>(null);
  const [isUploadingProfileImage, setIsUploadingProfileImage] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSaveError, setProfileSaveError] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", bio: "", location: "", interests: "" });
  const [localProfileInfo, setLocalProfileInfo] = useState({ bio: "Sharing simple recipes, kitchen experiments, and everyday food inspiration with the FoodCanvas community.", location: "Home cook", interests: ["Home Cooking", "Healthy Meals", "Quick Recipes"] });
  const coverInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const storyInputRef = useRef<HTMLInputElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!profileMenuOpen) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [profileMenuOpen]);

  const loadProfile = useCallback(async ({ skip = 0, append = false }: { skip?: number; append?: boolean } = {}) => {
    if (!userId) return;
    if (!append) setLoading(true);
    setError(null);

    try {
      const loadedProfile = await communityApi.getPublicProfile(userId, { take: 6, skip });
      setProfile((currentProfile) => append && currentProfile ? { ...loadedProfile, posts: [...currentProfile.posts, ...loadedProfile.posts] } : loadedProfile);
      if (!append) {
        setLocalProfileInfo({
          bio: loadedProfile.user.bio || "",
          location: loadedProfile.user.location || "",
          interests: loadedProfile.user.interests || [],
        });
      }
      setHasMorePosts(Boolean(loadedProfile.hasMorePosts));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load this profile");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const loadMorePosts = async () => {
    if (!profile || !hasMorePosts || isLoadingMorePosts) return;
    setIsLoadingMorePosts(true);
    try {
      await loadProfile({ skip: profile.posts.length, append: true });
    } finally {
      setIsLoadingMorePosts(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => void loadProfile(), 0);
    return () => window.clearTimeout(timer);
  }, [loadProfile]);

  useEffect(() => {
    if (activeTab !== "Saved" || !profile || profile.user.id !== session?.user?.id) return;
    let cancelled = false;
    setIsLoadingSavedPosts(true);
    setSavedPostsError(null);
    void communityApi.listSavedPosts({ take: 30 })
      .then((response) => {
        if (!cancelled) setSavedPosts(response.posts);
      })
      .catch((loadError) => {
        if (!cancelled) setSavedPostsError(loadError instanceof Error ? loadError.message : "Unable to load saved posts");
      })
      .finally(() => {
        if (!cancelled) setIsLoadingSavedPosts(false);
      });
    return () => { cancelled = true; };
  }, [activeTab, profile, session?.user?.id]);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, [userId]);

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

  const isOwnProfile = profile?.user.id === session?.user?.id;
  const openEditProfile = () => {
    if (!profile || !isOwnProfile) return;
    setEditForm({
      name: profile.user.name,
      bio: profile.user.bio || localProfileInfo.bio,
      location: profile.user.location || localProfileInfo.location,
      interests: (profile.user.interests || localProfileInfo.interests).join(", "),
    });
    setProfileSaveError(null);
    setIsEditModalOpen(true);
  };

  const hasUnsavedProfileChanges = Boolean(
    profile && (
      editForm.name !== profile.user.name ||
      editForm.bio !== localProfileInfo.bio ||
      editForm.location !== localProfileInfo.location ||
      editForm.interests !== localProfileInfo.interests.join(", ")
    ),
  );

  const requestCloseEditProfile = () => {
    if (hasUnsavedProfileChanges) {
      setIsProfileCloseConfirmOpen(true);
      return;
    }
    setIsEditModalOpen(false);
  };

  const handleProfileImage = async (event: ChangeEvent<HTMLInputElement>, kind: "avatar" | "cover") => {
    const file = event.target.files?.[0];
    if (!file) return;
    event.target.value = "";

    if (!isOwnProfile) return;
    setIsUploadingProfileImage(true);
    setProfileSaveError(null);
    try {
      const imageUrl = await communityApi.uploadImage(file, "profiles");
      const response = await communityApi.updateProfile(kind === "avatar" ? { image: imageUrl } : { coverImage: imageUrl });
      setProfile((currentProfile) => currentProfile ? {
        ...currentProfile,
        user: {
          ...currentProfile.user,
          avatar: response.profile.image || currentProfile.user.avatar,
          coverImage: response.profile.coverImage || currentProfile.user.coverImage,
        },
      } : currentProfile);
      if (kind === "avatar") setLocalAvatarImage(imageUrl);
      else setLocalCoverImage(imageUrl);
    } catch (uploadError) {
      setProfileSaveError(uploadError instanceof Error ? uploadError.message : "Unable to upload the profile image");
    } finally {
      setIsUploadingProfileImage(false);
    }
  };

  if (loading) {
    return <ProfileSkeleton />;
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
  const hasProfileImage = Boolean(localAvatarImage || profile.user.avatar);
  const canOpenProfileMenu = isOwnProfile || hasProfileImage || hasStories;
  const storyIndex = viewingStory ? storyGroup.findIndex((story) => story.id === viewingStory.id) : 0;
  const coverImage = localCoverImage || profile.user.coverImage;
  const recipePosts = profile.posts.filter((post) => post.recipe);
  const visiblePosts = activeTab === "My Recipes" ? recipePosts : profile.posts;

  return (
    <main className="min-h-screen bg-[#F1F5F0] px-0 pb-10 text-neutral-900 dark:bg-[#090B0A] dark:text-neutral-100 [&_a]:cursor-pointer [&_button]:cursor-pointer sm:px-6 sm:pt-5">
      <div className="mx-auto max-w-5xl">
        <button onClick={() => router.back()} className="mb-4 ml-4 inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 transition hover:text-[#2F8F46] sm:ml-0 sm:text-sm">
          <ArrowLeft className="h-4 w-4" /> Back to Community
        </button>

        <section className="overflow-hidden border-y border-slate-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-[#121614] sm:rounded-3xl sm:border">
          <div onClick={() => coverImage && setSelectedImage({ src: coverImage, alt: `${profile.user.name}'s cover photo` })} className={`relative h-36 overflow-hidden bg-gradient-to-br from-[#183E28] via-[#2F8F46] to-[#B7E35F] sm:h-64 ${coverImage ? "cursor-pointer" : ""}`}>
            {coverImage && <img src={coverImage} alt="Profile cover" className="h-full w-full cursor-pointer object-cover" />}
            {isOwnProfile && <>
              <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={(event) => void handleProfileImage(event, "cover")} />
              <button type="button" disabled={isUploadingProfileImage} aria-busy={isUploadingProfileImage} onClick={(event) => { event.preventDefault(); event.stopPropagation(); if (!isUploadingProfileImage) coverInputRef.current?.click(); }} className="absolute bottom-3 right-3 z-20 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-black/65 px-3 py-2 text-xs font-bold text-white backdrop-blur transition hover:bg-black/80 disabled:cursor-wait disabled:opacity-60"><Camera className="h-4 w-4" /> {isUploadingProfileImage ? "Uploading..." : "Change cover"}</button>
            </>}
          </div>

          <div className="relative px-4 pb-5 sm:px-10 sm:pb-7">
            <div className="-mt-14 flex flex-col gap-4 sm:-mt-20 sm:flex-row sm:flex-nowrap sm:items-end sm:gap-6">
              <div ref={profileMenuRef} className="relative z-20 shrink-0">
                <button type="button" onClick={() => canOpenProfileMenu && setProfileMenuOpen((open) => !open)} className={`relative h-40 w-40 rounded-full ${hasStories ? "bg-gradient-to-tr from-[#2F8F46] via-[#B7E35F] to-[#FF9F43] p-1" : "bg-white p-1 dark:bg-[#121614]"} ${!canOpenProfileMenu ? "cursor-default" : ""}`} aria-label={canOpenProfileMenu ? "Open profile photo options" : "Profile photo"} aria-expanded={canOpenProfileMenu ? profileMenuOpen : undefined}>
                  <CommunityAvatar src={localAvatarImage || profile.user.avatar} alt={profile.user.name} className="h-full w-full rounded-full border-4 border-white object-cover dark:border-[#121614]" />
                  {isOwnProfile && <span className="absolute bottom-1 right-1 rounded-full bg-[#2F8F46] p-2 text-white shadow-lg"><Camera className="h-3.5 w-3.5" /></span>}
                </button>
                {profileMenuOpen && canOpenProfileMenu && <div className="absolute left-0 top-[calc(100%+0.75rem)] z-50 w-64 rounded-2xl border border-neutral-700 bg-[#242725] p-2 text-left shadow-2xl">
                  {hasProfileImage && <button type="button" onClick={() => { setSelectedImage({ src: localAvatarImage || profile.user.avatar, alt: `${profile.user.name}'s profile picture` }); setProfileMenuOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-white hover:bg-white/10"><Eye className="h-5 w-5 text-neutral-300" /> View profile picture</button>}
                  {isOwnProfile && <>
                    <button type="button" disabled={isUploadingProfileImage} onClick={() => { avatarInputRef.current?.click(); setProfileMenuOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-white hover:bg-white/10 disabled:opacity-60"><Camera className="h-5 w-5 text-neutral-300" /> Choose profile picture</button>
                    <button type="button" onClick={() => { storyInputRef.current?.click(); setProfileMenuOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-white hover:bg-white/10"><span className="text-lg">＋</span> Add to story</button>
                  </>}
                  {hasStories && <button type="button" onClick={() => { setViewingStory(storyGroup[0] ?? null); setProfileMenuOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-white hover:bg-white/10"><Eye className="h-5 w-5 text-[#B7E35F]" /> View story</button>}
                </div>}
              </div>
              {isOwnProfile && <><input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={(event) => void handleProfileImage(event, "avatar")} /><input ref={storyInputRef} type="file" accept="image/*" className="hidden" onChange={(event) => { const file = event.target.files?.[0] || null; setStoryEditorFile(file); event.target.value = ""; }} /></>}
              <div className="min-w-0 flex-1 sm:min-w-0 sm:translate-y-1 sm:pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-black tracking-tight sm:text-3xl">{profile.user.name}</h1>
                  {profile.user.badge && <span className="rounded-full bg-[#FFF1D9] px-2.5 py-1 text-[11px] font-bold text-[#B96A00]">{profile.user.badge}</span>}
                </div>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">@{profile.user.username} · FoodCanvas member</p>
              </div>
              <div className="flex shrink-0 gap-2 sm:mb-1 sm:ml-auto">
                {profile.user.id === session?.user?.id ? (
                  <button onClick={openEditProfile} className="inline-flex items-center gap-2 rounded-xl bg-[#2F8F46] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#176B35]"><Pencil className="h-3.5 w-3.5" /> Edit profile</button>
                ) : (
                  <button onClick={() => void updateProfile(() => communityApi.toggleFollow(profile.user.id))} className="inline-flex items-center gap-2 rounded-xl bg-[#2F8F46] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#176B35]"><UserPlus className="h-4 w-4" /> {profile.user.isFollowing ? "Following" : "Follow"}</button>
                )}
                {isOwnProfile ? (
                  <button onClick={() => router.push("/dashboard/users")} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-neutral-700 transition hover:border-[#2F8F46] hover:text-[#2F8F46] dark:border-neutral-700 dark:text-neutral-200"><LayoutDashboard className="h-4 w-4" /> Dashboard</button>
                ) : (
                  <button onClick={requireAuthentication} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-neutral-700 dark:border-neutral-700 dark:text-neutral-200"><MessageCircle className="h-4 w-4" /> Message</button>
                )}
              </div>
            </div>

            <p className="mt-5 max-w-2xl text-sm leading-6 text-neutral-600 dark:text-neutral-300">{localProfileInfo.bio}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#2F8F46]" /> {localProfileInfo.location}</span>
              <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-[#2F8F46]" /> Community member</span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3 border-y border-slate-200 py-4 dark:border-neutral-800">
              <span className="text-sm text-neutral-500"><strong className="mr-1 font-black text-neutral-900 dark:text-white">{profile.posts.length}</strong> posts</span>
              <span className="text-sm text-neutral-500"><strong className="mr-1 font-black text-neutral-900 dark:text-white">{profile.user.recipesCount}</strong> recipes</span>
              <button type="button" onClick={() => setSocialList("followers")} className="text-sm text-neutral-500 transition hover:text-[#2F8F46]"><strong className="mr-1 font-black text-neutral-900 dark:text-white">{profile.user.followersCount}</strong> followers</button>
              <button type="button" onClick={() => setSocialList("following")} className="text-sm text-neutral-500 transition hover:text-[#2F8F46]"><strong className="mr-1 font-black text-neutral-900 dark:text-white">{profile.followingCount}</strong> following</button>
            </div>
          </div>

          <nav className="flex overflow-x-auto border-t border-slate-200 px-4 sm:px-10 dark:border-neutral-800" aria-label="Profile sections">
            {['Overview', 'My Recipes', 'Saved', 'About'].map((tab) => (
              <button key={tab} type="button" onClick={() => setActiveTab(tab as typeof activeTab)} className={`shrink-0 border-b-2 px-4 py-4 text-sm font-bold transition first:pl-0 ${activeTab === tab ? 'border-[#2F8F46] text-[#2F8F46]' : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'}`}>{tab}</button>
            ))}
          </nav>
        </section>

        {activeTab === "Saved" ? (
          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 dark:border-neutral-800 dark:bg-[#121614] sm:p-6">
            <div className="flex items-center gap-3"><Heart className="h-6 w-6 text-[#FF6B6B]" /><div><h2 className="text-xl font-black">Saved posts & recipes</h2><p className="mt-1 text-sm text-neutral-500">Your saved community content appears here.</p></div></div>
            {profile.user.id !== session?.user?.id ? <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-sm text-neutral-500 dark:border-neutral-700">Saved posts are private.</div> : isLoadingSavedPosts ? <div className="mt-6 grid gap-5 sm:grid-cols-2">{[1, 2, 3, 4].map((item) => <div key={`saved-skeleton-${item}`} className="h-64 animate-pulse rounded-2xl bg-neutral-100 dark:bg-neutral-800" />)}</div> : savedPostsError ? <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-sm text-rose-600 dark:border-rose-900 dark:bg-rose-950/20 dark:text-rose-300">{savedPostsError}</div> : savedPosts.length === 0 ? <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-sm text-neutral-500 dark:border-neutral-700">No saved posts or recipes yet.</div> : <div className="mt-6 grid gap-5 sm:grid-cols-2">{savedPosts.map((post) => <article key={post.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-neutral-800 dark:bg-[#171B18]"><button type="button" onClick={() => post.recipe ? setSavedPostDetails(post) : setSelectedImage({ src: post.imageUrl, alt: "Saved FoodCanvas post" })} className="block w-full text-left"><img src={post.imageUrl} alt={post.recipe?.title || "Saved FoodCanvas post"} className="h-48 w-full object-cover transition duration-300 hover:scale-[1.02]" /></button><div className="p-4"><p className="line-clamp-2 text-sm font-bold">{post.recipe?.title || post.caption}</p><p className="mt-2 text-xs text-neutral-500">by {post.author.name}</p><button type="button" onClick={() => post.recipe ? setSavedPostDetails(post) : setSelectedImage({ src: post.imageUrl, alt: "Saved FoodCanvas post" })} className="mt-4 text-xs font-bold text-[#2F8F46] hover:underline">{post.recipe ? "View recipe details" : "View post image"}</button><button type="button" onClick={() => { setSavedPosts((current) => current.filter((savedPost) => savedPost.id !== post.id)); void communityApi.savePost(post.id); }} className="ml-4 mt-4 text-xs font-bold text-[#2F8F46] hover:underline">Remove from saved</button></div></article>)}</div>}
          </div>
        ) : activeTab === "About" ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-neutral-800 dark:bg-[#121614]"><div className="flex items-center justify-between gap-4"><h2 className="text-xl font-black">About {profile.user.name}</h2>{isOwnProfile && <button type="button" onClick={openEditProfile} aria-label="Edit about information" title="Edit about information" className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#2F8F46] transition hover:bg-[#EFF8E9] dark:hover:bg-[#17351F]"><Pencil className="h-4 w-4" /></button>}</div><p className="mt-4 text-sm leading-7 text-neutral-600 dark:text-neutral-300">{localProfileInfo.bio || "No bio added yet."}</p><div className="mt-6 space-y-4 text-sm text-neutral-500 dark:text-neutral-400"><p className="flex items-center gap-3"><MapPin className="h-5 w-5 text-[#2F8F46]" /> {localProfileInfo.location || "No location added yet."}</p><p className="flex items-center gap-3"><CalendarDays className="h-5 w-5 text-[#2F8F46]" /> Community member</p>{profile.user.badge && <p className="flex items-center gap-3"><Award className="h-5 w-5 text-[#FF9F43]" /> {profile.user.badge}</p>}</div></div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-neutral-800 dark:bg-[#121614]"><div className="flex items-center justify-between gap-4"><h2 className="text-xl font-black">Food interests</h2>{isOwnProfile && <button type="button" onClick={openEditProfile} aria-label="Edit food interests" title="Edit food interests" className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#2F8F46] transition hover:bg-[#EFF8E9] dark:hover:bg-[#17351F]"><Pencil className="h-4 w-4" /></button>}</div><div className="mt-5 flex flex-wrap gap-2">{localProfileInfo.interests.map((tag) => <span key={tag} className="rounded-full bg-[#EFF8E9] px-3 py-2 text-xs font-bold text-[#2F8F46] dark:bg-[#17351F] dark:text-[#B7E35F]">{tag}</span>)}</div></div>
          </div>
        ) : (
        <section className="mt-6 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-neutral-800 dark:bg-[#121614]">
              <div className="flex items-center justify-between"><h2 className="text-lg font-black">About {profile.user.name.split(' ')[0]}</h2>{isOwnProfile && <button type="button" onClick={openEditProfile} className="text-xs font-bold text-[#2F8F46] hover:underline">Edit</button>}</div>
              <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">{localProfileInfo.bio || "No bio added yet."}</p>
              <div className="mt-5 space-y-3 text-xs text-neutral-500 dark:text-neutral-400">
                <p className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-[#2F8F46]" /> {profile.user.recipesCount} recipes shared</p>
                {profile.user.badge && <p className="flex items-center gap-2"><Award className="h-4 w-4 text-[#FF9F43]" /> {profile.user.badge}</p>}
                {isOwnProfile && <p className="flex items-center gap-2"><Heart className="h-4 w-4 text-[#FF6B6B]" /> {profile.likesTotal ?? profile.posts.reduce((total, post) => total + post.likesCount, 0)} total likes</p>}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-neutral-800 dark:bg-[#121614]">
              <div className="flex items-center justify-between"><h2 className="text-lg font-black">Food interests</h2>{isOwnProfile && <button type="button" onClick={openEditProfile} className="text-xs font-bold text-[#2F8F46] hover:underline">Edit</button>}</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {localProfileInfo.interests.length > 0 ? localProfileInfo.interests.map((tag) => <span key={tag} className="rounded-full bg-[#EFF8E9] px-3 py-1.5 text-[11px] font-bold text-[#2F8F46] dark:bg-[#17351F] dark:text-[#B7E35F]">{tag}</span>) : <span className="text-xs text-neutral-500">No interests added yet.</span>}
              </div>
            </div>
          </aside>

          <div className="min-w-0 space-y-6">
            {isOwnProfile && <button type="button" onClick={() => setIsCreateRecipeOpen(true)} className="flex w-full items-center gap-3 rounded-3xl border border-[#2F8F46]/40 bg-[#EFF8E9] p-4 text-left transition hover:border-[#2F8F46] hover:bg-[#E4F5D8] dark:bg-[#13251A] dark:hover:bg-[#17351F]"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2F8F46] text-xl font-bold text-white">+</span><span><strong className="block text-sm font-black text-[#176B35] dark:text-[#B7E35F]">Share a recipe</strong><span className="text-xs text-neutral-500 dark:text-neutral-400">Post a dish, recipe or cooking tip</span></span></button>}
            {recipePosts[0] && <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-neutral-800 dark:bg-[#121614]">
              <div className="flex items-center justify-between px-5 py-4 sm:px-6"><div><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#2F8F46]">Featured recipe</p><h2 className="mt-1 text-lg font-black">A recipe worth trying</h2></div><Award className="h-5 w-5 text-[#FF9F43]" /></div>
              <div className="grid sm:grid-cols-[180px_minmax(0,1fr)]"><img src={recipePosts[0].imageUrl} alt={recipePosts[0].recipe?.title || 'Featured recipe'} className="h-44 w-full object-cover sm:h-full" /><div className="p-5"><h3 className="text-xl font-black">{recipePosts[0].recipe?.title || 'Community recipe'}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-500 dark:text-neutral-400">{recipePosts[0].caption}</p><div className="mt-4 flex flex-wrap gap-2">{recipePosts[0].tags.slice(0, 3).map((tag) => <span key={tag} className="rounded-full bg-[#FFF1D9] px-2.5 py-1 text-[11px] font-bold text-[#B96A00]">#{tag}</span>)}</div></div></div>
            </div>}

            <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-neutral-800 dark:bg-[#121614] sm:p-6">
              <div className="mb-5 flex items-center justify-between"><div><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#2F8F46]">{activeTab === "My Recipes" ? "Recipe shelf" : "Personal activity"}</p><h2 className="mt-1 text-xl font-black">{activeTab === "My Recipes" ? "My recipes" : "Recent posts"}</h2></div><button type="button" onClick={() => void loadMorePosts()} disabled={!hasMorePosts || isLoadingMorePosts} className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-neutral-600 transition hover:border-[#2F8F46] hover:text-[#2F8F46] disabled:cursor-default disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-300">{isLoadingMorePosts ? "Loading..." : hasMorePosts ? "View all" : "All posts loaded"}</button></div>
              {visiblePosts.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-sm text-neutral-500 dark:border-neutral-700">{activeTab === "My Recipes" ? "No recipes shared yet." : "No public posts yet."}</div> : <div className="space-y-7">{visiblePosts.map((post) => <div key={post.id} className="profile-post"><PostCard post={post} onLike={(postId) => void updateProfile(() => communityApi.toggleLike(postId))} onSave={(postId) => void updateProfile(() => communityApi.savePost(postId))} onShare={(postToShare) => void sharePost(postToShare)} onRate={() => undefined} onReport={() => undefined} onDelete={(postId) => void updateProfile(() => communityApi.deletePost(postId))} onEdit={async (postToEdit) => { const caption = window.prompt("Edit post caption", postToEdit.caption); if (caption?.trim()) await updateProfile(() => communityApi.updatePost(postToEdit.id, { caption: caption.trim() })); }} onTogglePin={(postId, isPinned) => void updateProfile(() => communityApi.updatePost(postId, { isPinned }))} onDirectMessage={() => requireAuthentication()} onToggleFollow={() => void updateProfile(() => communityApi.toggleFollow(profile.user.id))} onAddComment={(postId, content) => void updateProfile(() => communityApi.addComment(postId, content))} onLoadInteractions={loadPostInteractions} onMadeIt={(postId) => void updateProfile(() => communityApi.toggleMadeIt(postId))} currentUserId={session?.user?.id} isAuthenticated={Boolean(session?.user)} onRequireAuthentication={requireAuthentication} hasActiveStory={hasStories} onAuthorAvatarClick={hasStories ? () => setViewingStory(storyGroup[0] ?? null) : undefined} onImageClick={(imagePost) => setSelectedImage({ src: imagePost.imageUrl, alt: imagePost.recipe?.title || "FoodCanvas post" })} /></div>)}</div>}
            </div>
          </div>
        </section>)}
      </div>

      {isEditModalOpen && !isProfileCloseConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Edit profile" onClick={requestCloseEditProfile}>
          <div className="w-full max-w-lg rounded-3xl border border-neutral-700 bg-[#151916] p-6 text-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#B7E35F]">Personal details</p><h2 className="mt-1 text-xl font-black">Edit profile</h2></div><button type="button" onClick={requestCloseEditProfile} aria-label="Close edit profile" className="rounded-full p-2 text-neutral-400 hover:bg-white/10 hover:text-white"><X className="h-5 w-5" /></button></div>
            <div className="mt-6 space-y-4">
              <label className="block text-sm font-semibold">Display name<input value={editForm.name} onChange={(event) => setEditForm((current) => ({ ...current, name: event.target.value }))} className="mt-2 w-full rounded-xl border border-neutral-700 bg-[#0D100E] px-4 py-3 text-sm outline-none focus:border-[#2F8F46]" /></label>
              <label className="block text-sm font-semibold">Bio<textarea value={editForm.bio} onChange={(event) => setEditForm((current) => ({ ...current, bio: event.target.value }))} rows={3} className="mt-2 w-full resize-none rounded-xl border border-neutral-700 bg-[#0D100E] px-4 py-3 text-sm outline-none focus:border-[#2F8F46]" /></label>
              <label className="block text-sm font-semibold">Location<input value={editForm.location} onChange={(event) => setEditForm((current) => ({ ...current, location: event.target.value }))} className="mt-2 w-full rounded-xl border border-neutral-700 bg-[#0D100E] px-4 py-3 text-sm outline-none focus:border-[#2F8F46]" /></label>
              <label className="block text-sm font-semibold">Food interests<input value={editForm.interests} onChange={(event) => setEditForm((current) => ({ ...current, interests: event.target.value }))} className="mt-2 w-full rounded-xl border border-neutral-700 bg-[#0D100E] px-4 py-3 text-sm outline-none focus:border-[#2F8F46]" /></label>
            </div>
            {profileSaveError && <p className="mt-4 rounded-xl bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-300">{profileSaveError}</p>}
            <div className="mt-6 flex justify-end gap-3"><button type="button" onClick={requestCloseEditProfile} className="rounded-xl px-4 py-2.5 text-sm font-bold text-neutral-400 hover:text-white">Cancel</button><button type="button" disabled={isSavingProfile} onClick={async () => { setIsSavingProfile(true); setProfileSaveError(null); try { const interests = editForm.interests.split(",").map((item) => item.trim()).filter(Boolean); const response = await communityApi.updateProfile({ name: editForm.name, bio: editForm.bio, location: editForm.location, interests }); setProfile((current) => current ? { ...current, user: { ...current.user, name: response.profile.name, bio: response.profile.bio || "", location: response.profile.location || "", interests: response.profile.interests } } : current); setLocalProfileInfo({ bio: response.profile.bio || "", location: response.profile.location || "", interests: response.profile.interests }); setIsEditModalOpen(false); } catch (saveError) { setProfileSaveError(saveError instanceof Error ? saveError.message : "Unable to save profile changes"); } finally { setIsSavingProfile(false); } }} className="inline-flex items-center gap-2 rounded-xl bg-[#2F8F46] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#176B35] disabled:opacity-60"><Check className="h-4 w-4" /> {isSavingProfile ? "Saving..." : "Save changes"}</button></div>
          </div>
        </div>
      )}

      <UnsavedChangesModal
        isOpen={isProfileCloseConfirmOpen}
        title="Discard profile changes?"
        message="You have unsaved profile changes. Do you want to close this editor without saving?"
        onKeepEditing={() => setIsProfileCloseConfirmOpen(false)}
        onDiscard={() => { setIsProfileCloseConfirmOpen(false); setIsEditModalOpen(false); }}
      />

      {socialList && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={socialList === "followers" ? "Followers" : "Following"}>
          <div className="w-full max-w-md rounded-3xl border border-neutral-700 bg-[#151916] p-5 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#B7E35F]">Community connections</p><h2 className="mt-1 text-xl font-black">{socialList === "followers" ? "Followers" : "Following"}</h2></div><button type="button" onClick={() => setSocialList(null)} aria-label="Close connections" className="rounded-full p-2 text-neutral-400 hover:bg-white/10 hover:text-white"><X className="h-5 w-5" /></button></div>
            <div className="mt-4 space-y-2">{[profile.user, { ...profile.user, id: "preview-ahmed", name: "Ahmed", username: "ahmed520", isFollowing: false }, { ...profile.user, id: "preview-rahin", name: "Rahin", username: "rahin_chef", isFollowing: true }].slice(0, socialList === "followers" ? 2 : 3).map((person) => <div key={person.id} className="flex items-center gap-3 rounded-2xl p-3 transition hover:bg-white/5"><CommunityAvatar src={person.avatar} alt={person.name} className="h-11 w-11 rounded-full border border-neutral-700 object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{person.name}</p><p className="text-xs text-neutral-500">@{person.username}</p></div>{person.id !== profile.user.id && <button type="button" onClick={() => void updateProfile(() => communityApi.toggleFollow(person.id))} className="rounded-lg border border-[#2F8F46] px-3 py-1.5 text-xs font-bold text-[#B7E35F]">{person.isFollowing ? "Following" : "Follow"}</button>}</div>)}</div>
            <p className="mt-4 text-center text-[11px] text-neutral-500">Preview list for the final Supabase-connected version.</p>
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Full-size food image" onClick={() => setSelectedImage(null)}>
          <button type="button" onClick={() => setSelectedImage(null)} aria-label="Close full-size image" className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"><X className="h-6 w-6" /></button>
          <img src={selectedImage.src} alt={selectedImage.alt} className="max-h-[90vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl" onClick={(event) => event.stopPropagation()} />
        </div>
      )}

      {savedPostDetails?.recipe && <RecipeDetailsModal
        post={savedPostDetails}
        isOpen
        fullScreen
        onClose={() => setSavedPostDetails(null)}
        onLike={() => { void communityApi.toggleLike(savedPostDetails.id); }}
        onSave={() => { setSavedPosts((current) => current.filter((post) => post.id !== savedPostDetails.id)); setSavedPostDetails(null); void communityApi.savePost(savedPostDetails.id); }}
        onAddComment={async (content) => { await communityApi.addComment(savedPostDetails.id, content); }}
        onLoadComments={async () => (await communityApi.getPostInteractions(savedPostDetails.id, { commentsTake: 50 })).comments}
      />}

      <CreatePostModal isOpen={isCreateRecipeOpen} onClose={() => setIsCreateRecipeOpen(false)} onPublishPost={async (newPost, imageFile) => {
        const imageUrl = imageFile ? await communityApi.uploadImage(imageFile, "posts") : newPost.imageUrl;
        const createdPost = await communityApi.createPost({ ...newPost, imageUrl });
        setProfile((current) => current ? { ...current, posts: [createdPost, ...current.posts] } : current);
        setIsCreateRecipeOpen(false);
      }} />

      <StoryEditorModal file={storyEditorFile} isOpen={Boolean(storyEditorFile)} onClose={() => setStoryEditorFile(null)} onShare={async (editedFile, caption) => { const imageUrl = await communityApi.uploadImage(editedFile, "stories"); await communityApi.createStory(imageUrl, caption); await loadProfile(); }} />

      <StoryViewerModal
        key={viewingStory?.id ?? "profile-story-viewer"}
        story={viewingStory}
        isOpen={Boolean(viewingStory)}
        isOwnStory={viewingStory?.author.id === session?.user?.id}
        dashboardHref={session?.user ? "/dashboard/users" : "/registrationProcess/login"}
        profileHref={session?.user ? `/community/users/${encodeURIComponent(session.user.id)}` : "/registrationProcess/login"}
        profileImage={session?.user?.image}
        onOpenMessages={() => router.push("/community")}
        onClose={() => setViewingStory(null)}
        onSendMessage={async (recipientId, text) => { await communityApi.sendMessage(recipientId, text); }}
        onNextStory={handleNextStory}
        onPreviousStory={handlePreviousStory}
        storyCount={storyGroup.length || 1}
        storyIndex={storyIndex < 0 ? 0 : storyIndex}
        onDeleteStory={async (storyId) => {
          await communityApi.deleteStory(storyId);
          setViewingStory(null);
          await loadProfile();
        }}
      />
    </main>
  );
}

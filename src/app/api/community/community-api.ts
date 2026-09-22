import type {
  DirectMessageUser,
  NotificationItem,
  Author,
  Post,
  PublicCommunityProfile,
  RecipeCollection,
  Review,
  StoryItem,
  StoryViewer,
} from "@/components/community/types";

import { getApiBaseUrl } from "@/lib/api-url";

const API_BASE_URL = getApiBaseUrl();

interface ApiErrorBody {
  message?: string;
}

class CommunityApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
    this.name = "CommunityApiError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  const method = (init?.method || "GET").toUpperCase();

  // A Content-Type header on an otherwise simple GET forces a CORS preflight.
  // Community reads do not send a body, so leave the header out for those calls.
  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE_URL}/api/community${path}`, {
    ...init,
    credentials: "include",
    ...(method === "GET" ? { cache: "no-store" as const } : {}),
    headers,
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as ApiErrorBody;
    throw new CommunityApiError(body.message || `Community request failed (${response.status})`, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Unable to read the selected image"));
    reader.readAsDataURL(file);
  });
}

export interface CommunityMessage {
  id: string;
  senderId: string;
  recipientId: string;
  text: string;
  attachedPostId?: string | null;
  attachedStoryId?: string | null;
  attachedPost?: { id: string; imageUrl: string; caption: string } | null;
  attachedStory?: { id: string; imageUrl: string; caption: string } | null;
  timestamp: string;
}

export interface CommunityMessagesPage {
  messages: CommunityMessage[];
  hasMore: boolean;
}

export interface CommunityMessagesPageOptions {
  take?: number;
  skip?: number;
}

export interface CommunityPostsPageOptions {
  take?: number;
  skip?: number;
  filter?: "all" | "trending" | "following" | "quick" | "wellness" | "ai_sparks" | "saved" | "liked";
}

export interface CommunityPostInteractions {
  comments: Post["comments"];
  reviews: Post["reviews"];
}

export interface CommunityPostInteractionOptions {
  commentsTake?: number;
  commentsSkip?: number;
  reviewsTake?: number;
  reviewsSkip?: number;
}

export const communityApi = {
  async listPosts({ take, skip, filter }: CommunityPostsPageOptions = {}): Promise<Post[]> {
    const query = new URLSearchParams();
    if (take !== undefined) query.set("take", String(take));
    if (skip !== undefined) query.set("skip", String(skip));
    if (filter) query.set("filter", filter);
    const suffix = query.size ? `?${query.toString()}` : "";
    const response = await request<{ posts: Post[] }>(`/posts${suffix}`);
    return response.posts;
  },

  async listSuggestedChefs(): Promise<Author[]> {
    const response = await request<{ chefs: Author[] }>("/suggested-chefs");
    return response.chefs;
  },

  async listSuggestedTags(search: string): Promise<string[]> {
    const query = new URLSearchParams({ search });
    const response = await request<{ tags: string[] }>(`/suggested-tags?${query.toString()}`);
    return response.tags;
  },

  getFeedCounts(userId?: string) {
    const query = userId ? `?userId=${userId}` : "";
    return request<{ savedPostsCount: number; likedPostsCount: number }>(`/feed-counts${query}`);
  },

  async createPost(post: Post, userId: string): Promise<Post | null> {
    try {
      const response = await request<{ post: Post }>("/posts", {
        method: "POST",
        body: JSON.stringify({
          caption: post.caption,
          imageUrl: post.imageUrl,
          additionalImages: post.additionalImages,
          recipe: post.recipe,
          tags: post.tags,
          userId,
        }),
      });

      return response.post;
    } catch (error) {
      if (error instanceof CommunityApiError && error.status === 422) return null;
      throw error;
    }
  },

  toggleLike(postId: string, userId: string) {
    return request<{ active: boolean }>(`/posts/${postId}/like`, { method: "POST", body: JSON.stringify({ userId }) });
  },

  toggleMadeIt(postId: string, userId: string) {
    return request<{ active: boolean }>(`/posts/${postId}/made-it`, { method: "POST", body: JSON.stringify({ userId }) });
  },

  addComment(postId: string, content: string, userId: string, parentId?: string) {
    return request(`/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify({ content, userId, parentId }),
    });
  },

  updateComment(commentId: string, content: string) {
    return request(`/comments/${commentId}`, {
      method: "PATCH",
      body: JSON.stringify({ content }),
    });
  },

  deleteComment(commentId: string) {
    return request<{ deletedCount: number }>(`/comments/${commentId}`, { method: "DELETE" });
  },

  saveReview(postId: string, review: Review, userId: string) {
    return request(`/posts/${postId}/reviews`, {
      method: "POST",
      body: JSON.stringify({ ...review, userId }),
    });
  },

  toggleFollow(userIdToFollow: string, userId: string) {
    return request<{ active: boolean }>(`/users/${userIdToFollow}/follow`, { method: "POST", body: JSON.stringify({ userId }) });
  },

  async sharePost(postId: string, caption?: string, userId?: string, tags?: string[]): Promise<Post> {
    const response = await request<{ post: Post }>(`/posts/${postId}/share`, {
      method: "POST",
      body: JSON.stringify({ caption, tags, userId }),
    });
    return response.post;
  },

  async listConnections(userId: string, type: "followers" | "following"): Promise<Author[]> {
    const response = await request<{ users: Author[] }>(`/users/${userId}/connections?type=${type}`);
    return response.users;
  },

  async getPostInteractions(
    postId: string,
    options: CommunityPostInteractionOptions = {},
  ): Promise<CommunityPostInteractions> {
    const query = new URLSearchParams();
    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined) query.set(key, String(value));
    });
    const suffix = query.size ? `?${query.toString()}` : "";
    const response = await request<{ interactions: CommunityPostInteractions }>(`/posts/${postId}/interactions${suffix}`);
    return response.interactions;
  },

  async getPublicProfile(userId: string, options: { take?: number; skip?: number } = {}): Promise<PublicCommunityProfile> {
    const query = new URLSearchParams();
    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined) query.set(key, String(value));
    });
    const suffix = query.size ? `?${query.toString()}` : "";
    const response = await request<{ profile: PublicCommunityProfile }>(`/users/${userId}/profile${suffix}`);
    return response.profile;
  },

  async listCollections(userId?: string): Promise<RecipeCollection[]> {
    const query = userId ? `?userId=${userId}` : "";
    const response = await request<{ collections: RecipeCollection[] }>(`/collections${query}`);
    return response.collections;
  },

  async listSavedPosts({ take, skip }: CommunityPostsPageOptions = {}): Promise<{ posts: Post[]; hasMore: boolean }> {
    const query = new URLSearchParams();
    if (take !== undefined) query.set("take", String(take));
    if (skip !== undefined) query.set("skip", String(skip));
    const suffix = query.size ? `?${query.toString()}` : "";
    return request<{ posts: Post[]; hasMore: boolean }>(`/saved-posts${suffix}`);
  },

  createCollection(name: string, description: string, userId: string) {
    return request("/collections", {
      method: "POST",
      body: JSON.stringify({ name, description, userId }),
    });
  },

  savePost(postId: string, collectionId: string | undefined, userId: string) {
    return request<{ active: boolean }>(`/posts/${postId}/save`, {
      method: "POST",
      body: JSON.stringify({ collectionId, userId }),
    });
  },

  reportPost(postId: string, reason: string, details: string, userId: string) {
    return request(`/posts/${postId}/reports`, {
      method: "POST",
      body: JSON.stringify({ reason, details, userId }),
    });
  },

  deletePost(postId: string, userId: string) {
    return request<void>(`/posts/${postId}`, { method: "DELETE", body: JSON.stringify({ userId }) });
  },

  updatePost(postId: string, data: { caption?: string; tags?: string[]; isPinned?: boolean }, userId: string) {
    return request<void>(`/posts/${postId}`, { method: "PATCH", body: JSON.stringify({ ...data, userId }) });
  },

  async listStories(): Promise<StoryItem[]> {
    const response = await request<{ stories: StoryItem[] }>("/stories");
    return response.stories;
  },

  async createStory(imageUrl: string, caption: string | undefined, userId: string): Promise<{ story: StoryItem } | null> {
    try {
      return await request<{ story: StoryItem }>("/stories", {
        method: "POST",
        body: JSON.stringify({ imageUrl, caption, userId }),
      });
    } catch (error) {
      if (error instanceof CommunityApiError && error.status === 422) return null;
      throw error;
    }
  },

  deleteStory(storyId: string, userId: string) {
    return request<void>(`/stories/${storyId}`, { method: "DELETE", body: JSON.stringify({ userId }) });
  },

  recordStoryView(storyId: string) {
    return request<{ viewed: { alreadyRecorded: boolean } }>(`/stories/${storyId}/view`, { method: "POST" });
  },

  async listStoryViewers(storyId: string): Promise<StoryViewer[]> {
    const response = await request<{ viewers: StoryViewer[] }>(`/stories/${storyId}/viewers`);
    return response.viewers;
  },

  reactToStory(storyId: string) {
    return request<{ active: true }>(`/stories/${storyId}/reaction`, { method: "POST" });
  },

  async listNotifications(): Promise<NotificationItem[]> {
    const response = await request<{ notifications: NotificationItem[] }>("/notifications");
    return response.notifications;
  },

  markNotificationRead(notificationId: string, userId: string) {
    return request(`/notifications/${notificationId}/read`, { method: "PATCH", body: JSON.stringify({ userId }) });
  },

  async uploadImage(file: File, folder: "posts" | "stories" | "profiles", userId: string): Promise<string> {
    const maxImageBytes = 6 * 1024 * 1024;
    if (file.size > maxImageBytes) {
      throw new Error("Image must be 6 MB or smaller");
    }

    const dataUrl = await fileToDataUrl(file);
    const response = await request<{ url: string }>("/uploads", {
      method: "POST",
      body: JSON.stringify({ dataUrl, folder, userId }),
    });

    return response.url;
  },

  updateProfile(data: { name?: string; bio?: string; location?: string; interests?: string[]; image?: string; coverImage?: string }, userId: string) {
    return request<{ profile: { id: string; name: string; image: string | null; bio: string | null; location: string | null; interests: string[]; coverImage: string | null } }>("/users/me/profile", {
      method: "PATCH",
      body: JSON.stringify({ ...data, userId }),
    });
  },

  async listContacts(includeUserId?: string): Promise<DirectMessageUser[]> {
    const query = includeUserId ? `?includeUserId=${encodeURIComponent(includeUserId)}` : "";
    const response = await request<{ contacts: DirectMessageUser[] }>(`/messages/contacts${query}`);
    return response.contacts;
  },

  async listMessages(userId: string, options: CommunityMessagesPageOptions = {}): Promise<CommunityMessagesPage> {
    const params = new URLSearchParams();
    if (options.take !== undefined) params.set("take", String(options.take));
    if (options.skip !== undefined) params.set("skip", String(options.skip));
    const query = params.size ? `?${params.toString()}` : "";
    return request<CommunityMessagesPage>(`/messages/${userId}${query}`);
  },

  async getStory(storyId: string): Promise<StoryItem> {
    const response = await request<{ story: StoryItem }>(`/stories/${encodeURIComponent(storyId)}`);
    return response.story;
  },

  async getPost(postId: string): Promise<Post> {
    const response = await request<{ post: Post }>(`/posts/${encodeURIComponent(postId)}`);
    return response.post;
  },

  markMessagesRead(userId: string) {
    return request<{ success: boolean }>(`/messages/${userId}/read`, { method: "POST" });
  },

  sendMessage(recipientId: string, text: string, attachedPostId: string | undefined, userId: string, attachedStoryId?: string) {
    return request(`/messages/${recipientId}`, {
      method: "POST",
      body: JSON.stringify({ text, attachedPostId, attachedStoryId, userId }),
    });
  },
};

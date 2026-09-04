export interface Author {
  id: string;
  name: string;
  username: string;
  avatar: string;
  badge?: string; // e.g. "Verified Chef", "Top Contributor", "Healthy Foodie"
  role: 'user' | 'creator' | 'chef' | 'admin';
  followersCount: number;
  isFollowing?: boolean;
  recipesCount: number;
}

export interface Ingredient {
  name: string;
  amount: string;
  optional?: boolean;
}

export interface CookingStep {
  stepNumber: number;
  instruction: string;
  durationMinutes?: number;
  tip?: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  fiber?: number;
}

export interface RecipeDetail {
  title: string;
  cuisine: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  dietaryTags: string[];
  ingredients: Ingredient[];
  steps: CookingStep[];
  nutrition: NutritionInfo;
  sourceType?: 'community' | 'ai_generated' | 'mealdb';
  mealDbId?: string;
}

export interface RatingBreakdown {
  overall: number; // 1 to 5
  flavor: number;
  ease: number;
  presentation: number;
  totalReviews: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userBadge?: string;
  rating: number; // 1-5
  flavorRating?: number;
  easeRating?: number;
  presentationRating?: number;
  comment: string;
  cookingTips?: string;
  madeItPhoto?: string;
  createdAt: string;
  likesCount: number;
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
  likesCount: number;
  isLiked?: boolean;
  replies?: Comment[];
}

export interface Post {
  id: string;
  author: Author;
  caption: string;
  imageUrl: string;
  additionalImages?: string[];
  recipe?: RecipeDetail;
  rating: RatingBreakdown;
  likesCount: number;
  isLiked: boolean;
  savesCount: number;
  isSaved: boolean;
  commentsCount: number;
  comments: Comment[];
  reviews: Review[];
  madeItCount: number; // Users who clicked "I made this!"
  hasMadeIt?: boolean;
  tags: string[];
  createdAt: string;
  isChallengeEntry?: boolean;
  challengeName?: string;
  isPinned?: boolean;
}

export interface StoryItem {
  id: string;
  author: Author;
  imageUrl: string;
  caption: string;
  tag?: string;
  viewed?: boolean;
  timestamp: string;
}

export interface PublicCommunityProfile {
  user: Author;
  posts: Post[];
  stories: StoryItem[];
  followingCount: number;
  postsTotal?: number;
  likesTotal?: number;
  hasMorePosts?: boolean;
}

export interface RecipeCollection {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  recipeCount: number;
  isPrivate?: boolean;
}

export interface ReportReason {
  id: string;
  label: string;
  description: string;
}

export interface NotificationItem {
  id: string;
  type: 'like' | 'comment' | 'review' | 'follow' | 'challenge' | 'mention';
  user: Author;
  text: string;
  targetPostId?: string;
  timeAgo: string;
  read: boolean;
}

export interface DirectMessageUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  online: boolean;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount?: number;
}

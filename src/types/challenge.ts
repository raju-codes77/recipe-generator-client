export interface Challenge {
  id: string;
  title: string;
  description: string;
  durationDays: number;
  difficulty: string;
  rewardPoints: number;
  coverImage?: string;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: {
    participants: number;
  };
  days?: ChallengeDay[];
  participants?: ChallengeParticipant[]; // full list (admin use)
  myParticipant?: ChallengeParticipant;  // the current user's own participation
}

export interface ChallengeDay {
  id: string;
  challengeId: string;
  dayNumber: number;
  title: string;
  description: string;
  mealId?: string;
  recipeName?: string;
}

export interface ChallengeParticipant {
  id: string;
  challengeId: string;
  userId: string;
  status: 'ACTIVE' | 'COMPLETED' | 'DROPPED' | 'EXPIRED';
  joinedAt: string;
  completedAt?: string;
  lastCompletedAt?: string;
  currentDay: number;
  completedDays: number;
  totalDays: number;
  completionPercentage: number;
  currentStreak: number;
  longestStreak: number;
  progress: number;
}

export interface ChallengeMissionPoint {
  title: string;
  description: string;
  day?: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  createdAt: string;
}

export interface UserBadge {
  id: string;
  userId: string;
  badgeId: string;
  earnedAt: string;
  badge?: Badge;
}

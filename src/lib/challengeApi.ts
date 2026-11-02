import { Challenge, ChallengeDay, ChallengeParticipant, Badge } from "../types/challenge";
import { apiClient } from "./api-client";

export interface PaginatedChallengeResponse {
  challenges: Challenge[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export async function getPaginatedChallenges(params?: { status?: string; search?: string; sort?: string; mine?: boolean; participantStatus?: string; userId?: string; page?: number; limit?: number }): Promise<PaginatedChallengeResponse> {
  const query = new URLSearchParams();
  if (params?.status) query.append("status", params.status);
  if (params?.search) query.append("search", params.search);
  if (params?.sort) query.append("sort", params.sort);
  if (params?.mine) query.append("mine", "true");
  if (params?.participantStatus) query.append("participantStatus", params.participantStatus);
  if (params?.userId) query.append("userId", params.userId);
  if (params?.page) query.append("page", params.page.toString());
  if (params?.limit) query.append("limit", params.limit.toString());
  
  const queryString = query.toString();
  const endpoint = queryString ? `/challenges?${queryString}` : `/challenges`;

  const data = await apiClient.get<any>(endpoint, { cache: "no-store" });
  
  const challenges: Challenge[] = data.challenges || [];
  const mapped = challenges.map((c: any) => ({
    ...c,
    myParticipant: c.participants && c.participants.length > 0 ? c.participants[0] : undefined
  }));

  return {
    challenges: mapped,
    pagination: data.pagination || { page: 1, limit: 6, total: mapped.length, totalPages: 1, hasNextPage: false, hasPreviousPage: false }
  };
}

// Keep the old function signature for existing callers to avoid breaking them
export async function getChallenges(params?: { status?: string; search?: string; sort?: string; mine?: boolean; participantStatus?: string; userId?: string }): Promise<Challenge[]> {
  const data = await getPaginatedChallenges(params);
  return data.challenges;
}

export async function getFeaturedChallenge(): Promise<Challenge | null> {
  const data = await apiClient.get<any>("/challenges/featured", { cache: "no-store" });
  return data.challenges && data.challenges.length > 0 ? data.challenges[0] : null;
}

export async function getChallengeById(id: string): Promise<Challenge> {
  const data = await apiClient.get<any>(`/challenges/${id}`, { cache: "no-store" });
  return data.challenge;
}

export async function generateChallenges(forceMore?: boolean): Promise<Challenge[]> {
  const data = await apiClient.post<any>("/challenges/generate", { forceMore }, { cache: "no-store" });
  return data.challenges || [];
}

export async function getChallengeProgress(userId?: string): Promise<{ totalParticipated: number; completedChallenges: number; streak: number; xp: number }> {
  const endpoint = userId ? `/challenges/user/progress?userId=${userId}` : `/challenges/user/progress`;
  const data = await apiClient.get<any>(endpoint, { cache: "no-store" });
  return data.progress;
}

export async function getLeaderboard(): Promise<any[]> {
  const data = await apiClient.get<any>("/challenges/global/leaderboard", { cache: "no-store" });
  return data.leaderboard;
}

export async function getBadges(userId?: string): Promise<any[]> {
  const endpoint = userId ? `/challenges/user/badges?userId=${userId}` : `/challenges/user/badges`;
  const data = await apiClient.get<any>(endpoint, { cache: "no-store" });
  return data.badges;
}

export async function joinChallenge(id: string, userId: string): Promise<any> {
  return await apiClient.post<any>(`/challenges/${id}/join`, { userId }, { cache: "no-store" });
}

export async function getChallengeParticipant(challengeId: string, userId: string): Promise<any> {
  try {
    const data = await apiClient.get<any>(`/challenges/${challengeId}/participant?userId=${userId}`, { cache: "no-store" });
    return data.participant ?? null;
  } catch {
    return null;
  }
}

export async function completeChallengeDay(challengeId: string, dayId: string, userId: string): Promise<any> {
  return await apiClient.post<any>(`/challenges/${challengeId}/days/${dayId}/complete`, { userId }, { cache: "no-store" });
}

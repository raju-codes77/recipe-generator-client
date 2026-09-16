import { Challenge, ChallengeDay, ChallengeParticipant, Badge } from "../types/challenge";

import { getApiBaseUrl } from "./api-url";

const API_BASE_URL = `${getApiBaseUrl()}/api`;

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
  const url = queryString ? `${API_BASE_URL}/challenges?${queryString}` : `${API_BASE_URL}/challenges`;

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch challenges");
  const data = await res.json();
  
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
  const res = await fetch(`${API_BASE_URL}/challenges/featured`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch featured challenge");
  const data = await res.json();
  return data.challenges && data.challenges.length > 0 ? data.challenges[0] : null;
}

export async function getChallengeById(id: string): Promise<Challenge> {
  const res = await fetch(`${API_BASE_URL}/challenges/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch challenge");
  const data = await res.json();
  return data.challenge;
}

export async function generateChallenges(forceMore?: boolean): Promise<Challenge[]> {
  const res = await fetch(`${API_BASE_URL}/challenges/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ forceMore }),
    cache: "no-store"
  });
  if (!res.ok) {
    const errText = await res.text();
    console.error("Generate challenges failed. Status:", res.status, "Body:", errText);
    throw new Error(`Failed to generate challenges: ${res.status} ${errText}`);
  }
  const data = await res.json();
  return data.challenges || [];
}

export async function getChallengeProgress(userId?: string): Promise<{ totalParticipated: number; completedChallenges: number; streak: number; xp: number }> {
  const url = userId ? `${API_BASE_URL}/challenges/user/progress?userId=${userId}` : `${API_BASE_URL}/challenges/user/progress`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch progress");
  const data = await res.json();
  return data.progress;
}

export async function getLeaderboard(): Promise<any[]> {
  const res = await fetch(`${API_BASE_URL}/challenges/global/leaderboard`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch leaderboard");
  const data = await res.json();
  return data.leaderboard;
}

export async function getBadges(userId?: string): Promise<any[]> {
  const url = userId ? `${API_BASE_URL}/challenges/user/badges?userId=${userId}` : `${API_BASE_URL}/challenges/user/badges`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch badges");
  const data = await res.json();
  return data.badges;
}

export async function joinChallenge(id: string, userId: string): Promise<any> {
  const res = await fetch(`${API_BASE_URL}/challenges/${id}/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
    cache: "no-store"
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || "Failed to join challenge");
  }
  return res.json();
}

export async function getChallengeParticipant(challengeId: string, userId: string): Promise<any> {
  try {
    const res = await fetch(`${API_BASE_URL}/challenges/${challengeId}/participant?userId=${userId}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.participant ?? null;
  } catch {
    return null;
  }
}

export async function completeChallengeDay(challengeId: string, dayId: string, userId: string): Promise<any> {
  const res = await fetch(`${API_BASE_URL}/challenges/${challengeId}/days/${dayId}/complete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
    cache: "no-store"
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || "Failed to complete challenge day");
  }
  return res.json();
}

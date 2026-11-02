import { apiClient } from "@/lib/api-client";

export const analyzeMeal = async (file: File, userId?: string) => {
    const formData = new FormData();
    formData.append("image", file);
    
    // Add localDate for timezone-aware grouping
    const localDate = new Date().toLocaleDateString("en-CA"); // "YYYY-MM-DD" in local timezone
    formData.append("localDate", localDate);

    if (userId) {
        formData.append("userId", userId);
    }

    try {
        const data = await apiClient.post<any>("/meals/analyze", formData);
        return data;
    } catch (error: any) {
        let errorMessage = "Failed to analyze meal";
        if (error.data) {
            errorMessage = error.data.error || error.data.message || error.message;
        } else {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
};

// Common fetch helper with credentials
const fetchApi = async (path: string, options: RequestInit = {}) => {
    try {
        const method = options.method || "GET";
        const data = options.body ? JSON.parse(options.body as string) : undefined;
        
        if (method === "GET") {
            return await apiClient.get<any>(path, options);
        } else if (method === "POST") {
            return await apiClient.post<any>(path, data, options);
        } else if (method === "PUT") {
            return await apiClient.put<any>(path, data, options);
        } else if (method === "PATCH") {
            return await apiClient.patch<any>(path, data, options);
        } else if (method === "DELETE") {
            return await apiClient.delete<any>(path, options);
        }
    } catch (err: any) {
        throw new Error(err.message || `API Error`);
    }
};

export const getUserGoal = async (userId: string) => {
    try {
        if (!userId) return null;
        const data = await fetchApi(`/api/users/goal?userId=${userId}`);
        return data?.dailyKcal || null;
    } catch (error) {
        console.error("Error fetching user goal:", error);
        return null;
    }
};

export const updateUserGoal = async (goal: number, userId: string) => {
    try {
        if (!userId) throw new Error("Unauthorized");
        const data = await fetchApi("/api/users/goal", {
            method: "PUT",
            body: JSON.stringify({ dailyKcal: goal, userId }),
        });
        return data;
    } catch (error) {
        console.error("Error saving goal:", error);
        throw new Error("Failed to save goal");
    }
};

export const getMealLog = async (userId: string, date?: string) => {
    try {
        if (!userId) return [];
        const query = date ? `?date=${date}&userId=${userId}` : `?userId=${userId}`;
        const data = await fetchApi(`/api/users/meals${query}`);
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Error fetching meal log:", error);
        return [];
    }
};

export const saveMealLog = async (meals: any[], userId: string) => {
    // With a real backend, meals are saved during analyzeMeal. 
    // This frontend helper might not be needed anymore, but keeping it for compat.
    return meals;
};

// ─── Daily Calendar History──────────

export interface DayEntry {
    date: string;   // "YYYY-MM-DD"
    kcal: number;
    protein: number;
}

export const getDailyHistory = async (userId: string): Promise<Record<string, DayEntry>> => {
    try {
        if (!userId) return {};
        const data = await fetchApi(`/api/users/daily-history?userId=${userId}`);
        return data || {};
    } catch (error) {
        console.error("Error fetching daily history:", error);
        return {};
    }
};

export const saveDayEntry = async (entry: DayEntry, userId: string): Promise<void> => {
    try {
        if (!userId) return;
        await fetchApi("/api/users/daily-history", {
            method: "POST",
            body: JSON.stringify({
                date: entry.date,
                kcal: entry.kcal,
                protein: entry.protein,
                userId,
            }),
        });
    } catch (error) {
        console.error("Failed to save day entry:", error);
    }
};
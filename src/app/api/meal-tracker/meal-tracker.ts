export const analyzeMeal = async (file: File, userId?: string) => {
    const formData = new FormData();
    formData.append("image", file);
    
    // Add localDate for timezone-aware grouping
    const localDate = new Date().toLocaleDateString("en-CA"); // "YYYY-MM-DD" in local timezone
    formData.append("localDate", localDate);

    if (userId) {
        formData.append("userId", userId);
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const response = await fetch(`${apiUrl}/api/meals/analyze`, {
        method: "POST",
        body: formData,
        credentials: "include", // ← CRITICAL: send session cookie so backend can identify the user
    });

    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        throw new Error(`Server returned an invalid response: ${text.slice(0, 200)}`);
    }

    const data = await response.json();
    if (!response.ok) {
        let errorMessage = "Failed to analyze meal";
        if (data.error) {
            errorMessage = typeof data.error === "object" ? data.error.message || JSON.stringify(data.error) : data.error;
        } else if (data.message) {
            errorMessage = typeof data.message === "object" ? data.message.message || JSON.stringify(data.message) : data.message;
        }
        throw new Error(errorMessage);
    }

    return data;
};

// Common fetch helper with credentials
const fetchApi = async (path: string, options: RequestInit = {}) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const res = await fetch(`${apiUrl}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        credentials: "include", // Send session cookies
    });
    
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `API Error: ${res.statusText}`);
    }
    return res.json();
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
export const analyzeMeal = async (file: File) => {
    const formData = new FormData();

    formData.append("image", file);

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/meals/analyze`,
        {
            method: "POST",
            body: formData,
        }
    );

    const contentType = response.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
        const text = await response.text();

        console.error("Non-JSON response:", text);

        throw new Error(
            `Server returned an invalid response: ${text.slice(0, 200)}`
        );
    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            data.message ||
            "Failed to analyze meal"
        );
    }

    return data;
};

export const getUserGoal = async (userId: string) => {
    try {
        if (typeof window !== "undefined" && userId) {
            const saved = localStorage.getItem(`user_goal_${userId}`);
            if (saved) {
                return Number(saved);
            }
        }
        return null;
    } catch (error) {
        console.error("Error fetching user goal:", error);
        return null;
    }
};

export const updateUserGoal = async (goal: number, userId: string) => {
    try {
        if (typeof window !== "undefined" && userId) {
            localStorage.setItem(`user_goal_${userId}`, goal.toString());
            return { dailyKcal: goal };
        }
        throw new Error("Cannot save locally");
    } catch (error) {
        throw new Error("Failed to save goal");
    }
};

export const getMealLog = async (userId: string) => {
    try {
        if (typeof window !== "undefined" && userId) {
            const saved = localStorage.getItem(`meal_log_${userId}`);
            if (saved) {
                return JSON.parse(saved);
            }
        }
        return [];
    } catch (error) {
        console.error("Error fetching meal log:", error);
        return [];
    }
};

export const saveMealLog = async (meals: any[], userId: string) => {
    try {
        if (typeof window !== "undefined" && userId) {
            localStorage.setItem(`meal_log_${userId}`, JSON.stringify(meals));
        }
        return meals;
    } catch (error) {
        console.error("Error saving meal log:", error);
        throw new Error("Failed to save meal log locally");
    }
};

// ─── Daily Calendar History──────────

export interface DayEntry {
    date: string;   // "YYYY-MM-DD"
    kcal: number;
    protein: number;
}

export const getDailyHistory = async (userId: string): Promise<Record<string, DayEntry>> => {
    try {
        if (typeof window !== "undefined" && userId) {
            const saved = localStorage.getItem(`daily_history_${userId}`);
            if (saved) return JSON.parse(saved);
        }
        return {};
    } catch {
        return {};
    }
};

export const saveDayEntry = async (entry: DayEntry, userId: string): Promise<void> => {
    try {
        if (typeof window !== "undefined" && userId) {
            const history = await getDailyHistory(userId);
            history[entry.date] = entry;
            localStorage.setItem(`daily_history_${userId}`, JSON.stringify(history));
        }
    } catch {
        console.error("Failed to save day entry");
    }
};
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

export const getUserGoal = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/goal`, {
            credentials: "include",
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data?.dailyKcal ?? null;
    } catch (error) {
        console.error("Error fetching user goal:", error);
        return null;
    }
};

export const updateUserGoal = async (goal: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/goal`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dailyKcal: goal }),
    });
    if (!res.ok) throw new Error("Failed to save goal");
    return await res.json();
};

export const getMealLog = async (userId: string = "default_user") => {
    try {
        if (typeof window !== "undefined") {
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

export const saveMealLog = async (meals: any[], userId: string = "default_user") => {
    try {
        if (typeof window !== "undefined") {
            localStorage.setItem(`meal_log_${userId}`, JSON.stringify(meals));
        }
        return meals;
    } catch (error) {
        console.error("Error saving meal log:", error);
        throw new Error("Failed to save meal log locally");
    }
};

// ─── Daily Calendar History ───────────────────────────────────────────────────

export interface DayEntry {
    date: string;   // "YYYY-MM-DD"
    kcal: number;
    protein: number;
}

export const getDailyHistory = async (): Promise<Record<string, DayEntry>> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/daily-history`, {
            credentials: "include",
        });
        if (!res.ok) return {};
        return await res.json();
    } catch {
        return {};
    }
};

export const saveDayEntry = async (entry: DayEntry): Promise<void> => {
    try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/daily-history`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(entry),
        });
    } catch {
        console.error("Failed to save day entry");
    }
};
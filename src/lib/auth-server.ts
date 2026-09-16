import { cookies } from "next/headers";

export interface UserSession {
  session: {
    id: string;
    userId: string;
    token: string;
    expiresAt: string;
    createdAt: string;
    updatedAt: string;
    ipAddress?: string | null;
    userAgent?: string | null;
  };
  user: {
    id: string;
    email: string;
    name?: string;
    role?: string;
    image?: string | null;
    [key: string]: any;
  };
}

export async function getServerSession(): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    if (!allCookies || allCookies.length === 0) {
      return null;
    }

    const cookieHeader = allCookies.map((c) => `${c.name}=${c.value}`).join("; ");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    const res = await fetch(`${apiUrl}/api/auth/get-session`, {
      headers: {
        cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    if (!data || !data.user) {
      return null;
    }

    return data as UserSession;
  } catch (error) {
    console.error("Error fetching server session:", error);
    return null;
  }
}

export function isUserAdmin(session: UserSession | null): boolean {
  if (!session?.user) return false;
  return String(session.user.role || "").trim().toLowerCase() === "admin";
}

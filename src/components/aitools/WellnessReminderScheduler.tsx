"use client";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { apiClient, ApiError } from "@/lib/api-client";

interface WellnessPreference {
  enabled: boolean;
  frequency: string;
  categories: string[];
}

export default function WellnessReminderScheduler() {
  const { data: session } = authClient.useSession();
  const [preference, setPreference] = useState<WellnessPreference | null>(null);
  
  // Track if we've successfully shown a tip recently to avoid consecutive dupes
  const lastShownRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!session?.user) {
      setPreference(null);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    // Fetch preferences on mount or when session changes
    const fetchPreferences = async () => {
      try {
        const data = await apiClient.get<WellnessPreference>("/wellness-reminders/preferences");
        setPreference(data);
      } catch (err) {
        if (err instanceof ApiError && err.status === 0) return;
        console.error("Failed to load wellness preferences", err);
      }
    };

    fetchPreferences();
  }, [session?.user]);

  useEffect(() => {
    if (!preference || !preference.enabled) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    const checkAndShowReminder = async () => {
      try {
        const data = await apiClient.get<any>("/wellness-reminders/generate");
          
        if (data.tip && Date.now() - lastShownRef.current > 20000) {
          lastShownRef.current = Date.now();
          
          // Show toast
          toast.custom(
            (t) => (
              <div
                className={`${
                  t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-sm w-full bg-white dark:bg-slate-800 shadow-xl rounded-2xl pointer-events-auto flex ring-1 ring-black/5 dark:ring-white/10 overflow-hidden`}
              >
                <div className="flex-1 w-0 p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                      <span className="text-2xl">🤖</span>
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        AI Wellness Tip
                      </p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                        {data.tip}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex border-l border-gray-200 dark:border-slate-700">
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-full border border-transparent rounded-none rounded-r-2xl p-4 flex items-center justify-center text-sm font-semibold text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Got it
                  </button>
                </div>
              </div>
            ),
            { duration: 10000 } // show for 10 seconds
          );
        }
      } catch (error: any) {
        if (error?.status === 0 || error?.status === 429) return;
        console.error("Wellness generation request failed", error);
      }
    };

    // Calculate check interval
    let checkIntervalMs = 10000; // Check every 10 seconds to support 30s test option
    
    // Initial check after 10 seconds of active browsing
    const initialTimeout = setTimeout(() => {
      checkAndShowReminder();
    }, 10000);

    intervalRef.current = setInterval(checkAndShowReminder, checkIntervalMs);

    return () => {
      clearTimeout(initialTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [preference]);

  return null;
}

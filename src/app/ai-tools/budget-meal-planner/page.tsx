"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BudgetMealPlannerRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/ai-tools/meal-planner");
  }, [router]);
  return (
    <div className="min-h-screen flex items-center justify-center text-zinc-400 text-sm">
      Redirecting to Smart Meal Planner...
    </div>
  );
}

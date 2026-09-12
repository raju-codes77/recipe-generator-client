"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BudgetMealPlannerRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/meal-planner");
  }, [router]);
  return (
    <div className="min-h-screen flex items-center justify-center text-zinc-400 text-sm">
      Redirecting to Budget AI Meal Planner...
    </div>
  );
}

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LeftoverRescueRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/ai-tools/ingredient-rescue?mode=leftover");
  }, [router]);
  return (
    <div className="min-h-screen flex items-center justify-center text-zinc-400 text-sm">
      Redirecting to AI Ingredient Rescue...
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

export default function DashboardRootPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      const loginUrl = new URL("/registrationProcess/login", window.location.href);
      loginUrl.searchParams.set("callbackUrl", pathname);
      router.push(loginUrl.pathname + loginUrl.search);
      return;
    }

    const isAdmin = String((session.user as any).role || "").trim().toLowerCase() === "admin";
    if (isAdmin) {
      router.push("/dashboard/admin");
    } else {
      router.push("/dashboard/users");
    }
  }, [session, isPending, router, pathname]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-green-600" />
    </div>
  );
}

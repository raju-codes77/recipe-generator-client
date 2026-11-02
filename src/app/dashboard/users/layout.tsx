"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    }
  }, [session, isPending, router, pathname]);

  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  // Prevent flash of content for admins or logged-out users before redirect happens
  if (!session?.user || String((session.user as any).role || "").trim().toLowerCase() === "admin") {
    return null;
  }

  return <>{children}</>;
}

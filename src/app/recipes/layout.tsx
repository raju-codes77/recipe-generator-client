"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

export default function RecipesLayout({
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
    }
  }, [session, isPending, router, pathname]);

  if (isPending) {
    return (
      <div className="flex min-h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  // Prevent flash of content
  if (!session?.user) {
    return null;
  }

  return <>{children}</>;
}

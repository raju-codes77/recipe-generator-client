"use client";

import { useRouter } from "next/navigation";
import { SendDirectMessageModal } from "@/components/community/SendDirectMessageModal";

export default function CommunityMessagesPage() {
  const router = useRouter();

  return <SendDirectMessageModal isOpen onClose={() => router.back()} />;
}

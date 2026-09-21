import type { Metadata } from "next";
import { CommunityMessenger } from "@/components/community/CommunityMessenger";

export const metadata: Metadata = {
  title: "Community Messenger | FoodCanvas",
  description: "Message and share recipes with FoodCanvas Community members.",
};

export default async function CommunityMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ userId?: string | string[] }>;
}) {
  const params = await searchParams;
  const userId = Array.isArray(params.userId) ? params.userId[0] : params.userId;

  return <CommunityMessenger initialRecipientId={userId} />;
}

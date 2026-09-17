"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { communityApi } from "@/app/api/community/community-api";
import { StoryItem } from "@/components/community/types";
import { StoryViewerModal } from "@/components/community/StoryViewerModal";

export default function CommunityStoryPage() {
  const params = useParams<{ storyId: string }>();
  const router = useRouter();
  const [story, setStory] = useState<StoryItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.storyId) return;
    void communityApi.getStory(params.storyId).then(setStory).catch((reason) => {
      setError(reason instanceof Error ? reason.message : "Unable to open this story");
    });
  }, [params.storyId]);

  if (error) return <div className="p-8 text-center text-sm text-rose-600">{error}</div>;
  if (!story) return <div className="p-8 text-center text-sm text-neutral-500">Opening story...</div>;

  return <StoryViewerModal story={story} isOpen onClose={() => router.back()} isOwnStory={false} />;
}

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { communityApi } from "@/app/api/community/community-api";
import { StoryItem } from "@/components/community/types";
import { StoryViewerModal } from "@/components/community/StoryViewerModal";
import toast from "react-hot-toast";

export default function CommunityStoryPage() {
  const params = useParams<{ storyId: string }>();
  const router = useRouter();
  const [story, setStory] = useState<StoryItem | null>(null);
  const [isUnavailable, setIsUnavailable] = useState(false);

  useEffect(() => {
    if (!params.storyId) return;
    void communityApi.getStory(params.storyId).then(setStory).catch(() => {
      setIsUnavailable(true);
      toast.error("This story is no longer available.", { position: "bottom-right" });
    });
  }, [params.storyId, router]);

  if (isUnavailable) return null;
  if (!story) return <div className="p-8 text-center text-sm text-neutral-500">Opening story...</div>;

  return <StoryViewerModal story={story} isOpen onClose={() => router.back()} isOwnStory={false} />;
}

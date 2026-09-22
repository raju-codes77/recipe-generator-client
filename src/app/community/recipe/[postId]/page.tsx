"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { communityApi } from "@/app/api/community/community-api";
import { Post } from "@/components/community/types";
import { RecipeDetailsModal } from "@/components/community/RecipeDetailsModal";

export default function CommunityRecipePage() {
  const params = useParams<{ postId: string }>();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.postId) return;
    void communityApi.getPost(params.postId).then(setPost).catch((reason) => {
      setError(reason instanceof Error ? reason.message : "Unable to open this Community post");
    });
  }, [params.postId]);

  if (error) return <div className="p-8 text-center text-sm text-rose-600">{error}</div>;
  if (!post) return <div className="p-8 text-center text-sm text-neutral-500">Opening Community post...</div>;

  return <RecipeDetailsModal post={post} isOpen onClose={() => router.back()} fullScreen />;
}

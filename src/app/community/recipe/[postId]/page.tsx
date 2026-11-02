"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { communityApi } from "@/app/api/community/community-api";
import { Post } from "@/components/community/types";
import { RecipeDetailsModal } from "@/components/community/RecipeDetailsModal";
import { authClient } from "@/lib/auth-client";

export default function CommunityRecipePage() {
  const params = useParams<{ postId: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = authClient.useSession();
  const shouldOpenComments = searchParams.get("comments") === "1";
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

  const requireAuthentication = () => {
    router.push("/registrationProcess/login");
  };

  return (
    <RecipeDetailsModal
      post={post}
      isOpen
      fullScreen
      initialShowComments={shouldOpenComments}
      currentUserId={session?.user?.id}
      onClose={() => router.back()}
      onLike={async () => {
        if (!session?.user?.id) {
          requireAuthentication();
          return;
        }
        await communityApi.toggleLike(post.id, session.user.id);
      }}
      onSave={async () => {
        if (!session?.user?.id) {
          requireAuthentication();
          return;
        }
        const result = await communityApi.savePost(post.id, undefined, session.user.id);
        setPost((currentPost) =>
          currentPost
            ? {
                ...currentPost,
                isSaved: result.active,
                savesCount: Math.max(0, currentPost.savesCount + (result.active ? 1 : -1)),
              }
            : currentPost,
        );
      }}
      onEditPost={async (currentPost) => {
        if (!session?.user?.id) {
          requireAuthentication();
          return;
        }
        const caption = window.prompt("Edit post caption", currentPost.caption);
        if (caption === null || !caption.trim()) return;
        await communityApi.updatePost(currentPost.id, { caption: caption.trim(), tags: currentPost.tags }, session.user.id);
        setPost((current) => current ? { ...current, caption: caption.trim() } : current);
      }}
      onDeletePost={async (currentPost) => {
        if (!session?.user?.id) {
          requireAuthentication();
          return;
        }
        await communityApi.deletePost(currentPost.id, session.user.id);
        router.back();
      }}
      onAddComment={async (content, parentId) => {
        if (!session?.user?.id) {
          requireAuthentication();
          return;
        }
        await communityApi.addComment(post.id, content, session.user.id, parentId);
      }}
      onUpdateComment={async (commentId, content) => {
        await communityApi.updateComment(commentId, content);
      }}
      onDeleteComment={async (commentId) => {
        await communityApi.deleteComment(commentId);
      }}
      onLoadComments={async () =>
        (await communityApi.getPostInteractions(post.id, { commentsTake: 50 })).comments
      }
      onOpenProfile={(userId) => router.push(`/community/users/${encodeURIComponent(userId)}`)}
      onLoadLikers={
        session?.user?.id === post.author.id
          ? () => communityApi.listPostLikers(post.id)
          : undefined
      }
    />
  );
}

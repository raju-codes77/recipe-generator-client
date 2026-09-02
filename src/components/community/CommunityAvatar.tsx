import React, { useState } from "react";
import { UserRound } from "lucide-react";

interface CommunityAvatarProps {
  src?: string | null;
  alt: string;
  className: string;
}

function isBlockedProfileImage(src?: string | null) {
  if (!src) return true;

  try {
    const url = new URL(src);

    return (
      url.hostname === "facebook.com" ||
      url.hostname.endsWith(".facebook.com") ||
      url.pathname.includes("photo.php")
    );
  } catch {
    return true;
  }
}

export const CommunityAvatar: React.FC<CommunityAvatarProps> = ({ src, alt, className }) => {
  const [imageFailed, setImageFailed] = useState(false);

  if (isBlockedProfileImage(src) || imageFailed) {
    return (
      <span
        role="img"
        aria-label={`${alt} profile placeholder`}
        className={`${className} flex items-center justify-center bg-slate-200 text-slate-500 dark:bg-neutral-700 dark:text-neutral-300`}
      >
        <UserRound className="h-[52%] w-[52%]" aria-hidden="true" />
      </span>
    );
  }

  return <img src={src!} alt={alt} className={className} onError={() => setImageFailed(true)} />;
};

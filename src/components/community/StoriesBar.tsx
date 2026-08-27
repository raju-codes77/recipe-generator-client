import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { LockKeyhole, Plus, Flame, Sparkles } from "lucide-react";
import { StoryItem } from "./types";

interface StoriesBarProps {
  stories: StoryItem[];
  onSelectStory: (story: StoryItem) => void;
  onAddStory: (file: File) => void;
  isAuthenticated?: boolean;
  onRequireAuthentication?: (action: string) => void;
}

export const StoriesBar: React.FC<StoriesBarProps> = ({
  stories,
  onSelectStory,
  onAddStory,
  isAuthenticated = true,
  onRequireAuthentication = () => undefined,
}) => {
  return (
    <div className="relative mb-8 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-4.5 shadow-xs dark:border-neutral-800 dark:bg-[#121212]">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-neutral-800/80">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#FF9F43]" />
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
            Kitchen Snaps & Daily Challenges
          </span>
        </div>
        <span className="text-xs font-semibold text-[#2F8F46] dark:text-[#B7E35F]">24h Fresh Stories</span>
      </div>

      {!isAuthenticated ? (
        <div className="flex flex-col items-start justify-between gap-3 rounded-xl bg-neutral-50 px-4 py-4 dark:bg-neutral-900/60 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-[#176B35] dark:bg-emerald-950 dark:text-[#B7E35F]">
              <LockKeyhole className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-bold text-neutral-800 dark:text-white">Stories are for FoodCanvas members</p>
              <p className="mt-0.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                Log in to view fresh kitchen snaps or share your own dish.
              </p>
            </div>
          </div>
          <Link
            href="/registrationProcess/login"
            onClick={() => onRequireAuthentication("view Community stories")}
            className="rounded-lg border border-[#2F8F46] px-3 py-2 text-[11px] font-bold text-[#176B35] transition hover:bg-[#EAF7E8] dark:text-[#B7E35F]"
          >
            Log in to view
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-4 overflow-x-auto pb-1.5 pt-1 scrollbar-none">
          {/* Add Story Button */}
          <motion.label
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex flex-col items-center gap-1.5 cursor-pointer shrink-0"
          >
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) onAddStory(file);
                event.target.value = "";
              }}
            />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-[#2F8F46] bg-[#EAF7E8]/70 transition group-hover:bg-[#D8F3DC] dark:border-[#B7E35F] dark:bg-emerald-950/40">
              <Plus className="h-6 w-6 text-[#2F8F46] transition group-hover:rotate-90 dark:text-[#B7E35F]" />
            </div>
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 max-w-[68px] truncate text-center">
              Your Dish
            </span>
          </motion.label>

          {/* Story Circles */}
          {stories
            .filter((s) => s.id !== "story_add")
            .map((story) => (
              <motion.div
                key={story.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectStory(story)}
                className="group flex flex-col items-center gap-1.5 cursor-pointer shrink-0"
              >
                <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-[#2F8F46] via-[#B7E35F] to-[#FF9F43] shadow-sm">
                  <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-white dark:border-[#121212] bg-neutral-100">
                    <img
                      src={story.imageUrl}
                      alt={story.caption}
                      className="h-full w-full object-cover transition group-hover:scale-110 duration-300"
                    />
                  </div>
                  {story.tag?.includes("Challenge") && (
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF9F43] text-white ring-2 ring-white dark:ring-[#121212]">
                      <Flame className="h-3 w-3" />
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 max-w-[70px] truncate text-center">
                  {story.author.name.split(" ")[0]}
                </span>
              </motion.div>
            ))}
        </div>
      )}
    </div>
  );
};

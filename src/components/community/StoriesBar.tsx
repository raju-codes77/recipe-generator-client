import React from 'react';
import { motion } from 'motion/react';
import { Plus, Flame, Sparkles } from 'lucide-react';
import { StoryItem } from './types';

interface StoriesBarProps {
  stories: StoryItem[];
  onSelectStory: (story: StoryItem) => void;
  onAddStory: () => void;
}

export const StoriesBar: React.FC<StoriesBarProps> = ({
  stories,
  onSelectStory,
  onAddStory,
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
        <span className="text-xs font-semibold text-[#2F8F46] dark:text-[#B7E35F]">
          24h Fresh Stories
        </span>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto pb-1.5 pt-1 scrollbar-none">
        {/* Add Story Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddStory}
          className="group flex flex-col items-center gap-1.5 cursor-pointer shrink-0"
        >
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-[#2F8F46] bg-[#EAF7E8]/70 transition group-hover:bg-[#D8F3DC] dark:border-[#B7E35F] dark:bg-emerald-950/40">
            <Plus className="h-6 w-6 text-[#2F8F46] transition group-hover:rotate-90 dark:text-[#B7E35F]" />
          </div>
          <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 max-w-[68px] truncate text-center">
            Your Dish
          </span>
        </motion.div>

        {/* Story Circles */}
        {stories
          .filter((s) => s.id !== 'story_add')
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
                {story.tag?.includes('Challenge') && (
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF9F43] text-white ring-2 ring-white dark:ring-[#121212]">
                    <Flame className="h-3 w-3" />
                  </span>
                )}
              </div>
              <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 max-w-[70px] truncate text-center">
                {story.author.name.split(' ')[0]}
              </span>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

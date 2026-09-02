import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { X, Heart, Flame } from 'lucide-react';
import { StoryItem } from './types';
import { CommunityAvatar } from './CommunityAvatar';

interface StoryViewerModalProps {
  story: StoryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onNextStory?: () => void;
  onPreviousStory?: () => void;
  storyCount?: number;
  storyIndex?: number;
}

export const StoryViewerModal: React.FC<StoryViewerModalProps> = ({
  story,
  isOpen,
  onClose,
  onNextStory,
  onPreviousStory,
  storyCount = 1,
  storyIndex = 0,
}) => {
  const [progress, setProgress] = useState(0);
  const [replyText, setReplyText] = useState('');
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!isOpen || !story) return;
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, story]);

  // Handle auto-closing safely in an effect when progress reaches 100
  useEffect(() => {
    if (progress >= 100 && isOpen) {
      if (onNextStory) {
        onNextStory();
      } else {
        onClose();
      }
    }
  }, [progress, isOpen, onClose, onNextStory]);

  if (!isOpen || !story) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-sm rounded-3xl overflow-hidden bg-neutral-900 shadow-2xl h-[580px] flex flex-col"
      >
        {/* Story Progress Bar */}
        <div className="absolute top-3 left-3 right-3 z-20 flex gap-1">
          {Array.from({ length: storyCount }, (_, index) => (
            <div key={index} className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{ width: index < storyIndex ? '100%' : index === storyIndex ? `${progress}%` : '0%' }}
              />
            </div>
          ))}
        </div>

        {/* Top Author Info */}
        <div className="absolute top-6 left-4 right-4 z-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CommunityAvatar
              src={story.author.avatar}
              alt={story.author.name}
              className="h-9 w-9 rounded-full object-cover ring-2 ring-[#2F8F46]"
            />
            <div>
              <h4 className="font-bold text-xs text-white drop-shadow-md">
                {story.author.name}
              </h4>
              <p className="text-[10px] text-white/80">{story.timestamp}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-black/40 p-1.5 text-white backdrop-blur-xs hover:bg-black/60"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Story Image */}
        <div className="relative flex-1 bg-black">
          {story.imageUrl ? (
            <img
              src={story.imageUrl}
              alt={story.caption}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-white/70">
              Story image unavailable
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

          {onPreviousStory && (
            <button
              type="button"
              onClick={onPreviousStory}
              aria-label="Previous story"
              className="absolute inset-y-12 left-0 z-10 w-1/2 cursor-pointer"
            />
          )}
          {onNextStory && (
            <button
              type="button"
              onClick={onNextStory}
              aria-label="Next story"
              className="absolute inset-y-12 right-0 z-10 w-1/2 cursor-pointer"
            />
          )}

          {/* Caption & Tag */}
          <div className="absolute bottom-16 left-4 right-4 text-white space-y-1">
            {story.tag && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#FF9F43] px-2.5 py-0.5 text-[10px] font-extrabold text-white">
                <Flame className="h-3 w-3" /> {story.tag}
              </span>
            )}
            <p className="text-xs font-medium leading-relaxed drop-shadow-md">
              {story.caption}
            </p>
          </div>
        </div>

        {/* Story Quick Reply & Reactions */}
        <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center gap-2">
          <input
            type="text"
            placeholder="Reply to kitchen story..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="flex-1 rounded-full border border-white/20 bg-white/20 px-3.5 py-1.5 text-xs text-white placeholder-white/60 backdrop-blur-xs focus:outline-hidden"
          />
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setLiked(!liked)}
            className={`rounded-full p-2 backdrop-blur-xs transition ${
              liked ? 'bg-rose-500 text-white' : 'bg-white/20 text-white'
            }`}
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-white' : ''}`} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

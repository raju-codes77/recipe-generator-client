import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { X, Heart, Flame, Send, Eye, Pause, Play } from 'lucide-react';
import Link from 'next/link';
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
  isOwnStory?: boolean;
  onSendMessage?: (recipientId: string, text: string) => Promise<void>;
}

export const StoryViewerModal: React.FC<StoryViewerModalProps> = ({
  story,
  isOpen,
  onClose,
  onNextStory,
  onPreviousStory,
  storyCount = 1,
  storyIndex = 0,
  isOwnStory = false,
  onSendMessage,
}) => {
  const [progress, setProgress] = useState(0);
  const [replyText, setReplyText] = useState('');
  const [liked, setLiked] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen || !story) return;
    setProgress(0);
    setIsPaused(false);
  }, [isOpen, story]);

  useEffect(() => {
    if (!isOpen || !story || isPaused) return;
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
  }, [isOpen, story, isPaused]);

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

  const sendReply = async () => {
    const message = replyText.trim();
    if (!message || !onSendMessage || isSending) return;
    setIsSending(true);
    setSendError(null);
    try {
      await onSendMessage(story.author.id, message);
      setReplyText('');
    } catch (error) {
      setSendError(error instanceof Error ? error.message : 'Unable to send this message.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex h-dvh w-screen items-center justify-center overflow-hidden bg-black text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative flex h-full w-full items-center justify-center overflow-hidden"
      >
        <div className="absolute left-5 top-5 z-40 flex items-center gap-3 sm:left-8 sm:top-7">
          <button type="button" onClick={onClose} aria-label="Exit story viewer" className="cursor-pointer rounded-full bg-white/15 p-3 text-white backdrop-blur-sm transition hover:bg-white/25">
            <X className="h-5 w-5" />
          </button>
          <Link href="/" aria-label="Go to FoodCanvas home" className="rounded-full bg-white/10 p-1.5 transition hover:bg-white/20">
            <img src="/logohere.png" alt="FoodCanvas" className="h-9 w-9 rounded-full object-contain" />
          </Link>
        </div>

        {/* Story Image */}
        <div className="relative flex h-[min(92dvh,680px)] w-[min(90vw,384px)] shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#111827] shadow-2xl ring-1 ring-white/15 sm:rounded-3xl">
          {/* Story progress, brand, and author stay inside the story canvas. */}
          <div className="absolute left-5 right-5 top-5 z-20 flex gap-1 sm:left-7 sm:right-7 sm:top-7">
            {Array.from({ length: storyCount }, (_, index) => (
              <div key={index} className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
                <div className="h-full bg-white transition-all duration-100 ease-linear" style={{ width: index < storyIndex ? '100%' : index === storyIndex ? `${progress}%` : '0%' }} />
              </div>
            ))}
          </div>
          <div className="absolute left-5 top-11 z-20 flex items-center gap-2.5 sm:left-7 sm:top-14">
            <CommunityAvatar src={story.author.avatar} alt={story.author.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-[#2F8F46]" />
            <div>
              <h4 className="text-xs font-bold text-white drop-shadow-md">{story.author.name}</h4>
              <p className="text-[10px] text-white/80">{story.timestamp}</p>
            </div>
          </div>
          {story.imageUrl ? (
            <img
              src={story.imageUrl}
              alt={story.caption}
              className="h-full w-full object-contain"
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

          <button type="button" onClick={() => setIsPaused((paused) => !paused)} aria-label={isPaused ? "Resume story" : "Pause story"} className="absolute right-5 top-11 z-30 rounded-full bg-black/45 p-3 text-white backdrop-blur-sm transition hover:bg-black/65 sm:right-7 sm:top-14">
            {isPaused ? <Play className="h-5 w-5 fill-current" /> : <Pause className="h-5 w-5" />}
          </button>

          {/* Caption & Tag */}
          <div className="absolute bottom-8 left-5 right-5 space-y-1 text-white sm:bottom-10 sm:left-10 sm:right-10">
            {story.tag && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#FF9F43] px-2.5 py-0.5 text-[10px] font-extrabold text-white">
                <Flame className="h-3 w-3" /> {story.tag}
              </span>
            )}
            <p className="max-w-2xl text-sm font-medium leading-relaxed drop-shadow-md sm:text-base">
              {story.caption}
            </p>
          </div>

          {!isOwnStory && <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center gap-2 sm:bottom-5 sm:left-6 sm:right-6"><input type="text" placeholder="Reply to kitchen story..." value={replyText} onChange={(e) => setReplyText(e.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') void sendReply(); }} className="min-w-0 flex-1 rounded-full border border-white/20 bg-black/35 px-4 py-3 text-sm text-white placeholder-white/70 outline-none backdrop-blur-sm focus:border-[#2F8F46]" /><button type="button" onClick={() => void sendReply()} disabled={!replyText.trim() || isSending} aria-label="Send story reply" className="rounded-full bg-[#2F8F46] p-3 transition hover:bg-[#176B35] disabled:cursor-not-allowed disabled:opacity-50"><Send className="h-4 w-4" /></button><motion.button type="button" whileTap={{ scale: 0.85 }} onClick={() => setLiked(!liked)} aria-label={liked ? 'Remove reaction' : 'React to story'} className={`rounded-full p-3 transition ${liked ? 'bg-rose-500' : 'bg-black/35 hover:bg-black/55'}`}><Heart className={`h-4 w-4 ${liked ? 'fill-white' : ''}`} /></motion.button></div>}
          {sendError && <p className="absolute bottom-20 left-1/2 z-20 -translate-x-1/2 rounded-lg bg-black/70 px-3 py-1 text-xs text-rose-300">{sendError}</p>}
        </div>

        {isOwnStory && <div className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 sm:bottom-7"><button type="button" onClick={() => setIsInsightsOpen((open) => !open)} className="flex items-center gap-2 whitespace-nowrap rounded-2xl bg-black/70 px-4 py-2 text-xs font-bold backdrop-blur-sm transition hover:bg-black/85"><Eye className="h-4 w-4 text-[#B7E35F]" /> Story viewers <span className="text-neutral-400">⌃</span></button>{isInsightsOpen && <div className="absolute bottom-full left-1/2 mb-2 w-[min(340px,88vw)] -translate-x-1/2 rounded-2xl border border-white/10 bg-[#202522] p-4 text-left shadow-2xl"><p className="text-sm font-black">Story viewers</p><p className="mt-1 text-xs text-neutral-400">Viewer and reaction details will appear here after story tracking is connected.</p><div className="mt-4 rounded-xl bg-white/5 p-3 text-xs text-neutral-500">No viewer data available yet.</div></div>}</div>}

      </motion.div>
    </div>
  );
};

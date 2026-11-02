import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Bell, ChevronLeft, ChevronRight, ChevronUp, Download, Flame, Grid3X3, Heart, MessageCircle, MoreHorizontal, Pause, Play, Send, Trash2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { StoryItem, StoryViewer } from './types';
import { CommunityAvatar } from './CommunityAvatar';
import { CommunityConfirmModal } from './CommunityConfirmModal';
import toast from "react-hot-toast";
import { useNotifications, type Notification } from "@/components/notifications/NotificationContext";

interface StoryViewerModalProps {
  story: StoryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onNextStory?: () => void;
  onPreviousStory?: () => void;
  storyCount?: number;
  storyIndex?: number;
  isOwnStory?: boolean;
  onSendMessage?: (recipientId: string, text: string, storyId: string) => Promise<void>;
  onDeleteStory?: (storyId: string) => Promise<void>;
  onOpenMessages?: () => void;
  dashboardHref?: string;
  profileHref?: string;
  profileImage?: string | null;
  onRecordView?: (storyId: string) => Promise<void>;
  onLoadViewers?: (storyId: string) => Promise<StoryViewer[]>;
  onReactToStory?: (storyId: string) => Promise<void>;
}

const STORY_DURATION_MS = 15_000;

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
  onDeleteStory,
  onOpenMessages,
  dashboardHref = "/dashboard/users",
  profileHref = "/community",
  profileImage,
  onRecordView,
  onLoadViewers,
  onReactToStory,
}) => {
  const router = useRouter();
  const { notifications, markAsRead } = useNotifications();
  const [progress, setProgress] = useState(0);
  const [replyText, setReplyText] = useState('');
  const [liked, setLiked] = useState(false);
  const [isReacting, setIsReacting] = useState(false);
  const [viewers, setViewers] = useState<StoryViewer[]>([]);
  const [isLoadingViewers, setIsLoadingViewers] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);
  const [isStoryMenuOpen, setIsStoryMenuOpen] = useState(false);
  const [isDeletingStory, setIsDeletingStory] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [hoveredStorySide, setHoveredStorySide] = useState<'previous' | 'next' | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!isOpen || !story) return;
    setProgress(0);
    setIsPaused(false);
    setIsStoryMenuOpen(false);
    setIsDeleteConfirmOpen(false);
    setIsNotificationsOpen(false);
    setHoveredStorySide(null);
    setSwipeOffset(0);
    setLiked(Boolean(story.reacted));
    setViewers([]);
    setIsInsightsOpen(false);
    if (isOwnStory && onLoadViewers) {
      setIsLoadingViewers(true);
      void onLoadViewers(story.id)
        .then(setViewers)
        .catch((error) => setSendError(error instanceof Error ? error.message : 'Unable to load story viewers.'))
        .finally(() => setIsLoadingViewers(false));
    }
    if (!isOwnStory && onRecordView) {
      void onRecordView(story.id).catch((error) => {
        setSendError(error instanceof Error ? error.message : 'Unable to record this story view.');
      });
    }
  }, [isOpen, isOwnStory, onRecordView, story]);

  useEffect(() => {
    if (!isInsightsOpen || !story || !onLoadViewers) return;
    setIsLoadingViewers(true);
    void onLoadViewers(story.id)
      .then(setViewers)
      .catch((error) => setSendError(error instanceof Error ? error.message : 'Unable to load story viewers.'))
      .finally(() => setIsLoadingViewers(false));
  }, [isInsightsOpen, onLoadViewers, story]);

  useEffect(() => {
    if (!isOpen || !story || isPaused) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(100, prev + (100 * 100) / STORY_DURATION_MS);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, story, isPaused]);

  useEffect(() => {
    if (!isNotificationsOpen) return;

    const closeNotificationsOnOutsideClick = (event: PointerEvent) => {
      if (!notificationsRef.current?.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('pointerdown', closeNotificationsOnOutsideClick);
    return () => document.removeEventListener('pointerdown', closeNotificationsOnOutsideClick);
  }, [isNotificationsOpen]);

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

  const unreadNotifications = notifications.filter((notification) => !notification.isRead);

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) void markAsRead(notification.id);
    setIsNotificationsOpen(false);
    if (notification.actionUrl) router.push(notification.actionUrl);
  };

  const navigateFromStory = (href: string) => {
    setIsNotificationsOpen(false);
    router.push(href);
  };

  const sendReply = async () => {
    const message = replyText.trim();
    if (!message || !onSendMessage || isSending) return;
    setIsSending(true);
    setSendError(null);
    try {
      await onSendMessage(story.author.id, message, story.id);
      setReplyText('');
      toast.success("Reply sent");
    } catch (error) {
      setSendError(error instanceof Error ? error.message : 'Unable to send this message.');
    } finally {
      setIsSending(false);
    }
  };

  const downloadStoryImage = async () => {
    try {
      const response = await fetch(story.imageUrl);
      if (!response.ok) throw new Error("Unable to download the image");
      const objectUrl = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `foodcanvas-story-${story.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      setSendError(error instanceof Error ? error.message : "Unable to save the story image.");
    } finally {
      setIsStoryMenuOpen(false);
    }
  };

  const deleteStory = async () => {
    if (!onDeleteStory || isDeletingStory) return;
    setIsDeletingStory(true);
    try {
      await onDeleteStory(story.id);
    } catch (error) {
      setSendError(error instanceof Error ? error.message : "Unable to delete the story.");
    } finally {
      setIsDeletingStory(false);
      setIsStoryMenuOpen(false);
    }
  };

  const reactToStory = async () => {
    if (liked || !onReactToStory || isReacting) return;
    setIsReacting(true);
    setSendError(null);
    try {
      await onReactToStory(story.id);
      setLiked(true);
    } catch (error) {
      setSendError(error instanceof Error ? error.message : 'Unable to react to this story.');
    } finally {
      setIsReacting(false);
    }
  };

  const handleStoryTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) return;
    swipeStartRef.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  };

  const handleStoryTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = swipeStartRef.current;
    if (!start || event.touches.length !== 1) return;

    const deltaX = event.touches[0].clientX - start.x;
    const deltaY = event.touches[0].clientY - start.y;
    if (deltaY <= 0 || Math.abs(deltaX) > Math.abs(deltaY)) return;

    if (event.cancelable) event.preventDefault();
    setSwipeOffset(Math.min(deltaY, 180));
  };

  const handleStoryTouchEnd = () => {
    const shouldClose = swipeOffset >= 96;
    swipeStartRef.current = null;
    if (shouldClose) {
      onClose();
      return;
    }
    setSwipeOffset(0);
  };

  return (
    <div className="fixed inset-0 z-70 flex h-dvh w-screen items-center justify-center overflow-hidden bg-[#F5F7F2] text-neutral-900 shadow-none dark:bg-black dark:text-white">
      <style>{`
        .story-notifications-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.8) transparent;
        }
        .story-notifications-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .story-notifications-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .story-notifications-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(107, 114, 128, 0.78);
          border: 2px solid transparent;
          background-clip: padding-box;
          border-radius: 999px;
        }
        .story-notifications-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.95);
          background-clip: padding-box;
        }
      `}</style>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative flex h-full w-full items-center justify-center overflow-hidden shadow-none"
      >
        {onPreviousStory && <button type="button" onClick={onPreviousStory} aria-label="Previous story" className="absolute inset-y-0 left-0 z-0 w-1/2 cursor-pointer" />}
        {onNextStory && <button type="button" onClick={onNextStory} aria-label="Next story" className="absolute inset-y-0 right-0 z-0 w-1/2 cursor-pointer" />}

        <div className="absolute left-5 top-5 z-40 flex items-center gap-3 sm:left-8 sm:top-7">
          <button type="button" onClick={onClose} aria-label="Exit story viewer" className="hidden cursor-pointer rounded-full border border-neutral-200 bg-white/90 p-3 text-neutral-800 shadow-sm backdrop-blur-sm transition hover:bg-white dark:border-white/10 dark:bg-white/15 dark:text-white dark:hover:bg-white/25 lg:inline-flex">
            <X className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => navigateFromStory('/')} aria-label="Go to FoodCanvas home" className="hidden rounded-full transition hover:scale-105 lg:inline-flex">
            <img src="/navbar_logo.png" alt="FoodCanvas" className="h-11 w-11 rounded-full object-contain" />
          </button>
        </div>

        <div className="absolute right-5 top-5 z-40 hidden items-center gap-2.5 sm:right-8 sm:top-7 sm:gap-3 lg:flex">
          <button type="button" onClick={() => navigateFromStory(dashboardHref)} aria-label="Open dashboard" className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white/90 text-neutral-800 shadow-sm backdrop-blur-sm transition hover:bg-white dark:border-white/10 dark:bg-white/15 dark:text-white dark:hover:bg-white/25 sm:h-11 sm:w-11">
            <Grid3X3 className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="pointer-events-none absolute top-full z-50 mt-2 whitespace-nowrap rounded-md bg-black/85 px-2 py-1 text-[10px] font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">Dashboard</span>
          </button>
          <button type="button" onClick={onOpenMessages} aria-label="Open messages" className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white/90 text-neutral-800 shadow-sm backdrop-blur-sm transition hover:bg-white dark:border-white/10 dark:bg-white/15 dark:text-white dark:hover:bg-white/25 sm:h-11 sm:w-11">
            <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="pointer-events-none absolute top-full z-50 mt-2 whitespace-nowrap rounded-md bg-black/85 px-2 py-1 text-[10px] font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">Messages</span>
          </button>
          <div ref={notificationsRef} className="relative">
            <button type="button" onClick={() => setIsNotificationsOpen((open) => !open)} aria-label="Open notifications" aria-expanded={isNotificationsOpen} className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white/90 text-neutral-800 shadow-sm backdrop-blur-sm transition hover:bg-white dark:border-white/10 dark:bg-white/15 dark:text-white dark:hover:bg-white/25 sm:h-11 sm:w-11">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              {unreadNotifications.length > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-black text-white">{Math.min(unreadNotifications.length, 99)}</span>}
              <span className="pointer-events-none absolute top-full z-50 mt-2 whitespace-nowrap rounded-md bg-black/85 px-2 py-1 text-[10px] font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">Notifications</span>
            </button>
            {isNotificationsOpen && (
              <div className="absolute right-0 top-[calc(100%+0.75rem)] w-[min(320px,calc(100vw-2.5rem))] overflow-hidden rounded-2xl border border-neutral-200 bg-white text-left shadow-2xl dark:border-white/10 dark:bg-[#171C1A]">
                <div className="border-b border-neutral-200 px-4 py-3 dark:border-white/10"><p className="text-sm font-black text-neutral-900 dark:text-white">Notifications</p></div>
                <div className="story-notifications-scrollbar max-h-80 space-y-3 overflow-y-auto p-3">
                  {notifications.length === 0 ? <p className="px-3 py-5 text-center text-xs text-neutral-400">No notifications yet.</p> : notifications.slice(0, 8).map((notification) => <button type="button" key={notification.id} onClick={() => handleNotificationClick(notification)} className={`block w-full rounded-xl px-4 py-3 text-left text-xs shadow-sm ${notification.isRead ? "bg-neutral-50 text-neutral-500 dark:bg-white/[0.03] dark:text-neutral-400" : "bg-[#EEF5EC] text-neutral-900 dark:bg-white/8 dark:text-white"}`}><p className="font-semibold">{notification.actor?.name || notification.title}</p><p className="mt-1 leading-5">{notification.message}</p><p className="mt-1.5 text-[10px] text-neutral-500">{new Date(notification.createdAt).toLocaleString()}</p></button>)}
                </div>
              </div>
            )}
          </div>
          <button type="button" onClick={() => navigateFromStory(profileHref)} aria-label="Open your profile" className="group relative overflow-visible rounded-full ring-2 ring-neutral-300 transition hover:ring-[#2F8F46] dark:ring-white/30 dark:hover:ring-[#B7E35F]">
            <CommunityAvatar src={profileImage} alt="Your profile" className="h-10 w-10 rounded-full object-cover sm:h-11 sm:w-11" />
            <span className="pointer-events-none absolute right-0 top-full z-50 mt-2 whitespace-nowrap rounded-md bg-black/85 px-2 py-1 text-[10px] font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">Your profile</span>
          </button>
        </div>

        {/* Story Image */}
        <div className="relative z-10 flex items-center justify-center shadow-none ring-0">
          {onPreviousStory && <button type="button" onClick={onPreviousStory} onPointerEnter={() => setHoveredStorySide('previous')} onPointerLeave={() => setHoveredStorySide(null)} aria-label="Previous story" className={`absolute right-full mr-10 hidden h-12 w-12 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 shadow-xl backdrop-blur-sm transition duration-200 dark:border-white/10 dark:text-white lg:flex ${hoveredStorySide === 'previous' ? 'scale-110 bg-white animate-pulse dark:bg-white/35' : 'scale-100 bg-white/80 dark:bg-white/20'}`}><ChevronLeft className="h-7 w-7" /></button>}
          <motion.div
            className="relative flex h-dvh w-screen shrink-0 items-center justify-center overflow-hidden rounded-none border-0 bg-white shadow-none ring-0 dark:bg-[#111827] lg:h-[min(92dvh,680px)] lg:w-[min(88vw,360px)] lg:rounded-3xl"
            style={{ boxShadow: 'none', transform: `translateY(${swipeOffset}px)`, transition: swipeOffset === 0 ? 'transform 180ms ease-out' : 'none' }}
            onTouchStart={handleStoryTouchStart}
            onTouchMove={handleStoryTouchMove}
            onTouchEnd={handleStoryTouchEnd}
            onTouchCancel={handleStoryTouchEnd}
          >
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
              className="h-full w-full object-cover lg:object-contain"
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
              onPointerEnter={() => setHoveredStorySide('previous')}
              onPointerLeave={() => setHoveredStorySide(null)}
              aria-label="Previous story"
              className="absolute inset-y-12 left-0 z-10 w-1/2 cursor-pointer"
            />
          )}
          {onNextStory && (
            <button
              type="button"
              onClick={onNextStory}
              onPointerEnter={() => setHoveredStorySide('next')}
              onPointerLeave={() => setHoveredStorySide(null)}
              aria-label="Next story"
              className="absolute inset-y-12 right-0 z-10 w-1/2 cursor-pointer"
            />
          )}

          <div className="absolute right-5 top-11 z-30 flex items-center gap-2 sm:right-7 sm:top-14">
            <button type="button" onClick={() => setIsPaused((paused) => !paused)} aria-label={isPaused ? "Resume story" : "Pause story"} className="rounded-full bg-black/45 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/65">
              {isPaused ? <Play className="h-4 w-4 fill-current" /> : <Pause className="h-4 w-4" />}
            </button>
            {isOwnStory && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsStoryMenuOpen((open) => !open)}
                  aria-label="Open story options"
                  aria-expanded={isStoryMenuOpen}
                  className="rounded-full bg-black/45 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/65"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
                {isStoryMenuOpen && (
                  <div className="absolute right-0 top-12 w-44 overflow-hidden rounded-2xl border border-neutral-200 bg-white py-1.5 text-xs shadow-2xl dark:border-white/10 dark:bg-[#202522]">
                    <button type="button" onClick={() => void downloadStoryImage()} className="flex w-full items-center gap-2.5 px-4 py-3 text-left font-semibold text-neutral-800 transition hover:bg-neutral-100 dark:text-white dark:hover:bg-white/10">
                      <Download className="h-4 w-4 text-[#B7E35F]" /> Save image
                    </button>
                    <button type="button" onClick={() => { setIsStoryMenuOpen(false); setIsDeleteConfirmOpen(true); }} disabled={isDeletingStory} className="flex w-full items-center gap-2.5 px-4 py-3 text-left font-semibold text-rose-300 transition hover:bg-rose-500/15 disabled:cursor-not-allowed disabled:opacity-60">
                      <Trash2 className="h-4 w-4" /> {isDeletingStory ? "Deleting..." : "Delete story"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

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

          {!isOwnStory && <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center gap-2 sm:bottom-5 sm:left-6 sm:right-6"><input type="text" placeholder="Reply to kitchen story..." value={replyText} onChange={(e) => setReplyText(e.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') void sendReply(); }} className="min-w-0 flex-1 rounded-full border border-white/20 bg-black/35 px-4 py-3 text-sm text-white placeholder-white/70 outline-none backdrop-blur-sm focus:border-[#2F8F46]" /><button type="button" onClick={() => void sendReply()} disabled={!replyText.trim() || isSending} aria-label="Send story reply" className="rounded-full bg-[#2F8F46] p-3 transition hover:bg-[#176B35] disabled:cursor-not-allowed disabled:opacity-50"><Send className="h-4 w-4" /></button><motion.button type="button" whileTap={{ scale: 0.85 }} onClick={() => void reactToStory()} disabled={liked || isReacting} aria-pressed={liked} aria-label="React to story" className={`rounded-full p-3 transition ${liked ? 'bg-rose-500' : 'bg-black/35 hover:bg-black/55'} disabled:cursor-default`}><Heart className={`h-4 w-4 ${liked ? 'fill-white' : ''}`} /></motion.button></div>}
           {sendError && <p className="absolute bottom-20 left-1/2 z-20 -translate-x-1/2 rounded-lg bg-black/70 px-3 py-1 text-xs text-rose-300">{sendError}</p>}
          {isOwnStory && (
            <div className="absolute bottom-4 left-0 right-0 z-30 px-5 lg:bottom-7 lg:px-7">
              <button
                type="button"
                onClick={() => setIsInsightsOpen((open) => !open)}
                aria-label={`${viewers.length} ${viewers.length === 1 ? 'viewer' : 'viewers'}`}
                aria-expanded={isInsightsOpen}
                className="flex items-center gap-2 text-xs font-bold text-[#B7E35F] transition hover:text-[#D4F58B]"
              >
                <span>{viewers.length} {viewers.length === 1 ? 'viewer' : 'viewers'}</span>
                <ChevronUp className={`h-3.5 w-3.5 transition-transform ${isInsightsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isInsightsOpen && (
                <div className="absolute bottom-full left-1/2 mb-3 w-[calc(100%-2rem)] max-w-[340px] -translate-x-1/2 rounded-2xl border border-neutral-200 bg-white p-4 text-left text-neutral-900 shadow-2xl dark:border-white/10 dark:bg-[#202522] dark:text-white">
                  <div className="max-h-64 space-y-2 overflow-y-auto">
                    {isLoadingViewers ? (
                      <div className="rounded-xl bg-neutral-100 p-3 text-xs text-neutral-500 dark:bg-white/5">Loading viewers...</div>
                    ) : viewers.length === 0 ? (
                      <div className="rounded-xl bg-neutral-100 p-3 text-xs text-neutral-500 dark:bg-white/5">No viewers yet.</div>
                    ) : (
                      viewers.map((viewer) => (
                        <button
                          key={viewer.id}
                          type="button"
                          onClick={() => navigateFromStory(`/community/users/${encodeURIComponent(viewer.id)}`)}
                          className="flex w-full items-center gap-3 rounded-xl bg-neutral-100 px-3 py-2.5 text-left transition hover:bg-neutral-200 dark:bg-white/5 dark:hover:bg-white/10"
                        >
                          <CommunityAvatar src={viewer.avatar} alt={viewer.name} className="h-8 w-8 rounded-full object-cover" />
                          <span className="min-w-0 flex-1 truncate text-xs font-semibold">{viewer.name}</span>
                          {viewer.reacted && <Heart className="h-4 w-4 fill-rose-500 text-rose-500" aria-label="Loved this story" />}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
           {onNextStory && <button type="button" onClick={onNextStory} onPointerEnter={() => setHoveredStorySide('next')} onPointerLeave={() => setHoveredStorySide(null)} aria-label="Next story" className={`absolute left-full ml-10 hidden h-12 w-12 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 shadow-xl backdrop-blur-sm transition duration-200 dark:border-white/10 dark:text-white lg:flex ${hoveredStorySide === 'next' ? 'scale-110 bg-white animate-pulse dark:bg-white/35' : 'scale-100 bg-white/80 dark:bg-white/20'}`}><ChevronRight className="h-7 w-7" /></button>}
        </div>

      </motion.div>
      <CommunityConfirmModal
        isOpen={isDeleteConfirmOpen}
        title="Delete this story?"
        message="This story will be removed from your Community profile immediately."
        confirmLabel="Delete story"
        isLoading={isDeletingStory}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={() => void deleteStory()}
      />
    </div>
  );
};

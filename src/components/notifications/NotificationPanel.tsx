"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotifications, type Notification } from "./NotificationContext";
import { useRouter } from "next/navigation";
import { 
  Bell, 
  Heart, 
  MessageCircle, 
  UserPlus, 
  Sparkles, 
  CheckCircle2, 
  Check, 
  ChevronRight,
  Utensils,
  Wallet
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export default function NotificationPanel() {
  const { 
    notifications, 
    isOpen, 
    closePanel, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    isLoading, 
    fetchMore, 
    hasNextPage 
  } = useNotifications();

  const panelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [failedActorImages, setFailedActorImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        // Find if they clicked the bell button
        const bellButton = document.getElementById("notification-bell-btn");
        if (bellButton && bellButton.contains(event.target as Node)) {
          return; // Let the toggle handler handle this
        }
        closePanel();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closePanel]);

  const getIcon = (type: string) => {
    switch (type) {
      case "POST_LIKE": return <Heart size={18} className="text-pink-500 fill-pink-500" />;
      case "POST_COMMENT": return <MessageCircle size={18} className="text-blue-500" />;
      case "FOLLOW": return <UserPlus size={18} className="text-emerald-500" />;
      case "MESSAGE": return <MessageCircle size={18} className="text-emerald-500" />;
      case "MEAL_ANALYSIS_SUCCESS": return <Sparkles size={18} className="text-purple-500" />;
      case "MEAL_PLAN_SUCCESS": return <Utensils size={18} className="text-orange-500" />;
      case "BUDGET_MEAL_PLAN_SUCCESS": return <Wallet size={18} className="text-yellow-500" />;
      default: return <Bell size={18} className="text-slate-500" />;
    }
  };

  const getNotificationHref = (notification: Notification) => {
    if (notification.relatedPostId && (!notification.actionUrl || notification.actionUrl === "/community")) {
      return `/community/recipe/${encodeURIComponent(notification.relatedPostId)}?comments=1`;
    }
    if (notification.actionUrl && notification.actionUrl !== "undefined" && notification.actionUrl !== "null") {
      return notification.actionUrl;
    }
    return null;
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    
    const notificationHref = getNotificationHref(notification);
    if (notificationHref) {
      router.push(notificationHref);
    }
    closePanel();
  };

  return (
    <>
      <style>{`
        .notification-panel-scrollbar {
          scrollbar-color: rgba(100, 116, 139, 0.55) transparent;
          scrollbar-width: thin;
        }
        .notification-panel-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .notification-panel-scrollbar::-webkit-scrollbar-button {
          display: none;
          width: 0;
          height: 0;
        }
        .notification-panel-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .notification-panel-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(100, 116, 139, 0.55);
          border: 2px solid transparent;
          background-clip: padding-box;
          border-radius: 999px;
          transition: background-color 220ms ease;
        }
        .notification-panel-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(52, 211, 153, 0.72);
          background-clip: padding-box;
        }
        .dark .notification-panel-scrollbar {
          scrollbar-color: rgba(148, 163, 184, 0.48) transparent;
        }
        .dark .notification-panel-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.48);
          background-clip: padding-box;
        }
        .dark .notification-panel-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(52, 211, 153, 0.78);
          background-clip: padding-box;
        }
      `}</style>
      <AnimatePresence>
      {isOpen && (
        <motion.div
          key="notification-panel"
          ref={panelRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed top-20 left-1/2 right-auto w-[calc(100vw-2rem)] max-w-[380px] -translate-x-1/2 bg-white dark:bg-[#080B12] rounded-3xl shadow-2xl border border-slate-100 dark:border-[#1B2942] overflow-hidden z-[100] xl:absolute xl:top-14 xl:left-auto xl:right-0 xl:w-[380px] xl:translate-x-0"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-[#1B2942] bg-slate-50/50 dark:bg-[#101A2C]">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Notifications</h3>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors flex items-center gap-1"
              >
                <Check size={14} />
                Mark all read
              </button>
            )}
          </div>

          {/* Body */}
          <div className="notification-panel-scrollbar max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                <div className="w-16 h-16 bg-slate-100 dark:bg-[#111B2D] rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={32} className="text-emerald-500 opacity-80" />
                </div>
                <p className="text-slate-700 dark:text-slate-300 font-semibold">You're all caught up!</p>
                <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">Check back later for new notifications.</p>
              </div>
            ) : (
              <div className="flex flex-col">
                {notifications.map((notification, index) => {
                  const rawNotificationId = typeof notification.id === "string" ? notification.id.trim() : "";
                  const notificationKey = `notification-${rawNotificationId || "unknown"}-${index}`;
                    const notificationHref = getNotificationHref(notification);
                    const content = (
                      <div
                        onClick={() => handleNotificationClick(notification)}
                        className={`group relative flex cursor-pointer gap-3 px-5 py-4 transition-colors hover:bg-slate-50 dark:hover:bg-[#111B2D] ${
                          !notification.isRead ? "bg-emerald-50/30 dark:bg-emerald-900/10" : ""
                        }`}
                    >
                      {!notification.isRead && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-500 rounded-r-full" />
                      )}
                      
                      {/* Avatar / Icon */}
                      <div className="relative shrink-0">
                        {notification.actor?.image && !failedActorImages[notification.actor.id] ? (
                          <Link
                            href={`/community/users/${encodeURIComponent(notification.actor.id)}`}
                            onClick={(event) => event.stopPropagation()}
                            aria-label={`Open ${notification.actor.name}'s community profile`}
                            className="relative block h-10 w-10 rounded-full border border-slate-200 dark:border-[#263653]"
                          >
                            <Image 
                              src={notification.actor.image} 
                              alt={notification.actor.name} 
                              fill 
                              className="rounded-full object-cover"
                              onError={() => setFailedActorImages((current) => ({ ...current, [notification.actor?.id ?? notification.id]: true }))}
                            />
                          </Link>
                        ) : notification.actor ? (
                          <Link
                            href={`/community/users/${encodeURIComponent(notification.actor.id)}`}
                            onClick={(event) => event.stopPropagation()}
                            aria-label={`Open ${notification.actor.name}'s community profile`}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-bold text-white"
                          >
                            {notification.actor.name.substring(0, 2).toUpperCase()}
                          </Link>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-[#102A3A] flex items-center justify-center">
                            {getIcon(notification.type)}
                          </div>
                        )}
                        
                        {/* Type Badge */}
                        {notification.actor && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white dark:bg-[#101A2C] rounded-full flex items-center justify-center shadow-sm">
                            {getIcon(notification.type)}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-800 dark:text-slate-200">
                          {notification.actor ? (
                            <span className="font-bold mr-1">{notification.actor.name}</span>
                          ) : (
                            <span className="font-bold mr-1">{notification.title}</span>
                          )}
                          <span className="text-slate-600 dark:text-slate-400">{notification.message}</span>
                        </p>
                        <p className="text-[11px] text-slate-400 mt-1 font-medium">
                          {timeAgo(notification.createdAt)}
                        </p>
                      </div>
                      
                      {notification.actionUrl && (
                        <ChevronRight size={16} className="text-slate-300 shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                  );

                  return (
                    <div
                      key={notificationKey}
                      data-has-action={notificationHref ? "true" : "false"}
                      className="border-b border-slate-100 dark:border-[#1B2942]/70 last:border-0"
                    >
                      {content}
                    </div>
                  );
                })}
                
                {hasNextPage && (
                  <button
                    onClick={fetchMore}
                    disabled={isLoading}
                    className="py-3 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-slate-50 dark:hover:bg-[#111B2D] transition-colors text-center w-full"
                  >
                    {isLoading ? "Loading..." : "Load earlier notifications"}
                  </button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}

"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authClient } from "@/lib/auth-client";
import { apiClient } from "@/lib/api-client";

export interface NotificationActor {
  id: string;
  name: string;
  image: string | null;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  actionUrl: string | null;
  relatedPostId: string | null;
  createdAt: string;
  actor: NotificationActor | null;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  isOpen: boolean;
  isLoading: boolean;
  hasNextPage: boolean;
  togglePanel: () => void;
  closePanel: () => void;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  fetchMore: () => Promise<void>;
  refreshNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const userId = session?.user?.id;

  const fetchNotifications = useCallback(async (pageNum: number, merge = false) => {
    if (!userId || isPending) return;
    try {
      setIsLoading(true);
      const data = await apiClient.get<any>(`/notifications?page=${pageNum}&limit=10`);
      const { notifications: newNotifs, unreadCount: newUnread, pagination } = data;
      
      setNotifications(prev => {
        if (!merge) return newNotifs;
        // Prevent duplicate notifications based on ID when merging
        const combined = [...prev];
        newNotifs.forEach((newNotif: Notification) => {
          if (!combined.some(existing => existing.id === newNotif.id)) {
            combined.push(newNotif);
          }
        });
        return combined.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      });
      
      setUnreadCount(newUnread);
      setHasNextPage(pagination.hasNextPage);
      setPage(pagination.page);
    } catch (error: any) {
      if (error?.status === 401) return; // Silently skip if unauthorized
      console.error("Failed to fetch notifications", error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // Initial load
  useEffect(() => {
    if (userId && !isPending) {
      fetchNotifications(1);
      
      // Setup simple polling every 30 seconds for unread badge and new notifications
      const interval = setInterval(() => {
        fetchNotifications(1, true); // Use merge=true to safely append new notifications while preserving old ones
      }, 30000);
      
      return () => clearInterval(interval);
    }
  }, [userId, isPending, isOpen, fetchNotifications]);

  const togglePanel = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState) {
      // Refresh when opening
      fetchNotifications(1);
    }
  };

  const closePanel = () => setIsOpen(false);

  const markAsRead = async (id: string) => {
    try {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
      
      await apiClient.patch<any>(`/notifications/${id}/read`);
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
      
      await apiClient.patch<any>("/notifications/read-all");
    } catch (error) {
      console.error("Failed to mark all as read", error);
    }
  };

  const fetchMore = async () => {
    if (!isLoading && hasNextPage) {
      await fetchNotifications(page + 1, true);
    }
  };

  const refreshNotifications = async () => {
    await fetchNotifications(1);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isOpen,
        isLoading,
        hasNextPage,
        togglePanel,
        closePanel,
        markAsRead,
        markAllAsRead,
        fetchMore,
        refreshNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}

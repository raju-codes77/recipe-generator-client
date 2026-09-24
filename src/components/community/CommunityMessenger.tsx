"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, MessageSquare, Search, Send } from "lucide-react";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import {
  communityApi,
  CommunityMessage,
} from "@/app/api/community/community-api";
import { CommunityAvatar } from "./CommunityAvatar";
import { DirectMessageUser } from "./types";

const MESSAGES_PER_PAGE = 20;

function messageText(text: string) {
  return text
    .replace(/https?:\/\/\S+/g, "")
    .replace(/^\s*Check out this Community recipe:?\s*/i, "")
    .trim();
}

export const CommunityMessenger: React.FC<{ initialRecipientId?: string; returnTo?: string }> = ({ initialRecipientId, returnTo = "/community" }) => {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [contacts, setContacts] = useState<DirectMessageUser[]>([]);
  const [selectedContactId, setSelectedContactId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<CommunityMessage[]>([]);
  const [isLoadingContacts, setIsLoadingContacts] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendingMessageId, setSendingMessageId] = useState<string | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const selectedContact = contacts.find((contact) => contact.id === selectedContactId);
  const filteredContacts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return contacts;
    return contacts.filter((contact) =>
      `${contact.name} ${contact.username}`.toLowerCase().includes(normalizedQuery),
    );
  }, [contacts, searchQuery]);

  useEffect(() => {
    if (!session?.user?.id) return;
    let cancelled = false;
    setIsLoadingContacts(true);
    communityApi
      .listContacts(initialRecipientId)
      .then((items) => {
        if (cancelled) return;
        setContacts(items);
        if (initialRecipientId && items.some((item) => item.id === initialRecipientId)) {
          setSelectedContactId(initialRecipientId);
        }
      })
      .catch((error) => {
        if (!cancelled) toast.error(error instanceof Error ? error.message : "Unable to load conversations");
      })
      .finally(() => {
        if (!cancelled) setIsLoadingContacts(false);
      });
    return () => {
      cancelled = true;
    };
  }, [initialRecipientId, session?.user?.id]);

  useEffect(() => {
    if (!selectedContactId) {
      setMessages([]);
      setIsLoadingMessages(false);
      return;
    }

    let cancelled = false;
    setMessages([]);
    setIsLoadingMessages(true);

    const loadMessages = () =>
      void communityApi
        .listMessages(selectedContactId, { take: MESSAGES_PER_PAGE, skip: 0 })
        .then((page) => {
          if (cancelled) return;
          setMessages(page.messages);
          void communityApi.markMessagesRead(selectedContactId);
        })
        .catch((error) => {
          if (!cancelled) toast.error(error instanceof Error ? error.message : "Unable to load messages");
        })
        .finally(() => {
          if (!cancelled) setIsLoadingMessages(false);
        });

    loadMessages();
    const timer = window.setInterval(loadMessages, 8000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [selectedContactId]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [selectedContactId, messages.length]);

  const handleSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!session?.user?.id || !selectedContactId || !inputMessage.trim() || isSending) return;

    const text = inputMessage.trim();
    const temporaryId = `pending-${Date.now()}`;
    const optimisticMessage: CommunityMessage = {
      id: temporaryId,
      senderId: session.user.id,
      recipientId: selectedContactId,
      text,
      timestamp: "Just now",
    };

    setMessages((current) => [...current, optimisticMessage]);
    setInputMessage("");
    setIsSending(true);
    setSendingMessageId(temporaryId);

    try {
      await communityApi.sendMessage(selectedContactId, text, undefined, session.user.id);
      const page = await communityApi.listMessages(selectedContactId, { take: MESSAGES_PER_PAGE, skip: 0 });
      setMessages(page.messages);
      setContacts((current) => {
        const contact = current.find((item) => item.id === selectedContactId);
        if (!contact) return current;
        return [
          { ...contact, lastMessage: text, lastMessageTime: "Just now", lastMessageAt: new Date().toISOString() },
          ...current.filter((item) => item.id !== selectedContactId),
        ];
      });
      toast.success("Message sent");
    } catch (error) {
      setMessages((current) => current.filter((message) => message.id !== temporaryId));
      setInputMessage(text);
      toast.error(error instanceof Error ? error.message : "Unable to send message");
    } finally {
      setIsSending(false);
      setSendingMessageId(null);
    }
  };

  const handleOpenStory = async (event: React.MouseEvent, storyId: string) => {
    event.preventDefault();
    try {
      await communityApi.getStory(storyId);
      router.push(`/community/story/${encodeURIComponent(storyId)}`);
    } catch {
      toast.error("This story is no longer available.", { position: "bottom-right" });
    }
  };

  if (!session?.user?.id) {
    return (
      <main data-community-messenger-route className="min-h-screen bg-[#FCFDF9] px-4 py-8 dark:bg-[#0a0a0a]">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xs dark:border-neutral-800 dark:bg-[#121212]">
          <MessageSquare className="mx-auto h-10 w-10 text-[#2F8F46]" />
          <h1 className="mt-4 text-xl font-extrabold text-neutral-900 dark:text-white">Community Messenger</h1>
          <p className="mt-2 text-sm text-neutral-500">Log in to message other Community members.</p>
          <Link href="/registrationProcess/login" className="mt-5 inline-flex rounded-xl bg-[#2F8F46] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#176B35]">
            Log in
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main data-community-messenger-route className="h-[calc(100dvh-5rem)] overflow-hidden bg-[#FCFDF9] px-0 py-0 dark:bg-[#0a0a0a] sm:h-[calc(100dvh-5.5rem)] sm:px-6 sm:py-1 lg:h-[calc(100dvh-6rem)]">
      <style>{`
        .community-dm-scrollbar {
          scrollbar-color: transparent transparent;
          scrollbar-width: thin;
        }
        .community-dm-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .community-dm-scrollbar::-webkit-scrollbar-button {
          display: none;
          width: 0;
          height: 0;
        }
        .community-dm-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 999px;
        }
        .community-dm-scrollbar::-webkit-scrollbar-thumb {
          background: transparent;
          border: 2px solid transparent;
          border-radius: 999px;
          transition: background-color 220ms ease;
        }
        .community-dm-scrollbar:hover {
          scrollbar-color: rgba(47, 143, 70, 0.5) transparent;
        }
        .community-dm-scrollbar:hover::-webkit-scrollbar-thumb {
          background: rgba(47, 143, 70, 0.5);
        }
        .community-dm-scrollbar:hover::-webkit-scrollbar-thumb:hover {
          background: rgba(47, 143, 70, 0.72);
        }
        .dark .community-dm-scrollbar:hover {
          scrollbar-color: rgba(183, 227, 95, 0.38) transparent;
        }
        .dark .community-dm-scrollbar:hover::-webkit-scrollbar-thumb {
          background: rgba(183, 227, 95, 0.38);
        }
        .dark .community-dm-scrollbar:hover::-webkit-scrollbar-thumb:hover {
          background: rgba(199, 237, 125, 0.52);
        }
      `}</style>
      <div className="sticky top-20 z-30 mx-auto -mt-4 flex h-[calc(100dvh-6rem)] max-w-6xl flex-col overflow-hidden rounded-t-none rounded-b-3xl border border-slate-200 bg-white shadow-xl dark:border-neutral-800 dark:bg-[#121212] sm:mt-0 sm:h-[calc(100dvh-6.5rem)] sm:rounded-3xl md:top-20 lg:h-[calc(100dvh-7rem)] lg:top-[88px]">
        <header className="relative flex items-center gap-3 border-b border-slate-100 bg-white px-5 py-4 dark:border-neutral-800 dark:bg-[#121212] sm:px-7">
          <Link href={returnTo} aria-label="Back to previous page" className="rounded-xl p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-[#2F8F46] dark:hover:bg-neutral-800">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2F8F46] text-white">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-neutral-900 dark:text-white sm:text-lg">Community Messenger</h1>
            <p className="text-xs text-neutral-500">Chat with culinary creators and share dishes</p>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          <aside className={`w-full max-w-none flex-col border-r border-slate-100 dark:border-neutral-800 md:flex md:w-80 md:max-w-xs ${selectedContact ? "hidden" : "flex"}`}>
            <div className="relative z-20 border-b border-slate-100 bg-white px-4 py-2 dark:border-neutral-800 dark:bg-[#121212]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search cooks..."
                  className="w-full rounded-xl border border-slate-200 bg-neutral-50 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#2F8F46] dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                />
              </div>
            </div>
            <div className="community-dm-scrollbar min-h-0 flex-1 space-y-1 overflow-y-auto p-3">
              {isLoadingContacts ? (
                <p className="p-4 text-center text-xs text-neutral-400">Loading conversations...</p>
              ) : filteredContacts.length === 0 ? (
                <p className="p-4 text-center text-xs text-neutral-400">No conversations found.</p>
              ) : (
                filteredContacts.map((contact) => (
                  <button
                    type="button"
                    key={contact.id}
                    onClick={() => setSelectedContactId(contact.id)}
                    className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${selectedContactId === contact.id ? "bg-[#EAF7E8] text-[#176B35] dark:bg-neutral-800 dark:text-[#B7E35F]" : "hover:bg-neutral-50 dark:hover:bg-neutral-900"}`}
                  >
                    <CommunityAvatar src={contact.avatar} alt={contact.name} className="h-11 w-11 shrink-0 rounded-full object-cover" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-neutral-900 dark:text-white">{contact.name}</span>
                      <span className="block truncate text-xs text-neutral-400">{contact.lastMessage || "Start a conversation"}</span>
                    </span>
                    {!!contact.unreadCount && contact.unreadCount > 0 && <span className="rounded-full bg-[#2F8F46] px-2 py-0.5 text-[10px] font-bold text-white">{contact.unreadCount}</span>}
                  </button>
                ))
              )}
            </div>
          </aside>

          <section className={`min-w-0 flex-1 flex-col bg-neutral-50/50 dark:bg-neutral-950 ${selectedContact ? "flex" : "hidden md:flex"}`}>
            {selectedContact ? (
              <>
                <div className="flex items-center gap-3 border-b border-slate-100 bg-white px-5 py-2 dark:border-neutral-800 dark:bg-[#121212]">
                  <button type="button" onClick={() => setSelectedContactId("")} aria-label="Back to conversations" className="rounded-xl p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-[#2F8F46] dark:hover:bg-neutral-800 md:hidden">
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <CommunityAvatar src={selectedContact.avatar} alt={selectedContact.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <h2 className="text-sm font-bold text-neutral-900 dark:text-white">{selectedContact.name}</h2>
                    <p className="text-xs text-neutral-500">Community member</p>
                  </div>
                </div>
                <div ref={messagesContainerRef} className="community-dm-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto p-5">
                  {isLoadingMessages ? (
                    <p className="pt-12 text-center text-xs text-neutral-400">Loading conversation...</p>
                  ) : messages.length === 0 ? (
                    <p className="pt-12 text-center text-xs text-neutral-400">No messages yet. Start the conversation.</p>
                  ) : (
                    messages.map((message) => {
                      const isMe = message.senderId === session.user.id;
                      const text = messageText(message.text);
                      return (
                        <div key={message.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                          <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${isMe ? "rounded-br-none bg-[#2F8F46] text-white" : "rounded-bl-none border border-slate-200 bg-white text-neutral-800 dark:border-neutral-800 dark:bg-[#18181b] dark:text-neutral-100"}`}>
                            {message.attachedPost && <Link href={`/community/recipe/${encodeURIComponent(message.attachedPost.id)}`} className="mb-2 block overflow-hidden rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/20"><img src={message.attachedPost.imageUrl} alt={message.attachedPost.caption || "Shared Community post"} className="h-28 w-full object-cover" /><span className="block px-3 py-2 text-xs font-bold text-amber-800 dark:text-amber-200">🍳 Shared Community post</span></Link>}
                            {message.attachedStory && <Link href={`/community/story/${encodeURIComponent(message.attachedStory.id)}`} onClick={(event) => { if (message.attachedStory) void handleOpenStory(event, message.attachedStory.id); }} className="mb-2 block overflow-hidden rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/20"><img src={message.attachedStory.imageUrl} alt={message.attachedStory.caption || "Shared story"} className="h-28 w-full object-cover" /><span className="block px-3 py-2 text-xs font-bold text-amber-800 dark:text-amber-200">📷 Shared story</span></Link>}
                            {text && <p className="whitespace-pre-wrap break-words">{text}</p>}
                          </div>
                          <span className="mt-1 px-1 text-[10px] text-neutral-400">{message.timestamp}{isMe && <span className="ml-1">· {message.id === sendingMessageId ? "Sending..." : "Sent"}</span>}</span>
                        </div>
                      );
                    })
                  )}
                </div>
                <form onSubmit={handleSendMessage} className="flex gap-3 border-t border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-[#121212]">
                  <input value={inputMessage} onChange={(event) => setInputMessage(event.target.value)} disabled={isSending} placeholder={`Message @${selectedContact.username}...`} className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-[#2F8F46] disabled:cursor-wait disabled:opacity-60 dark:border-neutral-700 dark:bg-[#18181b] dark:text-white" />
                  <motion.button whileTap={{ scale: 0.95 }} type="submit" disabled={isSending || !inputMessage.trim()} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2F8F46] text-white transition hover:bg-[#176B35] disabled:cursor-wait disabled:opacity-40">
                    {isSending ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> : <Send className="h-4 w-4" />}
                  </motion.button>
                </form>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF7E8] text-[#2F8F46] dark:bg-emerald-950/50 dark:text-[#B7E35F]"><MessageSquare className="h-8 w-8" /></div>
                <h2 className="mt-5 text-lg font-extrabold text-neutral-900 dark:text-white">Select a conversation</h2>
                <p className="mt-2 max-w-sm text-sm text-neutral-500">Choose a Community member from the left to start messaging.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

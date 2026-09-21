import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { X, Send, MessageSquare, Search } from "lucide-react";
import { DirectMessageUser, Post } from "./types";
import { communityApi, CommunityMessage } from "@/app/api/community/community-api";
import { authClient } from "@/lib/auth-client";
import { CommunityAvatar } from "./CommunityAvatar";

const MESSAGES_PER_PAGE = 20;

interface SendDirectMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRecipientId?: string;
  attachedPost?: Post | null;
}

export const SendDirectMessageModal: React.FC<SendDirectMessageModalProps> = ({
  isOpen,
  onClose,
  initialRecipientId,
  attachedPost,
}) => {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [contacts, setContacts] = useState<DirectMessageUser[]>([]);
  const [selectedContactId, setSelectedContactId] = useState(initialRecipientId || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<CommunityMessage[]>([]);
  const [hasMoreMessages, setHasMoreMessages] = useState(false);
  const [isLoadingOlderMessages, setIsLoadingOlderMessages] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [sendingMessageId, setSendingMessageId] = useState<string | null>(null);
  const [pendingAttachedPost, setPendingAttachedPost] = useState<Post | null>(null);
  const messagesContainerRef = React.useRef<HTMLDivElement>(null);
  const selectedContact = contacts.find((contact) => contact.id === selectedContactId);
  const activeContact: DirectMessageUser = selectedContact || {
    id: "",
    name: "Select a cook",
    username: "community",
    avatar: "",
    online: false,
    lastMessage: "Choose a cook to open a conversation",
    lastMessageTime: "",
  };

  useEffect(() => {
    if (!isOpen || !session?.user) return;
    setSelectedContactId(initialRecipientId || "");
    setMessages([]);
    setHasMoreMessages(false);
    setIsSendingMessage(false);
    setSendingMessageId(null);
    setPendingAttachedPost(attachedPost || null);
    void communityApi
      .listContacts(initialRecipientId)
      .then((items) => {
        setContacts(items);
      })
      .catch(() => setContacts([]));
  }, [isOpen, initialRecipientId, session?.user?.id]);

  useEffect(() => {
    if (!isOpen || !attachedPost) {
      if (!isOpen) setInputMessage("");
      return;
    }
    setPendingAttachedPost(attachedPost);
    setInputMessage("");
  }, [isOpen, attachedPost?.id]);

  useEffect(() => {
    if (!isOpen || !selectedContactId) return;
    requestAnimationFrame(() => {
      const container = messagesContainerRef.current;
      if (container) container.scrollTop = container.scrollHeight;
    });
  }, [isOpen, selectedContactId, messages.length]);

  useEffect(() => {
    if (!isOpen || !selectedContactId) {
      setMessages([]);
      setHasMoreMessages(false);
      setIsLoadingMessages(false);
      return;
    }
    let cancelled = false;
    setMessages([]);
    setHasMoreMessages(false);
    setIsLoadingMessages(true);
    const load = () =>
      void communityApi
        .listMessages(selectedContactId, { take: MESSAGES_PER_PAGE, skip: 0 })
        .then((page) => {
          if (cancelled) return;
          setMessages((current) => {
            if (current.length === 0) return page.messages;
            const knownIds = new Set(current.map((message) => message.id));
            return [...current, ...page.messages.filter((message) => !knownIds.has(message.id))];
          });
          setHasMoreMessages(page.hasMore);
          void communityApi.markMessagesRead(selectedContactId);
        })
        .catch(() => {
          if (!cancelled) setMessages([]);
        })
        .finally(() => {
          if (!cancelled) setIsLoadingMessages(false);
        });
    load();
    const timer = window.setInterval(load, 8000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [isOpen, selectedContactId]);

  if (!isOpen) return null;

  const currentChatMessages = messages;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id || isSendingMessage) return;
    if ((!inputMessage.trim() && !pendingAttachedPost) || !activeContact.id) return;
    const messageText = inputMessage.trim();
    const attachedPostForMessage = pendingAttachedPost;
    const temporaryMessageId = `pending-${Date.now()}`;
    const optimisticMessage: CommunityMessage = {
      id: temporaryMessageId,
      senderId: session.user.id,
      recipientId: activeContact.id,
      text: messageText,
      attachedPostId: attachedPostForMessage?.id,
      attachedPost: attachedPostForMessage
        ? { id: attachedPostForMessage.id, imageUrl: attachedPostForMessage.imageUrl, caption: attachedPostForMessage.caption }
        : null,
      timestamp: "Just now",
    };

    setMessages((current) => [...current, optimisticMessage]);
    setInputMessage("");
    setPendingAttachedPost(null);
    setIsSendingMessage(true);
    setSendingMessageId(temporaryMessageId);

    try {
      await communityApi.sendMessage(
        activeContact.id,
        messageText,
        attachedPostForMessage?.id,
        session.user.id,
      );
      const page = await communityApi.listMessages(activeContact.id, { take: MESSAGES_PER_PAGE, skip: 0 });
      setMessages((current) => {
        const knownIds = new Set(current.filter((message) => message.id !== temporaryMessageId).map((message) => message.id));
        return [
          ...current.filter((message) => message.id !== temporaryMessageId),
          ...page.messages.filter((message) => !knownIds.has(message.id)),
        ];
      });
      setHasMoreMessages(page.hasMore);
      toast.success("Message sent");
    } catch (error) {
      setMessages((current) => current.filter((message) => message.id !== temporaryMessageId));
      setInputMessage(messageText);
      setPendingAttachedPost(attachedPostForMessage);
      toast.error(error instanceof Error ? error.message : "Unable to send message");
    } finally {
      setIsSendingMessage(false);
      setSendingMessageId(null);
    }
  };

  const loadOlderMessages = async () => {
    if (!activeContact.id || !hasMoreMessages || isLoadingOlderMessages) return;
    setIsLoadingOlderMessages(true);
    try {
      const page = await communityApi.listMessages(activeContact.id, {
        take: MESSAGES_PER_PAGE,
        skip: messages.length,
      });
      setMessages((current) => {
        const uniqueMessages = new Map<string, CommunityMessage>();
        [...page.messages, ...current].forEach((message) => uniqueMessages.set(message.id, message));
        return [...uniqueMessages.values()];
      });
      setHasMoreMessages(page.hasMore);
    } finally {
      setIsLoadingOlderMessages(false);
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

  const filteredContacts = contacts.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
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
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-3xl rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-[#121212] h-[600px] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2F8F46] text-white">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-neutral-900 dark:text-white">Community Direct Messages</h3>
              <p className="text-xs text-neutral-500">Chat with culinary creators and share dishes</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="rounded-full p-2 text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Chat Layout: Left contact sidebar + Right active chat */}
        <div className="flex flex-1 overflow-hidden">
          {/* Contacts Sidebar */}
          <div className="w-1/3 border-r border-slate-100 p-3.5 dark:border-neutral-800 flex flex-col">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search cooks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-neutral-50 py-2 pl-9 pr-3 text-xs focus:border-[#2F8F46] dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContactId(contact.id)}
                  className={`flex items-center gap-3 rounded-2xl p-2.5 cursor-pointer transition ${
                    selectedContact?.id === contact.id
                      ? "bg-[#EAF7E8] text-[#176B35] dark:bg-neutral-800 dark:text-[#B7E35F]"
                      : "hover:bg-neutral-50 text-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900"
                  }`}
                >
                  <div className="relative">
                    <CommunityAvatar
                      src={contact.avatar}
                      alt={contact.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h5 className="truncate text-xs font-bold">{contact.name}</h5>
                    <p className="truncate text-[11px] text-neutral-400">{contact.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Chat Conversation Area */}
          <div className="flex-1 flex flex-col bg-neutral-50/50 dark:bg-neutral-950">
            {/* Chat Top Banner */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-3 dark:border-neutral-800 dark:bg-[#121212]">
              <div className="flex items-center gap-3">
                <CommunityAvatar
                  src={activeContact.avatar}
                  alt={activeContact.name}
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">
                    {activeContact.name}
                  </h4>
                  <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">Community member</span>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div ref={messagesContainerRef} className="community-dm-scrollbar min-w-0 flex-1 overflow-x-hidden overflow-y-auto p-5 space-y-3.5">
              {hasMoreMessages && (
                <button
                  type="button"
                  onClick={() => void loadOlderMessages()}
                  disabled={isLoadingOlderMessages}
                  className="mx-auto block rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-bold text-[#176B35] transition hover:bg-[#EAF7E8] disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-700 dark:text-[#B7E35F] dark:hover:bg-emerald-950/40"
                >
                  {isLoadingOlderMessages ? "Loading older messages..." : "Load older messages"}
                </button>
              )}
              {!selectedContactId ? (
                <p className="pt-12 text-center text-xs text-neutral-400">Select a cook to start messaging.</p>
              ) : isLoadingMessages ? (
                <p className="pt-12 text-center text-xs text-neutral-400">Loading conversation...</p>
              ) : currentChatMessages.map((msg) => {
                const isMe = msg.senderId === session?.user.id;
                return (
                  <div key={msg.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                    <div
                      className={`max-w-[85%] break-words whitespace-pre-wrap rounded-2xl p-3.5 text-xs sm:max-w-md sm:text-sm leading-relaxed ${
                        isMe
                          ? "bg-[#2F8F46] text-white rounded-br-none shadow-xs"
                          : "bg-white text-neutral-800 border border-slate-200 rounded-bl-none shadow-xs dark:bg-[#18181b] dark:text-neutral-100 dark:border-neutral-800"
                      }`}
                    >
                      {msg.attachedPost && <a href={`/community/recipe/${encodeURIComponent(msg.attachedPost.id)}`} className="mb-2 block w-full max-w-[260px] overflow-hidden rounded-xl border border-amber-200 bg-amber-50 text-left dark:border-amber-900/50 dark:bg-amber-950/20"><img src={msg.attachedPost.imageUrl} alt={msg.attachedPost.caption || "Shared Community post"} className="h-28 w-full object-cover" /><span className="block px-3 pt-2 text-[11px] font-bold text-amber-800 dark:text-amber-200">🍳 Shared Community post</span>{msg.attachedPost.caption && <span className="block break-words px-3 pb-2 pt-1 text-xs text-amber-900 dark:text-amber-100">{msg.attachedPost.caption}</span>}</a>}
                      {msg.attachedStory && <a href={`/community/story/${encodeURIComponent(msg.attachedStory.id)}`} onClick={(event) => { if (msg.attachedStory) void handleOpenStory(event, msg.attachedStory.id); }} className="mb-2 block w-full max-w-[260px] overflow-hidden rounded-xl border border-amber-200 bg-amber-50 text-left dark:border-amber-900/50 dark:bg-amber-950/20"><img src={msg.attachedStory.imageUrl} alt={msg.attachedStory.caption || "Shared story"} className="h-28 w-full object-cover" /><span className="mt-1 block break-words px-3 pb-2 text-[11px] font-bold text-amber-800 dark:text-amber-200">📷 Shared story{msg.attachedStory.caption ? `: ${msg.attachedStory.caption}` : ""}</span></a>}
                      {(() => {
                        const visibleText = msg.text
                          .replace(/https?:\/\/\S+/g, "")
                          .replace(/^\s*Check out this Community recipe:?\s*/i, "")
                          .trim();
                        return visibleText ? <p>{visibleText}</p> : null;
                      })()}
                    </div>
                    <span className="mt-1 px-1 text-[10px] text-neutral-400">
                      {msg.timestamp}
                      {isMe && <span className="ml-1">· {msg.id === sendingMessageId ? "Sending..." : "Sent"}</span>}
                    </span>
                  </div>
                );
              })}
              {selectedContactId && !isLoadingMessages && currentChatMessages.length === 0 && (
                <p className="pt-12 text-center text-xs text-neutral-400">No messages yet. Start the conversation.</p>
              )}
            </div>

            {/* Attached Recipe Callout before sending */}
            {pendingAttachedPost?.recipe && (
              <div className="flex items-center justify-between bg-[#FFF0DD] px-5 py-2 text-xs text-amber-950 border-t border-amber-200">
                <span className="truncate font-semibold text-xs">📎 Attached Recipe: {pendingAttachedPost.recipe.title}</span>
                <span className="text-[11px] text-amber-700">Will send with message</span>
              </div>
            )}

            {/* Message Input Box */}
            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-2.5 border-t border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-[#121212]"
            >
              <input
                type="text"
                placeholder={`Message @${activeContact.username}...`}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isSendingMessage}
                className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-neutral-50 px-4 py-2.5 text-xs text-neutral-900 focus:border-[#2F8F46] disabled:cursor-wait disabled:opacity-60 sm:text-sm dark:border-neutral-700 dark:bg-[#18181b] dark:text-white"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSendingMessage || (!inputMessage.trim() && !pendingAttachedPost) || !activeContact.id}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2F8F46] text-white shadow-xs transition hover:bg-[#176B35] disabled:cursor-wait disabled:opacity-40"
              >
                {isSendingMessage ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> : <Send className="h-4 w-4" />}
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  Send,
  MessageSquare,
  Search,
  Sparkles,
  Code,
} from 'lucide-react';
import { DirectMessageUser, Post } from './types';
import { INITIAL_DM_CONTACTS, CURRENT_USER } from './mockData';

interface SendDirectMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRecipientId?: string;
  attachedPost?: Post | null;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  attachedRecipe?: {
    title: string;
    imageUrl: string;
    calories?: number;
  };
}

export const SendDirectMessageModal: React.FC<SendDirectMessageModalProps> = ({
  isOpen,
  onClose,
  initialRecipientId,
  attachedPost,
}) => {
  const [contacts] = useState<DirectMessageUser[]>(INITIAL_DM_CONTACTS);
  const [selectedContact, setSelectedContact] = useState<DirectMessageUser>(
    contacts.find((c) => c.id === initialRecipientId) || contacts[0]
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [showSocketIoGuide, setShowSocketIoGuide] = useState(false);

  const [messages, setMessages] = useState<Record<string, Message[]>>({
    dm_1: [
      {
        id: 'm1',
        senderId: 'dm_1',
        text: 'Hey Alex! Loved your recent citrus salmon recipe. Have you tried subbing the basil for tarragon?',
        timestamp: '12m ago',
      },
    ],
    dm_2: [
      {
        id: 'm2',
        senderId: 'dm_2',
        text: 'Awesome food photography! What lighting setup do you use in your kitchen?',
        timestamp: '2h ago',
      },
    ],
    dm_3: [
      {
        id: 'm3',
        senderId: 'dm_3',
        text: 'Here is the sourdough starter feeding schedule we talked about 🥖',
        timestamp: 'Yesterday',
      },
    ],
  });

  if (!isOpen) return null;

  const currentChatMessages = messages[selectedContact.id] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() && !attachedPost) return;

    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      senderId: CURRENT_USER.id,
      text: inputMessage.trim() || 'Check out this delicious recipe!',
      timestamp: 'Just now',
      attachedRecipe: attachedPost?.recipe
        ? {
            title: attachedPost.recipe.title,
            imageUrl: attachedPost.imageUrl,
            calories: attachedPost.recipe.nutrition.calories,
          }
        : undefined,
    };

    setMessages((prev) => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMsg],
    }));

    setInputMessage('');
  };

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
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
              <h3 className="font-extrabold text-base text-neutral-900 dark:text-white">
                Community Direct Messages
              </h3>
              <p className="text-xs text-neutral-500">
                Chat with culinary creators and share dishes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSocketIoGuide(!showSocketIoGuide)}
              className="flex items-center gap-1.5 rounded-xl bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-900 hover:bg-amber-100 dark:bg-amber-950 dark:text-amber-300"
            >
              <Code className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Socket.IO Schema</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Socket.IO backend architecture note */}
        {showSocketIoGuide && (
          <div className="bg-[#FFF0DD] p-3.5 text-xs text-amber-950 dark:bg-amber-950/80 dark:text-amber-200 border-b border-amber-200 dark:border-amber-900">
            <p className="font-bold flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-[#FF9F43]" /> Ready for Socket.IO Backend Integration:
            </p>
            <p className="mt-1 text-xs leading-relaxed">
              When your team connects a Socket.IO server, emit <code className="bg-white/60 px-1 py-0.5 rounded font-mono text-[11px]">socket.emit('send_direct_message', &#123; recipientId, text, recipeId &#125;)</code> and listen on <code className="bg-white/60 px-1 py-0.5 rounded font-mono text-[11px]">socket.on('receive_direct_message')</code>.
            </p>
          </div>
        )}

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
                  onClick={() => setSelectedContact(contact)}
                  className={`flex items-center gap-3 rounded-2xl p-2.5 cursor-pointer transition ${
                    selectedContact.id === contact.id
                      ? 'bg-[#EAF7E8] text-[#176B35] dark:bg-neutral-800 dark:text-[#B7E35F]'
                      : 'hover:bg-neutral-50 text-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    {contact.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-neutral-900" />
                    )}
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
                <img
                  src={selectedContact.avatar}
                  alt={selectedContact.name}
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">
                    {selectedContact.name}
                  </h4>
                  <span className="text-[11px] text-emerald-600 font-semibold">
                    {selectedContact.online ? '● Active now' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
              {currentChatMessages.map((msg) => {
                const isMe = msg.senderId === CURRENT_USER.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-xs sm:max-w-md rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                        isMe
                          ? 'bg-[#2F8F46] text-white rounded-br-none shadow-xs'
                          : 'bg-white text-neutral-800 border border-slate-200 rounded-bl-none shadow-xs dark:bg-[#18181b] dark:text-neutral-100 dark:border-neutral-800'
                      }`}
                    >
                      {/* If there's an attached recipe preview */}
                      {msg.attachedRecipe && (
                        <div className="mb-2.5 rounded-xl bg-black/10 p-2 overflow-hidden">
                          <img
                            src={msg.attachedRecipe.imageUrl}
                            alt={msg.attachedRecipe.title}
                            className="h-24 w-full rounded-lg object-cover mb-1.5"
                          />
                          <p className="font-bold text-xs truncate">
                            🍳 {msg.attachedRecipe.title}
                          </p>
                        </div>
                      )}
                      <p>{msg.text}</p>
                    </div>
                    <span className="text-[10px] text-neutral-400 mt-1 px-1">{msg.timestamp}</span>
                  </div>
                );
              })}
            </div>

            {/* Attached Recipe Callout before sending */}
            {attachedPost?.recipe && (
              <div className="flex items-center justify-between bg-[#FFF0DD] px-5 py-2 text-xs text-amber-950 border-t border-amber-200">
                <span className="truncate font-semibold text-xs">
                  📎 Attached Recipe: {attachedPost.recipe.title}
                </span>
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
                placeholder={`Message @${selectedContact.username}...`}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 rounded-xl border border-slate-200 bg-neutral-50 px-4 py-2.5 text-xs sm:text-sm text-neutral-900 focus:border-[#2F8F46] dark:border-neutral-700 dark:bg-[#18181b] dark:text-white"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!inputMessage.trim() && !attachedPost}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2F8F46] text-white shadow-xs transition hover:bg-[#176B35] disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

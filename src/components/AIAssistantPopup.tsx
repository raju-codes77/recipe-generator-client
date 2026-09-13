'use client';

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiX, FiCpu, FiUser, FiRefreshCw } from "react-icons/fi";
import { SpeakerIcon } from "lucide-react";

interface Message {
  sender: "ai" | "user";
  text: string;
}

export default function AIAssistantPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hello! How can I help you with recipes or cooking tips today?",
    },
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const popularPrompts = [
    "Quick dinner with chicken",
    "Low calorie breakfast",
    "Vegan pasta recipe",
    "Healthy smoothie ideas",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, isOpen]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || loading) return;

    const userMessage: Message = { sender: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    if (!queryText) setInputQuery("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: textToSend }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.reply) {
        const aiMessage: Message = { sender: "ai", text: data.reply };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        const errorMessage: Message = { 
          sender: "ai", 
          text: data.error || data.reply || "The chat service could not complete the request." 
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Failed to connect to chat API:", error);
      const errorMessage: Message = { 
        sender: "ai", 
        text: "Failed to connect to the server. Please try again." 
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-[22px] border-2 border-white bg-linear-to-br from-[#2F8F46] via-[#2F8F46] to-[#1f6532] text-white shadow-2xl shadow-[#2F8F46]/40 transition-all duration-300 sm:h-16 sm:w-16"
          aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
          aria-expanded={isOpen}
        >
          <span className="pointer-events-none absolute inset-0 rounded-[22px] bg-[#b7df86] opacity-10 transition group-hover:opacity-20" />
          <div className="relative flex items-center justify-center">
            {isOpen ? <FiX size={26} /> : <FiCpu size={26} className="animate-pulse" />}
          </div>
          {!isOpen && <span className="absolute right-1.5 top-1.5 rounded-lg bg-[#fffaf0] p-1 text-[#FF9F43] shadow-md dark:bg-black"><SpeakerIcon size={10} /></span>}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
            role="dialog"
            aria-label="FlavorAI cooking assistant"
            className="fixed bottom-24 right-3 z-50 flex h-[min(590px,calc(100vh-112px))] w-[calc(100vw-24px)] flex-col overflow-hidden rounded-[28px] border border-[#e6dfd2] bg-[#fffdf8] shadow-[0_20px_60px_rgba(36,67,45,0.22)] dark:border-[#89986D]/20 dark:bg-[#121212] sm:right-6 sm:w-100"
          >
            <div className="relative flex items-center justify-between overflow-hidden bg-linear-to-br from-[#2F8F46] to-[#1f6532] px-5 py-4 text-white shadow-md">
              <span className="pointer-events-none absolute -right-8 -top-12 h-32 w-32 rounded-full border-14 border-[#FFB45A]/25" />
              <div className="relative flex items-center gap-2.5">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 text-[#ffe0a5] ring-1 ring-white/20 backdrop-blur-md">
                  <FiCpu size={18} />
                </div>
                <div className="relative">
                  <h3 className="flex items-center gap-2 text-[15px] font-extrabold tracking-tight">
                    FlavorAI <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[9px] uppercase tracking-wider text-[#e9f7d8]"><span className="h-1.5 w-1.5 rounded-full bg-[#b7df86]" /> Live</span>
                  </h3>
                  <p className="mt-0.5 text-[10px] text-emerald-100/75">Your cooking companion</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setMessages([{ sender: "ai", text: "Chat cleared! How can I help you?" }])}
                  className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
                  title="Clear Chat"
                >
                  <FiRefreshCw size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl p-2 text-white/80 transition hover:bg-white/15 hover:text-white"
                  aria-label="Close AI assistant"
                  title="Close assistant"
                >
                  <FiX size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f8f6ef] dark:bg-[#121212]">
              {messages.length === 1 && (
                <div className="mb-4 rounded-2xl border border-[#eadfca] bg-[#fffdf8] px-4 py-3 dark:border-[#89986D]/20 dark:bg-[#89986D]/10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#2F8F46] dark:text-[#b7df86]">Kitchen shortcut</p>
                  <p className="mt-1 text-[11px] leading-5 text-gray-500 dark:text-gray-300/70">Share your ingredients, cravings, or time limit and I&apos;ll help you plan a meal.</p>
                </div>
              )}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className={`w-8 h-8 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-sm ${
                    msg.sender === "user" ? "bg-[#FF9F43]" : "bg-[#2F8F46]"
                  }`}>
                    {msg.sender === "user" ? <FiUser size={14} /> : <FiCpu size={14} />}
                  </div>
                  <div className={`max-w-[78%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    msg.sender === "user"
                      ? "bg-[#2F8F46] text-white rounded-tr-none"
                      : "bg-white dark:bg-[#89986D]/10 text-gray-800 dark:text-[#F6F0D7] border border-gray-200/60 dark:border-[#89986D]/20 rounded-tl-none"
                  }`}>
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-[#2F8F46] text-white flex items-center justify-center shadow-sm">
                    <FiCpu size={14} />
                  </div>
                  <div className="p-3 rounded-2xl bg-white dark:bg-[#89986D]/10 border border-gray-200 dark:border-[#89986D]/20 rounded-tl-none flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F8F46] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF9F43] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F8F46] animate-bounce [animation-delay:0.4s]" />
                    <span className="ml-1 text-[10px] text-gray-400">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="px-4 py-3 bg-[#fffdf8] dark:bg-[#181818] border-t border-[#ece5d8] dark:border-[#89986D]/10 overflow-x-auto whitespace-nowrap">
              <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.16em] text-gray-400 dark:text-gray-500">Try asking</p>
              <div className="flex gap-2">
                {popularPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSendMessage(prompt)}
                    disabled={loading}
                    className="text-[11px] px-3 py-2 rounded-xl bg-white dark:bg-[#89986D]/10 text-gray-700 dark:text-[#F6F0D7]/80 hover:bg-[#eef7e6] hover:text-[#2F8F46] border border-[#e5dfd2] dark:border-[#89986D]/20 transition flex items-center gap-1 shadow-sm"
                  >
                    <span>✨</span> {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 bg-[#fffdf8] dark:bg-[#181818] border-t border-[#e8e1d5] dark:border-[#89986D]/20">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }} 
                className="flex items-center gap-2 rounded-2xl border border-[#ddd8cb] bg-white p-1.5 pl-3 shadow-sm transition focus-within:border-[#7fb35c] focus-within:ring-2 focus-within:ring-[#b7df86]/30"
              >
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="What are we cooking today?"
                  aria-label="Message FlavorAI"
                  className="min-w-0 flex-1 bg-transparent px-1 py-2 text-xs text-gray-900 outline-none placeholder:text-gray-400 dark:text-[#16140a]"
                />
                <button
                  type="submit"
                  disabled={loading || !inputQuery.trim()}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#2F8F46] hover:bg-[#257537] text-white transition shadow-md disabled:opacity-50"
                  aria-label="Send message"
                >
                  <FiSend size={15} />
                </button>
              </form>
            </div>          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
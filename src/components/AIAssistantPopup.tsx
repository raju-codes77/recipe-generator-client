'use client';

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiX, FiRefreshCw, FiUser } from "react-icons/fi";
import { Sparkles } from "lucide-react";
import FoodCanvasAIIcon from "./FoodCanvasAIIcon";
import { getApiBaseUrl } from "@/lib/api-url";

interface Message {
  sender: "ai" | "user";
  text: string;
}

export default function AIAssistantPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hello! I'm your FoodCanvas AI culinary assistant. How can I help you with recipes, ingredients, or cooking tips today?",
    },
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const popularPrompts = [
    "Quick 20-min dinner",
    "Low calorie breakfast",
    "Vegetarian pasta",
    "Healthy smoothie ideas",
    "What to cook with eggs?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, loading, isOpen]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || loading) return;

    const userMessage: Message = { sender: "user", text: textToSend.trim() };
    setMessages((prev) => [...prev, userMessage]);
    if (!queryText) setInputQuery("");
    setLoading(true);

    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: textToSend.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.reply) {
        const aiMessage: Message = { sender: "ai", text: data.reply };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        const errorMessage: Message = {
          sender: "ai",
          text: data.error || data.reply || "I couldn't complete that recipe request right now. Please try again!",
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Failed to connect to FoodCanvas chat API:", error);
      const errorMessage: Message = {
        sender: "ai",
        text: "Unable to reach the culinary assistant. Please check your connection and try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
        <motion.button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className={`group relative flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-2xl sm:rounded-[22px] transition-all duration-300 ${
            isOpen
              ? "bg-gradient-to-br from-[#14532D] via-[#166534] to-[#15803D] text-white shadow-[0_10px_25px_rgba(20,83,45,0.35)] border border-white/20"
              : "bg-white dark:bg-slate-850 border-2 border-emerald-500/35 hover:border-emerald-600 shadow-[0_10px_28px_rgba(15,80,50,0.22)] hover:shadow-[0_14px_34px_rgba(15,80,50,0.32)]"
          }`}
          aria-label={isOpen ? "Close FoodCanvas AI Assistant" : "Open FoodCanvas AI Assistant"}
          aria-expanded={isOpen}
        >
          {/* Subtle Ambient Pulse Ring when closed */}
          {!isOpen && (
            <span className="absolute -inset-0.5 -z-10 animate-ping rounded-2xl sm:rounded-[22px] bg-emerald-500 opacity-20 duration-1000" />
          )}

          {/* Smooth Icon Transition */}
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center text-white"
              >
                <FiX size={22} strokeWidth={2.5} />
              </motion.div>
            ) : (
              <motion.div
                key="chat-icon"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                <FoodCanvasAIIcon size={36} animateDots withOuterGlow />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chatbox Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 320 }}
            role="dialog"
            aria-label="FoodCanvas AI cooking assistant"
            className="fixed bottom-21 right-3 sm:bottom-24 sm:right-6 z-50 flex h-[min(520px,calc(100dvh-105px))] w-[calc(100vw-24px)] sm:w-[380px] flex-col overflow-hidden rounded-[26px] border border-emerald-900/15 dark:border-slate-700/60 bg-[#FAFAF8] dark:bg-slate-900 shadow-[0_20px_50px_rgba(20,83,45,0.22)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-emerald-800/20 bg-gradient-to-r from-[#14532D] via-[#166534] to-[#15803D] px-4 py-3 text-white">
              {/* Soft decorative glow */}
              <div className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full bg-emerald-400/15 blur-xl" />

              <div className="relative flex items-center gap-2.5">
                {/* Brand AI Icon Avatar */}
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white dark:bg-slate-850 p-0.5 shadow-xs ring-1 ring-white/30 backdrop-blur-xs">
                  <FoodCanvasAIIcon size={28} withOuterGlow />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-[14px] font-bold tracking-tight text-white">FoodCanvas AI</h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-200 ring-1 ring-emerald-400/30">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                      Sous Chef
                    </span>
                  </div>
                  <p className="text-[10px] text-emerald-100/80">Your smart cooking companion</p>
                </div>
              </div>

              {/* Header Action Controls */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() =>
                    setMessages([
                      {
                        sender: "ai",
                        text: "Chat cleared! How can I help you cook something delicious today?",
                      },
                    ])
                  }
                  className="rounded-lg p-1.5 text-emerald-100/80 transition hover:bg-white/10 hover:text-white"
                  title="Clear conversation"
                  aria-label="Clear chat"
                >
                  <FiRefreshCw size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1.5 text-emerald-100/80 transition hover:bg-white/10 hover:text-white"
                  title="Close assistant"
                  aria-label="Close assistant"
                >
                  <FiX size={17} />
                </button>
              </div>
            </div>

            {/* Conversation Messages Body */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-[#F6F6F2] dark:bg-slate-900/90">
              {messages.length === 1 && (
                <div className="rounded-2xl border border-emerald-700/10 bg-white/80 p-3 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-800/60">
                  <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-[#176B4D] dark:text-emerald-400">
                    <Sparkles size={12} className="text-amber-500" />
                    <span>FOODCANVAS KITCHEN ASSISTANT</span>
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                    Share your ingredients, diet preferences, or meal cravings and I&apos;ll craft recipes and guide your cooking!
                  </p>
                </div>
              )}

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  {msg.sender === "ai" ? (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-600/20 shadow-2xs">
                      <FoodCanvasAIIcon size={20} />
                    </div>
                  ) : (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500 text-white shadow-2xs">
                      <FiUser size={13} />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[12.5px] leading-relaxed shadow-2xs ${
                      msg.sender === "user"
                        ? "rounded-tr-xs bg-gradient-to-br from-[#176B4D] to-[#1e7a53] text-white"
                        : "rounded-tl-xs border border-slate-200/80 dark:border-slate-700/70 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                    }`}
                  >
                    <p className="whitespace-pre-line break-words">{msg.text}</p>
                  </div>
                </div>
              ))}

              {/* Loading / Typing Indicator */}
              {loading && (
                <div className="flex items-start gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-600/20 shadow-2xs">
                    <FoodCanvasAIIcon size={20} />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-xs border border-slate-200/80 dark:border-slate-700/70 bg-white dark:bg-slate-800 px-3.5 py-2.5 shadow-2xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#176B4D] animate-bounce" />
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.18s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-bounce [animation-delay:0.36s]" />
                    <span className="ml-1 text-[11px] font-medium text-slate-400 dark:text-slate-500">Chef is thinking...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="border-t border-slate-200/70 dark:border-slate-800 bg-[#FAFAF8] dark:bg-slate-900/95 px-3 py-2">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {popularPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSendMessage(prompt)}
                    disabled={loading}
                    className="shrink-0 rounded-full border border-emerald-900/10 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-700 dark:text-slate-300 shadow-2xs transition-colors hover:border-emerald-500 hover:bg-emerald-50/70 hover:text-emerald-800 dark:hover:border-emerald-500 dark:hover:bg-slate-700/70 dark:hover:text-emerald-300 disabled:opacity-50"
                  >
                    ✨ {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form Area */}
            <div className="border-t border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 p-1 pl-3 shadow-2xs transition-all focus-within:border-emerald-600 focus-within:bg-white dark:focus-within:bg-slate-800 focus-within:ring-2 focus-within:ring-emerald-500/15"
              >
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask for recipes, tips, or ingredients..."
                  aria-label="Ask FoodCanvas AI"
                  disabled={loading}
                  className="min-w-0 flex-1 bg-transparent py-1.5 text-xs text-slate-800 dark:text-slate-100 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  disabled={loading || !inputQuery.trim()}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white shadow-xs transition-all disabled:opacity-35 disabled:hover:bg-emerald-700"
                  aria-label="Send message"
                >
                  <FiSend size={13} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
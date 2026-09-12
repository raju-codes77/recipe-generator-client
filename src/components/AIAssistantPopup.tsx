"use client";

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

  // Auto scroll to bottom of chat messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, isOpen]);

  // Handle sending message to backend
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

      if (data.success) {
        const aiMessage: Message = { sender: "ai", text: data.reply };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        const errorMessage: Message = { 
          sender: "ai", 
          text: "Error: " + (data.error || "Something went wrong") 
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
      {/* 1. Bottom Right Fixed Floating AI Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="relative group flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#2F8F46] via-[#FF9F43] to-[#2F8F46] shadow-2xl shadow-[#2F8F46]/50 border-2 border-white dark:border-[#89986D]/30 transition-all duration-300 overflow-hidden"
          aria-label="Open AI Assistant"
        >
          {/* Glowing Pulse Effect */}
          <span className="absolute inset-0 rounded-full bg-[#2F8F46] animate-ping opacity-30 pointer-events-none" />

          {/* Unique AI Icon */}
          <div className="relative text-white flex items-center justify-center">
            <FiCpu size={26} className="animate-pulse" />
          </div>

          {/* Floating Sparkle Badge */}
          <span className="absolute top-1 right-1 bg-white dark:bg-black text-[#FF9F43] p-1 rounded-full shadow-md">
            <SpeakerIcon size={10} />
          </span>
        </motion.button>
      </div>

      {/* 2. Bottom Right Corner Pop-up Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
            className="fixed bottom-24 right-6 z-50 w-[92vw] sm:w-[400px] h-[520px] bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#89986D]/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-5 py-3.5 bg-gradient-to-r from-[#2F8F46] to-[#257537] text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <FiCpu size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold flex items-center gap-1.5">
                    FlavorAI <span className="bg-orange-500 text-white text-[9px] px-1.5 py-0.5 rounded-full uppercase">Live</span>
                  </h3>
                  <p className="text-[10px] text-emerald-100/80">Your cooking assistant</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMessages([{ sender: "ai", text: "Chat cleared! How can I help you?" }])}
                  className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
                  title="Clear Chat"
                >
                  <FiRefreshCw size={14} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
                >
                  <FiX size={18} />
                </button>
              </div>
            </div>

            {/* Chat Messages Body Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 dark:bg-[#121212]">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-sm ${
                    msg.sender === "user" ? "bg-[#FF9F43]" : "bg-[#2F8F46]"
                  }`}>
                    {msg.sender === "user" ? <FiUser size={14} /> : <FiCpu size={14} />}
                  </div>

                  <div className={`max-w-[78%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    msg.sender === "user"
                      ? "bg-[#2F8F46] text-white rounded-tr-none"
                      : "bg-white dark:bg-[#89986D]/10 text-gray-800 dark:text-[#F6F0D7] border border-gray-200/60 dark:border-[#89986D]/20 rounded-tl-none"
                  }`}>
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>
              ))}

              {/* Loading Indicator */}
              {loading && (
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-[#2F8F46] text-white flex items-center justify-center shadow-sm">
                    <FiCpu size={14} />
                  </div>
                  <div className="p-3 rounded-2xl bg-white dark:bg-[#89986D]/10 border border-gray-200 dark:border-[#89986D]/20 rounded-tl-none flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F8F46] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF9F43] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F8F46] animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Trending Prompts / Chips */}
            <div className="px-3 py-2 bg-white dark:bg-[#181818] border-t border-gray-100 dark:border-[#89986D]/10 overflow-x-auto whitespace-nowrap">
              <div className="flex gap-1.5">
                {popularPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSendMessage(prompt)}
                    disabled={loading}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-[#89986D]/10 text-gray-700 dark:text-[#F6F0D7]/80 hover:bg-[#2F8F46]/10 hover:text-[#2F8F46] border border-gray-200 dark:border-[#89986D]/20 transition flex items-center gap-1"
                  >
                    <span>✨</span> {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form Footer */}
            <div className="p-3 bg-white dark:bg-[#181818] border-t border-gray-200 dark:border-[#89986D]/20">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }} 
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask recipe, tips..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-[#89986D]/10 border border-gray-200 dark:border-[#89986D]/20 text-xs text-gray-900 dark:text-[#F6F0D7] focus:outline-none focus:border-[#2F8F46]"
                />
                <button
                  type="submit"
                  disabled={loading || !inputQuery.trim()}
                  className="p-2.5 rounded-xl bg-[#2F8F46] hover:bg-[#257537] text-white transition shadow-md disabled:opacity-50"
                >
                  <FiSend size={15} />
                </button>
              </form>
            </div>                                                                                                  

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
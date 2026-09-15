"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSend, FiCpu, FiUser, FiRefreshCw } from "react-icons/fi";
import { SparkleIcon } from "lucide-react";

interface Message {
  sender: "ai" | "user";
  text: string;
}

export default function AIChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hello! I am your FlavorAI Assistant. Ask me anything about recipes, ingredients, custom diet plans, or cooking tips!",
    },
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const popularPrompts = [
    "Quick dinner with chicken",
    "Low calorie breakfast recipes",
    "Vegan pasta step-by-step",
    "Healthy smoothie ideas for weight loss",
  ];

  // Auto scroll to bottom when new message arrives
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

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
          text: "Error: " + (data.error || "Something went wrong from the server.") 
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Failed to connect to chat API:", error);
      const errorMessage: Message = { 
        sender: "ai", 
        text: "Failed to connect to the server. Please make sure the backend is running." 
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f1] px-3 py-4 transition-colors dark:bg-[#0e140f] sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-5xl flex-col overflow-hidden rounded-[30px] border border-[#dfe8da] bg-[#fffefa] shadow-[0_24px_80px_rgba(43,77,51,0.12)] dark:border-white/10 dark:bg-[#151b17] sm:min-h-[calc(100vh-3rem)]">
        
        {/* Chat Header */}
        <div className="relative flex items-center justify-between overflow-hidden bg-linear-to-br from-[#1f6a3a] via-[#2F8F46] to-[#174f2b] px-5 py-5 text-white shadow-md sm:px-7">
          <span className="absolute -right-12 -top-20 h-48 w-48 rounded-full border-22 border-[#f8c657]/20" />
          <div className="relative flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-[#ffe1a6] shadow-inner ring-1 ring-white/20">
              <FiCpu size={22} className="animate-pulse" />
            </div>
            <div>
              <h2 className="flex items-center gap-2 text-base font-extrabold tracking-wide sm:text-lg">
                FlavorAI <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#e9f7d8]"><span className="h-1.5 w-1.5 rounded-full bg-[#b7df86]" /> Online</span>
              </h2>
              <p className="mt-0.5 text-[11px] text-emerald-100/75">Your intelligent cooking & nutrition partner</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={() => setMessages([{ sender: "ai", text: "Chat cleared! How can I help you today?" }])}
            className="relative flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold transition hover:bg-white/20"
          >
            <FiRefreshCw size={14} /> Clear Chat
          </button>
        </div>

        {/* Chat Messages Body Area */}
        <div className="flex-1 overflow-y-auto bg-[#f8f8f3] p-4 dark:bg-[#101511] sm:min-h-112.5 sm:p-7">
          <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-[#e6ebe1] pb-4 dark:border-white/10">
            <span className="flex items-center gap-1.5 rounded-full bg-[#edf6e8] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#2F8F46] dark:bg-[#2F8F46]/15 dark:text-[#b7df86]"><SparkleIcon size={12} /> Recipe studio</span>
            <span className="text-[11px] text-slate-400 dark:text-white/40">Recipes · meal plans · cooking tips</span>
          </div>
          <div className="space-y-5">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar Icon */}
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl shadow-md ${
                msg.sender === "user" 
                  ? "bg-[#FF9F43] text-white" 
                  : "bg-[#2F8F46] text-white"
              }`}>
                {msg.sender === "user" ? <FiUser size={18} /> : <FiCpu size={18} />}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[88%] rounded-[22px] p-4 text-xs leading-relaxed shadow-sm sm:max-w-[70%] sm:text-sm ${
                msg.sender === "user"
                  ? "bg-[#2F8F46] text-white rounded-tr-none"
                  : "bg-gray-100 dark:bg-[#89986D]/10 text-gray-800 dark:text-[#F6F0D7] border border-gray-200/60 dark:border-[#89986D]/20 rounded-tl-none"
              }`}>
                <p className="whitespace-pre-line">{msg.text}</p>
              </div>
            </motion.div>
          ))}

          {/* Loading Animation Bubble */}
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="flex items-center gap-3"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#2F8F46] text-white shadow-md">
                <FiCpu size={18} />
              </div>
              <div className="flex items-center gap-2 rounded-[22px] rounded-tl-sm border border-[#e2e7dd] bg-white p-4 dark:border-white/10 dark:bg-[#89986D]/10">
                <span className="w-2 h-2 rounded-full bg-[#2F8F46] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#FF9F43] animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-[#2F8F46] animate-bounce [animation-delay:0.4s]" />
                <span className="text-xs text-gray-400 ml-1">AI is thinking...</span>
              </div>
            </motion.div>
          )}
          </div>
          <div ref={messagesEndRef} />
        </div>

        {/* Trending Suggestions Bar */}
        <div className="border-t border-[#e7ebe2] bg-[#fffefa] px-4 py-4 dark:border-white/10 dark:bg-[#151b17] sm:px-7">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400 dark:text-[#F6F0D7]/50">
            Start with an idea
          </p>
          <div className="flex flex-wrap gap-2">
            {popularPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(prompt)}
                disabled={loading}
                className="flex items-center gap-1.5 rounded-xl border border-[#dfe7d9] bg-white px-3.5 py-2 text-xs text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:border-[#a8cb8a] hover:bg-[#f1f8eb] hover:text-[#2F8F46] dark:border-white/10 dark:bg-[#89986D]/10 dark:text-[#F6F0D7]/80 dark:hover:text-[#B7E35F]"
              >
                <span className="text-[#FF9F43]">✨</span> {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form Footer */}
        <div className="border-t border-[#e7ebe2] bg-[#fffefa] p-4 dark:border-white/10 dark:bg-[#151b17] sm:p-6">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }} 
            className="flex items-center gap-2 rounded-2xl border border-[#d9e3d3] bg-white p-1.5 pl-3 shadow-sm transition focus-within:border-[#7fb35c] focus-within:ring-2 focus-within:ring-[#b7df86]/30 dark:border-white/10 dark:bg-white/5"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="What would you like to cook?"
              aria-label="Ask FlavorAI"
              className="min-w-0 flex-1 bg-transparent px-1 py-3 text-xs text-gray-900 outline-none placeholder:text-gray-400 dark:text-[#F6F0D7] sm:text-sm"
            />
            <button
              type="submit"
              disabled={loading || !inputQuery.trim()}
              className="flex h-11 shrink-0 items-center gap-2 rounded-xl bg-[#2F8F46] px-4 text-sm font-bold text-white shadow-lg shadow-[#2F8F46]/25 transition hover:bg-[#235f31] disabled:cursor-not-allowed disabled:opacity-40 sm:px-5"
            >
              <span>Send</span>
              <FiSend size={16} />
            </button>
          </form>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[10px] text-gray-400 dark:text-[#F6F0D7]/40">
            <span className="h-1.5 w-1.5 rounded-full bg-[#b7df86]" />
            FlavorAI can make mistakes. Verify important dietary restrictions.
          </p>
        </div>

      </div>
    </div>
  );
}
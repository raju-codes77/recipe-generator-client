"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiCpu, FiUser, FiRefreshCw, FiSparkles, FiArrowRight } from "react-icons/fi";
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#121212] py-6 px-4 sm:px-6 lg:px-8 transition-colors flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col bg-white dark:bg-[#181818] border border-gray-200 dark:border-[#89986D]/20 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Chat Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#2F8F46] to-[#257537] text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
              <FiCpu size={22} className="animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-wide flex items-center gap-2">
                CanvasAI Assistant <span className="bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">Online</span>
              </h2>
              <p className="text-xs text-emerald-100/80">Your intelligent cooking & nutrition partner</p>
            </div>
          </div>
          <button 
            onClick={() => setMessages([{ sender: "ai", text: "Chat cleared! How can I help you today?" }])}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold transition backdrop-blur-sm"
          >
            <FiRefreshCw size={14} /> Clear Chat
          </button>
        </div>

        {/* Chat Messages Body Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[60vh] min-h-[450px]">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar Icon */}
              <div className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md ${
                msg.sender === "user" 
                  ? "bg-[#FF9F43] text-white" 
                  : "bg-[#2F8F46] text-white"
              }`}>
                {msg.sender === "user" ? <FiUser size={18} /> : <FiCpu size={18} />}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[80%] sm:max-w-[70%] p-4 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-sm ${
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
              <div className="w-9 h-9 rounded-2xl bg-[#2F8F46] text-white flex items-center justify-center shadow-md">
                <FiCpu size={18} />
              </div>
              <div className="p-4 rounded-3xl bg-gray-100 dark:bg-[#89986D]/10 border border-gray-200 dark:border-[#89986D]/20 rounded-tl-none flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2F8F46] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#FF9F43] animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-[#2F8F46] animate-bounce [animation-delay:0.4s]" />
                <span className="text-xs text-gray-400 ml-1">AI is thinking...</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Trending Suggestions Bar */}
        <div className="px-6 py-3 bg-gray-50 dark:bg-black/20 border-t border-gray-100 dark:border-[#89986D]/10">
          <p className="text-[11px] font-bold text-gray-400 dark:text-[#F6F0D7]/50 uppercase tracking-wide mb-2">
            Suggested Prompts:
          </p>
          <div className="flex flex-wrap gap-2">
            {popularPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(prompt)}
                disabled={loading}
                className="text-xs px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#89986D]/10 text-gray-700 dark:text-[#F6F0D7]/80 hover:bg-[#2F8F46]/10 hover:text-[#2F8F46] dark:hover:text-[#B7E35F] border border-gray-200 dark:border-[#89986D]/20 transition flex items-center gap-1.5 shadow-sm"
              >
                <span className="text-[#FF9F43]">✨</span> {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form Footer */}
        <div className="p-4 sm:p-6 bg-white dark:bg-[#181818] border-t border-gray-200 dark:border-[#89986D]/20">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }} 
            className="flex items-center gap-3"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask AI for recipes, calorie analysis, or cooking guidance..."
              className="flex-1 px-5 py-3.5 rounded-2xl bg-gray-50 dark:bg-[#89986D]/10 border border-gray-200 dark:border-[#89986D]/20 text-xs sm:text-sm text-gray-900 dark:text-[#F6F0D7] focus:outline-none focus:border-[#2F8F46] transition shadow-inner"
            />
            <button
              type="submit"
              disabled={loading || !inputQuery.trim()}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#2F8F46] to-[#257537] hover:brightness-110 text-white font-bold transition shadow-lg shadow-[#2F8F46]/30 disabled:opacity-50 flex items-center gap-2"
            >
              <span>Send</span>
              <FiSend size={16} />
            </button>
          </form>
          <p className="text-[10px] text-center text-gray-400 dark:text-[#F6F0D7]/40 mt-3">
            FlavorAI can make mistakes. Verify important dietary restrictions.
          </p>
        </div>

      </div>
    </div>
  );
}
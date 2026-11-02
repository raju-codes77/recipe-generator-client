'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Activity, User, PlusCircle, RefreshCw, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type MessageRole = 'user' | 'ai' | 'error';
interface Message {
  role: MessageRole;
  text: string;
}

import { apiClient } from "@/lib/api-client";

export default function AiNutritionistChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage = textToSend.trim();
    setMessages(prev => prev.filter(m => m.role !== 'error').concat({ role: 'user', text: userMessage }));
    setInput('');
    setIsLoading(true);

    try {
      const data = await apiClient.post<any>(`/ai-nutritionist/chat`, { message: userMessage });

      if (data.success) {
        setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'error', text: 'Something went wrong processing your request.' }]);
      }
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, { role: 'error', text: "I couldn't process that request right now. Please try again in a moment." }]);
      setInput(userMessage); // Preserve input on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const parseNutritionData = (text: string) => {
    // A simple regex to find nutrition patterns in the text, e.g., "Calories: 400 kcal"
    // We will extract and render them as chips. For simplicity, we just use ReactMarkdown and a custom renderer for strong text that might look like nutrition.
    return text; 
  };

  const quickPrompts = [
    { icon: "🍽️", text: "Quick high-protein dinner" },
    { icon: "🥗", text: "Healthy breakfast ideas" },
    { icon: "⚖️", text: "Low-calorie meal ideas" },
    { icon: "🌱", text: "Easy vegan meals" },
    { icon: "🧮", text: "Analyze my daily nutrition" },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-slate-50/50 dark:bg-black/10 font-sans lg:p-6 lg:pb-0">
      <div className="max-w-4xl w-full mx-auto flex flex-col h-full bg-white dark:bg-slate-900 lg:rounded-[32px] lg:border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden relative">
        
        {/* Header Redesign */}
        <div className="flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 z-10 sticky top-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center border border-emerald-100 dark:border-emerald-800/50">
              <Sparkles size={18} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="text-[15px] font-bold text-slate-900 dark:text-white leading-tight">FoodCanvas Nutritionist</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">AI Nutrition Specialist • Online</p>
              </div>
            </div>
          </div>
          {messages.length > 0 && (
            <button 
              onClick={() => setMessages([])}
              className="text-xs font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors px-3 py-1.5 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Clear Chat
            </button>
          )}
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/30 dark:bg-transparent">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] max-w-lg mx-auto text-center px-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-6 shadow-sm border border-emerald-100 dark:border-emerald-800/30">
                <span className="text-3xl">👋</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Hi! I'm your AI Nutritionist</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                I can help you with personalized nutrition, healthy meals, calorie guidance, ingredients, dietary preferences, and everyday food decisions.
              </p>
              
              <div className="grid grid-cols-2 gap-3 w-full mb-8">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-3 text-left">
                  <div className="bg-emerald-50 dark:bg-emerald-900/30 p-2 rounded-xl text-emerald-600 dark:text-emerald-400 shrink-0">🥗</div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">Personalized</h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">Tailored to your needs</p>
                  </div>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-3 text-left">
                  <div className="bg-emerald-50 dark:bg-emerald-900/30 p-2 rounded-xl text-emerald-600 dark:text-emerald-400 shrink-0">🍎</div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">Healthy Meals</h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">Delicious & nutritious</p>
                  </div>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-3 text-left">
                  <div className="bg-emerald-50 dark:bg-emerald-900/30 p-2 rounded-xl text-emerald-600 dark:text-emerald-400 shrink-0">🔥</div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">Macros</h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">Calorie guidance</p>
                  </div>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-3 text-left">
                  <div className="bg-emerald-50 dark:bg-emerald-900/30 p-2 rounded-xl text-emerald-600 dark:text-emerald-400 shrink-0">🛒</div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">Smart Choices</h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">Grocery & food tips</p>
                  </div>
                </div>
              </div>
              
              <div className="w-full">
                <p className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">What can I help you with?</p>
                <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none w-full snap-x">
                  {quickPrompts.map((qp, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleSend(qp.text)}
                      className="shrink-0 snap-start flex items-center gap-2 px-3.5 py-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-700 transition-colors"
                    >
                      <span>{qp.icon}</span> {qp.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  {msg.role !== 'error' && (
                    <div className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' 
                        : 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border border-emerald-400/30'
                    }`}>
                      {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} />}
                    </div>
                  )}

                  {msg.role === 'error' ? (
                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 p-4 rounded-2xl rounded-tl-sm mx-auto max-w-sm mt-4 text-center">
                      <h4 className="text-red-800 dark:text-red-400 font-bold text-sm mb-1">Something went wrong</h4>
                      <p className="text-red-600/80 dark:text-red-400/80 text-xs mb-3">{msg.text}</p>
                      <button 
                        onClick={() => handleSend(input)} 
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 text-xs font-bold rounded-lg transition-colors"
                      >
                        <RefreshCw size={12} /> Try Again
                      </button>
                    </div>
                  ) : (
                    <div className={`px-4 py-3 sm:px-5 sm:py-3.5 text-[14px] leading-relaxed break-words shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-[#1a5b32] text-white rounded-[20px] rounded-tr-[4px]' 
                        : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-[20px] rounded-tl-[4px]'
                    }`}>
                      {msg.role === 'ai' ? (
                        <div className="prose prose-sm dark:prose-invert prose-emerald max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-slate-100 prose-a:text-emerald-600 prose-strong:text-emerald-800 dark:prose-strong:text-emerald-300">
                          <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                              strong: ({node, ...props}) => {
                                // Simple nutrition parser: check if strong text contains "Calories", "Protein", "Carbs", "Fat"
                                const content = props.children?.toString() || '';
                                if (['Calories', 'Protein', 'Carbs', 'Fat'].includes(content.trim().replace(':', ''))) {
                                  return <strong className="inline-block px-1.5 py-0.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded text-xs uppercase tracking-wider mx-0.5" {...props} />;
                                }
                                return <strong {...props} />;
                              }
                            }}
                          >
                            {msg.text}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        msg.text
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 max-w-[85%]">
                  <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border border-emerald-400/30 shadow-sm flex items-center justify-center">
                    <Sparkles size={16} />
                  </div>
                  <div className="px-5 py-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[20px] rounded-tl-[4px] shadow-sm flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-slate-400 mr-2">FoodCanvas is thinking</span>
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-75" />
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-150" />
                  </div>
                </motion.div>
              )}
            </>
          )}
          <div ref={messagesEndRef} className="h-2" />
        </div>

        {/* Input Area */}
        <div className="p-3 sm:p-5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 z-10 sticky bottom-0">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative max-w-4xl mx-auto flex items-end gap-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-2 shadow-sm focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
            <button 
              type="button"
              className="shrink-0 p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-xl transition-colors mb-0.5"
            >
              <PlusCircle size={20} />
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask your nutrition question..."
              className="w-full bg-transparent max-h-32 min-h-[44px] py-3 text-sm text-slate-800 dark:text-slate-100 outline-none resize-none placeholder:text-slate-400"
              disabled={isLoading}
              rows={1}
              style={{ overflow: 'hidden' }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="shrink-0 w-11 h-11 mb-0.5 flex items-center justify-center rounded-xl bg-[#1a5b32] text-white hover:bg-[#134424] disabled:bg-slate-200 disabled:text-slate-400 dark:disabled:bg-slate-700 transition-colors shadow-sm"
            >
              <Send size={18} className="ml-0.5" />
            </button>
          </form>
          <p className="text-center text-[10px] text-slate-400 mt-2.5 font-medium">
            AI Nutritionist can make mistakes. Please verify important health information.
          </p>
        </div>

      </div>
    </div>
  );
}

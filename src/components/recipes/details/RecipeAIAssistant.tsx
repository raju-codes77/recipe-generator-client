import React, { useState, useEffect, useRef } from "react";
import { X, Send, Sparkles, User, Bot, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { getApiBaseUrl } from "@/lib/api-url";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface RecipeContext {
  id: string;
  title: string;
  thumbnail?: string;
  category?: string;
  ingredients?: any[];
  calories?: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  recipe: RecipeContext;
  userId?: string;
  initialPrompt?: string;
}

export default function RecipeAIAssistant({ isOpen, onClose, recipe, userId, initialPrompt }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isDesktop, setIsDesktop] = useState(true);

  // Responsive layout check
  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  // Generate dynamic suggestions
  useEffect(() => {
    const dynamicSuggestions = ["Explain this recipe"];
    
    if (recipe.ingredients && recipe.ingredients.length > 0) {
      dynamicSuggestions.push("Suggest ingredient substitutions");
    }
    
    const isMeat = recipe.category?.toLowerCase().includes("chicken") || recipe.title.toLowerCase().includes("chicken") || recipe.title.toLowerCase().includes("beef");
    if (isMeat) {
      dynamicSuggestions.push("Make it vegetarian");
    }

    if (recipe.calories && recipe.calories > 500) {
      dynamicSuggestions.push("Make it healthier");
    } else {
      dynamicSuggestions.push("Increase the protein");
    }

    dynamicSuggestions.push("Adjust for 4 servings");
    
    setSuggestions(dynamicSuggestions.slice(0, 5));
  }, [recipe]);

  // Handle initial prompt
  useEffect(() => {
    if (isOpen && initialPrompt && messages.length === 0) {
      handleSend(initialPrompt);
    }
  }, [isOpen, initialPrompt]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages, isLoading, isOpen]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${getApiBaseUrl()}/api/recipe-ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipeId: recipe.id,
          message: text,
          userId,
          history: messages,
        }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message || "Sorry, I couldn't process that right now." },
        ]);
      }
    } catch (error) {
      console.error("AI Assistant Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "AI is temporarily unavailable. Please try again later." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessageContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = line.split(boldRegex);
      
      const formattedLine = parts.map((part, i) => {
        if (i % 2 === 1) return <strong key={i} className="font-semibold text-foreground">{part}</strong>;
        return <span key={i}>{part}</span>;
      });

      if (line.trim().startsWith("-") || line.trim().match(/^\d+\./)) {
        return <li key={idx} className="ml-4 mb-1 text-sm">{formattedLine}</li>;
      }
      
      return (
        <p key={idx} className="mb-2 last:mb-0 text-sm leading-relaxed">
          {formattedLine}
        </p>
      );
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 dark:bg-black/70 z-[100] backdrop-blur-md transition-opacity" 
            onClick={onClose}
          />
          
          {/* Drawer / Modal */}
          <motion.div 
            initial={isDesktop ? { opacity: 0, scale: 0.95, x: "-50%", y: "-45%" } : { y: "100%", x: 0 }}
            animate={isDesktop ? { opacity: 1, scale: 1, x: "-50%", y: "-50%" } : { x: 0, y: 0 }}
            exit={isDesktop ? { opacity: 0, scale: 0.95, x: "-50%", y: "-45%" } : { y: "100%", x: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed z-[101] flex flex-col bg-background overflow-hidden
                       inset-x-0 bottom-0 w-full h-[90vh] rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]
                       md:inset-auto md:top-[50%] md:left-[50%] md:w-full md:max-w-[450px] md:h-[80vh] md:max-h-[750px] md:rounded-[28px] md:border md:border-black/5 dark:md:border-white/10 md:shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:md:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          >
            {/* Mobile Drag Handle */}
            <div className="w-full flex justify-center py-3 md:hidden bg-background shrink-0">
              <div className="w-12 h-1.5 bg-muted rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-background shrink-0">
              <div className="flex items-center gap-3">
                {recipe.thumbnail ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-orange-100 dark:border-orange-900/50">
                    <Image src={recipe.thumbnail} alt={recipe.title} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-2.5 rounded-full shrink-0">
                    <Sparkles className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                  </div>
                )}
                <div className="flex flex-col">
                  <h2 className="font-bold text-foreground text-base leading-tight">Recipe AI Assistant</h2>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <p className="text-[11px] text-muted-foreground font-medium truncate max-w-[200px]">
                      Helping with: <span className="text-foreground">{recipe.title}</span>
                    </p>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-full text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close AI Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 bg-muted/30 flex flex-col gap-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6 my-auto">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-950/30 rounded-full flex items-center justify-center shadow-sm">
                    <Sparkles className="w-10 h-10 text-orange-500 dark:text-orange-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-foreground">Your Culinary Guide</h3>
                    <p className="text-sm text-muted-foreground max-w-[260px] mx-auto leading-relaxed">
                      I know all the details of <span className="font-semibold text-foreground">{recipe.title}</span>. Ask me anything about it!
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-2.5 mt-2">
                    {suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(suggestion)}
                        className="text-[13px] px-4 py-2 bg-card border border-border rounded-full text-muted-foreground hover:border-orange-500 hover:text-orange-500 hover:shadow-sm transition-all text-left"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={idx} 
                    className={`flex gap-3 max-w-[88%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                  >
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${msg.role === "user" ? "bg-muted" : "bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-950/30 border border-orange-100 dark:border-orange-900/50"}`}>
                      {msg.role === "user" ? (
                        <User className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Bot className="w-4 h-4 text-orange-600 dark:text-orange-500" />
                      )}
                    </div>
                    <div className={`p-3.5 rounded-2xl ${msg.role === "user" ? "bg-orange-500 text-white rounded-tr-sm shadow-md" : "bg-card border border-border text-foreground rounded-tl-sm shadow-sm"}`}>
                      {msg.role === "user" ? (
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      ) : (
                        <div className="text-foreground">
                           {renderMessageContent(msg.content)}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
              
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 max-w-[85%] mr-auto"
                >
                  <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-950/30 border border-orange-100 dark:border-orange-900/50 flex items-center justify-center shadow-sm">
                    <Bot className="w-4 h-4 text-orange-600 dark:text-orange-500" />
                  </div>
                  <div className="p-3.5 bg-card border border-border rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2.5 text-muted-foreground text-sm font-medium">
                    <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                    Chef is thinking...
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-background border-t border-border shrink-0 pb-safe">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                className="flex items-center gap-2 relative"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about substitutions, nutrition..."
                  className="flex-1 bg-muted/50 border border-border focus:bg-background focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-full pl-5 pr-12 py-3 text-[15px] outline-none transition-all text-foreground placeholder:text-muted-foreground"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 disabled:bg-muted disabled:text-muted-foreground transition-colors"
                >
                  <Send className="w-4 h-4 translate-x-[-1px] translate-y-[1px]" />
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

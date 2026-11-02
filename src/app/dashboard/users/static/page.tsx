"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiFolder, 
  FiPlus, 
  FiHeart, 
  FiMoreVertical, 
  FiLock, 
  FiGlobe, 
  FiTrash2, 
  FiEdit3, 
  FiX,
  FiArrowRight 
} from "react-icons/fi";
import { Sparkles, Utensils, ChefHat } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

// ডেমো কালেকশন ডাটা
const initialCollections = [
  {
    id: 1,
    title: "Quick & Easy Weeknight Dinners",
    description: "Healthy and fast recipes that take less than 30 minutes to prepare after a long workday.",
    recipeCount: 12,
    visibility: "Public",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    category: "Dinner"
  },
  {
    id: 2,
    title: "Low Calorie Breakfast Ideas",
    description: "Kickstart your morning with high-protein, low-calorie nutrition bowls and smoothies.",
    recipeCount: 8,
    visibility: "Private",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
    category: "Breakfast"
  },
  {
    id: 3,
    title: "Vegan & Plant-Based Wonders",
    description: "Vibrant, nutrient-dense plant-based dishes packed with authentic flavors and spices.",
    recipeCount: 15,
    visibility: "Public",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    category: "Vegan"
  },
  {
    id: 4,
    title: "Post-Workout Muscle Gain",
    description: "High protein recipes designed specifically for recovery and strength building.",
    recipeCount: 6,
    visibility: "Public",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80",
    category: "Fitness"
  }
];

export default function CollectionsPage() {
  const [collections, setCollections] = useState(initialCollections);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newVisibility, setNewVisibility] = useState("Public");

  // নতুন কালেকশন তৈরির হ্যান্ডলার
  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newCol = {
      id: Date.now(),
      title: newTitle,
      description: newDesc || "Custom user created recipe collection.",
      recipeCount: 0,
      visibility: newVisibility,
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80",
      category: "Custom"
    };

    setCollections([newCol, ...collections]);
    setNewTitle("");
    setNewDesc("");
    setIsModalOpen(false);
  };

  // কালেকশন ডিলিট করার হ্যান্ডলার
  const handleDelete = (id: number) => {
    setCollections(collections.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#121212] py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto">

        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 bg-white dark:bg-[#181818] border border-gray-200 dark:border-[#89986D]/20 p-8 rounded-3xl shadow-xl">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#2F8F46]/10 text-[#2F8F46] dark:text-[#B7E35F] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles size={14} className="text-[#FF9F43]" /> Personal Recipe Vault
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#F6F0D7] tracking-tight mb-2">
              My Recipe Collections
            </h1>
            <p className="text-slate-500 dark:text-[#F6F0D7]/60 text-xs sm:text-sm">
              Organize your favorite AI-generated and community recipes into custom folders.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#2F8F46] to-[#257537] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#2F8F46]/30 hover:shadow-[#2F8F46]/50 transition-all"
          >
            <FiPlus size={18} /> Create New Collection
          </motion.button>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col, index) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-[#181818] rounded-3xl border border-gray-200 dark:border-[#89986D]/20 overflow-hidden shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image Header */}
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Visibility Badge */}
                  <span className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold text-slate-800 dark:text-[#F6F0D7] shadow-md flex items-center gap-1">
                    {col.visibility === "Public" ? <FiGlobe size={12} className="text-[#2F8F46]" /> : <FiLock size={12} className="text-[#FF9F43]" />}
                    {col.visibility}
                  </span>

                  {/* Recipe Count Tag */}
                  <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-semibold text-white flex items-center gap-1.5">
                    <Utensils size={12} className="text-[#FF9F43]" /> {col.recipeCount} Recipes
                  </span>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(col.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-red-500 text-white transition backdrop-blur-md shadow-md"
                    title="Delete Collection"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>

                {/* Content Body */}
                <div className="p-5">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-[#F6F0D7] mb-2 leading-snug group-hover:text-[#2F8F46] dark:group-hover:text-[#B7E35F] transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-[#F6F0D7]/60 line-clamp-2 leading-relaxed mb-4">
                    {col.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="px-5 pb-5 pt-0">
                <button 
                  onClick={() => toast.success(`Opening collection: ${col.title}`)}
                  className="w-full py-2.5 rounded-xl bg-gray-50 dark:bg-[#89986D]/10 hover:bg-[#2F8F46] hover:text-white text-slate-700 dark:text-[#F6F0D7] text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  <span>View Recipes</span>
                  <FiArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Create Collection Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white dark:bg-[#181818] border border-gray-200 dark:border-[#89986D]/30 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-[#F6F0D7]">
                    Create New Collection
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-xl bg-gray-100 dark:bg-[#89986D]/10 text-gray-400 hover:text-gray-700 dark:hover:text-[#F6F0D7] transition"
                  >
                    <FiX size={18} />
                  </button>
                </div>

                <form onSubmit={handleCreateCollection} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-[#F6F0D7]/80 mb-1.5">
                      Collection Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. High Protein Snacks"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                      className="w-full bg-gray-50 dark:bg-[#89986D]/10 border border-gray-200 dark:border-[#89986D]/20 rounded-2xl px-4 py-3 text-xs text-slate-900 dark:text-[#F6F0D7] focus:outline-none focus:border-[#2F8F46]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-[#F6F0D7]/80 mb-1.5">
                      Description (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe what this collection is about..."
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-[#89986D]/10 border border-gray-200 dark:border-[#89986D]/20 rounded-2xl p-4 text-xs text-slate-900 dark:text-[#F6F0D7] focus:outline-none focus:border-[#2F8F46] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-[#F6F0D7]/80 mb-1.5">
                      Visibility
                    </label>
                    <select
                      value={newVisibility}
                      onChange={(e) => setNewVisibility(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-[#89986D]/10 border border-gray-200 dark:border-[#89986D]/20 rounded-2xl px-4 py-3 text-xs text-slate-900 dark:text-[#F6F0D7] focus:outline-none focus:border-[#2F8F46]"
                    >
                      <option value="Public" className="bg-white dark:bg-slate-900">Public (Visible to community)</option>
                      <option value="Private" className="bg-white dark:bg-slate-900">Private (Only you)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-3 rounded-2xl bg-gray-100 dark:bg-[#89986D]/10 text-slate-600 dark:text-[#F6F0D7] text-xs font-bold hover:bg-gray-200 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 rounded-2xl bg-[#2F8F46] hover:bg-[#257537] text-white text-xs font-bold shadow-lg shadow-[#2F8F46]/30 transition"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
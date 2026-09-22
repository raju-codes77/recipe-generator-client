"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronRight,
  Plus,
  Folder,
  X
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";
import { apiClient } from "@/lib/api-client";

interface SidebarProps {
  selectedCollectionId?: string | null;
  onSelectCollection?: (colId: string, colName: string) => void;
}

export default function Sidebar({ selectedCollectionId, onSelectCollection }: SidebarProps) {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [creating, setCreating] = useState(false);

  // কালেকশন ফেচ করার মূল ফাংশন
  const fetchCollections = async () => {
    if (!userId) return;
    try {
      const data = await apiClient.get<any>(`/collections?userId=${userId}`);
      if (data.success) {
        setCollections(data.collections || []);
      }
    } catch (error) {
      console.error("Failed to fetch collections:", error);
    } finally {
      setLoading(false);
    }
  };

  // ইউজার আইডি পেলেই প্রথমবার ডেটা ফেচ হবে
  useEffect(() => {
    if (userId) {
      fetchCollections();
    } else if (session !== undefined) {
      setCollections([]);
      setLoading(false);
    }
  }, [userId, session]);


  useEffect(() => {
    const handleCollectionUpdate = () => {
      if (userId) {
        fetchCollections();
      }
    };

    window.addEventListener("collectionUpdated", handleCollectionUpdate);
    return () => {
      window.removeEventListener("collectionUpdated", handleCollectionUpdate);
    };
  }, [userId]);

  // new collection
  const handleCreateCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionName.trim() || !userId) return;

    try {
      setCreating(true);
      const data = await apiClient.post<any>("/collections", { userId, name: newCollectionName });
      if (data.success) {
        setNewCollectionName("");
        setIsModalOpen(false);
        // sidebar update
        window.dispatchEvent(new Event("collectionUpdated"));
      } else {
        alert(data.message || "Failed to create collection");
      }
    } catch (error) {
      console.error("Failed to create collection:", error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* MY COLLECTIONS CARD */}
      <div className="rounded-[28px] border border-[#E2EBE4] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#131B2E]">

        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 dark:text-white">My Collections</h3>
          <span className="text-xs font-bold text-gray-400">
            {collections.length} Folders
          </span>
        </div>

        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
          {loading ? (
            <p className="text-xs text-gray-400 text-center py-2">Loading collections...</p>
          ) : collections.length > 0 ? (
            collections.map((col) => {
              const recipeCount = Array.isArray(col.recipes) ? col.recipes.length : 0;

              return (
                <div
                  key={col.id}
                  onClick={() => {
                    if (onSelectCollection) {
                      onSelectCollection(col.id, col.name);
                    }
                  }}
                  className={`group flex items-center justify-between p-2 rounded-2xl transition-colors cursor-pointer ${selectedCollectionId === col.id
                      ? "bg-[#EAF4EB] dark:bg-[#10B981]/20 border border-[#24733E]/30 dark:border-[#10B981]/30"
                      : "hover:bg-gray-50 dark:hover:bg-white/5"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-[#EAF4EB] text-[#24733E] dark:bg-[#10B981]/10 dark:text-[#10B981] flex items-center justify-center">
                      <Folder className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1">
                        {col.name}
                      </h4>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">
                        {recipeCount} recipes
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              );
            })
          ) : (
            <p className="text-xs text-gray-400 text-center py-4">
              No collections found. Create your first one!
            </p>
          )}
        </div>

        <button
          onClick={() => {
            if (!userId) {
              toast.error("Please login first to create collections.");
              return;
            }
            setIsModalOpen(true);
          }}
          className="w-full mt-4 py-3 rounded-2xl border border-dashed border-[#24733E] text-[#24733E] dark:border-[#10B981] dark:text-[#10B981] text-xs font-bold hover:bg-emerald-50 dark:hover:bg-[#10B981]/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Create New Collection
        </button>

      </div>


      {/* AI BANNER CARD */}
      <div className="rounded-[28px] bg-[#EAF4EB] dark:bg-[#132A26] p-6 relative overflow-hidden border border-[#D1E7D3] dark:border-white/10">
        <div className="max-w-[70%]">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Can&apos;t find what you want?</h3>
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">Generate recipes from your ingredients with AI</p>
          <Link href="/ai-tools/pantry-to-plate" className="cursor-pointer px-4 py-2.5 rounded-xl bg-[#24733E] text-white text-xs font-bold hover:bg-[#1e5d32] transition-colors shadow-sm">Try Pantry-to-Plate AI</Link>
        </div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 pointer-events-none opacity-90">
          <Image src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&auto=format&fit=crop&q=60" alt="AI Vegetables Bowl" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-contain" />
        </div>
      </div>

      {/* CREATE COLLECTION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#131B2E] border border-gray-200 dark:border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Create New Collection</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full cursor-pointer">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleCreateCollection} className="space-y-4">
              <input
                type="text"
                placeholder="Collection Name (e.g., Desserts)"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                className="w-full border border-gray-200 dark:border-white/10 bg-transparent px-3 py-2.5 rounded-xl text-xs outline-none focus:border-[#24733E] dark:focus:border-[#10B981] text-gray-900 dark:text-white"
                autoFocus
              />
              <div className="flex gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 border border-gray-200 dark:border-white/10 py-2.5 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer">Cancel</button>
                <button type="submit" disabled={creating} className="flex-1 bg-[#24733E] hover:bg-[#1e5d32] dark:bg-[#10B981] dark:hover:bg-[#059669] text-white py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors disabled:opacity-50">{creating ? "Creating..." : "Create"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
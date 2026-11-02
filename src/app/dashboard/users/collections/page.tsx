"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { apiClient } from "@/lib/api-client";
import { FiFolder } from "react-icons/fi";
import { ArrowUpRight, Folder, Trash2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

interface Collection {
  id: string;
  name: string;
  recipes?: { recipe: any }[];
  createdAt?: string;
}

export default function CollectionsDashboardPage() {
  const { data: session } = authClient.useSession();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCollections() {
      if (!session?.user?.id) {
        setIsLoading(false);
        return;
      }
      try {
        const data = await apiClient.get<any>(`/collections?userId=${session.user.id}`);
        if (data.success && Array.isArray(data.collections)) {
          setCollections(data.collections);
        }
      } catch (err) {
        console.error("Failed to fetch collections:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCollections();
  }, [session?.user?.id]);

  const handleDeleteCollection = async (e: React.MouseEvent, collectionId: string) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const data = await apiClient.delete<any>(`/collections`, { data: { collectionId, userId: session?.user?.id } });

      setCollections((prev) => prev.filter((col) => col.id !== collectionId));
      toast.success("Collection deleted successfully!");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong while deleting");
    }
  };

  return (
    <div className="p-6 sm:p-10 min-h-screen">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf4e9] text-[#2F8F46] dark:bg-[#2F8F46]/20 dark:text-[#B7E35F]">
          <FiFolder size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Collection History</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage all your saved recipe collections.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse flex items-center justify-between rounded-[20px] border border-[#E2EBE4] bg-white p-5 dark:border-white/10 dark:bg-[#131B2E]">
              <div className="flex items-center gap-3 w-full">
                <div className="h-12 w-12 rounded-2xl bg-gray-200 dark:bg-white/5" />
                <div className="flex flex-col gap-2 flex-1">
                  <div className="h-4 w-1/2 bg-gray-200 dark:bg-white/5 rounded" />
                  <div className="h-3 w-1/4 bg-gray-200 dark:bg-white/5 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : collections.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((col) => (
            <Link
              href={`/recipes?tab=collections&collectionId=${col.id}`}
              key={col.id}
              className="group flex cursor-pointer items-center justify-between rounded-[20px] border border-[#E2EBE4] bg-white p-5 shadow-sm transition-all hover:border-[#24733E] hover:shadow-md dark:border-white/10 dark:bg-[#131B2E] dark:hover:border-[#10B981]"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF4EB] text-[#24733E] dark:bg-[#10B981]/20 dark:text-[#10B981]">
                  <Folder className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="truncate font-bold text-gray-900 group-hover:text-[#24733E] dark:text-white dark:group-hover:text-[#10B981]">
                    {col.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {col.recipes?.length || 0} recipes
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0 ml-2">
                <button
                  onClick={(e) => handleDeleteCollection(e, col.id)}
                  title="Delete Collection"
                  className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-[#24733E] dark:group-hover:text-[#10B981]" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-[32px] border border-dashed border-[#dfe8da] bg-[#fbfdf9] py-20 px-4 text-center dark:border-white/10 dark:bg-[#101611]">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#edf4e9] text-[#2F8F46] dark:bg-[#2F8F46]/20 dark:text-[#B7E35F]">
            <Folder size={28} />
          </div>
          <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">You haven't created any collections</h3>
          <p className="mb-6 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            Create a collection to organize your favorite recipes.
          </p>
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 rounded-xl bg-[#2F8F46] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[#2F8F46]/20 transition-transform hover:-translate-y-0.5 hover:bg-[#235f31]"
          >
            Explore Recipes
          </Link>
        </div>
      )}
    </div>
  );
}

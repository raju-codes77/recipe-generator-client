"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiArrowLeft, FiTrash2, FiSearch, FiBookOpen } from "react-icons/fi";
import toast from "react-hot-toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminRecipesPage() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRecipes();
  }, [page]);

  async function fetchRecipes() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/recipes?page=${page}&limit=20`, {
        credentials: "include"
      });
      if (res.ok) {
        const data = await res.json();
        setRecipes(data.recipes || []);
        setPagination({
          page: data.page,
          totalPages: data.totalPages,
          total: data.total
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch recipes");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to permanently delete this recipe?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/recipes/${id}`, {
        method: 'DELETE',
        credentials: "include"
      });
      if (res.ok) {
        toast.success("Recipe deleted successfully");
        setRecipes(recipes.filter(r => r.id !== id));
      } else {
        toast.error("Delete failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  }

  const filteredRecipes = recipes.filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase()) || 
    (r.user?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0C0A] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <Link href="/dashboard/admin" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#2F8F46] mb-3 transition-colors">
            <FiArrowLeft className="mr-2 w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FiBookOpen className="text-[#FF9F43]" /> Recipe Management
              </h1>
              <p className="text-sm text-gray-500 mt-1">Moderate recipes published by users across the platform.</p>
            </div>
            {pagination && (
              <span className="text-sm font-medium bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                Total Recipes: <strong className="text-gray-900 dark:text-white">{pagination.total}</strong>
              </span>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-t-2xl border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search recipes by title or author..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#FF9F43] transition-colors"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border-x border-b border-gray-200 dark:border-gray-700 rounded-b-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-4 font-semibold">Title</th>
                  <th className="px-6 py-4 font-semibold">Author</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold">Created Date</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">Loading recipes...</td>
                  </tr>
                ) : filteredRecipes.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">No recipes found.</td>
                  </tr>
                ) : (
                  filteredRecipes.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        <Link href={`/recipes/${r.id}`} className="hover:text-[#FF9F43] transition-colors" target="_blank">
                          {r.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-700 dark:text-gray-300">{r.user?.name || "Unknown"}</div>
                        <div className="text-xs text-gray-500">{r.user?.email || ""}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs font-medium">
                          {r.category || 'General'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleDelete(r.id)}
                          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-500 hover:text-red-500 transition-colors"
                          title="Delete Recipe"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {pagination && pagination.totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Showing page {pagination.page} of {pagination.totalPages}
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
                >
                  Previous
                </button>
                <button 
                  onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                  disabled={page === pagination.totalPages}
                  className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

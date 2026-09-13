"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight, FiArrowLeft, FiClock } from "react-icons/fi";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function PaginatedAiRecipesPage() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchAiRecipes() {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/dashboard/user/ai-recipes?page=${page}&limit=12`, {
          credentials: "include"
        });
        if (res.ok) {
          const data = await res.json();
          setRecipes(data.recipes || []);
          setPagination(data.pagination);
        }
      } catch (err) {
        console.error("Failed to fetch AI recipes", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAiRecipes();
  }, [page]);

  return (
    <div className="min-h-screen bg-[#F5FAF6] dark:bg-[#0A0C0A] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard/users" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors">
            <FiArrowLeft className="mr-2 w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Generated Recipes</h1>
              <p className="text-sm text-gray-500 mt-1">
                A complete history of the customized meals you've generated using FoodCanvas AI.
              </p>
            </div>
            {pagination && (
              <span className="text-sm font-medium bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                Total: <strong className="text-gray-900 dark:text-white">{pagination.total}</strong>
              </span>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-white dark:bg-gray-800 rounded-3xl h-[280px] w-full" />
            ))}
          </div>
        ) : recipes.length > 0 ? (
          <>
            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.map((rec) => (
                <div key={rec.id} className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 group flex flex-col">
                  <div className="relative h-48 w-full bg-gray-100">
                    {rec.image ? (
                      <Image src={rec.image} alt={rec.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-4xl">🍽️</div>
                    )}
                    <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">
                      {rec.cuisine || "AI Chef"}
                    </div>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight mb-2 line-clamp-2 group-hover:text-[#117A38] transition-colors">{rec.title}</h3>
                    
                    <div className="flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-1.5"><FiClock /> {rec.time || rec.cookingTime || "20m"}</div>
                      <div className="flex items-center gap-1.5">🔥 {rec.kcal || "--"} kcal</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={!pagination.hasPreviousPage}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 hover:text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-sm"
                >
                  <FiChevronLeft size={20} />
                </button>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button 
                  onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                  disabled={!pagination.hasNextPage}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 hover:text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-sm"
                >
                  <FiChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 border-dashed">
            <span className="text-4xl mb-4 block">🤖</span>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No AI Recipes Yet</h3>
            <p className="text-sm text-gray-500">Go to the AI Meal Planner or Pantry tool to generate your first custom recipe!</p>
          </div>
        )}
      </div>
    </div>
  );
}

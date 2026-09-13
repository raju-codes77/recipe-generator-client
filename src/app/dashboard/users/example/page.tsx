'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiBriefcase, FiCalendar, FiCpu, FiHeart, FiStar } from 'react-icons/fi';

interface NutritionistType {
  id: string;
  name: string;
  education: string;
  specialty: string;
  available_time: string;
  fees: number;
  image_url: string;
}

const Nutritionists: React.FC = () => {
  const router = useRouter();
  const [nutritionists, setNutritionists] = useState<NutritionistType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const loadNutritionists = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://localhost:5000/api/nutritionist');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setNutritionists(result.data);
      } else {
        setError('Failed to load nutritionist data.');
      }
    } catch (err: any) {
      console.error('Fetch Error:', err);
      setError('Could not connect to the server. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNutritionists();
  }, []);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNutritionists = nutritionists.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(nutritionists.length / itemsPerPage);

  if (loading) {
    return (
      <div className="mt-20 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-10 font-medium">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#f7f8f3] px-4 pb-16 pt-24 text-slate-900 dark:bg-[#101611] dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#2F8F46] dark:text-[#b7df86]">Wellness, made personal</p><h1 className="max-w-2xl text-3xl font-black tracking-tight sm:text-5xl">Find your nutrition partner.</h1><p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 dark:text-white/55">Connect with trusted specialists for practical guidance that fits your goals, routine, and favorite foods.</p></div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-white/50"><FiStar className="text-[#e6923b]" /> Curated experts for your journey</div>
        </div>

        <div className="mb-12 grid gap-4 lg:grid-cols-2">
          <Link href="/dashboard/users/ai-recepi-generator" className="group relative overflow-hidden rounded-[26px] bg-[#1f6a3a] p-6 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"><FiCpu className="absolute -right-3 -top-5 h-32 w-32 rotate-12 text-white/10" /><div className="relative flex items-start justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-[#f8c657]"><FiCpu size={21} /></span><FiArrowRight className="transition group-hover:translate-x-1" size={20} /></div><h2 className="relative mt-8 text-xl font-bold">Need help right now?</h2><p className="relative mt-2 max-w-sm text-sm leading-6 text-white/70">Get a free AI consultation for recipes, meal ideas, ingredients, and everyday cooking questions.</p><span className="relative mt-5 inline-block text-xs font-bold uppercase tracking-wider text-[#f8c657]">Open free AI consultant</span></Link>
          <Link href="/dashboard/users/example/apply" className="group rounded-[26px] border border-[#e2e7dc] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#9ec47a] hover:shadow-lg dark:border-white/10 dark:bg-white/5"><div className="flex items-start justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f4eadb] text-[#b66c27] dark:bg-[#e6923b]/15 dark:text-[#f5b35e]"><FiBriefcase size={21} /></span><FiArrowRight className="text-slate-400 transition group-hover:translate-x-1 dark:text-white/40" size={20} /></div><h2 className="mt-8 text-xl font-bold">Share your expertise</h2><p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-white/55">Apply to join our nutritionist network and help people build healthier, happier routines.</p><span className="mt-5 inline-block text-xs font-bold uppercase tracking-wider text-[#2F8F46] dark:text-[#b7df86]">Apply as a nutritionist</span></Link>
        </div>
        <div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-white/35">The network</p><h2 className="mt-1 text-2xl font-black">Our expert nutritionists</h2></div><span className="hidden text-xs text-slate-400 sm:block">Book a session that works for you</span></div>
      </div>

      {nutritionists.length === 0 ? (
        <p className="text-center text-gray-500">No nutritionist information available right now.</p>
      ) : (
        <>
          {/* Nutritionists Grid */}
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {currentNutritionists.map((doc) => (
              <div 
                key={doc.id} 
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-[#e4e8df] bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-[#aed18b] hover:shadow-xl dark:border-white/10 dark:bg-white/5"
              >
                <div>
                  <div className="mb-5 flex items-center gap-4">
                    <Image
                      width={64}
                      height={64}
                      src={(doc.image_url || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80").trimEnd()}
                      alt={doc.name} 
                      className="h-16 w-16 rounded-2xl border-2 border-[#b7df86] object-cover shadow-sm"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{doc.name}</h3>
                      <p className="mt-0.5 text-xs font-semibold text-[#2F8F46] dark:text-[#b7df86]">{doc.specialty}</p>
                      <p className="mt-1 text-[11px] text-slate-400 dark:text-white/40">{doc.education}</p>
                    </div>
                  </div>

                  <div className="mb-6 space-y-3 rounded-2xl bg-[#f6f8f2] p-3.5 text-xs text-slate-600 dark:bg-black/20 dark:text-white/65">
                    <p className="flex items-center gap-2"><FiCalendar className="text-[#2F8F46]" /> {doc.available_time || "10:00 AM - 04:00 PM"}</p>
                    <p className="flex items-center gap-2"><FiHeart className="text-[#e6923b]" /> Consultation: <span className="font-bold text-[#2F8F46]">৳{doc.fees}</span></p>
                  </div>
                </div>

                {/* Book Now Button matching your [id] route */}
               <button
  onClick={() => router.push(`/dashboard/users/example/${doc.id}`)}
  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2F8F46] py-3 text-sm font-bold text-white shadow-md shadow-[#2F8F46]/15 transition hover:bg-[#235f31]"
>
  Book a session <FiArrowRight size={15} />
</button>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium disabled:opacity-40 transition"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-xl text-sm font-bold transition ${
                    currentPage === page
                      ? "bg-green-600 text-white shadow-md"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium disabled:opacity-40 transition"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nutritionists;
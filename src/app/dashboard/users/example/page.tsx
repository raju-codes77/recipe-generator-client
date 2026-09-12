'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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

  useEffect(() => {
    loadNutritionists();
  }, []);

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
    <div className="max-w-7xl mx-auto px-4 py-10 mt-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-3">
          Our Expert Nutritionists
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Book an appointment with your preferred specialist</p>
      </div>

      {nutritionists.length === 0 ? (
        <p className="text-center text-gray-500">No nutritionist information available right now.</p>
      ) : (
        <>
          {/* Nutritionists Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentNutritionists.map((doc) => (
              <div 
                key={doc.id} 
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden p-6 flex flex-col justify-between transition-all hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={doc.image_url || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80"} 
                      alt={doc.name} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-green-600"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{doc.name}</h3>
                      <p className="text-xs text-green-600 font-medium">{doc.specialty}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{doc.education}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300 mb-6 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
                    <p><span className="font-semibold">Timing:</span> {doc.available_time || "10:00 AM - 04:00 PM"}</p>
                    <p><span className="font-semibold">Fees:</span> <span className="text-green-600 font-bold">৳{doc.fees}</span></p>
                  </div>
                </div>

                {/* Book Now Button matching your [id] route */}
               <button
  onClick={() => router.push(`/dashboard/users/example/${doc.id}`)}
  className="w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium text-sm transition shadow-md flex items-center justify-center gap-2"
>
  Book Now
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
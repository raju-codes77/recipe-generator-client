interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, setCurrentPage }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 text-xs font-bold disabled:opacity-50 cursor-pointer text-gray-700 dark:text-gray-300"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => setCurrentPage(index + 1)}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            currentPage === index + 1
              ? "bg-[#24733E] dark:bg-[#10B981] text-white"
              : "border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 text-xs font-bold disabled:opacity-50 cursor-pointer text-gray-700 dark:text-gray-300"
      >
        Next
      </button>
    </div>
  );
}
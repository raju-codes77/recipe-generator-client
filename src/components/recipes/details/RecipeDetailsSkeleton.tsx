export default function RecipeDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-900 dark:bg-black dark:text-white pb-16 animate-pulse">
      <div className="mx-auto max-w-7xl px-4 py-6">
        
        {/* BREADCRUMB SKELETON */}
        <div className="mb-4 h-4 w-48 bg-gray-200 dark:bg-white/10 rounded-md" />

        {/* TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT MAIN AREA */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* HERO CARD SKELETON */}
            <div className="grid grid-cols-1 md:grid-cols-12 items-center bg-white dark:bg-[#131B2E] p-6 rounded-[28px] border border-gray-100 dark:border-white/10 gap-6">
              <div className="md:col-span-6 flex flex-col gap-3">
                <div className="h-[320px] w-full bg-gray-200 dark:bg-white/10 rounded-[20px]" />
                <div className="grid grid-cols-5 gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-14 bg-gray-200 dark:bg-white/10 rounded-xl" />
                  ))}
                </div>
              </div>
              <div className="flex flex-col md:col-span-6 justify-between h-full space-y-4 w-full">
                <div className="space-y-3">
                  <div className="h-5 w-24 bg-gray-200 dark:bg-white/10 rounded-full" />
                  <div className="h-8 w-3/4 bg-gray-200 dark:bg-white/10 rounded-lg" />
                  <div className="h-4 w-1/3 bg-gray-200 dark:bg-white/10 rounded-md" />
                  <div className="h-12 w-full bg-gray-200 dark:bg-white/10 rounded-md" />
                </div>
                <div className="h-14 w-full bg-gray-200 dark:bg-white/10 rounded-xl" />
                <div className="flex gap-2">
                  <div className="h-10 flex-1 bg-gray-200 dark:bg-white/10 rounded-xl" />
                  <div className="h-10 w-20 bg-gray-200 dark:bg-white/10 rounded-xl" />
                </div>
              </div>
            </div>

            {/* TABS BAR SKELETON */}
            <div className="py-2 flex items-center gap-6 border-b border-gray-200 dark:border-white/10">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 w-20 bg-gray-200 dark:bg-white/10 rounded-md" />
              ))}
            </div>

            {/* INGREDIENTS & INSTRUCTIONS SKELETON */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-5 bg-white dark:bg-[#131B2E] p-5 rounded-[24px] border border-gray-100 dark:border-white/10 h-64" />
              <div className="md:col-span-7 bg-white dark:bg-[#131B2E] p-5 rounded-[24px] border border-gray-100 dark:border-white/10 h-64" />
            </div>

          </div>

          {/* RIGHT SIDEBAR SKELETON */}
          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-[#131B2E] p-5 rounded-[24px] border border-gray-100 dark:border-white/10 h-96" />
          </div>

        </div>

      </div>
    </div>
  );
}
export default function RecipeSkeleton() {
  return (
    <div className="w-full min-w-0 rounded-[24px] border border-[#E2EBE4] bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#131B2E] animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-48 rounded-2xl bg-gray-200 dark:bg-white/10 mb-4" />
      
      {/* Title & Subtitle */}
      <div className="h-5 bg-gray-200 dark:bg-white/10 rounded-md w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 dark:bg-white/10 rounded-md w-1/2 mb-4" />

      {/* Time & Calories badge skeleton */}
      <div className="flex gap-4 mb-4">
        <div className="h-8 bg-gray-200 dark:bg-white/10 rounded-xl w-20" />
        <div className="h-8 bg-gray-200 dark:bg-white/10 rounded-xl w-20" />
      </div>

      {/* Footer skeleton */}
      <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-white/10">
        <div className="h-6 bg-gray-200 dark:bg-white/10 rounded-full w-16" />
        <div className="h-4 bg-gray-200 dark:bg-white/10 rounded-md w-24" />
      </div>
    </div>
  );
}
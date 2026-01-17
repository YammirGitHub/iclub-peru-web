import SkeletonCard from "@/components/ui/SkeletonCard";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Skeleton */}
        <div className="flex flex-col items-center justify-center mb-16 space-y-4">
          <div className="h-4 w-32 bg-gray-100 rounded-full animate-pulse" />
          <div className="h-20 w-3/4 max-w-lg bg-gray-100 rounded-3xl animate-pulse" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

export default function SkeletonCard() {
  return (
    <div className="flex flex-col bg-white rounded-[32px] overflow-hidden border border-gray-100 h-full min-h-[400px]">
      {/* Imagen Skeleton */}
      <div className="w-full h-80 bg-gray-100 animate-pulse relative">
        <div
          className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-shimmer"
          style={{ backgroundSize: "200% 100%" }}
        />
      </div>

      {/* Texto Skeleton */}
      <div className="p-8 flex flex-col gap-4 flex-1">
        <div className="h-4 w-1/3 bg-gray-100 rounded-full animate-pulse" />
        <div className="h-8 w-3/4 bg-gray-100 rounded-full animate-pulse" />
        <div className="h-4 w-full bg-gray-100 rounded-full animate-pulse" />
        <div className="mt-auto flex justify-between items-center pt-4">
          <div className="h-6 w-1/4 bg-gray-100 rounded-full animate-pulse" />
          <div className="h-10 w-10 bg-gray-100 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

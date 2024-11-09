import React from "react";

export default function TestimonialSkeleton() {
  return (
    <div className="w-full space-y-2 md:space-y-4">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-7 w-32 animate-pulse rounded-md bg-gray-200 md:h-8" />
        <div className="h-9 w-24 animate-pulse rounded-md bg-gray-200" />
      </div>

      {/* Content skeleton */}
      <div className="rounded-lg p-4 sm:p-6">
        <div className="flex gap-4">
          {/* Memory cards skeleton */}
          {[1, 2].map((i) => (
            <div key={i} className="space-y-3 rounded-lg border p-4">
              {/* Author info skeleton */}
              <div className="flex w-80 items-center gap-3">
                <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
                <div className="space-y-2">
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                  <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
              {/* Memory content skeleton */}
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

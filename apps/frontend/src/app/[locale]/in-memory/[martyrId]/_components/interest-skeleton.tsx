import { Skeleton } from "@/components/ui/skeleton";

export default function InterestSkeleton() {
  return (
    <div className="space-y-4">
      {/* Simulate interest tags loading */}
      <div className="flex flex-wrap gap-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 rounded-full" />
        ))}
      </div>
    </div>
  );
}

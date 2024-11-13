import { CalendarClock, MapPin } from "lucide-react";

export default function MartyrCardSkeleton() {
  return (
    <div className="flex w-fit flex-col gap-2 rounded-xl bg-white p-2">
      <div className="relative aspect-square h-48 animate-pulse overflow-hidden rounded-xl bg-gray-200 lg:h-64"></div>

      <div>
        <div className="h-6 w-36 animate-pulse rounded bg-gray-200 lg:w-48"></div>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="h-4 w-12 animate-pulse rounded bg-gray-200 lg:w-16"></div>
          </div>

          <div className="flex items-center gap-1">
            <div className="h-4 w-12 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

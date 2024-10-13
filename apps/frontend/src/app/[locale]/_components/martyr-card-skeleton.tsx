import { CalendarClock, MapPin } from "lucide-react";

export default function MartyrCardSkeleton() {
  return (
    <div className="flex w-fit flex-col gap-2 rounded-xl bg-white p-2">
      <div className="relative aspect-square h-64 animate-pulse overflow-hidden rounded-xl bg-gray-200">
        <div className="absolute left-2 top-2 h-6 w-20 animate-pulse rounded-full bg-gray-300"></div>
        <div className="absolute bottom-3 left-3 h-[68px] w-[60px] animate-pulse bg-gray-300"></div>
      </div>

      <div>
        <div className="h-6 w-48 animate-pulse rounded bg-gray-200"></div>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-gray-300" />
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
          </div>

          <div className="flex items-center gap-1">
            <CalendarClock className="h-4 w-4 text-gray-300" />
            <div className="h-4 w-12 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

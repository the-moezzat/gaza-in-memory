import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const GallerySkeleton: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {[...Array(6)].map((_, index) => (
        <Skeleton
          key={index}
          className="aspect-square w-[calc(50%-1rem)] sm:w-[calc(33.333%-1rem)] md:w-[calc(25%-1rem)] lg:w-[calc(20%-1rem)] xl:w-[calc(16.666%-1rem)]"
        />
      ))}
    </div>
  );
};

export default GallerySkeleton;

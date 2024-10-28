"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowDownLeftFromCircle,
  ArrowUpCircle,
  CircleArrowRightIcon,
  CircleArrowUp,
  CircleGauge,
  Loader2,
  Loader2Icon,
  LoaderCircle,
  LoaderPinwheel,
} from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex h-full flex-col content-center items-center justify-center gap-6 justify-self-center px-4 text-center">
      <h2 className="text-xl font-bold text-gray-800 md:text-2xl lg:text-3xl">
        Oops someting went wrong
      </h2>
      <p className="max-w-2xl text-gray-600">{error.message}</p>
      <Button onClick={reset} className="mt-4" size={"lg"}>
        Try Again
      </Button>
      {/* {error.name},<br /> {error.stack} */}
    </div>
  );
}

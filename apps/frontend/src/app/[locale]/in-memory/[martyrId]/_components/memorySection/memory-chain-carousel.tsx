"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCurrentLocale } from "@/utils/useCurrentLocale";
import translator from "../../_glossary/translator";

interface MemoryChainCarouselProps {
  memories: string[];
}

export default function MemoryChainCarousel({
  memories,
}: MemoryChainCarouselProps) {
  const [currentMemory, setCurrentMemory] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const locale = useCurrentLocale();
  const t = translator(locale);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const currentMemoryText = memories[currentMemory];
  const displayText = expanded
    ? currentMemoryText
    : truncateText(currentMemoryText, 250);

  return (
    <div className="grid w-full grid-cols-[1fr,auto] items-center gap-y-3">
      {memories.length > 1 && (
        <>
          <span className="text-base text-gray-600">
            {currentMemory + 1} {t.of()} {memories.length} {t.memories()}
          </span>
          <div className="flex items-center gap-2">
            <Button
              onClick={() =>
                setCurrentMemory((prev) => (prev === 0 ? 0 : prev - 1))
              }
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full rtl:rotate-180"
            >
              <ChevronLeft size={18} />
            </Button>
            <Button
              onClick={() =>
                setCurrentMemory((prev) =>
                  memories.length - 1 === prev ? prev : prev + 1,
                )
              }
              variant="outline"
              size="icon"
              className="ml-2 h-8 w-8 rounded-full rtl:rotate-180"
            >
              <ChevronRight size={18} />
            </Button>
          </div>
        </>
      )}
      <div
        className={`col-span-2 ${
          memories.length !== 1 ? "rounded-lg border p-2" : ""
        }`}
      >
        <p>
          {displayText}{" "}
          {currentMemoryText.length > 250 && (
            <Button
              onClick={() => setExpanded(!expanded)}
              variant="link"
              className="h-fit cursor-pointer px-0 py-0"
              // asChild
            >
              {expanded ? t.readLess() : t.readMore()}
            </Button>
          )}
        </p>
      </div>
    </div>
  );
}

import React from "react";
import TestimonialCard from "./memory-card";
import { createClerkSupabaseClientSsr } from "@/lib/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./grid-carousel";
import ShareMemoryButton from "./share-memory-button";
import { auth } from "@clerk/nextjs/server";
import { Memory } from "../../_types/Memory";
import { getCurrentLocale } from "@/utils/getLocaleServer";
import translator from "../../_glossary/translator";
import EditMemoryButton from "./edit-memory-button";

interface TestimonialSectionProps {
  martyrId: string;
  martyrName: string;
}

export default async function TestimonialSection({
  martyrId,
  martyrName,
}: TestimonialSectionProps) {
  const client = createClerkSupabaseClientSsr(false);

  const { data: memories, error } = await client
    .from("memories")
    .select("*")
    .eq("martyr_id", martyrId)
    .order("created_at", { ascending: true });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const userMemory = getCurrentUserMemory(memories);
  const locale = getCurrentLocale();
  const t = translator(locale);

  return (
    <div className="flex w-full flex-col gap-4">
      {memories.length > 0 ? (
        <Carousel
          className="max-w-full space-y-6"
          opts={{
            align: "start",
            dragFree: true,
            direction: locale === "ar" ? "rtl" : "ltr",
          }}
        >
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <h2 className="text-lg font-semibold text-gray-800 lg:text-xl">
              {t.friends({ name: martyrName })}
            </h2>

            <div className="relative flex items-center justify-between gap-6 md:justify-normal">
              {userMemory ? (
                <EditMemoryButton
                  martyrName={martyrName}
                  existingMemories={userMemory}
                />
              ) : (
                <ShareMemoryButton martyrName={martyrName} />
              )}

              <div className="flex items-center gap-2">
                <CarouselPrevious className="relative inset-0 -translate-y-0" />
                <CarouselNext className="relative inset-0 -translate-y-0" />
              </div>
            </div>
          </div>
          <CarouselContent className="h-fit select-none auto-cols-[90%] md:auto-cols-[70%] lg:auto-cols-[40%]">
            {memories?.map((memory) =>
              memory.content.length > 0 ? (
                <CarouselItem key={memory.id} className="h-full w-full">
                  <TestimonialCard memory={memory} />
                </CarouselItem>
              ) : null,
            )}
          </CarouselContent>
        </Carousel>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <h2 className="text-lg font-semibold text-gray-700">
            {t.noMemoriesYet({ name: martyrName })}
          </h2>
          <ShareMemoryButton martyrName={martyrName} />
        </div>
      )}
    </div>
  );
}

function getCurrentUserMemory(memories: Memory[]) {
  const { userId } = auth();

  if (!userId) {
    return undefined;
  }

  return memories.find((memory) => memory.author_id === userId);
}

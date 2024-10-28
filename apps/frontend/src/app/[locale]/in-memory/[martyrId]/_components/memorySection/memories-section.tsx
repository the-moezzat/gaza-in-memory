import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
import DeleteMemoryButton from "./delete-memory-button";

interface TestimonialSectionProps {
  martyrId: string;
  martyrName: string;
}

export default async function TestimonialSection({
  martyrId,
  martyrName,
}: TestimonialSectionProps) {
  const client = createClerkSupabaseClientSsr(false);

  const { userId } = auth();

  const { data: memories, error } = await client
    .from("memories")
    .select("*")
    .eq("martyr_id", martyrId);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const userMemory = getCurrentUserMemory(memories);

  return (
    <div className="flex w-full flex-col gap-4">
      {memories.length > 0 ? (
        <Carousel
          className="max-w-full space-y-6"
          opts={{
            align: "start",
            dragFree: true,
          }}
        >
          <div className="flex flex-col items-center justify-between md:flex-row">
            <h2 className="text-xl font-semibold text-gray-800">
              {martyrName}&apos;s friends
            </h2>
            {memories.length > 0 && (
              <div className="relative flex items-center gap-6">
                {userMemory ? <DeleteMemoryButton /> : <ShareMemoryButton />}

                <div className="flex items-center gap-2">
                  <CarouselPrevious className="relative inset-0 -translate-y-0" />
                  <CarouselNext className="relative inset-0 -translate-y-0" />
                </div>
              </div>
            )}
          </div>
          <CarouselContent className="h-fit select-none">
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
            There are no memories yet. Be the first to share your memory about{" "}
            {martyrName}.
          </h2>
          <ShareMemoryButton />
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

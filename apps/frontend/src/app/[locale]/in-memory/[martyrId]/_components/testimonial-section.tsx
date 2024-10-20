import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import TestimonialCard from "./testimonial-card";
import { createClerkSupabaseClientSsr } from "@/lib/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ShareMemoryButton from "./share-memory-button";

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
    .eq("martyr_id", martyrId);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {memories.length > 0 ? (
        <Carousel className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              {martyrName}&apos;s friends
            </h2>
            {memories.length > 0 && (
              <div className="relative flex items-center gap-6">
                <ShareMemoryButton />

                <div className="flex items-center gap-2">
                  <CarouselPrevious className="relative inset-0 -translate-y-0" />
                  <CarouselNext className="relative inset-0 -translate-y-0" />
                </div>
              </div>
            )}
          </div>
          <CarouselContent className="h-full select-none">
            {memories?.map((memory) =>
              memory.content.length > 0 ? (
                <CarouselItem key={memory.id} className="h-full basis-[550px]">
                  <TestimonialCard memory={memory} />
                </CarouselItem>
              ) : null,
            )}
          </CarouselContent>
          {/* <CarouselPrevious />
            <CarouselNext /> */}
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

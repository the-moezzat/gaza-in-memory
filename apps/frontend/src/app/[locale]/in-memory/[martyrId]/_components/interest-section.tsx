import { Martyr } from "@/app/[locale]/_types/Mayrter";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { createClerkSupabaseClientSsr } from "@/lib/client";
import React from "react";

export default async function InterestSection({ martyr }: { martyr: Martyr }) {
  const client = createClerkSupabaseClientSsr(false);
  const { data, error } = await client
    .from("interests_and_hobbies")
    .select("*")
    .eq("martyr_id", martyr.id);

  return (
    <Carousel
      className="space-y-6"
      opts={{ loop: false, dragFree: true, align: "start" }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          What{" "}
          {martyr.first_name.charAt(0).toUpperCase() +
            martyr.first_name.slice(1)}{" "}
          loved and cared about
        </h2>

        <div className="flex items-center gap-2">
          <CarouselPrevious className="relative inset-0 -translate-y-0" />
          <CarouselNext className="relative inset-0 -translate-y-0" />
        </div>
      </div>

      <CarouselContent className="w-full">
        {data?.map((interest) => (
          <CarouselItem key={interest.id} className="basis-[35%]">
            <div className="space-y-4 rounded-xl border p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {interest.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {interest.tags.map((hobby) => (
                  <div
                    key={hobby}
                    className="rounded-full bg-gray-100 px-2 py-1 text-sm text-gray-800"
                  >
                    {hobby}
                  </div>
                ))}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

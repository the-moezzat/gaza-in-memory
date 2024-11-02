import { Martyr } from "@/app/[locale]/_types/Mayrter";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./memorySection/grid-carousel";
import { createClerkSupabaseClientSsr } from "@/lib/client";
import React from "react";
import { getCurrentLocale } from "@/utils/getLocaleServer";
import translator from "../_glossary/translator";

export default async function InterestSection({ martyr }: { martyr: Martyr }) {
  const client = createClerkSupabaseClientSsr(false);
  const { data, error } = await client
    .from("interests_and_hobbies")
    .select("*")
    .eq("martyr_id", martyr.id);

  const locale = getCurrentLocale();
  const t = translator(locale);
  return (
    <div className="w-full">
      <Carousel
        className="w-full space-y-2 md:space-y-4 lg:space-y-6"
        opts={{
          loop: false,
          dragFree: true,
          align: "start",
          direction: locale === "ar" ? "rtl" : "ltr",
        }}
      >
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-gray-800 md:text-xl">
            {t.interests({ name: martyr.first_name })}
            {/* What{" "}
            {martyr.first_name.charAt(0).toUpperCase() +
              martyr.first_name.slice(1)}{" "}
            loved and cared about */}
          </h2>

          <div className="flex items-center gap-2 rtl:flex-row-reverse">
            <CarouselPrevious className="relative inset-0 -translate-y-0" />
            <CarouselNext className="relative inset-0 -translate-y-0" />
          </div>
        </div>

        <CarouselContent className="w-full select-none auto-cols-[83%] pl-2 md:auto-cols-[55%] lg:auto-cols-[35%] lg:pl-4">
          {data?.map((interest) => (
            <CarouselItem key={interest.id} className="pl-2 lg:pl-4">
              <div className="space-y-4 rounded-xl border p-4">
                <h3 className="text-base font-semibold text-gray-800 md:text-lg">
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
    </div>
  );
}

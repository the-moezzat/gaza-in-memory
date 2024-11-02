import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { createClerkSupabaseClientSsr } from "@/lib/client";
import { getCurrentLocale } from "@/utils/getLocaleServer";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";
import translator from "../_glossary/translator";

export default async function GallerySection({
  martyrId,
}: {
  martyrId: string;
}) {
  const client = createClerkSupabaseClientSsr(false);

  const { data, error } = await client
    .from("gallery")
    .select("*")
    .eq("martyr_id", martyrId);

  const locale = getCurrentLocale();
  const t = translator(locale);
  return (
    <Carousel
      className="w-full space-y-2 md:space-y-4 lg:space-y-6 [&>div]:rounded-xl"
      opts={{
        dragFree: true,
        align: "start",
        loop: false,
        direction: locale === "ar" ? "rtl" : "ltr",
      }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 md:text-xl">
          {t.gallery()}
        </h2>

        <div className="flex items-center gap-2 rtl:flex-row-reverse">
          <CarouselPrevious className="relative inset-0 -translate-y-0" />
          <CarouselNext className="relative inset-0 -translate-y-0" />
        </div>
      </div>
      <CarouselContent>
        {data?.map((image, index) => (
          <CarouselItem
            key={image.id}
            className="basis-9/12 pl-2 md:basis-1/3 md:pl-4 lg:basis-1/4"
          >
            <Card className="border-0 shadow-none">
              <CardContent className="relative flex aspect-square items-center justify-center p-0">
                <div className="relative h-full w-full">
                  <Image
                    src={image.image_url}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

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
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

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
  console.log(data);
  console.log(error);
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Gallery</h2>

      <Carousel className="w-full overflow-hidden rounded-md">
        <CarouselContent className="">
          {data?.map((image, index) => (
            <CarouselItem
              key={image.id}
              className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Card className="border-0 shadow-none">
                <CardContent className="relative flex aspect-square items-center justify-center p-0">
                  <div className="relative h-full w-full">
                    <Image
                      src={image.image_url}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" type="button" />
        <CarouselNext className="right-2" type="button" />
      </Carousel>
    </div>
  );
}

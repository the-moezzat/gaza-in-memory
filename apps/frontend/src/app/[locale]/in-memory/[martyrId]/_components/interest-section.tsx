import type { Martyr } from "@/app/[locale]/_types/Mayrter";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./memorySection/grid-carousel";
import { createClerkSupabaseClientSsr } from "@/lib/client";
import { getCurrentLocale } from "@/utils/getLocaleServer";
import inMemoryTranslator from "../_glossary/translator";
import translator from "@/app/[locale]/_glossary/translator";

export default async function InterestSection({ martyr }: { martyr: Martyr }) {
  const client = createClerkSupabaseClientSsr(false);
  const { data, error } = await client
    .from("interests_and_hobbies")
    .select("*")
    .eq("martyr_id", martyr.id);

  const locale = getCurrentLocale();
  const t = inMemoryTranslator(locale);
  const parentT = translator(locale);

  if (data?.length === 0) {
    return null;
  }

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
          </h2>

          <div className="flex items-center gap-2">
            <CarouselPrevious className="relative inset-0 -translate-y-0" />
            <CarouselNext className="relative inset-0 -translate-y-0" />
          </div>
        </div>

        <CarouselContent className="w-full select-none auto-cols-[83%] pl-2 md:auto-cols-[55%] lg:auto-cols-[35%] lg:pl-4">
          {data?.map((interest) => (
            <CarouselItem key={interest.id} className="pl-2 lg:pl-4">
              <div className="space-y-4 rounded-xl border p-4">
                <h3 className="text-base font-semibold text-gray-800 md:text-lg">
                  {parentT[interest.category as keyof typeof parentT]()}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {interest.tags.map((hobby) => (
                    <div
                      key={hobby}
                      className="rounded-full bg-gray-100 px-2 py-1 text-sm text-gray-800"
                    >
                      {parentT[hobby as keyof typeof parentT]()}
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

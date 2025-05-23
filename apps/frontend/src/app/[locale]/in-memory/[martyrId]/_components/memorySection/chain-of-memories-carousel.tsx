import { Check, Pen, Trash } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useCurrentLocale } from "@/utils/useCurrentLocale";
import inMemoryTranslator from "../../_glossary/translator";
import useMemoryStore from "../../_store/memoryStore";
import { Button } from "@/components/ui/button";

export default function ChainOfMemoriesCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const { memories, removeMemory, editMemory } = useMemoryStore();
  const [count, setCount] = useState(memories.length);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedMemory, setEditedMemory] = useState<string | null>(null);
  const locale = useCurrentLocale();
  const t = inMemoryTranslator(locale);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, memories]);

  useEffect(() => {
    setCount(memories.length);
  }, [memories]);

  if (memories.length === 0) return null;

  return (
    <Carousel
      setApi={setApi}
      className="flex flex-col gap-4 border-b pb-4"
      opts={{
        direction: locale === "ar" ? "rtl" : "ltr",
      }}
    >
      <CarouselContent>
        {memories.map((memory, index) => (
          <CarouselItem
            key={index}
            className="relative grid max-h-[100px] basis-64 select-none grid-rows-[auto,1fr] gap-2"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-gray-500">
                {t.memory()} {index + 1}
              </span>
              {editingIndex !== index ? (
                <Button
                  size={"sm"}
                  variant={"outline"}
                  className="ml-auto h-fit w-fit p-2"
                  onClick={() => {
                    setEditingIndex(index);
                    setEditedMemory(memory);
                  }}
                >
                  <Pen size={14} />
                </Button>
              ) : (
                <Button
                  size={"sm"}
                  variant={"default"}
                  className="ml-auto h-fit w-fit p-2"
                  onClick={() => {
                    setEditingIndex(null);
                    setEditedMemory(null);

                    editMemory(editedMemory!, index);
                  }}
                >
                  <Check size={14} />
                </Button>
              )}
              <Button
                size={"sm"}
                variant={"destructive"}
                className="h-fit w-fit p-2"
                onClick={() => {
                  removeMemory(memory);
                }}
              >
                <Trash size={14} />
              </Button>
            </div>

            <textarea
              className={cn(
                "resize-none overflow-auto rounded-lg border p-2",
                editingIndex === index ? "border-blue-500" : "border-gray-300",
              )}
              defaultValue={memory}
              disabled={editingIndex !== index}
              onChange={(e) => {
                setEditedMemory(e.target.value);
              }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {count > 1 && (
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            {Array.from({ length: count }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-2 w-2 rounded-full bg-gray-200 transition-all duration-300",
                  current === index + 1 ? "w-6 bg-gray-400" : "",
                )}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <CarouselPrevious
              type="button"
              className="relative bottom-0 left-0 right-0 top-0 translate-y-0"
            />
            <CarouselNext
              type="button"
              className="relative bottom-0 right-0 top-0 translate-y-0"
            />
          </div>
        </div>
      )}
    </Carousel>
  );
}

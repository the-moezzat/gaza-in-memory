"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
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
import useAddMemoryForm from "../_hooks/useAddMemoryForm";
import useMemoryStore from "../_store/memoryStore";
import MemoriesForm from "./memories-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddMemoryFormProps {
  onCancel: () => void;
}

const relationshipOptions = [
  "Family Member",
  "Close Friend",
  "Colleague",
  "Classmate",
  "Neighbor",
  "Teacher/Student",
  "Religious Community Member",
  "Childhood Friend",
  "Sports Team Member",
  "Volunteer/Charity Work Associate",
  "Medical Care Provider",
  "Social Media Friend",
  "Extended Family",
  "Community Leader",
  "Other",
];

export default function AddMemoryForm({ onCancel }: AddMemoryFormProps) {
  const { martyrId } = useParams();

  const { memories } = useMemoryStore();

  const { form, onSubmit } = useAddMemoryForm();

  return (
    <div className="flex flex-col gap-6">
      <ChainOfMemoriesCarousel />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            onCancel();
            onSubmit(data);
          })}
          className="flex w-full flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="relationship"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relationship to martyr</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a relationship" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {relationshipOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <MemoriesForm />

          <input type="hidden" name="martyrId" value={martyrId} />

          {memories.length > 0 && (
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                type="button"
                className="self-end"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="self-end"
                disabled={form.formState.isSubmitting}
              >
                Share{" "}
                {memories.length > 1 ? `${memories.length} memories` : "memory"}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}

function ChainOfMemoriesCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const { memories, removeMemory, editMemory } = useMemoryStore();
  const [count, setCount] = useState(memories.length);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedMemory, setEditedMemory] = useState<string | null>(null);

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
    <Carousel setApi={setApi} className="flex flex-col gap-4 border-b pb-4">
      <CarouselContent>
        {memories.map((memory, index) => (
          <CarouselItem
            key={index}
            className="relative grid max-h-[100px] basis-64 select-none grid-rows-[auto,1fr] gap-2"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-gray-500">Memory {index + 1}</span>
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
          <div className="space-x-4">
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

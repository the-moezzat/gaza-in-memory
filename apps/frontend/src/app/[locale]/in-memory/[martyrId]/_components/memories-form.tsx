import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import TextareaAutosize from "react-textarea-autosize";
import { cn } from "@/lib/utils";
import { addMemory } from "../_actions/addMemory";
import { useFormState } from "react-dom";
import { PostgrestError } from "@supabase/supabase-js";
import { Memory } from "../_types/Memory";
import { useParams } from "next/navigation";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useAddMemoryForm from "../_hooks/useAddMemoryForm";
import useMemoryStore from "../_store/memoryStore";

const FormSchema = z.object({
  memory: z
    .string()
    .min(10, {
      message: "Memory must be at least 10 characters.",
    })
    .max(2500, {
      message: "Memory must be at most 2500 characters.",
    }),
});

export default function MemoriesForm() {
  //   const [memories, setMemories] = useState<string[]>([]);
  const { form: mainForm } = useAddMemoryForm();
  const { memories, addMemory } = useMemoryStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      memory: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    addMemory(data.memory);
    form.resetField("memory");
  }

  // formAction(formData);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-6"
      >
        <div className="flex flex-col gap-1">
          <FormField
            control={form.control}
            name="memory"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Memory </FormLabel>
                  <span className="text-xs text-gray-500">
                    (Max 2500 characters)
                  </span>
                </div>
                <FormControl>
                  <TextareaAutosize
                    placeholder="Share a memory or thought about the martyr"
                    className={cn(
                      "flex min-h-[100px] w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    )}
                    {...field}
                    maxRows={8}
                    minRows={5}
                  />
                </FormControl>
                {/* <FormDescription>Max 2500 characters.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="h-9 w-[1px] self-center border-r-[1px] border-dashed border-gray-300" />

          <Button
            type="button"
            disabled={!form.formState.isValid}
            variant={"outline"}
            className="flex w-fit items-center gap-2 self-center border border-dashed border-gray-300 text-gray-700"
            onClick={form.handleSubmit(onSubmit)}
          >
            <Plus size={18} />
            {memories.length > 0 ? "Add another memory" : "Add memory"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

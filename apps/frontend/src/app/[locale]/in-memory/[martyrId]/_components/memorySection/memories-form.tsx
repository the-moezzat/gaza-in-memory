import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import TextareaAutosize from "react-textarea-autosize";
import { cn } from "@/lib/utils";
import { Link, Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useMemoryStore from "../../_store/memoryStore";
import { useCurrentLocale } from "@/utils/useCurrentLocale";
import inMemoryTranslator from "../../_glossary/translator";

export default function MemoriesForm({ martyrName }: { martyrName: string }) {
  const { memories, addMemory } = useMemoryStore();
  const locale = useCurrentLocale();
  const t = inMemoryTranslator(locale);

  const FormSchema = z.object({
    memory: z
      .string()
      .min(10, {
        message: t.memoryMinLengthError({ minLength: 10 }),
      })
      .max(2500, {
        message: t.memoryMaxLengthError({ maxLength: 2500 }),
      }),
  });

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
                  <FormLabel>{t.memory()}</FormLabel>
                  <span className="text-xs text-gray-500">
                    {t.maxCharacters({ maxCharacters: 2500 })}
                  </span>
                </div>
                <FormControl>
                  <TextareaAutosize
                    placeholder={t.shareMemoryTextboxPlaceholder({
                      name: martyrName,
                    })}
                    className={cn(
                      "flex min-h-[100px] w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    )}
                    {...field}
                    maxRows={8}
                    minRows={5}
                  />
                </FormControl>
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
            {memories.length > 0 ? t.addAnotherMemory() : t.addMemory()}
          </Button>
        </div>
      </form>
    </Form>
  );
}

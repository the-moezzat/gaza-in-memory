import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useParams } from "next/navigation";
import useMemoryStore from "../_store/memoryStore";
import translator from "../_glossary/translator";
import { useCurrentLocale } from "@/utils/useCurrentLocale";
import { useEffect } from "react";

export const CoreMemoryFormSchema = z.object({
  memories: z.string().min(10).max(2500).array(),
  martyrId: z.string(),
  relationship: z.string(),
});

export function useCoreMemoryForm({
  defaultValues,
}: {
  defaultValues?: Partial<z.infer<typeof CoreMemoryFormSchema>>;
}) {
  const { martyrId } = useParams();
  const { setMemories } = useMemoryStore();
  const locale = useCurrentLocale();
  const t = translator(locale);

  const FormSchema = CoreMemoryFormSchema.extend({
    relationship: z.string({
      required_error: t.selectRelationshipError(),
    }),
  })
    .refine((data) => data.memories.every((memory) => memory.length >= 10), {
      message: t.memoryMinLengthError({ minLength: 10 }),
      path: ["memories"],
    })
    .refine((data) => data.memories.every((memory) => memory.length <= 2500), {
      message: t.memoryMaxLengthError({ maxLength: 2500 }),
      path: ["memories"],
    });

  useEffect(() => {
    if (defaultValues) {
      setMemories(defaultValues.memories ?? []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues
      ? { ...defaultValues, martyrId: martyrId as string }
      : {
          memories: [],
          martyrId: martyrId as string,
        },
  });

  return { form };
}

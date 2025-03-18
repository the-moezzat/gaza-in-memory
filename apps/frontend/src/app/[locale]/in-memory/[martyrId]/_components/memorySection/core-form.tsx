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
import { useParams } from "next/navigation";
import useMemoryStore from "../../_store/memoryStore";
import MemoriesForm from "./memories-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrentLocale } from "@/utils/useCurrentLocale";
import inMemoryTranslator from "../../_glossary/translator";
import ChainOfMemoriesCarousel from "./chain-of-memories-carousel";
import {
  type CoreMemoryFormSchema,
  useCoreMemoryForm,
} from "../../_hooks/useCoreForm";
import type { z } from "zod";

interface AddMemoryFormProps {
  martyrName: string;
  onCancel: () => void;
  defaultValues?: Partial<z.infer<typeof CoreMemoryFormSchema>>;
  onSubmit: (data: z.infer<typeof CoreMemoryFormSchema>) => void;
  children?: React.ReactNode;
}

const relationshipOptions = [
  "family_member",
  "close_friend",
  "colleague",
  "classmate",
  "neighbor",
  "teacher_student",
  "religious_community_member",
  "childhood_friend",
  "sports_team_member",
  "volunteer_charity_work_associate",
  "medical_care_provider",
  "social_media_friend",
  "extended_family",
  "community_leader",
  "other",
];

export default function CoreForm({
  martyrName,
  onCancel,
  defaultValues,
  onSubmit,
  children,
}: AddMemoryFormProps) {
  const { martyrId } = useParams();
  const { memories } = useMemoryStore();
  const locale = useCurrentLocale();
  const t = inMemoryTranslator(locale);

  const { form } = useCoreMemoryForm({ defaultValues });

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
                <FormLabel>{t.relationship({ name: martyrName })}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  dir={locale === "ar" ? "rtl" : "ltr"}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t.selectRelationship()} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {relationshipOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {t[option as keyof typeof t]()}
                        {/* {option} */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <MemoriesForm martyrName={martyrName} />

          <input type="hidden" name="martyrId" value={martyrId} />

          {children}
          {/* {memories.length > 0 && (
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                type="button"
                className="hidden self-end lg:block"
                onClick={onCancel}
              >
                {t.cancel()}
              </Button>
              <Button
                type="submit"
                className="w-full self-end lg:w-fit"
                disabled={form.formState.isSubmitting}
              >
                {t.share()}{" "}
                {memories.length > 1
                  ? `${memories.length} ${t.memories()}`
                  : t.memory()}
              </Button>
            </div>
          )} */}
        </form>
      </Form>
    </div>
  );
}

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@/components/ui/dialog";
import { z } from "zod";
import { useEventStore } from "@/app/[locale]/add-martyrs/_store/eventStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomDatePicker from "@/app/[locale]/add-martyrs/_components/date-picker";
import { useCurrentLocale } from "@/utils/useCurrentLocale";
import addMartyrTranslator from "../_glossary/translator";

const formSchema = z.object({
  title: z.string({ required_error: "Required" }),
  eventDate: z.date({ required_error: "Required" }),
  description: z.string().optional(),
});

type Event = {
  id: number;
  title: string;
  eventDate: Date;
  description?: string;
};

function AddEventForm({
  onSubmission,
  event,
}: {
  onSubmission?: (event: Event) => void;
  event?: Partial<Event>;
}) {
  const { events, addEvent } = useEventStore();
  const locale = useCurrentLocale();
  const t = addMartyrTranslator(locale);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: event
      ? event
      : {
          description: "",
        },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newEvent = {
      id: event?.id ? event.id : new Date().getTime(),
      ...values,
    };
    if (onSubmission) {
      onSubmission(newEvent);
      return;
    }
    addEvent(newEvent);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"flex flex-col gap-4"}
      >
        <div className={"grid grid-cols-2 items-center gap-2"}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className={"flex flex-col gap-1"}>
                <div
                  className={"flex w-full items-center justify-between gap-2"}
                >
                  <FormLabel>{t.eventTitle()}</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input placeholder={t.eventTitle()} {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventDate"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <div
                  className={"flex w-full items-center justify-between gap-2"}
                >
                  <FormLabel>{t.eventDate()}</FormLabel>
                  <FormMessage />
                </div>
                <CustomDatePicker date={field.value} setDate={field.onChange} />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.eventDescription()}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t.eventDescriptionPlaceholder()}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogClose asChild>
          <Button type="submit">{t.submit()}</Button>
        </DialogClose>
      </form>
    </Form>
  );
}

export default AddEventForm;

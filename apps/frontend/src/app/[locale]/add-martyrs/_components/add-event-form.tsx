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
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: event
      ? event
      : {
          description: "",
        },
  });

  console.log(events);

  // 2. Define a submit handler.
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
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"flex flex-col gap-4"}
      >
        <div className={"grid grid-cols-2 gap-2 items-center"}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className={"flex flex-col gap-1"}>
                <div
                  className={"flex gap-2 items-center justify-between w-full"}
                >
                  <FormLabel>Event Title</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input placeholder="Getting first Child" {...field} />
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
                  className={"flex gap-2 items-center justify-between w-full"}
                >
                  <FormLabel>Event Date</FormLabel>
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
              <div className={"flex gap-2 items-center justify-between w-full"}>
                <FormLabel>Event Description</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className={"flex gap-2 self-end"}>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button onClick={form.handleSubmit(onSubmit)} type="button">
            Add Event
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default AddEventForm;

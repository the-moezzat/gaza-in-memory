"use client";
import { Text, Timeline } from "@mantine/core";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pen, Plus, Trash } from "lucide-react";
import AddEventForm from "@/app/[locale]/add-martyrs/_components/add-event-form";
import { useEventStore } from "@/app/[locale]/add-martyrs/_store/eventStore";
import { Button } from "@/components/ui/button";
import { useCurrentLocale } from "@/utils/useCurrentLocale";
import addMartyrTranslator from "../_glossary/translator";

function LifeTimeline() {
  const { events, removeEvent, updateEvent } = useEventStore();
  const locale = useCurrentLocale();
  const t = addMartyrTranslator(locale);

  return (
    <Timeline active={events.length - 1} bulletSize={24} lineWidth={2}>
      {events.map((event, index) => (
        <Timeline.Item
          key={event.id}
          title={event.title}
          lineVariant={index !== events.length - 1 ? "solid" : "dashed"}
        >
          <Text c="dimmed" size="sm">
            {event.description}
          </Text>
          <Text size="xs" mt={4}>
            {new Intl.DateTimeFormat(locale, {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }).format(new Date(event.eventDate))}
          </Text>

          <div className={"mt-2 flex gap-2"}>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  type={"button"}
                  variant={"outline"}
                  className={"space-x-2"}
                  size={"sm"}
                >
                  <Pen size={16} />
                  <span>{t.editEvent()}</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t.addNewLifeEvent()}</DialogTitle>
                </DialogHeader>
                <AddEventForm
                  event={event}
                  onSubmission={(event) => updateEvent(event)}
                />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  type={"button"}
                  variant={"destructive"}
                  className={"space-x-2"}
                  size={"sm"}
                >
                  <Trash size={16} />
                  <span>{t.deleteEvent()}</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t.deleteEventConfirm()}</DialogTitle>
                  <DialogDescription>
                    {t.deleteEventDescription()}
                  </DialogDescription>
                </DialogHeader>

                <DialogClose asChild>
                  <div className={"flex w-full items-center justify-end gap-2"}>
                    <Button variant={"outline"} type={"button"}>
                      {t.cancel()}
                    </Button>
                    <Button
                      type={"button"}
                      variant={"destructive"}
                      onClick={() => removeEvent(event)}
                    >
                      {t.deleteEvent()}
                    </Button>
                  </div>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
        </Timeline.Item>
      ))}

      <Timeline.Item>
        <Dialog>
          <DialogTrigger
            className={
              "flex items-center gap-2 rounded-xl border border-dashed border-gray-200 bg-gray-50 px-8 py-4 text-base font-medium text-gray-800"
            }
          >
            <Plus size={24} />
            <span>{t.addEvent()}</span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t.addNewLifeEvent()}</DialogTitle>
            </DialogHeader>
            <AddEventForm />
          </DialogContent>
        </Dialog>
      </Timeline.Item>
    </Timeline>
  );
}

export default LifeTimeline;

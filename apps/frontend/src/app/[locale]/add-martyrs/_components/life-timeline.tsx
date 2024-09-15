"use client";
import React from "react";
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
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

function LifeTimeline() {
  const { events, removeEvent, updateEvent } = useEventStore();

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
            {format(event.eventDate, "dd MMM yyyy")}
          </Text>

          <div className={"flex gap-2 mt-2"}>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  type={"button"}
                  variant={"outline"}
                  className={"space-x-2"}
                  size={"sm"}
                >
                  <Pen size={16} />
                  <span>Edit</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add a new Life Event</DialogTitle>
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
                  <span>Delete</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    This action can&apos;t be undo and will delete this event.
                  </DialogDescription>
                </DialogHeader>

                <DialogClose asChild>
                  <div className={"flex gap-2 items-center justify-end w-full"}>
                    <Button variant={"outline"} type={"button"}>
                      Cancel
                    </Button>
                    <Button
                      type={"button"}
                      variant={"destructive"}
                      onClick={() => removeEvent(event)}
                    >
                      Delete
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
              "border-dashed border px-8 py-4 rounded-xl font-medium text-gray-800 flex gap-2 items-center bg-gray-50 text-base border-gray-200"
            }
          >
            <Plus size={24} />
            <span>Add new event</span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a new Life Event</DialogTitle>
            </DialogHeader>
            <AddEventForm />
          </DialogContent>
        </Dialog>
      </Timeline.Item>
    </Timeline>
  );
}

export default LifeTimeline;

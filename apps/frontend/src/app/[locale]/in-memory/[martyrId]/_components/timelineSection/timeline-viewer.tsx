"use client";
import { Database } from "@/types/db";
import { useCurrentLocale } from "@/utils/useCurrentLocale";
import { Text, Timeline } from "@mantine/core";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale"; // استيراد الـlocale المناسب
import React from "react";

type Event = Database["public"]["Tables"]["events"]["Row"];

interface TimelineViewerProps {
  events: Event[];
}

export default function TimelineViewer({ events }: TimelineViewerProps) {
  const locale = useCurrentLocale();

  const localizeDate = (date: string) => {
    const eventDate = new Date(date);
    return format(eventDate, "dd MMM yyyy", {
      locale: locale === "ar" ? ar : enUS,
    });
  };

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
          <Text size="xs" mt={4} c={"gray.7"}>
            {localizeDate(event.event_date)}
          </Text>
        </Timeline.Item>
      ))}
    </Timeline>
  );
}

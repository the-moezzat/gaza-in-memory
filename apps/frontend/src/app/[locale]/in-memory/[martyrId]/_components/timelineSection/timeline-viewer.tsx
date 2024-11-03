"use client";
import { Database } from "@/types/db";
import { useCurrentLocale } from "@/utils/useCurrentLocale";
import { Text, Timeline } from "@mantine/core";
import React from "react";
import { localizeDate } from "../../_utils/localizeDates";

type Event = Database["public"]["Tables"]["events"]["Row"];

interface TimelineViewerProps {
  events: Event[];
}

export default function TimelineViewer({ events }: TimelineViewerProps) {
  const locale = useCurrentLocale();

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
            {localizeDate(event.event_date, locale)}
          </Text>
        </Timeline.Item>
      ))}
    </Timeline>
  );
}

"use client";
import { Database } from "@/types/db";
import { Text, Timeline } from "@mantine/core";
import { format } from "date-fns";
import React from "react";

type Event = Database["public"]["Tables"]["events"]["Row"];

interface TimelineViewerProps {
  events: Event[];
}

export default function TimelineViewer({ events }: TimelineViewerProps) {
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
            {format(event.event_date, "dd MMM yyyy")}
          </Text>
        </Timeline.Item>
      ))}
    </Timeline>
  );
}

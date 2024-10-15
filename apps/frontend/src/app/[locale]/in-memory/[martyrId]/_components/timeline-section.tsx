import { Martyr } from "@/app/[locale]/_types/Mayrter";
import React from "react";
import { Text, Timeline } from "@mantine/core";
import { format } from "date-fns";
import { createClerkSupabaseClientSsr } from "@/lib/client";
import TimelineViewer from "./timeline-viewer";
interface TimelineSectionProps {
  martyr: Martyr;
}

export default async function TimelineSection({
  martyr,
}: TimelineSectionProps) {
  const client = createClerkSupabaseClientSsr();
  const { data: events, error } = await client
    .from("events")
    .select("*")
    .eq("martyr_id", martyr.id);

  console.log(events);
  console.log(error);

  return error ? null : <TimelineViewer events={events} />;
}

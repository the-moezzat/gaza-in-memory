import { Martyr } from "@/app/[locale]/_types/Mayrter";
import React from "react";
import { createClerkSupabaseClientSsr } from "@/lib/client";
import TimelineViewer from "./timeline-viewer";
interface TimelineSectionProps {
  martyr: Martyr;
}

export default async function TimelineSection({
  martyr,
}: TimelineSectionProps) {
  const client = createClerkSupabaseClientSsr(false);
  const { data: events, error } = await client
    .from("events")
    .select("*")
    .eq("martyr_id", martyr.id);

  return error ? null : <TimelineViewer events={events} />;
}

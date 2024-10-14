import React from "react";
import ProfileCard from "./_components/profile-card";
import { createClerkSupabaseClientSsr } from "@/lib/client";
import CreateorCard from "./_components/createor-card";
import ConfirmationCard from "./_components/confirmation-card";
import StorySection from "./_components/story-section";
import TimelineSection from "./_components/timeline-section";

export default async function Page({
  params,
}: {
  params: { martyrId: string };
}) {
  const client = createClerkSupabaseClientSsr();

  const { data: martyr, error } = await client
    .from("martyrs")
    .select("*")
    .eq("id", params.martyrId)
    .single();

  if (error) {
    throw new Error("Failed to get martyr data", {
      cause: error,
    });
  }

  return (
    <div className="grid grid-cols-[9fr,26fr] gap-4 p-4">
      <div className="space-y-8">
        <ProfileCard martyr={martyr} />
        <ConfirmationCard martyr={martyr} />
        <CreateorCard creatorId={martyr.creator_id} />
      </div>
      <div>
        <Section title="Story">
          <StorySection martyr={martyr} />
        </Section>

        <Section title="Timeline">
          <TimelineSection martyr={martyr} />
        </Section>
      </div>
    </div>
  );
}

function Section({
  children,
  title,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      {children}
    </div>
  );
}

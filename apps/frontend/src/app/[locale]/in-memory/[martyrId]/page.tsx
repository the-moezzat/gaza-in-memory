import React, { Suspense } from "react";
import ProfileCard from "./_components/profile-card";
import { createClerkSupabaseClientSsr } from "@/lib/client";
import CreateorCard from "./_components/createor-card";
import ConfirmationCard from "./_components/confirmation-card";
import StorySection from "./_components/story-section";
import TimelineSection from "./_components/timelineSection/timeline-section";
import TimelineSkeleton from "./_components/timelineSection/timeline-skeleton";
import TestimonialSection from "./_components/memorySection/memories-section";
import GallerySection from "./_components/gallery-section";
import GallerySkeleton from "./_components/gallery-skeleton";
import InterestSection from "./_components/interest-section";
import AdditionalInfoSection from "./_components/additional-info-section";

export default async function Page(
  props: {
    params: Promise<{ martyrId: string }>;
  }
) {
  const params = await props.params;
  const client = createClerkSupabaseClientSsr(false);

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
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr,3fr]">
        <div className="space-y-8">
          <ProfileCard martyr={martyr} />
          <ConfirmationCard martyr={martyr} />
          <CreateorCard creatorId={martyr.creator_id} />
        </div>
        <div className="space-y-8">
          <Section title="Story">
            <StorySection martyr={martyr} />
          </Section>

          <Section title="Timeline">
            <Suspense fallback={<TimelineSkeleton />}>
              <TimelineSection martyr={martyr} />
            </Suspense>
          </Section>

          <TestimonialSection
            martyrId={martyr.id}
            martyrName={martyr.first_name}
          />

          <Suspense fallback={<GallerySkeleton />}>
            <GallerySection martyrId={martyr.id} />
          </Suspense>

          <Section title="Additional Info">
            <AdditionalInfoSection martyr={martyr} />
          </Section>

          <InterestSection martyr={martyr} />
        </div>
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
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 sm:text-2xl">
        {title}
      </h2>
      <div className="rounded-lg border p-4 sm:p-6">{children}</div>
    </div>
  );
}

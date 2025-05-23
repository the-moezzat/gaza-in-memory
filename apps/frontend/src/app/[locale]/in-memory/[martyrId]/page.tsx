import type React from "react";
import { Suspense } from "react";
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
import { Button } from "@/components/ui/button";
import LocaleLinkWrapper from "../../_components/locale-link-wrapper";
import { ArrowLeft } from "lucide-react";
import { getCurrentLocale } from "@/utils/getLocaleServer";
import inMemoryTranslator from "./_glossary/translator";
import type { Metadata } from "next";
import TestimonialSkeleton from "./_components/memorySection/testimonial-skeleton";
import Share from "./_features/share/share";
import InterestSkeleton from "./_components/interest-skeleton";

export async function generateMetadata({
  params,
}: {
  params: { martyrId: string; locale: string };
}): Promise<Metadata> {
  const client = createClerkSupabaseClientSsr(false);
  const locale = getCurrentLocale();
  const t = inMemoryTranslator(locale);

  const { data: martyr } = await client
    .from("martyrs")
    .select("*")
    .eq("id", params.martyrId)
    .single();

  if (!martyr) {
    return {
      title: "Not Found",
    };
  }

  const fullName = `${martyr.first_name} ${martyr.last_name}`;

  return {
    title: `${fullName} | In Memory`,
    description:
      (typeof martyr.story === "string"
        ? martyr.story.substring(0, 160)
        : "") || `In memory of ${fullName}`,
    openGraph: {
      title: `${fullName} | In Memory`,
      description:
        (typeof martyr.story === "string"
          ? martyr.story.substring(0, 160)
          : "") || `In memory of ${fullName}`,
      images: [`/api/og/martyr/${params.martyrId}`],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${fullName} | In Memory`,
      description:
        (typeof martyr.story === "string"
          ? martyr.story.substring(0, 160)
          : "") || `In memory of ${fullName}`,
      images: [`/api/og/martyr/${params.martyrId}`],
    },
  };
}

export default async function Page(props: { params: { martyrId: string } }) {
  const params = props.params;
  const client = createClerkSupabaseClientSsr(false);
  const locale = getCurrentLocale();

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

  const t = inMemoryTranslator(locale);

  return (
    <div className="space-y-4 px-2 py-2 lg:px-4">
      <div className="flex items-center justify-between text-gray-600">
        <Button variant="ghost" asChild className="h-fit px-2 py-1">
          <LocaleLinkWrapper href="/" className="flex gap-2">
            <ArrowLeft size={16} className="rtl:rotate-180" />
            {t.discover()}
          </LocaleLinkWrapper>
        </Button>

        <Share martyr={martyr} />
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[12fr,24fr] lg:gap-6 xl:grid-cols-[9fr,27fr] xl:gap-8">
        <div className="space-y-4 md:space-y-6 lg:space-y-8">
          <ProfileCard martyr={martyr} />

          <ConfirmationCard martyr={martyr} />
          <CreateorCard creatorId={martyr.creator_id} />
        </div>
        <div className="space-y-8">
          <Section title={t.story()}>
            <StorySection martyr={martyr} />
          </Section>

          <Section title={t.timeline()}>
            <Suspense fallback={<TimelineSkeleton />}>
              <TimelineSection martyr={martyr} />
            </Suspense>
          </Section>

          <Suspense fallback={<TestimonialSkeleton />}>
            <TestimonialSection
              martyrId={martyr.id}
              martyrName={martyr.first_name}
            />
          </Suspense>

          <Suspense fallback={<GallerySkeleton />}>
            <GallerySection martyrId={martyr.id} />
          </Suspense>

          <Section title={t.additionalInfo()}>
            <AdditionalInfoSection martyr={martyr} />
          </Section>

          <Suspense fallback={<InterestSkeleton />}>
            <InterestSection martyr={martyr} />
          </Suspense>
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
    <div className="w-full space-y-2 md:space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 sm:text-2xl md:text-xl">
        {title}
      </h2>
      <div className="rounded-lg border p-4 sm:p-6">{children}</div>
    </div>
  );
}

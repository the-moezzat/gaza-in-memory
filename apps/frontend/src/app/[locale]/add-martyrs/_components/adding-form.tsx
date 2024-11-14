import { Button } from "@/components/ui/button";
import PersonalDetails from "@/app/[locale]/add-martyrs/_components/form-sections/personal-details";
import Status from "@/app/[locale]/add-martyrs/_components/form-sections/status";
import Story from "@/app/[locale]/add-martyrs/_components/form-sections/story";
import AdditionalDetailsModal from "@/app/[locale]/add-martyrs/_components/form-sections/additional-details";
import GallerySection from "@/app/[locale]/add-martyrs/_components/form-sections/gallery-section";
import LifeTimeline from "@/app/[locale]/add-martyrs/_components/life-timeline";

export function AddingForm() {
  return (
    <div className="mb-24 space-y-8">
      <Section title={"Personal Details"}>
        <PersonalDetails />
      </Section>

      <Section title={"Status"}>
        <Status />
      </Section>

      <Section title={"Story"}>
        <Story />
      </Section>

      <Section title={"Timeline"}>
        <LifeTimeline />
      </Section>

      <Section title={"Gallery"}>
        <GallerySection />
      </Section>

      <Section title={"Additional Information"}>
        <AdditionalDetailsModal />
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={"space-y-4"}>
      <h2 className={"text-xl font-medium text-gray-800"}>{title}</h2>
      <div className={"space-y-6 rounded-xl border p-4"}>{children}</div>
    </section>
  );
}

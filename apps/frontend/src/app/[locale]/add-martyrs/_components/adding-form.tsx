import { Button } from "@/components/ui/button";
import PersonalDetails from "@/app/[locale]/add-martyrs/_components/form-sections/personal-details";
import Status from "@/app/[locale]/add-martyrs/_components/form-sections/status";
import Story from "@/app/[locale]/add-martyrs/_components/form-sections/story";
import AdditionalDetailsModal from "@/app/[locale]/add-martyrs/_components/form-sections/additional-details";
import GallerySection from "@/app/[locale]/add-martyrs/_components/form-sections/gallery-section";
import LifeTimeline from "@/app/[locale]/add-martyrs/_components/life-timeline";
import translator from "../_glossary/translator";
import { useCurrentLocale } from "@/utils/useCurrentLocale";

export function AddingForm() {
  const locale = useCurrentLocale();
  const t = translator(locale);

  return (
    <div className="mb-24 space-y-8">
      <Section title={t.personalDetails()}>
        <PersonalDetails />
      </Section>

      <Section title={t.status()}>
        <Status />
      </Section>

      <Section title={t.story()}>
        <Story />
      </Section>

      <Section title={t.timeline()}>
        <LifeTimeline />
      </Section>

      <Section title={t.gallery()}>
        <GallerySection />
      </Section>

      <Section title={t.additionalInformation()}>
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

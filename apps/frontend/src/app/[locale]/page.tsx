import { Suspense } from "react";
import { Spotlight } from "@/components/ui/spotlight";
import Search from "@/app/[locale]/_components/search";
import {
  type SupportedLocale,
  supportedLocale,
} from "@/lib/supportedLanguages";
import AnimatedQuoteBubbles from "@/app/[locale]/_components/animated-quote-bubbles";
import LatestMayrtes from "./_components/latest-mayrtes";
import { Skeleton } from "@/components/ui/skeleton";
import { headers } from "next/headers";
import translator from "./_glossary/translator";
import { FlipWords } from "@/components/ui/flip-words";
import { Metadata } from "next";

export function generateMetadata({
  params,
}: {
  params: { locale: SupportedLocale };
}): Metadata {
  const t = translator(params.locale);

  return {
    title: `${t.notJustNumbers()} | Palestine Martyrs`,
    description: t.storiesUnfinished(),
    // openGraph: {
    //   title: `${t.notJustNumbers()} | Palestine Martyrs`,
    //   description: t.storiesUnfinished(),
    //   type: "website",
    //   locale: params.locale,
    //   images: [
    //     {
    //       url: "/og-image.jpg", // You'll need to add this image to your public folder
    //       width: 1200,
    //       height: 630,
    //       alt: "Palestine Martyrs Memorial",
    //     },
    //   ],
    // },
    // twitter: {
    //   card: "summary_large_image",
    //   title: `${t.notJustNumbers()} | Palestine Martyrs`,
    //   description: t.storiesUnfinished(),
    // },
  };
}

export function generateStaticParams() {
  return supportedLocale.map((locale) => ({ locale }));
}

export const revalidate = 900;

export default function Home({
  params,
}: {
  params: { locale: SupportedLocale };
}) {
  const t = translator(params.locale);

  return (
    <main className={"w-screen p-2 lg:p-4"}>
      <div className="relative flex h-fit w-full flex-col gap-0 overflow-hidden rounded-xl bg-black/[0.96] pb-6 antialiased bg-grid-white/[0.02] md:h-[25rem] lg:h-[40rem] lg:items-center lg:justify-center lg:gap-20">
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="white"
        />
        <div className="dark relative z-10 mx-auto w-full p-4 md:pt-10 lg:pt-20">
          <h1 className="md:leading- bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text py-5 text-center text-3xl font-bold text-transparent md:text-5xl lg:text-7xl">
            {t.notJustNumbers()} <br />
            {t.storiesUnfinished()}
            {/* <FlipWords
              words={[
                "Stories Unfinished",
                "Dreams Deferred",
                "Memories to Honor",
                "Lives Woven into Ours",
                "Voices of History",
              ]}
              className={"text-gray-100"}
            /> */}
          </h1>
        </div>
        <div className={"z-10"}>
          <Search />
        </div>
        <div className="hidden md:block">
          <AnimatedQuoteBubbles />
        </div>
      </div>

      <section className={"mt-6 space-y-4 md:mt-8 lg:mt-20 lg:space-y-6"}>
        <h2
          className={"text-lg font-bold text-gray-800 md:text-xl lg:text-2xl"}
        >
          {t.latestMartyrs()}
        </h2>
        <LatestMayrtes />
      </section>
    </main>
  );
}

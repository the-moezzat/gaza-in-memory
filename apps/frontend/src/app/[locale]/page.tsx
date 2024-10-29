import { Suspense } from "react";
import { Spotlight } from "@/components/ui/spotlight";
import Search from "@/app/[locale]/_components/search";
import { supportedLocale } from "@/lib/supportedLanguages";
import AnimatedQuoteBubbles from "@/app/[locale]/_components/animated-quote-bubbles";
import LatestMayrtes from "./_components/latest-mayrtes";
import { Skeleton } from "@/components/ui/skeleton";
import { headers } from "next/headers";

export function generateStaticParams() {
  return supportedLocale.map((locale) => ({ locale }));
}

export const revalidate = 900;

export default function Home() {
  const mainHeader = headers();
  const headersList = Array.from(headers().keys());

  // const referer = headersList.get("referer");

  for (const header of headersList) {
    console.log(header, mainHeader.get(header));
    // console.log(mainHeader.get(header));
  }

  return (
    <main className={"p-4"}>
      <div className="relative flex h-[40rem] w-full flex-col gap-20 overflow-hidden rounded-xl bg-black/[0.96] antialiased bg-grid-white/[0.02] md:items-center md:justify-center">
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="white"
        />
        <div className="dark relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
          <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
            Not Just a Numbers <br />
            They Are Stories Unfinished
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
        <AnimatedQuoteBubbles />
      </div>

      <section className={"mt-16 space-y-6"}>
        <h2 className={"text-2xl font-bold text-gray-800"}>Latest Martyrs</h2>
        <LatestMayrtes />
      </section>
    </main>
  );
}

import React from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { FlipWords } from "@/components/ui/flip-words";
import Search from "@/app/[locale]/_components/search";
import { supportedLocales } from "@/lib/supportedLanguages";
import AnimatedQuoteBubbles from "@/app/[locale]/_components/animated-quote-bubbles";
import MartyrCard from "@/app/[locale]/_components/martyr-card";

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export default function Home({ params }: { params: { locale: string } }) {
  return (
    <main className={"p-4"}>
      <div className="h-[40rem] w-full rounded-xl flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden flex-col gap-20">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0 dark ">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
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
        <AnimatedQuoteBubbles /> {/* Add the new component here */}
      </div>

      <section className={" mt-16 space-y-6"}>
        <h2 className={"text-2xl text-gray-800 font-bold"}>Martyrs</h2>
        <div className={"flex gap-4"}>
          <MartyrCard />
          <MartyrCard />
          <MartyrCard />
        </div>
      </section>
    </main>
  );
}

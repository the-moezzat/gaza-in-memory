import React from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { FlipWords } from "@/components/ui/flip-words";
import Search from "@/app/[locale]/_components/search";
import { supportedLocales } from "@/lib/supportedLanguages";

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export default function Home({ params }: { params: { locale: string } }) {
  return (
    <main className={"p-6"}>
      <div className="h-[40rem] w-full rounded-xl flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden flex-col gap-20">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0 dark ">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            Not Just a Numbers <br />
            They Are{" "}
            <FlipWords
              words={[
                "Stories Unfinished",
                "Dreams Deferred",
                "Memories to Honor",
                "Lives Woven into Ours",
                "Voices of History",
              ]}
              className={"text-gray-100"}
            />
          </h1>
        </div>

        <Search />

        <div
          className={
            "w-fit h-fit bg-[#2FCC59] rounded-full after:content-[''] after:ml-0.5 after:w-6 after:h-5 after:bottom-0 after:absolute after:bg-transparent after:-right-6 after:rounded-b-xl after:shadow-[-8px_0_0_0_#2FCC59] px-4 py-1 text-white text-2xl absolute bottom-20 right-20 font-medium -z-10"
          }
        >
          كلنا مشروع شهيد يازلمه
        </div>
      </div>
    </main>
  );
}

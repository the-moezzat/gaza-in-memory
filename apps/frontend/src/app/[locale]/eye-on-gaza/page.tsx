import { Button } from "@/components/ui/button";
import { getCurrentLocale } from "@/utils/getLocaleServer";
import { socialMediaIconsMapper } from "@/utils/socialMediaIconsMapper";
import { get } from "http";
import {
  BadgeCheck,
  InstagramIcon,
  WheatIcon,
  YoutubeIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import eyeOnGazaTranslator from "./_glossary/translator";

const features = {
  feature1:
    "Provide minute-by-minute updates from trusted reporters on the ground",
  feature2: "Deliver fact-checked, unbiased coverage of events in Gaza",
  feature3: "Track and verify incidents in real-time",
  feature4: "Maintain a comprehensive database of events and their impact",
  feature5: "Present data-driven analysis of humanitarian situations",
  feature6: "Offer verified news from credible sources",
  feature7: "Include interactive maps and visualizations of events",
  feature8: "Feature firsthand accounts and verified testimonies",
};

export default function Page() {
  const locale = getCurrentLocale();
  const t = eyeOnGazaTranslator(locale);

  return (
    <div className="mx-auto my-16 flex max-w-screen-lg flex-col gap-16 p-4">
      <div className="relative flex h-fit w-full rounded-2xl bg-gray-50/80 p-8 px-8 bg-dot-black/[0.35] dark:bg-black dark:bg-dot-white/[0.2]">
        <h1 className="text-7xl font-medium text-gray-800 lg:text-9xl">
          {t.eyeOnGaza()}
        </h1>
      </div>

      <div className="flex justify-between gap-8 max-md:flex-col">
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-medium text-gray-800 md:text-2xl">
            {t.aboutTitle()}
          </h2>

          <div className="space-y-6">
            <p className="text-sm text-gray-600 md:text-base">
              {t.aboutDescription()}
            </p>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800 md:text-xl">
                {t.expectTitle()}
              </h3>
              <ul className="space-y-2 pl-4">
                {Object.keys(features).map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-baseline gap-2 text-sm text-gray-600 md:text-base"
                  >
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-600"></span>
                    <span>{t[feature as keyof typeof t]()}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm text-gray-600 md:text-base">
              {t.expectDescription()}
            </p>
          </div>
        </div>

        <div className="shrink-0 grow-0 basis-72 space-y-4">
          <div className="rounded-lg bg-gray-100/50 p-4">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {t.comingSoonTitle()}
                </h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
                  <BadgeCheck className="h-4 w-4" /> {t.comingSoonBadge()}
                </span>
              </div>
              <p className="mt-2 text-gray-600">{t.comingSoonDescription()}</p>
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-800">{t.followUs()}</h3>
          <div className="flex gap-0.5">
            <Button variant="secondary" className="group-round" asChild>
              <Link href="https://www.facebook.com/EyeOnGaza">
                {socialMediaIconsMapper("facebook")}
              </Link>
            </Button>

            <Button variant="secondary" className="group-round" asChild>
              <Link href="https://www.instagram.com/eyeongaza">
                {socialMediaIconsMapper("instagram")}
              </Link>
            </Button>

            <Button variant="secondary" className="group-round" asChild>
              <Link href="https://www.youtube.com/@EyeOnGaza">
                {socialMediaIconsMapper("youtube")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

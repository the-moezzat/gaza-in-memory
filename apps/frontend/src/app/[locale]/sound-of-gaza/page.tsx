import { Button } from "@/components/ui/button";
import { getCurrentLocale } from "@/utils/getLocaleServer";
import { socialMediaIconsMapper } from "@/utils/socialMediaIconsMapper";
import Link from "next/link";
import React from "react";
import soundOfGazaTranslator from "./_glossary/translator";
import { BadgeCheck } from "lucide-react";

const features = {
  feature1: "Real-time news updates from verified sources on the ground",
  feature2: "Live audio broadcasts from key locations and events",
  feature3: "Daily news roundups and situation summaries",
  feature4: "Fact-checked and verified news stories",
  feature5: "Multi-language news coverage (Arabic, English, and more)",
  feature6: "Breaking news alerts and notifications",
  feature7: "Detailed investigative reports and documentaries",
  feature8: "Archive of past events and historical context",
};

export default function Page() {
  const locale = getCurrentLocale();
  const t = soundOfGazaTranslator(locale);
  return (
    <div className="mx-auto my-16 flex max-w-screen-lg flex-col gap-16">
      <div className="relative flex h-fit w-full rounded-2xl bg-gray-50/80 p-8 px-8 bg-dot-black/[0.35] dark:bg-black dark:bg-dot-white/[0.2]">
        <h1 className="text-9xl font-medium text-gray-800">
          {t.soundOfGaza()}
        </h1>
      </div>

      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-medium text-gray-800">
            {t.aboutTitle()}
          </h2>

          <div className="space-y-6">
            <p className="text-gray-600">{t.aboutDescription()}</p>

            <div className="space-y-4">
              <h3 className="text-xl font-medium text-gray-800">
                {t.expectTitle()}
              </h3>
              {/* <p className="text-gray-600">
                This upcoming news platform will serve as your trusted source
                for:
              </p> */}
              <ul className="space-y-2 pl-4">
                {Object.keys(features).map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-baseline gap-2 text-gray-600"
                  >
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-600"></span>
                    <span>{t[feature as keyof typeof t]()}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-gray-600">{t.expectDescription()}</p>
          </div>
        </div>

        <div className="shrink-0 grow-0 basis-72 space-y-4">
          <div className="rounded-xl bg-gray-100/50 p-4">
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
          <h3 className="text-lg font-medium text-gray-800">{t.followUs()}</h3>
          <div className="flex gap-0.5">
            <Button variant="secondary" className="group-round" asChild>
              <Link href="https://www.facebook.com/SoundOfGaza">
                {socialMediaIconsMapper("facebook")}
              </Link>
            </Button>
            <Button variant="secondary" className="group-round" asChild>
              <Link href="https://www.instagram.com/soundofgaza">
                {socialMediaIconsMapper("instagram")}
              </Link>
            </Button>
            <Button variant="secondary" className="group-round" asChild>
              <Link href="https://www.youtube.com/@SoundOfGaza">
                {socialMediaIconsMapper("youtube")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { getCurrentLocale } from "@/utils/getLocaleServer";
import { socialMediaIconsMapper } from "@/utils/socialMediaIconsMapper";
import { BadgeCheck } from "lucide-react";
import Link from "next/link";
import React from "react";
import boycottTranslator from "./_glossary/translator";

export default function Page() {
  const features = {
    feature1:
      "Comprehensive list of companies supporting occupation with evidence",
    feature2: "Detailed alternatives to boycotted products and services",
    feature3: "Regular updates on corporate stances and actions",
    feature4: "Spotlight on businesses actively supporting Palestinian causes",
    feature5: "Impact tracker showing the effect of boycott movements",
    feature6: "Easy-to-use search and filter system",
    feature7: "Verified documentation and sources for all claims",
    feature8: "Community-driven updates and verifications",
    feature9: "Direct links to ethical alternatives and supporting businesses",
  };

  const locale = getCurrentLocale();
  const t = boycottTranslator(locale);

  return (
    <div className="mx-auto my-16 flex max-w-screen-lg flex-col gap-16">
      <div className="relative flex h-fit w-full rounded-2xl bg-gray-50/80 p-8 px-8 bg-dot-black/[0.35] dark:bg-black dark:bg-dot-white/[0.2]">
        <h1 className="text-9xl font-medium text-gray-800">
          {t.boycott()}
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
                This upcoming platform will provide:
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

            <p className="text-gray-600">
             {t.expectDescription()}
            </p>
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
            <p className="mt-2 text-gray-600">
              {t.comingSoonDescription()}
            </p>
          </div>
          <h3 className="text-lg font-medium text-gray-800">Follow us:</h3>
          <div className="flex gap-0.5">
            <Button variant="secondary" className="group-round" asChild>
              <Link href="https://www.facebook.com/BoycottAndSupport">
                {socialMediaIconsMapper("facebook")}
              </Link>
            </Button>
            <Button variant="secondary" className="group-round" asChild>
              <Link href="https://www.instagram.com/boycottandsupport">
                {socialMediaIconsMapper("instagram")}
              </Link>
            </Button>
            <Button variant="secondary" className="group-round" asChild>
              <Link href="https://www.youtube.com/@BoycottAndSupport">
                {socialMediaIconsMapper("youtube")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

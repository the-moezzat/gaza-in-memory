import { Martyr } from "@/app/[locale]/_types/Mayrter";
import { Check, ChevronRight, Flag } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { getCurrentLocale } from "@/utils/getLocaleServer";
import translator from "../_glossary/translator";

interface ConfirmationCardProps {
  martyr: Martyr;
}

export default function ConfirmationCard({ martyr }: ConfirmationCardProps) {
  const locale = getCurrentLocale();
  const t = translator(locale);

  return (
    <>
      <div className="hidden space-y-4 lg:block">
        <ConfirmationInformation martyr={martyr} />

        <div className="flex items-center gap-2 text-gray-700">
          <Flag fill="currentColor" size={20} />
          <p className="text-base underline underline-offset-4">
            {t.reportStory()}
          </p>
        </div>
      </div>

      <Drawer>
        <DrawerTrigger className="w-full">
          {" "}
          <div className="flex w-full items-center justify-between rounded-lg border p-4 lg:hidden">
            <h3 className="text-base font-bold text-gray-800 underline underline-offset-4 md:text-xl">
              {t.verifiedAndConfirmed()}
              {/* {martyr.first_name}&apos;s */}
            </h3>
            <span className="sr-only">learn more</span>
            <ChevronRight className="rtl:rotate-180" />
          </div>
        </DrawerTrigger>
        <DrawerContent className="px-">
          <div className="p-4">
            <ConfirmationInformation martyr={martyr} />
          </div>

          <div className="mx-4 flex items-center gap-2 text-gray-700">
            <Flag fill="currentColor" size={20} />
            <p className="text-base underline underline-offset-4">
              {t.reportStory()}
            </p>
          </div>

          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline" className="w-full">
                {t.close()}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function ConfirmationInformation({ martyr }: { martyr: Martyr }) {
  const locale = getCurrentLocale();
  const t = translator(locale);

  return (
    <div className="space-y-4 rounded-2xl border p-4">
      <h3 className="text-lg font-bold text-gray-800 md:text-xl">
        {t.storyConfirmation({ name: martyr.first_name as string })}
      </h3>

      <ul className="space-y-2">
        <li className="flex items-center gap-2 text-gray-600">
          <Check />
          <p>{t.identity()}</p>
        </li>
        <li className="flex items-center gap-2 text-gray-600">
          <Check />
          <p>{t.familyMembers()}</p>
        </li>
        <li className="flex items-center gap-2 text-gray-600">
          <Check />
          <p>{t.deathCertificate()}</p>
        </li>
      </ul>

      <Link href="/" className="block text-sm text-gray-700 underline">
        {t.learnAboutConfirmation()}
      </Link>
    </div>
  );
}

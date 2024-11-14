"use client";
import React from "react";

import ResponsiveDialogDrawer from "../responsive-dialog-drawer";
import { Button } from "@/components/ui/button";
import { ShareIcon } from "lucide-react";
import translator from "../../_glossary/translator";
import { useCurrentLocale } from "@/utils/useCurrentLocale";
import ShareContent from "./content";
import { Martyr } from "@/app/[locale]/_types/Mayrter";

export default function Share({ martyr }: { martyr: Martyr }) {
  const locale = useCurrentLocale();
  const t = translator(locale);

  const martyrLink = `https://www.gazainmemory.tech/${locale}/in-memory/${martyr.id}`;

  return (
    <div className="flex gap-2">
      <ResponsiveDialogDrawer
        trigger={
          <Button variant={"outline"} className="flex items-center gap-2">
            <ShareIcon size={16} />
            {t.share()}
          </Button>
        }
        title={t.shareDialogTitle()}
        description={t.shareDialogDescription()}
      >
        <ShareContent
          url={martyrLink}
          title={t.shareTitle({ name: martyr.first_name })}
          text={t.shareText({ name: martyr.first_name })}
        />
      </ResponsiveDialogDrawer>
    </div>
  );
}

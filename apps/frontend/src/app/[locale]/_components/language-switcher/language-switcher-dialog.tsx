"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Globe } from "lucide-react";
import LanguageSwitcherContent from "./language-switcher-content";
import { useCurrentLocale } from "@/utils/useCurrentLocale";
import translator from "../../_glossary/translator";

export default function LanguageSwitcherDialog() {
  const locale = useCurrentLocale();
  const t = translator(locale);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl md:max-w-3xl lg:max-w-[60%]">
        <DialogHeader>
          <DialogTitle>{t.chooseLanguage()}</DialogTitle>
        </DialogHeader>
        <LanguageSwitcherContent />
      </DialogContent>
    </Dialog>
  );
}

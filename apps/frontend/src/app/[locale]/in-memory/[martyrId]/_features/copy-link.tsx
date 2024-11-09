import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCurrentLocale } from "@/utils/useCurrentLocale";
import { useParams } from "next/navigation";
import React from "react";
import translator from "../_glossary/translator";

export default function CopyLink() {
  const locale = useCurrentLocale();
  const { martyrId } = useParams();
  const t = translator(locale);
  return (
    <div className="flex gap-2">
      <Input
        dir="ltr"
        placeholder="https://www.martyr.com/en/in-memory/123"
        value={`https://www.martyr.com/${locale}/in-memory/${martyrId}`}
        disabled
      />
      <Button> Copy link </Button>
    </div>
  );
}

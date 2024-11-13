import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCurrentLocale } from "@/utils/useCurrentLocale";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import translator from "../_glossary/translator";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { toast } from "sonner";

export default function CopyLink() {
  const locale = useCurrentLocale();
  const { martyrId } = useParams();
  const t = translator(locale);
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    }
  }, [isCopied]);

  return (
    <div className="flex gap-2">
      <Input
        dir="ltr"
        placeholder="https://www.martyr.com/en/in-memory/123"
        value={`https://www.martyr.com/${locale}/in-memory/${martyrId}`}
        disabled
      />
      <Button
        onClick={() => {
          copyToClipboard(
            `https://www.martyr.com/${locale}/in-memory/${martyrId}`,
          );
          toast.success("Text copied to clipboard");
          setIsCopied(true);
        }}
      >
        {isCopied ? "Copied" : "Copy link"}
      </Button>
    </div>
  );
}

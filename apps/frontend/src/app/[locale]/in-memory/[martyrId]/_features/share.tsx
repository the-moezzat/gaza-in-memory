"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCurrentLocale } from "@/utils/useCurrentLocale";
import { Share as ShareIcon } from "lucide-react";
import translator from "../_glossary/translator";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";

export default function Share() {
  const locale = useCurrentLocale();
  const { martyrId } = useParams();
  const t = translator(locale);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="flex items-center gap-2">
          <ShareIcon size={16} />
          {t.share()}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Spread the story</DialogTitle>
          <DialogDescription>
            Let the world know about this story.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2">
          <Input
            dir="ltr"
            placeholder="https://www.martyr.com/en/in-memory/123"
            value={`https://www.martyr.com/${locale}/in-memory/${martyrId}`}
            disabled
          />
          <Button> Copy link </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant={"outline"}> whatsapp</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

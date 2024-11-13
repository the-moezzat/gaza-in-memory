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
import CopyLink from "./copy-link";
import ConfettiExplosion from "react-confetti-explosion";

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

        <CopyLink />

        <div className="grid grid-cols-2 gap-4">
          <Button variant={"outline"}> whatsapp</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

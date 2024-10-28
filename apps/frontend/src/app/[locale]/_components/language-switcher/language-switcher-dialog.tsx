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

export default function LanguageSwitcherDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl md:max-w-3xl lg:max-w-[80%]">
        <DialogHeader>
          <DialogTitle>Choose a language</DialogTitle>
        </DialogHeader>
        <LanguageSwitcherContent />
      </DialogContent>
    </Dialog>
  );
}

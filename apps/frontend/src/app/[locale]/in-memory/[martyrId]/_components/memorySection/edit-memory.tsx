"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddMemoryForm from "./add-memory-form";
import { useMediaQuery } from "@mantine/hooks";
import {
  DrawerTrigger,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  Drawer,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCurrentLocale } from "@/utils/useCurrentLocale";
import translator from "../../_glossary/translator";
import CoreForm from "./core-form";
import useMemoryStore from "../../_store/memoryStore";
import { Memory } from "../../_types/Memory";

export default function EditMemoryButton({
  martyrName,
  existingMemories,
}: {
  martyrName: string;
  existingMemories: Memory;
}) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const locale = useCurrentLocale();
  const t = translator(locale);
  const { memories } = useMemoryStore();

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Plus size={18} /> <span>Share Your Memory</span>
          </Button>
        </SheetTrigger>
        <SheetContent side={"bottom"}>
          <SheetHeader>
            <SheetTitle>{t.shareMemory()}</SheetTitle>
            <SheetDescription>
              {t.shareMemoryDialogDescription({ name: martyrName })}
            </SheetDescription>
          </SheetHeader>

          <CoreForm
            martyrName={martyrName}
            onCancel={() => {
              setOpen(false);
            }}
            onSubmit={(data) => console.log({ ...data, memories })}
            defaultValues={{
              memories: existingMemories.content,
              relationship: existingMemories.relationship ?? "",
            }}
          />
          {/* <AddMemoryForm
            martyrName={martyrName}
            onCancel={() => setOpen(false)}
          /> */}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Plus size={18} /> <span>edit memories</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t.shareMemory()}</DialogTitle>
          <DialogDescription>
            {t.shareMemoryDialogDescription({ name: martyrName })}
          </DialogDescription>
        </DialogHeader>

        <CoreForm
          martyrName={martyrName}
          onCancel={() => {
            setOpen(false);
          }}
          onSubmit={(data) => console.log({ ...data, memories })}
          defaultValues={{
            memories: existingMemories.content,
            relationship: existingMemories.relationship ?? "",
          }}
        />
        {/* <AddMemoryForm
          martyrName={martyrName}
          onCancel={() => setOpen(false)}
        /> */}
      </DialogContent>
    </Dialog>
  );
}

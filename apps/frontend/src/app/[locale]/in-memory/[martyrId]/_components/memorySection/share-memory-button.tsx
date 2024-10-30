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

export default function ShareMemoryButton() {
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

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
            <SheetTitle>Share Your Memory</SheetTitle>
            <SheetDescription>
              Add a memory or chian of memories about the martyr and let
              everyone know him more
            </SheetDescription>
          </SheetHeader>
          <AddMemoryForm onCancel={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      // <Drawer open={open} onOpenChange={setOpen}>
      //   <DrawerTrigger asChild>
      //     <Button variant="outline" className="flex items-center gap-2">
      //       <Plus size={18} /> <span>Share Your Memory</span>
      //     </Button>
      //   </DrawerTrigger>
      //   <DrawerContent>
      //     <DrawerHeader className="text-left">
      //       <DrawerTitle>Edit profile</DrawerTitle>
      //       <DrawerDescription>
      //         Add a memory or chian of memories about the martyr and let
      //         everyone know him more
      //       </DrawerDescription>
      //     </DrawerHeader>
      //     <div className="px-4">
      //       <AddMemoryForm onCancel={() => setOpen(false)} />
      //     </div>
      //     <DrawerFooter className="pt-2">
      //       <DrawerClose asChild>
      //         <Button variant="outline">Cancel</Button>
      //       </DrawerClose>
      //     </DrawerFooter>
      //   </DrawerContent>
      // </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Plus size={18} /> <span>Share Your Memory</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle>Share Your Memory</DialogTitle>
          <DialogDescription>
            Add a memory or chian of memories about the martyr and let everyone
            know him more
          </DialogDescription>
        </DialogHeader>

        <AddMemoryForm onCancel={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

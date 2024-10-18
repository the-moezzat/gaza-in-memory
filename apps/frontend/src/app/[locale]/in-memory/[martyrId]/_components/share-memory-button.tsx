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

export default function ShareMemoryButton() {
  const [open, setOpen] = React.useState(false);

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

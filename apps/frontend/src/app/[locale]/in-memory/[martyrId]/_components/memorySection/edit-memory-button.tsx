"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useCurrentLocale } from "@/utils/useCurrentLocale";
import translator from "../../_glossary/translator";
import CoreForm from "./core-form";
import useMemoryStore from "../../_store/memoryStore";
import BaseMemoryButton from "./base-memory-button";
import { Memory } from "../../_types/Memory";

export default function EditMemoryButton({
  martyrName,
  existingMemories,
}: {
  martyrName: string;
  existingMemories: Memory;
}) {
  const [open, setOpen] = React.useState(false);
  const locale = useCurrentLocale();
  const t = translator(locale);
  const { memories } = useMemoryStore();

  return (
    <BaseMemoryButton
      title={t.editMemoryDialogTitle()}
      description={t.editMemoryDialogDescription({ name: martyrName })}
      trigger={
        <Button variant="outline" className="flex items-center gap-2">
          <Pencil size={18} /> <span>{t.editMemory()}</span>
        </Button>
      }
      open={open}
      setOpen={setOpen}
    >
      <CoreForm
        onCancel={() => setOpen(false)}
        martyrName={martyrName}
        onSubmit={(data) => console.log({ ...data, memories })}
        defaultValues={{
          memories: existingMemories.content,
          relationship: existingMemories.relationship ?? "",
        }}
      />
    </BaseMemoryButton>
  );
}

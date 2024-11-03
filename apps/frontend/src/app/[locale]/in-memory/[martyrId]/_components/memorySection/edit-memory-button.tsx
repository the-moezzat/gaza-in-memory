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
import { editMemory } from "../../_actions/editMemory";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

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

  const { mutate: editMemoryMutation, isPending } = useMutation({
    mutationFn: editMemory,
    onMutate: () => {
      toast.loading(t.memoryUpdateLoadingToast(), {
        id: "edit-memory",
      });
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success(t.memoryUpdatedSuccessToast(), {
        id: "edit-memory",
      });
    },
    onError: () => {
      toast.error(t.memoryUpdateFailedToast(), {
        id: "edit-memory",
      });
    },
  });

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
        onSubmit={(data) =>
          editMemoryMutation({
            ...existingMemories,
            relationship: data.relationship,
            content: memories,
          })
        }
        defaultValues={{
          memories: existingMemories.content,
          relationship: existingMemories.relationship ?? "",
        }}
      >
        <div className="flex justify-end gap-2">
          <Button variant="ghost" type="button" onClick={() => setOpen(false)}>
            {t.cancel()}
          </Button>
          <Button type="submit" disabled={isPending}>
            {t.saveEdits()}
          </Button>
        </div>
      </CoreForm>
    </BaseMemoryButton>
  );
}

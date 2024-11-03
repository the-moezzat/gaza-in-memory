"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCurrentLocale } from "@/utils/useCurrentLocale";
import translator from "../../_glossary/translator";
import CoreForm from "./core-form";
import useMemoryStore from "../../_store/memoryStore";
import BaseMemoryButton from "./base-memory-button";
import { useMutation } from "@tanstack/react-query";
import { addMemory } from "../../_actions/addMemory";
import { toast } from "sonner";

export default function ShareMemoryButton({
  martyrName,
}: {
  martyrName: string;
}) {
  const [open, setOpen] = React.useState(false);
  const locale = useCurrentLocale();
  const t = translator(locale);
  const { memories } = useMemoryStore();

  const { mutate: addMemoryMutation, isPending } = useMutation({
    mutationFn: addMemory,
    onMutate: () => {
      toast.loading(t.addingMemoryToast(), {
        id: "add-memory",
      });
    },
    onSuccess: () => {
      toast.success(t.memoryAddedSuccessToast(), {
        id: "add-memory",
      });
    },
    onError: (error) => {
      toast.error(t.memoryAddFailedToast(), {
        id: "add-memory",
        description: error.message,
      });
    },
  });

  return (
    <BaseMemoryButton
      disabled={isPending}
      title={t.addMemory()}
      description={t.shareMemoryDialogDescription({ name: martyrName })}
      trigger={
        <Button variant="outline" className="flex items-center gap-2">
          <Plus size={18} /> <span>{t.addMemory()}</span>
        </Button>
      }
      open={open}
      setOpen={setOpen}
    >
      <CoreForm
        onCancel={() => setOpen(false)}
        martyrName={martyrName}
        onSubmit={(data) => {
          addMemoryMutation({
            memories: memories,
            martyrId: data.martyrId,
            relationship: data.relationship,
          });
        }}
      >
        {memories.length > 0 && (
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              type="button"
              className="hidden self-end lg:block"
              onClick={() => setOpen(false)}
            >
              {t.cancel()}
            </Button>
            <Button
              type="submit"
              className="w-full self-end lg:w-fit"
              disabled={isPending}
            >
              {t.share()}{" "}
              {memories.length > 1
                ? `${memories.length} ${t.memories()}`
                : t.memory()}
            </Button>
          </div>
        )}
      </CoreForm>
    </BaseMemoryButton>
  );
}

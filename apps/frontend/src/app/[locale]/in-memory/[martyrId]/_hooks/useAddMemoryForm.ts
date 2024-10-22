import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useParams } from "next/navigation";
import useMemoryStore from "../_store/memoryStore";
import { useFormState } from "react-dom";
import { addMemory } from "../_actions/addMemory";
import { Memory } from "../_types/Memory";
import { PostgrestError } from "@supabase/supabase-js";
import { useEffect } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

const FormSchema = z.object({
  memories: z
    .string()
    .min(10, {
      message: "Memory must be at least 10 characters.",
    })
    .max(2500, {
      message: "Memory must be at most 2500 characters.",
    })
    .array(),
  martyrId: z.string(),
  relationship: z.string({ required_error: "Please select a relationship" }),
});

export default function useAddMemoryForm() {
  const { martyrId } = useParams();
  const { memories: memoriesStore } = useMemoryStore();

  const {
    mutate: addMemoryMutation,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: addMemory,
    onMutate: () => {
      toast.loading("Adding memory...", {
        id: "add-memory",
      });
    },
    onSuccess: () => {
      toast.success("Memory added successfully", {
        id: "add-memory",
      });
    },
    onError: (error) => {
      toast.error("Failed to add memory", {
        id: "add-memory",
        description: error.message,
      });
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      memories: [],
      martyrId: martyrId as string,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    addMemoryMutation({
      memories: memoriesStore,
      martyrId: data.martyrId,
      relationship: data.relationship,
    });
  }

  return { form, onSubmit, isSubmitting: isPending, isSuccess, isError };
}

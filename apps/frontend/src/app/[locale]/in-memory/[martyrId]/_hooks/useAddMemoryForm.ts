import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useParams } from "next/navigation";
import useMemoryStore from "../_store/memoryStore";
import { useFormState } from "react-dom";
import { addMemory } from "../_actions/addMemory";
import { Memory } from "../_types/Memory";
import { PostgrestError } from "@supabase/supabase-js";

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
});

const initialState: {
  data: Memory | null;
  error: PostgrestError | null;
} = {
  data: null,
  error: null,
};

export default function useAddMemoryForm() {
  const { martyrId } = useParams();
  const { memories: memoriesStore } = useMemoryStore();
  const [state, formAction] = useFormState(addMemory, initialState);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      memories: [],
      martyrId: martyrId as string,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = new FormData();
    formData.set("memory", JSON.stringify(memoriesStore));
    formData.set("martyrId", data.martyrId);

    formAction(formData);
  }

  return { form, onSubmit };
}

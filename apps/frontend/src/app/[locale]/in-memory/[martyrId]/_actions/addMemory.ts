"use server";

import { createClerkSupabaseClientSsr } from "@/lib/client";
import { revalidatePath } from "next/cache";

export async function addMemory(formData: {
  memories: string[];
  martyrId: string;
  relationship: string;
}) {
  const memories = formData.memories;
  const martyrId = formData.martyrId;
  const relationship = formData.relationship;

  const client = createClerkSupabaseClientSsr();
  const { data, error } = await client
    .from("memories")
    .insert({
      content: memories,
      martyr_id: martyrId,
      relationship: relationship,
    })
    .select()
    .single();

  revalidatePath(`/in-memory/${martyrId}`);

  return {
    data: data,
    error: error,
  };
}

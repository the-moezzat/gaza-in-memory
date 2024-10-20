"use server";

import { createClerkSupabaseClientSsr } from "@/lib/client";

export async function addMemory(prevState: any, formData: FormData) {
  const memories = formData.get("memory") as string;
  const martyrId = formData.get("martyrId") as string;
  const relationship = formData.get("relationship") as string;

  const client = createClerkSupabaseClientSsr();
  const { data, error } = await client
    .from("memories")
    .insert({
      content: JSON.parse(memories),
      martyr_id: martyrId,
      relationship: relationship,
    })
    .select()
    .single();

  return {
    data: data,
    error: error,
  };
}

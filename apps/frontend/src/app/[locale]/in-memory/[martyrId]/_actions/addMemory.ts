"use server";

import { createClerkSupabaseClientSsr } from "@/lib/client";

export async function addMemory(prevState: any, formData: FormData) {
  const memories = formData.get("memory") as string;
  const martyrId = formData.get("martyrId") as string;

  const client = createClerkSupabaseClientSsr();
  const { data, error } = await client
    .from("testimonials")
    .insert({
      content: JSON.parse(memories),
      martyr_id: martyrId,
    })
    .select()
    .single();

  return {
    data: data,
    error: error,
  };
}

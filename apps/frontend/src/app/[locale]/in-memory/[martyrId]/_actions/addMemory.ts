"use server";

import { createClerkSupabaseClientSsr } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
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

  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized you must be logged in to add a memory");
  }

  // check if user has already added a memory
  const { data: existingMemory, error: existingMemoryError } = await client
    .from("memories")
    .select("*")
    .eq("martyr_id", martyrId)
    .eq("author_id", userId);

  if (!existingMemory || existingMemoryError || existingMemory.length > 0) {
    throw new Error("You have already added a memory for this martyr");
  }

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

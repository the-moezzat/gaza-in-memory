"use server";

import { createClerkSupabaseClientSsr } from "@/lib/client";
import { Memory } from "../_types/Memory";
import { auth } from "@clerk/nextjs/server";
import { memo } from "react";
import { revalidatePath } from "next/cache";
import { getCurrentLocale } from "@/utils/getLocaleServer";

export async function editMemory(memory: Memory) {
  const client = createClerkSupabaseClientSsr();
  const locale = getCurrentLocale();

  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized you must be logged in to edit a memory");
  }

  console.log(memory);

  const { data, error } = await client
    .from("memories")
    .update(memory)
    .eq("id", memory.id)
    // .eq("author_id", userId)
    .select("*");

  console.log(data);
  console.log(error);

  if (error) {
    throw new Error("Failed to edit memory");
  }

  revalidatePath(`/in-memory/${memory.martyr_id}`);

  return { data };
}

import { createClerkSupabaseClientSsr } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";

export async function deleteMemory(memoryId: string) {
  const client = createClerkSupabaseClientSsr();

  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized you must be logged in to delete a memory");
  }

  const { error } = await client
    .from("memories")
    .delete()
    .eq("id", memoryId)
    .eq("author_id", userId);

  return { error };
}

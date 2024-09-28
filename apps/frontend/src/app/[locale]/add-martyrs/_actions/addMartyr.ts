"use server";
import { createClerkSupabaseClientSsr } from "@/lib/client";

export async function addMartyr() {
  const client = createClerkSupabaseClientSsr();

  const {} = await client.from("");
}

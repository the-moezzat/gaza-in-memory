"use server";
import { createClerkSupabaseClientSsr } from "@/lib/client";
import { Database } from "@/types/db";

type Child = Database["public"]["Tables"]["children"]["Insert"];
type Event = Database["public"]["Tables"]["events"]["Insert"];
type MartyrInsert = Database["public"]["Tables"]["martyrs"]["Insert"];
type Interest = Database["public"]["Tables"]["interests_and_hobbies"]["Insert"];

export async function addChildren(children: Child[]) {
  const client = createClerkSupabaseClientSsr();

  const { data, error } = await client
    .from("children")
    .insert(children)
    .select("*");

  console.log(data);
  console.log(error);

  return data;
}

export async function createBasicMartyr(martyr: MartyrInsert) {
  const client = createClerkSupabaseClientSsr();

  console.log("reveived martyr", martyr);

  console.log("send martyr", {
    ...martyr,
    story: JSON.parse((martyr.story as string) ?? {}),
    social_media: JSON.parse((martyr.social_media as string) ?? {}),
    guided_story: JSON.parse((martyr.guided_story as string) ?? {}),
  });

  const { data, error } = await client
    .from("martyrs")
    .insert({
      ...martyr,
      story: JSON.parse((martyr.story as string) ?? {}),
      social_media: JSON.parse((martyr.social_media as string) ?? {}),
      guided_story: JSON.parse((martyr.guided_story as string) ?? {}),
    })
    .select("*")
    .single();

  console.log(data);
  console.log(error);

  return data;
}

export async function addInterests(interests: Interest[]) {
  const client = createClerkSupabaseClientSsr();

  const { data, error } = await client
    .from("interests_and_hobbies")
    .insert(interests)
    .select("*");

  console.log(data);
  console.log(error);

  return data;
}

export async function addEvents(events: Event[]) {
  const client = createClerkSupabaseClientSsr();

  const { data, error } = await client
    .from("events")
    .insert(events)
    .select("*");

  console.log(data);
  console.log(error);

  return data;
}

export async function updateProfileImage(url: string, martyrId: string) {
  const client = createClerkSupabaseClientSsr();

  console.log(martyrId, url);

  const { data, error } = await client
    .from("martyrs")
    .update({ profile_image_url: url })
    .eq("id", martyrId)
    .select("*");

  console.log(data);
  console.log(error);

  return data;
}

export async function addImageToGallery(url: string, martyrId: string) {
  const client = createClerkSupabaseClientSsr();

  const { data, error } = await client
    .from("gallery")
    .insert({ image_url: url, martyr_id: martyrId })
    .select("*");

  console.log(data);
  console.log(error);

  return data;
}

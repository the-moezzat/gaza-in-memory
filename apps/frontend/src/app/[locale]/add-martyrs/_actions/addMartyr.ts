"use server";
import { createClerkSupabaseClientSsr } from "@/lib/client";
import { UTapi } from "@/lib/utapi";

interface MartyrObject {
  first_name: string;
  last_name: string;
  middle_name?: string;
  gender: string;
  date_of_birth: string;
  city: string;
  story_type: string;
  story?: string;
  guided_story?: {
    dream: string;
    typical_day: string;
    hobbies: string;
    contribution: string;
    anecdote: string;
    legacy: string;
    one_thing: string;
    passion: string;
    inspiration: string;
    additional: string;
  };
  profile_image_url?: string;
  status: string;
  date_of_death?: string;
  cause_of_death?: string;
  married: boolean;
  spouse_first_name?: string;
  spouse_last_name?: string;
  social_media?: {
    [key: string]: string;
  };
}

export async function addMartyr(martyr: MartyrObject) {
  const client = createClerkSupabaseClientSsr();

  const { data, error } = await client
    .from("martyrs")
    .insert({ ...martyr, story: martyr.story ? JSON.parse(martyr.story) : {} })
    .select("*");

  console.log(data);
  console.log(error);

  return data;
}

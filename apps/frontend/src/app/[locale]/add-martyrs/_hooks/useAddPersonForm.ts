import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChildStore } from "@/app/[locale]/add-martyrs/_store/childStore";
import { useEventStore } from "@/app/[locale]/add-martyrs/_store/eventStore";
import {
  addChildren,
  addEvents,
  addInterests,
  createBasicMartyr,
  updateProfileImage,
} from "../_actions/martyr";
import { FileUploadData, UploadFileResult } from "uploadthing/types";

const formSchema = z.object({
  firstName: z.string({ required_error: "First name is required" }),
  lastName: z.string({ required_error: "Last name is required" }),
  middleName: z.string().optional(),
  gender: z.enum(["male", "female"]),
  dob: z.date({ required_error: "Date of Birth is required" }),
  city: z.string({ required_error: "City is required" }),
  storyType: z.enum(["free", "guided"]),
  story: z.any(), // for free-style
  profileImage: z.instanceof(File).optional(),
  guidedStory: z
    .object({
      dream: z.string().optional(),
      typical_day: z.string().optional(),
      hobbies: z.string().optional(),
      contribution: z.string().optional(),
      anecdote: z.string().optional(),
      legacy: z.string().optional(),
      one_thing: z.string().optional(),
      passion: z.string().optional(),
      inspiration: z.string().optional(),
      additional: z.string().optional(),
    })
    .optional(),
  status: z.enum(["alive", "dead", "wounded"]),
  dod: z.date().optional(),
  cause: z.enum(["bomb", "tank", "bullet", "other"]).optional(),
  socialMedia: z
    .object({
      facebook: z.string().optional(),
      twitter: z.string().optional(),
      instagram: z.string().optional(),
      linkedin: z.string().optional(),
    })
    .optional(),
  interestsAndHobbies: z
    .array(
      z.object({
        category: z.string(),
        tags: z.array(z.string()),
      })
    )
    .optional(),
  gallery: z.array(z.instanceof(File)).optional(),
  married: z.boolean().default(false),
  spouseFirstName: z.string().optional(),
  spouseLastName: z.string().optional(),
  children: z
    .array(
      z.object({
        name: z.string().min(1, "Name is required"),
        age: z.number().min(0, "Age must be a positive number"),
        gender: z.enum(["male", "female"]),
        status: z.enum(["alive", "dead"]),
        dod: z.date().optional(),
      })
    )
    .optional(),
});

export type AddPersonFormValues = z.infer<typeof formSchema>;

export function useAddPersonForm() {
  const form = useForm<AddPersonFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      married: false,
      storyType: "free",
      story: { type: "doc", content: [{ type: "paragraph" }] },
      guidedStory: {
        dream: "",
        typical_day: "",
        hobbies: "",
        contribution: "",
        anecdote: "",
        legacy: "",
        one_thing: "",
        passion: "",
        inspiration: "",
        additional: "",
      },
      socialMedia: {
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
      },
      interestsAndHobbies: [],
      gallery: [],
    },
  });

  const { children } = useChildStore();
  const { events } = useEventStore();

  async function onSubmit(values: AddPersonFormValues) {
    const updatedValues = { ...values, children, events };
    console.log(updatedValues);

    const data = await createBasicMartyr({
      first_name: values.firstName,
      last_name: values.lastName,
      middle_name: values.middleName,
      date_of_birth: values.dob.toDateString(),
      gender: values.gender,
      status: values.status,
      city: values.city,
      story_type: values.storyType,
      story: JSON.stringify(values.story),
      married: values.married,
      spouse_first_name: values.spouseFirstName,
      spouse_last_name: values.spouseLastName,
      date_of_death: values.dod?.toDateString(),
      cause_of_death: values.cause,
      guided_story: JSON.stringify(values.guidedStory),
      social_media: JSON.stringify(values.socialMedia),
    });

    const [timeline, childData, interests, profileImage] = await Promise.all([
      addEvents(
        events.map((event) => ({
          title: event.title,
          description: event.description,
          event_date: event.eventDate.toDateString(),
          martyr_id: data?.id,
        }))
      ),
      addChildren(
        children.map((child) => ({
          name: child.name,
          age: child.age,
          gender: child.gender,
          status: child.status,
          date_of_death: child.dod?.toDateString(),
          martyr_id: data?.id,
        }))
      ),
      addInterests(
        values.interestsAndHobbies?.map((interest) => ({
          category: interest.category,
          tags: interest.tags,
          martyr_id: data?.id,
        })) ?? []
      ),
      addProfileImage(values.profileImage as File, data?.id!),
    ]);

    console.log("data", data);
    console.log("timeline", timeline);
    console.log("childData", childData);
    console.log("interests", interests);
    console.log("profileImage", profileImage);
  }

  return { form, onSubmit };
}

async function uploadImage(file: File): Promise<{ url: UploadFileResult[] }> {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch("/api/upload-image", {
    method: "POST",
    body: formData,
  });
  return response.json();
}

async function addProfileImage(file: File, martyrId: string) {
  const { url } = await uploadImage(file);

  console.log(url);
  console.log(martyrId);

  const data = await updateProfileImage(url[0].data?.url!, martyrId);

  return data;
}

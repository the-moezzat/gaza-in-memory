import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChildStore } from "@/app/[locale]/add-martyrs/_store/childStore";
import { useEventStore } from "@/app/[locale]/add-martyrs/_store/eventStore";
import {
  addChildren,
  addEvents,
  addImageToGallery,
  addInterests,
  createBasicMartyr,
  updateProfileImage,
} from "../_actions/martyr";
import type { UploadFileResult } from "uploadthing/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCurrentLocale } from "@/utils/useCurrentLocale";

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
      }),
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
      }),
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
  const router = useRouter();
  const locale = useCurrentLocale();

  async function onSubmit(values: AddPersonFormValues) {
    toast.loading("Publishing your story", {
      id: "First Step",
      description: "Please wait... we are publish this story to all the world.",
    });

    const updatedValues = { ...values, children, events };
    console.log(updatedValues);

    console.log(values.gallery);

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

    toast.success("Basic data added successfully", {
      id: "First Step",
    });
    toast.loading("Uploading images and adding the details", {
      id: "Second Step",
      description:
        "Please wait... we are uploading images and adding the final details.",
    });

    const [timeline, childData, interests, profileImage, gallery] =
      await Promise.all([
        addEvents(
          events.map((event) => ({
            title: event.title,
            description: event.description,
            event_date: event.eventDate.toDateString(),
            martyr_id: data?.id,
          })),
        ),
        addChildren(
          children.map((child) => ({
            name: child.name,
            age: child.age,
            gender: child.gender,
            status: child.status,
            date_of_death: child.dod?.toDateString(),
            martyr_id: data?.id,
          })),
        ),
        addInterests(
          values.interestsAndHobbies?.map((interest) => ({
            category: interest.category,
            tags: interest.tags,
            martyr_id: data?.id,
          })) ?? [],
        ),
        addProfileImage(values.profileImage as File, data?.id!),
        uploadGallery(values.gallery as File[], data?.id!),
      ]);

    toast.success("Story added successfully", {
      id: "Second Step",
    });

    router.push(`/${locale}/in-memory/${data?.id}`);
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
  const data = await updateProfileImage(url[0].data?.url!, martyrId);
  return data;
}

async function uploadGallery(files: File[], martyrId: string) {
  const data = await Promise.all(
    files.map(async (file) => {
      const { url } = await uploadImage(file);
      console.log(url);
      return addImageToGallery(url[0].data?.url!, martyrId);
    }),
  );

  return data;
}

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  firstName: z.string({ required_error: "First name is required" }),
  lastName: z.string({ required_error: "Last name is required" }),
  middleName: z.string().optional(),
  gender: z.enum(["male", "female"]),
  dob: z.date({ required_error: "Date of Birth is required" }),
  city: z.string({ required_error: "City is required" }),
  storyType: z.enum(["free", "guided"]),
  story: z.any(), // for free-style
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

  function onSubmit(values: AddPersonFormValues) {
    console.log(values);
  }

  return { form, onSubmit };
}

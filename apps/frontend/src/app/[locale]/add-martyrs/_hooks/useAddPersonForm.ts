import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChildStore } from "@/app/[locale]/add-martyrs/_store/childStore";
import { useEventStore } from "@/app/[locale]/add-martyrs/_store/eventStore";

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

  function onSubmit(values: AddPersonFormValues) {
    const updatedValues = { ...values, children, events };
    console.log(updatedValues);
  }

  return { form, onSubmit };
}

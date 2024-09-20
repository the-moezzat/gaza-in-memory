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
  story: z.any(),
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
});

export type AddPersonFormValues = z.infer<typeof formSchema>;

export function useAddPersonForm() {
  const form = useForm<AddPersonFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      story: { type: "doc", content: [{ type: "paragraph" }] },
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

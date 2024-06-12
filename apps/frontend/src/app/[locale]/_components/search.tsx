"use client";
import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  name: z.string().optional(),
  age: z.string().optional(),
  status: z.string().optional(),
  gender: z.string().optional(),
});

function Search() {
  const [enableSubmit, setEnableSubmit] = React.useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: "",
      status: "",
      gender: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const watchAllFields = form.watch();

  const palestinianNames = [
    "Ahmed Al-Masri",
    "Fatima Hussein",
    "Mohammed Khalil",
    "Layla Nasser",
    "Omar Abu-Saleh",
    "Yasmin Jaber",
    "Hassan Ziad",
    "Huda Abdulrahman",
    "Khaled Samir",
    "Nadia Al-Qadi",
    "Ali Mustafa",
    "Aisha Salim",
    "Mazen Farah",
    "Zainab Awad",
    "Mahmoud Ismail",
    "Sara Kamal",
    "Samir Qasim",
    "Rania Darwish",
    "Ibrahim Taha",
    "Mona Saeed",
    "Tariq Mansour",
    "Nour Fathi",
    "Yousef Hamad",
    "Amira Adnan",
    "Hussam Raad",
    "Salma Khoury",
    "Fadi Hisham",
    "Rima Maher",
    "Walid Naim",
    "Dina Najjar",
    "Jamal Bassam",
    "Lina Rashed",
    "Bilal Karam",
    "Nada Sayegh",
    "Hani Khalaf",
    "Sahar Amin",
    "Adel Barakat",
    "Laila Ameen",
    "Nabil Daher",
    "Hana Fares",
    "Sami Shaheen",
    "Alaa Saleh",
    "Farah Jubran",
    "Rashid Nader",
    "Reem Asad",
    "Kareem Murad",
    "Noor Abu-Ali",
    "Anwar Salameh",
    "Sawsan Ibrahim",
    "Basim Qassem",
  ];

  React.useEffect(() => {
    const isAllFieldsEmpty = Object.values(watchAllFields).every(
      (field) => field === "",
    );
    setEnableSubmit(isAllFieldsEmpty);
  }, [watchAllFields]);

  // fill this array with arabic Palestinian name
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex gap-4 items-center bg-white rounded-full pl-6 border py-2 shadow-md w-fit relative pr-12"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className={"space-y-0"}>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <PlaceholdersAndVanishInput
                  placeholders={palestinianNames}
                  onChange={(e) => field.onChange(e)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Separator orientation={"vertical"} />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem className={"space-y-0"}>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input
                  placeholder="Add age "
                  {...field}
                  className={
                    "border-none px-0 py-1 h-fit focus-visible:ring-0 rounded-none w-24"
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Separator orientation={"vertical"} />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className={"space-y-0"}>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Input
                  placeholder="Add Status "
                  {...field}
                  className={
                    "border-none px-0 py-1 h-fit focus-visible:ring-0 rounded-none w-min"
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Separator orientation={"vertical"} />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className={"space-y-0"}>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Input
                  placeholder="Gender"
                  {...field}
                  className={
                    "border-none px-0 py-1 h-fit focus-visible:ring-0 rounded-none w-min"
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />

        <button
          disabled={enableSubmit}
          type="submit"
          className="absolute right-1 top-1/2 z-50 -translate-y-1/2 h-14 w-14 rounded-full disabled:bg-gray-100 bg-green-700 dark:disabled:bg-zinc-800 transition duration-200 flex items-center justify-center"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${!enableSubmit ? "text-green-100" : "text-gray-300"}  h-6 w-6`}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <motion.path
              d="M5 12l14 0"
              initial={{
                strokeDasharray: "50%",
                strokeDashoffset: "50%",
              }}
              animate={{
                strokeDashoffset: !enableSubmit ? 0 : "50%",
              }}
              transition={{
                duration: 0.3,
                ease: "linear",
              }}
            />
            <path d="M13 18l6 -6" />
            <path d="M13 6l6 6" />
          </motion.svg>
        </button>
        {/*<Button type="submit">Submit</Button>*/}
      </form>
    </Form>
  );
}

export default Search;

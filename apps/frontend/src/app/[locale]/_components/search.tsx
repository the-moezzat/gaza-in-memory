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
import { useCurrentLocale } from "@/utils/useCurrentLocale";
import translator from "../_glossary/translator";
const formSchema = z.object({
  name: z.string().optional(),
  age: z.string().optional(),
  status: z.string().optional(),
  gender: z.string().optional(),
});

const palestinianNamesAR = [
  "أحمد المصري",
  "فاطمة حسين",
  "محمد خليل",
  "ليلى ناصر",
  "عمر أبو صالح",
  "ياسمين جابر",
  "حسن زياد",
  "هدى عبد الرحمن",
  "خالد سمير",
  "نادية القاضي",
  "علي مصطفى",
  "عائشة سليم",
  "مازن فرح",
  "زينب عوض",
  "محمود إسماعيل",
  "سارة كمال",
  "سمير قاسم",
  "رانيا درويش",
  "إبراهيم طه",
  "منى سعيد",
  "طارق منصور",
  "نور فتحي",
  "يوسف حمد",
  "أميرة عدنان",
  "حسام رعد",
  "سلمى خوري",
  "فادي هشام",
  "ريما ماهر",
  "وليد نعيم",
  "دينا نجار",
  "جمال بسام",
  "لينا راشد",
  "بلال كرم",
  "ندى صايغ",
  "هاني خلف",
  "سحر أمين",
  "عادل بركات",
  "ليلى أمين",
  "نبيل ضاهر",
  "هناء فارس",
  "سامي شاهين",
  "علاء صالح",
  "فرح جبران",
  "رشيد نادر",
  "ريم أسعد",
  "كريم مراد",
  "نور أبو علي",
  "أنور سلامة",
  "سوسن إبراهيم",
  "باسم قاسم",
];

const palestinianNamesEN = [
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

function Search() {
  const locale = useCurrentLocale();
  const [enableSubmit, setEnableSubmit] = React.useState(true);

  const t = translator(locale);

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
        className={`relative ${locale === "ar" ? "pl-12 pr-6" : "pl-6 pr-12"} flex w-fit items-center gap-2 rounded-full border bg-white py-2 shadow-md md:gap-4`}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className={"space-y-0"}>
              <FormLabel>{t.name()}</FormLabel>
              <FormControl>
                <PlaceholdersAndVanishInput
                  placeholders={
                    locale === "ar" ? palestinianNamesAR : palestinianNamesEN
                  }
                  onChange={(e) => field.onChange(e)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className={"h-9 w-0.5 bg-gray-100"} />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem className={"space-y-0"}>
              <FormLabel>{t.age()}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t.addAge()}
                  {...field}
                  className={
                    "h-fit w-24 rounded-none border-none px-0 py-1 focus-visible:ring-0"
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className={"h-9 w-0.5 bg-gray-100"} />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className={"space-y-0"}>
              <FormLabel>{t.status()}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t.addStatus()}
                  {...field}
                  className={
                    "h-fit w-min rounded-none border-none px-0 py-1 focus-visible:ring-0"
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className={"h-9 w-0.5 bg-gray-100"} />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className={"space-y-0"}>
              <FormLabel>{t.gender()}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t.addGender()}
                  {...field}
                  className={
                    "h-fit w-min rounded-none border-none px-0 py-1 focus-visible:ring-0"
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />

        <button
          disabled={enableSubmit}
          type="submit"
          className={`absolute ${locale === "ar" ? "left-1 rotate-180" : "right-1"} top-1/2 z-50 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-green-700 transition duration-200 disabled:bg-gray-100 dark:disabled:bg-zinc-800`}
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
            className={`${!enableSubmit ? "text-green-100" : "text-gray-300"} h-6 w-6`}
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

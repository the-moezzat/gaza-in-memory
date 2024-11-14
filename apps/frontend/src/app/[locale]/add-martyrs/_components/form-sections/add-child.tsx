import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { BadgeIndianRupee, CalendarIcon, ListVideo, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useChildStore } from "@/app/[locale]/add-martyrs/_store/childStore";
import CustomDatePicker from "../date-picker";
import { useCurrentLocale } from "@/utils/useCurrentLocale";
import translator from "../../_glossary/translator";
import { MaleIcon, FemaleIcon } from "@/components/icons";

const childFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(0, "Age must be a positive number"),
  gender: z.enum(["male", "female"]),
  status: z.enum(["alive", "dead"]),
  dod: z.date().optional(),
});

type ChildFormValues = z.infer<typeof childFormSchema>;

interface AddChildFormProps {
  onCancel: () => void;
}

const AddChildForm: React.FC<AddChildFormProps> = ({ onCancel }) => {
  const { addChild } = useChildStore();
  const locale = useCurrentLocale();
  const t = translator(locale);

  const genderItems = [
    { id: "radio-11-r1", value: "male", label: t.male(), Icon: MaleIcon },
    {
      id: "radio-11-r2",
      value: "female",
      label: t.female(),
      Icon: FemaleIcon,
    },
  ];

  const statusItems = [
    { id: "radio-11-r1", value: "alive", label: t.alive(), Icon: ListVideo },
    { id: "radio-11-r2", value: "dead", label: t.dead(), Icon: X },
    {
      id: "radio-11-r3",
      value: "wounded",
      label: t.wounded(),
      Icon: BadgeIndianRupee,
    },
  ];

  const form = useForm<ChildFormValues>({
    resolver: zodResolver(childFormSchema),
  });

  const handleSubmit = (values: ChildFormValues) => {
    const childWithId = { ...values, id: Date.now() }; // Add an id property
    addChild(childWithId);
    form.reset();
    onCancel();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className={"grid grid-cols-2 gap-4"}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.firstName()}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.age()}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <div className={"flex w-full items-center justify-between gap-2"}>
                <FormLabel>{t.gender()}</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid w-full grid-cols-2 gap-4"
                >
                  {genderItems.map((item) => (
                    <FormItem
                      key={item.id}
                      className="relative flex flex-col gap-4 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring"
                    >
                      <FormControl>
                        <>
                          <div className="flex justify-between gap-2">
                            <RadioGroupItem
                              id={item.id}
                              value={item.value}
                              className="order-1 after:absolute after:inset-0"
                            />
                            <item.Icon
                              // className="opacity-60"
                              size={18}
                              // strokeWidth={2}
                              aria-hidden="true"
                            />
                          </div>
                          <FormLabel htmlFor={item.id}>{item.label}</FormLabel>
                        </>
                      </FormControl>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>{t.status()}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid w-full grid-cols-3 gap-4"
                >
                  {statusItems.map((item) => (
                    <FormItem
                      key={item.id}
                      className="relative flex flex-col gap-4 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring"
                    >
                      <FormControl>
                        <>
                          <div className="flex justify-between gap-2">
                            <RadioGroupItem
                              id={item.id}
                              value={item.value}
                              className="order-1 after:absolute after:inset-0"
                            />
                            <item.Icon
                              // className="opacity-60"
                              size={18}
                              // strokeWidth={2}
                              aria-hidden="true"
                            />
                          </div>
                          <FormLabel htmlFor={item.id}>{item.label}</FormLabel>
                        </>
                      </FormControl>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch("status") === "dead" && (
          <FormField
            control={form.control}
            name="dod"
            render={({ field }) => (
              <>
                <FormItem className="flex flex-col gap-2">
                  <div
                    className={"flex w-full items-center justify-between gap-2"}
                  >
                    <FormLabel>{t.dateOfDeath()}</FormLabel>
                    <FormMessage />
                  </div>
                  <CustomDatePicker
                    date={field.value}
                    setDate={field.onChange}
                  />
                </FormItem>
              </>
            )}
          />
        )}
        <div className="flex gap-2 rtl:flex-row-reverse rtl:justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>
            {t.cancel()}
          </Button>
          <Button type="button" onClick={form.handleSubmit(handleSubmit)}>
            {t.addChild()}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddChildForm;

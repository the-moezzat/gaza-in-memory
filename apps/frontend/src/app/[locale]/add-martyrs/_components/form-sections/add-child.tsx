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
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useChildStore } from "@/app/[locale]/add-martyrs/_store/childStore";

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

  const form = useForm<ChildFormValues>({
    resolver: zodResolver(childFormSchema),
    defaultValues: {
      name: "",
      age: 0,
      gender: "male",
      status: "alive",
    },
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
                <FormLabel>Name</FormLabel>
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
                <FormLabel>Age</FormLabel>
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
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 gap-4 w-full"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="male" className="w-full">
                        <div className="flex items-center gap-4 w-full">
                          <Image
                            src="/illustrations/male.svg"
                            alt="Male illustrator"
                            width={64}
                            height={64}
                          />
                          <p className="text-lg font-medium">Male</p>
                        </div>
                      </RadioGroupItem>
                    </FormControl>
                  </FormItem>
                  <FormItem className="flex items-center">
                    <FormControl>
                      <RadioGroupItem value="female" className="w-full">
                        <div className="flex items-center gap-4">
                          <Image
                            src="/illustrations/female.svg"
                            alt="Female illustrator"
                            width={64}
                            height={64}
                          />
                          <p className="text-lg font-medium">Female</p>
                        </div>
                      </RadioGroupItem>
                    </FormControl>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Status</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 gap-4 w-full"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="alive" className="w-full">
                        <div className="flex items-center gap-4 w-full">
                          <p className="text-lg font-medium">Alive</p>
                        </div>
                      </RadioGroupItem>
                    </FormControl>
                  </FormItem>
                  <FormItem className="flex items-center">
                    <FormControl>
                      <RadioGroupItem value="dead" className="w-full">
                        <div className="flex items-center gap-4">
                          <p className="text-lg font-medium">Deceased</p>
                        </div>
                      </RadioGroupItem>
                    </FormControl>
                  </FormItem>
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
              <FormItem className="flex flex-col">
                <FormLabel>Date of Death</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" onClick={form.handleSubmit(handleSubmit)}>
            Add Child
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddChildForm;

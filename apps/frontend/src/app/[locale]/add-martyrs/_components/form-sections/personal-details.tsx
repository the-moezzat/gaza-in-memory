import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useFormContext } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import ChildSection from "@/app/[locale]/add-martyrs/_components/form-sections/child-section";
import CustomDatePicker from "@/app/[locale]/add-martyrs/_components/date-picker";

function PersonalDetails() {
  const { control, watch } = useFormContext();
  return (
    <>
      <div className={"grid grid-cols-3 gap-4"}>
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Mohamed" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="middleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Middle Name</FormLabel>
              <FormControl>
                <Input placeholder="Tamim" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="El-Bargothy" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="gender"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <div className={"flex gap-2 items-center justify-between w-full"}>
              <FormLabel>Gender</FormLabel>
              <FormMessage />
            </div>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-2 gap-4 w-full"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="male" className={"w-full"}>
                      <div className={"flex items-center gap-4 w-full"}>
                        <Image
                          src={"/illustrations/male.svg"}
                          alt={"Male illustrator"}
                          width={64}
                          height={64}
                        />
                        <p className={"text-lg font-medium "}>Male</p>
                      </div>
                    </RadioGroupItem>
                  </FormControl>
                  <FormLabel className="font-normal sr-only">Male</FormLabel>
                </FormItem>
                <FormItem className="flex items-center">
                  <FormControl>
                    <RadioGroupItem value="female" className={"w-full"}>
                      <div className={"flex items-center gap-4"}>
                        <Image
                          src={"/illustrations/female.svg"}
                          alt={"Male illustrator"}
                          width={64}
                          height={64}
                        />
                        <p className={"text-lg font-medium "}>Female</p>
                      </div>
                    </RadioGroupItem>
                  </FormControl>
                  <FormLabel className="font-normal sr-only">Female</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      <div className={"grid grid-cols-2 gap-4 items-center"}>
        <FormField
          control={control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <div className={"flex gap-2 items-center justify-between w-full"}>
                <FormLabel>Date of Birth</FormLabel>
                <FormMessage />
              </div>
              <CustomDatePicker date={field.value} setDate={field.onChange} />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem className={"flex flex-col gap-2"}>
              <div className={"flex gap-2 items-center justify-between w-full"}>
                <FormLabel>City</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Khan Younes" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className={"rounded-lg border p-4 flex flex-col gap-4"}>
        <FormField
          control={control}
          name="married"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Is he married?</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {watch("married") && (
          <div className={"space-y-6"}>
            <div className={"grid grid-cols-2 gap-4"}>
              <FormField
                control={control}
                name="spouseFirstName"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <div
                      className={
                        "flex gap-2 items-center justify-between w-full"
                      }
                    >
                      <FormLabel>Spouse First Name</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input placeholder="Fatima" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="spouseFamilyName"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <div
                      className={
                        "flex gap-2 items-center justify-between w-full"
                      }
                    >
                      <FormLabel>Spouse Family Name</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input placeholder="Hussien" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className={"flex gap-4 w-full flex-col items-center"}>
              <h4 className={"font-medium text-gray-800 self-start"}>
                Are they have child?
              </h4>
              <ChildSection />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PersonalDetails;

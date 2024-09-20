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

function PersonalDetails() {
  const { control } = useFormContext();
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
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
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
    </>
  );
}

export default PersonalDetails;

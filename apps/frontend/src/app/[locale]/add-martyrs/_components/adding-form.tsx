"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RichTextEditor from "@/app/[locale]/add-martyrs/_components/rich-text-editor";
import { Timeline, Text } from "@mantine/core";
import LifeTimeline from "@/app/[locale]/add-martyrs/_components/life-timeline";

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
});

export function AddingForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      story: { type: "doc", content: [{ type: "paragraph" }] }, // Default empty TipTap JSON
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Section title={"Personal Details"}>
          <div className={"grid grid-cols-3 gap-4"}>
            <FormField
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div
                  className={"flex gap-2 items-center justify-between w-full"}
                >
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
                      <FormLabel className="font-normal sr-only">
                        Male
                      </FormLabel>
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
                      <FormLabel className="font-normal sr-only">
                        Female
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <div className={"grid grid-cols-2 gap-4 items-center"}>
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <div
                    className={"flex gap-2 items-center justify-between w-full"}
                  >
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
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className={"flex flex-col gap-2"}>
                  <div
                    className={"flex gap-2 items-center justify-between w-full"}
                  >
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
        </Section>

        <Section title={"Status"}>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div
                  className={"flex gap-2 items-center justify-between w-full"}
                >
                  <FormLabel> what is the current status? </FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-3 gap-4 w-full"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="alive" className={"w-full"}>
                          <div className={"flex items-center gap-4 w-full"}>
                            <p className={"text-lg font-medium "}>Alive</p>
                          </div>
                        </RadioGroupItem>
                      </FormControl>
                      <FormLabel className="font-normal sr-only">
                        Alive
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center">
                      <FormControl>
                        <RadioGroupItem value="dead" className={"w-full"}>
                          <div className={"flex items-center gap-4"}>
                            <p className={"text-lg font-medium "}>Dead</p>
                          </div>
                        </RadioGroupItem>
                      </FormControl>
                      <FormLabel className="font-normal sr-only">
                        Dead
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center">
                      <FormControl>
                        <RadioGroupItem value="wounded" className={"w-full"}>
                          <div className={"flex items-center gap-4"}>
                            <p className={"text-lg font-medium "}>Wounded</p>
                          </div>
                        </RadioGroupItem>
                      </FormControl>
                      <FormLabel className="font-normal sr-only">
                        Wounded
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          {form.watch("status") === "dead" && (
            <>
              <FormField
                control={form.control}
                name="dod"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 max-w-[240px]">
                    <div
                      className={
                        "flex gap-2 items-center justify-between w-full"
                      }
                    >
                      <FormLabel>Date of Death</FormLabel>
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
                control={form.control}
                name="cause"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <div
                      className={
                        "flex gap-2 items-center justify-between w-full"
                      }
                    >
                      <FormLabel> what is the cause of dead? </FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-4 gap-4 w-full"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="bomb" className={"w-full"}>
                              <div
                                className={
                                  "flex items-start gap-1 w-full flex-col"
                                }
                              >
                                <h4 className={"text-lg font-medium "}>Bomb</h4>
                                <p>
                                  <span
                                    className={
                                      "text-base text-muted-foreground"
                                    }
                                  >
                                    Explosive device
                                  </span>
                                </p>
                              </div>
                            </RadioGroupItem>
                          </FormControl>
                          <FormLabel className="font-normal sr-only">
                            Bomb
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center">
                          <FormControl>
                            <RadioGroupItem value="tank" className={"w-full"}>
                              <div
                                className={
                                  "flex items-start gap-1 w-full flex-col"
                                }
                              >
                                <h4 className={"text-lg font-medium "}>Tank</h4>
                                <p>
                                  <span
                                    className={
                                      "text-base text-muted-foreground"
                                    }
                                  >
                                    Military vehicle
                                  </span>
                                </p>
                              </div>
                            </RadioGroupItem>
                          </FormControl>
                          <FormLabel className="font-normal sr-only">
                            Tank
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center">
                          <FormControl>
                            <RadioGroupItem value="bullet" className={"w-full"}>
                              <div
                                className={
                                  "flex items-start gap-1 w-full flex-col"
                                }
                              >
                                <h4 className={"text-lg font-medium "}>
                                  Bullet
                                </h4>
                                <p>
                                  <span
                                    className={
                                      "text-base text-muted-foreground"
                                    }
                                  >
                                    Projectile
                                  </span>
                                </p>
                              </div>
                            </RadioGroupItem>
                          </FormControl>
                          <FormLabel className="font-normal sr-only">
                            Bullet
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center">
                          <FormControl>
                            <RadioGroupItem value="other" className={"w-full"}>
                              <div
                                className={
                                  "flex items-start gap-1 w-full flex-col"
                                }
                              >
                                <h4 className={"text-lg font-medium "}>
                                  Other
                                </h4>
                                <p>
                                  <span
                                    className={
                                      "text-base text-muted-foreground"
                                    }
                                  >
                                    Different cause
                                  </span>
                                </p>
                              </div>
                            </RadioGroupItem>
                          </FormControl>
                          <FormLabel className="font-normal sr-only">
                            Other
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          )}
        </Section>

        <Section title={"Story"}>
          <Tabs
            defaultValue="free"
            className="w-full items-center  flex flex-col justify-center"
          >
            <TabsList className={""}>
              <TabsTrigger value="free">Free Style</TabsTrigger>
              <TabsTrigger value="Guided">Guided Style</TabsTrigger>
            </TabsList>
            <TabsContent value="free" className={"w-full"}>
              <FormField
                control={form.control}
                name="story"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RichTextEditor
                        content={field.value}
                        onChange={field.onChange}
                        fontSize="small"
                        lineSpacing="loose"
                      />
                    </FormControl>
                    {/*<FormDescription>*/}
                    {/*    Write your story content here.*/}
                    {/*</FormDescription>*/}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            <TabsContent value="guided">Change your password here.</TabsContent>
          </Tabs>
        </Section>

        <Section title={"Timeline"}>
          <LifeTimeline />
        </Section>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={"space-y-4"}>
      <h2 className={"text-gray-800 text-xl font-medium"}>{title}</h2>
      <div className={"border rounded-xl p-4 space-y-6"}>{children}</div>
    </section>
  );
}

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import CustomDatePicker from "@/app/[locale]/add-martyrs/_components/date-picker";

function Status() {
  const { control, watch } = useFormContext();
  return (
    <>
      <FormField
        control={control}
        name="status"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <div className={"flex gap-2 items-center justify-between w-full"}>
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
                  <FormLabel className="font-normal sr-only">Alive</FormLabel>
                </FormItem>
                <FormItem className="flex items-center">
                  <FormControl>
                    <RadioGroupItem value="dead" className={"w-full"}>
                      <div className={"flex items-center gap-4"}>
                        <p className={"text-lg font-medium "}>Dead</p>
                      </div>
                    </RadioGroupItem>
                  </FormControl>
                  <FormLabel className="font-normal sr-only">Dead</FormLabel>
                </FormItem>
                <FormItem className="flex items-center">
                  <FormControl>
                    <RadioGroupItem value="wounded" className={"w-full"}>
                      <div className={"flex items-center gap-4"}>
                        <p className={"text-lg font-medium "}>Wounded</p>
                      </div>
                    </RadioGroupItem>
                  </FormControl>
                  <FormLabel className="font-normal sr-only">Wounded</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      {watch("status") === "dead" && (
        <>
          <FormField
            control={control}
            name="dod"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 max-w-[240px]">
                <div
                  className={"flex gap-2 items-center justify-between w-full"}
                >
                  <FormLabel>Date of Death</FormLabel>
                  <FormMessage />
                </div>
                <CustomDatePicker date={field.value} setDate={field.onChange} />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="cause"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div
                  className={"flex gap-2 items-center justify-between w-full"}
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
                            className={"flex items-start gap-1 w-full flex-col"}
                          >
                            <h4 className={"text-lg font-medium "}>Bomb</h4>
                            <p>
                              <span
                                className={"text-base text-muted-foreground"}
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
                            className={"flex items-start gap-1 w-full flex-col"}
                          >
                            <h4 className={"text-lg font-medium "}>Tank</h4>
                            <p>
                              <span
                                className={"text-base text-muted-foreground"}
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
                            className={"flex items-start gap-1 w-full flex-col"}
                          >
                            <h4 className={"text-lg font-medium "}>Bullet</h4>
                            <p>
                              <span
                                className={"text-base text-muted-foreground"}
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
                            className={"flex items-start gap-1 w-full flex-col"}
                          >
                            <h4 className={"text-lg font-medium "}>Other</h4>
                            <p>
                              <span
                                className={"text-base text-muted-foreground"}
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
    </>
  );
}

export default Status;

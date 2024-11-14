import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Bomb, CalendarIcon, Car, GuitarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useFormContext } from "react-hook-form";
import CustomDatePicker from "@/app/[locale]/add-martyrs/_components/date-picker";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Brush, Eraser, Scissors, SwatchBook } from "lucide-react";

const statusItems = [
  { id: "radio-11-r1", value: "wounded", label: "Wounded", Icon: SwatchBook },
  { id: "radio-11-r2", value: "dead", label: "Dead", Icon: Brush },
  { id: "radio-11-r3", value: "alive", label: "Alive", Icon: Eraser },
];

const causeItems = [
  { id: "radio-11-r1", value: "bomb", label: "Bomb", Icon: Bomb },
  { id: "radio-11-r2", value: "tank", label: "Tank", Icon: Car },
  { id: "radio-11-r3", value: "bullet", label: "Bullet", Icon: GuitarIcon },
  { id: "radio-11-r4", value: "other", label: "Other", Icon: Scissors },
];

function Status() {
  const { control, watch } = useFormContext();
  return (
    <section className="space-y-6">
      <FormField
        control={control}
        name="status"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <div className={"flex w-full items-center justify-between gap-2"}>
              <FormLabel> what is the current status? </FormLabel>
              <FormMessage />
            </div>
            <FormControl>
              <RadioGroup
                className="grid-cols-3"
                onValueChange={field.onChange}
                defaultValue={field.value}
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
                            className="opacity-60"
                            size={16}
                            strokeWidth={2}
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

      {watch("status") === "dead" && (
        <>
          <FormField
            control={control}
            name="dod"
            render={({ field }) => (
              <FormItem className="flex max-w-[240px] flex-col gap-2">
                <div
                  className={"flex w-full items-center justify-between gap-2"}
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
                  className={"flex w-full items-center justify-between gap-2"}
                >
                  <FormLabel> what is the cause of dead? </FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid w-full grid-cols-4 gap-4"
                  >
                    {causeItems.map((item) => (
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
                                className="opacity-60"
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                              />
                            </div>
                            <FormLabel htmlFor={item.id}>
                              {item.label}
                            </FormLabel>
                          </>
                        </FormControl>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </>
      )}
    </section>
  );
}

export default Status;

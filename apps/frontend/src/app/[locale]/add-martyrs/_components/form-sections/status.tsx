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
import { useCurrentLocale } from "@/utils/useCurrentLocale";
import translator from "../../_glossary/translator";

function Status() {
  const { control, watch } = useFormContext();
  const locale = useCurrentLocale();
  const t = translator(locale);

  const statusItems = [
    {
      id: "radio-11-r1",
      value: "wounded",
      label: t.wounded(),
      Icon: SwatchBook,
    },
    { id: "radio-11-r2", value: "dead", label: t.dead(), Icon: Brush },
    { id: "radio-11-r3", value: "alive", label: t.alive(), Icon: Eraser },
  ];

  const causeItems = [
    { id: "radio-11-r1", value: "bomb", label: t.bomb(), Icon: Bomb },
    { id: "radio-11-r2", value: "tank", label: t.tank(), Icon: Car },
    { id: "radio-11-r3", value: "bullet", label: t.bullet(), Icon: GuitarIcon },
    { id: "radio-11-r4", value: "other", label: t.other(), Icon: Scissors },
  ];

  return (
    <section className="space-y-6">
      <FormField
        control={control}
        name="status"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <div className={"flex w-full items-center justify-between gap-2"}>
              <FormLabel>{t.whatIsStatus()}</FormLabel>
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
                  <FormLabel>{t.dateOfDeath()}</FormLabel>
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
                  <FormLabel>{t.whatIsCause()}</FormLabel>
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

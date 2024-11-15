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
import { useFormContext } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import ChildSection from "@/app/[locale]/add-martyrs/_components/form-sections/child-section";
import CustomDatePicker from "@/app/[locale]/add-martyrs/_components/date-picker";
import { FemaleIcon, MaleIcon } from "@/components/icons";
import { useCurrentLocale } from "@/utils/useCurrentLocale";
import addMartyrTranslator from "../../_glossary/translator";

function PersonalDetails() {
  const { control, watch } = useFormContext();
  const locale = useCurrentLocale();
  const t = addMartyrTranslator(locale);

  const genderItems = [
    { id: "radio-11-r1", value: "male", label: t.male(), Icon: MaleIcon },
    { id: "radio-11-r2", value: "female", label: t.female(), Icon: FemaleIcon },
  ];

  return (
    <>
      <div className={"grid grid-cols-3 gap-4"}>
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.firstName()}</FormLabel>
              <FormControl>
                <Input placeholder={t.firstNamePlaceholder()} {...field} />
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
              <FormLabel>{t.middleName()}</FormLabel>
              <FormControl>
                <Input placeholder={t.middleNamePlaceholder()} {...field} />
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
              <FormLabel>{t.lastName()}</FormLabel>
              <FormControl>
                <Input placeholder={t.lastNamePlaceholder()} {...field} />
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
                {/* <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="male" className={"w-full"}>
                      <div className={"flex w-full items-center gap-4"}>
                        <Image
                          src={"/illustrations/male.svg"}
                          alt={"Male illustrator"}
                          width={64}
                          height={64}
                        />
                        <p className={"text-lg font-medium"}>Male</p>
                      </div>
                    </RadioGroupItem>
                  </FormControl>
                  <FormLabel className="sr-only font-normal">Male</FormLabel>
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
                        <p className={"text-lg font-medium"}>Female</p>
                      </div>
                    </RadioGroupItem>
                  </FormControl>
                  <FormLabel className="sr-only font-normal">Female</FormLabel>
                </FormItem> */}
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      <div className={"grid grid-cols-2 items-center gap-4"}>
        <FormField
          control={control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <div className={"flex w-full items-center justify-between gap-2"}>
                <FormLabel>{t.dateOfBirth()}</FormLabel>
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
              <div className={"flex w-full items-center justify-between gap-2"}>
                <FormLabel>{t.city()}</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder={t.cityPlaceholder()} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className={"flex flex-col gap-4 rounded-lg border p-4"}>
        <FormField
          control={control}
          name="married"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel className="text-base">{t.isMarried()}</FormLabel>
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
                        "flex w-full items-center justify-between gap-2"
                      }
                    >
                      <FormLabel>{t.spouseFirstName()}</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input
                        placeholder={t.spouseFirstNamePlaceholder()}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="spouseLastName"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <div
                      className={
                        "flex w-full items-center justify-between gap-2"
                      }
                    >
                      <FormLabel>{t.spouseFamilyName()}</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input
                        placeholder={t.spouseLastNamePlaceholder()}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className={"flex w-full flex-col items-center gap-4"}>
              <h4 className={"self-start font-medium text-gray-800"}>
                {t.haveChildren()}
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

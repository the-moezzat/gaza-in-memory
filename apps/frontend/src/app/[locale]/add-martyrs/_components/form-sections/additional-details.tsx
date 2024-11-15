import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TagInput from "@/app/[locale]/add-martyrs/_components/tag-input";
import interestsAndHobbies from "../../_data/interestsAndHobbies";
import { AddPersonFormValues } from "@/app/[locale]/add-martyrs/_hooks/useAddPersonForm";
import { useCurrentLocale } from "@/utils/useCurrentLocale";
import addMartyrTranslator from "../../_glossary/translator";

function AdditionalDetailsSection() {
  const { control } = useFormContext<AddPersonFormValues>();

  const locale = useCurrentLocale();
  const t = addMartyrTranslator(locale);

  const platforms = ["facebook", "twitter", "instagram", "linkedin"] as const;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr,auto,1fr]">
      <div className="space-y-2 self-stretch">
        <h3 className="text-lg font-medium">{t.socialMediaTitle()}</h3>
        {platforms.map((platform) => (
          <FormField
            key={platform}
            control={control}
            name={`socialMedia.${platform}` as any}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">
                  {t[
                    platform as
                      | "facebook"
                      | "twitter"
                      | "instagram"
                      | "linkedin"
                  ]()}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={`https://${platform}.com/username`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>

      <div className={"hidden h-5/6 w-0.5 self-center bg-gray-100 lg:block"} />

      <div className="space-y-2">
        <h3 className="text-lg font-medium">{t.interestsTitle()}</h3>
        <FormField
          control={control}
          name="interestsAndHobbies"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TagInput
                  categories={interestsAndHobbies}
                  placeholder={t.interestsPlaceholder()}
                  maxHeight="300px"
                  control={control}
                  name="interestsAndHobbies"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export default AdditionalDetailsSection;

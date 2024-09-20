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

function AdditionalDetailsSection() {
  const { control } = useFormContext<AddPersonFormValues>();

  return (
    <div className="grid grid-cols-[1fr,auto,1fr] gap-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Social Media Links</h3>
        {["facebook", "twitter", "instagram", "linkedin"].map((platform) => (
          <FormField
            key={platform}
            control={control}
            name={`socialMedia.${platform}` as any}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">{platform}</FormLabel>
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

      <div className={"h-full w-0.5 bg-gray-100"} />

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Interests and Hobbies</h3>
        <FormField
          control={control}
          name="interestsAndHobbies"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TagInput
                  categories={interestsAndHobbies}
                  placeholder="Type an interest or hobby..."
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

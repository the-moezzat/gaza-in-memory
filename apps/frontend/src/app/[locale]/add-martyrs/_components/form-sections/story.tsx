import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "@/app/[locale]/add-martyrs/_components/rich-text-editor";
import { useFormContext } from "react-hook-form";

const getNameReplacement = (firstName: string, gender: string) => {
  if (firstName) return firstName;
  if (gender === "male") return "him";
  if (gender === "female") return "her";
  return "this person";
};

const createDynamicQuestions = (nameReplacement: string) => [
  {
    id: "dream",
    question: `What was ${nameReplacement}'s biggest dream or aspiration in life?`,
  },
  {
    id: "typical_day",
    question: `Can you describe a typical day in ${nameReplacement}'s life before the conflict?`,
  },
  {
    id: "hobbies",
    question: `What were ${nameReplacement}'s favorite hobbies or activities?`,
  },
  {
    id: "contribution",
    question: `How did ${nameReplacement} contribute to their family or community?`,
  },
  {
    id: "anecdote",
    question: `Can you share a memorable moment or anecdote that captures ${nameReplacement}'s personality?`,
  },
  {
    id: "legacy",
    question: `What legacy or message do you think ${nameReplacement} would want to leave behind?`,
  },
  {
    id: "one_thing",
    question: `If you could tell the world one thing about ${nameReplacement}, what would it be?`,
  },
  {
    id: "passion",
    question: `Was there a particular cause or issue that ${nameReplacement} was passionate about? (Optional)`,
  },
  {
    id: "inspiration",
    question: `How did ${nameReplacement} inspire others in their community? (Optional)`,
  },
];

function Story() {
  const { control, watch, setValue } = useFormContext();
  const storyType = watch("storyType", "free");
  const firstName = watch("firstName", "");
  const gender = watch("gender", "");

  const nameReplacement = getNameReplacement(firstName, gender);
  const guidedQuestions = createDynamicQuestions(nameReplacement);

  return (
    <Tabs
      value={storyType}
      onValueChange={(value) => setValue("storyType", value)}
      className="flex w-full flex-col items-center justify-center"
    >
      <TabsList>
        <TabsTrigger value="free">Free Style</TabsTrigger>
        <TabsTrigger value="guided">Guided Style</TabsTrigger>
      </TabsList>
      <TabsContent value="free" className="w-full">
        <FormField
          control={control}
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
              <FormDescription>Write your story content here.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </TabsContent>
      <TabsContent value="guided" className="w-full space-y-4">
        {guidedQuestions.map((q, index) => (
          <FormField
            key={q.id}
            control={control}
            name={`guidedStory.${q.id}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{`${index + 1}. ${q.question}`}</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Your answer..."
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <FormField
          control={control}
          name="guidedStory.additional"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Any additional information you&apos;d like to share?
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Add any other details you think are important..."
                  className="min-h-[150px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TabsContent>
    </Tabs>
  );
}

export default Story;

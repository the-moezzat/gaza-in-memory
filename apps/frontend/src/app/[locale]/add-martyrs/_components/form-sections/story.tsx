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
import { useCurrentLocale } from "@/utils/useCurrentLocale";
import addMartyrTranslator from "../../_glossary/translator";

function Story() {
  const { control, watch, setValue } = useFormContext();
  const locale = useCurrentLocale();
  const t = addMartyrTranslator(locale);
  const storyType = watch("storyType", "free");
  const firstName = watch("firstName", "");
  const gender = watch("gender", "");

  const createDynamicQuestions = (nameReplacement: string) => [
    {
      id: "dream",
      question: t.questionDream({ name: nameReplacement }),
    },
    {
      id: "typical_day",
      question: t.questionTypicalDay({ name: nameReplacement }),
    },
    {
      id: "hobbies",
      question: t.questionHobbies({ name: nameReplacement }),
    },
    {
      id: "contribution",
      question: t.questionContribution({ name: nameReplacement }),
    },
    {
      id: "anecdote",
      question: t.questionAnecdote({ name: nameReplacement }),
    },
    {
      id: "legacy",
      question: t.questionLegacy({ name: nameReplacement }),
    },
    {
      id: "one_thing",
      question: t.questionOneThing({ name: nameReplacement }),
    },
    {
      id: "passion",
      question: `${t.questionPassion({ name: nameReplacement })} ${t.optional()}`,
    },
    {
      id: "inspiration",
      question: `${t.questionInspiration({ name: nameReplacement })} ${t.optional()}`,
    },
  ];

  const getNameReplacement = (firstName: string, gender: string) => {
    if (firstName) return firstName;
    if (gender === "male") return t.pronounHim();
    if (gender === "female") return t.pronounHer();
    return t.pronounPerson();
  };

  const nameReplacement = getNameReplacement(firstName, gender);
  const guidedQuestions = createDynamicQuestions(nameReplacement);

  return (
    <Tabs
      value={storyType}
      onValueChange={(value) => setValue("storyType", value)}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="flex w-full flex-col items-center justify-center"
    >
      <TabsList>
        <TabsTrigger value="free">{t.freeStyle()}</TabsTrigger>
        <TabsTrigger value="guided">{t.guidedStyle()}</TabsTrigger>
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
              <FormDescription>{t.writeStoryContent()}</FormDescription>
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
                    placeholder={t.yourAnswer()}
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
              <FormLabel>{t.additionalInfoQuestion()}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={t.additionalInfoPlaceholder()}
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

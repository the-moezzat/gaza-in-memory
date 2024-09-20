import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import RichTextEditor from "@/app/[locale]/add-martyrs/_components/rich-text-editor";
import { useFormContext } from "react-hook-form";

function Story() {
  const { control } = useFormContext();
  return (
    <>
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
    </>
  );
}

export default Story;

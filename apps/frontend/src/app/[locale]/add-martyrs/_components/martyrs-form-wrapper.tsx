"use client";

import { AddingForm } from "@/app/[locale]/add-martyrs/_components/adding-form";
import MartyrsImageUploader from "@/app/[locale]/add-martyrs/_components/martyrs-image-uploader";
import { FormProvider } from "react-hook-form";
import { useAddPersonForm } from "@/app/[locale]/add-martyrs/_hooks/useAddPersonForm";
import { Button } from "@/components/ui/button";

export default function MartyrsFormWrapper() {
  const { form, onSubmit } = useAddPersonForm();

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-[9fr,25fr] gap-4"
      >
        <div className="sticky top-4 self-start space-y-8">
          <MartyrsImageUploader />

          <div className={"flex gap-2 items-center"}>
            <Button
              type="submit"
              size={"lg"}
              variant={"default"}
              className={"w-full flex-grow"}
              disabled={!form.formState.isValid}
            >
              Add
            </Button>
            <Button
              type="button"
              size={"lg"}
              variant={"outline"}
              className={""}
            >
              Save as Draft
            </Button>
          </div>
        </div>

        <AddingForm />
      </form>
    </FormProvider>
  );
}

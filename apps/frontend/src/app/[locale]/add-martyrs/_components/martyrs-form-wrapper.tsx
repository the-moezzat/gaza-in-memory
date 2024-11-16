"use client";

import { AddingForm } from "@/app/[locale]/add-martyrs/_components/adding-form";
import MartyrsImageUploader from "@/app/[locale]/add-martyrs/_components/martyrs-image-uploader";
import { FormProvider } from "react-hook-form";
import { useAddPersonForm } from "@/app/[locale]/add-martyrs/_hooks/useAddPersonForm";
import { Button } from "@/components/ui/button";
import { useCurrentLocale } from "@/utils/useCurrentLocale";
import addMartyrTranslator from "../_glossary/translator";

export default function MartyrsFormWrapper() {
  const { form, onSubmit } = useAddPersonForm();
  const locale = useCurrentLocale();
  const t = addMartyrTranslator(locale);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4 md:grid-cols-[9fr,25fr]"
      >
        <div className="top-4 space-y-8 self-start md:sticky">
          <MartyrsImageUploader />

          <div
            className={
              "z-50 flex items-center gap-1 max-md:fixed max-md:bottom-4 max-md:left-4 max-md:right-4 max-md:rounded-xl max-md:bg-white max-md:p-4 max-md:shadow-md md:flex-col lg:flex-row"
            }
          >
            <Button
              type="submit"
              size={"lg"}
              variant={"default"}
              className={"group-round w-full flex-grow md:px-4 lg:px-8"}
              disabled={!form.formState.isValid}
            >
              {t.publish()}
            </Button>
            <Button
              type="button"
              size={"lg"}
              variant={"outline"}
              className={"group-round md:w-full md:px-4 lg:w-fit lg:px-8"}
            >
              {t.saveAsDraft()}
            </Button>
          </div>
        </div>

        <AddingForm />
      </form>
    </FormProvider>
  );
}

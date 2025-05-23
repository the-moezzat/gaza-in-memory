import { Martyr } from "@/app/[locale]/_types/Mayrter";
import { FemaleIcon, MaleIcon } from "@/components/icons";
import { createClerkSupabaseClientSsr } from "@/lib/client";
import { getCurrentLocale } from "@/utils/getLocaleServer";
import {
  CalendarIcon,
  CalendarX2,
  HeartHandshake,
  SquareUser,
  TriangleAlert,
} from "lucide-react";
import React from "react";
import inMemoryTranslator from "../_glossary/translator";
import { localizeDate } from "../_utils/localizeDates";

export default async function AdditionalInfoSection({
  martyr,
}: {
  martyr: Martyr;
}) {
  const {
    date_of_birth,
    date_of_death,
    married,
    spouse_first_name,
    spouse_last_name,
    status,
    cause_of_death,
  } = martyr;

  const locale = getCurrentLocale();
  const t = inMemoryTranslator(locale);

  const client = createClerkSupabaseClientSsr(false);

  const { data: children } = await client
    .from("children")
    .select("*")
    .eq("martyr_id", martyr.id);

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-2 items-center gap-x-10 gap-y-10 md:flex md:flex-wrap lg:gap-x-32">
        {date_of_birth && (
          <AdditionalInfoItem
            label={t.dob()}
            value={localizeDate(date_of_birth, locale)}
            icon={<CalendarIcon size={"1em"} />}
          />
        )}

        {status === "dead" && (
          <>
            {date_of_death && (
              <AdditionalInfoItem
                label={t.dod()}
                value={localizeDate(date_of_death, locale)}
                icon={<CalendarX2 size={"1em"} />}
              />
            )}

            {cause_of_death && (
              <AdditionalInfoItem
                label={t.causeOfDeath()}
                value={cause_of_death!}
                icon={<TriangleAlert size={"1em"} />}
              />
            )}
          </>
        )}

        {married && (
          <AdditionalInfoItem
            label={t.socialStatus()}
            value={married ? t.married() : t.single()}
            icon={<HeartHandshake size={"1em"} />}
          />
        )}

        {married && spouse_first_name && spouse_last_name && (
          <AdditionalInfoItem
            label={t.spouse()}
            value={`${spouse_first_name} ${spouse_last_name}`}
            icon={<SquareUser size={"1em"} />}
          />
        )}
      </div>

      {children?.length && (
        <div className="flex flex-col gap-4 md:gap-6">
          <h3 className="text-base font-semibold md:text-lg">{t.kids()}</h3>

          <div className="grid grid-cols-2 items-center gap-x-10 gap-y-10 md:flex md:flex-wrap lg:gap-x-32">
            {children.map((child) => (
              <AdditionalInfoItem
                key={child.id}
                label={`${child.age} ${t.yearsOld()}`}
                value={child.name}
                icon={
                  child.gender === "male" ? (
                    <>
                      <MaleIcon aria-label="Male child" />
                      <span className="sr-only">Male child</span>
                    </>
                  ) : (
                    <>
                      <FemaleIcon aria-label="Female child" />
                      <span className="sr-only">Female child</span>
                    </>
                  )
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AdditionalInfoItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[auto,1fr] grid-rows-2 items-start gap-x-2">
      <div className="row-span-2 text-xl text-gray-700 lg:text-2xl">{icon}</div>
      <p className="text-sm font-semibold text-gray-700 lg:text-base">
        {value}
      </p>
      <h4 className="text-sm text-muted-foreground lg:text-sm">{label}</h4>
    </div>
  );
}

import { Martyr } from "@/app/[locale]/_types/Mayrter";
import { FemaleIcon, MaleIcon } from "@/components/icons";
import { createClerkSupabaseClientSsr } from "@/lib/client";
import {
  CalendarIcon,
  CalendarX2,
  HeartHandshake,
  SquareUser,
  TriangleAlert,
} from "lucide-react";
import React from "react";

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

  const client = createClerkSupabaseClientSsr(false);

  const { data: children } = await client
    .from("children")
    .select("*")
    .eq("martyr_id", martyr.id);

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-2 items-center gap-x-10 gap-y-10 md:flex md:flex-wrap lg:gap-x-32">
        <AdditionalInfoItem
          label="Date of Birth"
          value={date_of_birth}
          icon={<CalendarIcon size={"1em"} />}
        />

        {status === "dead" && (
          <>
            <AdditionalInfoItem
              label="Date of Death"
              value={date_of_death!}
              icon={<CalendarX2 size={"1em"} />}
            />

            <AdditionalInfoItem
              label="Cause of Death"
              value={cause_of_death!}
              icon={<TriangleAlert size={"1em"} />}
            />
          </>
        )}

        <AdditionalInfoItem
          label="Social Status"
          value={married ? "Married" : "Single"}
          icon={<HeartHandshake size={"1em"} />}
        />

        {married && (
          <AdditionalInfoItem
            label="Spouse"
            value={`${spouse_first_name} ${spouse_last_name}`}
            icon={<SquareUser size={"1em"} />}
          />
        )}
      </div>

      {children?.length && (
        <div className="flex flex-col gap-4 md:gap-6">
          <h3 className="text-base font-semibold md:text-lg">Kids</h3>

          <div className="grid grid-cols-2 items-center gap-x-10 gap-y-10 md:flex md:flex-wrap lg:gap-x-32">
            {children.map((child) => (
              <AdditionalInfoItem
                key={child.id}
                label={`${child.age} years`}
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

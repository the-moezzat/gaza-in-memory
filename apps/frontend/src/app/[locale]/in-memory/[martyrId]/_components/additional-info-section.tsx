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
      <div className="flex flex-wrap gap-x-32 gap-y-10">
        <AdditionalInfoItem
          label="Date of Birth"
          value={date_of_birth}
          icon={<CalendarIcon />}
        />

        {status === "dead" && (
          <>
            <AdditionalInfoItem
              label="Date of Death"
              value={date_of_death!}
              icon={<CalendarX2 />}
            />

            <AdditionalInfoItem
              label="Cause of Death"
              value={cause_of_death!}
              icon={<TriangleAlert />}
            />
          </>
        )}

        <AdditionalInfoItem
          label="Social Status"
          value={married ? "Married" : "Single"}
          icon={<HeartHandshake />}
        />

        {married && (
          <AdditionalInfoItem
            label="Spouse"
            value={`${spouse_first_name} ${spouse_last_name}`}
            icon={<SquareUser />}
          />
        )}
      </div>

      {children?.length && (
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-semibold">Kids</h3>

          <div className="flex flex-wrap gap-x-32 gap-y-10">
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
      <div className="row-span-2 text-gray-700">{icon}</div>
      <p className="font-semibold text-gray-700">{value}</p>
      <h4 className="text-sm text-muted-foreground">{label}</h4>
    </div>
  );
}

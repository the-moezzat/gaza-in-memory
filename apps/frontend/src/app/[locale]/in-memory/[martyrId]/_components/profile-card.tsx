import { Martyr } from "@/app/[locale]/_types/Mayrter";
import { calculateAge } from "@/app/[locale]/_utils/calculateAge";
import { Separator } from "@/components/ui/separator";
import { BadgeCheck, Medal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { socialMediaIconsMapper } from "../_utils/socialMediaIconsMapper";
import { getCurrentLocale } from "@/utils/getLocaleServer";
import translator from "../_glossary/translator";
interface ProfileCardProps {
  martyr: Martyr;
}

export default function ProfileCard({ martyr }: ProfileCardProps) {
  const socialMediaPlatforms = Object.keys(martyr.social_media ?? {});
  const locale = getCurrentLocale();

  const t = translator(locale);

  return (
    <div
      dir="ltr"
      className="grid w-full grid-cols-[9fr,3fr] gap-4 rounded-2xl bg-white p-4 shadow-[0_0_10px_rgb(0,0,0,0.07)]"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-32 w-32 md:h-40 md:w-40">
          <Image
            src={martyr.profile_image_url!}
            alt={martyr.first_name}
            fill
            className="rounded-full object-cover"
          />
          <BadgeCheck
            size={32}
            fill="green"
            stroke="white"
            className="md:size-38 absolute bottom-0 right-0"
          />
        </div>
        <div className="flex flex-col items-center gap-1 md:gap-2">
          <p className="text-center text-lg font-bold text-gray-800 md:text-xl">
            {martyr.first_name} {martyr.middle_name} {martyr.last_name}
          </p>
          <div className="flex items-center gap-2 text-center text-base text-gray-600">
            <Medal size={16} />
            <span>Champion</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {socialMediaPlatforms.map((social) => (
            <Link
              href={
                martyr.social_media?.[
                  social as keyof typeof martyr.social_media
                ] ?? ""
              }
              key={social}
              className="text-gray-600"
            >
              {socialMediaIconsMapper(social, 18)}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col justify-between">
        <ProfileDataItem
          label={t.age()}
          value={calculateAge(martyr.date_of_birth)}
        />
        <Separator orientation="horizontal" />

        <ProfileDataItem label={t.city()} value={martyr.city} />
        <Separator orientation="horizontal" />

        <ProfileDataItem
          label={t.gender()}
          value={martyr.gender === "male" ? t.male() : t.female()}
        />
      </div>
    </div>
  );
}

interface ProfileDataItemProps {
  label: string;
  value: string | number;
}

function ProfileDataItem({ label, value }: ProfileDataItemProps) {
  return (
    <div className="flex flex-col">
      <span className="text-base font-bold text-gray-800 md:text-lg">
        {value}
      </span>
      <span className="text-sm font-medium text-gray-600 md:text-base">
        {label}
      </span>
    </div>
  );
}

import { Martyr } from "@/app/[locale]/_types/Mayrter";
import { calculateAge } from "@/app/[locale]/_utils/calculateAge";
import { Separator } from "@/components/ui/separator";
import { BadgeCheck, Medal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { socialMediaIconsMapper } from "../_utils/socialMediaIconsMapper";
interface ProfileCardProps {
  martyr: Martyr;
}

export default function ProfileCard({ martyr }: ProfileCardProps) {
  const socialMediaPlatforms = Object.keys(martyr.social_media ?? {});

  return (
    <div className="grid w-full grid-cols-[9fr,3fr] gap-4 rounded-2xl bg-white p-4 shadow-[0_0_10px_rgb(0,0,0,0.07)]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-40 w-40">
          <Image
            src={martyr.profile_image_url!}
            alt={martyr.first_name}
            fill
            className="rounded-full object-cover"
          />
          <BadgeCheck
            size={38}
            fill="green"
            stroke="white"
            className="absolute bottom-0 right-0"
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-center text-xl font-bold text-gray-800">
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
          label="Age"
          value={calculateAge(martyr.date_of_birth)}
        />
        <Separator />

        <ProfileDataItem label="City" value={martyr.city} />
        <Separator />

        <ProfileDataItem
          label="Gender"
          value={martyr.gender === "male" ? "Male" : "Female"}
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
      <span className="text-lg font-bold text-gray-800">{value}</span>
      <span className="text-base font-medium text-gray-600">{label}</span>
    </div>
  );
}

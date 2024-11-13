import Image from "next/image";
import Book from "@/components/book";
import { clerkClient } from "@clerk/nextjs/server";
import { CalendarClock, MapPin } from "lucide-react";
import Link from "next/link";
import { Martyr } from "../_types/Mayrter";
import { calculateAge } from "../_utils/calculateAge";
import LocaleLinkWrapper from "./locale-link-wrapper";
import { getCurrentLocale } from "@/utils/getLocaleServer";
import translator from "../_glossary/translator";
import { SupportedLocale } from "@/lib/supportedLanguages";
import BookCoverImage from "./book-cover-image";

type MartyrCardProps = {
  martyr: Martyr;
};

async function MartyrCard({ martyr }: MartyrCardProps) {
  const user = await clerkClient.users.getUser(martyr.creator_id);
  const locale = getCurrentLocale();
  const t = translator(locale);

  return (
    <LocaleLinkWrapper
      href={`/in-memory/${martyr.id}`}
      className="flex w-fit flex-col gap-2 rounded-xl bg-white"
    >
      <div className="group relative aspect-square h-48 overflow-hidden rounded-xl md:h-56 lg:h-64">
        <Image
          src={martyr.profile_image_url!}
          alt={`${martyr.first_name} ${martyr.last_name}`}
          className="object-cover"
          fill
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
          quality={100}
        />

        <div
          className={`absolute top-2 rounded-full bg-white/70 px-3 py-1 text-sm font-medium shadow-md backdrop-blur-lg ltr:left-2 rtl:right-2`}
        >
          <span className="bg-striped-gradient bg-clip-text text-transparent">
            {t.verified()}
          </span>
        </div>

        <div className="absolute bottom-3 left-3" dir="ltr">
          <BookCoverImage userImage={user.imageUrl} />
        </div>
      </div>

      <div>
        <p className="text-base font-medium text-gray-800 md:text-lg">
          {(
            martyr.first_name +
            " " +
            (martyr.middle_name ? martyr.middle_name + " " : "") +
            martyr.last_name
          ).length > 25
            ? (
                martyr.first_name +
                " " +
                (martyr.middle_name ? martyr.middle_name + " " : "") +
                martyr.last_name
              ).substring(0, 22) + "..."
            : martyr.first_name +
              " " +
              (martyr.middle_name ? martyr.middle_name + " " : "") +
              martyr.last_name}
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-xs text-gray-600 lg:text-sm">
            <MapPin className="h-4 w-4" />
            <span>{martyr.city}</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-600 lg:text-sm">
            <CalendarClock className="h-4 w-4" />
            <span>{calculateAge(martyr.date_of_birth)}yrs</span>
          </div>
        </div>
      </div>
    </LocaleLinkWrapper>
  );
}

export default MartyrCard;

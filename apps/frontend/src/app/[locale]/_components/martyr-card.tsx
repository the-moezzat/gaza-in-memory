import Image from "next/image";
import Book from "@/components/book";
import { clerkClient } from "@clerk/nextjs/server";
import { CalendarClock, MapPin } from "lucide-react";
import { differenceInYears, parseISO } from "date-fns";
import Link from "next/link";
import { getLocaleFromUrl } from "../_utils/getLocale";
import { Martyr } from "../_types/Mayrter";
import { calculateAge } from "../_utils/calculateAge";
import LocaleLinkWrapper from "./locale-link-wrapper";

type MartyrCardProps = {
  martyr: Martyr;
};

async function MartyrCard({ martyr }: MartyrCardProps) {
  const user = await clerkClient.users.getUser(martyr.creator_id);

  return (
    <LocaleLinkWrapper
      href={`/in-memory/${martyr.id}`}
      className="flex w-fit flex-col gap-2 rounded-xl bg-white"
    >
      <div className="group relative aspect-square h-64 overflow-hidden rounded-xl">
        <Image
          src={martyr.profile_image_url!}
          alt={`${martyr.first_name} ${martyr.last_name}`}
          className="object-cover"
          fill
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
          quality={100}
        />

        <div className="absolute left-2 top-2 rounded-full bg-white/70 px-3 py-1 text-sm font-medium shadow-md backdrop-blur-lg">
          <span className="bg-striped-gradient bg-clip-text text-transparent">
            Verified
          </span>
        </div>

        <div className="absolute bottom-3 left-3">
          <Book
            coverImage={user.imageUrl}
            width={60}
            height={68}
            depth={8}
            backgroundColor="#afafaf"
            spineColor="#333"
          />
        </div>
      </div>

      <div>
        <p className="text-lg font-medium text-gray-800">
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
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{martyr.city}</span>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-600">
            <CalendarClock className="h-4 w-4" />
            <span>{calculateAge(martyr.date_of_birth)}yrs</span>
          </div>
        </div>
      </div>
    </LocaleLinkWrapper>
  );
}

export default MartyrCard;

import { getCurrentLocale } from "@/utils/getLocaleServer";
import { clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import translator from "../_glossary/translator";

interface CreateorCardProps {
  creatorId: string;
}

export default async function CreateorCard({ creatorId }: CreateorCardProps) {
  const user = await clerkClient().users.getUser(creatorId);
  const locale = getCurrentLocale();
  const t = translator(locale);

  return (
    <div className="flex items-center gap-2">
      {/* <div className="relative h-10 w-10"> */}
      <Image
        src={user.imageUrl}
        alt={user.fullName ?? ""}
        // fill
        width={80}
        height={80}
        placeholder="blur"
        blurDataURL={
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
        }
        className="h-12 w-12 rounded-full object-cover"
      />
      {/* </div> */}

      <div>
        <p className="text-base text-gray-500">{t.creator()}</p>
        <p className="text-base font-semibold text-gray-700 underline">
          {user.fullName}
        </p>
      </div>
    </div>
  );
}

import React from "react";
import { clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import { format } from "date-fns";
import { Memory } from "../../_types/Memory";
import MemoryChainCarousel from "./memory-chain-carousel";
import { getCurrentLocale } from "@/utils/getLocaleServer";
import inMemoryTranslator from "../../_glossary/translator";
import { localizeDate } from "../../_utils/localizeDates";

interface TestimonialCardProps {
  memory: Memory;
}

export default async function TestimonialCard({
  memory,
}: TestimonialCardProps) {
  const user = await clerkClient().users.getUser(memory.author_id!);
  const locale = getCurrentLocale();
  const t = inMemoryTranslator(locale);

  return (
    <div className="grid w-full grid-cols-[auto,1fr] grid-rows-[auto,1fr] gap-x-4 gap-y-4 rounded-lg border p-4">
      <Image
        src={user.imageUrl}
        alt={user.fullName ?? ""}
        width={60}
        height={60}
        className="col-start-1 row-span-1 row-start-1 h-12 w-12 rounded-full object-cover"
      />
      <div className="">
        <p className="flex items-center gap-2 font-medium text-gray-800">
          {user.fullName}{" "}
          <span className="text-sm font-normal text-gray-500">
            ({t[memory.relationship as keyof typeof t]()})
          </span>
        </p>
        <p className="text-sm text-gray-500">
          {localizeDate(memory.created_at!, locale)}
        </p>
      </div>
      <div className="col-span-2 self-start justify-self-stretch">
        <MemoryChainCarousel memories={memory.content} />
      </div>
      {/* <p className="leading-relaxed text-gray-700">{memory.content}</p> */}
    </div>
  );
}

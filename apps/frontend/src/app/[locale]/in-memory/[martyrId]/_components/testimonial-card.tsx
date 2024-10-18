import React from "react";
import { Testimonial } from "../_types/Testimonial";
import { clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import { format } from "date-fns";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default async function TestimonialCard({
  testimonial,
}: TestimonialCardProps) {
  const user = await clerkClient().users.getUser(testimonial.author_id!);

  return (
    <div className="grid grid-cols-[auto,1fr] grid-rows-[auto,1fr] gap-x-4 gap-y-2 self-stretch justify-self-stretch rounded-lg border p-4">
      <Image
        src={user.imageUrl}
        alt={user.fullName ?? ""}
        width={60}
        height={60}
        className="col-start-1 row-span-2 row-start-1 h-12 w-12 rounded-full object-cover"
      />
      <div className="">
        <p className="font-medium text-gray-800">{user.fullName}</p>
        <p className="text-sm text-gray-500">
          {format(testimonial.created_at!, "dd MMM yyyy")}
        </p>
      </div>
      <p className="leading-relaxed text-gray-700">{testimonial.content}</p>
    </div>
  );
}

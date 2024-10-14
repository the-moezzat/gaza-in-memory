import { Martyr } from "@/app/[locale]/_types/Mayrter";
import { Check, Flag } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ConfirmationCardProps {
  martyr: Martyr;
}

export default function ConfirmationCard({ martyr }: ConfirmationCardProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-4 rounded-2xl border p-4">
        <h3 className="text-xl font-bold text-gray-800">
          {martyr.first_name}&apos;s Confirmed information
        </h3>

        <ul className="space-y-2">
          <li className="flex items-center gap-2 text-gray-600">
            <Check />
            <p>Identity</p>
          </li>
          <li className="flex items-center gap-2 text-gray-600">
            <Check />
            <p>Family Member</p>
          </li>
          <li className="flex items-center gap-2 text-gray-600">
            <Check />
            <p>Death Certificate</p>
          </li>
        </ul>

        <Link href="/" className="block text-sm text-gray-700 underline">
          Learn about confirmation process
        </Link>
      </div>

      <div className="flex items-center gap-2 text-gray-700">
        <Flag fill="currentColor" size={20} />
        <p className="text-base underline underline-offset-4">
          Report This Story
        </p>
      </div>
    </div>
  );
}

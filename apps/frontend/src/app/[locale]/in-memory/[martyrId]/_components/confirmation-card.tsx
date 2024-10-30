import { Martyr } from "@/app/[locale]/_types/Mayrter";
import { Check, ChevronRight, Flag } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface ConfirmationCardProps {
  martyr: Martyr;
}

export default function ConfirmationCard({ martyr }: ConfirmationCardProps) {
  return (
    <>
      <div className="hidden space-y-4 lg:block">
        <div className="space-y-4 rounded-2xl border p-4">
          <h3 className="text-lg font-bold text-gray-800 md:text-xl">
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

      <Drawer>
        <DrawerTrigger className="w-full">
          {" "}
          <div className="flex w-full items-center justify-between rounded-lg border p-4 lg:hidden">
            <h3 className="text-base font-bold text-gray-800 underline underline-offset-4 md:text-xl">
              Verified and confirmed Story
              {/* {martyr.first_name}&apos;s */}
            </h3>
            <span className="sr-only">learn more</span>
            <ChevronRight />
          </div>
        </DrawerTrigger>
        <DrawerContent className="px-">
          {/* <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader> */}
          <div className="m-4 space-y-4 rounded-2xl border p-4">
            <h3 className="text-lg font-bold text-gray-800 md:text-xl">
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

          <div className="mx-4 flex items-center gap-2 text-gray-700">
            <Flag fill="currentColor" size={20} />
            <p className="text-base underline underline-offset-4">
              Report This Story
            </p>
          </div>

          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline" className="w-full">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

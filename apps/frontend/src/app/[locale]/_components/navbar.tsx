"use client";
import React from "react";
import Link from "next/link";
import { Globe, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";

export const appTabs = [
  { name: "Home", relative: "", absoluteLink: "/" },
  {
    name: "Eye on Gaza",
    relative: "eye-on-gaza",
    absoluteLink: "/eye-on-gaza",
  },
  {
    name: "Sound of Gaza",
    relative: "sound-of-gaza",
    absoluteLink: "/sound-of-gaza",
  },
  { name: "Shop", relative: "shop", absoluteLink: "/shop" },
  {
    name: "Boycott and supporters ",
    relative: "boycott",
    absoluteLink: "/boycott",
  },
];

function Navbar({ locale }: { locale: string }) {
  const pathname = usePathname();

  pathname.split("/").at(1);

  const activeLink = appTabs.find(
    (tab) => tab.relative === pathname.split("/").at(1),
  );

  return (
    <nav className={"flex items-center justify-between border-b px-6 py-3 "}>
      <Image
        src={"/logo/logo.svg"}
        width={80}
        height={40}
        alt={"Palestine Logo"}
        className={"h-10"}
      />

      <ul className={"flex item-center gap-8"}>
        {appTabs.map((link) => (
          <li key={link.name}>
            <Link
              href={`/${locale}${link.absoluteLink}`}
              className={cn({
                "text-gray-900 font-medium": activeLink?.name === link.name,
                "text-gray-500": activeLink?.name !== link.name,
              })}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className={"text-gray-800 flex items-center gap-4"}>
        <Button variant={"ghost"} size={"icon"}>
          <Globe size={18} />
        </Button>

        <Button
          variant={"outline"}
          size={"sm"}
          className={"flex items-center gap-2"}
        >
          <Plus />
          <span>Add person</span>
        </Button>

<SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        {/* <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar> */}
      </div>
    </nav>
  );
}

export default Navbar;

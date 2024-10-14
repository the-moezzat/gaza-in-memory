"use client";
import React from "react";
import Link from "next/link";
import { Globe, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import path from "path";

export const appTabs = [
  { name: "Home", relative: "home", absoluteLink: "/" },
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

  const activeLink = appTabs.find(
    (tab) =>
      tab.relative ===
      (pathname.split("/").at(2) ? pathname.split("/").at(2) : "home"),
  );

  return (
    <nav className={"flex items-center justify-between border-b px-6 py-3"}>
      <Link href={"/"}>
        <Image
          src={"/logo/logo.svg"}
          width={80}
          height={40}
          alt={"Palestine Logo"}
          className={"h-10"}
        />
      </Link>

      <ul className={"item-center flex gap-8"}>
        {appTabs.map((link) => (
          <li key={link.name}>
            <Link
              href={`/${locale}${link.absoluteLink}`}
              className={cn({
                "font-medium text-gray-900": activeLink?.name === link.name,
                "text-gray-500": activeLink?.name !== link.name,
              })}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className={"flex items-center gap-4 text-gray-800"}>
        <Button variant={"ghost"} size={"icon"}>
          <Globe size={18} />
        </Button>

        <SignedOut>
          <SignInButton mode={"modal"}>
            <Button
              variant={"outline"}
              size={"sm"}
              className={"flex items-center gap-2"}
            >
              <Plus />
              <span>Add person</span>
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Link href={`/${locale}/add-martyrs`}>
            <Button
              variant={"outline"}
              size={"sm"}
              className={"flex items-center gap-2"}
            >
              <Plus />
              <span>Add a Person</span>
            </Button>
          </Link>

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

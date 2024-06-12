'use client'
import useActiveTab from "@/hooks/useActiveTab";
import Logo from "@/components/logo";
import {appTabs} from "@/utils/appTabs";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Globe, Plus} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import classNames from "classnames";


function Navbar() {
  const activeLink = useActiveTab()!;

  return (
    <nav className={"flex items-center justify-between border-b px-6 py-3 "}>
      <Logo />

      <ul className={"flex item-center gap-8"}>
        {appTabs.map((link) => (
          <li key={link.name}>
            <Link
              href={link.absoluteLink}
              className={classNames({
                "text-gray-900 font-medium": activeLink.name === link.name,
                "text-gray-500": activeLink.name !== link.name,
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

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}

export default Navbar;

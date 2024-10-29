"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Globe, Plus, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import LanguageSwitcher from "./language-switcher/language-switcher";
import translator from "../_glossary/translator";
import { type SupportedLocale } from "@/lib/supportedLanguages";

function Navbar({ locale }: { locale: SupportedLocale }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  console.log(locale);

  const t = translator(locale);

  const appTabs = [
    { name: t.home(), relative: "home", absoluteLink: "/" },
    {
      name: t.eyeOnGaza(),
      relative: "eye-on-gaza",
      absoluteLink: "/eye-on-gaza",
    },
    {
      name: t.soundOfGaza(),
      relative: "sound-of-gaza",
      absoluteLink: "/sound-of-gaza",
    },
    { name: t.shop(), relative: "shop", absoluteLink: "/shop" },
    {
      name: t.boycott(),
      relative: "boycott",
      absoluteLink: "/boycott",
    },
  ];

  const activeLink = appTabs.find(
    (tab) =>
      tab.relative ===
      (pathname.split("/").at(2) ? pathname.split("/").at(2) : "home"),
  );

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="relative border-b px-4 py-3 lg:px-6">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href={"/"}>
          <Image
            src={"/logo/logo.svg"}
            width={80}
            height={40}
            alt={"Palestine Logo"}
            className="h-10"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex lg:items-center lg:gap-8">
          {appTabs.map((link) => (
            <li key={link.name}>
              <Link
                href={`/${locale}${link.absoluteLink}`}
                className={cn({
                  "font-medium text-gray-900": activeLink?.name === link.name,
                  "text-gray-500 hover:text-gray-700":
                    activeLink?.name !== link.name,
                })}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 text-gray-800 lg:flex">
          <LanguageSwitcher />

          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                <span>Add person</span>
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link href={`/${locale}/add-martyrs`}>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                <span>Add a Person</span>
              </Button>
            </Link>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile/Tablet Actions */}
        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher />

          <SignedIn>
            <Link href={`/${locale}/add-martyrs`}>
              <Button
                variant="outline"
                size="sm"
                className="hidden items-center gap-2 sm:flex"
              >
                <Plus size={16} />
                <span>Add a Person</span>
              </Button>
            </Link>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="outline"
                size="sm"
                className="hidden items-center gap-2 sm:flex"
              >
                <Plus size={16} />
                <span>Add person</span>
              </Button>
            </SignInButton>
          </SignedOut>

          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile/Tablet Menu */}
      {isMenuOpen && (
        <div className="absolute left-0 top-full z-50 w-full bg-white px-4 py-4 shadow-lg lg:hidden">
          <ul className="space-y-4">
            {appTabs.map((link) => (
              <li key={link.name}>
                <Link
                  href={`/${locale}${link.absoluteLink}`}
                  className={cn({
                    "font-medium text-gray-900": activeLink?.name === link.name,
                    "text-gray-500 hover:text-gray-700":
                      activeLink?.name !== link.name,
                  })}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {/* Only show Add Person button in mobile view (not tablet) */}
            <li className="pt-4 sm:hidden">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex w-full items-center justify-center gap-2"
                  >
                    <Plus size={16} />
                    <span>Add person</span>
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link href={`/${locale}/add-martyrs`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex w-full items-center justify-center gap-2"
                  >
                    <Plus size={16} />
                    <span>Add a Person</span>
                  </Button>
                </Link>
              </SignedIn>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

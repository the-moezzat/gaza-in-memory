"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Globe, Plus, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import LanguageSwitcher from "./language-switcher/language-switcher";
import translator from "../_glossary/translator";
import type { SupportedLocale } from "@/lib/supportedLanguages";

function Navbar({ locale }: { locale: SupportedLocale }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const t = translator(locale);

  const appTabs = useMemo(
    () => [
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
    ],
    [t],
  );

  const activeLink = appTabs.find(
    (tab) =>
      tab.relative ===
      (pathname.split("/").at(2) ? pathname.split("/").at(2) : "home"),
  );

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="relative border-b px-2 py-2 lg:px-6 lg:py-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href={"/"}>
          <Image
            src={"/logo/logo.svg"}
            width={80}
            height={40}
            alt={"Palestine Logo"}
            className="h-8 lg:h-10"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex lg:items-center lg:gap-8">
          {appTabs.map((link) => (
            <li key={link.name}>
              <Link
                href={`/${locale}${link.absoluteLink}`}
                className={cn("relative", {
                  "font-medium text-gray-900": activeLink?.name === link.name,
                  "text-gray-500 hover:text-gray-700":
                    activeLink?.name !== link.name,
                  "after:absolute after:-bottom-2 after:left-1/2 after:h-0.5 after:w-4 after:-translate-x-1/2 after:bg-gray-900 after:content-['']":
                    activeLink?.name === link.name,
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
                <span>{t.addPerson()}</span>
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
                <span>{t.addPerson()}</span>
              </Button>
            </Link>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile/Tablet Actions */}
        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher />

          <SignedIn>
            <Button
              variant="outline"
              size="sm"
              className="hidden items-center gap-2 sm:flex"
              asChild
            >
              <Link href={`/${locale}/add-martyrs`}>
                <Plus size={16} />
                <span>{t.addPerson()}</span>
              </Link>
            </Button>
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
                <span>{t.addPerson()}</span>
              </Button>
            </SignInButton>
          </SignedOut>

          <Button
            className="group"
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg
              className="pointer-events-none"
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12L20 12"
                className="origin-center -translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
              />
              <path
                d="M4 12H20"
                className="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
              />
              <path
                d="M4 12H20"
                className="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
              />
            </svg>
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
                    <span>{t.addPerson()}</span>
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex w-full items-center justify-center gap-2"
                  asChild
                >
                  <Link href={`/${locale}/add-martyrs`}>
                    <Plus size={16} />
                    <span>{t.addPerson()}</span>
                  </Link>
                </Button>
              </SignedIn>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

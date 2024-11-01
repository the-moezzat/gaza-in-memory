import { headers } from "next/headers";
import { defaultLocale, type SupportedLocale } from "@/lib/supportedLanguages";

type Locale = SupportedLocale;

export const getCurrentLocale = (): Locale => {
  const headersList = headers();
  return (headersList.get("x-language") as Locale) || defaultLocale;
};

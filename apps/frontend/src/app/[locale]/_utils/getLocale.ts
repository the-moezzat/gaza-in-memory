// lib/getLocaleFromUrl.ts
import { headers } from "next/headers";
import { defaultLocale } from "@/lib/supportedLanguages";

export function getLocaleFromUrl(): string {
  try {
    // Get the header list
    const headersList = headers();

    // Get the URL directly from the referer header
    const fullUrl = headersList.get("referer") || "";
    console.log("Full URL:", fullUrl); // For debugging

    // Extract pathname from the URL
    const pathname = new URL(fullUrl).pathname;
    console.log("Pathname:", pathname); // For debugging

    // Get the first segment as locale
    const locale = pathname.split("/").filter(Boolean)[0];
    console.log("Detected locale:", locale); // For debugging

    return locale || defaultLocale;
  } catch (error) {
    console.error("Error getting locale from URL:", error);
    return defaultLocale;
  }
}

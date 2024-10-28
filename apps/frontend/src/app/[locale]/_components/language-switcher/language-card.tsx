"use client";

import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";

interface LanguageCardProps {
  language: string;
  locale: string;
}

export default function LanguageCard({ language, locale }: LanguageCardProps) {
  const router = useRouter();
  const { locale: currentLocale } = useParams();
  const isActive = locale === currentLocale;

  const handleLanguageChange = () => {
    // Get the current URL
    const currentPath = window.location.pathname;
    // Replace the current locale with the new one
    const paths = currentPath.split("/").filter((path) => path !== "");

    let newPath;
    if (paths.length === 1) {
      newPath = currentPath.replace(`/${currentLocale}`, `/${locale}`);
    } else {
      newPath = currentPath.replace(`/${currentLocale}/`, `/${locale}/`);
    }

    // Navigate to the new URL
    router.replace(newPath);
    // Refresh the page to ensure all server components are updated
    router.refresh();
  };

  return (
    <div
      onClick={handleLanguageChange}
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-lg p-4 transition-all hover:bg-gray-100",
        isActive && "border border-gray-800",
      )}
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleLanguageChange();
        }
      }}
    >
      {language}
    </div>
  );
}

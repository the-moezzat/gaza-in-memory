"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import translator from "../../_glossary/translator";
import { SupportedLocale } from "@/lib/supportedLanguages";

interface LanguageCardProps {
  language: string;
  locale: string;
  enabled: boolean;
}

export default function LanguageCard({
  language,
  locale,
  enabled,
}: LanguageCardProps) {
  const router = useRouter();
  const { locale: currentLocale } = useParams();
  const isActive = locale === currentLocale;
  const t = translator(currentLocale as SupportedLocale);

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
    <Button
      variant={"ghost"}
      size={"lg"}
      onClick={handleLanguageChange}
      className={cn(
        "flex h-fit cursor-pointer flex-col items-start justify-start rounded-lg p-4 text-base font-normal transition-all",
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
      disabled={!enabled}
    >
      {language}
      {!enabled && (
        <span className="text-xs text-gray-500">{t.comingSoon()}</span>
      )}
    </Button>
  );
}

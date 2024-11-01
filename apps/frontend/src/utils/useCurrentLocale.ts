import { SupportedLocale } from "@/lib/supportedLanguages";
import { useParams } from "next/navigation";

export function useCurrentLocale() {
  const { locale }: { locale: SupportedLocale } = useParams();
  return locale;
}

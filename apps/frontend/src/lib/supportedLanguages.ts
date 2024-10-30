export const defaultLocale = "en"; // Default language for your site
export type SupportedLocale =
  | "en"
  | "de"
  | "fr"
  | "es"
  | "ar"
  | "he"
  | "it"
  | "ja"
  | "ko"
  | "nl"
  | "pl"
  | "pt"
  | "ru"
  | "zh";

export const supportedLocale: SupportedLocale[] = [
  "en",
  "de",
  "fr",
  "es",
  "ar",
  "he",
  "it",
  "ja",
  "ko",
  "nl",
  "pl",
  "pt",
  "ru",
  "zh",
];

export const languageNames: Record<SupportedLocale, string> = {
  en: "English",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  ar: "العربية",
  he: "עברית",
  it: "Italiano",
  ja: "日本語",
  ko: "한국어",
  nl: "Nederlands",
  pl: "Polski",
  pt: "Português",
  ru: "Русский",
  zh: "中文",
};

export const enabledLanguages: SupportedLocale[] = ["en", "ar"];

import {
  createUktiTranslator,
  UktiDefinition,
  UktiTranslation,
  UktiTranslationData,
  type UktiTranslations,
} from "ukti";
import { type SupportedLocale, defaultLocale } from "@/lib/supportedLanguages";

export const createTranslator = <T extends UktiDefinition>(
  translations: UktiTranslations<T, SupportedLocale, typeof defaultLocale>,
): ReturnType<
  typeof createUktiTranslator<T, SupportedLocale, typeof defaultLocale>
> =>
  createUktiTranslator<T, SupportedLocale, typeof defaultLocale>({
    translations,
  });

export const createTranslation = <T extends UktiDefinition>(
  glossary: UktiTranslationData<T>,
): UktiTranslation<T> => ({
  ...glossary,
});

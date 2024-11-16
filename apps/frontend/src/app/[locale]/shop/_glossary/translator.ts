// turbo/generators/templates/translator.hbs
import { Definition } from "./Definition";
import { createTranslator } from "@/utils/uktiUtils";
import { translations_EN } from "./languages/en";
import { translations_DE } from "./languages/de";
import { translations_FR } from "./languages/fr";
import { translations_ES } from "./languages/es";
import { translations_AR } from "./languages/ar";
import { translations_HE } from "./languages/he";
import { translations_IT } from "./languages/it";
import { translations_JA } from "./languages/ja";
import { translations_KO } from "./languages/ko";
import { translations_NL } from "./languages/nl";
import { translations_PL } from "./languages/pl";
import { translations_PT } from "./languages/pt";
import { translations_RU } from "./languages/ru";
import { translations_ZH } from "./languages/zh";

const shopTranslator = createTranslator<Definition>({
  en: translations_EN,
  de: translations_DE,
  fr: translations_FR,
  es: translations_ES,
  ar: translations_AR,
  he: translations_HE,
  it: translations_IT,
  ja: translations_JA,
  ko: translations_KO,
  nl: translations_NL,
  pl: translations_PL,
  pt: translations_PT,
  ru: translations_RU,
  zh: translations_ZH,
});

export default shopTranslator;

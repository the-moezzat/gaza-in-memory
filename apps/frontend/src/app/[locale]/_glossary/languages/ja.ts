// templates/language.hbs
import { createTranslation } from "@/utils/uktiUtils";
import type { Definition } from "../Definition";

export const translations_JA = createTranslation<Definition>({
  home: "home_ja",
  about: "about_ja",
  glossary: "glossary_ja",
  inMemory: "inMemory_ja",
  eyeOnGaza: "eyeOnGaza_ja",
  soundOfGaza: "soundOfGaza_ja",
  shop: "shop_ja",
  boycott: "boycott_ja"
});
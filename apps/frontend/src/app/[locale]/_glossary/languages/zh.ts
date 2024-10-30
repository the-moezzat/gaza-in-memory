// templates/language.hbs
import { createTranslation } from "@/utils/uktiUtils";
import type { Definition } from "../Definition";

export const translations_ZH = createTranslation<Definition>({
  home: "home_zh",
  about: "about_zh",
  glossary: "glossary_zh",
  inMemory: "inMemory_zh",
  eyeOnGaza: "eyeOnGaza_zh",
  soundOfGaza: "soundOfGaza_zh",
  shop: "shop_zh",
  boycott: "boycott_zh"
});
// templates/language.hbs
import { createTranslation } from "@/utils/uktiUtils";
import type { Definition } from "../Definition";

export const translations_KO = createTranslation<Definition>({
  home: "home_ko",
  about: "about_ko",
  glossary: "glossary_ko",
  inMemory: "inMemory_ko",
  eyeOnGaza: "eyeOnGaza_ko",
  soundOfGaza: "soundOfGaza_ko",
  shop: "shop_ko",
  boycott: "boycott_ko"
});
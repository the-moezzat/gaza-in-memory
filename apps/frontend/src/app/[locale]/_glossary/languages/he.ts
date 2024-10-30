// templates/language.hbs
import { createTranslation } from "@/utils/uktiUtils";
import type { Definition } from "../Definition";

export const translations_HE = createTranslation<Definition>({
  home: "home_he",
  about: "about_he",
  glossary: "glossary_he",
  inMemory: "inMemory_he",
  eyeOnGaza: "eyeOnGaza_he",
  soundOfGaza: "soundOfGaza_he",
  shop: "shop_he",
  boycott: "boycott_he"
});
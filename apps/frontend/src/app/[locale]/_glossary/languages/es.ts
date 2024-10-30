// templates/language.hbs
import { createTranslation } from "@/utils/uktiUtils";
import type { Definition } from "../Definition";

export const translations_ES = createTranslation<Definition>({
  home: "home",
  about: "about",
  glossary: "glossary",
  inMemory: "inMemory",
  eyeOnGaza: "eyeOnGaza",
  soundOfGaza: "soundOfGaza",
  shop: "shop",
  boycott: "boycott"
});
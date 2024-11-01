// templates/language.hbs
import { createTranslation } from "@/utils/uktiUtils";
import type { Definition } from "../Definition";

export const translations_FR = createTranslation<Definition>({
  home: "home",
  about: "about",
  glossary: "glossary",
  inMemory: "inMemory",
  eyeOnGaza: "eyeOnGaza",
  soundOfGaza: "soundOfGaza",
  shop: "shop",
  boycott: "boycott",
  latestMartyrs: "latestMartyrs",
  notJustNumbers: "notJustNumbers",
  storiesUnfinished: "storiesUnfinished",
  addPerson: "addPerson",
  name: "name",
  age: "age",
  gender: "gender",
  status: "status",
  verified: "verified",
  addAge: "addAge",
  addGender: "addGender",
  addStatus: "addStatus",
  yrs: "yrs",
  chooseLanguage: "chooseLanguage",
  recommendedLanguages: "recommendedLanguages",
  supportedLanguages: "supportedLanguages",
  comingSoon: "comingSoon"
});
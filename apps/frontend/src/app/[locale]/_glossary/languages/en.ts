// templates/language.hbs
import { createTranslation } from "@/utils/uktiUtils";
import type { Definition } from "../Definition";

export const translations_EN = createTranslation<Definition>({
  home: "Home",
  about: "About",
  glossary: "Glossary",
  inMemory: "In Memory",
  eyeOnGaza: "Eye on Gaza",
  soundOfGaza: "Sound of Gaza",
  shop: "Shop",
  boycott: "Boycott and Support",
  latestMartyrs: "Latest Martyrs",
  notJustNumbers: "Not Just a Numbers",
  storiesUnfinished: "They Are Stories Unfinished",
  addPerson: "Add Person",
  name: "Name",
  age: "Age",
  gender: "Gender",
  status: "Status",
  verified: "Verified",
  addAge: "Add Age",
  addGender: "Add Gender",
  addStatus: "Add Status",
  yrs: "yrs",
  chooseLanguage: "Choose Language",
  recommendedLanguages: "Recommended Languages",
  supportedLanguages: "Supported Languages",
  comingSoon: "Coming Soon",
});

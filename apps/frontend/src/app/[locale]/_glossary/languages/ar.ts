// templates/language.hbs
import { createTranslation } from "@/utils/uktiUtils";
import type { Definition } from "../Definition";

export const translations_AR = createTranslation<Definition>({
  home: "الرئيسية",
  about: "عن المشروع",
  glossary: "القاموس",
  inMemory: "في الذاكرة",
  eyeOnGaza: "عين على غزة",
  soundOfGaza: "صوت غزة",
  shop: "المتجر",
  boycott: "المقاطعه والدعم",
  latestMartyrs: "أحدث الشهداء",
  notJustNumbers: "ليسوا مجرد أرقام",
  storiesUnfinished: "بل هي حكايات غير منتهية",
  addPerson: "أضف شخص",
  name: "الاسم",
  age: "العمر",
  gender: "النوع",
  status: "الحالة",
  verified: "موثق",
  addAge: "أضف العمر",
  addGender: "أختر النوع",
  addStatus: "أضف الحالة",
  yrs: "سنوات",
  chooseLanguage: "أختر اللغة",
  recommendedLanguages: "اللغات المقترحة",
  supportedLanguages: "اللغات المدعومة",
  comingSoon: "قريبا",
});

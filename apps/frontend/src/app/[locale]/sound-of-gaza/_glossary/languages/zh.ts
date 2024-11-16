// templates/language.hbs
import { createTranslation } from "@/utils/uktiUtils";
import type { Definition } from "../Definition";

export const translations_ZH = createTranslation<Definition>({
  soundOfGaza: "soundOfGaza",
  aboutTitle: "aboutTitle",
  aboutDescription: "aboutDescription",
  followUs: "followUs",
  comingSoonBadge: "comingSoonBadge_zh",
  comingSoonTitle: "comingSoonTitle",
  comingSoonDescription: "comingSoonDescription",
  feature1: "feature1",
  feature2: "feature2",
  feature3: "feature3",
  feature4: "feature4",
  feature5: "feature5",
  feature6: "feature6",
  feature7: "feature7",
  feature8: "feature8",
  expectTitle: "expectTitle",
  expectDescription: "expectDescription"
});
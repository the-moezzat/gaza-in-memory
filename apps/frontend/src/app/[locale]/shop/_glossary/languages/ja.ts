// templates/language.hbs
import { createTranslation } from "@/utils/uktiUtils";
import type { Definition } from "../Definition";

export const translations_JA = createTranslation<Definition>({
  shop: "shop",
  aboutTitle: "aboutTitle_ja",
  aboutDescription: "aboutDescription_ja",
  followUs: "followUs_ja",
  comingSoonBadge: "comingSoonBadge_ja",
  comingSoonTitle: "comingSoonTitle_ja",
  comingSoonDescription: "comingSoonDescription_ja",
  feature1: "feature1_ja",
  feature2: "feature2_ja",
  feature3: "feature3_ja",
  feature4: "feature4_ja",
  feature5: "feature5_ja",
  feature6: "feature6_ja",
  feature7: "feature7_ja",
  feature8: "feature8_ja",
  expectTitle: "expectTitle_ja",
  expectDescription: "expectDescription_ja"
});
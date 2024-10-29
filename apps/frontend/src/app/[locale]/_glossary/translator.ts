import { translations_AR } from "./languages/ar";
import { Definition } from "./definition";
import { translations_EN } from "./languages/en";
import { createTranslator } from "@/utils/uktiUtils";

const translator = createTranslator<Definition>({
  ar: translations_AR,
  en: translations_EN,
});

export default translator;

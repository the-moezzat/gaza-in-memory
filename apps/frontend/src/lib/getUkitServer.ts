import { headers } from "next/headers";
import { supportedLocales } from "./supportedLanguages";
export function getUktiTranslatorServer() {
  const headersList = headers();
  const referer = headersList.get("referer");

  const lang = referer ? referer.split("/")[4] : "en";

  //   return translator(lang as (typeof supportedLocales)[number]);
}

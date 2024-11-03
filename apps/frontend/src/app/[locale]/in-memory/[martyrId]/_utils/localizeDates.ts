import { format } from "date-fns";
import { arSA, enUS } from "date-fns/locale";

export const localizeDate = (date: string, locale: string) => {
  const eventDate = new Date(date);
  return format(eventDate, "dd MMMM yyyy", {
    locale: locale === "ar" ? arSA : enUS,
  });
};

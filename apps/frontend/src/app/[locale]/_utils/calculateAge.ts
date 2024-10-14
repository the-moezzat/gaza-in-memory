import { differenceInYears, parseISO } from "date-fns";

export function calculateAge(dateOfBirth: string): number {
  return differenceInYears(new Date(), parseISO(dateOfBirth));
}

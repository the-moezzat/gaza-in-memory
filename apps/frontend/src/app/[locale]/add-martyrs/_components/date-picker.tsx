"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";
import { useCurrentLocale } from "@/utils/useCurrentLocale";
import translator from "../_glossary/translator";

interface CustomDatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  className?: string;
}

export default function CustomDatePicker({
  date,
  setDate,
  className,
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(
    date ? date.getFullYear() : new Date().getFullYear(),
  );
  const [selectedMonth, setSelectedMonth] = useState(
    date ? date.getMonth() : new Date().getMonth(),
  );
  const locale = useCurrentLocale();
  const t = translator(locale);

  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i,
  );
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ] as const;

  const handleYearChange = (year: string) => {
    const newYear = parseInt(year);
    setSelectedYear(newYear);
    setDate(new Date(newYear, selectedMonth, 1));
  };

  const handleMonthChange = (month: string) => {
    const newMonth = months.indexOf(month as (typeof months)[number]);
    setSelectedMonth(newMonth);
    setDate(new Date(selectedYear, newMonth, 1));
  };

  const formattedDate = new Intl.DateTimeFormat(locale, {
    dateStyle: "full",
  }).format(date);

  return (
    <FormControl>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              className,
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? formattedDate : <span>{t.pickDate()}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex items-center justify-between gap-2 p-3">
            <Select
              onValueChange={handleYearChange}
              value={selectedYear.toString()}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={handleMonthChange}
              value={months[selectedMonth]}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {t[
                      month.toLowerCase() as
                        | "january"
                        | "february"
                        | "march"
                        | "april"
                        | "may"
                        | "june"
                        | "july"
                        | "august"
                        | "september"
                        | "october"
                        | "november"
                        | "december"
                    ]()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate);
              setIsOpen(false);
            }}
            month={new Date(selectedYear, selectedMonth)}
            onMonthChange={(newMonth) => {
              setSelectedMonth(newMonth.getMonth());
              setSelectedYear(newMonth.getFullYear());
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </FormControl>
  );
}

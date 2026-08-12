// schedule/components/ConsultationCalendar.tsx

import { DayPicker, getDefaultClassNames } from "@daypicker/react";
import { ko } from "@daypicker/react/locale";

import type { AvailableConsultationDate } from "@/types/consultationReservation.type";
import { parseCalendarDate } from "@/utils/dateTime";

interface ConsultationCalendarProps {
  startMonth: Date;
  month: Date;
  selected?: Date;
  availableDates: AvailableConsultationDate[];

  onMonthChange: (month: Date) => void;
  onSelect: (date: Date | undefined) => void;
}

function isSameDate(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

export default function ConsultationCalendar({
  startMonth,
  month,
  selected,
  availableDates,
  onMonthChange,
  onSelect,
}: ConsultationCalendarProps) {
  const defaultClassNames = getDefaultClassNames();

  const selectableDates = availableDates
    .filter(({ availableCount }) => availableCount > 0)
    .map(({ date }) => parseCalendarDate(date));

  const isUnavailableDate = (date: Date) => {
    return !selectableDates.some((selectableDate) =>
      isSameDate(date, selectableDate),
    );
  };

  return (
    <DayPicker
      mode="single"
      locale={ko}
      weekStartsOn={0}
      startMonth={startMonth}
      month={month}
      selected={selected}
      onMonthChange={onMonthChange}
      onSelect={onSelect}
      disabled={isUnavailableDate}
      showOutsideDays
      fixedWeeks
      classNames={{
        root: "relative w-full",

        months: "w-full",
        month: "w-full",

        month_caption: "flex h-14 items-center justify-center",

        caption_label: [
          "text-xl",
          "font-semibold",
          "tracking-tight",
          "text-calendar-text",
        ].join(" "),

        nav: [
          "absolute",
          "left-1/2",
          "top-0",
          "z-10",
          "flex",
          "h-14",
          "w-[190px]",
          "-translate-x-1/2",
          "items-center",
          "justify-between",
        ].join(" "),

        button_previous: [
          defaultClassNames.button_previous,
          "flex size-10 items-center justify-center",
          "rounded-full",
          "text-calendar-text",
          "aria-disabled:pointer-events-none",
          "aria-disabled:cursor-not-allowed",
          "aria-disabled:text-calendar-text/30",
          "aria-disabled:opacity-100",
        ].join(" "),

        button_next: [
          defaultClassNames.button_next,
          "flex size-10 items-center justify-center",
          "rounded-full",
          "text-calendar-text",
          "aria-disabled:pointer-events-none",
          "aria-disabled:cursor-not-allowed",
          "aria-disabled:text-calendar-text/30",
          "aria-disabled:opacity-100",
        ].join(" "),

        chevron: [defaultClassNames.chevron, "size-6 fill-current"].join(" "),
        month_grid: "w-full table-fixed border-collapse",
        weekdays: "flex w-full",

        weekday: [
          "flex h-14 w-[14.285714%]",
          "items-center justify-center",
          "text-base font-light tracking-tight",
          "text-calendar-text",
          "first:text-calendar-sunday",
        ].join(" "),

        week: "flex w-full",

        day: [
          "flex h-14 w-[14.285714%]",
          "items-center justify-center",
          "text-base tracking-tight",
          "text-calendar-text",
        ].join(" "),

        day_button: [
          "flex h-14 w-[50px] items-center justify-center",
          "rounded-[20px]",
          "bg-surface-soft",
          "font-normal",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-primary/30",
          "focus-visible:ring-inset",
        ].join(" "),

        selected: [
          "[&>button]:bg-primary",
          "[&>button]:font-medium",
          "[&>button]:text-neutral-white",
        ].join(" "),

        disabled: [
          "pointer-events-none",
          "text-calendar-text",
          "opacity-30",
        ].join(" "),

        outside: "opacity-30",
      }}
      formatters={{
        formatCaption: (date) =>
          `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(
            2,
            "0",
          )}월`,

        formatWeekdayName: (date) =>
          ["일", "월", "화", "수", "목", "금", "토"][date.getDay()],
      }}
    />
  );
}

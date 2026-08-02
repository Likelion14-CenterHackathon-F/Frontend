import { DayPicker, getDefaultClassNames } from "@daypicker/react";
import { ko } from "@daypicker/react/locale";

interface ReservationCalendarProps {
  selectedDate?: Date;
  onSelectDate: (date: Date) => void;
}

function ReservationCalendar({
  selectedDate,
  onSelectDate,
}: ReservationCalendarProps) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      animate
      mode="single"
      locale={ko}
      selected={selectedDate}
      onSelect={(date) => {
        if (date) {
          onSelectDate(date);
        }
      }}
      showOutsideDays
      classNames={{
        root: `${defaultClassNames.root} w-full`,
        months: `${defaultClassNames.months} w-full`,
        month: `${defaultClassNames.month} w-full`,
        month_grid: `${defaultClassNames.month_grid} w-full table-fixed`,
        day_button: `${defaultClassNames.day_button} mx-auto`,
      }}
    />
  );
}

export default ReservationCalendar;

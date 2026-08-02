import { formatReservationDate } from "@/utils/date";
import type { TimeSlot } from "../../types/reservation.types";

interface TimeSlotListProps {
  slots: TimeSlot[];
  selectedDate: Date;
  locale?: string;
}

function TimeSlotList({ slots, selectedDate, locale }: TimeSlotListProps) {
  const selectedDateLabel = formatReservationDate(selectedDate, locale);

  return (
    <div className="bg-[##F9FAFB] border border-[#E5E7EB] rounded-xl p-3">
      <div className="mb-3">{selectedDateLabel}</div>
      <ul className="space-y-3">
        {slots.map((slot) => {
          return (
            <li className="flex justify-between border border-[#E5E7EB] rounded-xl p-3">
              <span>{slot.time}</span>
              <span>{slot.available ? "예약 가능" : "마감"}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TimeSlotList;

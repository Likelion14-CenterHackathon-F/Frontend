import { useState } from "react";

import { timeSlots } from "../../types/reservation.types";

import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import ReservationCalendar from "./ReservationCalendar";
import TimeSlotList from "./TimeSlotList";

interface ReservationBottomSheetProps {
  open: boolean;
  onClose: () => void;
}

function ReservationBottomSheet({
  open,
  onClose,
}: ReservationBottomSheetProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();

  const handleClose = () => {
    setSelectedDate(undefined);
    onClose();
  };

  return (
    <BottomSheet open={open} title="상담 시간 선택" onClose={handleClose}>
      <p className="mb-4 text-sm leading-5 text-gray-600">
        아래 가능한 시간 중 하나를 선택하세요. 모든 시간은 회원님의 현지
        시간대(UTC+9, 한국 표준시)로 표시됩니다.
      </p>

      <h3 className="mb-3 text-[16px] font-semibold text-[#1F2937]">
        예약 가능한 상담 시간
      </h3>

      <div className="min-h-90">
        <ReservationCalendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </div>

      {selectedDate && (
        <div className="mt-6">
          <TimeSlotList slots={timeSlots} selectedDate={selectedDate} />
        </div>
      )}
    </BottomSheet>
  );
}

export default ReservationBottomSheet;

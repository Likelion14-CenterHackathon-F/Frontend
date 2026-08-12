import {
  getMockAvailableDates,
  getMockDailySlots,
} from "@/mocks/availableConsultationDatesMockData";

import { useConsultationReservationStore } from "@/stores/useConsultationReservationStore";

import ConsultationCalendar from "./components/ConsultationCalendar";
import ConsultationTimeSlots from "./components/ConsultationTimeSlots";
import ConsultationFooter from "@/components/Footer/ConsultationFooter";

import type { LocalDateString } from "@/types/consultationReservation.type";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { formatCalendarDate, parseCalendarDate } from "@/utils/dateTime";
import { groupConsultationSlots } from "@/utils/groupConsultationSlots";
import { usePreferencesStore } from "@/stores/usePreferencesStore";

function getCurrentMonthInTimeZone(timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "numeric",
  }).formatToParts(new Date());

  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);

  return new Date(year, month - 1, 1);
}

function ConsultationSchedulePage() {
  const navigate = useNavigate();
  const timeZone = usePreferencesStore((state) => state.timeZone);

  const currentMonth = useMemo(
    () => getCurrentMonthInTimeZone(timeZone),
    [timeZone],
  );

  const [visibleMonth, setVisibleMonth] = useState(currentMonth);

  const { selectedDate, selectedSlot, setSelectedDate, setSelectedSlot } =
    useConsultationReservationStore();

  const monthlyAvailableDates = useMemo(
    () =>
      getMockAvailableDates(
        visibleMonth.getFullYear(),
        visibleMonth.getMonth() + 1,
      ),
    [visibleMonth],
  );

  const dailySlots = useMemo(() => {
    if (!selectedDate) return null;

    return getMockDailySlots(selectedDate);
  }, [selectedDate]);

  const slotGroups = useMemo(() => {
    if (!dailySlots) return [];

    return groupConsultationSlots(dailySlots.slots, dailySlots.timezoneId);
  }, [dailySlots]);

  const selectedDay = selectedDate
    ? parseCalendarDate(selectedDate)
    : undefined;

  const canProceed =
    selectedDate !== null && selectedSlot !== null && selectedSlot.available;

  const handleSelectDate = (date: Date | undefined) => {
    const nextDate = date
      ? (formatCalendarDate(date) as LocalDateString)
      : null;

    setSelectedDate(nextDate);
  };

  const handleNext = () => {
    if (!canProceed) return;

    navigate("../pre-consultation");
  };

  return (
    <>
      <main className="bg-surface-soft flex-1 pb-[calc(90px+env(safe-area-inset-bottom))]">
        <h1 className="text-calendar-text px-5 pt-6 text-2xl font-bold leading-[1.4] tracking-tight">
          예약일시를 선택해 주세요
        </h1>

        <section className="mt-8 px-5">
          <ConsultationCalendar
            startMonth={currentMonth}
            month={visibleMonth}
            selected={selectedDay}
            availableDates={monthlyAvailableDates}
            onMonthChange={setVisibleMonth}
            onSelect={handleSelectDate}
          />
        </section>

        <ul className="text-calendar-description mx-5 mt-8 list-disc pl-5 text-sm leading-[1.4] tracking-tight">
          <li>아래 가능한 시간 중 하나를 선택하세요.</li>

          <li className="mt-1">
            모든 시간은 회원님의 현지 시간대로 표시됩니다.
          </li>
        </ul>

        <div className="mt-9 h-2 bg-action-disabled" />

        {selectedDate && dailySlots && (
          <section className="px-5 py-[46px]">
            {dailySlots.slots.length === 0 ? (
              <p className="text-center text-text-03">
                선택한 날짜에 등록된 시간이 없습니다.
              </p>
            ) : (
              <ConsultationTimeSlots
                timezoneId={dailySlots.timezoneId}
                groups={slotGroups}
                selectedSlotId={selectedSlot?.slotId}
                onSelect={setSelectedSlot}
              />
            )}
          </section>
        )}
      </main>

      <ConsultationFooter disabled={!canProceed} onClick={handleNext}>
        다음
      </ConsultationFooter>
    </>
  );
}

export default ConsultationSchedulePage;

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import ConsultationFooter from "@/components/Footer/ConsultationFooter";
import {
  getMockAvailableDates,
  getMockDailySlots,
} from "@/mocks/availableConsultationDatesMockData";
import { useConsultationReservationStore } from "@/stores/useConsultationReservationStore";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import type { LocalDateString } from "@/types/consultationReservation.type";
import {
  formatCalendarDate,
  getCurrentMonthInTimeZone,
  parseCalendarDate,
} from "@/utils/dateTime";
import { groupConsultationSlots } from "@/utils/groupConsultationSlots";

import ConsultationCalendar from "./components/ConsultationCalendar";
import ConsultationTimeSlots from "./components/ConsultationTimeSlots";

function ConsultationSchedulePage() {
  const navigate = useNavigate();
  const { t } = useTranslation("consultationReservation");
  const locale = usePreferencesStore((state) => state.locale);
  const timeZone = usePreferencesStore((state) => state.timeZone);
  const currentMonth = useMemo(
    () => getCurrentMonthInTimeZone(timeZone),
    [timeZone],
  );
  const [visibleMonth, setVisibleMonth] = useState(currentMonth);
  const { selectedDate, selectedSlot, setSelectedDate, setSelectedSlot } =
    useConsultationReservationStore();

  console.log("currentMonth", currentMonth);

  //월별 가능한 날짜 배열 저장
  const monthlyAvailableDates = useMemo(
    () =>
      getMockAvailableDates(
        visibleMonth.getFullYear(),
        visibleMonth.getMonth() + 1,
      ),
    [visibleMonth],
  );

  //선택한 날짜의 슬롯 조회
  const dailySlots = useMemo(
    () => (selectedDate ? getMockDailySlots(selectedDate) : null),
    [selectedDate],
  );

  //사용자의 시간대 기준으로 슬롯 그룹화
  const slotGroups = useMemo(
    () =>
      dailySlots ? groupConsultationSlots(dailySlots.slots, timeZone) : [],
    [dailySlots, timeZone],
  );

  //문자열 날짜를 캘린더용 객체 Date로 변환
  const selectedDay = selectedDate
    ? parseCalendarDate(selectedDate)
    : undefined;

  //다음 단계 진행 가능 여부
  const canProceed =
    selectedDate !== null && selectedSlot !== null && selectedSlot.available;

  //날짜 선택 핸들러 Date 객체 -> string
  const handleSelectDate = (date: Date | undefined) => {
    setSelectedDate(
      date ? (formatCalendarDate(date) as LocalDateString) : null,
    );
  };

  const handleNext = () => {
    if (canProceed) navigate("../pre-consultation");
  };

  return (
    <>
      <main className="bg-surface-soft flex-1 pb-[calc(90px+env(safe-area-inset-bottom))]">
        <h1 className="text-calendar-text px-5 pt-6 text-2xl font-bold leading-[1.4] tracking-tight">
          {t("schedule.title")}
        </h1>

        <section className="mt-8 px-5">
          <ConsultationCalendar
            locale={locale}
            startMonth={currentMonth}
            month={visibleMonth}
            selected={selectedDay}
            availableDates={monthlyAvailableDates}
            onMonthChange={setVisibleMonth}
            onSelect={handleSelectDate}
          />
        </section>

        <ul className="text-calendar-description mx-5 mt-8 list-disc pl-5 text-sm leading-[1.4] tracking-tight">
          <li>{t("schedule.instructions.selectTime")}</li>
          <li className="mt-1">{t("schedule.instructions.timezone")}</li>
        </ul>

        {selectedDate && dailySlots && (
          <div className="mt-9 h-2 bg-action-disabled" />
        )}

        {selectedDate && dailySlots && (
          <section className="px-5 py-[46px]">
            {dailySlots.slots.length === 0 ? (
              <p className="text-center text-text-03">
                {t("schedule.emptySlots")}
              </p>
            ) : (
              <ConsultationTimeSlots
                locale={locale}
                userTimeZone={timeZone}
                groups={slotGroups}
                selectedSlotId={selectedSlot?.slotId}
                onSelect={setSelectedSlot}
              />
            )}
          </section>
        )}
      </main>

      <ConsultationFooter disabled={!canProceed} onClick={handleNext}>
        {t("schedule.next")}
      </ConsultationFooter>
    </>
  );
}

export default ConsultationSchedulePage;

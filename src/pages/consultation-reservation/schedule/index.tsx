import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import ConsultationFooter from "@/components/Footer/ConsultationFooter";
import LoadingState from "@/components/Loading/LoadingState";
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
import { useAvailableConsultationDates } from "./hooks/useAvailableConsultationDates";
import { useAvailableConsultationSlots } from "./hooks/useAvailableConsultationSlots";

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

  const visibleYear = visibleMonth.getFullYear();
  const visibleMonthNumber = visibleMonth.getMonth() + 1;
  const {
    data: monthlyAvailableDates = [],
    isPending: isAvailableDatesPending,
    isError: isAvailableDatesError,
    refetch: refetchAvailableDates,
  } = useAvailableConsultationDates(
    visibleYear,
    visibleMonthNumber,
  );

  //선택한 날짜의 슬롯 조회
  const {
    data: dailySlots,
    isPending: isAvailableSlotsPending,
    isError: isAvailableSlotsError,
    refetch: refetchAvailableSlots,
  } = useAvailableConsultationSlots(selectedDate);

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
    selectedDate !== null &&
    selectedSlot !== null &&
    selectedSlot.available &&
    Boolean(
      dailySlots?.slots.some(
        (slot) => slot.slotId === selectedSlot.slotId && slot.available,
      ),
    );

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
      <main className="relative z-10 flex-1 bg-transparent pb-[calc(90px+env(safe-area-inset-bottom))]">
        <section className="mt-[19px] px-[14px]">
          <ConsultationCalendar
            locale={locale}
            startMonth={currentMonth}
            month={visibleMonth}
            selected={selectedDay}
            availableDates={monthlyAvailableDates}
            onMonthChange={setVisibleMonth}
            onSelect={handleSelectDate}
          />

          {isAvailableDatesPending && (
            <LoadingState
              variant="inline"
              className="mt-2"
              message="예약 가능한 날짜를 불러오고 있습니다."
            />
          )}

          {isAvailableDatesError && (
            <div className="mt-4 flex items-center justify-center gap-3 text-sm text-[#65646D]">
              <p>예약 가능한 날짜를 불러오지 못했습니다.</p>
              <button
                type="button"
                onClick={() => void refetchAvailableDates()}
                className="font-semibold text-[#614BB8]"
              >
                다시 시도
              </button>
            </div>
          )}
        </section>

        <ul className="text-calendar-description mx-5 mt-[21px] list-disc pl-5 text-sm leading-[1.4] tracking-tight">
          <li>{t("schedule.instructions.selectTime")}</li>
          <li className="mt-1">{t("schedule.instructions.timezone")}</li>
        </ul>

        {selectedDate && (
          <div className="mt-9 h-2 bg-action-disabled" />
        )}

        {selectedDate && (
          <section className="px-5 py-[46px]">
            {isAvailableSlotsPending ? (
              <LoadingState
                variant="inline"
                message={t("schedule.slotsLoading")}
              />
            ) : isAvailableSlotsError ? (
              <div className="flex items-center justify-center gap-3 text-sm text-[#65646D]">
                <p>{t("schedule.slotsLoadError")}</p>
                <button
                  type="button"
                  onClick={() => void refetchAvailableSlots()}
                  className="font-semibold text-[#614BB8]"
                >
                  {t("schedule.retry")}
                </button>
              </div>
            ) : !dailySlots || dailySlots.slots.length === 0 ? (
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

      <ConsultationFooter
        disabled={!canProceed}
        onClick={handleNext}
        className="bg-transparent bg-gradient-to-b from-white/0 to-white/45 backdrop-blur-[4.7px]"
        buttonClassName="disabled:bg-[#FDFDFF] disabled:text-[#9795A0]"
      >
        {t("schedule.next")}
      </ConsultationFooter>
    </>
  );
}

export default ConsultationSchedulePage;

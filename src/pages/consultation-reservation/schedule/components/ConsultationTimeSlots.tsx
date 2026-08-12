import { useTranslation } from "react-i18next";

import type { ConsultationReservationSlot } from "@/types/consultationReservation.type";
import type { SupportedLocale } from "@/types/preferences";
import { cn } from "@/utils/cn";
import type { ConsultationSlotGroup } from "@/utils/groupConsultationSlots";

const KOREA_TIME_ZONE = "Asia/Seoul";

interface ConsultationTimeSlotsProps {
  locale: SupportedLocale;
  userTimeZone: string;
  groups: ConsultationSlotGroup[];
  selectedSlotId?: number;
  onSelect: (slot: ConsultationReservationSlot) => void;
}

function formatTime(
  startsAt: string,
  locale: SupportedLocale,
  timeZone: string,
  includeMinutes = true,
) {
  return new Intl.DateTimeFormat(locale, {
    timeZone,
    hour: "numeric",
    ...(includeMinutes && { minute: "2-digit" }),
  }).format(new Date(startsAt));
}

function formatTimeZoneOffset(startsAt: string, locale: SupportedLocale) {
  const offset = new Intl.DateTimeFormat(locale, {
    timeZone: KOREA_TIME_ZONE,
    timeZoneName: "shortOffset",
  })
    .formatToParts(new Date(startsAt))
    .find((part) => part.type === "timeZoneName")?.value;

  return offset?.replace("GMT", "UTC") ?? "UTC+9";
}

function ConsultationTimeSlots({
  locale,
  userTimeZone,
  groups,
  selectedSlotId,
  onSelect,
}: ConsultationTimeSlotsProps) {
  const { t } = useTranslation("consultationReservation");

  return (
    <div className="flex flex-col gap-8">
      {groups.map((group) => (
        <section key={group.key} className="flex flex-col gap-3">
          <header>
            <h2 className="text-calendar-text text-lg font-semibold tracking-tight">
              {formatTime(group.startsAt, locale, userTimeZone, false)}
            </h2>
            <p className="mt-1 text-sm tracking-tight text-action-secondary-text">
              {t("schedule.localTime", {
                time: formatTime(group.startsAt, locale, KOREA_TIME_ZONE),
                offset: formatTimeZoneOffset(group.startsAt, locale),
              })}
            </p>
          </header>

          <div className="grid grid-cols-4 gap-2">
            {group.slots.map((slot) => {
              const isSelected = selectedSlotId === slot.slotId;

              return (
                <button
                  key={slot.slotId}
                  type="button"
                  disabled={!slot.available}
                  aria-pressed={isSelected}
                  onClick={() => onSelect(slot)}
                  className={cn(
                    "min-h-12 rounded-[30px] border text-base tracking-tight transition-colors",
                    isSelected
                      ? "border-action-secondary-text bg-action-secondary-text font-medium text-action-primary-text"
                      : "border-calendar-control-border bg-transparent font-normal text-calendar-text",
                    !slot.available &&
                      "cursor-not-allowed bg-action-disabled text-action-disabled-text opacity-60",
                  )}
                >
                  {slot.available
                    ? formatTime(slot.startsAt, locale, userTimeZone)
                    : t("schedule.closed")}
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

export default ConsultationTimeSlots;

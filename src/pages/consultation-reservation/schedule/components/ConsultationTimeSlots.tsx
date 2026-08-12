// schedule/components/ConsultationTimeSlots.tsx

import type { ConsultationReservationSlot } from "@/types/consultationReservation.type";

import { cn } from "@/utils/cn";
import type { ConsultationSlotGroup } from "@/utils/groupConsultationSlots";

interface ConsultationTimeSlotsProps {
  timezoneId: string;
  groups: ConsultationSlotGroup[];
  selectedSlotId?: number;
  onSelect: (slot: ConsultationReservationSlot) => void;
}

function formatSlotTime(startsAt: string, timezoneId: string) {
  const parts = new Intl.DateTimeFormat("ko-KR", {
    timeZone: timezoneId,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(new Date(startsAt));

  const hour = parts.find((part) => part.type === "hour")?.value ?? "";

  const minute = parts.find((part) => part.type === "minute")?.value ?? "00";

  return `${hour}:${minute}`;
}

function ConsultationTimeSlots({
  timezoneId,
  groups,
  selectedSlotId,
  onSelect,
}: ConsultationTimeSlotsProps) {
  return (
    <div className="flex flex-col gap-8">
      {groups.map((group) => (
        <section key={group.key} className="flex flex-col gap-3">
          <header>
            <h2 className="text-calendar-text text-lg font-semibold tracking-tight">
              {group.title}
            </h2>

            <p className="mt-1 text-sm tracking-tight text-action-secondary-text">
              {group.localTimeLabel + " (UTC+9)"}
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
                    "min-h-12 rounded-[30px] border",
                    "text-base tracking-tight",
                    "transition-colors",

                    isSelected
                      ? [
                          "border-action-secondary-text",
                          "bg-action-secondary-text",
                          "font-medium",
                          "text-action-primary-text",
                        ]
                      : [
                          "border-calendar-control-border",
                          "bg-transparent",
                          "font-normal",
                          "text-calendar-text",
                        ],

                    !slot.available && [
                      "cursor-not-allowed",
                      "bg-action-disabled",
                      "text-action-disabled-text",
                      "opacity-60",
                    ],
                  )}
                >
                  {slot.available
                    ? formatSlotTime(slot.startsAt, timezoneId)
                    : "마감"}
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

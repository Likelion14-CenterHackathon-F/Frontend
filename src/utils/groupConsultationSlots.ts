// schedule/utils/groupConsultationSlots.ts

import type { ConsultationReservationSlot } from "@/types/consultationReservation.type";

export interface ConsultationSlotGroup {
  key: string;
  hour: number;
  title: string;
  localTimeLabel: string;
  slots: ConsultationReservationSlot[];
}

export function groupConsultationSlots(
  slots: ConsultationReservationSlot[],
  timezoneId: string,
): ConsultationSlotGroup[] {
  const groups = new Map<string, ConsultationReservationSlot[]>();

  slots.forEach((slot) => {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: timezoneId,
      hour: "2-digit",
      hour12: false,
    }).formatToParts(new Date(slot.startsAt));

    const hour = Number(parts.find((part) => part.type === "hour")?.value) % 24;

    const key = String(hour);

    groups.set(key, [...(groups.get(key) ?? []), slot]);
  });

  return Array.from(groups.entries()).map(([key, groupedSlots]) => {
    const hour = Number(key);
    const period = hour < 12 ? "오전" : "오후";
    const displayHour = hour % 12 || 12;

    return {
      key,
      hour,
      title: `${period} ${displayHour}시`,
      localTimeLabel: `현지 시간 ${period} ${displayHour}:00`,
      slots: groupedSlots,
    };
  });
}

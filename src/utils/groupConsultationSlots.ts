import type { ConsultationReservationSlot } from "@/types/consultationReservation.type";

export interface ConsultationSlotGroup {
  key: string;
  startsAt: string;
  slots: ConsultationReservationSlot[];
}

function getLocalHourKey(startsAt: string, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(startsAt));
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((item) => item.type === type)?.value ?? "";

  return `${part("year")}-${part("month")}-${part("day")}T${part("hour")}`;
}

export function groupConsultationSlots(
  slots: ConsultationReservationSlot[],
  userTimeZone: string,
): ConsultationSlotGroup[] {
  const groups = new Map<string, ConsultationReservationSlot[]>();

  slots.filter((slot) => slot.available).forEach((slot) => {
    const key = getLocalHourKey(slot.startsAt, userTimeZone);
    groups.set(key, [...(groups.get(key) ?? []), slot]);
  });

  return Array.from(groups.entries()).map(([key, groupedSlots]) => ({
    key,
    startsAt: groupedSlots[0].startsAt,
    slots: groupedSlots,
  }));
}

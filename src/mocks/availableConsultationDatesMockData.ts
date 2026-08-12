// src/mocks/consultationReservation.mock.ts

import type {
  AvailableConsultationDate,
  ConsultationDailySlots,
  LocalDateString,
} from "@/types/consultationReservation.type";

export const availableConsultationDatesMock: AvailableConsultationDate[] = [
  {
    date: "2026-08-15",
    availableCount: 4,
  },
  {
    date: "2026-08-16",
    availableCount: 2,
  },
  {
    date: "2026-08-18",
    availableCount: 3,
  },
  {
    date: "2026-08-20",
    availableCount: 1,
  },
];

export const consultationDailySlotsMock: Record<
  LocalDateString,
  ConsultationDailySlots
> = {
  "2026-08-15": {
    date: "2026-08-15",
    availableCount: 4,
    timezoneId: "Asia/Seoul",
    slots: [
      {
        slotId: 501,
        startsAt: "2026-08-15T09:00:00+09:00",
        endsAt: "2026-08-15T09:30:00+09:00",
        available: true,
      },
      {
        slotId: 502,
        startsAt: "2026-08-15T09:30:00+09:00",
        endsAt: "2026-08-15T10:00:00+09:00",
        available: true,
      },
      {
        slotId: 503,
        startsAt: "2026-08-15T14:00:00+09:00",
        endsAt: "2026-08-15T14:30:00+09:00",
        available: true,
      },
      {
        slotId: 504,
        startsAt: "2026-08-15T14:30:00+09:00",
        endsAt: "2026-08-15T15:00:00+09:00",
        available: false,
      },
      {
        slotId: 505,
        startsAt: "2026-08-15T15:00:00+09:00",
        endsAt: "2026-08-15T15:30:00+09:00",
        available: true,
      },
    ],
  },

  "2026-08-16": {
    date: "2026-08-16",
    availableCount: 2,
    timezoneId: "Asia/Seoul",
    slots: [
      {
        slotId: 601,
        startsAt: "2026-08-16T10:00:00+09:00",
        endsAt: "2026-08-16T10:30:00+09:00",
        available: true,
      },
      {
        slotId: 602,
        startsAt: "2026-08-16T11:00:00+09:00",
        endsAt: "2026-08-16T11:30:00+09:00",
        available: false,
      },
      {
        slotId: 603,
        startsAt: "2026-08-16T13:00:00+09:00",
        endsAt: "2026-08-16T13:30:00+09:00",
        available: true,
      },
    ],
  },

  "2026-08-18": {
    date: "2026-08-18",
    availableCount: 3,
    timezoneId: "Asia/Seoul",
    slots: [
      {
        slotId: 701,
        startsAt: "2026-08-18T09:00:00+09:00",
        endsAt: "2026-08-18T09:30:00+09:00",
        available: true,
      },
      {
        slotId: 702,
        startsAt: "2026-08-18T14:00:00+09:00",
        endsAt: "2026-08-18T14:30:00+09:00",
        available: true,
      },
      {
        slotId: 703,
        startsAt: "2026-08-18T16:00:00+09:00",
        endsAt: "2026-08-18T16:30:00+09:00",
        available: true,
      },
    ],
  },

  "2026-08-20": {
    date: "2026-08-20",
    availableCount: 1,
    timezoneId: "Asia/Seoul",
    slots: [
      {
        slotId: 801,
        startsAt: "2026-08-20T14:00:00+09:00",
        endsAt: "2026-08-20T14:30:00+09:00",
        available: true,
      },
    ],
  },
};

export function getMockAvailableDates(
  year: number,
  month: number,
): AvailableConsultationDate[] {
  return availableConsultationDatesMock.filter((item) => {
    const [itemYear, itemMonth] = item.date.split("-").map(Number);

    return itemYear === year && itemMonth === month;
  });
}

export function getMockDailySlots(
  date: LocalDateString,
): ConsultationDailySlots {
  return (
    consultationDailySlotsMock[date] ?? {
      date,
      availableCount: 0,
      timezoneId: "Asia/Seoul",
      slots: [],
    }
  );
}

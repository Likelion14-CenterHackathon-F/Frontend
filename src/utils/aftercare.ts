import { parseCalendarDate } from "@/utils/dateTime";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** 시술한지 며칠 지났는지 체크하는 부분이고 시술 당일은 D+0으로 설정했습니다. */
export function getDayOffset(
  procedureDate: string,
  today = new Date(),
): number {
  const start = parseCalendarDate(procedureDate);
  const startUtc = Date.UTC(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
  );
  const todayUtc = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  return Math.floor((todayUtc - startUtc) / MS_PER_DAY);
}

export type PhaseStatus = "past" | "current" | "upcoming";

export interface RecoveryPhase {
  id: string;
  fromDay: number;
  toDay: number | null;
}

export function toDayKey(date: Date): number {
  return (
    date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
  );
}

export function getWeekAround(
  today: Date,
  { before, after }: { before: number; after: number },
): Date[] {
  return Array.from({ length: before + after + 1 }, (_, index) => {
    const date = new Date(today);
    date.setDate(date.getDate() - before + index);

    return date;
  });
}

export function getPhaseStatus(
  phase: RecoveryPhase,
  dayOffset: number,
): PhaseStatus {
  if (dayOffset < phase.fromDay) return "upcoming";
  if (phase.toDay !== null && dayOffset > phase.toDay) return "past";

  return "current";
}

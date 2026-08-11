import { parseCalendarDate } from "@/utils/dateTime";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** 시술일로부터 며칠이 지났는지(D+N) 계산한다. 시술 당일은 D+0. */
export function getDayOffset(procedureDate: string, today = new Date()): number {
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
  /** 마지막 구간은 상한이 없다. */
  toDay: number | null;
}

export function getPhaseStatus(
  phase: RecoveryPhase,
  dayOffset: number,
): PhaseStatus {
  if (dayOffset < phase.fromDay) return "upcoming";
  if (phase.toDay !== null && dayOffset > phase.toDay) return "past";

  return "current";
}

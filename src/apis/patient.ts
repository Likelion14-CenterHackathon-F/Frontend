/**
 * 환자 케이스 데이터를 내려주는 자리.
 * 백엔드 명세가 나오기 전까지 고정 목 데이터로 대체한다.
 */

import type { RecoveryPhase } from "@/utils/aftercare";

export interface PatientCase {
  name: string;
  procedureName: string;
  procedureDate: string;
  cautionDays: number;
  upcomingConsultationAt: string | null;
}

/** 회복 시기 구간. 실제로는 시술 종류별로 백엔드에서 내려받는다. */
export const RECOVERY_PHASES: RecoveryPhase[] = [
  { id: "early", fromDay: 0, toDay: 3 },
  { id: "middle", fromDay: 4, toDay: 7 },
  { id: "stable", fromDay: 8, toDay: null },
];

function daysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${date.getFullYear()}-${month}-${day}`;
}

function daysLater(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(14, 0, 0, 0);
  return date.toISOString();
}

export function getPatientCase(): PatientCase {
  return {
    name: "김지수",
    procedureName: "복합 레이저 (피부)",
    procedureDate: daysAgo(10),
    cautionDays: 14,
    upcomingConsultationAt: daysLater(3),
  };
}

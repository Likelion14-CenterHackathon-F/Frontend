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

/**
 * 응급용 의료 리포트. 현지 의료진이 읽어야 하므로 값에 영문을 함께 담는다.
 */
export interface MedicalReport {
  name: string;
  birthDate: string;
  gender: "female" | "male";
  procedureDate: string;
  procedureName: string;
  procedureNameEn: string;
  materials: string[];
  medications: string[];
  allergies: string;
  clinicHotline: string;
  guardianPhone: string;
}

export function getMedicalReport(): MedicalReport {
  return {
    name: "김지수 (KIM, JISOO)",
    birthDate: "1995.05.20",
    gender: "female",
    procedureDate: "2025.07.10",
    procedureName: "복합 레이저 토닝",
    procedureNameEn: "(Complex Laser Toning)",
    materials: [
      "국소 마취 크림 (Lidocaine 9.6%)",
      "피부 쿨링 겔 (Medical Cooling Gel)",
    ],
    medications: [
      "세파클러 (Cefaclor) - 항생제",
      "이부프로펜 (Ibuprofen) - 진통소염제",
    ],
    allergies: "페니실린 (Penicillin) 계열",
    clinicHotline: "+82-2-1234-5678",
    guardianPhone: "+82-10-9876-5432",
  };
}

export function getPatientCase(): PatientCase {
  return {
    name: "김지수",
    procedureName: "복합 레이저 (피부)",
    // 와이어프레임의 D+5 상태를 재현하기 위해 시술일을 오늘 기준으로 잡는다.
    procedureDate: daysAgo(5),
    cautionDays: 14,
    upcomingConsultationAt: daysLater(3),
  };
}

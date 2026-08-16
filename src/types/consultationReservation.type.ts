/**
 * yyyy-MM-dd 형식의 환자 현지 날짜
 *
 * TypeScript가 문자열 형식을 완벽하게 검증하지는 않지만,
 * 일반 string보다 의도를 명확히 표현할 수 있다.
 */
export type LocalDateString = `${number}-${number}-${number}`;

/**
 * ISO-8601 OffsetDateTime
 *
 * 예:
 * 2026-08-15T14:00:00+09:00
 */
export type OffsetDateTimeString = string;

/**
 * 월별 예약 가능 날짜 조회 결과의 개별 항목
 */
export interface AvailableConsultationDate {
  date: LocalDateString;
  availableCount: number;
}

/**
 * 특정 날짜의 개별 예약 슬롯
 */
export interface ConsultationReservationSlot {
  slotId: number;
  startsAt: OffsetDateTimeString;
  endsAt: OffsetDateTimeString;
  available: boolean;
}

/**
 * 특정 날짜의 전체 슬롯 조회 결과
 */
export interface ConsultationDailySlots {
  date: LocalDateString;
  availableCount: number;
  timezoneId: string;
  slots: ConsultationReservationSlot[];
}

export interface ActiveConsultationAppointment {
  appointmentId: number;
  caseId: number;
  slotId: number;
  startsAt: string;
  endsAt: string;
  symptomCategory: string | null;
  symptomCategories: string[];
  symptomNote: string | null;
  waitingRoomOpensAt: string;
  waitingRoomClosesAt: string;
  canEnterWaitingRoom: boolean;
  timezoneId: string;
  status: "CONFIRMED";
}

export type SymptomCategory =
  | "PAIN"
  | "SWELLING"
  | "REDNESS"
  | "HEAT"
  | "BLEEDING"
  | "ITCHING"
  | "BRUISING"
  | "OTHER";

export interface CreateConsultationAppointmentRequest {
  caseId: number;
  slotId: number;
  symptomCategory?: SymptomCategory;
  symptomCategories?: SymptomCategory[];
  symptomNote?: string;
  files?: File[];
}

export interface CreateConsultationAppointmentResponse {
  appointmentId: number;
  caseId: number;
  slotId: number;
  startsAt: OffsetDateTimeString;
  endsAt: OffsetDateTimeString;
  waitingRoomOpensAt: OffsetDateTimeString;
  waitingRoomClosesAt: OffsetDateTimeString;
  canEnterWaitingRoom: boolean;
  timezoneId: string;
  status: "CONFIRMED";
}

export type SymptomType =
  | "pain"
  | "swelling"
  | "redness"
  | "heat"
  | "bleeding"
  | "itching"
  | "bruise"
  | "other";

export interface ConsultationAttachment {
  id: string;
  file: File;
  previewUrl: string;
}

export type ConsultationCancelReason =
  | "scheduleChange"
  | "symptomsImproved"
  | "changedMind"
  | "bookingMistake"
  | "other";

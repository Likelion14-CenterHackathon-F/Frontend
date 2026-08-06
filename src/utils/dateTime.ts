import { TIME_ZONE_STORAGE_KEY } from "@/constants/storageKey";
import type { SupportedLocale, UserPreferences } from "@/types/preferences";

//브라우저 시간대 감지 함수
export function detectTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
}

//올바른 시간대인지 검증 함수
export function isValidTimeZone(timeZone: unknown): timeZone is string {
  if (typeof timeZone !== "string") {
    return false;
  }

  try {
    new Intl.DateTimeFormat("en-US", { timeZone }).format();
    return true;
  } catch {
    return false;
  }
}

export function getInitialTimeZone(): string {
  const savedTimeZone = localStorage.getItem(TIME_ZONE_STORAGE_KEY);

  return isValidTimeZone(savedTimeZone) ? savedTimeZone : detectTimeZone();
}

//날짜 포맷 설정 타입
export type DateTimeContext = {
  locale: SupportedLocale;
  timeZone: string;
};

//매개변수로 받을 수 있는 날짜 타입
type DateValue = string | number | Date;

//입력값을 Date 타입으로 변환하고 검증
function toDate(value: DateValue): Date {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${String(value)}`);
  }

  return date;
}

/*
"YYYY-MM-DD" 문자열을 로컬 달력 날짜로 파싱하는 함수.
new Date("2025-07-10")은 UTC 자정으로 해석돼 시간대에 따라 하루가 밀리므로 직접 조립한다.
*/
export function parseCalendarDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day);
}

/*
시간 없이 날짜만 포맷하는 함수.
시술일처럼 시각 개념이 없는 달력 날짜용이라 timeZone 변환을 적용하지 않는다.
ex) 2025년 7월 10일, July 10, 2025
*/
export function formatDate(value: DateValue, locale: SupportedLocale): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(toDate(value));
}

/*
예약 날짜와 시간 포맷하는 함수
ex) 2025년 7월 16일 (수) 오후 2:00, Wednesday, July 16, 2025 at 1:00 AM
*/
export function formatAppointmentDateTime(
  value: DateValue,
  { locale, timeZone }: UserPreferences,
): string {
  return new Intl.DateTimeFormat(locale, {
    timeZone,
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(toDate(value));
}

/*
날짜 없이 시간만 포맷하는 함수
ex) "오후 2:00", "10:00 PM"
*/
export function formatAppointmentTime(
  value: DateValue,
  { locale, timeZone }: DateTimeContext,
): string {
  return new Intl.DateTimeFormat(locale, {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
  }).format(toDate(value));
}

/*
예약 시작부터 종료까지 범위 표시하는 함수
ex) 2025년 7월 16일 (수) 오후 2:00~2:30
    Wednesday, July 16, 2025, 1:00–1:30 AM
*/
export function formatAppointmentRange(
  startsAt: DateValue,
  endsAt: DateValue,
  context: DateTimeContext,
): string {
  const formatter = new Intl.DateTimeFormat(context.locale, {
    timeZone: context.timeZone,
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  });

  return formatter.formatRange(toDate(startsAt), toDate(endsAt));
}

/*
시간대 이름 표시 함수
ex) "대한민국 표준시", "Korean Standard Time"
*/
export function formatTimeZoneName(
  value: DateValue,
  { locale, timeZone }: DateTimeContext,
): string {
  const parts = new Intl.DateTimeFormat(locale, {
    timeZone,
    timeZoneName: "long",
  }).formatToParts(toDate(value));

  return parts.find((part) => part.type === "timeZoneName")?.value ?? timeZone;
}

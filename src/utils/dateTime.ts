import type { SupportedLocale, UserPreferences } from "@/types/preferences";

//브라우저 시간대 감지 함수
export function detectTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

//올바른 시간대인지 검증 함수
export function isValidTimeZone(timeZone: string): boolean {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone }).format();
    return true;
  } catch {
    return false;
  }
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

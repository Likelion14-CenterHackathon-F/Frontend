export function formatReservationDate(date: Date, locale = "ko-KR") {
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(date);
}

import type { SupportedLocale } from "@/types/preferences";

export const LANGUAGE_OPTIONS: { value: SupportedLocale; label: string }[] = [
  { value: "ko-KR", label: "한국어" },
  { value: "ja-JP", label: "日本語" },
  { value: "zh-CN", label: "中文" },
  { value: "en-US", label: "English" },
];

export function getTimezoneOptions() {
  return Intl.supportedValuesOf("timeZone").map((timezone) => ({
    value: timezone,
    label: timezone,
  }));
}

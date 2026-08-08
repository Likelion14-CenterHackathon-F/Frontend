import flagCn from "@/assets/flag-cn.svg";
import flagJp from "@/assets/flag-jp.svg";
import flagKr from "@/assets/flag-kr.svg";
import flagUs from "@/assets/flag-us.svg";
import type { SupportedLocale } from "@/types/preferences";

export const LANGUAGE_OPTIONS: {
  value: SupportedLocale;
  label: string;
  flag: string;
}[] = [
  { value: "ko-KR", label: "한국어", flag: flagKr },
  { value: "ja-JP", label: "日本語", flag: flagJp },
  { value: "zh-CN", label: "中文", flag: flagCn },
  { value: "en-US", label: "English", flag: flagUs },
];

export function getTimezoneOptions() {
  return Intl.supportedValuesOf("timeZone").map((timezone) => ({
    value: timezone,
    label: timezone,
  }));
}

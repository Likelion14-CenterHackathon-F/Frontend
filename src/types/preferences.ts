export const supportedLocales = ["ko-KR", "en-US", "ja-JP", "zh-CN"] as const;

export type SupportedLocale = (typeof supportedLocales)[number];

export interface UserPreferences {
  locale: SupportedLocale;
  timeZone: string;
}

import i18n from "@/i18n";
import { resolveSupportedLocale } from "@/i18n/language";
import type { SupportedLocale } from "@/types/preferences";
import { detectTimeZone } from "@/utils/dateTime";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type PreferencesState = {
  locale: SupportedLocale;
  timeZone: string;

  setLocale: (locale: SupportedLocale) => Promise<void>;
  setTimeZone: (timeZone: string) => void;
  resetToSystemPreferences: () => Promise<void>;
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      locale: resolveSupportedLocale(),
      timeZone: detectTimeZone(),

      setLocale: async (locale) => {
        await i18n.changeLanguage(locale);
        set({ locale });
      },

      setTimeZone: (timeZone) => {
        set({ timeZone });
      },

      resetToSystemPreferences: async () => {
        const locale = resolveSupportedLocale();
        const timeZone = detectTimeZone();

        await i18n.changeLanguage(locale);

        set({
          locale,
          timeZone,
        });
      },
    }),
    {
      name: "user-preferences",
    },
  ),
);

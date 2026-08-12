import { useTranslation } from "react-i18next";

import check from "@/assets/check.svg";
import PageHeader from "@/components/PageHeader/PageHeader";
import { LANGUAGE_OPTIONS } from "@/constants/settings";
import { usePreferencesStore } from "@/stores/usePreferencesStore";

function LanguageSettingsPage() {
  const { t } = useTranslation("settings");

  const locale = usePreferencesStore((state) => state.locale);
  const setLocale = usePreferencesStore((state) => state.setLocale);

  return (
    <div className="min-h-dvh bg-neutral-white">
      <PageHeader title={t("language.title")} backLabel={t("back")} />

      <ul>
        {LANGUAGE_OPTIONS.map((option) => {
          const isSelected = option.value === locale;

          return (
            <li key={option.value}>
              <button
                type="button"
                aria-current={isSelected}
                onClick={() => void setLocale(option.value)}
                className="border-language-divider flex w-full items-center justify-between border-t px-5 py-4.75"
              >
                <span className="flex items-center gap-3">
                  <img
                    aria-hidden
                    src={option.flag}
                    alt=""
                    className="h-6 w-9 rounded-[3px] shadow-[0_0_4px_rgba(0,0,0,0.25)]"
                  />
                  <span className="text-body font-medium text-text-language">
                    {option.label}
                  </span>
                </span>

                {isSelected && (
                  <img aria-hidden src={check} alt="" className="size-6" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LanguageSettingsPage;

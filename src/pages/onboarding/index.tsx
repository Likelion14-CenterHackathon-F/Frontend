import { useMemo, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Button from "@/components/Button/Button";
import Card from "@/components/Card/Card";
import Select from "@/components/Select/Select";
import { LANGUAGE_OPTIONS, getTimezoneOptions } from "@/constants/settings";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import type { SupportedLocale } from "@/types/preferences";

interface SettingCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

function SettingCard({ title, description, children }: SettingCardProps) {
  return (
    <Card title={title}>
      <p className="text-xs text-[#1F2937]">{description}</p>
      {children}
    </Card>
  );
}

function OnboardingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const locale = usePreferencesStore((state) => state.locale);
  const timeZone = usePreferencesStore((state) => state.timeZone);
  const setLocale = usePreferencesStore((state) => state.setLocale);
  const setTimeZone = usePreferencesStore((state) => state.setTimeZone);

  const timezoneOptions = useMemo(() => getTimezoneOptions(), []);
  const canStart = Boolean(locale && timeZone);

  return (
    <div className="flex min-h-dvh flex-col px-6 pt-28 pb-10">
      <h1 className="text-base font-semibold text-[#1F2937]">
        {t("welcome")}
      </h1>

      <div className="mt-16 flex flex-col gap-8">
        <SettingCard title={t("language.title")} description={t("language.description")}>
          <Select
            label={t("language.label")}
            placeholder={t("selectPlaceholder")}
            options={LANGUAGE_OPTIONS}
            value={locale}
            onChange={(event) =>
              void setLocale(event.target.value as SupportedLocale)
            }
          />
        </SettingCard>

        <SettingCard title={t("timezone.title")} description={t("timezone.description")}>
          <Select
            label={t("timezone.label")}
            placeholder={t("selectPlaceholder")}
            options={timezoneOptions}
            value={timeZone}
            onChange={(event) => setTimeZone(event.target.value)}
          />
        </SettingCard>
      </div>

      <Button
        className="mt-auto self-center"
        disabled={!canStart}
        onClick={() => navigate("/auth/verify")}
      >
        {t("start")}
      </Button>
    </div>
  );
}

export default OnboardingPage;

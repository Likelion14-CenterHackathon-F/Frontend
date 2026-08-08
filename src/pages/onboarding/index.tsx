import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { usePreferencesStore } from "@/stores/usePreferencesStore";
import type { SupportedLocale } from "@/types/preferences";

import BirthDateStep, { type BirthDate } from "./components/BirthDateStep";
import IntroStep from "./components/IntroStep";
import LanguageStep from "./components/LanguageStep";
import OnboardingLayout from "./components/OnboardingLayout";
import RegionStep from "./components/RegionStep";

const STEPS = ["intro", "language", "region", "birthDate"] as const;

type Step = (typeof STEPS)[number];

const DEFAULT_BIRTH_DATE: BirthDate = { year: 1998, month: 7, day: 21 };

function OnboardingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const locale = usePreferencesStore((state) => state.locale);
  const timeZone = usePreferencesStore((state) => state.timeZone);
  const setLocale = usePreferencesStore((state) => state.setLocale);

  const [stepIndex, setStepIndex] = useState(0);
  const [birthDate, setBirthDate] = useState(DEFAULT_BIRTH_DATE);

  const step: Step = STEPS[stepIndex];

  // 인트로로는 돌아가지 않는다
  const canGoPrevious = stepIndex > 1;

  const goPrevious = () => setStepIndex((index) => index - 1);

  const goNext = () => {
    if (stepIndex < STEPS.length - 1) {
      setStepIndex((index) => index + 1);
      return;
    }

    // TODO: 본인확인 API(POST /api/patients/access-links/verify)와 연동
    navigate("/");
  };

  const handleLocaleChange = (nextLocale: SupportedLocale) => {
    void setLocale(nextLocale);
  };

  if (step === "intro") {
    return <IntroStep onStart={goNext} />;
  }

  return (
    <OnboardingLayout
      title={t(`${step}.title`)}
      description={t(`${step}.description`)}
      previousLabel={t("previous")}
      confirmLabel={t(`${step}.confirm`)}
      onPrevious={canGoPrevious ? goPrevious : undefined}
      onConfirm={goNext}
    >
      {step === "language" && (
        <LanguageStep value={locale} onChange={handleLocaleChange} />
      )}

      {step === "region" && <RegionStep locale={locale} timeZone={timeZone} />}

      {step === "birthDate" && (
        <BirthDateStep value={birthDate} onChange={setBirthDate} />
      )}
    </OnboardingLayout>
  );
}

export default OnboardingPage;

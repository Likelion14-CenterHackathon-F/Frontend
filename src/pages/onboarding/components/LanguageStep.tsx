import { useTranslation } from "react-i18next";

import VerticalWheelPicker from "@/components/WheelPicker/VerticalWheelPicker";
import { LANGUAGE_OPTIONS } from "@/constants/settings";
import type { SupportedLocale } from "@/types/preferences";

interface LanguageStepProps {
  value: SupportedLocale;
  onChange: (locale: SupportedLocale) => void;
}

function LanguageStep({ value, onChange }: LanguageStepProps) {
  const { t } = useTranslation();

  return (
    <VerticalWheelPicker<SupportedLocale>
      label={t("language.title")}
      options={LANGUAGE_OPTIONS}
      value={value}
      onChange={onChange}
    />
  );
}

export default LanguageStep;

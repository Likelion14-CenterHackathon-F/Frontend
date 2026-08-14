import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import WheelPicker, {
  type WheelOption,
} from "@/components/WheelPicker/WheelPicker";

export interface BirthDate {
  year: number;
  month: number;
  day: number;
}

interface BirthDateStepProps {
  value: BirthDate;
  onChange: (value: BirthDate) => void;
}

// 미래 날짜를 고르지 못하도록 오늘을 상한으로 잡는다
const TODAY = new Date();
const MAX_YEAR = TODAY.getFullYear();
const MIN_YEAR = MAX_YEAR - 120;

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function toOptions(values: number[], pad = false): WheelOption[] {
  return values.map((value) => ({
    value,
    label: pad ? String(value).padStart(2, "0") : String(value),
  }));
}

// 해당 연·월의 마지막 날 (윤년 자동 반영)
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function BirthDateStep({ value, onChange }: BirthDateStepProps) {
  const { t } = useTranslation();

  const yearOptions = useMemo(
    () => toOptions(range(MIN_YEAR, MAX_YEAR)),
    [],
  );

  const monthOptions = useMemo(() => toOptions(range(1, 12), true), []);

  const dayOptions = useMemo(
    () => toOptions(range(1, getDaysInMonth(value.year, value.month)), true),
    [value.year, value.month],
  );

  // 3월 31일에서 2월로 바꾸는 경우처럼 없는 날짜가 되면 마지막 날로 당긴다
  const update = (partial: Partial<BirthDate>) => {
    const next = { ...value, ...partial };
    const lastDay = getDaysInMonth(next.year, next.month);

    onChange({ ...next, day: Math.min(next.day, lastDay) });
  };

  return (
    <div className="flex w-full flex-col gap-10">
      <WheelPicker
        label={t("birthDate.day")}
        options={dayOptions}
        value={value.day}
        onChange={(day) => update({ day })}
      />
      <WheelPicker
        label={t("birthDate.month")}
        options={monthOptions}
        value={value.month}
        onChange={(month) => update({ month })}
      />
      <WheelPicker
        label={t("birthDate.year")}
        options={yearOptions}
        value={value.year}
        onChange={(year) => update({ year })}
      />
    </div>
  );
}

export default BirthDateStep;

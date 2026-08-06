import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { verifyBirthDate } from "@/apis/auth";
import Button from "@/components/Button/Button";
import Card from "@/components/Card/Card";
import Select from "@/components/Select/Select";

function toOptions(values: number[], pad = false) {
  return values.map((value) => ({
    value: String(value),
    label: pad ? String(value).padStart(2, "0") : String(value),
  }));
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

/** 환자가 미래 날짜를 고를 수 없도록 오늘을 상한으로 잡는다. */
const TODAY = new Date();
const MAX_YEAR = TODAY.getFullYear();
const MIN_YEAR = MAX_YEAR - 120;

function AuthVerifyPage() {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [hasMismatch, setHasMismatch] = useState(false);

  const yearOptions = useMemo(
    () => toOptions(range(MIN_YEAR, MAX_YEAR).reverse()),
    [],
  );

  const monthOptions = useMemo(() => {
    const lastMonth =
      Number(year) === MAX_YEAR ? TODAY.getMonth() + 1 : 12;
    return toOptions(range(1, lastMonth), true);
  }, [year]);

  const dayOptions = useMemo(() => {
    if (!year || !month) return toOptions(range(1, 31), true);

    const isCurrentMonth =
      Number(year) === MAX_YEAR && Number(month) === TODAY.getMonth() + 1;
    const daysInMonth = new Date(Number(year), Number(month), 0).getDate();

    return toOptions(
      range(1, isCurrentMonth ? TODAY.getDate() : daysInMonth),
      true,
    );
  }, [year, month]);

  const isComplete = Boolean(year && month && day);

  const handleYearChange = (value: string) => {
    setYear(value);
    setMonth("");
    setDay("");
    setHasMismatch(false);
  };

  const handleMonthChange = (value: string) => {
    setMonth(value);
    setDay("");
    setHasMismatch(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const birthDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

    if (verifyBirthDate(birthDate)) {
      navigate("/");
      return;
    }

    setHasMismatch(true);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
      <h1 className="text-base font-semibold text-[#1F2937]">{t("title")}</h1>
      <p className="text-xs text-[#1F2937]">{t("description")}</p>

      <Card>
        <h2 className="text-xs text-[#1F2937]">{t("birthDate.label")}</h2>

        <div className="flex flex-wrap gap-2">
          <Select
            variant="chip"
            aria-label={t("birthDate.year")}
            placeholder={t("birthDate.year")}
            options={yearOptions}
            value={year}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            handleYearChange(event.target.value)
          }
          />
          <Select
            variant="chip"
            aria-label={t("birthDate.month")}
            placeholder={t("birthDate.month")}
            options={monthOptions}
            value={month}
            disabled={!year}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            handleMonthChange(event.target.value)
          }
          />
          <Select
            variant="chip"
            aria-label={t("birthDate.day")}
            placeholder={t("birthDate.day")}
            options={dayOptions}
            value={day}
            disabled={!month}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              setDay(event.target.value);
              setHasMismatch(false);
            }}
          />
        </div>

        {hasMismatch && (
          <p role="alert" className="text-[10px] text-red-600">
            {t("error.mismatch")}
          </p>
        )}

        <Button type="submit" disabled={!isComplete} className="self-start">
          {t("submit")}
        </Button>
      </Card>
    </form>
  );
}

export default AuthVerifyPage;

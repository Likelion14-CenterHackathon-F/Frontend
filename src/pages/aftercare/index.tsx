import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { RECOVERY_PHASES, getPatientCase } from "@/apis/patient";
import logoDark from "@/assets/logo-dark.svg";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import {
  getDayOffset,
  getPhaseStartDate,
  getPhaseStatus,
  getWeekAround,
} from "@/utils/aftercare";
import {
  formatMonthDay,
  formatNumericDate,
  formatWeekday,
  formatYearMonth,
  parseCalendarDate,
} from "@/utils/dateTime";

import AlertCard from "./components/AlertCard";
import NoticeFooter from "./components/NoticeFooter";
import PhaseSummaryCard from "./components/PhaseSummaryCard";
import PhaseTimeline, {
  type TimelinePhase,
} from "./components/PhaseTimeline";
import ReportCard from "./components/ReportCard";
import WeekStrip from "./components/WeekStrip";

function AftercarePage() {
  const { t } = useTranslation("aftercare");
  const navigate = useNavigate();

  const locale = usePreferencesStore((state) => state.locale);

  const [isExpanded, setIsExpanded] = useState(false);

  const today = useMemo(() => new Date(), []);
  const patientCase = useMemo(() => getPatientCase(), []);
  const dayOffset = getDayOffset(patientCase.procedureDate);

  // 오늘을 세 번째 칸에 두는 시안 배치
  const weekDays = useMemo(
    () => getWeekAround(today, { before: 2, after: 4 }),
    [today],
  );

  const currentPhase =
    RECOVERY_PHASES.find(
      (phase) => getPhaseStatus(phase, dayOffset) === "current",
    ) ?? RECOVERY_PHASES[0];

  const timelinePhases: TimelinePhase[] = RECOVERY_PHASES.map((phase) => {
    const startsAt = getPhaseStartDate(patientCase.procedureDate, phase);
    const isCurrent = phase.id === currentPhase.id;

    return {
      id: phase.id,
      label: t(`phases.${phase.id}.label`),
      range: t(`phases.${phase.id}.range`),
      items: t(`phases.${phase.id}.items`, { returnObjects: true }) as string[],
      // 현재 단계 칩만 오늘 날짜를 가리킨다
      day: isCurrent ? today.getDate() : startsAt.getDate(),
      weekday: formatWeekday(isCurrent ? today : startsAt, locale),
      isCurrent,
    };
  });

  return (
    <div className="bg-care-bg flex min-h-dvh flex-col">
      <div className="rounded-b-[28px] bg-neutral-white pb-8 shadow-[0_0_8px_0_rgba(0,0,0,0.06)]">
        <header className="flex items-center gap-3 px-5 pt-4.5">
          <img aria-hidden src={logoDark} alt="" className="size-7" />
          <span className="text-heading text-text-01 font-semibold">
            Kanage
          </span>
        </header>

        <div className="mt-4 flex items-start justify-between px-5">
          <h1 className="text-care-title text-[1.75rem] leading-[1.25] font-semibold tracking-tight">
            {t("dayCount", { day: dayOffset })}
          </h1>

          <div className="text-right">
            <p className="text-care-date text-body font-semibold tracking-tight">
              {formatMonthDay(today, locale)}
            </p>
            <p className="text-care-year text-body font-semibold tracking-tight">
              {today.getFullYear()}
            </p>
          </div>
        </div>

        <div className="mt-7">
          <WeekStrip days={weekDays} today={today} locale={locale} />
        </div>

        <div className="mt-9.5">
          <PhaseSummaryCard
            label={t(`phases.${currentPhase.id}.label`)}
            headline={t(`phases.${currentPhase.id}.headline`)}
            procedureDate={formatNumericDate(
              parseCalendarDate(patientCase.procedureDate),
              locale,
            )}
            procedureName={patientCase.procedureName}
            isExpanded={isExpanded}
            toggleLabel={t(isExpanded ? "toggle.collapse" : "toggle.expand")}
            onToggle={() => setIsExpanded((expanded) => !expanded)}
          />
        </div>

        {isExpanded && (
          <>
            <PhaseTimeline
              phases={timelinePhases}
              monthLabel={formatYearMonth(today, locale)}
            />
            <AlertCard
              title={t("alert.title")}
              items={t("alert.items", { returnObjects: true }) as string[]}
            />
          </>
        )}

        <div className="mt-7.5 px-5">
          <ReportCard
            label={t("report.label")}
            title={t("report.title")}
            description={t("report.description")}
            onClick={() => navigate("/aftercare/report")}
          />
        </div>
      </div>

      <NoticeFooter
        title={t("notice.title")}
        items={t("notice.items", { returnObjects: true }) as string[]}
      />
    </div>
  );
}

export default AftercarePage;

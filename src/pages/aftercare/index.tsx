import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { RECOVERY_PHASES, getPatientCase } from "@/apis/patient";
import backButton from "@/assets/back-button.svg";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import { getDayOffset, getPhaseStatus, getWeekAround } from "@/utils/aftercare";
import {
  formatMonthDay,
  formatShortDate,
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

  const timelinePhases: TimelinePhase[] = RECOVERY_PHASES.map((phase) => ({
    id: phase.id,
    label: t(`phases.${phase.id}.headline`),
    range: t(`phases.${phase.id}.range`),
    items: t(`phases.${phase.id}.items`, { returnObjects: true }) as string[],
    isCurrent: phase.id === currentPhase.id,
  }));

  return (
    <div className="bg-care-bg relative flex min-h-dvh flex-col overflow-hidden">
      {/* 헤더와 경과일 뒤에 흐리게 번지는 장식. 카드 배치에는 관여하지 않는다 */}
      <div
        aria-hidden
        className="bg-care-glow pointer-events-none absolute -top-16.75 left-1/2 h-61.5 w-123.5 -translate-x-1/2 rounded-full opacity-60 blur-[52px]"
      />

      <header className="relative flex items-center px-5 pt-4.5">
        <button
          type="button"
          aria-label={t("back")}
          onClick={() => navigate("/home")}
          className="flex size-14 items-center justify-center"
        >
          <img aria-hidden src={backButton} alt="" className="size-14" />
        </button>

        <h1 className="text-care-title absolute left-1/2 -translate-x-1/2 text-body font-semibold tracking-tight">
          {t("pageTitle")}
        </h1>
      </header>

      <div className="relative mt-11 flex items-start justify-between px-5">
        <h2 className="text-care-title text-[1.75rem] leading-[1.25] font-semibold tracking-tight">
          {t("dayCount", { day: dayOffset })}
        </h2>

        <div className="text-right">
          <p className="text-care-date text-body font-semibold tracking-tight">
            {formatMonthDay(today, locale)}
          </p>
          <p className="text-care-year text-body font-semibold tracking-tight">
            {today.getFullYear()}
          </p>
        </div>
      </div>

      <div className="relative mt-7">
        <WeekStrip days={weekDays} today={today} locale={locale} />
      </div>

      <div className="relative mt-9.5 px-5">
        <PhaseSummaryCard
          label={t(`phases.${currentPhase.id}.label`)}
          headline={t(`phases.${currentPhase.id}.headline`)}
          procedureDate={formatShortDate(
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
        <div className="relative">
          <PhaseTimeline
            phases={timelinePhases}
            todayLabel={t("today")}
            todayDate={formatMonthDay(today, locale)}
          />
          <AlertCard
            title={t("alert.title")}
            items={t("alert.items", { returnObjects: true }) as string[]}
          />
        </div>
      )}

      <div className="relative mt-7.5 mb-8 px-5">
        <ReportCard
          label={t("report.label")}
          title={t("report.title")}
          description={t("report.description")}
          onClick={() => navigate("/aftercare/report")}
        />
      </div>

      <NoticeFooter
        title={t("notice.title")}
        items={t("notice.items", { returnObjects: true }) as string[]}
      />
    </div>
  );
}

export default AftercarePage;

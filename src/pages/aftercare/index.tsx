import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getAftercareDashboard } from "@/apis/patient";
import backButton from "@/assets/back-button.svg";
import gradientTop from "@/assets/home-gradient-top.png";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import { getWeekAround } from "@/utils/aftercare";
import {
  formatMonthDay,
  formatShortDate,
  parseCalendarDate,
} from "@/utils/dateTime";

import AlertCard from "./components/AlertCard";
import NoticeFooter from "./components/NoticeFooter";
import PhaseSummaryCard from "./components/PhaseSummaryCard";
import PhaseTimeline, { type TimelinePhase } from "./components/PhaseTimeline";
import ReportCard from "./components/ReportCard";
import WeekStrip from "./components/WeekStrip";

function AftercarePage() {
  const { t } = useTranslation("aftercare");
  const navigate = useNavigate();

  const locale = usePreferencesStore((state) => state.locale);

  const [isExpanded, setIsExpanded] = useState(false);

  const today = useMemo(() => new Date(), []);

  const { data: dashboard } = useQuery({
    queryKey: ["aftercare", "dashboard"],
    queryFn: getAftercareDashboard,
  });

  const dayOffset = dashboard?.caseStatus.currentDay ?? 0;
  const procedureDate = dashboard?.caseStatus.procedureDate ?? null;
  const procedureName = dashboard?.caseStatus.procedureName ?? "";
  const recoveryGuides = dashboard?.recoveryGuides ?? [];
  const redFlagItems = dashboard?.redFlags.items ?? [];

  // 오늘을 세 번째 칸에 배치
  const weekDays = useMemo(
    () => getWeekAround(today, { before: 1, after: 5 }),
    [today],
  );

  const currentGuide =
    recoveryGuides.find((guide) => guide.status === "CURRENT") ??
    recoveryGuides[0];

  // 단계명·가이드 문구는 서버가 내려주는 값 그대로 쓴다(현재 한국어만 제공).
  // 구간 표시만 startDay/endDay로 프론트에서 locale에 맞춰 조립한다.
  const timelinePhases: TimelinePhase[] = recoveryGuides.map((guide) => ({
    id: String(guide.stageGuideId),
    label: guide.recoveryStage,
    range:
      guide.endDay === null
        ? t("stageRangeOpen", { from: guide.startDay })
        : t("stageRange", { from: guide.startDay, to: guide.endDay }),
    items: guide.guideItems,
    isCurrent: guide.status === "CURRENT",
  }));

  return (
    <div className="bg-care-bg relative flex min-h-dvh flex-col overflow-hidden">
      {/* 헤더와 경과일 뒤에 흐리게 번지는 장식. 홈 화면과 같은 그라데이션을 재사용한다 */}
      <img
        aria-hidden
        src={gradientTop}
        alt=""
        className="pointer-events-none absolute left-1/2 max-w-none -translate-x-1/2"
        style={{ top: -202, width: 650, height: 650 }}
      />

      <header className="relative flex items-center px-5 pt-4.5">
        <button
          type="button"
          aria-label={t("back")}
          onClick={() => navigate("/home")}
          className="flex size-14 items-center justify-center"
        >
          <img aria-hidden src={backButton} alt="" className="size-6" />
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
          label={currentGuide?.recoveryStage ?? ""}
          headline={currentGuide?.recoveryStage ?? ""}
          procedureDate={
            procedureDate
              ? formatShortDate(parseCalendarDate(procedureDate), locale)
              : ""
          }
          procedureName={procedureName}
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
          <AlertCard title={t("alert.title")} items={redFlagItems} />
        </div>
      )}

      <div className="relative mt-7.5 mb-8 px-5">
        <ReportCard
          label={t("report.label")}
          title={t("report.title")}
          description={t("report.description")}
          onClick={() => navigate("/aftercare/emergency-report")}
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

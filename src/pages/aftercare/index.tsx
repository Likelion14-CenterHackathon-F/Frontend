import { useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { RECOVERY_PHASES, getPatientCase } from "@/apis/patient";
import homeIcon from "@/assets/home.svg";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import { getDayOffset, getPhaseStatus, type PhaseStatus } from "@/utils/aftercare";
import { formatDate, parseCalendarDate } from "@/utils/dateTime";
import { cn } from "@/utils/cn";

const phaseStyles: Record<
  PhaseStatus,
  { container: string; title: string; description: string }
> = {
  past: {
    container: "border border-[#E2E8F0] bg-white",
    title: "text-[#94A3B8]",
    description: "text-[#94A3B8]",
  },
  current: {
    container: "border-2 border-[#3B82F6] bg-[#F0F7FF]",
    title: "text-[#1D4ED8]",
    description: "text-[#1E3A8A]",
  },
  upcoming: {
    container: "border border-[#E2E8F0] bg-white",
    title: "text-[#64748B]",
    description: "text-[#64748B]",
  },
};

interface StatusItemProps {
  label: string;
  children: React.ReactNode;
}

function StatusItem({ label, children }: StatusItemProps) {
  return (
    <div className="flex flex-1 flex-col items-center gap-1">
      <span className="text-xs text-[#64748B]">{label}</span>
      {children}
    </div>
  );
}

function AftercarePage() {
  const { t } = useTranslation("aftercare");
  const navigate = useNavigate();
  const locale = usePreferencesStore((state) => state.locale);

  const patientCase = useMemo(() => getPatientCase(), []);
  const dayOffset = getDayOffset(patientCase.procedureDate);
  const redFlags = t("redFlags.items", { returnObjects: true }) as string[];

  return (
    <div className="flex flex-col gap-5 p-6">
      <button
        type="button"
        onClick={() => navigate("/")}
        aria-label={t("home")}
        className="w-6"
      >
        <img src={homeIcon} alt="" className="size-6" />
      </button>

      <h1 className="text-xl font-bold text-[#1E293B]">{t("title")}</h1>

      <p className="rounded-xl bg-[#F1F5F9] px-4 pt-5 pb-4 text-[13px] leading-[19.5px] text-[#64748B]">
        {t("disclaimer")}
      </p>

      <section className="flex flex-col gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 pt-5 pb-4">
        <h2 className="text-base font-bold text-[#334155]">
          {t("caseStatus.title")}
        </h2>

        <p className="text-[13px] text-[#64748B]">
          <Trans
            t={t}
            i18nKey="caseStatus.greeting"
            values={{ name: patientCase.name }}
            components={[<span className="font-bold text-[#0F172A]" />]}
          />
        </p>

        <div className="flex justify-center gap-2">
          <StatusItem label={t("caseStatus.procedureName")}>
            <span className="text-sm font-bold text-[#1E293B]">
              {patientCase.procedureName}
            </span>
          </StatusItem>

          <StatusItem label={t("caseStatus.procedureDate")}>
            <span className="text-sm font-bold text-[#1E293B]">
              {formatDate(
                parseCalendarDate(patientCase.procedureDate),
                locale,
              )}
            </span>
          </StatusItem>

          <StatusItem label={t("caseStatus.cautionPeriod")}>
            <span className="w-full rounded border border-[#BFDBFE] bg-[#EFF6FF] px-2 py-1.5 text-center text-[12.8px] font-bold text-[#2563EB]">
              {t("caseStatus.cautionValue", {
                day: dayOffset,
                total: patientCase.cautionDays,
              })}
            </span>
          </StatusItem>
        </div>
      </section>

      <section className="flex flex-col gap-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 pt-4 pb-6">
        <h2 className="text-base font-bold text-[#334155]">
          {t("summary.title")}
        </h2>

        {RECOVERY_PHASES.map((phase) => {
          const status = getPhaseStatus(phase, dayOffset);
          const style = phaseStyles[status];

          return (
            <article
              key={phase.id}
              className={cn(
                "flex flex-col gap-1.5 rounded-lg p-3.5",
                style.container,
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className={cn("text-sm font-bold", style.title)}>
                  {t(`phases.${phase.id}.title`)}
                </h3>

                {status === "current" && (
                  <span className="rounded-[10px] bg-[#3B82F6] px-1.5 py-1 text-[11px] font-bold text-white">
                    {t("summary.currentTag")}
                  </span>
                )}
              </div>

              <p
                className={cn(
                  "text-[13px] leading-[19.5px] whitespace-pre-line",
                  style.description,
                )}
              >
                {t(`phases.${phase.id}.description`)}
              </p>
            </article>
          );
        })}
      </section>

      <section className="flex flex-col gap-3 rounded-xl border border-[#FECACA] bg-[#FEF2F2] p-4">
        <h2 className="text-base font-bold text-[#DC2626]">
          {t("redFlags.title")}
        </h2>

        <ul className="flex flex-col gap-2">
          {redFlags.map((item) => (
            <li key={item} className="text-[13px] text-[#450A0A]">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-3 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-4">
        <h2 className="text-base font-bold text-[#334155]">
          {t("report.title")}
        </h2>

        <p className="rounded-md border border-dashed border-[#CBD5E1] bg-white p-3 text-[13px] leading-[19.5px] text-[#64748B]">
          {t("report.description")}
        </p>

        <button
          type="button"
          onClick={() => navigate("/aftercare/emergency-report")}
          className="rounded-lg border border-[#94A3B8] bg-white px-3 pt-3 pb-4 text-sm font-bold text-[#334155]"
        >
          {t("report.detail")}
        </button>
      </section>
    </div>
  );
}

export default AftercarePage;

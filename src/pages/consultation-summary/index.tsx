import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { getPatientCase } from "@/apis/patient";
import closeIcon from "@/assets/icons/consultation-summary/close.svg";
import ConsultationFooter from "@/components/Footer/ConsultationFooter";
import LoadingState from "@/components/Loading/LoadingState";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import {
  formatConsultationCardDateTime,
  formatZonedDate,
} from "@/utils/dateTime";
import { translateConsultationSubject } from "@/utils/consultationSubject";
import { useConsultationHistory } from "@/pages/consultation-hub/hooks/useConsultationHistory";

import AiSummarySection from "./components/AiSummarySection";
import ConsultationReasonCard from "./components/ConsultationReasonCard";
import MedicalInstructionsCard from "./components/MedicalInstructionsCard";
import SummaryOverview from "./components/SummaryOverview";
import { useConsultationSummary } from "./hooks/useConsultationSummary";
import { usePreconsultSubmission } from "./hooks/usePreconsultSubmission";
import { toSummaryRequestLanguage } from "./utils/consultationSummary";

function ConsultationSummaryPage() {
  const navigate = useNavigate();
  const { summaryId: summaryIdParam } = useParams();
  const { t } = useTranslation([
    "consultationSummary",
    "consultationReservation",
  ]);
  const { locale, timeZone } = usePreferencesStore();
  const summaryId = Number(summaryIdParam);
  const language = toSummaryRequestLanguage(locale);
  const patientCase = useMemo(() => getPatientCase(), []);
  const {
    data: summary,
    isPending,
    isError,
    refetch,
  } = useConsultationSummary(summaryId, language);
  const { data: history = [] } = useConsultationHistory();

  const consultationHistory = summary
    ? history.find((item) => item.sessionId === summary.sessionId)
    : undefined;
  const { data: preconsultSubmission } = usePreconsultSubmission(
    consultationHistory?.appointmentId ?? 0,
  );
  const symptomCategories = preconsultSubmission?.symptomCategories?.length
    ? preconsultSubmission.symptomCategories
    : preconsultSubmission?.symptomCategory
      ? [preconsultSubmission.symptomCategory]
      : consultationHistory?.symptomCategories?.length
        ? consultationHistory.symptomCategories
        : consultationHistory?.symptomCategory
          ? [consultationHistory.symptomCategory]
          : [];
  const subject = translateConsultationSubject(
    symptomCategories.join(" · ") || null,
    (key) =>
      t(`preConsultation.symptoms.options.${key}`, {
        ns: "consultationReservation",
      }),
  );

  if (!isPending && (isError || !summary)) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-[#F6F6F9] px-5 text-center text-sm text-[#65646D]">
        <p>{t("error", { ns: "consultationSummary" })}</p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="rounded-full bg-[#2A2A2A] px-5 py-3 font-semibold text-white"
        >
          {t("retry", { ns: "consultationSummary" })}
        </button>
      </div>
    );
  }

  const consultationDate = summary
    ? formatZonedDate(summary.consultedAt, {
        locale,
        timeZone,
      })
    : "";
  const appointmentDateTime = consultationHistory?.appointmentStartsAt
    ? formatConsultationCardDateTime(consultationHistory.appointmentStartsAt, {
        locale,
        timeZone,
      })
    : "-";
  const reasonDescription =
    preconsultSubmission?.symptomNote ||
    consultationHistory?.symptomNote ||
    summary?.consultationDetails;

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#F6F6F9] text-[#32303A] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_82%_8%,rgba(222,219,248,0.82),transparent_34%),radial-gradient(circle_at_15%_55%,rgba(237,234,252,0.9),transparent_42%),radial-gradient(circle_at_90%_88%,rgba(225,222,246,0.68),transparent_36%)]">
      <header className="relative z-10 flex h-[66px] justify-end items-center px-5 pt-[env(safe-area-inset-top)]">
        <button
          type="button"
          aria-label={t("close", { ns: "consultationSummary" })}
          onClick={() => navigate("/consultation", { replace: true })}
          className="flex size-8 items-center justify-center"
        >
          <img src={closeIcon} alt="" className="size-6" />
        </button>
      </header>

      <main className="relative z-10 px-5 pb-[calc(132px+env(safe-area-inset-bottom))] pt-5">
        {isPending ? (
          <LoadingState
            variant="section"
            className="-mx-5 min-h-[calc(100dvh-91px)]"
            message={t("loading", { ns: "consultationSummary" })}
          />
        ) : summary ? (
          <>
        <SummaryOverview
          consultationDate={consultationDate}
          hospitalName={t("overview.hospital", { ns: "consultationSummary" })}
          appointmentDateTime={appointmentDateTime}
          consultationReason={subject}
          medicalStaffName={summary.medicalStaffName}
          ownerText={t("overview.owner", {
            ns: "consultationSummary",
            name: patientCase.name,
          })}
          titleText={t("overview.title", { ns: "consultationSummary" })}
          labels={{
            appointmentDateTime: t("overview.appointmentDateTime", {
              ns: "consultationSummary",
            }),
            consultationReason: t("overview.consultationReason", {
              ns: "consultationSummary",
            }),
            medicalStaff: t("overview.medicalStaff", {
              ns: "consultationSummary",
            }),
          }}
        />

        <div className="mt-10.5 h-px bg-[#E4E3E8]" />

        <AiSummarySection
          title={t("aiTitle", { ns: "consultationSummary" })}
          summary={summary.translatedSummary}
        />

        {summary.instructions.length > 0 && (
          <MedicalInstructionsCard
            title={t("instructions.title", { ns: "consultationSummary" })}
            instructions={summary.instructions}
          />
        )}

        <ConsultationReasonCard
          heading={t("reason.title", { ns: "consultationSummary" })}
          title={
            subject === "-"
              ? t("reason.emptyTitle", { ns: "consultationSummary" })
              : subject
          }
          description={
            reasonDescription ||
            t("reason.emptyDescription", { ns: "consultationSummary" })
          }
          fileUrls={preconsultSubmission?.files.map((file) => file.fileUrl)}
          mediaLabel={t("reason.submissionMedia", {
            ns: "consultationSummary",
          })}
        />
          </>
        ) : null}
      </main>

      {summary && (
        <ConsultationFooter
          onClick={() => navigate("/home", { replace: true })}
          className="bg-transparent bg-gradient-to-b from-white/0 to-white/70 backdrop-blur-[4.7px]"
        >
          {t("home", { ns: "consultationSummary" })}
        </ConsultationFooter>
      )}
    </div>
  );
}

export default ConsultationSummaryPage;

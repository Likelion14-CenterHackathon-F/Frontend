import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";

import ConsultationFooter from "@/components/Footer/ConsultationFooter";
import ConsultationHeader from "@/components/Header/ConsultationHeader";
import { useConsultationReservationStore } from "@/stores/useConsultationReservationStore";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import { formatConfirmedDateTime } from "@/utils/dateTime";

import ConfirmedConsultationInfo from "./components/ConfirmedConsultationInfo";
import ConsultationEntryNotice from "./components/ConsultationEntryNotice";

function ConsultationConfirmedPage() {
  const navigate = useNavigate();
  const { t } = useTranslation("consultationReservation");
  const locale = usePreferencesStore((state) => state.locale);
  const timeZone = usePreferencesStore((state) => state.timeZone);
  const selectedSlot = useConsultationReservationStore(
    (state) => state.selectedSlot,
  );
  const selectedSymptoms = useConsultationReservationStore(
    (state) => state.selectedSymptoms,
  );

  if (!selectedSlot) {
    return <Navigate to="/consultations/reservation/schedule" replace />;
  }

  const scheduledAt = formatConfirmedDateTime(selectedSlot.startsAt, {
    locale,
    timeZone,
  });
  const symptoms = selectedSymptoms
    .map((symptom) => t(`preConsultation.symptoms.options.${symptom}`))
    .join(" · ");

  const handleOpenCancellation = () => {
    // 다음 단계에서 예약 취소 BottomSheet를 연결합니다.
  };

  return (
    <div className="flex min-h-dvh flex-col bg-surface-footer">
      <ConsultationHeader title="" onBack={() => navigate("/consultations")} />

      <main className="flex-1 px-5 pb-[calc(110px+env(safe-area-inset-bottom))] pt-6">
        <h1 className="text-calendar-text text-2xl font-bold leading-[1.4] tracking-tight">
          {t("confirmed.title")}
        </h1>
        <p className="mt-1.5 text-xl font-semibold leading-[1.4] tracking-tight text-primary">
          {scheduledAt}
        </p>

        <div className="mt-6">
          <ConsultationEntryNotice message={t("confirmed.entryNotice")} />
        </div>

        <section className="mt-13">
          <h2 className="text-calendar-text text-xl font-semibold leading-[1.4] tracking-tight">
            {t("confirmed.infoTitle")}
          </h2>
          <ConfirmedConsultationInfo
            dateLabel={t("confirmed.summary.date")}
            dateValue={scheduledAt}
            reasonLabel={t("confirmed.summary.reason")}
            reasonValue={symptoms || "-"}
            doctorLabel={t("confirmed.summary.doctor")}
            doctorValue={t("confirmed.mockDoctor")}
          />
        </section>
      </main>

      <ConsultationFooter variant="danger" onClick={handleOpenCancellation}>
        {t("confirmed.cancel")}
      </ConsultationFooter>
    </div>
  );
}

export default ConsultationConfirmedPage;

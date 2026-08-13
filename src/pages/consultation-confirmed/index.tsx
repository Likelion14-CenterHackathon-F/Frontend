import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";

import ConsultationFooter from "@/components/Footer/ConsultationFooter";
import ConsultationHeader from "@/components/Header/ConsultationHeader";
import { useConsultationReservationStore } from "@/stores/useConsultationReservationStore";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import { formatConfirmedDateTime } from "@/utils/dateTime";

import ConfirmedConsultationInfo from "./components/ConfirmedConsultationInfo";
import ConsultationCancelSheet from "./components/ConsultationCancelSheet";
import ConsultationEntryNotice from "./components/ConsultationEntryNotice";

function ConsultationConfirmedPage() {
  const [isCancelSheetOpen, setIsCancelSheetOpen] = useState(false);
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
  const resetReservation = useConsultationReservationStore(
    (state) => state.reset,
  );

  if (!selectedSlot) {
    return <Navigate to="/consultation/reservation/schedule" replace />;
  }

  const scheduledAt = formatConfirmedDateTime(selectedSlot.startsAt, {
    locale,
    timeZone,
  });
  const symptoms = selectedSymptoms
    .map((symptom) => t(`preConsultation.symptoms.options.${symptom}`))
    .join(" · ");

  const handleConfirmCancellation = () => {
    // 예약 취소 API 성공 후 실행합니다.
    resetReservation();
    navigate("/consultation", { replace: true });
  };

  return (
    <div className="flex min-h-dvh flex-col bg-surface-footer">
      <ConsultationHeader title="" onBack={() => navigate("/consultation")} />

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

      <ConsultationFooter
        variant="danger"
        onClick={() => setIsCancelSheetOpen(true)}
      >
        {t("confirmed.cancel")}
      </ConsultationFooter>

      <ConsultationCancelSheet
        open={isCancelSheetOpen}
        onClose={() => setIsCancelSheetOpen(false)}
        onConfirm={handleConfirmCancellation}
      />
    </div>
  );
}

export default ConsultationConfirmedPage;

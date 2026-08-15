import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import ConsultationHeader from "@/components/Header/ConsultationHeader";
import ConsultationTabs from "./components/ConsultationTabs";
import ConsultationGuide from "./components/ConsultationGuide";
import ConsultationHistoryList from "./components/ConsultationHistoryList";
import ConsultationReservationList from "./components/ConsultationReservationList";
import ConsultationFooter from "@/components/Footer/ConsultationFooter";
import { useNavigate } from "react-router-dom";
import { useActiveConsultationAppointment } from "./hooks/useActiveConsultationAppointment";
import type { Consultation } from "./components/ConsultationCard";

type ConsultationTab = "history" | "ongoing";
const MOCK_CASE_ID = 1;

const missingAppointmentData = {
  medicalStaffName: "박지태",
  medicalStaffRole: "doctor" as const,
  subject: "붓기·멍",
};

function ConsultationHubPage() {
  const navigate = useNavigate();
  const { t } = useTranslation("consultationHub");
  const [activeTab, setActiveTab] = useState<ConsultationTab>("history");
  const {
    data: activeAppointmentData,
    isPending: isAppointmentPending,
    isError: isAppointmentError,
    refetch: refetchAppointment,
  } = useActiveConsultationAppointment(MOCK_CASE_ID);

  const activeAppointment = activeAppointmentData?.appointment ?? null;
  const ongoingConsultations = useMemo<Consultation[]>(
    () =>
      activeAppointmentData?.hasAppointment && activeAppointment
        ? [
            {
              id: activeAppointment.appointmentId,
              status: "reserved",
              scheduledAt: activeAppointment.startsAt,
              ...missingAppointmentData,
            },
          ]
        : [],
    [activeAppointment, activeAppointmentData?.hasAppointment],
  );

  const handleEnterWaitingRoom = () => {
    if (!activeAppointment?.canEnterWaitingRoom) return;
    navigate(
      `/consultation/${activeAppointment.appointmentId}/waiting?role=PATIENT`,
    );
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <ConsultationHeader
        title={t("header.title")}
        onBack={() => navigate("/home")}
      />

      <main className="bg-surface-soft flex flex-1 flex-col pb-[calc(90px+env(safe-area-inset-bottom))]">
        <section>
          <ConsultationTabs
            activeTab={activeTab}
            ongoingCount={ongoingConsultations.length}
            onChange={setActiveTab}
          />

          {activeTab === "history" ? (
            <ConsultationHistoryList consultations={[]} />
          ) : (
            <ConsultationReservationList
              consultations={ongoingConsultations}
              isLoading={isAppointmentPending}
              isError={isAppointmentError}
              onRetry={() => void refetchAppointment()}
            />
          )}
        </section>
        <section className="bg-[#E9E9EF] px-5 py-[26px]">
          <ConsultationGuide />
        </section>
      </main>

      <ConsultationFooter
        disabled={
          activeTab !== "ongoing" || !activeAppointment?.canEnterWaitingRoom
        }
        onClick={handleEnterWaitingRoom}
      >
        {t("footer.enter")}
      </ConsultationFooter>
    </div>
  );
}

export default ConsultationHubPage;

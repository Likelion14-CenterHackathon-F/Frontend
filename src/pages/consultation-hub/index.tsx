import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import ConsultationFooter from "@/components/Footer/ConsultationFooter";
import ConsultationHeader from "@/components/Header/ConsultationHeader";
import type { Consultation } from "./components/ConsultationCard";
import ConsultationGuide from "./components/ConsultationGuide";
import ConsultationHistoryList from "./components/ConsultationHistoryList";
import ConsultationReservationList from "./components/ConsultationReservationList";
import ConsultationTabs from "./components/ConsultationTabs";
import { useActiveConsultationAppointment } from "./hooks/useActiveConsultationAppointment";

type ConsultationTab = "history" | "ongoing";
const MOCK_CASE_ID = 1;

const mockMedicalStaff = {
  medicalStaffName: "박지태",
  medicalStaffRole: "doctor" as const,
};

function ConsultationHubPage() {
  const navigate = useNavigate();
  const { t } = useTranslation("consultationHub");
  const [activeTab, setActiveTab] = useState<ConsultationTab>("history");
  const {
    data: activeAppointments = [],
    isPending: isAppointmentPending,
    isError: isAppointmentError,
    refetch: refetchAppointment,
  } = useActiveConsultationAppointment(MOCK_CASE_ID);

  const ongoingConsultations = useMemo<Consultation[]>(
    () =>
      activeAppointments.map((appointment) => ({
        id: appointment.appointmentId,
        status: "reserved",
        scheduledAt: appointment.startsAt,
        subject: appointment.symptomCategories.join(" · ") || "-",
        symptomNote: appointment.symptomNote,
        ...mockMedicalStaff,
      })),
    [activeAppointments],
  );

  const enterableAppointment = activeAppointments.find(
    (appointment) => appointment.canEnterWaitingRoom,
  );

  const handleEnterWaitingRoom = () => {
    if (!enterableAppointment) return;
    navigate(
      `/consultation/${enterableAppointment.appointmentId}/waiting?role=PATIENT`,
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
        disabled={activeTab !== "ongoing" || !enterableAppointment}
        onClick={handleEnterWaitingRoom}
      >
        {t("footer.enter")}
      </ConsultationFooter>
    </div>
  );
}

export default ConsultationHubPage;

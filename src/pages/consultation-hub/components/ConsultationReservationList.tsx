import type { Consultation } from "./ConsultationCard";
import ConsultationCard from "./ConsultationCard";
import ConsultationNotice from "./ConsultationNotice";
import EmptyConsultation from "./EmptyConsultation";
import { useTranslation } from "react-i18next";

interface ConsultationReservationListProps {
  consultations: Consultation[];
}

function ConsultationReservationList({
  consultations,
}: ConsultationReservationListProps) {
  const { t } = useTranslation("consultationHub");

  if (consultations.length === 0) {
    return <EmptyConsultation />;
  }

  return (
    <div className="min-h-[640px] overflow-y-auto bg-[#F4F4F8] px-5 pb-6 pt-5">
      <h2 className="text-xl font-semibold leading-[1.4] tracking-[-0.5px] text-[#32303A]">
        {t("reservation.sectionTitle")}
      </h2>

      <ul className="mt-5 flex flex-col gap-4">
        {consultations.map((consultation) => (
          <ConsultationCard key={consultation.id} consultation={consultation} />
        ))}
      </ul>

      <ConsultationNotice />
    </div>
  );
}

export default ConsultationReservationList;

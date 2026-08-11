import type { Consultation } from "./ConsultationCard";
import ConsultationCard from "./ConsultationCard";
import ConsultationNotice from "./ConsultationNotice";
import EmptyConsultation from "./EmptyConsultation";

interface ConsultationReservationListProps {
  consultations: Consultation[];
}

function ConsultationReservationList({
  consultations,
}: ConsultationReservationListProps) {
  if (consultations.length === 0) {
    return <EmptyConsultation />;
  }

  return (
    <div className="min-h-[640px] overflow-y-auto bg-[#F4F4F8] px-5 pb-6 pt-5">
      <h2 className="text-xl font-semibold leading-[1.4] tracking-[-0.5px] text-[#32303A]">
        예약된 상담
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

import ConsultationCard, { type Consultation } from "./ConsultationCard";
import EmptyConsultation from "./EmptyConsultation";

interface ConsultationHistoryProps {
  consultations: Consultation[];
}

export default function ConsultationHistoryList({
  consultations = [],
}: ConsultationHistoryProps) {
  if (consultations.length === 0) {
    return <EmptyConsultation />;
  }

  return (
    <div className="min-h-[640px] overflow-y-auto flex-1 bg-[#F4F4F8] px-5 py-6">
      <ul className="flex flex-col gap-[18px]">
        {consultations.map((consultation) => (
          <ConsultationCard
            key={consultation.id}
            consultation={consultation}
            onClick={() => {
              console.log(consultation.id);
            }}
          />
        ))}
      </ul>
    </div>
  );
}

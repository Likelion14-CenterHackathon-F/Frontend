import ConsultationCard, { type Consultation } from "./ConsultationCard";
import EmptyConsultation from "./EmptyConsultation";

interface ConsultationHistoryProps {
  consultations: Consultation[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}

export default function ConsultationHistoryList({
  consultations = [],
  isLoading = false,
  isError = false,
  onRetry,
}: ConsultationHistoryProps) {
  if (isLoading) {
    return (
      <div className="flex min-h-[640px] items-center justify-center bg-[#F4F4F8] px-5 text-sm text-[#65646D]">
        상담 내역을 불러오고 있습니다.
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[640px] flex-col items-center justify-center gap-4 bg-[#F4F4F8] px-5 text-center text-sm text-[#65646D]">
        <p>상담 내역을 불러오지 못했습니다.</p>
        <button
          type="button"
          onClick={onRetry}
          className="rounded-full bg-[#2A2A2A] px-5 py-3 font-semibold text-white"
        >
          다시 시도
        </button>
      </div>
    );
  }

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
          />
        ))}
      </ul>
    </div>
  );
}

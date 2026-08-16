import ConsultationCard, { type Consultation } from "./ConsultationCard";
import EmptyConsultation from "./EmptyConsultation";

interface ConsultationHistoryProps {
  consultations: Consultation[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  onSelect?: (summaryId: number) => void;
}

export default function ConsultationHistoryList({
  consultations = [],
  isLoading = false,
  isError = false,
  onRetry,
  onSelect,
}: ConsultationHistoryProps) {
  if (isLoading) {
    return (
      <div className="flex min-h-[640px] items-center justify-center px-5 text-sm text-[#65646D]">
        상담 내역을 불러오고 있습니다.
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[640px] flex-col items-center justify-center gap-4 px-5 text-center text-sm text-[#65646D]">
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
    <div className="min-h-[640px] flex-1 overflow-y-auto px-5 py-6">
      <ul className="flex flex-col gap-[18px]">
        {consultations.map((consultation) => (
          <ConsultationCard
            key={consultation.id}
            consultation={consultation}
            onClick={
              consultation.summaryId
                ? () => onSelect?.(consultation.summaryId!)
                : undefined
            }
          />
        ))}
      </ul>
    </div>
  );
}

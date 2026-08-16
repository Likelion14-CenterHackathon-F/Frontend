import type { Consultation } from "./ConsultationCard";
import ConsultationCard from "./ConsultationCard";
import ConsultationNotice from "./ConsultationNotice";
import EmptyConsultation from "./EmptyConsultation";
import { useTranslation } from "react-i18next";

interface ConsultationReservationListProps {
  consultations: Consultation[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}

function ConsultationReservationList({
  consultations,
  isLoading = false,
  isError = false,
  onRetry,
}: ConsultationReservationListProps) {
  const { t } = useTranslation("consultationHub");

  if (isLoading) {
    return (
      <div className="flex min-h-[640px] items-center justify-center px-5 text-sm text-[#65646D]">
        상담 예약을 불러오고 있습니다.
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[640px] flex-col items-center justify-center gap-4 px-5 text-center text-sm text-[#65646D]">
        <p>상담 예약을 불러오지 못했습니다.</p>
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
    <div className="min-h-[640px] overflow-y-auto px-5 pb-6 pt-5">
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

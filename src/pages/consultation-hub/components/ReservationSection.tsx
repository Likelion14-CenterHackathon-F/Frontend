import Button from "@/components/button/Button";

interface ReservationSectionProps {
  hasReservation: boolean;
  onReserve: () => void;
}

function ReservationSection({
  hasReservation,
  onReserve,
}: ReservationSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-[#1F2937] text-[16px] font-semibold">
        화상 상담 예약
      </h1>

      <div className="border rounded-xl border-[#E5E7EB] bg-[#F9FAFB] text-[#1F2937]  p-3 space-y-2">
        {hasReservation ? (
          <>
            <div>예약 일시</div>
            <h2 className="text-[16px] font-semibold">
              2025년 1월 15일 (수) 14:00 ~ 14:30
            </h2>
            <div>한국 표준시 (KSI)</div>
            <div className="flex justify-end gap-3">
              <Button variant="outline">취소</Button>
              <Button variant="outline" onClick={() => onReserve()}>
                변경하기
              </Button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-[16px] font-semibold">예약이 없습니다</h2>
            <Button variant="outline" size="lg" onClick={() => onReserve()}>
              화상 상담 예약하기
            </Button>
          </>
        )}
      </div>
    </section>
  );
}

export default ReservationSection;

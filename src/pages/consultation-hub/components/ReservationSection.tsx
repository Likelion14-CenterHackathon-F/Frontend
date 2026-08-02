import Button from "@/components/button/Button";

function ReservationSection() {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-[#1F2937] text-[16px] font-semibold">
        화상 상담 예약
      </h1>
      <div className="border rounded-xl border-[#E5E7EB] bg-[#F9FAFB] text-[#1F2937]  p-3 space-y-2">
        <h2 className="text-[16px] font-semibold">예약이 없습니다</h2>
        <Button variant="outline" size="lg">
          화상 상담 예약하기
        </Button>
      </div>
    </section>
  );
}

export default ReservationSection;

import Button from "@/components/button/Button";

function ConsultationHistorySection() {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-[#1F2937] text-[16px] font-semibold">상담 기록</h1>
      <div className="border rounded-xl border-[#E5E7EB] bg-[#F9FAFB] text-[#1F2937] p-3 space-y-2">
        <h2 className="text-[16px] font-semibold">지난 상담 요약본</h2>
        <Button variant="outline" size="lg">
          자세히보기
        </Button>
      </div>
    </section>
  );
}

export default ConsultationHistorySection;

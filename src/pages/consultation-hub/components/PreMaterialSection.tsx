import Button from "@/components/button/Button";

function PreMaterialSection() {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-[#1F2937] text-[16px] font-semibold">
        사전 자료 제출
      </h1>
      <div className="border rounded-xl border-[#E5E7EB] bg-[#F9FAFB] text-[#1F2937] p-3 space-y-2">
        <p className="text-[12px]">아직 제출된 자료가 없습니다.</p>
        <Button variant="outline" size="lg">
          자료 제출하기
        </Button>
      </div>
    </section>
  );
}

export default PreMaterialSection;

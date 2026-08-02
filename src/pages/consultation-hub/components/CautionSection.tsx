import Button from "@/components/button/Button";

function CautionSection() {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-[#1F2937] text-[16px] font-semibold">주의사항</h1>
      <div className="border rounded-xl border-[#E5E7EB] bg-[#F9FAFB] text-[#1F2937] p-3 space-y-2">
        <p className="text-[12px]">
          ⚠ 통화 입장 전 안내
          <br />
          밝은 곳에서 카메라와 마이크를 확인하세요
        </p>
        <p className="text-[12px]">
          📸 상담 기록
          <br />
          상담은 자막과 요약으로 기록되며 의료진과 병원에서만 조회
        </p>
      </div>
      <div className="w-full flex justify-end">
        <Button>상담 대기실 입장</Button>
      </div>
    </section>
  );
}

export default CautionSection;

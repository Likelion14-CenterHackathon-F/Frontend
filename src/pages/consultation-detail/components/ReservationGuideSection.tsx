function ReservationGuideSection() {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-[#1F2937] text-[16px] font-semibold">
        예약 안내 및 약관
      </h1>
      <div className="border rounded-xl border-[#E5E7EB] bg-[#F9FAFB] text-[#1F2937]  p-3 space-y-2">
        <h2 className="text-[16px] font-semibold">상담 방식</h2>
        <h2 className="text-[16px] font-semibold">
          실시간 화상 상담 (의료진과 1:1 연결)
        </h2>
        <p className="text-[12px]">
          ※ 권장 상담 시간은 최대 15분이며, 원활한 운영을 위해 초과 시 상담이
          제한될 수 있습니다
        </p>
      </div>
      <div className="border rounded-xl border-[#E5E7EB] bg-[#F9FAFB] text-[#1F2937]  p-3 space-y-2">
        <h2 className="text-[16px] font-semibold">필요 정보</h2>
        <p className="text-[12px]">안정적인 인터넷 연결 (Wi-Fi 또는 5G 권장)</p>
        <p className="text-[12px]">마이크와 카메라 기기</p>
      </div>
      <div className="border rounded-xl border-[#E5E7EB] bg-[#F9FAFB] text-[#1F2937]  p-3 space-y-2">
        <h2 className="text-[16px] font-semibold">기록 및 동의</h2>
        <p className="text-[12px]">
          상담 중 자막과 요약이 저장됩니다. 진행시 동의한 것으로 간주됩니다.
        </p>
      </div>
    </section>
  );
}

export default ReservationGuideSection;

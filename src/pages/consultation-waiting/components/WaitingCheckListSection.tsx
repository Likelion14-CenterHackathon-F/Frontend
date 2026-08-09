function WaitingCheckListSection() {
  return (
    <section className="rounded-[10px] bg-[#F6F6F6] px-[17px] py-[15px]">
      <h2 className="text-sm text-[#3E3E3E] font-medium ">입장 전 확인 사항</h2>

      <ul className="mt-[6px] text-xs leading-5 text-[#6D6D6D]">
        <li>· 이 화상 상담은 진단·처방이 아닌 회복 관리 상담입니다.</li>
        <li>· 자막과 상담 요약은 케이스 기록에 저장됩니다.</li>
        <li>· 기기를 가로로 돌려주세요</li>
      </ul>
    </section>
  );
}

export default WaitingCheckListSection;

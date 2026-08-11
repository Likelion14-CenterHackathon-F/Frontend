const consultationGuide = [
  {
    title: "실시간 화상 상담 (의료진과 1:1 연결)",
    description:
      "상담 내용은 자막과 요약으로 기록되며, 담당 의료진과 병원만 확인할 수 있습니다.",
  },
  {
    title: "필요 정보",
    description: "안정적인 인터넷 연결 (Wi-Fi 또는 5G 권장)",
  },
  {
    title: "기록 및 동의",
    description:
      "상담 중 자막과 요약이 저장됩니다. 진행 시 동의한 것으로 간주됩니다.",
  },
];

function ConsultationGuide() {
  return (
    <>
      <h2 className="text-base font-semibold tracking-[-0.4px] text-[#4B4B4E]">
        상담 방식 안내
      </h2>

      <ul className="mt-[14px] flex flex-col gap-[14px]">
        {consultationGuide.map((item) => (
          <li key={item.title} className="pl-5">
            <p className="relative text-[15px] font-medium leading-[1.4] text-[#504E59] before:absolute before:-left-[14px] before:content-['•']">
              {item.title}
            </p>

            <p className="mt-1.5 text-[13px] leading-[1.4] text-[#7B7A80]">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ConsultationGuide;

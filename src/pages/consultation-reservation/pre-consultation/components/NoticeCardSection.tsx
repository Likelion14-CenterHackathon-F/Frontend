import noticeIcon from "@/assets/icons/consultation/error.svg";

const notices = [
  "제출하신 자료는 담당 의료진만 열람할 수 있습니다.",
  "본 자료 제출은 진단 또는 처방을 대체하지 않으며, 상담 준비를 위한 참고 자료로만 활용됩니다.",
  "응급 증상(심한 출혈, 고열, 호흡 곤란)이 있으면 즉시 병원 또는 응급 기관에 연락하세요.",
];

function NoticeCardSection() {
  return (
    <section className="mt-44 rounded-[18px] bg-surface-notice px-5 py-[26px]">
      <div className="flex items-center gap-1">
        <img src={noticeIcon} alt="" className="size-6 opacity-60 grayscale" />
        <h2 className="text-base font-semibold leading-[1.4] tracking-tight text-action-secondary-text">
          안내 사항
        </h2>
      </div>
      <ul className="mt-4 list-disc space-y-3 pl-5 text-[13px] leading-[1.4] text-text-secondary">
        {notices.map((notice) => (
          <li key={notice}>{notice}</li>
        ))}
      </ul>
    </section>
  );
}

export default NoticeCardSection;

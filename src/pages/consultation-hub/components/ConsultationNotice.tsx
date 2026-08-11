import errorIcon from "@/assets/icons/consultation/error.svg";

function ConsultationNotice() {
  return (
    <aside className="mt-4 rounded-[18px] bg-[#ECECF3] p-5">
      <div className="flex items-center gap-1">
        <img src={errorIcon} alt="" className="size-6 shrink-0" />

        <h3 className="text-base font-semibold tracking-[-0.4px] text-[#4B4B4E]">
          화상 상담 전 유의사항
        </h3>
      </div>

      <ul className="mt-1.5 flex list-disc flex-col gap-1.5 pl-[25px] text-sm leading-[1.4] text-[#65646D]">
        <li>밝은 곳에서 카메라와 마이크를 확인한 뒤 상담에 입장해 주세요.</li>

        <li>
          상담 내용은 자막과 요약으로 기록되며, 담당 의료진과 병원만 확인할 수
          있습니다.
        </li>
      </ul>
    </aside>
  );
}

export default ConsultationNotice;

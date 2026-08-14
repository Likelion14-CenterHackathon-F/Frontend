import aiGenerateIcon from "@/assets/icons/consultation-summary/ai-generate.svg";

interface AiSummarySectionProps {
  summary: string;
}

export default function AiSummarySection({ summary }: AiSummarySectionProps) {
  return (
    <section aria-labelledby="ai-summary-heading" className="mt-[26px]">
      <div className="flex items-center gap-[10px]">
        <img src={aiGenerateIcon} alt="" className="size-6 shrink-0" />
        <h2
          id="ai-summary-heading"
          className="text-xl font-semibold leading-[1.4] tracking-[-0.5px] text-[#302F31]"
        >
          AI 상담 요약
        </h2>
      </div>

      <div className="mt-4 rounded-3xl bg-[linear-gradient(127deg,rgba(90,50,250,0.31)_19%,rgba(135,112,229,0.31)_87%),linear-gradient(#fff,#fff)] p-5 backdrop-blur-[7.25px]">
        <p className="whitespace-pre-line text-[15px] font-medium leading-[1.5] tracking-[-0.375px] text-[#4B4B4E]">
          {summary}
        </p>
      </div>
    </section>
  );
}

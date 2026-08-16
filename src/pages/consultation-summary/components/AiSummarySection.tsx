import aiGenerateIcon from "@/assets/icons/consultation-summary/ai-generate.svg";

interface AiSummarySectionProps {
  summary: string;
  title: string;
}

export default function AiSummarySection({
  summary,
  title,
}: AiSummarySectionProps) {
  return (
    <section aria-labelledby="ai-summary-heading" className="mt-[50px]">
      <div className="flex items-center gap-[10px]">
        <img src={aiGenerateIcon} alt="" className="size-7 shrink-0" />
        <h2
          id="ai-summary-heading"
          className="text-[22px] font-semibold leading-[1.4] tracking-[-0.55px] text-[#32303A]"
        >
          {title}
        </h2>
      </div>
      <div className="mt-[14px] rounded-3xl bg-white p-5 backdrop-blur-[7.25px]">
        <p className="whitespace-pre-line bg-gradient-to-r from-[#5E577D] to-[#9283CA] bg-clip-text text-[15px] font-medium leading-[1.5] tracking-[-0.375px] text-transparent">
          {summary}
        </p>
      </div>
    </section>
  );
}

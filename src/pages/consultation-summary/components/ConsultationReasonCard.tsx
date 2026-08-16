import SubmissionMedia from "./SubmissionMedia";

interface ConsultationReasonCardProps {
  title: string;
  description: string;
  fileUrls?: string[];
  mediaLabel: string;
  heading: string;
}

export default function ConsultationReasonCard({ title, description, fileUrls = [], mediaLabel, heading }: ConsultationReasonCardProps) {
  return (
    <section aria-labelledby="reason-heading" className="mt-[34px]">
      <h2 id="reason-heading" className="text-[22px] font-semibold leading-[1.4] tracking-[-0.55px] text-[#32303A]">{heading}</h2>
      <div className="mt-[14px] rounded-[28px] bg-white px-5 py-6">
        <h3 className="text-base font-semibold leading-[1.4] tracking-[-0.4px] text-[#4B4B4E]">{title}</h3>
        <p className="mt-1.5 text-sm font-medium leading-[1.5] tracking-[-0.35px] text-[#65646D]">{description}</p>
        {fileUrls.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2.5">
            {fileUrls.map((fileUrl, index) => (
              <SubmissionMedia
                key={fileUrl}
                fileUrl={fileUrl}
                label={`${mediaLabel} ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

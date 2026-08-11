export type ConsultationStatus = "completed" | "reserved" | "inProgress";

export interface Consultation {
  id: number;
  status: ConsultationStatus;
  medicalStaffName: string;
  medicalStaffRole: "의사" | "간호사";
  subject: string;
  scheduledAt: string;
  timezone: string;
}

interface ConsultationCardProps {
  consultation: Consultation;
  onClick?: () => void;
}

export default function ConsultationCard({
  consultation,
  onClick,
}: ConsultationCardProps) {
  const isReserved = consultation.status === "reserved";

  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="flex min-h-[167px] w-full flex-col items-start rounded-[20px] bg-white px-5 py-6 text-left"
      >
        <div className="flex items-center gap-1 text-base leading-[1.4] tracking-[-0.4px]">
          <span
            className={[
              "font-semibold",
              isReserved ? "text-[#614BB8]" : "text-[#6A6581]",
            ].join(" ")}
          >
            {isReserved ? "예약확정" : "상담 완료"}
          </span>

          <span className="text-[#B3ABD2]">·</span>

          <span className="text-[#6A6581]">
            {consultation.medicalStaffName} {consultation.medicalStaffRole}
          </span>
        </div>

        <strong className="mt-[14px] block text-xl font-semibold leading-[1.4] tracking-[-0.5px] text-[#32303A]">
          {consultation.subject}
        </strong>

        <div className="mt-[11px] flex flex-col gap-1">
          <span className="text-[13px] font-medium text-[#9795A0]">
            {consultation.timezone}
          </span>

          <time
            className={[
              "leading-[1.4] tracking-[-0.4px]",
              isReserved
                ? "text-[17px] font-semibold text-[#614BB8]"
                : "text-[15px] font-medium text-[#9795A0]",
            ].join(" ")}
          >
            {consultation.scheduledAt}
            {isReserved && " 상담 예정"}
          </time>
        </div>
      </button>
    </li>
  );
}

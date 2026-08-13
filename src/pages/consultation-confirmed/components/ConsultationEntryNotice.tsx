import checkIcon from "@/assets/icons/consultation/check.svg";

interface ConsultationEntryNoticeProps {
  message: string;
}

function ConsultationEntryNotice({ message }: ConsultationEntryNoticeProps) {
  return (
    <div className="flex min-h-[60px] items-center gap-3 rounded-[14px] bg-primary-10 p-5">
      <span className="flex size-[18px] shrink-0 items-center justify-center rounded-4xl bg-primary-deep">
        <img src={checkIcon} alt="" className="size-3 brightness-0 invert" />
      </span>
      <p className="text-[15px] font-medium leading-[1.4] tracking-tight text-primary-deep">
        {message}
      </p>
    </div>
  );
}

export default ConsultationEntryNotice;

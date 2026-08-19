import checkIcon from "@/assets/icons/consultation/check.svg";

interface ConsultationEntryNoticeProps {
  message: string;
}

function ConsultationEntryNotice({ message }: ConsultationEntryNoticeProps) {
  return (
    <div className="flex min-h-[60px] items-center gap-2 rounded-[20px] bg-primary-10 p-5">
      <span className="flex size-6 shrink-0 items-center justify-center">
        <span className="flex size-[18px] items-center justify-center rounded-lg bg-primary-deep">
          <img src={checkIcon} alt="" className="size-3 brightness-0 invert" />
        </span>
      </span>
      <p className="text-[15px] font-medium leading-[1.4] tracking-tight text-primary-deep">
        {message}
      </p>
    </div>
  );
}

export default ConsultationEntryNotice;

import { useTranslation } from "react-i18next";

import noticeIcon from "@/assets/icons/consultation/error.svg";
import { cn } from "@/utils/cn";

const noticeKeys = ["privacy", "disclaimer", "emergency"] as const;

interface NoticeCardSectionProps {
  className?: string;
}

function NoticeCardSection({ className }: NoticeCardSectionProps) {
  const { t } = useTranslation("consultationReservation");

  return (
    <section
      className={cn(
        "min-h-[210px] rounded-[18px] bg-black/5 px-5 py-[26px]",
        className,
      )}
    >
      <div className="flex items-center gap-1">
        <img src={noticeIcon} alt="" className="size-6" />
        <h2 className="text-base font-semibold leading-[1.4] tracking-tight text-action-secondary-text">
          {t("preConsultation.notice.title")}
        </h2>
      </div>
      <ul className="mt-4 list-disc space-y-[14px] pl-5 text-[13px] leading-[1.4] text-text-secondary">
        {noticeKeys.map((key) => (
          <li key={key}>{t(`preConsultation.notice.items.${key}`)}</li>
        ))}
      </ul>
    </section>
  );
}

export default NoticeCardSection;

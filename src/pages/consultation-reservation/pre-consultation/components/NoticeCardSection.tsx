import { useTranslation } from "react-i18next";

import noticeIcon from "@/assets/icons/consultation/error.svg";

const noticeKeys = ["privacy", "disclaimer", "emergency"] as const;

function NoticeCardSection() {
  const { t } = useTranslation("consultationReservation");

  return (
    <section className="mt-44 rounded-[18px] bg-surface-notice px-5 py-[26px]">
      <div className="flex items-center gap-1">
        <img src={noticeIcon} alt="" className="size-6 opacity-60 grayscale" />
        <h2 className="text-base font-semibold leading-[1.4] tracking-tight text-action-secondary-text">
          {t("preConsultation.notice.title")}
        </h2>
      </div>
      <ul className="mt-4 list-disc space-y-3 pl-5 text-[13px] leading-[1.4] text-text-secondary">
        {noticeKeys.map((key) => (
          <li key={key}>{t(`preConsultation.notice.items.${key}`)}</li>
        ))}
      </ul>
    </section>
  );
}

export default NoticeCardSection;
